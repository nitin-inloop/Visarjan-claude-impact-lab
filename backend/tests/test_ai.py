"""AI layer tests (docs/METHOD-AI.md). Run from repo root:  python -m pytest backend/tests/test_ai.py -q

No network, no keys: Cerebras and Claude are mocked. Covers the no-key template path, the guards
(invented numbers, health words, estimate wording, length), mocked AI paths, alert rules and endpoints.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from types import SimpleNamespace

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.ai import alerts as A  # noqa: E402
from ghatwatch.ai import analyze as AN  # noqa: E402
from ghatwatch.ai import extract as EX  # noqa: E402
from ghatwatch.ai import guards as G  # noqa: E402
from ghatwatch.ai import llm  # noqa: E402

NAME = {"en": "Shahpura lake ghat", "hi": "शाहपुरा झील घाट"}


@pytest.fixture(autouse=True)
def no_keys(monkeypatch):
    for k in ("CEREBRAS_API_KEY", "ANTHROPIC_API_KEY", "GHATWATCH_AI", "CEREBRAS_MODEL", "GHATWATCH_CLAUDE_MODEL",
              "GHATWATCH_CLAUDE_FAST_MODEL", "GHATWATCH_ANSWER_PROVIDERS"):
        monkeypatch.delenv(k, raising=False)


def _job() -> dict:
    rows = [
        {"row_id": "r1", "page": 3, "site_as_printed": "Shahpura", "slug": "shahpura", "year": 2026,
         "festival": "Durga", "phase": "pre", "parameter": "Dissolved oxygen", "value": 2.1, "flag": None,
         "value_as_printed": "2.1", "unit_assumed": "mg/l", "confidence": 1.0, "issues": []},
        {"row_id": "r2", "page": 3, "site_as_printed": "Shahpura", "slug": "shahpura", "year": 2026,
         "festival": "Durga", "phase": "pre", "parameter": "BOD", "value": None, "flag": "not sampled",
         "value_as_printed": "", "unit_assumed": "mg/l", "confidence": 1.0, "issues": []},
        {"row_id": "r3", "page": 3, "site_as_printed": "Shahpura", "slug": "shahpura", "year": 2026,
         "festival": "Durga", "phase": "pre", "parameter": "pH", "value": 14.9, "flag": None,
         "value_as_printed": "14.9", "unit_assumed": None, "confidence": 1.0, "issues": ["i1"]},
    ]
    return {"id": "job1", "status": "accepted", "source": {"file_name": "lab.pdf"},
            "context": {"year": 2026, "festival": "Durga"}, "rows": rows,
            "issues": [{"id": "i1", "row_id": "r3", "level": "error",
                        "text": {"en": "pH: 14.9 is outside the plausible range 0–14.", "hi": "पीएच: 14.9 सीमा 0–14 से बाहर है।"}}],
            "analysis": {"readings": [{"row_id": "r1", "status": "breach"}, {"row_id": "r2", "status": "missing"},
                                      {"row_id": "r3", "status": "breach"}],
                         "ghats": [{"slug": "shahpura", "name": NAME, "changed": True,
                                    "before": {"tier": "medium", "score": 0.2, "rank": 4},
                                    "after": {"tier": "high", "score": 0.31, "rank": 2},
                                    "reasons": [{"kind": "breach", "parameter": "Dissolved oxygen", "value": 2.1}],
                                    "forecast": {"available": True, "p_breach": 0.8712, "champion": "random_forest",
                                                 "basis": {"year": 2026, "festival": "Durga", "phase": "pre"}}}]}}


def _ranking() -> dict:
    def reason(p, v, page, year=2025):
        return {"kind": "breach", "parameter": p, "value": v, "year": year, "festival": "Durga",
                "source": {"report": "MPPCB 2025", "pdf": "2025", "page": page},
                "text": {"en": f"{p} was {v:g} mg/l (page {page}).", "hi": f"{p} {v:g} mg/l था (पृष्ठ {page})।"}}
    return {"ghats": [
        {"slug": "bairagarh", "name": {"en": "Bairagarh", "hi": "बैरागढ़"}, "rank": 1, "tier": "insufficient_data",
         "reasons": [reason("Dissolved oxygen", 0.0, 28), reason("BOD", 13.2, 69, 2024),
                     {"kind": "gap", "year": 2025, "festival": "Durga", "source": {"report": "MPPCB 2025", "page": 64},
                      "text": {"en": "No Durga 2025 test exists for this ghat.", "hi": "दुर्गा 2025 की जांच नहीं है।"}}]},
        {"slug": "shahpura", "name": NAME, "rank": 2, "tier": "high",
         "reasons": [reason("Dissolved oxygen", 2.4, 30), reason("BOD", 5.0, 30)]},
        {"slug": "prempura", "name": {"en": "Prempura", "hi": "प्रेमपुरा"}, "rank": 3, "tier": "low",
         "reasons": [reason("Dissolved oxygen", 4.2, 29)]},
    ]}


# ---------------------------------------------------------------- guards
def test_number_guard_rejects_invented_number():
    facts = "DO 2.1 mg/l at Shahpura, page 3; estimate 87%"
    assert G.numbers_ok("DO was 2.1 mg/l on page 3.", facts)
    assert not G.numbers_ok("DO was 2.5 mg/l on page 3.", facts)          # invented
    assert not G.numbers_ok("DO was 2.1 mg/l on page 3; 12 crews needed.", facts)


def test_number_guard_is_two_way_and_allows_dates():
    tmpl = "DO 2.1 mg/l (page 3). Aerate by 19 Oct."
    assert G.numbers_ok("Oxygen is 2.1 mg/l (page 3). Put aerators by 19 Oct, before 20 Oct 2026.", tmpl, tmpl)
    assert not G.numbers_ok("Oxygen is low (page 3). Aerate by 19 Oct.", tmpl, tmpl)  # dropped 2.1
    assert G.numbers("घुलित ऑक्सीजन २.१ mg/l") == {"2.1"}                            # Devanagari digits


def test_health_estimate_length_guards():
    assert not G.health_ok("The water is unsafe and may cause skin disease.")
    assert not G.health_ok("यह पानी स्वास्थ्य के लिए हानिकारक है।")
    assert G.health_ok("Dissolved oxygen is below the bathing limit.")
    assert not G.estimate_ok("Shahpura will breach the limit.", "en", True)
    assert not G.estimate_ok("87% chance of a breach.", "en", True)
    assert G.estimate_ok("Model estimate: 87% chance of a breach.", "en", True)
    assert G.estimate_ok("मॉडल का अनुमान 87% है।", "hi", True)
    assert not G.length_ok("x. " * 400, "en")


# ---------------------------------------------------------------- no-key template path
def test_no_key_template_answer():
    assert llm.status() == {"cerebras": False, "claude": False, "documents": False, "text": False}
    out = AN.answer(_job())
    assert out["ai_written"] is False and out["provider"] == "template" and out["numbers_checked"] is True
    en, hi = out["text"]["en"], out["text"]["hi"]
    assert "MEDIUM to HIGH" in en and "Shahpura" in en
    assert "estimate" in en and "87%" in en and "अनुमान" in hi
    assert "page 3" in en and "missing, not clean" in en
    assert "19 Oct" in en and "19 अक्टूबर" in hi
    for L in ("en", "hi"):  # the template itself passes every guard
        assert G.check(out["text"][L], L, json.dumps(out["facts"], ensure_ascii=False), out["text"][L], True) == []
    assert EX.extract_rows(Path("x.pdf"), "application/pdf") is None


# ---------------------------------------------------------------- mocked AI
class _Resp:
    def __init__(self, text):
        self._t = text

    def raise_for_status(self):
        pass

    def json(self):
        return {"choices": [{"message": {"content": self._t}}]}


def test_mocked_cerebras_good_output_is_used(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    good = {"en": tmpl["en"].replace("This report", "The new report"), "hi": tmpl["hi"]}
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(good, ensure_ascii=False)))
    out = AN.answer(_job())
    assert out["ai_written"] is True and out["provider"] == "cerebras"
    assert out["text"]["en"].startswith("The new report") and isinstance(out["latency_ms"], int)


def test_mocked_cerebras_invented_number_falls_back_to_template(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    bad = {"en": tmpl["en"] + " Send 12 aerators.", "hi": tmpl["hi"]}
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(bad, ensure_ascii=False)))
    out = AN.answer(_job())
    assert out["ai_written"] is False and out["text"] == tmpl and "en:numbers" in out["guards_failed"]


def test_mocked_health_claim_falls_back(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    bad = {"en": tmpl["en"] + " Bathing here is unsafe.", "hi": tmpl["hi"]}
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(bad, ensure_ascii=False)))
    out = AN.answer(_job())
    assert out["ai_written"] is False and "en:health_words" in out["guards_failed"]


def _mock_claude(monkeypatch, text=None, fail=False, seen=None):
    monkeypatch.setattr(llm, "claude_configured", lambda: True)

    class _Msgs:
        def create(self, **kw):
            if seen is not None:
                seen.append(kw)
            if fail:
                raise TimeoutError("slow")
            return SimpleNamespace(stop_reason="end_turn", content=[SimpleNamespace(type="text", text=text)])
    monkeypatch.setattr(llm, "_claude_client", lambda timeout: (seen.append({"timeout": timeout}) if seen is not None
                                                                else None) or SimpleNamespace(messages=_Msgs()))


def test_answer_uses_fast_claude_first_grounded_on_extracted_rows(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    good = {"en": tmpl["en"].replace("This report", "Your report"), "hi": tmpl["hi"]}

    def no_cerebras(*a, **k):
        raise AssertionError("Cerebras must not be called when Claude passes")
    monkeypatch.setattr(llm.httpx, "post", no_cerebras)
    seen = []
    _mock_claude(monkeypatch, json.dumps(good, ensure_ascii=False), seen=seen)
    out = AN.answer(_job())
    assert out["ai_written"] is True and out["provider"] == "claude" and out["model"] == "claude-haiku-5-5"
    assert out["extractor"] == "text" and out["numbers_checked"] is True and isinstance(out["latency_ms"], int)
    assert out["text"]["en"].startswith("Your report")
    timeout = next(x["timeout"] for x in seen if "timeout" in x)
    kw = next(x for x in seen if "model" in x)
    assert timeout <= 10 and kw["max_tokens"] <= 1500
    assert kw["thinking"] == {"type": "disabled"} and kw["output_config"]["effort"] == "low"
    prompt = kw["messages"][0]["content"]
    assert "EXTRACTED" in prompt and "extracted_rows" in prompt and "value_as_printed" in prompt
    assert "before_tier" in prompt and "breaches_vs_limits" in prompt and "20 Oct 2026" in prompt


def test_claude_failure_falls_to_cerebras(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    _mock_claude(monkeypatch, fail=True)
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(tmpl, ensure_ascii=False)))
    out = AN.answer(_job())
    assert out["ai_written"] is True and out["provider"] == "cerebras"


def test_claude_guard_failure_falls_to_cerebras_then_template(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test")
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    bad = {"en": tmpl["en"] + " Send 12 aerators.", "hi": tmpl["hi"]}
    _mock_claude(monkeypatch, json.dumps(bad, ensure_ascii=False))
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(bad, ensure_ascii=False)))
    out = AN.answer(_job())
    assert out["ai_written"] is False and out["provider"] == "template" and out["text"] == tmpl
    assert "en:numbers" in out["guards_failed"]


def test_answer_provider_order_and_fast_model_env(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test")
    monkeypatch.setenv("GHATWATCH_ANSWER_PROVIDERS", "cerebras,claude")
    monkeypatch.setenv("GHATWATCH_CLAUDE_FAST_MODEL", "claude-sonnet-5-5")
    assert llm.answer_providers() == ["cerebras", "claude"] and llm.claude_fast_model() == "claude-sonnet-5-5"
    tmpl = AN.answer(_job(), use_ai=False)["text"]
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps(tmpl, ensure_ascii=False)))
    _mock_claude(monkeypatch, json.dumps(tmpl, ensure_ascii=False))
    assert AN.answer(_job())["provider"] == "cerebras"

    def boom(*a, **k):
        raise TimeoutError("slow")
    monkeypatch.setattr(llm.httpx, "post", boom)
    seen = []
    _mock_claude(monkeypatch, json.dumps(tmpl, ensure_ascii=False), seen=seen)
    out = AN.answer(_job())
    kw = next(x for x in seen if "model" in x)
    assert out["provider"] == "claude" and out["model"] == "claude-sonnet-5-5" and "thinking" not in kw
    monkeypatch.setenv("GHATWATCH_ANSWER_PROVIDERS", "bogus")
    assert llm.answer_providers() == ["claude", "cerebras"]


def test_mocked_claude_extraction_shape_and_cross_check(monkeypatch, tmp_path):
    pdf = tmp_path / "r.pdf"
    pdf.write_bytes(b"%PDF-1.4 fake")
    data = {"rows": [
        {"page": 2, "table": 0, "site_as_printed": "Shahpura", "year": 2025, "festival": "Durga", "phase": "pre",
         "parameter_as_printed": "D.O.", "value_as_printed": "4.2", "legible": True},
        {"page": 2, "table": 0, "site_as_printed": "Shahpura", "year": 0, "festival": "unknown", "phase": "during",
         "parameter_as_printed": "D.O.", "value_as_printed": "", "legible": True},
        {"page": 2, "table": 0, "site_as_printed": "Shahpura", "year": 2025, "festival": "Durga", "phase": "after",
         "parameter_as_printed": "D.O.", "value_as_printed": "7.7", "legible": True},
        {"page": 2, "table": 0, "site_as_printed": "Shahpura", "year": 2025, "festival": "Durga", "phase": "after",
         "parameter_as_printed": "Lead", "value_as_printed": "BDL", "legible": True},
    ]}
    monkeypatch.setattr(llm, "claude_configured", lambda: True)
    seen = {}

    def fake_json(content, schema, system, **kw):
        seen["block"] = content[0]["type"]
        return {"data": data, "provider": "claude", "model": "claude-opus-5-5", "latency_ms": 1234}
    monkeypatch.setattr(llm, "claude_json", fake_json)
    monkeypatch.setattr(EX, "_page_texts", lambda p, m: {2: "Dissolved Oxygen 4.2   -   1.7  Lead BDL"})
    rows = EX.extract_rows(pdf, "application/pdf", 2025, "Durga")
    assert seen["block"] == "document" and len(rows) == 4
    keys = {"page", "table", "site_as_printed", "year", "festival", "phase", "parameter_as_printed",
            "value_as_printed", "confidence"}
    assert all(keys <= set(r) for r in rows)
    assert rows[0]["text_check"] == "match"
    assert rows[1]["value_as_printed"] == "" and rows[1]["year"] == 2025 and rows[1]["festival"] == "Durga"
    assert rows[2]["text_check"] == "mismatch" and rows[2]["confidence"] == EX.MISMATCH_CONFIDENCE
    assert rows[3]["text_check"] == "not_numeric"
    assert EX.LAST_RUN["mismatches"] == 1


# ---------------------------------------------------------------- alerts
def test_alert_rules():
    al = A.build_alerts(_ranking(), [_job()])
    rules = {(a["rule"], a["ghat"]["slug"]) for a in al}
    assert ("do_zero", "bairagarh") in rules
    assert ("bod_above_6", "bairagarh") in rules
    assert ("no_recent_test", "bairagarh") in rules
    assert ("do_below_3", "shahpura") in rules
    assert ("bod_above_6", "shahpura") not in rules        # BOD 5 is not > 6
    assert not any(s == "prempura" for _, s in rules)        # DO 4.2: no DO<3 alert
    assert ("implausible_value", "shahpura") in rules
    assert ("tier_changed", "shahpura") in rules
    assert al[0]["severity"] == "critical" and al[0]["rule"] == "do_zero"
    do0 = al[0]
    assert do0["source"]["page"] == 28 and do0["deadline"]["date"] == "2026-10-19"
    nrt = next(a for a in al if a["rule"] == "no_recent_test")
    assert nrt["deadline"]["date"] == "2026-10-17" and nrt["action"]["code"] == "test"
    assert all(a["message"]["en"] and a["message"]["hi"] for a in al)


def test_alerts_ignore_unaccepted_jobs():
    j = _job() | {"status": "needs_review"}
    rules = {a["rule"] for a in A.build_alerts(_ranking(), [j])}
    assert "implausible_value" not in rules and "tier_changed" not in rules


def test_alert_rephrase_guarded(monkeypatch):
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    al = A.build_alerts(_ranking(), [])
    first = al[0]
    msgs = {first["id"]: "Oxygen was 0 mg/l (page 28).", al[1]["id"]: "BOD was 99 mg/l (page 69)."}
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp(json.dumps({"messages": msgs})))
    out, meta = A.rephrase(al, "en")
    assert meta["ai_written"] is True and meta["rephrased"] == 1
    assert out[0]["message"]["en"] == "Oxygen was 0 mg/l (page 28)."
    assert "99" not in out[1]["message"]["en"]                # invented number rejected, rule text kept


# ---------------------------------------------------------------- endpoints
def test_endpoints_no_key(monkeypatch):
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    from ghatwatch.ai import api as AIAPI
    monkeypatch.setattr(AIAPI, "_ranking", _ranking)
    monkeypatch.setattr(AIAPI, "_jobs", lambda: [_job()])
    monkeypatch.setattr(AIAPI, "_job", lambda jid: _job() if jid == "job1" else None)
    app = FastAPI()
    app.include_router(AIAPI.router)
    c = TestClient(app)
    assert c.get("/api/ai/status").json() == {"cerebras": False, "claude": False, "documents": False, "text": False}
    r = c.get("/api/ai/alerts?lang=hi").json()
    assert r["ai_written"] is False and r["numbers_checked"] is True and r["count"] == len(r["alerts"]) > 0
    a = c.post("/api/ai/jobs/job1/analysis").json()
    assert a["ai_written"] is False and a["provider"] == "template" and a["numbers_checked"] is True
    assert c.post("/api/ai/jobs/nope/analysis").status_code == 404


# ---------------------------------------------------------------- brief polish (two-way guard)
def test_brief_polish_two_way_guard(monkeypatch):
    from ghatwatch import brief as B
    assert B.numbers_preserved("DO 0 mg/l, page 28.", "Oxygen was 0 mg/l (page 28).")
    assert not B.numbers_preserved("DO 0 mg/l, page 28.", "Oxygen was 0 mg/l (page 28), 3 times.")  # added
    assert not B.numbers_preserved("DO 0 mg/l, page 28.", "Oxygen was 0 mg/l.")                      # dropped
    monkeypatch.setenv("GHATWATCH_LLM_POLISH", "1")
    monkeypatch.setenv("CEREBRAS_API_KEY", "test")
    src = {"markdown": {"en": "DO was 0 mg/l (page 28)."}, "polished": False}
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp("Oxygen was 0 mg/l (page 28)."))
    out = B.maybe_polish(json.loads(json.dumps(src)))
    assert out["polished"] is True and out["polish"]["provider"] == "cerebras"
    monkeypatch.setattr(llm.httpx, "post", lambda *a, **k: _Resp("Oxygen was 0 mg/l (page 28); unsafe for skin."))
    out = B.maybe_polish(json.loads(json.dumps(src)))
    assert out["polished"] is False and out["markdown"]["en"] == src["markdown"]["en"]


def test_needs_review_row_raises_review_alert_even_before_accept():
    j = _job() | {"status": "needs_review", "issues": []}
    j["rows"] = [dict(r) for r in j["rows"]]
    j["rows"][2]["needs_review"] = True          # validator: implausible, held back from accept
    al = [a for a in A.build_alerts(_ranking(), [j]) if a["rule"] == "implausible_value"]
    assert len(al) == 1 and al[0]["source"]["page"] == 3 and "14.9" in al[0]["message"]["en"]
    assert al[0]["deadline"]["date"] == "2026-10-15"
    rejected = j | {"status": "rejected"}
    assert not [a for a in A.build_alerts(_ranking(), [rejected]) if a["rule"] == "implausible_value"]
