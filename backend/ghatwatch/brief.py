"""One-page bilingual brief for the BMC officer (PLAN.md §3.9). Templated; no LLM needed.

Optional polish: set GHATWATCH_LLM_POLISH=1 and ANTHROPIC_API_KEY. The polished text is
accepted only if every number in the templated text survives; otherwise it is discarded.
"""
from __future__ import annotations

import os
import re

from .data import PDFS
from .text import fmt

TIER_LABEL = {
    "insufficient_data": {"en": "INSUFFICIENT DATA", "hi": "अपर्याप्त डेटा"},
    "high": {"en": "HIGH", "hi": "उच्च"},
    "medium": {"en": "MEDIUM", "hi": "मध्यम"},
    "low": {"en": "LOW", "hi": "निम्न"},
}
ACTION_LABEL = {
    "aerate": {"en": "Aerate", "hi": "एरेशन"},
    "clean": {"en": "Clean", "hi": "सफाई"},
    "test_first": {"en": "Test first", "hi": "पहले जांच"},
    "sample_metals": {"en": "Sample metals", "hi": "धातु जांच"},
    "lake_ban": {"en": "NGT lake ban", "hi": "NGT झील रोक"},
}
TITLE = {"en": "Durga Visarjan 2026 — Ghat water-quality risk brief",
         "hi": "दुर्गा विसर्जन 2026 — घाट जल-गुणवत्ता जोखिम सार"}


def _situation(s: dict, lang: str) -> str:
    if lang == "en":
        return (f"Across MPPCB tests at Bhopal's 7 immersion ghats in 2023–2025, {s['do_below_5']} of "
                f"{s['do_readings']} dissolved-oxygen readings were below the bathing limit of 5 mg/l "
                f"({s['do_zero']} were 0 mg/l), and {s['bod_above_3']} of {s['bod_readings']} BOD readings "
                f"were above 3 mg/l. Two ghats have no Durga 2025 test at all, so they must be tested first.")
    return (f"2023–2025 में भोपाल के 7 विसर्जन घाटों पर MPPCB की जांच में घुलित ऑक्सीजन की {s['do_readings']} "
            f"में से {s['do_below_5']} रीडिंग स्नान मानक 5 mg/l से कम थीं ({s['do_zero']} रीडिंग 0 mg/l), और "
            f"बीओडी की {s['bod_readings']} में से {s['bod_above_3']} रीडिंग 3 mg/l से अधिक थीं। दो घाटों की "
            f"दुर्गा 2025 की कोई जांच नहीं है, इसलिए वहां पहले जांच ज़रूरी है।")


def _first_reason(g: dict) -> dict | None:
    for kind in ("breach", "context", "gap"):
        for r in g["reasons"]:
            if r["kind"] == kind:
                return r
    return None


def _gap_paragraph(ghats: list[dict], lang: str) -> str:
    lines = []
    for g in ghats:
        for r in g["reasons"]:
            if r["kind"] == "gap":
                lines.append(f"{g['name'][lang]}: {r['text'][lang]}")
    tail = {"en": "Suspended solids were not tested in Durga 2023 or Durga 2025 at any ghat. "
                  "Blank, '*', '**' and '_' cells are shown as missing, never as clean; BDL metals are shown as BDL.",
            "hi": "दुर्गा 2023 और दुर्गा 2025 में किसी भी घाट पर निलंबित ठोस की जांच नहीं हुई। "
                  "खाली, '*', '**' और '_' को 'जांच नहीं' माना गया है, कभी 'साफ़' नहीं; BDL धातुओं को BDL ही दिखाया गया है।"}[lang]
    return " ".join(lines + [tail])


def _footer(lang: str) -> list[str]:
    if lang == "en":
        return [
            "Standard used: CPCB class B (outdoor bathing): pH 6.5–8.5, dissolved oxygen at least 5 mg/l, BOD at most 3 mg/l. "
            "Coliform was not tested, so only these three limits apply. Other parameters have no class B limit and are shown as context only.",
            "Readings are reported against limits; no health effects are claimed.",
            "Sources: MPPCB idol immersion report 2023 (pages 26–28, 59–61), MPPCB Ganesh and Durga visarjan report 2024 "
            "(pages 23–26, 69–72), 2025 (pages 28–30, 64–65). Every number above carries its page.",
            "NGT has banned immersion in the Upper and Lower Lakes (Free Press Journal, 26 Feb 2026): Bairagarh, Prempura, "
            "Khatlapura and Rani Kamlapati sit on these lakes.",
        ]
    return [
        "प्रयुक्त मानक: CPCB श्रेणी B (खुले में स्नान): पीएच 6.5–8.5, घुलित ऑक्सीजन कम से कम 5 mg/l, बीओडी अधिकतम 3 mg/l। "
        "कोलीफॉर्म की जांच नहीं हुई, इसलिए केवल ये तीन मानक लागू हैं। अन्य मापदंडों का श्रेणी B मानक नहीं है; वे केवल संदर्भ हैं।",
        "रीडिंग को मानकों से तुलना करके बताया गया है; स्वास्थ्य प्रभाव का कोई दावा नहीं है।",
        "स्रोत: MPPCB मूर्ति विसर्जन रिपोर्ट 2023 (पृष्ठ 26–28, 59–61), MPPCB गणेश और दुर्गा विसर्जन रिपोर्ट 2024 "
        "(पृष्ठ 23–26, 69–72), 2025 (पृष्ठ 28–30, 64–65)। ऊपर हर संख्या के साथ उसका पृष्ठ दिया है।",
        "NGT ने बड़े और छोटे तालाब में विसर्जन पर रोक लगाई है (फ्री प्रेस जर्नल, 26 फरवरी 2026): बैरागढ़, प्रेमपुरा, "
        "खटलापुरा और रानी कमलापति इन्हीं तालाबों पर हैं।",
    ]


