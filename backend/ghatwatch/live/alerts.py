"""Alert rules (PLAN-LIVE v2 amendment H): one open alert per (ghat, code), escalation via upsert,
auto-resolve after 15 sim-min clear, baseline flag for conditions already true at t0."""
from __future__ import annotations

from .processor import SHORT_NAME
from .schema import SEV_RANK, bi
from .simulator import MIN_MS

RESOLVE_AFTER_MIN = 15
RECOMMENDED = {"DO_LOW": ["aerator"], "DO_ETA_60": ["aerator"], "DO_FALLING_FAST": ["aerator", "crew"],
               "BOD_HIGH": ["crew"], "NO_SENSOR": ["test_team"], "SENSOR_STALE": ["test_team"], "IDOL_SURGE": ["crew"]}


def _f(v) -> str:
    return "–" if v is None else f"{v:.1f}"


def _texts(code: str, slug: str, sev: str, vals: dict, baseline: bool, src: dict) -> tuple[dict, dict]:
    n = SHORT_NAME[slug]
    do, bod = vals.get("DO"), vals.get("BOD")
    if code == "DO_LOW":
        text = bi(f"{n['en']}: dissolved oxygen {_f(do)} mg/l, below the bathing limit of 5.",
                  f"{n['hi']}: घुलित ऑक्सीजन {_f(do)} mg/l, स्नान मानक 5 से कम।")
        speak = bi(f"{n['en']}: dissolved oxygen {_f(do)}, below the bathing limit.",
                   f"{n['hi']}: घुलित ऑक्सीजन {_f(do)}, स्नान मानक से कम।")
        if baseline:
            text = bi(text["en"] + f" Already below the limit before immersion ({src['en']}).",
                      text["hi"] + f" विसर्जन से पहले ही सीमा से कम था ({src['hi']})।")
    elif code == "DO_ETA_60":
        eta = vals.get("eta_min")
        text = bi(f"{n['en']}: dissolved oxygen {_f(do)} mg/l is falling; projected below 5 in about {eta} min.",
                  f"{n['hi']}: घुलित ऑक्सीजन {_f(do)} mg/l गिर रही है; लगभग {eta} मिनट में 5 से नीचे जाने का अनुमान।")
        speak = bi(f"{n['en']}: dissolved oxygen may fall below the limit in about {eta} minutes.",
                   f"{n['hi']}: लगभग {eta} मिनट में घुलित ऑक्सीजन मानक से नीचे जा सकती है।")
    elif code == "DO_FALLING_FAST":
        sl = vals.get("slope_per_h")
        text = bi(f"{n['en']}: dissolved oxygen falling fast ({_f(sl)} mg/l per hour), now {_f(do)}.",
                  f"{n['hi']}: घुलित ऑक्सीजन तेज़ी से गिर रही है ({_f(sl)} mg/l प्रति घंटा), अभी {_f(do)}।")
        speak = bi(f"{n['en']}: dissolved oxygen falling fast.", f"{n['hi']}: घुलित ऑक्सीजन तेज़ी से गिर रही है।")
    elif code == "BOD_HIGH":
        text = bi(f"{n['en']}: lab BOD {_f(bod)} mg/l, above the bathing limit of 3.",
                  f"{n['hi']}: लैब बीओडी {_f(bod)} mg/l, स्नान मानक 3 से अधिक।")
        speak = bi(f"{n['en']}: BOD {_f(bod)}, above the limit.", f"{n['hi']}: बीओडी {_f(bod)}, मानक से अधिक।")
    elif code == "NO_SENSOR":
        text = bi(f"{n['en']}: no live sensor. Water quality unknown; this is not a clean reading.",
                  f"{n['hi']}: कोई लाइव सेंसर नहीं। जल गुणवत्ता अज्ञात; इसे साफ़ न मानें।")
        speak = bi(f"{n['en']}: no live sensor.", f"{n['hi']}: कोई लाइव सेंसर नहीं।")
    elif code == "SENSOR_STALE":
        text = bi(f"{n['en']}: no reading for over 10 minutes.", f"{n['hi']}: 10 मिनट से अधिक से कोई रीडिंग नहीं।")
        speak = bi(f"{n['en']}: sensor data stale.", f"{n['hi']}: सेंसर डेटा पुराना।")
    else:  # IDOL_SURGE
        k = vals.get("idols_per_h")
        text = bi(f"{n['en']}: idol arrivals surging, {k:.0f} in the last hour.",
                  f"{n['hi']}: मूर्तियों का आगमन तेज़, पिछले घंटे में {k:.0f}।")
        speak = bi(f"{n['en']}: idol arrivals surging.", f"{n['hi']}: मूर्तियों का आगमन तेज़।")
    return text, speak


