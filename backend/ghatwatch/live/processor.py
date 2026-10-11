"""Reading processor: validation, staleness, windows, hysteresis, ETA, live score/tier (PLAN-LIVE §2, v2 J)."""
from __future__ import annotations

from collections import deque
from functools import lru_cache

import numpy as np

from ..data import SITES, load_bhopal
from ..scoring import W_PARAM, exceedance
from .schema import CONTINUOUS, LAB, SERIES_KEYS, VALUE_KEYS, bi
from .simulator import MIN_MS, PLAUSIBLE

BUF_LEN = 360            # 6 sim-h at 1-min
STALE_MIN = 10           # continuous parameters
ETA_MIN_SLOPE = -0.2     # mg/l per h; flatter trends are "stable" (no ETA)
W = {"DO": W_PARAM["Dissolved oxygen"], "BOD": W_PARAM["BOD"], "pH": W_PARAM["pH"]}
SCORE_PARAM = {"DO": "Dissolved oxygen", "BOD": "BOD", "pH": "pH"}

SHORT_NAME = {"bairagarh": bi("Bairagarh", "बैरागढ़"), "malikhedi": bi("Malikhedi", "मालीखेड़ी"),
              "prempura": bi("Prempura", "प्रेमपुरा"), "khatlapura": bi("Khatlapura", "खटलापुरा"),
              "rani-kamlapati": bi("Rani Kamlapati", "रानी कमलापति"), "hathaikheda": bi("Hathaikheda", "हथाईखेड़ा"),
              "shahpura": bi("Shahpura", "शाहपुरा")}


@lru_cache(maxsize=1)
def history_stats() -> dict[str, dict[str, tuple[float, float]]]:
    """Per ghat mean/sd of 2023-25 readings, for the anomaly z-score."""
    df = load_bhopal()
    df = df[df["is_numeric"]]
    m = {"Dissolved oxygen": "DO", "BOD": "BOD", "pH": "pH", "Turbidity": "turbidity", "Conductivity": "conductivity"}
    out: dict[str, dict] = {}
    for s in SITES:
        out[s.slug] = {}
        for p, k in m.items():
            v = df[(df.slug == s.slug) & (df.parameter == p)]["value"].to_numpy(float)
            if len(v) >= 3 and v.std() > 0:
                out[s.slug][k] = (float(v.mean()), float(v.std()))
    return out


class GhatProc:
    def __init__(self, slug: str):
        self.slug = slug
        self.buf: dict[str, deque] = {p: deque(maxlen=BUF_LEN) for p in VALUE_KEYS}
        self.breach: dict[str, bool | None] = {"DO": None, "BOD": None, "pH": None}


