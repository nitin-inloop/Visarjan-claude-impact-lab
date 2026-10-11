"""Turn on-screen text into text a voice can read naturally (Hindi and English).

Screen text is full of units, abbreviations, page refs and symbols ("DO 3.2 mg/l · p. 28 ⛔").
A Hindi listener should hear "घुलित ऑक्सीजन तीन दशमलव दो मिलीग्राम प्रति लीटर, पृष्ठ अट्ठाईस".
Pure function, no I/O; unit-tested in tests/test_voice.py.
"""
from __future__ import annotations

import re
import unicodedata

_HI_0_100 = (
    "शून्य एक दो तीन चार पांच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस "
    "बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस "
    "पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस "
    "अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ "
    "चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर "
    "अठहत्तर उनासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे "
    "बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे सौ"
).split()
assert len(_HI_0_100) == 101

MAX_SPEECH_CHARS = 1200


def hi_int(n: int) -> str:
    """Hindi words for 0..99,99,999 (lakh system). Larger numbers are left as digits."""
    if n < 0:
        return "माइनस " + hi_int(-n)
    if n <= 100:
        return _HI_0_100[n]
    if n >= 10_000_000:
        return str(n)
    parts = []
    for size, word in ((100_000, "लाख"), (1000, "हज़ार"), (100, "सौ")):
        q, n = divmod(n, size)
        if q:
            parts.append(f"{hi_int(q)} {word}")
    if n:
        parts.append(_HI_0_100[n])
    return " ".join(parts)


def hi_number(s: str) -> str:
    """'0.6' -> 'शून्य दशमलव छह'; '12' -> 'बारह'; decimals read digit by digit."""
    s = s.replace(",", "")
    whole, _, frac = s.partition(".")
    out = hi_int(int(whole or "0"))
    if frac:
        out += " दशमलव " + " ".join(_HI_0_100[int(d)] for d in frac)
    return out


# Order matters: longer/more specific patterns first. (pattern, hindi, english); patterns are case-sensitive
# unless they carry (?i).
_TERMS: list[tuple[str, str, str]] = [
    (r"(?i)\bmg\s*/\s*l(itre|iter)?\b", "मिलीग्राम प्रति लीटर", "milligrams per litre"),
    (r"(?i)\bMPN\s*/\s*100\s*ml\b", "एम.पी.एन. प्रति सौ मिलीलीटर", "M.P.N. per hundred millilitres"),
    (r"(?i)µS\s*/\s*cm|\buS\s*/\s*cm\b", "माइक्रोसीमेंस प्रति सेंटीमीटर", "microsiemens per centimetre"),
    (r"°\s*C\b", "डिग्री सेल्सियस", "degrees Celsius"),
    (r"\bNTU\b", "एन.टी.यू.", "N.T.U."),
    (r"\bBOD\b", "बी.ओ.डी.", "B.O.D."),
    (r"\bCOD\b", "सी.ओ.डी.", "C.O.D."),
    (r"\bTDS\b", "टी.डी.एस.", "T.D.S."),
    (r"\bDO\b", "घुलित ऑक्सीजन", "dissolved oxygen"),
    (r"\bp[Hh]\b", "पी.एच.", "P.H."),
    (r"\bMPCB\b|\bMPPCB\b", "प्रदूषण नियंत्रण बोर्ड", "the pollution control board"),
    (r"\bBMC\b", "नगर निगम", "the Municipal Corporation"),
    *[(rf"\b{en[:3]}\.?(?=\s+\d|\s*$)", hi, en) for en, hi in (
        ("January", "जनवरी"), ("February", "फ़रवरी"), ("March", "मार्च"), ("April", "अप्रैल"),
        ("June", "जून"), ("July", "जुलाई"), ("August", "अगस्त"), ("September", "सितंबर"),
        ("October", "अक्टूबर"), ("November", "नवंबर"), ("December", "दिसंबर"))],
    (r"\bCPCB\b", "केंद्रीय प्रदूषण नियंत्रण बोर्ड", "the Central Pollution Control Board"),
]

