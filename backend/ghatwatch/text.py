"""Bilingual (English / Hindi) labels and sentence templates.

Every sentence that states a reading carries its source sentence, built by `source_text`.
"""
from __future__ import annotations

PARAM_EN = {
    "Dissolved oxygen": "Dissolved oxygen", "BOD": "BOD", "pH": "pH", "COD": "COD",
    "Total solids": "Total solids", "Dissolved solids": "Dissolved solids",
    "Suspended solids": "Suspended solids", "Turbidity": "Turbidity", "Conductivity": "Conductivity",
    "Chromium": "Chromium", "Lead": "Lead", "Zinc": "Zinc", "Copper": "Copper",
}
PARAM_HI = {
    "Dissolved oxygen": "घुलित ऑक्सीजन", "BOD": "बीओडी", "pH": "पीएच", "COD": "सीओडी",
    "Total solids": "कुल ठोस", "Dissolved solids": "घुलित ठोस", "Suspended solids": "निलंबित ठोस",
    "Turbidity": "गंदलापन (टर्बिडिटी)", "Conductivity": "चालकता", "Chromium": "क्रोमियम",
    "Lead": "सीसा (लेड)", "Zinc": "जस्ता (ज़िंक)", "Copper": "तांबा (कॉपर)",
}
# grammatical gender of the Hindi noun -> verb ending
_HI_FEM = {"Dissolved oxygen", "Conductivity"}

FEST_HI = {"Ganesh": "गणेश", "Durga": "दुर्गा"}
PHASE_EN = {"pre": "before immersion", "during": "during immersion", "after": "one week after immersion"}
PHASE_HI = {"pre": "विसर्जन से पहले", "during": "विसर्जन के दौरान", "after": "विसर्जन के एक सप्ताह बाद"}

LIMIT_EN = {
    "Dissolved oxygen": "The bathing limit is at least 5 mg/l.",
    "BOD": "The bathing limit is at most 3 mg/l.",
    "pH": "The bathing range is 6.5 to 8.5.",
}
LIMIT_HI = {
    "Dissolved oxygen": "स्नान मानक कम से कम 5 mg/l है।",
    "BOD": "स्नान मानक अधिकतम 3 mg/l है।",
    "pH": "स्नान मानक 6.5 से 8.5 के बीच है।",
}


def fmt(v: float | None) -> str:
    """Compact number: 0.0 -> '0', 2.50 -> '2.5', 177.8 -> '177.8'."""
    if v is None:
        return "–"
    return f"{float(v):.4g}" if abs(float(v)) < 1000 else f"{float(v):.0f}"


def when_en(year: int, festival: str, phase: str) -> str:
    if phase == "pre":
        return f"before the {festival} {year} immersion"
    if phase == "after":
        return f"one week after the {festival} {year} immersion"
    return f"during {festival} {year}"


def when_hi(year: int, festival: str, phase: str) -> str:
    return f"{FEST_HI.get(festival, festival)} {year} के {PHASE_HI[phase]}"


def _val(v: float, unit: str | None) -> str:
    return f"{fmt(v)} {unit}" if unit else fmt(v)


def source(year: int, page: int | None) -> dict:
    return {"report": f"MPPCB {year}", "pdf": str(year), "page": page}


def source_text(year: int, page: int | None) -> dict:
    if page is None:
        return {"en": f"Source: MPPCB {year} report.", "hi": f"स्रोत: MPPCB {year} रिपोर्ट।"}
    return {"en": f"Source: MPPCB {year} report, page {page}.",
            "hi": f"स्रोत: MPPCB {year} रिपोर्ट, पृष्ठ {page}।"}


def breach_sentence(param: str, v: float, unit: str | None, year: int, festival: str,
                    phase: str, page: int | None, src: dict | None = None) -> dict:
    verb = "थी" if param in _HI_FEM else "था"
    s = src or source_text(year, page)
    return {
        "en": f"{PARAM_EN[param]} was {_val(v, unit)} {when_en(year, festival, phase)}. "
              f"{LIMIT_EN[param]} {s['en']}",
        "hi": f"{when_hi(year, festival, phase)} {PARAM_HI[param]} {_val(v, unit)} {verb}। "
              f"{LIMIT_HI[param]} {s['hi']}",
    }


def context_sentence(param: str, v: float, unit: str | None, year: int, festival: str,
                     phase: str, page: int, why: str) -> dict:
    """why = 'highest' (highest of the 7 ghats) or 'spike' (metal far above usual)."""
    verb = "थी" if param in _HI_FEM else "था"
    s = source_text(year, page)
    if why == "highest":
        en_why, hi_why = "the highest reading at any of the 7 ghats", "जो 7 घाटों में सबसे अधिक है"
    else:
        en_why, hi_why = "far above its usual level at these ghats", "जो इन घाटों के सामान्य स्तर से बहुत अधिक है"
    return {
        "en": f"{PARAM_EN[param]} reached {_val(v, unit)} {when_en(year, festival, phase)}, {en_why}. "
              f"No CPCB bathing limit is set for {PARAM_EN[param].lower()}. {s['en']}",
        "hi": f"{when_hi(year, festival, phase)} {PARAM_HI[param]} {_val(v, unit)} {verb}, {hi_why}। "
              f"{PARAM_HI[param]} के लिए CPCB स्नान मानक तय नहीं है। {s['hi']}",
    }


def params_en(params: list[str]) -> str:
    return ", ".join(PARAM_EN.get(p, p) for p in params)


def params_hi(params: list[str]) -> str:
    return ", ".join(PARAM_HI.get(p, p) for p in params)


ACTIONS = {
    "aerate": {
        "en": "Aerate: floating aerators, and dissolved-oxygen spot checks on immersion day and 7 days after.",
        "hi": "एरेशन: तैरते एरेटर लगाएं; विसर्जन के दिन और 7 दिन बाद घुलित ऑक्सीजन की जांच करें।",
    },
    "clean": {
        "en": "Clean: nirmalya collection point and an extra cleaning crew before and after immersion.",
        "hi": "सफाई: निर्माल्य संग्रह केंद्र, और विसर्जन से पहले व बाद में अतिरिक्त सफाई दल।",
    },
    "test_first": {
        "en": "Test first: pre-immersion sample by 17 Oct, then test all three phases this year.",
        "hi": "पहले जांच: 17 अक्टूबर तक विसर्जन-पूर्व नमूना लें, फिर इस वर्ष तीनों चरणों में जांच करें।",
    },
    "sample_metals": {
        "en": "Sample metals (chromium, lead, zinc, copper) during and after immersion.",
        "hi": "धातु जांच: विसर्जन के दौरान और बाद में क्रोमियम, सीसा, जस्ता और तांबे का नमूना लें।",
    },
    "lake_ban": {
        "en": "NGT ban on immersion in the lake: route idols to designated kunds; keep baseline testing. "
              "(Free Press Journal, 26 Feb 2026, listed in the data pack.)",
        "hi": "झील में विसर्जन पर NGT की रोक: मूर्तियों को निर्धारित कुंडों में भेजें; नियमित जांच जारी रखें। "
              "(फ्री प्रेस जर्नल, 26 फरवरी 2026, डेटा पैक में सूचीबद्ध।)",
    },
}
