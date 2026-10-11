"""EXPERIMENTAL. Small ghat simulator calibrated on statewide breach rates (PLAN.md §3.8).

No intervention is logged anywhere in the data pack, so action effects below are
assumptions (aerate x0.6 on DO-breach probability, clean x0.7 on BOD-breach probability),
not measurements.
"""
from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd

from ..data import load_statewide

ACTIONS = ["none", "test", "clean", "aerate", "clean_aerate"]
COSTS = np.array([0.0, 1.0, 2.0, 3.0, 5.0])
N_DO, N_BOD, N_KNOWN, N_TREND = 3, 3, 2, 3
N_STATES = N_DO * N_BOD * N_KNOWN * N_TREND  # 54
N_ACTIONS = len(ACTIONS)
BREACH_REWARD = -10.0
UNKNOWN_PENALTY = 2.0
TREND_ADJ = np.array([-0.05, 0.0, 0.05])  # improving, stable, worsening
P_IMPROVE, P_WORSEN = 0.5, 0.3


def encode(do: int, bod: int, known: int, trend: int) -> int:
    return ((do * N_BOD + bod) * N_KNOWN + known) * N_TREND + trend


def decode(s: int) -> tuple[int, int, int, int]:
    trend = s % N_TREND
    s //= N_TREND
    known = s % N_KNOWN
    s //= N_KNOWN
    return s // N_BOD, s % N_BOD, known, trend


def do_tier(v: float) -> int:
    """0: DO >= 5, 1: 3-5, 2: < 3."""
    return 0 if v >= 5 else 1 if v >= 3 else 2


def bod_tier(v: float) -> int:
    """0: BOD <= 3, 1: 3-8, 2: > 8."""
    return 0 if v <= 3 else 1 if v <= 8 else 2


@dataclass
class Calibration:
    p_do: np.ndarray   # P(DO < 5 during/after | pre DO tier)
    p_bod: np.ndarray  # P(BOD > 3 during/after | pre BOD tier)
    init_do: np.ndarray
    init_bod: np.ndarray
    n_groups: int


def calibrate() -> Calibration:
    """Empirical rates from the cleaned statewide file (site-festival-year groups)."""
    df, _ = load_statewide()
    num = df[df["is_numeric"]]
    key = ["year", "festival", "site_key"]
    pre = num[num["phase"] == "pre"].pivot_table(index=key, columns="parameter", values="value", aggfunc="first")
    da = num[num["phase"].isin(["during", "after"])]
    do_b = da[da["parameter"] == "Dissolved oxygen"].groupby(key)["value"].min().lt(5).rename("do_b")
    bod_b = da[da["parameter"] == "BOD"].groupby(key)["value"].max().gt(3).rename("bod_b")
    t = pre.join(do_b, how="inner").join(bod_b, how="inner").dropna(subset=["Dissolved oxygen", "BOD"])
    t["dt"] = t["Dissolved oxygen"].map(do_tier)
    t["bt"] = t["BOD"].map(bod_tier)

    def rate(col: str, tier: str, n: int) -> np.ndarray:
        g = t.groupby(tier)[col].agg(["sum", "count"]).reindex(range(n), fill_value=0)
        p = ((g["sum"] + 1) / (g["count"] + 2)).to_numpy(float)  # Laplace smoothing
        # Worse pre-immersion tier never lowers the breach probability (small-sample noise guard).
        return np.maximum.accumulate(p)

    init_do = t["dt"].value_counts(normalize=True).reindex(range(3), fill_value=0).to_numpy(float)
    init_bod = t["bt"].value_counts(normalize=True).reindex(range(3), fill_value=0).to_numpy(float)
    return Calibration(rate("do_b", "dt", 3), rate("bod_b", "bt", 3), init_do, init_bod, int(len(t)))


class GhatSim:
    """Two-step episodes: step 0 = pre-festival, step 1 = immersion day."""

    def __init__(self, cal: Calibration, seed: int = 42):
        self.cal = cal
        self.rng = np.random.default_rng(seed)

    def p_breach(self, s: int, a: int) -> float:
        do, bod, _, trend = decode(s)
        pdo = self.cal.p_do[do] * (0.6 if a in (3, 4) else 1.0)
        pbod = self.cal.p_bod[bod] * (0.7 if a in (2, 4) else 1.0)
        return float(np.clip(1 - (1 - pdo) * (1 - pbod) + TREND_ADJ[trend], 0.0, 1.0))

    def reward(self, s: int, a: int) -> float:
        known = decode(s)[2] or int(a == 1)
        return BREACH_REWARD * self.p_breach(s, a) - COSTS[a] - (0.0 if known else UNKNOWN_PENALTY)

    def initial_state(self) -> int:
        r = self.rng
        return encode(int(r.choice(3, p=self.cal.init_do)), int(r.choice(3, p=self.cal.init_bod)),
                      int(r.random() < 0.7), int(r.integers(3)))

    def step(self, s: int, a: int) -> int:
        do, bod, known, trend = decode(s)
        r = self.rng
        if a in (3, 4) and r.random() < P_IMPROVE:
            do = max(do - 1, 0)
        elif r.random() < P_WORSEN:
            do = min(do + 1, 2)
        if a in (2, 4) and r.random() < P_IMPROVE:
            bod = max(bod - 1, 0)
        elif r.random() < P_WORSEN:
            bod = min(bod + 1, 2)
        return encode(do, bod, 1 if a == 1 else known, trend)


def heuristic_action(s: int) -> int:
    do, bod, known, _ = decode(s)
    if not known:
        return 1
    if do >= 1 and bod >= 1:
        return 4
    if do >= 1:
        return 3
    if bod >= 1:
        return 2
    return 0


def collect(sim: GhatSim, n_transitions: int = 20_000, mix=(0.3, 0.5, 0.2)) -> pd.DataFrame:
    """Fixed log from a mixed behaviour policy: random / heuristic / do-nothing."""
    rows = []
    while len(rows) < n_transitions:
        s = sim.initial_state()
        for t in range(2):
            u = sim.rng.random()
            a = (int(sim.rng.integers(N_ACTIONS)) if u < mix[0]
                 else heuristic_action(s) if u < mix[0] + mix[1] else 0)
            r = sim.reward(s, a)
            s2 = sim.step(s, a)
            rows.append((s, a, r, s2, t == 1))
            s = s2
    return pd.DataFrame(rows[:n_transitions], columns=["s", "a", "r", "s2", "done"])


def evaluate_policy(sim: GhatSim, policy, episodes: int = 20_000) -> float:
    """Mean undiscounted 2-step return of a policy (callable state -> action)."""
    total = 0.0
    for _ in range(episodes):
        s = sim.initial_state()
        for _t in range(2):
            a = policy(s)
            total += sim.reward(s, a)
            s = sim.step(s, a)
    return float(total / episodes)