class Processor:
    def __init__(self, slugs: list[str]):
        self.g = {s: GhatProc(s) for s in slugs}
        self.readings_total = 0
        self.rejected_total = 0
        self.pending: dict[str, dict[str, list]] = {s: {k: [] for k in SERIES_KEYS} for s in slugs}

    # ------------------------------------------------------------ ingest
    def ingest(self, slug: str, param: str, t: int, v: float) -> bool:
        lo, hi = PLAUSIBLE.get(param, (-1e9, 1e9))
        if v is None or not np.isfinite(v) or v < lo or v > hi:
            self.rejected_total += 1
            return False
        self.readings_total += 1
        self.g[slug].buf[param].append((int(t), float(v)))
        if param in SERIES_KEYS:
            self.pending[slug][param].append([int(t), round(float(v), 3)])
        return True

    def drain_points(self) -> dict:
        out = self.pending
        self.pending = {s: {k: [] for k in SERIES_KEYS} for s in self.g}
        return out

    # ------------------------------------------------------------ derived
    @staticmethod
    def _window(buf: deque, now: int) -> dict | None:
        pts = [(t, v) for t, v in buf if t > now - 60 * MIN_MS]
        if not pts:
            return None
        t = np.array([p[0] for p in pts], float)
        v = np.array([p[1] for p in pts], float)
        m5, m30 = v[t > now - 5 * MIN_MS], v[t > now - 30 * MIN_MS]
        if len(m5) == 0:
            m5 = v[-1:]  # dropout gap: fall back to the latest reading within the hour
        slope = None
        if len(m30) >= 10:  # at least 10 min of data before a trend is reported
            tt = (t[t > now - 30 * MIN_MS] - now) / 3_600_000.0
            slope = float(np.polyfit(tt, m30, 1)[0])
        return {"mean_5": round(float(m5.mean()), 3), "mean_30": round(float(m30.mean()), 3),
                "slope_per_h": None if slope is None else round(slope, 3),
                "min_60": round(float(v.min()), 3), "max_60": round(float(v.max()), 3)}

    def series(self, slug: str, param: str, now: int, minutes: int) -> list:
        return [[t, round(v, 3)] for t, v in self.g[slug].buf[param] if t > now - minutes * MIN_MS]

    def derive(self, slug: str, now: int) -> dict:
        gp = self.g[slug]
        last = {p: (gp.buf[p][-1] if gp.buf[p] else None) for p in VALUE_KEYS}
        values = {p: (None if last[p] is None else round(last[p][1], 3)) for p in VALUE_KEYS}
        as_of = {p: (None if last[p] is None else last[p][0]) for p in VALUE_KEYS}
        last_seen = max((last[p][0] for p in CONTINUOUS if last[p]), default=None)
        if last[("DO")] is None:
            sensor = "none"
        elif now - last["DO"][0] > STALE_MIN * MIN_MS:
            sensor = "stale"
        else:
            sensor = "live"
        wdo = self._window(gp.buf["DO"], now) if sensor == "live" else None
        wtu = self._window(gp.buf["turbidity"], now) if sensor == "live" else None
        wph = self._window(gp.buf["pH"], now) if sensor == "live" else None
        bod = values["BOD"]

        # hysteresis
        b = gp.breach
        if wdo:
            if b["DO"] is None:
                b["DO"] = wdo["mean_5"] < 5
            elif not b["DO"] and wdo["mean_5"] < 5:
                b["DO"] = True
            elif b["DO"] and wdo["mean_30"] >= 5.5:
                b["DO"] = False
        if bod is not None:
            if not b["BOD"] and bod > 3:
                b["BOD"] = True
            elif b["BOD"] and bod <= 2.7:
                b["BOD"] = False
            elif b["BOD"] is None:
                b["BOD"] = bod > 3
        if wph:
            ph = wph["mean_5"]
            out = ph < 6.5 or ph > 8.5
            if b["pH"] is None or (not b["pH"] and out):
                b["pH"] = out
            elif b["pH"] and 6.6 <= ph <= 8.4:
                b["pH"] = False

        # ETA
        eta = {"do_5": None, "do_3": None, "do_0": None}
        if wdo:
            m, sl = wdo["mean_5"], wdo["slope_per_h"]
            for key, lim in (("do_5", 5.0), ("do_3", 3.0), ("do_0", 0.05)):
                if m <= lim:
                    eta[key] = 0
                elif sl is not None and sl <= ETA_MIN_SLOPE:
                    eta[key] = int(round((m - lim) / -sl * 60))

        # live score (renormalised over available parameters)
        cur = {"DO": wdo["mean_5"] if wdo else None, "BOD": bod, "pH": wph["mean_5"] if wph else None}
        avail = {k: v for k, v in cur.items() if v is not None}
        score = None
        if avail and sensor == "live":
            score = round(sum(W[k] * exceedance(SCORE_PARAM[k], v) for k, v in avail.items())
                          / sum(W[k] for k in avail), 3)
        partial = len(avail) < 3

        # tier
        note = bi("", "")
        if sensor != "live":
            tier = "no_data"
            note = (bi("No live sensor here. Send a test team.", "यहाँ लाइव सेंसर नहीं है। जाँच दल भेजें।")
                    if sensor == "none" else
                    bi("Sensor stale: no reading for over 10 minutes.", "सेंसर पुराना: 10 मिनट से अधिक से कोई रीडिंग नहीं।"))
        else:
            do = cur["DO"]
            if do < 2 or do <= 0.05:
                tier = "critical"
            elif do < 3 or (score or 0) >= 0.45:
                tier = "high"
            elif (score or 0) >= 0.25 or (bod is not None and bod > 6):
                tier = "medium"
            else:
                tier = "low"
            if bod is None:
                if tier == "low":
                    tier = "medium"
                    note = bi("DO within limit, BOD not yet measured", "घुलित ऑक्सीजन सीमा में, बीओडी अभी मापा नहीं गया")
                else:
                    note = bi("BOD awaiting lab (about 90 min)", "बीओडी लैब परिणाम की प्रतीक्षा (लगभग 90 मिनट)")

        # anomaly
        stats = history_stats().get(slug, {})
        anomaly = []
        for p in ("DO", "BOD", "pH", "turbidity", "conductivity"):
            val = (cur.get(p) if p in cur else values[p])
            if val is not None and p in stats and sensor != "none":
                mu, sd = stats[p]
                if abs((val - mu) / sd) >= 2:
                    anomaly.append(p)

        return {"sensor": sensor, "last_seen": last_seen, "live_tier": tier, "live_score": score,
                "partial": partial, "tier_note": note, "breach": dict(b), "values": values, "as_of": as_of,
                "windows": {"DO": wdo, "turbidity": wtu}, "eta": eta, "anomaly": anomaly}
