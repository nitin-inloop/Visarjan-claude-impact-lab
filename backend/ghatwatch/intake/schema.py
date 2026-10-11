"""Intake shapes (plain dicts). FROZEN CONTRACT, copied verbatim from docs/PLAN-INTAKE.md §4:

- `GET /api/intake/capabilities` → `{text_pdf: true, ocr: {available: bool, engine: "PaddleOCR 3.x"|null, venv: "backend/.ocr-venv", how_to_enable{en,hi}}, max_upload_mb: 25}`.
- `POST /api/intake/upload` (multipart: `file`, optional `year`, `festival`, `pages` like "28-30", `force_ocr` bool) → `{job_id}`. `POST /api/intake/manual` body `{year, festival, site: {slug|null, name}, phase, readings: {parameter: {value: number|null, flag: string|null}}, source_note}` → `{job_id}`.
- `GET /api/intake/jobs` → `[JobSummary]`; `GET /api/intake/jobs/{id}` → `Job`; `GET /api/intake/jobs/{id}/page/{n}.png` → PNG (rendered page or uploaded image); `POST /api/intake/jobs/{id}/rerun` body `{rows: [Row]}` (corrected rows) → `Job`; `POST /api/intake/jobs/{id}/accept` body `{rows: [Row]}` → `{ok, accepted_rows, ranking_changed: [slug]}`; `POST /api/intake/jobs/{id}/reject` → `{ok}`; `GET /api/intake/jobs/{id}/report` → `{markdown{en,hi}}`; `GET /api/intake/accepted` → `{rows: n, groups: [{job_id, source_file, year, festival, slug, site_name, phases: [..], rows, accepted_at}]}`; `DELETE /api/intake/accepted/{job_id}` → `{ok}`.
- `Row = {row_id, page: number|null, site_as_printed, slug: string|null, site_match_confidence: number, year, festival: "Ganesh"|"Durga", phase: "pre"|"during"|"after", parameter (standard name), parameter_as_printed, value: number|null, flag: string|null, value_as_printed, unit_assumed, confidence: number (0–1; 1.0 for manual), issues: [issue_id], already_in_pack: bool}`.
- `Stage = {key: "extract"|"normalize"|"validate"|"analyze"|"report", title{en,hi}, status: "pending"|"running"|"done"|"failed"|"skipped", started: iso|null, finished: iso|null, log: [{t: iso, text{en,hi}}], summary{en,hi}|null}`.
- `Job = {id, created: iso, kind: "upload"|"manual", source: {file_name|null, mime|null, pages: [n], bytes|null, ocr_used: bool, ocr_engine: string|null}, context: {year, festival}, status: "running"|"needs_review"|"accepted"|"rejected"|"failed", stages: [Stage], rows: [Row], issues: [{id, row_id|null, level: "info"|"warn"|"error", text{en,hi}}], quality: {rows: n, numeric: n, flagged: n, mean_confidence: number, tables_found: n, sites_matched: n, sites_unmatched: n}, analysis: Analysis|null, report_available: bool}`.
- `Analysis = {standard: "CPCB class B", readings: [{row_id, status: "breach"|"ok"|"no_limit"|"missing", limit_text}], ghats: [{slug, name{en,hi}, before: {tier, score, rank}, after: {tier, score, rank}, changed: bool, reasons: [v1 reason shape with source {report|null, pdf|null, page|null, upload: job_id|null}], forecast: {available, champion, p_breach, models{logreg,random_forest,xgboost,lightgbm}, top_reasons, basis{year,festival,phase}}|null, allocation_hint: {action, text{en,hi}}|null}], summary{en,hi}}`.
- `GET /api/ranking` adds `user_data: {included: bool, rows: n, sources: [{job_id, file_name, year, festival}]}`; `?include_user=0` supported. Reason `source` gains optional `upload`.

Additive (non-breaking) fields this backend also sends: Job.ocr {engine, elapsed_s, mean_conf, words,
measured_recovery|null}, Job.error (str|null) and JobSummary = {id, created, kind, status, file_name,
year, festival, rows, report_available}.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

IST = timezone(timedelta(hours=5, minutes=30))

STAGES = [
    ("extract", "Extractor", "निष्कर्षक"),
    ("normalize", "Normaliser", "मानकीकरण"),
    ("validate", "Validator", "सत्यापनकर्ता"),
    ("analyze", "Analyst", "विश्लेषक"),
    ("report", "Reporter", "रिपोर्टर"),
]
STANDARD_PARAMS = ["pH", "Total solids", "Dissolved solids", "Suspended solids", "Dissolved oxygen", "BOD",
                   "COD", "Turbidity", "Conductivity", "Chromium", "Lead", "Zinc", "Copper"]
UNITS = {"pH": None, "Conductivity": "µS/cm", "Turbidity": "NTU"}
NOT_VERIFIED = {"en": "officer-added readings, not yet verified by MPPCB",
                "hi": "अधिकारी द्वारा जोड़ी गई रीडिंग, MPPCB द्वारा अभी सत्यापित नहीं"}


def unit_for(param: str) -> str | None:
    return UNITS.get(param, "mg/l")


def now_iso() -> str:
    return datetime.now(IST).isoformat(timespec="seconds")


def bi(en: str, hi: str) -> dict:
    return {"en": en, "hi": hi}


def new_stage(key: str, en: str, hi: str) -> dict:
    return {"key": key, "title": bi(en, hi), "status": "pending", "started": None, "finished": None,
            "log": [], "summary": None}


def new_stages() -> list[dict]:
    return [new_stage(*s) for s in STAGES]


def empty_quality() -> dict:
    return {"rows": 0, "numeric": 0, "flagged": 0, "mean_confidence": 0.0, "tables_found": 0,
            "sites_matched": 0, "sites_unmatched": 0}


def job_summary(job: dict) -> dict:
    return {"id": job["id"], "created": job["created"], "kind": job["kind"], "status": job["status"],
            "file_name": job["source"].get("file_name"), "year": job["context"].get("year"),
            "festival": job["context"].get("festival"), "rows": len(job.get("rows") or []),
            "report_available": bool(job.get("report_available"))}
