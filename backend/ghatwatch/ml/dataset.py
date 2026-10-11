"""Site-festival-year training table from the statewide file (PLAN.md §3.7).

Label: any DO < 5 or BOD > 3 in the `during` or `after` phase.
Features: pre-immersion readings only (no during/after values -> no leakage),
site-type keywords, festival, year, regional office, site prior-year breach rate.
"""
from __future__ import annotations

import numpy as np
import pandas as pd

from ..data import load_bhopal, load_statewide, normalise_ro

PRE_FEATURES = {
    "pre_ph": "pH", "pre_do": "Dissolved oxygen", "pre_bod": "BOD", "pre_cod": "COD",
    "pre_ts": "Total solids", "pre_tds": "Dissolved solids", "pre_turbidity": "Turbidity",
    "pre_conductivity": "Conductivity",
}
KEYWORDS = {
    "river": ["river", "nadi"], "lake": ["lake", "sagar", "sarovar", "sarover"],
    "talab": ["talab", "talav", "taal", "tal "], "kund": ["kund"], "pond": ["pond"],
    "dam": ["dam"], "ghat": ["ghat"], "temporary": ["temporary", "artificial", "temp."],
}
N_TOP_RO = 10


def keyword_flags(name: str) -> dict[str, float]:
    t = f" {str(name).lower()} "
    return {f"type_{k}": float(any(w in t for w in ws)) for k, ws in KEYWORDS.items()}


def _groups(df: pd.DataFrame, key_cols: list[str]) -> pd.DataFrame:
    """One row per (year, festival, site) with pre features and the during/after label."""
    num = df[df["is_numeric"]]
    pre = num[num["phase"] == "pre"]
    feats = pre.pivot_table(index=key_cols, columns="parameter", values="value", aggfunc="first")
    feats = feats.reindex(columns=list(PRE_FEATURES.values()))
    feats.columns = list(PRE_FEATURES.keys())
    da = num[num["phase"].isin(["during", "after"]) & num["parameter"].isin(["Dissolved oxygen", "BOD"])]
    has = da.groupby(key_cols).size().rename("n_label")
    br = ((da["parameter"] == "Dissolved oxygen") & (da["value"] < 5)) | ((da["parameter"] == "BOD") & (da["value"] > 3))
    lab = br.groupby([da[c] for c in key_cols]).any().rename("y")
    base = df.groupby(key_cols).first()[["site_as_printed"] + (["ro"] if "ro" in df else [])]
    out = base.join(feats).join(has).join(lab)
    return out.reset_index()


def prior_breach_rate(t: pd.DataFrame, key: str) -> pd.Series:
    """Breach rate of the same site in strictly earlier years (NaN when none)."""
    vals = []
    for r in t.itertuples():
        prev = t[(t[key] == getattr(r, key)) & (t["year"] < r.year) & t["y"].notna()]
        vals.append(float(prev["y"].mean()) if len(prev) else np.nan)
    return pd.Series(vals, index=t.index)


def top_ros(t: pd.DataFrame) -> list[str]:
    return list(t["ro"].value_counts().head(N_TOP_RO).index)


def featurise(t: pd.DataFrame, ros: list[str]) -> pd.DataFrame:
    X = pd.DataFrame(index=t.index)
    for c in PRE_FEATURES:
        X[c] = t[c].astype(float) if c in t else np.nan
    kw = pd.DataFrame([keyword_flags(n) for n in t["site_as_printed"]], index=t.index)
    X = X.join(kw)
    X["festival_durga"] = (t["festival"] == "Durga").astype(float)
    X["year"] = t["year"].astype(float)
    for ro in ros:
        X[f"ro_{ro}"] = (t["ro"] == ro).astype(float)
    X["ro_other"] = (~t["ro"].isin(ros)).astype(float)
    X["site_prior_breach_rate"] = t["prior_breach_rate"].astype(float)
    return X


def build_training() -> tuple[pd.DataFrame, pd.Series, pd.Series, pd.DataFrame, list[str]]:
    """Returns X, y, groups (site_key), meta table, top regional offices."""
    df, _ = load_statewide()
    t = _groups(df, ["year", "festival", "site_key"])
    t = t[t["n_label"].fillna(0) > 0].copy()
    t["y"] = t["y"].astype(float)
    t["prior_breach_rate"] = prior_breach_rate(t, "site_key")
    ros = top_ros(t)
    X = featurise(t, ros)
    return X, t["y"].astype(int), t["site_key"], t, ros


def bhopal_feature_rows(ros: list[str]) -> pd.DataFrame:
    """Latest available pre readings per Bhopal ghat (Durga 2025, else Ganesh 2025, else 2024...)."""
    df = load_bhopal().copy()
    df["ro"] = normalise_ro("R.O. Bhopal")
    t = _groups(df, ["year", "festival", "slug"])
    t["y"] = t["y"].astype(float)
    order = {(2025, "Durga"): 0, (2025, "Ganesh"): 1, (2024, "Durga"): 2, (2024, "Ganesh"): 3,
             (2023, "Durga"): 4, (2023, "Ganesh"): 5}
    rows = []
    for slug, g in t.groupby("slug"):
        g = g.assign(o=[order[(int(y), f)] for y, f in zip(g["year"], g["festival"])]).sort_values("o")
        usable = g[g["pre_do"].notna() | g["pre_bod"].notna()]
        pick = usable.iloc[0] if len(usable) else g.iloc[0]
        prev = g[g["y"].notna()]
        r = pick.copy()
        r["prior_breach_rate"] = float(prev["y"].mean()) if len(prev) else np.nan
        r["year"] = 2026  # forecasting the 2026 Durga immersion
        r["festival"] = "Durga"
        r["basis_year"], r["basis_festival"] = int(pick["year"]), pick["festival"]
        rows.append(r)
    out = pd.DataFrame(rows).reset_index(drop=True)
    return out
