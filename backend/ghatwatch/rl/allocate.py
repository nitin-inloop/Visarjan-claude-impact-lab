"""EXPERIMENTAL. Train CQL on a simulated log, compare policies, split a budget across ghats."""
from __future__ import annotations

import numpy as np

from .cql import train_cql
from .simulator import (ACTIONS, COSTS, N_STATES, GhatSim, bod_tier, calibrate, collect, decode, do_tier,
                        encode, evaluate_policy, heuristic_action)

CAVEAT = {
    "en": "Experimental. No intervention is logged in the MPPCB data, so this policy was learned from a "
          "simulator with assumed action effects, not from real outcomes. Use it only as a starting point "
          "for discussion. Logging what BMC actually does in 2026 (the action-log export) would let next "
          "year's version learn from real results.",
    "hi": "प्रायोगिक। MPPCB डेटा में कोई कार्रवाई दर्ज नहीं है, इसलिए यह नीति वास्तविक परिणामों से नहीं बल्कि "
          "मान्य प्रभावों वाले सिम्युलेटर से सीखी गई है। इसे केवल चर्चा की शुरुआत मानें। 2026 में BMC की "
          "वास्तविक कार्रवाइयों को दर्ज करने (एक्शन-लॉग निर्यात) से अगले वर्ष वास्तविक परिणामों से सीखा जा सकेगा।",
}
TREND_IDX = {"improving": 0, "stable": 1, "worsening": 2}


def build_report(seed: int = 42) -> dict:
    """Calibrate, log 20k transitions, train CQL, evaluate four policies in the simulator."""
    cal = calibrate()
    sim = GhatSim(cal, seed=seed)
    log = collect(sim)
    Q, losses = train_cql(log)
    greedy = Q.argmax(axis=1)
    policies = {
        "cql": lambda s: int(greedy[s]),
        "heuristic": heuristic_action,
        "random": None,
        "do_nothing": lambda s: 0,
    }
    values = {}
    for name, pol in policies.items():
        ev = GhatSim(cal, seed=seed + 1)
        if pol is None:
            pol = lambda s, _r=ev.rng: int(_r.integers(len(ACTIONS)))  # noqa: E731
        values[name] = round(evaluate_policy(ev, pol), 4)
    states = []
    for s in range(N_STATES):
        do, bod, known, trend = decode(s)
        states.append({"state": s, "do_tier": do, "bod_tier": bod, "known": known, "trend": trend,
                       "greedy_action": ACTIONS[int(greedy[s])], "q": [round(float(x), 4) for x in Q[s]]})
    return {
        "experimental": True,
        "policy_values": values,
        "check_cql_ge_do_nothing": bool(values["cql"] >= values["do_nothing"]),
        "actions": ACTIONS, "costs": COSTS.tolist(),
        "calibration": {"p_do_breach_by_do_tier": cal.p_do.round(4).tolist(),
                        "p_bod_breach_by_bod_tier": cal.p_bod.round(4).tolist(), "n_groups": cal.n_groups},
        "training": {"n_transitions": int(len(log)), "behaviour_mix": {"random": 0.3, "heuristic": 0.5, "do_nothing": 0.2},
                     "alpha": 1.0, "lr": 0.1, "epochs": 300, "gamma": 0.95, "seed": seed,
                     "final_loss": round(losses[-1], 4)},
        "state_space": "do_tier{>=5,3-5,<3} x bod_tier{<=3,3-8,>8} x known{0,1} x trend{improving,stable,worsening}",
        "states": states, "Q": [[round(float(x), 5) for x in row] for row in Q],
        "caveat": CAVEAT,
    }


def ghat_state(gh: dict) -> int:
    """Simulator state of a ranked ghat from its latest DO / BOD readings."""
    pts = gh.get("series") or {}
    def latest(param: str, fn) -> float | None:
        vals = [p for p in pts.get(param, []) if p["value"] is not None]
        if not vals:
            return None
        last = max((p["year"], p["festival"] == "Durga") for p in vals)
        same = [p["value"] for p in vals if (p["year"], p["festival"] == "Durga") == last]
        return fn(same)
    do = latest("Dissolved oxygen", min)
    bod = latest("BOD", max)
    known = 0 if gh["tier"] == "insufficient_data" else 1
    return encode(do_tier(do) if do is not None else 1, bod_tier(bod) if bod is not None else 1,
                  known, TREND_IDX.get(gh["trend"], 1))


def allocate(ghats: list[dict], Q: list[list[float]] | np.ndarray, budget: float) -> list[dict]:
    """Greedy by (Q(s,a) - Q(s,none)) / cost until the budget is used; one action per ghat."""
    Q = np.asarray(Q)
    cands = []
    for gh in ghats:
        s = ghat_state(gh)
        for a in range(1, len(ACTIONS)):
            if ACTIONS[a] == "test" and decode(s)[2] == 1:
                continue  # in the simulator a test only changes 'known'; skip it for already-known ghats
            gain = float(Q[s, a] - Q[s, 0])
            if gain > 0:
                cands.append((gain / COSTS[a], gain, gh["slug"], a, s))
    cands.sort(key=lambda c: (-c[0], -c[1]))
    plan, used, left = [], set(), float(budget)
    for ratio, gain, slug, a, s in cands:
        if slug in used or COSTS[a] > left:
            continue
        used.add(slug)
        left -= COSTS[a]
        do, bod, known, trend = decode(s)
        plan.append({"slug": slug, "action": ACTIONS[a], "cost": float(COSTS[a]), "q_gain": round(gain, 4),
                     "gain_per_cost": round(float(ratio), 4),
                     "state": {"do_tier": do, "bod_tier": bod, "known": known, "trend": trend}})
    return plan


def allocate_payload(ghats: list[dict], report: dict, budget: float) -> dict:
    if not report.get("check_cql_ge_do_nothing", False):
        return {"available": False, "experimental": True, "budget": budget,
                "reason": "CQL policy did not beat do-nothing in the simulator; allocation disabled.",
                "policy_values": report.get("policy_values"), "caveat": CAVEAT}
    plan = allocate(ghats, report["Q"], budget)
    return {"available": True, "experimental": True, "budget": budget, "plan": plan,
            "spent": float(sum(p["cost"] for p in plan)),
            "costs": dict(zip(ACTIONS, report["costs"])),
            "policy_values": report["policy_values"], "caveat": CAVEAT}
