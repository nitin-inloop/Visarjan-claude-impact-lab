"""Ghat Watch HTTP API (PLAN.md §5). Run from backend/:  uvicorn ghatwatch.api:app --port 8000

Endpoints serve precomputed artifacts when present and compute on the fly otherwise.
ML / CQL endpoints degrade to {"available": false, ...}; they never 500 for a missing artifact.
"""
from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from .artifacts import gaps_payload, now_ist, read_json, split_ranking
from .brief import build_brief
from .data import ARTIFACTS_DIR, PDFS, RESOURCES_DIR, SITE_BY_SLUG
from .scoring import ranking_payload, whatif as score_whatif
from .live.api import router as live_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    from .live.engine import get_engine
    eng = get_engine()
    eng.ensure_started()
    yield
    await eng.stop()


app = FastAPI(title="Ghat Watch API", version="1.0.0", lifespan=lifespan)
_origins = os.environ.get("GHATWATCH_CORS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(CORSMiddleware, allow_origins=_origins, allow_methods=["*"], allow_headers=["*"])
app.include_router(live_router)


def _artifact(rel: str) -> Any | None:
    p = ARTIFACTS_DIR / rel
    return read_json(p) if p.exists() else None


def _computed() -> tuple[dict, dict[str, dict]]:
    full = ranking_payload(now_ist(), detail=True)
    return split_ranking(full)


@app.get("/api/health")
def health() -> dict:
    m = _artifact("manifest.json") or {}
    return {"status": "ok", "artifacts_built_at": m.get("artifacts_built_at")}


@app.get("/api/ranking")
def ranking() -> dict:
    return _artifact("ranking.json") or _computed()[0]


@app.get("/api/ghats/{slug}")
def ghat(slug: str) -> dict:
    if slug not in SITE_BY_SLUG:
        raise HTTPException(404, f"Unknown ghat '{slug}'. Known: {sorted(SITE_BY_SLUG)}")
    return _artifact(f"ghats/{slug}.json") or _computed()[1][slug]


@app.get("/api/gaps")
def gaps() -> dict:
    a = _artifact("gaps.json")
    if a:
        return a
    _, details = _computed()
    return gaps_payload(details, now_ist())


@app.get("/api/brief")
def brief() -> dict:
    return _artifact("brief.json") or (build_brief(ranking()) | {"generated_at": now_ist()})


class WhatIfBody(BaseModel):
    slug: str | None = None
    pre: dict[str, float | None] = Field(default_factory=dict)
    new_site: dict[str, str] | None = None


@app.post("/api/whatif")
def whatif(body: WhatIfBody) -> dict:
    if body.new_site is None and body.slug not in SITE_BY_SLUG:
        raise HTTPException(422, "Give a known 'slug' or a 'new_site' object.")
    pre = {k: v for k, v in body.pre.items() if v is not None}
    out = score_whatif(body.slug, pre, body.new_site)
    try:
        from .ml.predict import whatif_forecast
        out["forecast"] = whatif_forecast(body.slug, pre, body.new_site)
    except Exception as e:  # forecast is optional
        out["forecast"] = {"available": False, "reason": f"forecast failed: {e!r}"}
    return out


@app.get("/api/forecast")
def forecast(slug: str = Query(...)) -> dict:
    if slug not in SITE_BY_SLUG:
        raise HTTPException(404, f"Unknown ghat '{slug}'")
    for g in ranking()["ghats"]:
        if g["slug"] == slug:
            return g.get("forecast") or {"available": False, "reason": "no forecast"}
    return {"available": False, "reason": "no forecast"}


@app.get("/api/models/leaderboard")
def leaderboard() -> dict:
    return _artifact("leaderboard.json") or {"available": False, "reason": "Run scripts/build_artifacts.py to train the models."}


@app.get("/api/allocate")
def allocate(budget: float = Query(8, ge=0, le=100)) -> dict:
    report = _artifact("rl/cql_report.json")
    if report is None:
        return {"available": False, "experimental": True, "budget": budget,
                "reason": "CQL report not built. Run scripts/build_artifacts.py."}
    from .rl.allocate import allocate_payload
    ghats = [ghat(s) for s in SITE_BY_SLUG]
    return allocate_payload(ghats, report, budget)


def _pdf(pdf_id: str) -> FileResponse:
    path = RESOURCES_DIR / PDFS[pdf_id]
    if not path.exists():
        raise HTTPException(404, f"Report {pdf_id} not found")
    return FileResponse(path, media_type="application/pdf", filename=f"{pdf_id}.pdf",
                        content_disposition_type="inline")


@app.get("/pdf/2023.pdf")
def pdf_2023() -> FileResponse:
    return _pdf("2023")


@app.get("/pdf/2024.pdf")
def pdf_2024() -> FileResponse:
    return _pdf("2024")


@app.get("/pdf/2025.pdf")
def pdf_2025() -> FileResponse:
    return _pdf("2025")
