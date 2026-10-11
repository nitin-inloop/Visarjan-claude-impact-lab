"""Scoring-flaw fixes, implausible-value handling, synthetic dummy reports and the Claude-extractor hook.

No network. Runtime intake data goes to a temporary GHATWATCH_INTAKE_DIR.
"""
from __future__ import annotations

import json
import os
import sys
import tempfile
import time
from pathlib import Path

import pytest

os.environ.setdefault("GHATWATCH_INTAKE_DIR", tempfile.mkdtemp(prefix="ghatwatch-fixes-"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.data import load_bhopal  # noqa: E402
from ghatwatch.scoring import (ImplausibleReading, Reading, assess_ghat, context_candidates,  # noqa: E402
                               decide_tier, entered_readings, implausible, rank_all)

DUMMY = Path(__file__).resolve().parents[2] / "samples" / "dummy"


def R(param: str, v: float, year: int = 2026, fest: str = "Durga", phase: str = "pre") -> Reading:
    return Reading(year, fest, phase, param, v, None if param == "pH" else "mg/l", None, entered=True)


@pytest.fixture(scope="module")
def client():
    from fastapi.testclient import TestClient
    from ghatwatch.api import app
    return TestClient(app)


def _wait(client, job_id: str, timeout: float = 60.0) -> dict:
    t0 = time.time()
    while time.time() - t0 < timeout:
        j = client.get(f"/api/intake/jobs/{job_id}").json()
        if j["status"] != "running":
            return j
        time.sleep(0.2)
    raise AssertionError(f"job {job_id} still running")


# ---------------------------------------------------------------- scoring

def test_new_site_without_do_and_bod_is_insufficient():
    assert decide_tier(None, 0.0, False, [], has_2026=True, new_site=True)[0] == "insufficient_data"
    tier, rule = decide_tier(0.0, 0.0, False, [R("pH", 7.2)], has_2026=True, new_site=True)
    assert tier == "insufficient_data" and rule["en"].startswith("Test first:")
    assert decide_tier(0.1, 0.0, False, [R("Dissolved oxygen", 7), R("BOD", 2)], new_site=True)[0] == "low"


def test_2026_entry_clears_insufficient_only_with_do_and_bod():
    df = load_bhopal()
    ctx = context_candidates(df)
    assert assess_ghat(df, "bairagarh", ctx)["tier"] == "insufficient_data"
    assert assess_ghat(df, "bairagarh", ctx, extra=[R("pH", 7.0)])["tier"] == "insufficient_data"
    assert assess_ghat(df, "bairagarh", ctx, extra=[R("Dissolved oxygen", 6.0)])["tier"] == "insufficient_data"
    both = assess_ghat(df, "bairagarh", ctx, extra=[R("Dissolved oxygen", 6.0), R("BOD", 2.0)])
    assert both["tier"] != "insufficient_data"


def test_insufficient_tier_rule_leads_with_worst_recent_reading():
    g = next(x for x in rank_all() if x["slug"] == "bairagarh")
    assert g["tier"] == "insufficient_data"
    assert g["tier_rule"]["en"] == ("Test first: no Durga 2025 test. Last test: DO 0 mg/l during Ganesh 2025 "
                                    "(2025 report p. 28).")
    assert g["tier_rule"]["hi"].startswith("पहले जांच करें:")


def test_low_tier_wording_with_only_2026_readings():
    rd = [R("Dissolved oxygen", 7.0), R("BOD", 4.0), R("pH", 7.5)]
    tier, rule = decide_tier(0.05, 0.0, False, rd, has_2026=True, new_site=True)
    assert tier == "low"
    assert "in 2026" in rule["en"] and "since 2024" not in rule["en"]


def test_implausible_values_rejected():
    assert implausible("Dissolved oxygen", -5) and implausible("Dissolved oxygen", 45)
    assert implausible("pH", 15) and implausible("BOD", 501) and implausible("BOD", -1)
    assert implausible("Dissolved oxygen", 0) is None and implausible("pH", 7.1) is None
    with pytest.raises(ImplausibleReading):
        entered_readings({"DO": -5})


def test_whatif_422_for_implausible(client):
    for pre, word in (({"DO": -5}, "negative"), ({"DO": 45}, "plausible range"), ({"pH": 15}, "plausible range"),
                      ({"COD": -1}, "negative")):
        r = client.post("/api/whatif", json={"slug": "bairagarh", "pre": pre})
        assert r.status_code == 422, (pre, r.text)
        assert word in r.json()["detail"]
    ok = client.post("/api/whatif", json={"slug": "bairagarh", "pre": {"DO": 4.5, "BOD": 6}})
    assert ok.status_code == 200 and ok.json()["tier"] != "insufficient_data"
    ns = client.post("/api/whatif", json={"new_site": {"name": "x"}, "pre": {"pH": 7}}).json()
    assert ns["tier"] == "insufficient_data"


# ---------------------------------------------------------------- intake: implausible values

def test_manual_implausible_value_is_held_back(client):
    base = {g["slug"]: (g["tier"], g["score"]) for g in client.get("/api/ranking").json()["ghats"]}
    body = {"year": 2026, "festival": "Durga", "site": {"slug": "malikhedi", "name": "Malikhedi kund"},
            "phase": "pre", "readings": {"Dissolved oxygen": {"value": -5, "flag": None},
                                         "BOD": {"value": 4.0, "flag": None}}, "source_note": "test"}
    jid = client.post("/api/intake/manual", json=body).json()["job_id"]
    job = _wait(client, jid)
    do = next(r for r in job["rows"] if r["parameter"] == "Dissolved oxygen")
    assert do["needs_review"] is True
    assert any(i["level"] == "error" and i["row_id"] == do["row_id"] for i in job["issues"])
    st = next(s for s in job["analysis"]["readings"] if s["row_id"] == do["row_id"])
    assert st["status"] != "ok" and st.get("needs_review") is True
    g = next(x for x in job["analysis"]["ghats"] if x["slug"] == "malikhedi")
    assert "-5" not in json.dumps(g["reasons"])
    res = client.post(f"/api/intake/jobs/{jid}/accept", json={}).json()
    assert res["accepted_rows"] == 1 and res["held_back"] == 1
    mk = next(x for x in client.get("/api/ranking").json()["ghats"] if x["slug"] == "malikhedi")
    assert "-5" not in mk["tier_rule"]["en"] and mk["tier"] == "insufficient_data"  # BOD alone does not clear it
    assert client.delete(f"/api/intake/accepted/{jid}").json()["ok"]
    assert {g["slug"]: (g["tier"], g["score"]) for g in client.get("/api/ranking").json()["ghats"]} == base


# ---------------------------------------------------------------- synthetic dummy report, end to end

@pytest.mark.skipif(not (DUMMY / "expected.json").exists(), reason="run scripts/make_dummy_reports.py first")
def test_dummy_text_pdf_matches_expected(client):
    exp = json.loads((DUMMY / "expected.json").read_text(encoding="utf-8"))
    pdf = (DUMMY / "durga-2026-pre-SYNTHETIC.pdf").read_bytes()
    jid = client.post("/api/intake/upload", files={"file": ("dummy.pdf", pdf, "application/pdf")}).json()["job_id"]
    job = _wait(client, jid)
    assert job["status"] == "needs_review", job.get("error")
    got = {(r["site_as_printed"], r["parameter"]): r for r in job["rows"]}
    assert len(got) == len(exp["rows"]) == 51
    for e in exp["rows"]:
        r = got[(e["site_as_printed"], e["parameter"])]
        assert (r["value"], r["flag"], r["slug"], r["page"], r["phase"], r["year"], r["festival"]) == (
            e["value"], e["flag"], e["slug"], e["page"], e["phase"], e["year"], e["festival"]), e
    assert ("Sant Hirdaram Visarjankund, Bairagarh, Bhopal", "Conductivity") not in got
    typo = got[("Khatlapura murti visarjan ghat at lower lake, Bhopal", "Dissolved oxygen")]
    assert typo["needs_review"] and typo["row_id"] in {i["row_id"] for i in job["issues"] if i["level"] == "error"}
    res = client.post(f"/api/intake/jobs/{jid}/accept", json={}).json()
    assert res["held_back"] == 1 and res["accepted_rows"] == 50
    rk = {g["slug"]: g for g in client.get("/api/ranking").json()["ghats"]}
    assert rk["bairagarh"]["tier"] == "high"  # 2026 DO 2.1 + BOD 9.5 now present
    assert all("45" not in json.dumps(r["text"]) for r in rk["khatlapura"]["reasons"])
    assert client.delete(f"/api/intake/accepted/{jid}").json()["ok"]


@pytest.mark.skipif(not (DUMMY / "expected.json").exists(), reason="run scripts/make_dummy_reports.py first")
def test_scanned_dummy_without_ocr_fails_cleanly(client, monkeypatch):
    from ghatwatch.intake import ocr
    if ocr.status(refresh=True)["available"]:
        pytest.skip("OCR installed; slow OCR path not exercised here")
    pdf = (DUMMY / "durga-2026-pre-SYNTHETIC-scanned.pdf").read_bytes()
    jid = client.post("/api/intake/upload", files={"file": ("scan.pdf", pdf, "application/pdf")}).json()["job_id"]
    job = _wait(client, jid)
    assert job["status"] == "failed" and "PaddleOCR is not installed" in job["error"]
    assert not job["rows"]


# ---------------------------------------------------------------- Claude extractor hook

@pytest.mark.skipif(not (DUMMY / "expected.json").exists(), reason="run scripts/make_dummy_reports.py first")
def test_ai_extract_hook_used_then_fallback(client, monkeypatch):
    from ghatwatch.ai import extract as AI
    calls = []

    def fake(path, mime, year=None, festival=None):
        calls.append((Path(path).name, mime))
        return [{"page": 1, "table": 0, "site_as_printed": "Prempura Visarjanghat, Bhopal", "year": 2026,
                 "festival": "Durga", "phase": "pre", "parameter_as_printed": "D.Oxygen",
                 "value_as_printed": "4.2", "confidence": 0.95},
                {"page": 1, "table": 0, "site_as_printed": "Prempura Visarjanghat, Bhopal", "year": 2026,
                 "festival": "Durga", "phase": "pre", "parameter_as_printed": "BOD",
                 "value_as_printed": "6.4", "confidence": 0.95}]

    monkeypatch.setattr(AI, "available", lambda: True)
    monkeypatch.setattr(AI, "extract_rows", fake)
    pdf = (DUMMY / "durga-2026-pre-SYNTHETIC.pdf").read_bytes()
    jid = client.post("/api/intake/upload", files={"file": ("ai.pdf", pdf, "application/pdf")}).json()["job_id"]
    job = _wait(client, jid)
    assert calls and calls[0][1] == "application/pdf"
    assert job["status"] == "needs_review", job.get("error")
    assert job["source"]["extractor"] == "claude" and len(job["rows"]) == 2
    log = [x["text"] for x in next(s for s in job["stages"] if s["key"] == "extract")["log"]]
    assert any("Claude" in t["en"] for t in log) and any("Claude" in t["hi"] for t in log)
    assert {r["slug"] for r in job["rows"]} == {"prempura"} and all(r["page"] == 1 for r in job["rows"])

    monkeypatch.setattr(AI, "extract_rows", lambda *a, **k: None)  # unavailable / failed -> text parser
    jid = client.post("/api/intake/upload", files={"file": ("ai2.pdf", pdf, "application/pdf")}).json()["job_id"]
    job = _wait(client, jid)
    assert job["status"] == "needs_review" and job["source"]["extractor"] == "text/ocr"
    assert len(job["rows"]) == 51
    log = [x["text"]["en"] for x in next(s for s in job["stages"] if s["key"] == "extract")["log"]]
    assert any("falling back" in t for t in log) and any("PDF text layer / OCR" in t for t in log)
