"""Rule-based text/voice command parser, English + Hindi (PLAN-LIVE v2 amendment G). No LLM."""
from __future__ import annotations

import re

GHAT_ALIASES = {
    "bairagarh": ["bairagarh", "bairagadh", "sant hirdaram", "बैरागढ़", "बैरागढ"],
    "shahpura": ["shahpura", "shahpur", "शाहपुरा"],
    "rani-kamlapati": ["rani kamlapati", "kamlapati", "kamla park", "rani kamla", "रानी कमलापति", "कमलापति", "कमला पार्क"],
    "khatlapura": ["khatlapura", "khatla", "खटलापुरा"],
    "prempura": ["prempura", "प्रेमपुरा"],
    "hathaikheda": ["hathaikheda", "hathai kheda", "hathaikheda dam", "हथाईखेड़ा", "हथाईखेडा"],
    "malikhedi": ["malikhedi", "mali khedi", "मालीखेड़ी", "मालीखेडी"],
}
KIND_ALIASES = {
    "test_team": ["test team", "testing team", "test", "जाँच दल", "जांच दल", "जाँच टीम", "जांच टीम", "टेस्ट टीम"],
    "aerator": ["aerator", "aerators", "एरेटर", "वातक"],
    "crew": ["crew", "cleaning crew", "cleaning", "सफ़ाई दल", "सफाई दल", "सफ़ाई", "सफाई", "क्रू"],
}
SEND = ["send", "dispatch", "भेजो", "भेजें", "भेज"]
STATUS = ["status", "how is", "condition", "स्थिति", "हाल", "क्या हाल"]
ALL = ["all", "every", "overall", "सभी", "सब", "सारे"]
SITREP = ["sitrep", "situation report", "read report", "report", "रिपोर्ट", "स्थिति रिपोर्ट"]
PAUSE = ["pause", "stop", "hold", "रोको", "रोकें", "ठहरो"]
START = ["start", "resume", "play", "continue", "शुरू", "चालू", "चलाओ"]
HELP = ["help", "what can you do", "मदद", "सहायता"]


def norm(text: str) -> str:
    t = text.lower().strip()
    t = re.sub(r"[?!.,।]", " ", t)
    return re.sub(r"\s+", " ", t)


def _has(t: str, words: list[str]) -> bool:
    for w in words:
        if re.fullmatch(r"[a-z ]+", w):
            if re.search(rf"\b{re.escape(w)}\b", t):
                return True
        elif w in t:
            return True
    return False


def find_ghat(t: str) -> str | None:
    best = None
    for slug, al in GHAT_ALIASES.items():
        for a in al:
            if a in t and (best is None or len(a) > best[1]):
                best = (slug, len(a))
    return best[0] if best else None


def find_kind(t: str) -> str | None:
    for kind in ("test_team", "crew", "aerator"):
        if _has(t, KIND_ALIASES[kind]):
            return kind
    return None


def parse(text: str) -> tuple[str, dict]:
    """-> (intent, args). Intents: status_ghat, status_all, read_sitrep, send, control, help, unknown."""
    t = norm(text)
    ghat, kind = find_ghat(t), find_kind(t)
    if _has(t, SEND) and kind:
        return "send", {"kind": kind, "ghat": ghat}
    if _has(t, HELP):
        return "help", {}
    if _has(t, SITREP) and not ghat:
        return "read_sitrep", {}
    if _has(t, PAUSE):
        return "control", {"action": "pause"}
    if _has(t, START) and not ghat:
        return "control", {"action": "start"}
    if ghat:
        return "status_ghat", {"ghat": ghat}
    if _has(t, STATUS) and (_has(t, ALL) or True):
        return "status_all", {}
    return "unknown", {}
