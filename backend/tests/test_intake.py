"""Phase 3 intake tests (PLAN-INTAKE.md §2). Run from repo root:  python -m pytest backend/tests -q

No network. Runtime data goes to a temporary GHATWATCH_INTAKE_DIR. The OCR test is skipped when
backend/.ocr-venv (PaddleOCR) is absent.
"""
from __future__ import annotations

import os
import sys
import tempfile
import time
from pathlib import Path

import numpy as np
import pytest

_TMP = tempfile.mkdtemp(prefix="ghatwatch-intake-")
os.environ["GHATWATCH_INTAKE_DIR"] = _TMP
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.data import PDFS, RESOURCES_DIR, load_bhopal  # noqa: E402
from ghatwatch.intake.extract_text import extract_pages  # noqa: E402
from ghatwatch.intake.normalize import canon_param, match_site, normalize_rows  # noqa: E402
from ghatwatch.intake.parse_mppcb import parse_pages  # noqa: E402
from ghatwatch.intake.validate import validate  # noqa: E402


def _parse(year: int, pages: list[int]) -> list[dict]:
    pg, _ = extract_pages(RESOURCES_DIR / PDFS[str(year)], pages)
    raw, _ = parse_pages(pg, {})
    rows, _ = normalize_rows(raw, {})
    return rows


def _match(rows: list[dict], truth) -> tuple[int, list]:
    idx = {(r["slug"], r["year"], r["festival"], r["phase"], r["parameter"]): r for r in rows if r["slug"]}
    ok, bad = 0, []
    for t in truth.itertuples():
        p = idx.get((t.slug, t.year, t.festival, t.phase, t.parameter))
        if p is None:
            bad.append(("missing", t.slug, t.festival, t.phase, t.parameter, t.value, t.flag))
        elif t.is_numeric and p["value"] is not None and np.isclose(p["value"], t.value):
            ok += 1
        elif not t.is_numeric and p["value"] is None and p["flag"] == t.flag:
            ok += 1
        else:
            bad.append(("diff", t.slug, t.festival, t.phase, t.parameter, t.value, t.flag, p["value"], p["flag"]))
    return ok, bad


def test_1_parser_reproduces_2025_bhopal_rows():
    rows = _parse(2025, [28, 29, 30, 64, 65])
    df = load_bhopal()
    truth = df[df["year"] == 2025]
    assert len(truth) == 453
    ok, bad = _match(rows, truth)
    share = ok / len(truth)
    print(f"\n2025 parser match: {ok}/{len(truth)} = {share:.2%}; mismatches: {bad[:20]}")
    assert share >= 0.97, bad[:20]
    # non-Bhopal tables on the same pages stay unmatched, never merged into a ghat
    others = {r["site_as_printed"] for r in rows if r["slug"] is None}
    assert any("Sehore" in s for s in others)


def test_2_parser_2024_layout():
    rows = _parse(2024, [69, 70, 71, 72])
    df = load_bhopal()
    truth = df[(df["year"] == 2024) & (df["festival"] == "Ganesh")]
    ok, bad = _match(rows, truth)
    share = ok / len(truth)
    print(f"\n2024 Ganesh parser match: {ok}/{len(truth)} = {share:.2%}; mismatches: {bad[:20]}")
    assert share >= 0.90, bad[:20]


def test_3_normaliser_aliases_and_sites():
    aliases = {"D.Oxygen": "Dissolved oxygen", "DO": "Dissolved oxygen", "Dissolved Oxygen": "Dissolved oxygen",
               "suspended-solids": "Suspended solids", "Total Solids": "Total solids", "Cond.": "Conductivity",
               "TDS": "Dissolved solids", "BOD (5 days 20C)": "BOD", "Cr": "Chromium", "Pb": "Lead",
               "Zn": "Zinc", "Cu": "Copper"}
    for a, std in aliases.items():
        assert canon_param(a) == std, a
    df = load_bhopal()
    variants = df[["site_as_printed", "slug"]].drop_duplicates("slug")
    assert len(variants) == 7
    for sp, slug in variants.itertuples(index=False):
        assert match_site(sp) == (slug, 1.0), sp
    slug, conf = match_site("Gandhi Sagar talab, Mandsaur")
    assert slug is None and conf < 0.5
    slug, conf = match_site("Some unknown pond")
    assert slug is None and conf < 0.5


def _row(i, param, value, slug="shahpura", year=2026, fest="Durga", phase="pre"):
    return {"row_id": f"t{i}", "page": None, "site_as_printed": slug, "slug": slug, "site_match_confidence": 1.0,
            "year": year, "festival": fest, "phase": phase, "parameter": param, "value": value, "flag": None,
            "value_as_printed": str(value), "unit_assumed": None, "confidence": 1.0, "issues": [],
            "already_in_pack": False}


def test_4_validator_flags():
    rows = [_row(1, "Dissolved oxygen", 25.0), _row(2, "pH", 15.0), _row(3, "BOD", -2.0),
            _row(4, "BOD", 4.2, year=2025, fest="Ganesh"),  # Shahpura Ganesh 2025 pre BOD is in the pack
            _row(5, "COD", 30.0)]
    issues, q = validate(rows, set())
    by_row = {r["row_id"]: r for r in rows}
    lv = {i["id"]: i["level"] for i in issues}
    assert any(lv[i] == "error" for i in by_row["t1"]["issues"])
    assert any(lv[i] == "error" for i in by_row["t2"]["issues"])
    assert any(lv[i] == "error" for i in by_row["t3"]["issues"])
    assert by_row["t4"]["already_in_pack"] is True
    assert not by_row["t5"]["issues"]
    for i in issues:
        assert i["text"]["en"] and i["text"]["hi"]


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


