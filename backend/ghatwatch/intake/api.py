"""Intake REST router (full paths under /api/intake) + the user-data merge used by /api/ranking."""
from __future__ import annotations

import threading
from typing import Any

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from . import ocr as OCR
from . import pipeline as P
from .schema import job_summary
from .store import get_store

router = APIRouter(prefix="/api/intake", tags=["intake"])


class JSONUTF8(JSONResponse):
    media_type = "application/json; charset=utf-8"


def _job_or_404(job_id: str) -> dict:
    job = get_store().get(job_id)
    if job is None:
        raise HTTPException(404, f"Unknown job '{job_id}'")
    return job


@router.get("/capabilities")
def capabilities() -> dict:
    return OCR.capabilities()


@router.post("/upload")
async def upload(file: UploadFile = File(...), year: int | None = Form(None), festival: str | None = Form(None),
                 pages: str | None = Form(None), force_ocr: bool = Form(False)) -> dict:
    data = await file.read(P.MAX_BYTES + 1)
    if len(data) > P.MAX_BYTES:
        raise HTTPException(413, "File larger than 25 MB.")
    if not data:
        raise HTTPException(422, "Empty file.")
    if festival and festival not in ("Ganesh", "Durga"):
        raise HTTPException(422, "festival must be 'Ganesh' or 'Durga'.")
    job = P.start_upload(data, file.filename, year, festival or None, (pages or "").strip() or None, bool(force_ocr))
    return {"job_id": job["id"]}


class ManualSite(BaseModel):
    slug: str | None = None
    name: str | None = None


class ManualCell(BaseModel):
    value: float | None = None
    flag: str | None = None


class ManualBody(BaseModel):
    year: int
    festival: str
    site: ManualSite
    phase: str
    readings: dict[str, ManualCell] = Field(default_factory=dict)
    source_note: str | None = None


@router.post("/manual")
def manual(body: ManualBody) -> dict:
    if body.festival not in ("Ganesh", "Durga"):
        raise HTTPException(422, "festival must be 'Ganesh' or 'Durga'.")
    if body.phase not in ("pre", "during", "after"):
        raise HTTPException(422, "phase must be pre, during or after.")
    if not body.site.slug and not (body.site.name or "").strip():
        raise HTTPException(422, "Give site.slug or site.name.")
    job = P.start_manual(body.model_dump())
    return {"job_id": job["id"]}


@router.get("/jobs")
def jobs() -> list[dict]:
    st = get_store()
    with st.lock:
        return [job_summary(j) for j in st.list()]


@router.get("/jobs/{job_id}")
def job(job_id: str) -> Any:
    _job_or_404(job_id)
    return JSONUTF8(get_store().snapshot(job_id))


@router.get("/jobs/{job_id}/page/{n}.png")
def page_png(job_id: str, n: int) -> FileResponse:
    job = _job_or_404(job_id)
    st = get_store()
    p = st.pages_dir(job_id) / f"page-{n}.png"
    if not p.exists() and job["source"].get("mime") == "application/pdf" and OCR.status().get("render"):
        src = st.upload_dir(job_id) / (job["source"].get("file_name") or "")
        if src.exists():
            OCR.run_worker(src, st.pages_dir(job_id) / f"render-{n}.json", str(n), render_only=True, timeout=120)
    if not p.exists():
        raise HTTPException(404, "Page image not available (page renderer needs backend/.ocr-venv with pypdfium2).")
    return FileResponse(p, media_type="image/png")


class RowsBody(BaseModel):
    rows: list[dict] = Field(default_factory=list)


@router.post("/jobs/{job_id}/rerun")
def rerun(job_id: str, body: RowsBody) -> Any:
    job = _job_or_404(job_id)
    if job["status"] == "running":
        raise HTTPException(409, "Job is still running.")
    if not body.rows:
        raise HTTPException(422, "Give the corrected rows.")
    P.rerun(job_id, body.rows)
    return JSONUTF8(get_store().snapshot(job_id))


@router.post("/jobs/{job_id}/accept")
def accept(job_id: str, body: RowsBody | None = None) -> dict:
    job = _job_or_404(job_id)
    if job["status"] == "running":
        raise HTTPException(409, "Job is still running.")
    if job["status"] == "failed" and not (body and body.rows):
        raise HTTPException(409, "Job failed; nothing to accept.")
    return P.accept(job_id, body.rows if body else None)


@router.post("/jobs/{job_id}/reject")
def reject(job_id: str) -> dict:
    job = _job_or_404(job_id)
    st = get_store()
    removed = st.remove_accepted(job_id)
    with st.lock:
        job["status"] = "rejected"
    st.save(job_id)
    if removed:
        invalidate_ranking_cache()
    return {"ok": True}


@router.get("/jobs/{job_id}/report")
def report(job_id: str) -> Any:
    _job_or_404(job_id)
    r = P.read_report(get_store(), job_id)
    if r is None:
        raise HTTPException(404, "Report not ready yet.")
    return JSONUTF8(r)


@router.get("/accepted")
def accepted() -> Any:
    return JSONUTF8(get_store().accepted_groups())


@router.delete("/accepted/{job_id}")
def remove_accepted(job_id: str) -> dict:
    st = get_store()
    n = st.remove_accepted(job_id)
    job = st.get(job_id)
    if job is not None and job["status"] == "accepted":
        with st.lock:
            job["status"] = "needs_review"
        st.save(job_id)
    if n == 0 and job is None:
        raise HTTPException(404, f"No accepted rows for job '{job_id}'")
    invalidate_ranking_cache()
    return {"ok": True}


# ---------------------------------------------------------------- /api/ranking integration

_RANK_CACHE: dict = {}
_RANK_LOCK = threading.Lock()


def invalidate_ranking_cache() -> None:
    with _RANK_LOCK:
        _RANK_CACHE.clear()


def _csv_stamp() -> tuple:
    from ..data import accepted_csv
    p = accepted_csv()
    if not p.exists():
        return (str(p), 0, 0)
    s = p.stat()
    return (str(p), s.st_mtime_ns, s.st_size)


def with_user_data(base: dict, include_user: bool = True) -> dict:
    """v1 ranking + `user_data`; when accepted officer rows exist (and include_user) the ghats are re-scored
    with them (forecasts kept from the v1 payload)."""
    off = {"included": False, "rows": 0, "sources": []}
    if not include_user:
        return base | {"user_data": off}
    from .analyze import user_extra
    stamp = _csv_stamp()
    if stamp[1] == 0:
        return base | {"user_data": off}
    with _RANK_LOCK:
        hit = _RANK_CACHE.get(stamp)
        if hit is not None and hit[0] == base.get("generated_at"):
            return hit[1]
    extra, ud = user_extra()
    if not ud["included"]:
        return base | {"user_data": off}
    from ..artifacts import now_ist
    from ..scoring import ranking_payload
    full = ranking_payload(now_ist(), extra_by_slug=extra, user_data=ud)
    fc = {g["slug"]: g.get("forecast") for g in base.get("ghats", [])}
    for g in full["ghats"]:
        if fc.get(g["slug"]) is not None:
            g["forecast"] = fc[g["slug"]]
    with _RANK_LOCK:
        _RANK_CACHE.clear()
        _RANK_CACHE[stamp] = (base.get("generated_at"), full)
    return full
