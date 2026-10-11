"""Checks every AI-written text must pass before it is shown. Any failure -> the template is used.

1. Numbers, two-way: every number in the AI text must exist in the input facts (no invented numbers),
   and every number in the template must survive in the AI text (no dropped numbers). Dates
   ("20 Oct", "17 अक्टूबर") are allowed.
2. No health-claim words (the jury rule: report readings against limits, never health effects).
3. The forecast is worded as an estimate, never a measurement.
4. Length cap.
"""
from __future__ import annotations

import re

_DEVANAGARI = str.maketrans("०१२३४५६७८९", "0123456789")
_NUM = re.compile(r"(?<![\w.])-?\d+(?:[.,]\d+)?")
_MONTHS = (r"jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|"
           r"oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|जनवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|सितम्बर|"
           r"अक्टूबर|अक्तूबर|नवंबर|नवम्बर|दिसंबर|दिसम्बर")
_DATE = re.compile(rf"\b\d{{1,2}}\s*(?:{_MONTHS})\b(?:\s+20\d\d)?|\b(?:{_MONTHS})\s+\d{{1,2}}\b(?:,?\s+20\d\d)?|"
                   r"\b20\d\d-\d\d-\d\d\b", re.I)

HEALTH_EN = re.compile(
    r"\b(health|disease|illness|ill|sick|infect\w*|toxic\w*|poison\w*|cancer\w*|skin|rash\w*|diarrh\w*|cholera|"
    r"typhoid|death|deadly|die|dies|fatal|unsafe|safe to bathe|safe for|harmful|hazard\w*|dangerous|drinkable|"
    r"drinking|risk to people|medical)\b", re.I)
HEALTH_HI = ["स्वास्थ्य", "बीमार", "रोग", "संक्रमण", "ज़हर", "जहर", "विषैल", "विषाक्त", "त्वचा", "खतरनाक", "ख़तरनाक",
             "हानिकारक", "पीने", "मृत्यु", "मौत", "कैंसर", "दस्त", "हैजा"]
ESTIMATE_WORDS = {"en": ["estimate", "estimated", "not a measurement"], "hi": ["अनुमान"]}
CERTAINTY_WORDS = ["will breach", "will fail", "certainly", "definitely", "guaranteed", "measured forecast",
                   "निश्चित रूप से", "ज़रूर होगा", "पक्का"]
MAX_CHARS = {"en": 900, "hi": 1100}
MAX_SENTENCES = 7


def _norm(s: str) -> str:
    return (s or "").translate(_DEVANAGARI)


def _canon(tok: str) -> str:
    tok = tok.replace(",", ".") if tok.count(",") == 1 and len(tok.split(",")[1]) != 3 else tok.replace(",", "")
    try:
        return f"{float(tok):g}"
    except ValueError:
        return tok


def numbers(text: str, allow_dates: bool = True) -> set[str]:
    t = _norm(text)
    if allow_dates:
        t = _DATE.sub(" ", t)
    return {_canon(m) for m in _NUM.findall(t)}


def numbers_ok(ai_text: str, facts_text: str, template_text: str | None = None) -> bool:
    """Two-way number guard. ai ⊆ facts∪template, and template ⊆ ai (when a template is given)."""
    have = numbers(ai_text)
    allowed = numbers(facts_text, allow_dates=False) | (numbers(template_text, allow_dates=False) if template_text else set())
    if not have <= allowed:
        return False
    if template_text is not None and not numbers(template_text) <= have:
        return False
    return True


def health_ok(ai_text: str, source_text: str = "") -> bool:
    """No health-claim words, except ones already present in the (vetted) source text."""
    src_en = {m.lower() for m in HEALTH_EN.findall(source_text or "")}
    if any(m.lower() not in src_en for m in HEALTH_EN.findall(ai_text or "")):
        return False
    return not any(w in (ai_text or "") and w not in (source_text or "") for w in HEALTH_HI)


def estimate_ok(ai_text: str, lang: str, has_forecast: bool) -> bool:
    low = (ai_text or "").lower()
    if any(w in low for w in CERTAINTY_WORDS):
        return False
    if not has_forecast:
        return True
    return any(w in low for w in ESTIMATE_WORDS[lang])


def length_ok(ai_text: str, lang: str, max_chars: int | None = None) -> bool:
    t = (ai_text or "").strip()
    if not t or len(t) > (max_chars or MAX_CHARS[lang]):
        return False
    sentences = [s for s in re.split(r"(?<=[.!?।])\s+", t) if s.strip()]
    return len(sentences) <= MAX_SENTENCES


def check(ai_text: str, lang: str, facts_text: str, template_text: str | None, has_forecast: bool,
          max_chars: int | None = None) -> list[str]:
    """Names of failed guards (empty list = pass)."""
    failed = []
    if not numbers_ok(ai_text, facts_text, template_text):
        failed.append("numbers")
    if not health_ok(ai_text):
        failed.append("health_words")
    if not estimate_ok(ai_text, lang, has_forecast):
        failed.append("estimate_wording")
    if not length_ok(ai_text, lang, max_chars):
        failed.append("length")
    return failed


def parse_json_object(text: str) -> dict | None:
    """Lenient JSON object extraction from a chat reply (code fences, leading prose)."""
    import json
    if not text:
        return None
    s, e = text.find("{"), text.rfind("}")
    if s < 0 or e <= s:
        return None
    try:
        obj = json.loads(text[s:e + 1])
    except ValueError:
        return None
    return obj if isinstance(obj, dict) else None