# Page references: "p. 28", "pp. 3-4", "page 28", "पृष्ठ 28", "पृ. 28"
_PAGE = re.compile(r"(?i)\b(?:pp?\.|page|pg\.)\s*(\d+)|(?:पृष्ठ|पृ\.)\s*(\d+)")
# "6.5-8.5" / "6.5–8.5" (no spaces) is a range; "0 — 5" is a separator (em dash -> pause), not a range.
_RANGE = re.compile(r"(?<![\d-])(\d+(?:\.\d+)?)[–-](\d+(?:\.\d+)?)(?![\d-])")
_NUM = re.compile(r"(?<![\w.])\d[\d,]*(?:\.\d+)?(?![\w])")
_MD_LINK = re.compile(r"\[([^\]]+)\]\([^)]+\)")
_URL = re.compile(r"https?://\S+")

# Separators that should become a short pause.
_PAUSE = "→⇒➜|·•●▪■◆►▶—"
_KEEP_SYMBOLS = {"%"}


def _strip_symbols(t: str) -> str:
    out = []
    for ch in t:
        cat = unicodedata.category(ch)
        if ch in _KEEP_SYMBOLS:
            out.append(ch)
        elif ch in _PAUSE:
            out.append(", ")
        elif cat in ("So", "Sk", "Sm", "Co", "Cs", "Cf") or ch in "️‍":
            out.append(" ")
        else:
            out.append(ch)
    return "".join(out)


def _strip_markdown(t: str) -> str:
    t = _MD_LINK.sub(r"\1", t)
    t = _URL.sub("", t)
    t = re.sub(r"`+", "", t)
    t = re.sub(r"(\*\*|__|\*|~~)", "", t)
    t = re.sub(r"(?m)^\s{0,3}#{1,6}\s*", "", t)
    t = re.sub(r"(?m)^\s*[-*+]\s+", "", t)
    t = re.sub(r"(?m)^\s*>\s?", "", t)
    return t


def _tidy(t: str) -> str:
    t = re.sub(r"\s+", " ", t)
    t = re.sub(r"\s+([,.!?।:;])", r"\1", t)
    t = re.sub(r"([,;:])(\s*[,;:])+", r"\1", t)  # ", ," -> ","
    t = re.sub(r"([.!?।])\s*,", r"\1", t)  # "., " -> "."
    t = re.sub(r"^[\s,;:.]+", "", t)
    t = re.sub(r"[\s,;:]+$", "", t)
    return t.strip()


def _cap(t: str, limit: int) -> str:
    if len(t) <= limit:
        return t
    cut = t[:limit]
    m = max(cut.rfind(c) for c in ".!?।")
    return cut[: m + 1] if m > limit // 3 else cut.rsplit(" ", 1)[0]


def normalize(text: str, lang: str = "hi", limit: int = MAX_SPEECH_CHARS) -> str:
    """Screen text -> speakable text. lang 'hi' spells numbers as Hindi words; 'en' keeps digits."""
    hi = lang == "hi"
    t = unicodedata.normalize("NFC", text or "")
    t = _strip_markdown(t)
    t = _PAGE.sub(lambda m: ("पृष्ठ " if hi else "page ") + (m.group(1) or m.group(2)), t)
    for pat, h, e in _TERMS:
        t = re.sub(pat, h if hi else e, t)
    t = _RANGE.sub(lambda m: f"{m.group(1)} {'से' if hi else 'to'} {m.group(2)}", t)
    t = re.sub(r"≥|>=", " कम से कम " if hi else " at least ", t)
    t = re.sub(r"≤|<=", " अधिकतम " if hi else " at most ", t)
    t = re.sub(r"<\s*(\d+(?:\.\d+)?)", r" \1 से कम " if hi else r" less than \1 ", t)
    t = re.sub(r">\s*(\d+(?:\.\d+)?)", r" \1 से ज़्यादा " if hi else r" more than \1 ", t)
    t = t.replace("&", " और " if hi else " and ")
    t = re.sub(r"\s*%", " प्रतिशत" if hi else " percent", t)
    t = t.replace("/", " ")
    t = _strip_symbols(t)
    if hi:
        t = _NUM.sub(lambda m: hi_number(m.group(0)), t)
    return _cap(_tidy(t), limit)
