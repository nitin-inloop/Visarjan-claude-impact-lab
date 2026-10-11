"""Normaliser: parameter aliases -> 13 standard names, printed site names -> v1 slugs, phases, codes."""
from __future__ import annotations

import re
from difflib import SequenceMatcher
from functools import lru_cache

from ..data import SITE_BY_SLUG, SITES, load_bhopal
from .schema import STANDARD_PARAMS, unit_for

_PARAM_ALIASES = {
    "ph": "pH", "phvalue": "pH", "पीएच": "pH",
    "totalsolids": "Total solids", "ts": "Total solids", "totalsolid": "Total solids", "कुलठोस": "Total solids",
    "dissolvedsolids": "Dissolved solids", "tds": "Dissolved solids", "totaldissolvedsolids": "Dissolved solids",
    "dissolvedsolid": "Dissolved solids", "घुलितठोस": "Dissolved solids",
    "suspendedsolids": "Suspended solids", "tss": "Suspended solids", "totalsuspendedsolids": "Suspended solids",
    "suspendedsolid": "Suspended solids", "ss": "Suspended solids", "निलंबितठोस": "Suspended solids",
    "doxygen": "Dissolved oxygen", "do": "Dissolved oxygen", "dissolvedoxygen": "Dissolved oxygen",
    "dissolvedoxygendo": "Dissolved oxygen", "oxygen": "Dissolved oxygen", "घुलितऑक्सीजन": "Dissolved oxygen",
    "bod": "BOD", "bod5": "BOD", "bod5days20c": "BOD", "bod3days27c": "BOD", "biochemicaloxygendemand": "BOD",
    "बीओडी": "BOD",
    "cod": "COD", "chemicaloxygendemand": "COD", "सीओडी": "COD",
    "turbidity": "Turbidity", "turb": "Turbidity", "गंदलापन": "Turbidity",
    "conductivity": "Conductivity", "cond": "Conductivity", "ec": "Conductivity",
    "electricalconductivity": "Conductivity", "specificconductivity": "Conductivity", "चालकता": "Conductivity",
    "chromium": "Chromium", "cr": "Chromium", "totalchromium": "Chromium", "क्रोमियम": "Chromium",
    "lead": "Lead", "pb": "Lead", "सीसा": "Lead",
    "zinc": "Zinc", "zn": "Zinc", "जस्ता": "Zinc",
    "copper": "Copper", "cu": "Copper", "तांबा": "Copper",
}
for _p in STANDARD_PARAMS:
    _PARAM_ALIASES.setdefault(re.sub(r"[^a-z0-9]", "", _p.lower()), _p)

PHASE_ALIASES = {"pre": "pre", "preimmersion": "pre", "before": "pre", "पूर्व": "pre",
                 "during": "during", "duringimmersion": "during", "दौरान": "during",
                 "after": "after", "afteroneweek": "after", "postimmersion": "after", "post": "after", "बाद": "after"}
FESTIVAL_ALIASES = {"ganesh": "Ganesh", "ganesha": "Ganesh", "गणेश": "Ganesh",
                    "durga": "Durga", "दुर्गा": "Durga"}


def _key(s: object) -> str:
    return re.sub(r"[^0-9a-zऀ-ॿ]", "", str(s or "").lower())


def canon_param(printed: str | None) -> str | None:
    """'D.Oxygen' / 'DO' / 'suspended-solids' / 'Cond.' -> standard name, else None."""
    if not printed:
        return None
    k = _key(printed)
    if k in _PARAM_ALIASES:
        return _PARAM_ALIASES[k]
    k2 = re.sub(r"(mgl|ntu|uscm|scm)$", "", k)
    if k2 in _PARAM_ALIASES:
        return _PARAM_ALIASES[k2]
    for a, p in sorted(_PARAM_ALIASES.items(), key=lambda x: -len(x[0])):  # 'BOD (5 days 20C)' style
        if len(a) >= 3 and k.startswith(a) and len(k) - len(a) <= 10:
            return p
    return None


def canon_phase(s: str | None) -> str | None:
    return PHASE_ALIASES.get(_key(s)) if s else None


