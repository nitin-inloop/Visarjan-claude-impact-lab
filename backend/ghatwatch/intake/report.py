"""Reporter: bilingual markdown intake report."""
from __future__ import annotations

from .schema import NOT_VERIFIED

TIER_HI = {"high": "उच्च", "medium": "मध्यम", "low": "निम्न", "insufficient_data": "अपर्याप्त डेटा"}
FEST_HI = {"Ganesh": "गणेश", "Durga": "दुर्गा"}


def _fc_line(fc: dict | None, lang: str) -> str:
    if not fc:
        return "—" if lang == "en" else "—"
    if not fc.get("available"):
        return fc.get("reason", "not available") if lang == "en" else "उपलब्ध नहीं"
    models = ", ".join(f"{k} {v:.2f}" for k, v in (fc.get("models") or {}).items())
    b = fc.get("basis") or {}
    if lang == "en":
        return (f"champion {fc['champion']} p(breach) = {fc['p_breach']:.2f} (models: {models}); basis "
                f"{b.get('festival')} {b.get('year')} pre. Model estimate, not a measurement.")
    return (f"चैंपियन {fc['champion']} उल्लंघन संभावना = {fc['p_breach']:.2f} (मॉडल: {models}); आधार "
            f"{FEST_HI.get(b.get('festival'), b.get('festival'))} {b.get('year')} विसर्जन-पूर्व। यह मॉडल अनुमान है, मापन नहीं।")


def build_report(job: dict) -> dict:
    src, ctx, q = job["source"], job["context"], job["quality"]
    rows = job["rows"]
    an = job.get("analysis") or {}
    file_name = src.get("file_name") or "manual entry"
    pages = ", ".join(str(p) for p in src.get("pages") or []) or "—"
    sites = sorted({(r.get("slug") or "", r["site_as_printed"]) for r in rows})
    ocr = f" (OCR: {src.get('ocr_engine')})" if src.get("ocr_used") else ""
    meas = (job.get("ocr") or {}).get("measured_recovery")
    issues = job.get("issues") or []
    err = [i for i in issues if i["level"] == "error"]
    warn = [i for i in issues if i["level"] == "warn"]

    en = [f"# Ghat Watch intake report — job {job['id']}", "",
          f"**{NOT_VERIFIED['en'][0].upper() + NOT_VERIFIED['en'][1:]}.** Extracted values are proposals until an "
          f"officer reviews and accepts them.", "",
          f"- Source: {file_name}{ocr}; pages: {pages}; created {job['created']}",
          f"- Context: {ctx.get('festival') or '?'} {ctx.get('year') or '?'}; status: {job['status']}",
          f"- Rows: {q['rows']} ({q['numeric']} numeric, {q['flagged']} flagged/blank); tables: {q['tables_found']}; "
          f"mean confidence {q['mean_confidence']:.2f}",
          f"- Sites matched: {q['sites_matched']}, unmatched: {q['sites_unmatched']}"]
    hi = [f"# घाट वॉच इनटेक रिपोर्ट — जॉब {job['id']}", "",
          f"**{NOT_VERIFIED['hi']}।** अधिकारी की समीक्षा और स्वीकृति तक निकाले गए मान केवल प्रस्ताव हैं।", "",
          f"- स्रोत: {file_name}{ocr}; पृष्ठ: {pages}; बनाया गया {job['created']}",
          f"- संदर्भ: {FEST_HI.get(ctx.get('festival'), ctx.get('festival') or '?')} {ctx.get('year') or '?'}; स्थिति: {job['status']}",
          f"- पंक्तियां: {q['rows']} ({q['numeric']} संख्यात्मक, {q['flagged']} चिह्नित/खाली); तालिकाएं: {q['tables_found']}; "
          f"औसत भरोसा {q['mean_confidence']:.2f}",
          f"- मिलान हुए स्थल: {q['sites_matched']}, बेमेल: {q['sites_unmatched']}"]
    if meas is not None:
        en.append(f"- OCR accuracy measured on this job against the data pack: {meas * 100:.1f}% of values recovered")
        hi.append(f"- इस जॉब पर OCR सटीकता (डेटा पैक से तुलना): {meas * 100:.1f}% मान सही मिले")
    en += ["", "## Sites", ""] + [f"- {sp} → {s or 'unmatched (not ranked)'}" for s, sp in sites]
    hi += ["", "## स्थल", ""] + [f"- {sp} → {s or 'बेमेल (रैंक नहीं)'}" for s, sp in sites]
    if an:
        en += ["", "## Before → after (CPCB class B)", "", "| Ghat | Before | After | Changed |", "|---|---|---|---|"]
        hi += ["", "## पहले → बाद (CPCB श्रेणी B)", "", "| घाट | पहले | बाद | बदला |", "|---|---|---|---|"]
        for g in an.get("ghats", []):
            b, a = g["before"], g["after"]
            en.append(f"| {g['name']['en']} | {b['tier']} {b['score']} (#{b['rank']}) | {a['tier']} {a['score']} "
                      f"(#{a['rank']}) | {'yes' if g['changed'] else 'no'} |")
            hi.append(f"| {g['name']['hi']} | {TIER_HI.get(b['tier'], b['tier'])} {b['score']} (#{b['rank']}) | "
                      f"{TIER_HI.get(a['tier'], a['tier'])} {a['score']} (#{a['rank']}) | {'हां' if g['changed'] else 'नहीं'} |")
        en += ["", "## Forecast and reasons", ""]
        hi += ["", "## पूर्वानुमान और कारण", ""]
        for g in an.get("ghats", []):
            en.append(f"### {g['name']['en']}")
            hi.append(f"### {g['name']['hi']}")
            en.append(f"- Forecast: {_fc_line(g.get('forecast'), 'en')}")
            hi.append(f"- पूर्वानुमान: {_fc_line(g.get('forecast'), 'hi')}")
            if g.get("allocation_hint"):
                en.append(f"- Allocation hint: {g['allocation_hint']['text']['en']}")
                hi.append(f"- आवंटन सुझाव: {g['allocation_hint']['text']['hi']}")
            for r in g.get("reasons", [])[:4]:
                en.append(f"- {r['text']['en']}")
                hi.append(f"- {r['text']['hi']}")
            en.append("")
            hi.append("")
        en += ["## Summary", "", an["summary"]["en"]]
        hi += ["## सारांश", "", an["summary"]["hi"]]
    en += ["", f"## Issues ({len(err)} errors, {len(warn)} warnings)", ""] + [f"- [{i['level']}] {i['text']['en']}"
                                                                             for i in (err + warn)[:40]]
    hi += ["", f"## समस्याएं ({len(err)} त्रुटियां, {len(warn)} चेतावनियां)", ""] + [f"- [{i['level']}] {i['text']['hi']}"
                                                                                for i in (err + warn)[:40]]
    en += ["", f"_Officer-added readings are stored apart from the official MPPCB pack and labelled "
               f"'not yet verified by MPPCB' wherever they are used._"]
    hi += ["", "_अधिकारी द्वारा जोड़ी गई रीडिंग आधिकारिक MPPCB डेटा से अलग रखी जाती हैं और जहां भी उपयोग हों, "
               "'MPPCB द्वारा अभी सत्यापित नहीं' लिखा जाता है।_"]
    return {"en": "\n".join(en) + "\n", "hi": "\n".join(hi) + "\n"}