class AlertManager:
    def __init__(self):
        self.n = 0
        self.open: dict[tuple[str, str], dict] = {}
        self.clear_since: dict[tuple[str, str], int] = {}
        self.base_sev: dict[tuple[str, str], str] = {}

    def conditions(self, slug: str, d: dict, extra: dict) -> dict[str, tuple[str, dict]]:
        """code -> (severity, values) for every condition currently true."""
        out: dict[str, tuple[str, dict]] = {}
        w = d["windows"]["DO"]
        if d["sensor"] == "none":
            out["NO_SENSOR"] = ("info", {})
        elif d["sensor"] == "stale":
            out["SENSOR_STALE"] = ("warn", {})
        if w and d["breach"]["DO"]:
            m = w["mean_5"]
            sev = "critical" if m < 1 else "high" if m < 3 else "warn"
            out["DO_LOW"] = (sev, {"DO": m})
        if w and w["mean_5"] >= 5 and d["eta"]["do_5"] is not None and 0 < d["eta"]["do_5"] <= 60:
            out["DO_ETA_60"] = ("high", {"DO": w["mean_5"], "eta_min": d["eta"]["do_5"]})
        if w and w["slope_per_h"] is not None and w["slope_per_h"] <= -1 and w["mean_5"] < 6.5:
            out["DO_FALLING_FAST"] = ("warn", {"DO": w["mean_5"], "slope_per_h": w["slope_per_h"]})
        bod = d["values"]["BOD"]
        if d["breach"]["BOD"] and bod is not None:
            out["BOD_HIGH"] = ("high" if bod > 8 else "warn", {"BOD": bod})
        if extra.get("surge"):
            out["IDOL_SURGE"] = ("info", {"idols_per_h": extra["idols_per_h"]})
        return out

    def evaluate(self, slug: str, d: dict, extra: dict, t: int, src: dict, baseline: bool = False):
        """Returns (upserts, resolved_ids)."""
        ups, res = [], []
        cond = self.conditions(slug, d, extra)
        for code, (sev, vals) in cond.items():
            key = (slug, code)
            self.clear_since.pop(key, None)
            a = self.open.get(key)
            if a is None:
                self.n += 1
                text, speak = _texts(code, slug, sev, vals, baseline, src)
                recommended = list(RECOMMENDED[code])
                if code == "IDOL_SURGE" and extra.get("lake_ban"):
                    recommended.append("diversion")
                a = {"id": f"A{self.n:04d}", "t_open": t, "t_update": t, "ghat": slug, "code": code,
                     "severity": sev, "text": text, "speak": speak,
                     "values": {k: v for k, v in vals.items() if isinstance(v, (int, float))},
                     "recommended": recommended, "state": "open", "baseline": baseline}
                self.open[key] = a
                if baseline:
                    self.base_sev[key] = sev
                ups.append(a)
            elif SEV_RANK[sev] > SEV_RANK[a["severity"]]:  # escalation only while open (no flapping)
                escalated = True
                a["severity"], a["t_update"] = sev, t
                a["values"] = {k: v for k, v in vals.items() if isinstance(v, (int, float))}
                if a["baseline"] and escalated and SEV_RANK[sev] > SEV_RANK[self.base_sev.get(key, "info")]:
                    a["baseline"] = False  # worse than before immersion: now news, may be spoken
                a["text"], a["speak"] = _texts(code, slug, sev, vals, a["baseline"], src)
                ups.append(a)
        for key in [k for k in self.open if k[0] == slug and k[1] not in cond]:
            since = self.clear_since.setdefault(key, t)
            if t - since >= RESOLVE_AFTER_MIN * MIN_MS:
                a = self.open.pop(key)
                a["state"], a["t_update"] = "resolved", t
                self.clear_since.pop(key, None)
                res.append(a["id"])
        return ups, res

    def ack(self, alert_id: str) -> dict | None:
        for a in self.open.values():
            if a["id"] == alert_id:
                a["state"] = "acked"
                return a
        return None

    def open_list(self) -> list[dict]:
        return sorted(self.open.values(), key=lambda a: (-SEV_RANK[a["severity"]], -a["t_open"]))

    def ids_for(self, slug: str) -> list[str]:
        return [a["id"] for (s, _), a in self.open.items() if s == slug]