def canon_festival(s: str | None) -> str | None:
    if not s:
        return None
    k = _key(s)
    for a, f in FESTIVAL_ALIASES.items():
        if a in k:
            return f
    return None


# ---------------------------------------------------------------- sites

_DROP = {"bhopal", "the", "at", "near", "of", "and", "murti", "visarjan", "ghat", "kund", "visarjanghat",
         "visarjankund", "lake", "dam", "lower", "upper"}
_TOKENS = {"khatlapura": "khatlapura", "hirdaram": "bairagarh", "bairagarh": "bairagarh", "prempura": "prempura",
           "kamlapati": "rani-kamlapati", "kamla park": "rani-kamlapati", "hathaikheda": "hathaikheda",
           "malikhedi": "malikhedi", "maalikhedi": "malikhedi", "shahpura": "shahpura"}
_OTHER_PLACES = r"\b(sehore|vidisha|raisen|indore|ujjain|jabalpur|gwalior|sagar|rewa|dewas|hoshangabad|narmadapuram)\b"


def _words(s: str) -> str:
    s = re.sub(r"[^a-z ]", " ", str(s).lower().replace("maalikhedi", "malikhedi"))
    return " ".join(w for w in s.split() if w not in _DROP)


@lru_cache(maxsize=1)
def site_aliases() -> dict[str, str]:
    """Printed-name key -> slug from every site_as_printed variant in the v1 pack + v1 display names."""
    out: dict[str, str] = {}
    df = load_bhopal()
    for printed, slug in df[["site_as_printed", "slug"]].drop_duplicates().itertuples(index=False):
        out[_key(printed)] = slug
    for s in SITES:
        out[_key(s.csv_name)] = s.slug
        out[_key(s.name_en)] = s.slug
        out[_key(s.name_hi)] = s.slug
    return out


@lru_cache(maxsize=1)
def _site_words() -> list[tuple[str, str]]:
    df = load_bhopal()
    pairs = {(_words(p), s) for p, s in df[["site_as_printed", "slug"]].drop_duplicates().itertuples(index=False)}
    pairs |= {(_words(s.csv_name), s.slug) for s in SITES}
    return [(w, s) for w, s in pairs if w]


def _ratio(a: str, b: str) -> float:
    try:
        from rapidfuzz import fuzz  # optional
        return fuzz.token_set_ratio(a, b) / 100.0
    except Exception:
        return SequenceMatcher(None, a, b).ratio()


def match_site(printed: str | None) -> tuple[str | None, float]:
    """(slug, confidence): exact printed variant 1.0; one distinctive name token 0.9; fuzzy ratio >= 0.75
    (capped 0.85); otherwise (None, < 0.5). Places outside Bhopal are never merged into a Bhopal ghat."""
    if not printed or not str(printed).strip():
        return None, 0.0
    raw = str(printed).strip()
    if raw in SITE_BY_SLUG:
        return raw, 1.0
    k = _key(raw)
    al = site_aliases()
    if k in al:
        return al[k], 1.0
    if k.rstrip("0") in al:
        return al[k.rstrip("0")], 1.0
    low = raw.lower()
    if re.search(_OTHER_PLACES, low):
        return None, 0.2
    hits = {slug for tok, slug in _TOKENS.items() if tok in low}
    if len(hits) == 1:
        return hits.pop(), 0.9
    w = _words(raw)
    best, best_s = None, 0.0
    for cand, slug in _site_words():
        r = _ratio(w, cand)
        if r > best_s:
            best, best_s = slug, r
    if best is not None and best_s >= 0.75:
        return best, round(min(best_s, 0.85), 3)
    return None, round(min(best_s, 0.45), 3)


# ---------------------------------------------------------------- values

_CODE_MAP = {"bdl": "BDL", "nd": "ND", "*": "*", "**": "**", "_": "_", "-": "_", "–": "_", "—": "_", "__": "_",
             "na": "na", "n/a": "na", "dry": "DRY", "notsampled": "not sampled", "ns": "not sampled"}
NO_VALUE_FLAGS = {"BDL", "ND", "not sampled", "*", "**", "_", "na", "DRY"}


