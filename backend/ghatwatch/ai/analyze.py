"""Officer answer for one intake job, in English and Hindi (3-5 short sentences).

Flow: the officer uploads a PDF -> the text layer / OCR pulls out the values (Claude reads the document only
as a fallback) -> rules + ML analyse them -> Claude answers quickly, grounded on what was extracted.

The template answer is built first, only from the job's analysis (scores, tiers and ranks come from
ghatwatch.scoring; the forecast from the ML models). An LLM (fast Claude first by default, then Cerebras;
see llm.answer_text) then writes the answer from the extracted rows and the deterministic facts; it is
kept only if it passes every guard in ai/guards.py, otherwise the template is shown.
"""
from __future__ import annotations

import json

from . import guards, llm

MISSING_FLAGS = {"not sampled", "*", "**", "_", "DRY", "na", "-", "–"}
TIER = {"insufficient_data": {"en": "NOT ENOUGH DATA", "hi": "डेटा अपर्याप्त"},
        "high": {"en": "HIGH", "hi": "उच्च"}, "medium": {"en": "MEDIUM", "hi": "मध्यम"},
        "low": {"en": "LOW", "hi": "निम्न"}, None: {"en": "NOT RANKED", "hi": "रैंक नहीं"}}
TIER_ORDER = {"high": 3, "insufficient_data": 2, "medium": 1, "low": 0}
PARAM_HI = {"Dissolved oxygen": "घुलित ऑक्सीजन", "BOD": "बीओडी", "pH": "पीएच"}
DEADLINE = {"test": {"en": "17 Oct", "hi": "17 अक्टूबर"}, "work": {"en": "19 Oct", "hi": "19 अक्टूबर"}}


def _fmt(v: float) -> str:
    return f"{round(float(v), 2):g}"


def _n(k: int, one: str, many: str) -> str:
    return f"{k} {one if k == 1 else many}"


def _pct(p: float) -> str:
    return f"{int(round(float(p) * 100))}%"


def _worst_breach(job: dict) -> dict | None:
    """Most severe class-B breach among this job's own rows (lowest DO, else highest BOD, else pH)."""
    status = {r["row_id"]: r["status"] for r in ((job.get("analysis") or {}).get("readings") or [])}
    rows = [r for r in job.get("rows") or [] if status.get(r.get("row_id")) == "breach" and r.get("value") is not None]
    for p, key in (("Dissolved oxygen", lambda r: r["value"]), ("BOD", lambda r: -r["value"]),
                   ("pH", lambda r: -abs(r["value"] - 7.5))):
        cand = [r for r in rows if r.get("parameter") == p]
        if cand:
            return min(cand, key=key)
    return None


def _action_for(g: dict, job: dict) -> str:
    """Action wording only; the tier itself comes from scoring. This job's own breaches first, then the
    ghat's top scoring reason."""
    if g["after"]["tier"] == "insufficient_data":
        return "test"
    status = {r["row_id"]: r["status"] for r in ((job.get("analysis") or {}).get("readings") or [])}
    own = {r.get("parameter") for r in job.get("rows") or []
           if r.get("slug") == g["slug"] and status.get(r.get("row_id")) == "breach"}
    if "Dissolved oxygen" in own:
        return "aerate"
    if own & {"BOD", "pH"}:
        return "clean"
    reasons = [r for r in g.get("reasons") or [] if r.get("kind") == "breach"]
    first = reasons[0]["parameter"] if reasons else None
    return {"Dissolved oxygen": "aerate", "BOD": "clean", "pH": "clean"}.get(first, "test")


ACTION = {
    "test": {"en": "Send a test team to {g} by {d}.", "hi": "{d} तक {g} पर जांच दल भेजें।"},
    "aerate": {"en": "Put aerators at {g} by {d}, before visarjan on 20 Oct.",
               "hi": "20 अक्टूबर के विसर्जन से पहले, {d} तक {g} पर एरेटर लगाएं।"},
    "clean": {"en": "Send a cleaning crew to {g} by {d}, before visarjan on 20 Oct.",
              "hi": "20 अक्टूबर के विसर्जन से पहले, {d} तक {g} पर सफाई दल भेजें।"},
}


