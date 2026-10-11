"""Templated live situation report, English and Hindi (markdown + speakable text)."""
from __future__ import annotations

from datetime import datetime

from .processor import SHORT_NAME
from .simulator import IST

TIER_ORDER = {"critical": 0, "high": 1, "no_data": 2, "medium": 3, "low": 4}
TIER_EN = {"critical": "CRITICAL", "high": "HIGH", "medium": "MEDIUM", "low": "LOW", "no_data": "NO LIVE DATA"}
TIER_HI = {"critical": "गंभीर", "high": "उच्च", "medium": "मध्यम", "low": "निम्न", "no_data": "लाइव डेटा नहीं"}
SEV_HI = {"critical": "गंभीर", "high": "उच्च", "warn": "चेतावनी", "info": "सूचना"}


def hhmm(t: int) -> str:
    return datetime.fromtimestamp(t / 1000, IST).strftime("%H:%M")


def _n(v, d=1):
    return "–" if v is None else f"{v:.{d}f}"


def build(state: dict) -> dict:
    """state: the SimState dict (series not needed)."""
    t, sc = state["t"], state["scenario"]
    ghats = sorted(state["ghats"].values(), key=lambda g: (TIER_ORDER[g["live_tier"]], g["slug"]))
    alerts = state["alerts_open"]
    sev_count = {s: sum(1 for a in alerts if a["severity"] == s) for s in ("critical", "high", "warn", "info")}
    deployed = [r for r in state["resources"] if r["status"] != "idle"]
    ban_k = sum(g["idols_per_h"] for g in ghats if g["ngt_lake_ban"] and g["slug"] not in ("bairagarh",))

    en = [f"## SIMULATED live sitrep, {hhmm(t)} IST, 20 Oct 2026",
          f"Scenario: {sc['label']['en']}. Speed {state['speed']}x. Idols so far: {state['stats']['idols_total']}.", ""]
    hi = [f"## सिम्युलेटेड लाइव स्थिति रिपोर्ट, {hhmm(t)} IST, 20 अक्टूबर 2026",
          f"परिदृश्य: {sc['label']['hi']}। गति {state['speed']}x। अब तक मूर्तियाँ: {state['stats']['idols_total']}।", ""]
    sp_en = [f"Simulated situation report, {hhmm(t)}."]
    sp_hi = [f"सिम्युलेटेड स्थिति रिपोर्ट, {hhmm(t)}।"]
    for g in ghats:
        n = SHORT_NAME[g["slug"]]
        v, eta, w = g["values"], g["eta"], g["windows"]["DO"]
        sl = w["slope_per_h"] if w else None
        arrow = "" if sl is None else (" ↓" if sl <= -0.2 else " ↑" if sl >= 0.2 else " →")
        res = f", on site: {', '.join(g['resources_on_site'])}" if g["resources_on_site"] else ""
        res_hi = f", मौके पर: {', '.join(g['resources_on_site'])}" if g["resources_on_site"] else ""
        if g["live_tier"] == "no_data":
            en.append(f"- **{n['en']}**: {TIER_EN['no_data']} ({g['tier_note']['en']}){res}")
            hi.append(f"- **{n['hi']}**: {TIER_HI['no_data']} ({g['tier_note']['hi']}){res_hi}")
            continue
        eta_en = f", DO below 5 in ~{eta['do_5']} min" if eta["do_5"] else ""
        eta_hi = f", ~{eta['do_5']} मिनट में घुलित ऑक्सीजन 5 से नीचे" if eta["do_5"] else ""
        bod_en = _n(v["BOD"]) if v["BOD"] is not None else "awaiting lab"
        bod_hi = _n(v["BOD"]) if v["BOD"] is not None else "लैब परिणाम की प्रतीक्षा"
        en.append(f"- **{n['en']}**: {TIER_EN[g['live_tier']]}, DO {_n(w['mean_5'] if w else v['DO'])}{arrow}, "
                  f"BOD {bod_en}{eta_en}, {g['idols_per_h']:.0f} idols/h{res}")
        hi.append(f"- **{n['hi']}**: {TIER_HI[g['live_tier']]}, घुलित ऑक्सीजन {_n(w['mean_5'] if w else v['DO'])}{arrow}, "
                  f"बीओडी {bod_hi}{eta_hi}, {g['idols_per_h']:.0f} मूर्तियाँ/घंटा{res_hi}")
        if g["live_tier"] in ("critical", "high"):
            sp_en.append(f"{n['en']} is {g['live_tier']}, dissolved oxygen {_n(w['mean_5'] if w else v['DO'])}.")
            sp_hi.append(f"{n['hi']} {TIER_HI[g['live_tier']]}, घुलित ऑक्सीजन {_n(w['mean_5'] if w else v['DO'])}।")
    gaps = [SHORT_NAME[g["slug"]] for g in ghats if g["sensor"] != "live"]
    en += ["", f"Open alerts: {sev_count['critical']} critical, {sev_count['high']} high, "
               f"{sev_count['warn']} warning, {sev_count['info']} info."]
    hi += ["", f"खुले अलर्ट: {sev_count['critical']} गंभीर, {sev_count['high']} उच्च, "
               f"{sev_count['warn']} चेतावनी, {sev_count['info']} सूचना।"]
    if deployed:
        en.append("Deployed: " + "; ".join(f"{r['name']['en']} {r['status'].replace('_', ' ')} "
                                          f"{SHORT_NAME[r['target'] or r['at']]['en'] if (r['target'] or r['at']) != 'depot' else ''}".strip()
                                          for r in deployed) + ".")
        hi.append("तैनात: " + "; ".join(f"{r['name']['hi']} {SHORT_NAME[r['target'] or r['at']]['hi'] if (r['target'] or r['at']) != 'depot' else ''}".strip()
                                         for r in deployed) + "।")
    if ban_k > 0:
        en.append(f"NGT lake ban: {ban_k:.0f} idols in the last hour at lake ghats under the ban.")
        hi.append(f"एनजीटी झील प्रतिबंध: पिछले घंटे प्रतिबंधित झील घाटों पर {ban_k:.0f} मूर्तियाँ।")
    if gaps:
        en.append("Data gaps (no live reading, not clean): " + ", ".join(x["en"] for x in gaps) + ".")
        hi.append("डेटा अंतराल (लाइव रीडिंग नहीं, साफ़ न मानें): " + ", ".join(x["hi"] for x in gaps) + "।")
        sp_en.append("No live data at " + ", ".join(x["en"] for x in gaps) + ".")
        sp_hi.append(", ".join(x["hi"] for x in gaps) + " पर लाइव डेटा नहीं।")
    nxt = hhmm(t + 30 * 60_000)
    en.append(f"Next review: {nxt}. All values are simulated, not field measurements.")
    hi.append(f"अगली समीक्षा: {nxt}। सभी मान सिम्युलेटेड हैं, फ़ील्ड माप नहीं।")
    sp_en.append(f"{sev_count['critical'] + sev_count['high']} serious alerts open. Next review {nxt}.")
    sp_hi.append(f"{sev_count['critical'] + sev_count['high']} गंभीर अलर्ट खुले हैं। अगली समीक्षा {nxt}।")
    return {"markdown": {"en": "\n".join(en), "hi": "\n".join(hi)},
            "speak": {"en": " ".join(sp_en[:12]), "hi": " ".join(sp_hi[:12])}}
