"""Claude-based extraction of readings from an uploaded MPPCB report / lab sheet (PDF or image).

Contract used by the intake pipeline:

    extract_rows(path: Path, mime: str, year: int | None, festival: str | None) -> list[dict] | None

Returns RAW rows in the same shape the intake parser (intake/parse_mppcb.py) produces:
    {page, table, site_as_printed, year, festival, phase, parameter_as_printed, value_as_printed, confidence}
plus additive keys {extractor: "claude", text_check: "match"|"mismatch"|"no_text_layer"|"not_numeric"}.
`value_as_printed` is the cell exactly as printed ("" for a blank cell, "BDL", "*", "**", "_", "ND"), so
intake/normalize.py turns blanks into "not sampled" and codes into flags; a blank never becomes 0.

When the PDF has a text layer, each extracted number is cross-checked against that page's text; a
number not found on its page gets confidence 0.4, which the validator flags for officer review.

Returns None when Claude is unavailable (no ANTHROPIC_API_KEY) or fails, so the caller falls back to
PDF-text / OCR extraction.
"""
from __future__ import annotations

import base64
import re
from pathlib import Path

from . import llm

IMAGE_MIMES = {"image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"}
MAX_BYTES = 30 * 1024 * 1024
MISMATCH_CONFIDENCE = 0.4
LAST_RUN: dict = {}  # provider / latency of the most recent call (for the job log)

ROW_SCHEMA = {
    "type": "object",
    "properties": {
        "rows": {"type": "array", "items": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "description": "1-based page of the PDF (1 for a photo)"},
                "table": {"type": "integer", "description": "0-based index of the table in the document"},
                "site_as_printed": {"type": "string"},
                "year": {"type": "integer", "description": "year printed on the page, 0 if not printed"},
                "festival": {"type": "string", "enum": ["Ganesh", "Durga", "unknown"]},
                "phase": {"type": "string", "enum": ["pre", "during", "after"]},
                "parameter_as_printed": {"type": "string"},
                "value_as_printed": {"type": "string"},
                "legible": {"type": "boolean"},
            },
            "required": ["page", "table", "site_as_printed", "year", "festival", "phase", "parameter_as_printed",
                         "value_as_printed", "legible"],
            "additionalProperties": False,
        }},
    },
    "required": ["rows"],
    "additionalProperties": False,
}

SYSTEM = (
    "You transcribe water-quality tables from Madhya Pradesh Pollution Control Board (MPPCB) idol-immersion "
    "reports and lab sheets. Transcribe; never compute, infer, round or fill in. "
    "Each table is one monitoring location with columns Pre Immersion / During Immersion / After one week and "
    "rows such as pH, Total solids, Dissolved solids, Suspended solids, Dissolved oxygen, BOD, COD, Turbidity, "
    "Conductivity, Chromium, Lead, Zinc, Copper. Output one row per (table, parameter, phase column). "
    "value_as_printed is the cell text exactly as printed: a number as written, or a code such as BDL, ND, *, **, _ "
    "or -. If the cell is blank, value_as_printed is the empty string \"\" - never 0. If you cannot read a cell, "
    "set legible=false and give your best reading of its text. page is the 1-based page number of the PDF. "
    "site_as_printed is the location name exactly as printed. year and festival are as printed on the page, else 0 and \"unknown\"."
)


def available() -> bool:
    return llm.claude_configured()


def _content(path: Path, mime: str, year: int | None, festival: str | None) -> list[dict] | None:
    data = path.read_bytes()
    if len(data) > MAX_BYTES:
        return None
    b64 = base64.standard_b64encode(data).decode("ascii")
    m = (mime or "").lower()
    if m == "application/pdf" or path.suffix.lower() == ".pdf":
        block = {"type": "document", "source": {"type": "base64", "media_type": "application/pdf", "data": b64}}
    elif m in IMAGE_MIMES or path.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
        mt = "image/jpeg" if m in ("image/jpg", "") and path.suffix.lower() in (".jpg", ".jpeg") else (m or "image/png")
        block = {"type": "image", "source": {"type": "base64", "media_type": mt, "data": b64}}
    else:
        return None
    hint = []
    if year:
        hint.append(f"The officer says the report year is {year}.")
    if festival:
        hint.append(f"The officer says the festival is {festival}.")
    return [block, {"type": "text", "text": "Transcribe every water-quality table in this document. " + " ".join(hint)}]


_NUM = re.compile(r"-?\d+(?:[.,]\d+)?")


def _num_tokens(text: str) -> set[str]:
    out = set()
    for t in _NUM.findall(text or ""):
        try:
            out.add(f"{float(t.replace(',', '.')):g}")
        except ValueError:
            pass
    return out


def _page_texts(path: Path, mime: str) -> dict[int, str]:
    if (mime or "").lower() != "application/pdf" and path.suffix.lower() != ".pdf":
        return {}
    try:
        from ..intake.extract_text import extract_pages
        pages, _ = extract_pages(path)
    except Exception:
        return {}
    return {p["page"]: p["text"] for p in pages if len((p.get("text") or "").strip()) >= 20}


def cross_check(rows: list[dict], page_text: dict[int, str]) -> list[dict]:
    """Mark each numeric value found / not found on its page's text layer; lower confidence on mismatch."""
    cache: dict[int, set[str]] = {}
    for r in rows:
        printed = (r.get("value_as_printed") or "").strip()
        try:
            v = f"{float(printed.replace(',', '.')):g}"
        except ValueError:
            r["text_check"] = "not_numeric"
            continue
        txt = page_text.get(r.get("page"))
        if txt is None:
            r["text_check"] = "no_text_layer"
            continue
        if r["page"] not in cache:
            cache[r["page"]] = _num_tokens(txt)
        if v in cache[r["page"]]:
            r["text_check"] = "match"
        else:
            r["text_check"] = "mismatch"
            r["confidence"] = min(r.get("confidence", 1.0), MISMATCH_CONFIDENCE)
    return rows


def to_raw_rows(data: dict, year: int | None, festival: str | None) -> list[dict]:
    rows = []
    for r in (data or {}).get("rows") or []:
        printed = r.get("value_as_printed")
        printed = "" if printed is None else str(printed)
        rows.append({
            "page": int(r.get("page") or 1), "table": int(r.get("table") or 0),
            "site_as_printed": (r.get("site_as_printed") or "").strip(),
            "year": r.get("year") or year,
            "festival": r.get("festival") if r.get("festival") in ("Ganesh", "Durga") else festival,
            "phase": r.get("phase"), "parameter_as_printed": (r.get("parameter_as_printed") or "").strip(),
            "value_as_printed": printed.strip(),
            "confidence": 0.9 if r.get("legible", True) else 0.5, "extractor": "claude",
        })
    return rows


def extract_rows(path: Path, mime: str, year: int | None = None, festival: str | None = None) -> list[dict] | None:
    LAST_RUN.clear()
    if not available():
        return None
    try:
        path = Path(path)
        content = _content(path, mime, year, festival)
        if content is None:
            return None
        res = llm.claude_json(content, ROW_SCHEMA, SYSTEM)
        if res is None:
            return None
        rows = to_raw_rows(res["data"], year, festival)
        if not rows:
            return None
        rows = cross_check(rows, _page_texts(path, mime))
        LAST_RUN.update(provider=res["provider"], model=res["model"], latency_ms=res["latency_ms"], rows=len(rows),
                        mismatches=sum(1 for r in rows if r.get("text_check") == "mismatch"))
        return rows
    except Exception:
        return None
