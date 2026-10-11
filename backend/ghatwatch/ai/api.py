"""AI REST router (full paths under /api/ai). Works with no keys: every endpoint answers with template text.

GET  /api/ai/status                      -> which providers are configured (booleans only)
GET  /api/ai/alerts?lang=en|hi&ai=1      -> deterministic alerts; message optionally rephrased by AI
POST /api/ai/jobs/{job_id}/analysis      -> officer answer (en + hi) for one intake job (POST: may call an LLM)
"""
from __future__ import annotations

from typing import Any, Optional

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from . import alerts as A
from . import analyze as AN
from . import llm

router = APIRouter(prefix="/api/ai", tags=["ai"])
_CACHE: dict = {}  # (kind, content hash) -> response; same input never calls the LLM twice


def _key(*parts: Any) -> str:
    import hashlib
    import json
    return hashlib.sha256(json.dumps(parts, sort_keys=True, ensure_ascii=False, default=str).encode()).hexdigest()


class JSONUTF8(JSONResponse):
    media_type = "application/json; charset=utf-8"


def _ranking() -> dict:
    from ..api import _artifact, _computed  # lazy: avoid import cycle
    from ..intake.api import with_user_data
    return with_user_data(_artifact("ranking.json") or _computed()[0], True)


def _jobs() -> list[dict]:
    from ..intake.store import get_store
    st = get_store()
    return [j for j in (st.snapshot(x["id"]) for x in st.list()) if j]


def _job(job_id: str) -> Optional[dict]:
    from ..intake.store import get_store
    return get_store().snapshot(job_id)


@router.get("/status")
def status() -> dict:
    return llm.status()


@router.get("/alerts")
def alerts(lang: str = "en", ai: int = 1) -> Any:
    if lang not in ("en", "hi"):
        raise HTTPException(400, "lang must be 'en' or 'hi'")
    items = A.build_alerts(_ranking(), _jobs())
    k = _key("alerts", lang, ai, llm.status(), items)
    if k not in _CACHE:
        items, meta = A.rephrase(items, lang) if ai else (items, {"ai_written": False, "provider": "template",
                                                                   "model": None, "latency_ms": 0,
                                                                   "numbers_checked": True, "rephrased": 0})
        _CACHE[k] = {"lang": lang, "visarjan_date": A.VISARJAN.isoformat(), "count": len(items),
                     "alerts": items} | meta
    return JSONUTF8(_CACHE[k])


@router.post("/jobs/{job_id}/analysis")
def job_analysis(job_id: str, ai: int = 1) -> Any:
    job = _job(job_id)
    if job is None:
        raise HTTPException(404, f"Unknown job '{job_id}'")
    if not job.get("analysis"):
        raise HTTPException(409, "This job has no analysis yet.")
    k = _key("analysis", job_id, ai, llm.status(), AN.facts_for(job))
    if k not in _CACHE:
        _CACHE[k] = AN.answer(job, use_ai=bool(ai))
    return JSONUTF8(_CACHE[k])