def test_5_manual_job_accept_and_ranking(client):
    base = client.get("/api/ranking").json()
    assert base["user_data"]["included"] is False
    orig = {g["slug"]: (g["tier"], g["score"], g["rank"]) for g in base["ghats"]}
    body = {"year": 2026, "festival": "Durga", "site": {"slug": "shahpura", "name": "Shahpura lake ghat"},
            "phase": "pre", "readings": {"Dissolved oxygen": {"value": 1.0, "flag": None},
                                         "BOD": {"value": 0.0, "flag": "BDL"}},
            "source_note": "test"}
    jid = client.post("/api/intake/manual", json=body).json()["job_id"]
    job = _wait(client, jid)
    assert job["status"] == "needs_review", job.get("error")
    g = next(x for x in job["analysis"]["ghats"] if x["slug"] == "shahpura")
    assert g["after"]["tier"] == "high"
    fc = g["forecast"]
    assert fc is not None
    if fc["available"]:
        assert set(fc["models"]) == {"logreg", "random_forest", "xgboost", "lightgbm"}
        assert all(0.0 <= p <= 1.0 for p in fc["models"].values())
    st = {r["row_id"]: r["status"] for r in job["analysis"]["readings"]}
    assert "breach" in st.values()
    res = client.post(f"/api/intake/jobs/{jid}/accept", json={"rows": job["rows"]}).json()
    assert res["ok"] and res["accepted_rows"] == len(job["rows"])
    rk = client.get("/api/ranking").json()
    assert rk["user_data"]["included"] is True and rk["user_data"]["rows"] == len(job["rows"])
    sh = next(x for x in rk["ghats"] if x["slug"] == "shahpura")
    assert sh["tier"] == "high"
    cited = [r for r in sh["reasons"] if (r.get("source") or {}).get("upload") == jid]
    assert cited, sh["reasons"]
    assert cited[0]["source"]["pdf"] is None
    assert "not yet verified by MPPCB" in cited[0]["text"]["en"]
    off = client.get("/api/ranking?include_user=0").json()
    assert off["user_data"]["included"] is False
    assert {g["slug"]: (g["tier"], g["score"], g["rank"]) for g in off["ghats"]} == orig
    acc = client.get("/api/intake/accepted").json()
    assert acc["rows"] == len(job["rows"]) and acc["groups"][0]["slug"] == "shahpura"
    rep = client.get(f"/api/intake/jobs/{jid}/report").json()
    assert "not yet verified by MPPCB" in rep["markdown"]["en"] and "सत्यापित नहीं" in rep["markdown"]["hi"]
    assert client.delete(f"/api/intake/accepted/{jid}").json()["ok"]
    back = client.get("/api/ranking").json()
    assert back["user_data"]["included"] is False
    assert {g["slug"]: (g["tier"], g["score"], g["rank"]) for g in back["ghats"]} == orig


def test_6_pipeline_stages_and_bad_file(client):
    pdf = (RESOURCES_DIR / PDFS["2025"]).read_bytes()
    jid = client.post("/api/intake/upload", files={"file": ("report-2025.pdf", pdf, "application/pdf")},
                      data={"pages": "28-30"}).json()["job_id"]
    job = _wait(client, jid)
    assert job["status"] == "needs_review", job.get("error")
    assert [s["key"] for s in job["stages"]] == ["extract", "normalize", "validate", "analyze", "report"]
    assert all(s["status"] == "done" and s["started"] and s["finished"] and s["log"] for s in job["stages"])
    assert job["context"] == {"year": 2025, "festival": "Ganesh"}
    assert job["quality"]["rows"] >= 7 * 39 and job["quality"]["sites_matched"] == 7
    assert all(r["already_in_pack"] for r in job["rows"] if r["slug"])
    bad = client.post("/api/intake/upload", files={"file": ("notes.txt", b"hello, not a report", "text/plain")}).json()
    bj = _wait(client, bad["job_id"])
    assert bj["status"] == "failed"
    st = {s["key"]: s["status"] for s in bj["stages"]}
    assert st == {"extract": "failed", "normalize": "skipped", "validate": "skipped", "analyze": "skipped",
                  "report": "skipped"}
    caps = client.get("/api/intake/capabilities").json()
    assert caps["text_pdf"] is True and caps["max_upload_mb"] == 25 and "how_to_enable" in caps["ocr"]


def _ocr_ready() -> bool:
    from ghatwatch.intake import ocr
    return bool(ocr.status(refresh=True)["available"]) and not os.environ.get("GHATWATCH_SKIP_OCR_TEST")


@pytest.mark.skipif(not _ocr_ready(), reason="backend/.ocr-venv with PaddleOCR not available")
def test_7_ocr_page_28_khatlapura():
    from ghatwatch.intake import ocr
    from ghatwatch.intake.pipeline import measure_against_pack
    out = Path(_TMP) / "ocr7"
    res = ocr.run_worker(RESOURCES_DIR / PDFS["2025"], out / "ocr.json", "28")
    if res.get("error") and ("ModuleNotFound" in res["error"] or "ImportError" in res["error"]):
        pytest.skip(res["error"])
    assert not res.get("error"), res.get("error")
    assert (out / "page-28.png").exists()
    pages = [{"page": p["page"], "text": p["text"]} for p in res["pages"]]
    raw, _ = parse_pages(pages, {})
    rows, _ = normalize_rows(raw, {})
    kh = [r for r in rows if r["slug"] == "khatlapura"]
    m = measure_against_pack(kh)
    share = m["recovered"] / 39 if m else 0.0
    print(f"\nOCR page 28 Khatlapura: {m and m['recovered']}/39 values recovered ({share:.1%}) "
          f"in {res.get('elapsed_s')} s")
    assert share >= 0.80
