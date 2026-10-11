"""MPPCB immersion-report table parser (layout text from pypdf, pdftotext or the OCR line rebuild).

Handles both observed layouts:
  2025 / Durga:  "Location- <site>"  then  "S. No.  Parameter  Pre Immersion  During Immersion  After one week"
  2024:          "<site>" line, then "S.No. [Parameter]  Pre Immersion ..." with a "2024 2024 2024" year line
Cells are assigned to the Pre / During / After column whose header centre is nearest (so blank cells,
e.g. a Bairagarh table printed with only a "During" column of values, stay blank -> "not sampled").
Codes BDL, ND, *, **, _, - become flags; numbers get parse_confidence 1.0 (clean) or 0.7 (fuzzy).
"""
from __future__ import annotations

import re

from .normalize import canon_param, parse_value

PHASES = ["pre", "during", "after"]
_COL_RE = {
    "pre": re.compile(r"pre[\s\-.]*immersion|before\s+immersion", re.I),
    "during": re.compile(r"during[\s\-.]*immersion|during", re.I),
    "after": re.compile(r"after[\s\-.]*one[\s\-.]*week|after[\s\-.]*immersion|post[\s\-.]*immersion|after", re.I),
}
_LOC_RE = re.compile(r"^\s*(?:name\s+of\s+)?location\s*(?:name)?\s*[-:–.]+\s*(.*\S)\s*$", re.I)
_LOC_BARE_RE = re.compile(r"^\s*location\s+(.*\S)\s*$", re.I)
_TITLE_RE = re.compile(r"(report|immersion|monitoring|^\s*r\.?\s*o\.?\s|^\s*r\.\s*o\.|xl/|page\s*\d|water\s+quality|"
                       r"(visarjan|immersion)\s*[-–]?\s*20\d\d|^\W*\d+\W*$|parameter|s\.?\s*no\b|^\s*(20\d\d\s*)+$|"
                       r"^\s*(ganesh|durga)\b)", re.I)
_FEST_RE = re.compile(r"\b(ganesh|ganesha|durga)\b", re.I)
_YEAR_CTX_RE = re.compile(r"(?:ganesh|durga|immersion|visarjan)[^\n]{0,40}?\b(20[12]\d)\b", re.I)
_YEAR_LINE_RE = re.compile(r"^\s*(?:parameter\s+)?(20[12]\d)(?:\s+20[12]\d){1,3}\s*$", re.I)
_NUMLIKE = re.compile(r"^(?:-?\d+(?:[.,]\d+)?\.?|BDL|ND|\*+|_+|-|–)$", re.I)
_NAME_RE = re.compile(r"^\s*(?:(\d{1,2})\s*[.)]?\s+)?([A-Za-zऀ-ॿ][^\s]*(?: [^\s]+)*)")


def detect_context(text: str) -> tuple[int | None, str | None]:
    """(year, festival) printed on a page header/footer, e.g. 'Ganesh Idol Immersion -2025'."""
    fest = None
    m = _FEST_RE.search(text)
    if m:
        fest = "Durga" if m.group(1).lower() == "durga" else "Ganesh"
    year = None
    m = _YEAR_CTX_RE.search(text)
    if m:
        year = int(m.group(1))
    else:
        for line in text.splitlines():
            ym = _YEAR_LINE_RE.match(line)
            if ym:
                year = int(ym.group(1))
                break
    return year, fest


def _header_columns(line: str) -> dict[str, float] | None:
    """Pre/During/After header line -> {phase: centre column}; None if not a table header."""
    if not re.search(r"pre[\s\-.]*immersion", line, re.I):
        return None
    cols: dict[str, float] = {}
    pos = 0
    for ph in PHASES:
        m = _COL_RE[ph].search(line, pos)
        if not m:
            return None if ph == "pre" else cols or None
        cols[ph] = (m.start() + m.end()) / 2.0
        pos = m.end()
    return cols


def _split_name(line: str) -> tuple[str | None, int, str]:
    """Data line -> (parameter_as_printed, end column of the name, s_no)."""
    m = _NAME_RE.match(line)
    if not m:
        return None, 0, ""
    name = m.group(2)
    end = m.end(2)
    # name runs to the first gap of 2+ spaces
    gap = re.search(r"\s{2,}", name)
    if gap:
        end = m.start(2) + gap.start()
        name = name[:gap.start()]
    # OCR glue: 'pH 7.34' with a single space -> keep numeric words as values
    words = name.split(" ")
    while len(words) > 1 and _NUMLIKE.match(words[-1]):
        words.pop()
    name2 = " ".join(words)
    if name2 != name:
        end = m.start(2) + len(name2)
        name = name2
    return name, end, m.group(1) or ""


