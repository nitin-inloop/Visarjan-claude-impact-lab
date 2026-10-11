"""Officer alerts. Triggers are DETERMINISTIC rules over the ranking and accepted officer data:

  DO = 0 mg/l                         -> critical, aerate
  DO < 3 mg/l                         -> high, aerate
  BOD > 6 mg/l                        -> high, clean
  no recent test (insufficient data)  -> medium, test
  a flagged implausible value         -> review, re-check the page
  a new upload changed a tier         -> high (tier up) / info (tier down), act on the new tier

Every alert carries severity, ghat, message{en,hi}, action{en,hi}, deadline (relative to visarjan on
20 Oct 2026) and source (report, page, upload). An LLM may only rephrase `message`, under the same
two-way number guard; the rule, severity, action and deadline never come from the LLM.
"""
from __future__ import annotations

import json
import re
from datetime import date, timedelta

from . import guards, llm

VISARJAN = date(2026, 10, 20)
SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "review": 3, "info": 4}
TIER_ORDER = {"high": 3, "insufficient_data": 2, "medium": 1, "low": 0}
TIER = {"insufficient_data": {"en": "NOT ENOUGH DATA", "hi": "डेटा अपर्याप्त"},
        "high": {"en": "HIGH", "hi": "उच्च"}, "medium": {"en": "MEDIUM", "hi": "मध्यम"},
        "low": {"en": "LOW", "hi": "निम्न"}}
_IMPLAUSIBLE = re.compile(r"impossible|plausible range|exceed", re.I)
MONTH_HI = {10: "अक्टूबर", 9: "सितंबर", 11: "नवंबर"}

ACTIONS = {
    "aerate": {"en": "Put aerators at this ghat.", "hi": "इस घाट पर एरेटर लगाएं।", "days_before": 1},
    "clean": {"en": "Send a cleaning crew to this ghat.", "hi": "इस घाट पर सफाई दल भेजें।", "days_before": 1},
    "test": {"en": "Send a test team: take a pre-immersion sample.", "hi": "जांच दल भेजें: विसर्जन-पूर्व नमूना लें।",
             "days_before": 3},
    "review": {"en": "Check this value against the report page before relying on it.",
               "hi": "इस मान पर भरोसा करने से पहले रिपोर्ट के पृष्ठ से मिलान करें।", "days_before": 5},
    "follow_tier": {"en": "Plan crews for the new priority level.", "hi": "नई प्राथमिकता के अनुसार दल तय करें।",
                    "days_before": 2},
}


def deadline(days_before: int) -> dict:
    d = VISARJAN - timedelta(days=days_before)
    return {"date": d.isoformat(), "days_before_visarjan": days_before,
            "text": {"en": f"by {d.day} {d.strftime('%b')}", "hi": f"{d.day} {MONTH_HI.get(d.month, '')} तक"}}


def _alert(rule: str, severity: str, g: dict, msg: dict, action: str, source: dict | None) -> dict:
    a = ACTIONS[action]
    return {"id": f"{rule}:{g['slug']}", "rule": rule, "severity": severity, "ghat": {"slug": g["slug"], "name": g["name"]},
            "message": msg, "action": {"code": action, "text": {"en": a["en"], "hi": a["hi"]}},
            "deadline": deadline(a["days_before"]), "source": source or {}}


def _src(r: dict) -> dict:
    s = r.get("source") or {}
    return {"report": s.get("report"), "pdf": s.get("pdf"), "page": s.get("page"), "upload": s.get("upload")}


def _latest(reasons: list[dict], param: str, test) -> dict | None:
    hits = [r for r in reasons if r.get("parameter") == param and r.get("value") is not None and test(float(r["value"]))]
    return max(hits, key=lambda r: (r.get("year") or 0, -float(r["value"]) if param == "Dissolved oxygen" else float(r["value"])),
               default=None)


