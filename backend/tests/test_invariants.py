"""Invariant tests (PLAN.md §6). Run from repo root:  python -m pytest backend/tests -q"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.artifacts import read_json  # noqa: E402
from ghatwatch.brief import build_brief  # noqa: E402
from ghatwatch.data import ARTIFACTS_DIR, SITES, load_bhopal  # noqa: E402
from ghatwatch.scoring import (compute_score, ranking_payload, scored_readings,  # noqa: E402
                               whatif)


@pytest.fixture(scope="module")
def ranking() -> dict:
    return ranking_payload("test", detail=True)


@pytest.fixture(scope="module")
def df() -> pd.DataFrame:
    return load_bhopal()


def _all_rankings(ranking: dict) -> list[dict]:
    """The freshly computed ranking plus the committed artifact, when present."""
    out = [ranking]
    p = ARTIFACTS_DIR / "ranking.json"
    if p.exists():
        out.append(read_json(p))
    return out


def test_1_every_reason_is_traceable(ranking, df):
    for rk in _all_rankings(ranking):
        for g in rk["ghats"]:
            assert g["reasons"], g["slug"]
            for r in g["reasons"]:
                src = r["source"]
                assert src["pdf"] in {"2023", "2024", "2025"} and isinstance(src["page"], int), r
                if r["kind"] == "gap":
                    continue
                m = df[(df["slug"] == g["slug"]) & (df["year"] == r["year"]) & (df["festival"] == r["festival"])
                       & (df["phase"] == r["phase"]) & (df["parameter"] == r["parameter"])
                       & (df["source_page"] == src["page"]) & (df["pdf"] == src["pdf"])]
                assert len(m) == 1, r
                assert np.isclose(float(m["value"].iloc[0]), r["value"]), r
                assert str(src["page"]) in r["text"]["en"] and str(src["page"]) in r["text"]["hi"]


def test_2_low_coverage_never_low_or_medium_and_insufficient_first(ranking):
    tiers = [g["tier"] for g in ranking["ghats"]]
    for g in ranking["ghats"]:
        if g["coverage"] < 0.5:
            assert g["tier"] not in ("low", "medium")
    n_ins = tiers.count("insufficient_data")
    assert tiers[:n_ins] == ["insufficient_data"] * n_ins
    assert [g["rank"] for g in ranking["ghats"]] == list(range(1, len(SITES) + 1))


def test_3_flagged_rows_never_scored(df):
    flagged = df[df["flag"].isin(["BDL", "not sampled", "*", "**", "_"])]
    assert flagged["value"].isna().all()
    assert not flagged["is_numeric"].any()
    for slug in df["slug"].unique():
        g = df[df["slug"] == slug]
        rd = scored_readings(g)
        n_numeric = int((g["parameter"].isin(["Dissolved oxygen", "BOD", "pH"]) & g["value"].notna()).sum())
        assert len(rd) == n_numeric
        # adding flagged rows back as zeros would change the score: prove they are excluded
        sr = compute_score(rd)
        assert sr.n == n_numeric


def test_4_sanity_against_data(ranking):
    by = {g["slug"]: g for g in ranking["ghats"]}
    assert by["bairagarh"]["tier"] == "insufficient_data"
    assert by["bairagarh"]["score"] >= 0.45
    assert by["prempura"]["score"] < by["shahpura"]["score"]
    s = ranking["summary"]
    assert (s["do_readings"], s["do_below_5"], s["do_zero"]) == (116, 42, 4)
    assert (s["bod_readings"], s["bod_above_3"]) == (112, 100)
    assert (s["ph_readings"], s["ph_outside"]) == (115, 6)


def test_5_bounds_and_whatif(ranking):
    for g in ranking["ghats"]:
        assert 0.0 <= g["score"] <= 1.0
        assert 0.0 <= g["breach_rate"] <= 1.0
        assert 0.0 <= g["coverage"] <= 1.0
    for slug in ("bairagarh", "shahpura", "prempura"):
        w = whatif(slug, {"DO": 0.0})
        assert w["score_with_2026"] > w["score_before"], slug
    new = whatif(None, {"DO": 2.0, "BOD": 9.0, "pH": 7.5}, {"name": "New kund", "water_body": "Kund"})
    assert 0.0 <= new["score_with_2026"] <= 1.0


def test_6_models():
    lb_path = ARTIFACTS_DIR / "leaderboard.json"
    if not lb_path.exists() or not (ARTIFACTS_DIR / "models" / "meta.joblib").exists():
        pytest.skip("ML artifacts not built")
    lb = read_json(lb_path)
    assert len(lb["rows"]) == 4
    assert lb["champion"] in {r["model"] for r in lb["rows"]}
    from ghatwatch.ml.predict import bhopal_forecasts, whatif_forecast
    fc = bhopal_forecasts()
    assert set(fc) == {s.slug for s in SITES}
    for f in list(fc.values()) + [whatif_forecast("shahpura", {"DO": 3.1, "BOD": 6.2})]:
        assert f["available"] and len(f["models"]) == 4
        assert all(0.0 <= p <= 1.0 for p in f["models"].values())


def test_7_cql_beats_do_nothing():
    p = ARTIFACTS_DIR / "rl" / "cql_report.json"
    if not p.exists():
        pytest.skip("CQL artifact not built")
    rep = read_json(p)
    v = rep["policy_values"]
    assert v["cql"] >= v["do_nothing"], f"CQL {v['cql']} < do-nothing {v['do_nothing']}: allocate must be unavailable"
    assert rep["check_cql_ge_do_nothing"] is True


def test_8_brief_bilingual(ranking):
    b = build_brief(ranking)
    for s in SITES:
        assert s.name_en in b["markdown"]["en"] and s.name_en in b["plain"]["en"]
        assert s.name_hi in b["markdown"]["hi"] and s.name_hi in b["plain"]["hi"]
    assert "page" in b["markdown"]["en"] and "पृष्ठ" in b["markdown"]["hi"]
    p = ARTIFACTS_DIR / "brief.json"
    if p.exists():
        a = read_json(p)
        assert all(s.name_hi in a["markdown"]["hi"] for s in SITES)