def _value_tokens(line: str, start: int) -> list[tuple[float, str]]:
    """Value cells right of the name: runs separated by 2+ spaces; '7.3 6' (numbers, one space) split."""
    out: list[tuple[float, str]] = []
    for m in re.finditer(r"\S+(?: \S+)*", line[start:]):
        tok, s0 = m.group(0), start + m.start()
        parts = tok.split(" ")
        if len(parts) > 1 and all(re.fullmatch(r"-?\d+(?:[.,]\d+)?|BDL|ND", p, re.I) for p in parts):
            off = 0
            for p in parts:
                i = tok.index(p, off)
                out.append((s0 + i + len(p) / 2.0, p))
                off = i + len(p)
        else:
            out.append((s0 + len(tok) / 2.0, tok))
    return out


def _assign(tokens: list[tuple[float, str]], cols: dict[str, float]) -> tuple[dict[str, tuple[float, str]], float]:
    """Tokens -> {phase: (centre column, printed)}; confidence 1.0 when unambiguous."""
    phases = list(cols)
    if len(tokens) == len(phases):
        return {ph: tok for ph, tok in zip(phases, tokens)}, 1.0
    out: dict[str, tuple[float, str]] = {}
    conf = 1.0
    for x, t in tokens:
        ph = min(phases, key=lambda p: abs(cols[p] - x))
        if ph in out:
            conf = 0.6
            free = [p for p in phases if p not in out]
            if not free:
                continue
            ph = min(free, key=lambda p: abs(cols[p] - x))
        out[ph] = (x, t)
    if len(tokens) > len(phases):
        conf = min(conf, 0.6)
    return out, conf


def parse_pages(pages: list[dict], context: dict | None = None) -> tuple[list[dict], dict]:
    """[{page, text}] -> raw rows (one per site x phase x parameter) + info {tables, log}.

    Raw row: {page, table, site_as_printed, year, festival, phase, parameter_as_printed,
              value_as_printed, confidence}.
    """
    context = context or {}
    year, fest = context.get("year"), context.get("festival")
    rows: list[dict] = []
    tables: list[dict] = []
    log: list[str] = []
    for pg in pages:
        p_year, p_fest = detect_context(pg["text"])
        year = p_year or year
        fest = p_fest or fest
        lines = pg["text"].splitlines()
        pending_loc: str | None = None
        last_candidate: str | None = None
        cur: dict | None = None
        for line_no, line in enumerate(lines):
            if not line.strip():
                continue
            lm = _LOC_RE.match(line) or _LOC_BARE_RE.match(line)
            if lm:
                pending_loc = re.sub(r"\s+", " ", lm.group(1)).strip().rstrip(".").strip()
                cur = None
                continue
            cols = _header_columns(line)
            if cols:
                site = pending_loc or last_candidate or ""
                cur = {"page": pg["page"], "site": site, "cols": cols, "params": set(),
                       "year": year, "festival": fest, "index": len(tables)}
                tables.append({"page": pg["page"], "site_as_printed": site, "year": year, "festival": fest,
                               "rows": 0})
                pending_loc = None
                last_candidate = None
                continue
            name, end, _sno = _split_name(line)
            param = canon_param(name) if name else None
            if cur is not None and param is not None and len(cur["params"]) < 16:
                if param in cur["params"]:
                    continue
                cur["params"].add(param)
                assigned, aconf = _assign(_value_tokens(line, end), cur["cols"])
                for ph in cur["cols"]:
                    x, printed = assigned.get(ph, (None, ""))
                    _, _, pconf = parse_value(printed)
                    rows.append({"page": pg["page"], "table": cur["index"], "site_as_printed": cur["site"],
                                 "year": cur["year"], "festival": cur["festival"], "phase": ph,
                                 "parameter_as_printed": name, "value_as_printed": printed.strip(),
                                 "confidence": round(min(aconf, pconf), 3), "line_no": line_no, "col": x})
                tables[cur["index"]]["rows"] += len(cur["cols"])
                continue
            if param is None and not _TITLE_RE.search(line):
                cand = re.sub(r"\s+", " ", line).strip().rstrip(".").strip()
                if len(cand) >= 6 and re.search(r"[A-Za-z]{3}", cand):
                    last_candidate = cand
                    site_like = (re.search(r"(ghat|kund|lake|visarjan|bhopal|dam|talab|river|,)", cand, re.I)
                                 and not re.search(r"(^|\s)\d+(\.\d+)?(\s|$)", cand))
                    if cur is not None and cur["params"] and site_like:
                        cur = None  # a new site line closes the table (a garbled OCR row does not)
    tables = [t for t in tables if t["rows"] > 0]
    for t in tables:
        log.append(f"p{t['page']}: '{t['site_as_printed']}' {t['festival'] or '?'} {t['year'] or '?'} "
                   f"-> {t['rows']} cells")
    return rows, {"tables": len(tables), "table_list": tables, "log": log}