def facts_for(job: dict) -> dict:
    """The only facts the answer may use. Every number shown to the officer comes from here."""
    an = job.get("analysis") or {}
    rows = job.get("rows") or []
    ghats = an.get("ghats") or []
    status = [r.get("status") for r in an.get("readings") or []]
    missing = sum(1 for r in rows if r.get("value") is None and (r.get("flag") in MISSING_FLAGS or not r.get("flag")))
    bdl = sum(1 for r in rows if r.get("flag") in ("BDL", "ND"))
    unmatched = sorted({r.get("site_as_printed") or "" for r in rows if not r.get("slug")} - {""})
    review = [i for i in job.get("issues") or [] if i.get("level") in ("warn", "error")]
    wb = _worst_breach(job)
    changed = [g for g in ghats if g.get("changed") and g["before"]["tier"] != g["after"]["tier"]]
    top = max(ghats, key=lambda g: (TIER_ORDER.get(g["after"]["tier"], -1), g["after"]["score"] or 0), default=None)
    fc = (top or {}).get("forecast") or {}
    return {
        "file": (job.get("source") or {}).get("file_name"),
        "festival": (job.get("context") or {}).get("festival"), "year": (job.get("context") or {}).get("year"),
        "rows": len(rows), "ghats": len(ghats), "breaches": status.count("breach"),
        "missing": missing, "bdl": bdl, "unmatched_sites": unmatched, "needs_review": len(review),
        "worst": None if wb is None else {
            "parameter": wb["parameter"], "value": _fmt(wb["value"]), "unit": wb.get("unit_assumed") or "",
            "page": wb.get("page"), "ghat": next((g["name"] for g in ghats if g["slug"] == wb.get("slug")),
                                                 {"en": wb.get("site_as_printed"), "hi": wb.get("site_as_printed")})},
        "changed": [{"name": g["name"], "before": g["before"]["tier"], "after": g["after"]["tier"]} for g in changed],
        "top": None if top is None else {"name": top["name"], "tier": top["after"]["tier"],
                                         "action": _action_for(top, job)},
        "forecast": None if not fc.get("available") or fc.get("p_breach") is None else {
            "p": _pct(fc["p_breach"]), "basis": fc.get("basis") or {}},
    }


def template_answer(f: dict) -> dict:
    out = {}
    for L in ("en", "hi"):
        s = []
        fest = {"Durga": "दुर्गा", "Ganesh": "गणेश"}.get(f.get("festival"), f.get("festival")) if L == "hi" else f.get("festival")
        what = f"{fest} {f['year']}" if fest and f.get("year") else ""
        if L == "en":
            s.append(f"This report{' (' + what + ')' if what else ''} has {_n(f['rows'], 'reading', 'readings')} for {_n(f['ghats'], 'ghat', 'ghats')}; "
                     f"{f['breaches']} break the bathing limit.")
        else:
            s.append(f"इस रिपोर्ट{' (' + what + ')' if what else ''} में {_n(f['ghats'], 'घाट', 'घाटों')} की {f['rows']} रीडिंग हैं; "
                     f"{f['breaches']} स्नान मानक से बाहर हैं।")
        w = f.get("worst")
        if w:
            pname = w["parameter"] if L == "en" else PARAM_HI.get(w["parameter"], w["parameter"])
            page = f" (page {w['page']})" if w.get("page") and L == "en" else (f" (पृष्ठ {w['page']})" if w.get("page") else "")
            s.append(f"Worst reading: {pname} {w['value']} {w['unit']} at {w['ghat'][L]}{page}." if L == "en" else
                     f"सबसे खराब रीडिंग: {w['ghat'][L]} पर {pname} {w['value']} {w['unit']}{page}।")
        if f["changed"]:
            c = f["changed"][0]
            more = len(f["changed"]) - 1
            if L == "en":
                s.append(f"{c['name'][L]} moved from {TIER[c['before']][L]} to {TIER[c['after']][L]}"
                         + (f", and {more} more ghats changed." if more else "."))
            else:
                s.append(f"{c['name'][L]} {TIER[c['before']][L]} से {TIER[c['after']][L]} हो गया"
                         + (f", और {more} अन्य घाट बदले।" if more else "।"))
        else:
            s.append("No ghat changed its priority level." if L == "en" else "किसी घाट की प्राथमिकता नहीं बदली।")
        t = f.get("top")
        if t:
            d = DEADLINE["test" if t["action"] == "test" else "work"][L]
            s.append(ACTION[t["action"]][L].format(g=t["name"][L], d=d))
            fc = f.get("forecast")
            if fc:
                s.append(f"Model estimate, not a measurement: {fc['p']} chance of a limit breach at {t['name'][L]}."
                         if L == "en" else f"मॉडल का अनुमान (माप नहीं): {t['name'][L]} पर मानक टूटने की संभावना {fc['p']}।")
        gaps = f["missing"]
        if L == "en":
            gap = (f"Still missing: {_n(gaps, 'cell was', 'cells were')} blank or not sampled; shown as missing, not clean."
                   if gaps else "No blank cells in this report.")
            if f["needs_review"]:
                gap += f" Check {_n(f['needs_review'], 'flagged value', 'flagged values')} against the page."
        else:
            gap = (f"अभी भी कमी: {gaps} खाने खाली या बिना जांच के हैं; इन्हें 'जांच नहीं' दिखाया गया है, 'साफ़' नहीं।"
                   if gaps else "इस रिपोर्ट में कोई खाली खाना नहीं है।")
            if f["needs_review"]:
                gap += f" स्वीकार करने से पहले {f['needs_review']} चिह्नित मान जांचें।"
        s.append(gap)
        out[L] = " ".join(s)
    return out


MAX_PROMPT_ROWS = 120