def parse_value(printed: object) -> tuple[float | None, str | None, float]:
    """Printed cell -> (value, flag, parse_confidence). 1.0 clean number, 0.7 fuzzy, codes -> flag."""
    if printed is None:
        return None, "not sampled", 1.0
    if isinstance(printed, (int, float)):
        return float(printed), None, 1.0
    s = str(printed).strip()
    if not s:
        return None, "not sampled", 1.0
    compact = s.replace(" ", "").lower()
    if compact in _CODE_MAP:
        return None, _CODE_MAP[compact], 1.0
    if re.fullmatch(r"\*+", compact):
        return None, "**" if len(compact) >= 2 else "*", 1.0
    if re.fullmatch(r"-?\d+(\.\d+)?", s):
        return float(s), None, 1.0
    if compact.startswith("<"):
        return None, "BDL", 0.7
    if compact in ("bd1", "bdi", "8dl", "bol"):
        return None, "BDL", 0.7
    t = compact.replace(",", ".")
    t = t.translate(str.maketrans({"o": "0", "l": "1", "i": "1", "s": "5"}))
    t = re.sub(r"\.{2,}", ".", t).strip(".")
    if re.fullmatch(r"-?\d+(\.\d+)?", t):
        return float(t), None, 0.7
    m = re.search(r"-?\d+(\.\d+)?", t)
    if m:
        return float(m.group(0)), None, 0.5
    return None, "na", 0.3


def normalize_rows(raw: list[dict], context: dict) -> tuple[list[dict], dict]:
    """Parser/manual raw rows -> contract Rows. Returns (rows, stats)."""
    rows: list[dict] = []
    site_cache: dict[str, tuple[str | None, float]] = {}
    for i, r in enumerate(raw):
        param = canon_param(r.get("parameter")) or canon_param(r.get("parameter_as_printed"))
        if param is None:
            continue
        sp = r.get("site_as_printed") or ""
        if r.get("slug") and r["slug"] in SITE_BY_SLUG:
            slug, conf = r["slug"], float(r.get("site_match_confidence") or 1.0)
        elif r.get("slug_locked"):  # officer explicitly kept the site unmatched
            slug, conf = None, float(r.get("site_match_confidence") or 0.0)
        else:
            if sp not in site_cache:
                site_cache[sp] = match_site(sp)
            slug, conf = site_cache[sp]
        year = r.get("year") or context.get("year")
        fest = canon_festival(r.get("festival")) or canon_festival(context.get("festival"))
        if "value" in r and "flag" in r:
            value, flag, pconf = r["value"], r["flag"], float(r.get("confidence", 1.0) or 0.0)
        else:
            value, flag, pconf = parse_value(r.get("value_as_printed"))
            pconf = min(pconf, float(r.get("confidence", 1.0)))
        if value is not None:
            try:
                value = float(value)
            except (TypeError, ValueError):
                value, flag = None, "na"
        if flag == "":
            flag = None
        if value is None and not flag:
            flag = "not sampled"
        if flag in NO_VALUE_FLAGS:
            value = None
        vap = r.get("value_as_printed")
        rows.append({
            "row_id": r.get("row_id") or f"r{i + 1:04d}", "page": r.get("page"),
            "site_as_printed": sp, "slug": slug, "site_match_confidence": round(float(conf), 3),
            "year": int(year) if year not in (None, "") else None, "festival": fest,
            "phase": canon_phase(r.get("phase")) or r.get("phase"), "parameter": param,
            "parameter_as_printed": r.get("parameter_as_printed") or param,
            "value": value, "flag": flag,
            "value_as_printed": vap if vap is not None else ("" if value is None else f"{value:g}"),
            "unit_assumed": unit_for(param), "confidence": round(float(pconf), 3),
            "issues": [], "already_in_pack": False,
        })
    pairs = {(r["site_as_printed"], r["slug"]) for r in rows}
    stats = {"sites_matched": len({sp for sp, s in pairs if s}),
             "sites_unmatched": len({sp for sp, s in pairs if not s})}
    return rows, stats