def build_alerts(ranking: dict, jobs: list[dict] | None = None) -> list[dict]:
    """Deterministic alert list from the ranking payload (/api/ranking shape) and intake jobs."""
    out: list[dict] = []
    rank = {}
    for g in ranking.get("ghats") or []:
        rank[g["slug"]] = g.get("rank") or 99
        reasons = g.get("reasons") or []
        do0 = _latest(reasons, "Dissolved oxygen", lambda v: v == 0)
        do3 = None if do0 else _latest(reasons, "Dissolved oxygen", lambda v: v < 3)
        bod = _latest(reasons, "BOD", lambda v: v > 6)
        if do0:
            out.append(_alert("do_zero", "critical", g, do0["text"], "aerate", _src(do0)))
        elif do3:
            out.append(_alert("do_below_3", "high", g, do3["text"], "aerate", _src(do3)))
        if bod:
            out.append(_alert("bod_above_6", "high", g, bod["text"], "clean", _src(bod)))
        if g.get("tier") == "insufficient_data":
            gap = next((r for r in reasons if r.get("kind") == "gap"), None)
            msg = gap["text"] if gap else (g.get("tier_rule") or {"en": "No recent test for this ghat.",
                                                                   "hi": "इस घाट की कोई हालिया जांच नहीं है।"})
            out.append(_alert("no_recent_test", "medium", g, msg, "test", _src(gap) if gap else None))
    names = {g["slug"]: g["name"] for g in ranking.get("ghats") or []}
    for job in jobs or []:
        if job.get("status") not in ("accepted", "needs_review"):
            continue
        rows = {r["row_id"]: r for r in job.get("rows") or []}
        issue_by_row: dict[str, dict] = {}
        for i in job.get("issues") or []:
            if i.get("row_id") in rows and (i.get("level") == "error" or _IMPLAUSIBLE.search(i["text"]["en"])):
                issue_by_row.setdefault(i["row_id"], i)
        # Implausible = validator set needs_review on the row (accept holds it back), or, for accepted jobs,
        # an error / implausible-range issue on the row.
        flagged = [rid for rid, r in rows.items() if r.get("needs_review")]
        if job.get("status") == "accepted":
            flagged += [rid for rid in issue_by_row if rid not in flagged]
        for rid in flagged:
            r = rows[rid]
            if not r.get("slug") or r["slug"] not in names:
                continue
            i = issue_by_row.get(rid)
            v = r.get("value_as_printed") or ("" if r.get("value") is None else f"{r['value']:g}")
            msg = i["text"] if i else {
                "en": f"{r.get('parameter')} {v} is outside the plausible range; it is held back from the score.",
                "hi": f"{r.get('parameter')} {v} संभावित सीमा से बाहर है; इसे स्कोर में नहीं जोड़ा गया।"}
            g = {"slug": r["slug"], "name": names[r["slug"]]}
            a = _alert("implausible_value", "review", g, msg, "review",
                       {"report": (job.get("source") or {}).get("file_name"), "pdf": None,
                        "page": r.get("page"), "upload": job.get("id")})
            a["id"] += f":{job.get('id')}:{rid}"
            out.append(a)
        if job.get("status") != "accepted":
            continue
        for gh in (job.get("analysis") or {}).get("ghats") or []:
            b, a_ = gh["before"]["tier"], gh["after"]["tier"]
            if b == a_:
                continue
            up = TIER_ORDER.get(a_, 0) > TIER_ORDER.get(b, 0)
            fn = (job.get("source") or {}).get("file_name") or "officer upload"
            msg = {"en": f"The upload {fn} moved this ghat from {TIER[b]['en']} to {TIER[a_]['en']}.",
                   "hi": f"अपलोड {fn} से यह घाट {TIER[b]['hi']} से {TIER[a_]['hi']} हो गया।"}
            al = _alert("tier_changed", "high" if up else "info", {"slug": gh["slug"], "name": gh["name"]}, msg,
                        "follow_tier", {"report": fn, "pdf": None, "page": None, "upload": job.get("id")})
            al["id"] += f":{job.get('id')}"
            out.append(al)
    out.sort(key=lambda a: (SEVERITY_ORDER[a["severity"]], rank.get(a["ghat"]["slug"], 99), a["rule"]))
    return out


SYSTEM = (
    "You rephrase short alert messages for a municipal officer with low literacy. Keep each message one or two "
    "short plain sentences. Keep every number and page exactly; add no new numbers. Never mention health, "
    "disease or effects on people. Reply with JSON only: {\"messages\": {\"<id>\": \"...\"}} using the same ids."
)


def rephrase(alerts: list[dict], lang: str) -> tuple[list[dict], dict]:
    """Optional LLM rephrasing of `message[lang]`. Each message passes the guards or keeps its rule text."""
    meta = {"ai_written": False, "provider": "template", "model": None, "latency_ms": 0, "numbers_checked": True,
            "rephrased": 0}
    if not alerts or not (llm.cerebras_configured() or llm.claude_configured()):
        return alerts, meta
    src = {a["id"]: a["message"][lang] for a in alerts}
    user = f"Language: {'Hindi (Devanagari)' if lang == 'hi' else 'English'}\nMESSAGES:\n{json.dumps(src, ensure_ascii=False)}"
    kept: dict[str, str] = {}

    def accept(text: str) -> bool:
        obj = guards.parse_json_object(text)
        msgs = (obj or {}).get("messages")
        if not isinstance(msgs, dict):
            return False
        for k, v in msgs.items():
            if k in src and isinstance(v, str) and not guards.check(v, lang, src[k], src[k], False, max_chars=400) \
                    and guards.health_ok(v):
                kept[k] = v.strip()
        return bool(kept)

    res = llm.write_text(SYSTEM, user, accept, max_tokens=1500)
    if res is None:
        return alerts, meta
    for a in alerts:
        if a["id"] in kept:
            a["message"] = a["message"] | {lang: kept[a["id"]], f"{lang}_rule_text": src[a["id"]]}
            a["message_ai_written"] = True
    meta.update(ai_written=True, provider=res["provider"], model=res["model"], latency_ms=res["latency_ms"],
                rephrased=len(kept))
    return alerts, meta