def extractor_of(job: dict) -> str:
    """text | ocr | claude: which extractor produced the job's rows (manual for typed-in data)."""
    src = job.get("source") or {}
    e = src.get("extractor")
    if e in ("text", "ocr", "claude"):
        return e
    if job.get("kind") == "manual":
        return "manual"
    return "ocr" if src.get("ocr_used") else "text"


def grounding_for(job: dict, f: dict) -> dict:
    """What the answer is grounded on: the extracted rows (as printed, with page and flags) plus the
    deterministic analysis (before/after tier per ghat, breaches vs limits, forecast estimate, gaps)."""
    an = job.get("analysis") or {}
    rd = {r.get("row_id"): r for r in an.get("readings") or []}
    names = {g.get("slug"): (g.get("name") or {}).get("en") for g in an.get("ghats") or []}
    rows = []
    for r in (job.get("rows") or [])[:MAX_PROMPT_ROWS]:
        st = rd.get(r.get("row_id")) or {}
        rows.append({"ghat": names.get(r.get("slug")) or r.get("site_as_printed"), "parameter": r.get("parameter"),
                     "value_as_printed": r.get("value_as_printed"), "page": r.get("page"), "flag": r.get("flag"),
                     "phase": r.get("phase"), "status": st.get("status"), "needs_review": bool(r.get("needs_review"))})
    breaches = [{"ghat": x["ghat"], "parameter": x["parameter"], "value_as_printed": x["value_as_printed"],
                 "page": x["page"], "limit": (rd.get(r.get("row_id")) or {}).get("limit_text")}
                for x, r in zip(rows, job.get("rows") or []) if x["status"] == "breach"]
    ghats = []
    for g in an.get("ghats") or []:
        fc = g.get("forecast") or {}
        ghats.append({"ghat": (g.get("name") or {}).get("en"), "before_tier": (g.get("before") or {}).get("tier"),
                      "after_tier": (g.get("after") or {}).get("tier"),
                      "forecast_estimate": _pct(fc["p_breach"]) if fc.get("available") and fc.get("p_breach") is not None else None})
    return {"extractor": extractor_of(job), "deadline": "visarjan 20 Oct 2026", "facts": f, "ghats": ghats,
            "breaches_vs_limits": breaches, "extracted_rows": rows,
            "extracted_rows_total": len(job.get("rows") or [])}


SYSTEM = (
    "You write a short answer for a municipal officer in Bhopal who plans Durga visarjan on 20 Oct 2026, "
    "about a lab report they just uploaded. EXTRACTED holds the values read from the report by text/OCR "
    "(as printed, with page and flags) and the rule-based analysis (tiers before/after, breaches vs limits, "
    "a model forecast, gaps). Say: what the report shows, which ghat needs what action by when (before 20 Oct), "
    "and what is missing. Readers may have low literacy: use short, plain sentences (3 to 6), no jargon. "
    "Rules: use ONLY numbers that appear in EXTRACTED or NOTE, and keep every number from NOTE. "
    "Do not mention health, disease, safety for people, or any effect on the body. "
    "The forecast is a model estimate, never a measurement: say 'estimate' (Hindi: 'अनुमान'). "
    "Do not change any priority level, rank, action or deadline from NOTE. Missing data is missing, never clean. "
    'Reply with JSON only: {"en": "...", "hi": "..."} where hi is natural Hindi in Devanagari.'
)


def answer(job: dict, use_ai: bool = True) -> dict:
    """{text{en,hi}, ai_written, provider, model, latency_ms, numbers_checked, guards_failed, facts, extractor}"""
    f = facts_for(job)
    tmpl = template_answer(f)
    base = {"job_id": job.get("id"), "text": tmpl, "ai_written": False, "provider": "template", "model": None,
            "latency_ms": 0, "numbers_checked": True, "guards_failed": [], "facts": f,
            "extractor": extractor_of(job)}
    if not job.get("analysis") or not use_ai:
        return base
    facts_text = json.dumps(grounding_for(job, f), ensure_ascii=False)
    user = f"EXTRACTED:\n{facts_text}\n\nNOTE (English):\n{tmpl['en']}\n\nNOTE (Hindi):\n{tmpl['hi']}"
    failed: list[str] = []

    def accept(text: str) -> bool:
        obj = guards.parse_json_object(text)
        if not obj or not isinstance(obj.get("en"), str) or not isinstance(obj.get("hi"), str):
            failed.append("format")
            return False
        bad = []
        for L in ("en", "hi"):
            bad += [f"{L}:{x}" for x in guards.check(obj[L], L, facts_text, tmpl[L], f["forecast"] is not None)]
        failed.extend(bad)
        return not bad

    res = llm.answer_text(SYSTEM, user, accept)
    if res is None:
        return base | {"guards_failed": failed}
    obj = guards.parse_json_object(res["text"])
    return base | {"text": {"en": obj["en"].strip(), "hi": obj["hi"].strip()}, "ai_written": True,
                   "provider": res["provider"], "model": res["model"], "latency_ms": res["latency_ms"],
                   "guards_failed": failed}
