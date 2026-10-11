"""Calibration-lite (PLAN-LIVE.md v2 amendment D).

Fit L_idol (g leachable BOD per idol) per water-body type by 1-D grid search so the default
scenario (expected arrivals, no noise) reproduces the observed Durga 2025 pre->during BOD change
at 21:00 sim time for the 5 sensored ghats. DO and turbidity changes are out-of-fit checks.
"""
from __future__ import annotations

import numpy as np

from ..data import load_bhopal
from .simulator import GHAT_TYPE, SENSORED, Simulator

FIT_MINUTE = 6 * 60  # 21:00
GRID = np.round(np.concatenate([np.arange(0.5, 10, 0.5), np.arange(10, 201, 2.5)]), 2)
LABEL = "fitted on 5 ghats, one festival; a sanity check, not validation"


def observed_deltas() -> dict[str, dict]:
    df = load_bhopal()
    d = df[(df.year == 2025) & (df.festival == "Durga") & df["is_numeric"]]
    short = {"Dissolved oxygen": "DO", "BOD": "BOD", "Turbidity": "turbidity"}
    out = {}
    for s in SENSORED:
        x = d[d.slug == s]
        row = {}
        for p, k in short.items():
            pre = x[(x.parameter == p) & (x.phase == "pre")]["value"]
            dur = x[(x.parameter == p) & (x.phase == "during")]["value"]
            row[k] = round(float(dur.iloc[0] - pre.iloc[0]), 3) if len(pre) and len(dur) else None
        out[s] = row
    return out


def simulate_deltas(L: dict[str, float]) -> dict[str, dict]:
    sim = Simulator("ban_enforced", stochastic=False, sensors=False, L_idol=L)
    start = {s: sim.truth(s) for s in SENSORED}
    for _ in range(FIT_MINUTE):
        sim.step()
    end = {s: sim.truth(s) for s in SENSORED}
    return {s: {k: round(end[s][k] - start[s][k], 3) for k in ("DO", "BOD", "turbidity")} for s in SENSORED}


def _mae(rows, k):
    return round(float(np.mean([abs(r["simulated"][k] - r["observed"][k]) for r in rows])), 3)


def _mae0(rows, k):
    return round(float(np.mean([abs(r["observed"][k]) for r in rows])), 3)


def run_calibration() -> dict:
    obs = observed_deltas()
    types = sorted({GHAT_TYPE[s] for s in SENSORED})
    # Ghats do not interact in the default scenario (no diversion), so each type is fitted independently.
    sims_by_L = {float(L): simulate_deltas({t: float(L) for t in types}) for L in GRID}
    fitted = {}
    for t in types:
        ghats = [s for s in SENSORED if GHAT_TYPE[s] == t]
        err = {L: np.mean([abs(sims_by_L[L][s]["BOD"] - obs[s]["BOD"]) for s in ghats]) for L in sims_by_L}
        fitted[t] = float(min(err, key=err.get))
    sim = simulate_deltas(fitted)
    rows, ae_fit, ae_base, sign_ok = [], [], [], 0
    for s in SENSORED:
        o, m = obs[s], sim[s]
        ae_fit.append(abs(m["BOD"] - o["BOD"]))
        ae_base.append(abs(o["BOD"]))
        sgn = lambda v: 0 if abs(v) < 0.05 else (1 if v > 0 else -1)  # noqa: E731
        ok = o["DO"] is not None and sgn(m["DO"]) == sgn(o["DO"])
        sign_ok += int(ok)
        rows.append({"ghat": s, "type": GHAT_TYPE[s], "observed": o, "simulated": m, "do_sign_match": ok})
    return {"available": True, "label": LABEL, "fit_target": "BOD change pre->during at 21:00 (Durga 2025, MPPCB 2025 p. 64/65)",
            "scenario": "ban_enforced (expected arrivals, no noise)",
            "L_idol": fitted, "rows": rows,
            "mae": {"BOD_fitted": round(float(np.mean(ae_fit)), 3), "BOD_no_change_baseline": round(float(np.mean(ae_base)), 3),
                    "DO_out_of_fit": _mae(rows, "DO"), "DO_no_change_baseline": _mae0(rows, "DO"),
                    "turbidity_out_of_fit": _mae(rows, "turbidity"), "turbidity_no_change_baseline": _mae0(rows, "turbidity")},
            "do_sign_matches": sign_ok, "n_ghats": len(SENSORED),
            "note": "kund L_idol is not fitted (no sensored kund); it keeps the uncalibrated default."}