def build_brief(ranking: dict, date_text: dict | None = None) -> dict:
    """Return {'markdown': {en, hi}, 'plain': {en, hi}} built only from the ranking payload."""
    md, plain = {}, {}
    date_text = date_text or {"en": "11 Oct 2026", "hi": "11 अक्टूबर 2026"}
    for lang in ("en", "hi"):
        prepared = {"en": f"{date_text['en']} · Prepared from MPPCB immersion reports 2023–2025 · Durga visarjan: 20 Oct 2026",
                    "hi": f"{date_text['hi']} · MPPCB विसर्जन रिपोर्ट 2023–2025 से तैयार · दुर्गा विसर्जन: 20 अक्टूबर 2026"}[lang]
        head_rank = {"en": "Ranked ghats (highest priority first)", "hi": "घाटों की प्राथमिकता सूची (सबसे ज़रूरी पहले)"}[lang]
        head_gap = {"en": "Data gaps", "hi": "डेटा की कमी"}[lang]
        head_sit = {"en": "Situation", "hi": "स्थिति"}[lang]
        head_note = {"en": "Notes", "hi": "टिप्पणी"}[lang]
        score_w = {"en": "score", "hi": "स्कोर"}[lang]
        rows_md, rows_txt = [], []
        for g in ranking["ghats"]:
            r = _first_reason(g)
            reason = r["text"][lang] if r else ""
            acts = ", ".join(ACTION_LABEL[a["code"]][lang] for a in g["actions"])
            tier = TIER_LABEL[g["tier"]][lang]
            sc = fmt(round(g["score"], 2)) if g["score"] is not None else "–"
            rows_md.append(f"{g['rank']}. **{g['name'][lang]}** — {tier} ({score_w} {sc}) — {reason} — *{acts}*")
            rows_txt.append(f"{g['rank']}. {g['name'][lang]} — {tier} ({score_w} {sc}) — {reason} — [{acts}]")
        sit = _situation(ranking["summary"], lang)
        gaps = _gap_paragraph(ranking["ghats"], lang)
        foot = _footer(lang)
        # Literal report codes ('_', '*', '**') must not be read as markdown emphasis.
        md_escape = lambda s: s.replace("_", "\\_").replace("*", "\\*")  # noqa: E731
        md[lang] = "\n".join([f"# {TITLE[lang]}", "", f"_{prepared}_", "", f"## {head_sit}", sit, "",
                              f"## {head_rank}", *rows_md, "", f"## {head_gap}", md_escape(gaps), "",
                              f"## {head_note}", *[f"- {md_escape(x)}" for x in foot], ""])
        plain[lang] = "\n".join([TITLE[lang], prepared, "", head_sit.upper() if lang == "en" else head_sit, sit, "",
                                 head_rank.upper() if lang == "en" else head_rank, *rows_txt, "",
                                 head_gap.upper() if lang == "en" else head_gap, gaps, "",
                                 *[f"- {x}" for x in foot], ""])
    out = {"markdown": md, "plain": plain, "polished": False, "pdfs": {k: f"/pdf/{k}.pdf" for k in PDFS}}
    return maybe_polish(out)


_NUM = re.compile(r"\d+(?:\.\d+)?")


def numbers_preserved(original: str, polished: str) -> bool:
    """True when every number in the original also appears in the polished text."""
    have = set(_NUM.findall(polished))
    return all(n in have for n in _NUM.findall(original))


def maybe_polish(brief: dict) -> dict:
    """Optional LLM fluency pass (English only). Off unless GHATWATCH_LLM_POLISH=1 and a key exist."""
    if os.environ.get("GHATWATCH_LLM_POLISH") != "1" or not os.environ.get("ANTHROPIC_API_KEY"):
        return brief
    try:
        import anthropic

        client = anthropic.Anthropic()
        src = brief["markdown"]["en"]
        msg = client.messages.create(
            model=os.environ.get("GHATWATCH_LLM_MODEL", "claude-sonnet-4-5"), max_tokens=2000,
            messages=[{"role": "user", "content":
                       "Rewrite this brief for fluency for a municipal officer. Keep every number, page "
                       "reference, ghat name and markdown structure exactly. Return only the brief.\n\n" + src}])
        text = "".join(getattr(b, "text", "") for b in msg.content)
        if text and numbers_preserved(src, text):
            brief["markdown"]["en"] = text
            brief["polished"] = True
    except Exception:  # polish is optional; templated text stays
        pass
    return brief
