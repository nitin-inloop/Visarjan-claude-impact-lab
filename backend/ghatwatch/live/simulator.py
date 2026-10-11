"""Simulated ghat water quality for Ghat Watch Live (PLAN-LIVE.md v2 amendments C, D; §3).

Every number in this file is an assumption unless it says "observed". See docs/METHOD-LIVE.md.
The hidden truth (`GhatState`) never leaves this module except through `observe()` / lab samples,
which only fire for sensored ghats or while a test team is on site.
"""
from __future__ import annotations

import json
import math
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from functools import lru_cache

import numpy as np

from ..data import ARTIFACTS_DIR, SITES, load_bhopal
from .schema import bi

IST = timezone(timedelta(hours=5, minutes=30))
T_START = datetime(2026, 10, 20, 15, 0, tzinfo=IST)
T_START_MS = int(T_START.timestamp() * 1000)
HORIZON_MIN = 15 * 60
MIN_MS = 60_000
DT_DAY = 1.0 / 1440.0        # one 60-s sub-step, in days (rates are per day)
TEMP_C = 26.0                 # assumption: water temperature in October evenings
BOD_U_RATIO = 0.68            # BOD5 / ultimate BOD
K1_20 = 0.23                  # per day at 20 °C, theta 1.047
K_SETTLE = 2.0                # per day, suspended solids settling
TSS_PER_IDOL_G = 500.0        # g of fine solids that stay suspended per idol (assumption)
IOD_PER_IDOL_G = 60.0         # g O2 immediate oxygen demand per idol (nirmalya, disturbed sediment; assumption)
K_IOD = 4.0                   # per day, decay of the immediate-demand pool
TURB_PER_TSS = 0.8            # NTU per mg/l TSS
AERATOR_K2 = 3.0              # per day per aerator set, max 2 sets effective
LAB_EVERY_MIN, LAB_LAG_MIN = 60, 30
TEST_TEAM_WINDOW_MIN = 120
CREW_WINDOW_MIN, CREW_LOAD_FACTOR, CREW_TSS_FACTOR = 120, 0.5, 0.6
DIVERSION_SHARE = 0.7
PLAUSIBLE = {"DO": (0, 20), "pH": (0, 14), "BOD": (0, 500), "COD": (0, 2000), "turbidity": (0, 2000),
             "conductivity": (0, 10_000), "TSS": (0, 5000), "temp": (0, 45)}
NOISE = {"DO": ("abs", 0.15), "pH": ("abs", 0.05), "turbidity": ("rel", 0.05),
         "conductivity": ("rel", 0.02), "temp": ("abs", 0.1)}
DROPOUT = 0.01
GLITCH = 0.001                # rare implausible reading, to exercise validation

# Water-body types: effective mixing volume V (m³), depth (m), reaeration k2 (/day), SOD (g/m²/day),
# and the default leachable BOD per idol L_idol (g). All assumptions; L_idol may be fitted (§D).
TYPES = {
    "kund":          {"V": 3_000,  "depth": 2.0, "k2": 0.5, "SOD": 2.0, "L_idol": 8.0},
    "lake_ghat":     {"V": 30_000, "depth": 3.0, "k2": 1.5, "SOD": 1.0, "L_idol": 4.0},
    "dam":           {"V": 40_000, "depth": 4.0, "k2": 2.0, "SOD": 1.0, "L_idol": 3.0},
    "shahpura_lake": {"V": 25_000, "depth": 2.5, "k2": 1.0, "SOD": 1.5, "L_idol": 5.0},
}
GHAT_TYPE = {"bairagarh": "kund", "malikhedi": "kund", "prempura": "lake_ghat", "khatlapura": "lake_ghat",
             "rani-kamlapati": "lake_ghat", "hathaikheda": "dam", "shahpura": "shahpura_lake"}
SENSORED = ("shahpura", "rani-kamlapati", "khatlapura", "prempura", "hathaikheda")
UNSENSORED = ("bairagarh", "malikhedi")
KUNDS = ("bairagarh", "malikhedi")

# §6 approximate coordinates (orientation only)
COORDS = {"bairagarh": (23.271, 77.337), "prempura": (23.236, 77.360), "rani-kamlapati": (23.254, 77.395),
          "khatlapura": (23.258, 77.408), "hathaikheda": (23.268, 77.487), "shahpura": (23.198, 77.439),
          "malikhedi": (23.186, 77.497), "depot": (23.252, 77.402)}

SHARES_BAN = {"hathaikheda": 0.30, "shahpura": 0.20, "bairagarh": 0.20, "malikhedi": 0.15,
              "prempura": 0.05, "khatlapura": 0.05, "rani-kamlapati": 0.05}
SHARES_NO_BAN = {"hathaikheda": 0.20, "shahpura": 0.15, "bairagarh": 0.10, "malikhedi": 0.10,
                 "prempura": 0.15, "khatlapura": 0.15, "rani-kamlapati": 0.15}
_BASE = {"idols_total": 12_000, "shares": SHARES_BAN, "pop_share": 0.4, "rain": None, "preposition": []}
SCENARIOS = {
    "ban_enforced": {"label": bi("NGT lake ban enforced (default)", "एनजीटी झील प्रतिबंध लागू (डिफ़ॉल्ट)"),
                     "params": dict(_BASE)},
    "ban_not_enforced": {"label": bi("Ban not enforced (2025-like shares)", "प्रतिबंध लागू नहीं (2025 जैसा बँटवारा)"),
                         "params": dict(_BASE, shares=SHARES_NO_BAN)},
    "aerators_prepositioned": {"label": bi("Aerators pre-positioned at Shahpura and Rani Kamlapati",
                                           "शाहपुरा और रानी कमलापति पर एरेटर पहले से तैनात"),
                               "params": dict(_BASE, preposition=[["aerator", "shahpura"],
                                                                  ["aerator", "rani-kamlapati"]])},
    "heavy_rain": {"label": bi("Heavy rain 18:00-21:00", "भारी वर्षा 18:00-21:00"),
                   "params": dict(_BASE, rain={"from_min": 180, "to_min": 360, "dilution_per_h": 0.10,
                                               "tss_per_h": 10.0, "k2_add": 0.5})},
}


def do_sat(t_c: float = TEMP_C) -> float:
    """APHA freshwater DO saturation (mg/l), about 8.0 at 26 °C."""
    return 14.652 - 0.41022 * t_c + 0.007991 * t_c ** 2 - 0.000077774 * t_c ** 3


def k1(t_c: float = TEMP_C) -> float:
    return K1_20 * 1.047 ** (t_c - 20)


def haversine_km(a: str, b: str) -> float:
    (la1, lo1), (la2, lo2) = COORDS[a], COORDS[b]
    p1, p2 = math.radians(la1), math.radians(la2)
    dp, dl = p2 - p1, math.radians(lo2 - lo1)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * 6371.0 * math.asin(math.sqrt(h))


def travel_min(a: str, b: str) -> float:
    """25 km/h straight line + 10 min setup (0 when already there)."""
    if a == b:
        return 0.0
    return round(haversine_km(a, b) / 25.0 * 60 + 10, 1)


def profile(minute: float) -> float:
    """Relative idol arrival intensity at sim minute since 15:00 (peak 17:00-23:00)."""
    h = (15 + minute / 60.0) % 24
    if 17 <= h < 23:
        return 3.0
    if 15 <= h < 17:
        return 0.5
    if h >= 23 or h < 2:
        return 1.0
    if 2 <= h < 6:
        return 0.2
    return 0.3


PROFILE_NORM = sum(profile(m) for m in range(HORIZON_MIN))


@lru_cache(maxsize=1)
def initial_conditions() -> dict[str, dict]:
    """Observed starting values per ghat (Durga 2025 pre; Bairagarh/Malikhedi Ganesh 2025 during)."""
    df = load_bhopal()
    df = df[df["is_numeric"]]
    short = {"Dissolved oxygen": "DO", "BOD": "BOD", "COD": "COD", "pH": "pH", "Turbidity": "turbidity",
             "Conductivity": "conductivity", "Suspended solids": "TSS"}
    out = {}
    for s in SITES:
        d = df[df["slug"] == s.slug]
        if s.slug in UNSENSORED:
            sel = d[(d.year == 2025) & (d.festival == "Ganesh") & (d.phase == "during")]
            src = bi("assumed from Ganesh 2025 during, MPPCB 2025 p. 28",
                     "गणेश 2025 विसर्जन के दौरान के मान से अनुमानित, MPPCB 2025 पृ. 28")
        else:
            sel = d[(d.year == 2025) & (d.festival == "Durga") & (d.phase == "pre")]
            page = int(sel["source_page"].iloc[0])
            src = bi(f"Durga 2025 pre, MPPCB 2025 p. {page}", f"दुर्गा 2025 विसर्जन से पहले, MPPCB 2025 पृ. {page}")
        v = {short[r.parameter]: float(r.value) for r in sel.itertuples() if r.parameter in short}
        if "TSS" not in v:  # Durga 2025 tables print no suspended solids: latest Ganesh 2025 value
            ss = d[(d.parameter == "Suspended solids") & (d.year == 2025)]
            v["TSS"] = float(ss["value"].iloc[-1]) if len(ss) else v.get("turbidity", 10.0) / TURB_PER_TSS
        all_do = d[d.parameter == "Dissolved oxygen"]["value"]
        v["observed_max_do"] = float(all_do.max()) if len(all_do) else do_sat()
        v["source"] = src
        out[s.slug] = v
    _prefer_accepted_2026(out, short)
    return out


def _prefer_accepted_2026(out: dict[str, dict], short: dict[str, str]) -> None:
    """PLAN-INTAKE §2 live hook: an officer-accepted 2026 pre-immersion row per ghat overrides the start value
    (applies on the next reset); `initial_source` names the upload. Never breaks the simulator."""
    try:
        from ..data import load_user_readings
        u = load_user_readings()
        if u.empty:
            return
        u = u[(u["year"] == 2026) & (u["phase"] == "pre") & u["is_numeric"] & u["slug"].notna()]
        for slug, g in u.groupby("slug"):
            if slug not in out:
                continue
            fest = "Durga" if (g["festival"] == "Durga").any() else "Ganesh"
            g = g[g["festival"] == fest]
            vals = {short[r.parameter]: float(r.value) for r in g.itertuples() if r.parameter in short}
            if not vals:
                continue
            out[slug].update(vals)
            jid, f = str(g["job_id"].iloc[-1]), str(g["source_file"].iloc[-1])
            out[slug]["source"] = bi(f"officer-added {fest} 2026 pre ({f}), not yet verified by MPPCB",
                                     f"अधिकारी द्वारा जोड़ा गया {fest} 2026 विसर्जन-पूर्व ({f}), MPPCB द्वारा अभी सत्यापित नहीं")
            out[slug]["initial_source"] = {"upload": jid, "file_name": f, "parameters": sorted(vals)}
    except Exception:
        return


def fitted_L_idol() -> tuple[dict[str, float], str]:
    p = ARTIFACTS_DIR / "live" / "calibration.json"
    base = {k: v["L_idol"] for k, v in TYPES.items()}
    if p.exists():
        try:
            cal = json.loads(p.read_text(encoding="utf-8"))
            base.update({k: float(v) for k, v in cal.get("L_idol", {}).items()})
            return base, "fitted (calibration-lite)"
        except Exception:
            pass
    return base, "uncalibrated default"


@dataclass
class GhatState:
    slug: str
    typ: str
    V: float
    depth: float
    k2: float
    SOD: float
    L_idol: float
    DO: float
    BOD: float
    DO0: float
    BOD0: float
    B_DO: float
    B_BOD: float
    do_max: float
    pH0: float
    cond0: float
    turb0: float
    tss0: float
    cod_ratio: float
    tss_x: float = 0.0
    iod: float = 0.0
    settled: float = 0.0
    cond_x: float = 0.0
    cond_pending: float = 0.0
    aerators: int = 0
    crew_until: int = -1
    diversion: bool = False
    observed_until: int = -1
    idols_total: int = 0
    arrivals: list = field(default_factory=list)  # (minute, n)


class Simulator:
    def __init__(self, scenario: str = "ban_enforced", seed: int = 42, stochastic: bool = True,
                 L_idol: dict[str, float] | None = None, sensors: bool = True,
                 params_override: dict | None = None):
        if scenario not in SCENARIOS:
            raise ValueError(f"unknown scenario {scenario}")
        self.scenario = scenario
        self.params = dict(SCENARIOS[scenario]["params"], **(params_override or {}))
        self.rng = np.random.default_rng(seed)
        self.stochastic = stochastic
        self.sensors = sensors
        Ls, self.L_label = fitted_L_idol()
        if L_idol:
            Ls.update(L_idol)
            self.L_label = "override"
        self.L_idol = Ls
        self.minute = 0
        self.lab_queue: list[tuple[int, str, int, dict]] = []  # (due_minute, slug, sample_minute, values)
        self.g: dict[str, GhatState] = {}
        ic = initial_conditions()
        sat, kk1 = do_sat(), k1()
        for slug, typ in GHAT_TYPE.items():
            p, v = TYPES[typ], ic[slug]
            DO0, BOD0 = v["DO"], v["BOD"]
            # steady state: dDO/dt = 0 and dBOD/dt = 0 at the starting values with zero arrivals
            B_DO = -(p["k2"] * (sat - DO0) - kk1 * BOD0 / BOD_U_RATIO - p["SOD"] / p["depth"])
            B_BOD = kk1 * BOD0
            self.g[slug] = GhatState(
                slug=slug, typ=typ, V=p["V"], depth=p["depth"], k2=p["k2"], SOD=p["SOD"], L_idol=Ls[typ],
                DO=DO0, BOD=BOD0, DO0=DO0, BOD0=BOD0, B_DO=B_DO, B_BOD=B_BOD,
                do_max=max(1.6 * sat, v["observed_max_do"]), pH0=v.get("pH", 7.5),
                cond0=v.get("conductivity", 400.0), turb0=v.get("turbidity", 10.0), tss0=v["TSS"],
                cod_ratio=(v["COD"] / BOD0) if v.get("COD") and BOD0 else 5.0)

    # ---------------------------------------------------------------- time
    @property
    def t_ms(self) -> int:
        return T_START_MS + self.minute * MIN_MS

    def done(self) -> bool:
        return self.minute >= HORIZON_MIN

    # ---------------------------------------------------------------- interventions
    def apply(self, slug: str, kind: str) -> None:
        g = self.g[slug]
        if kind == "aerator":
            g.aerators += 1
        elif kind == "crew":
            g.crew_until = self.minute + CREW_WINDOW_MIN
            g.tss_x *= CREW_TSS_FACTOR
        elif kind == "test_team":
            g.observed_until = self.minute + TEST_TEAM_WINDOW_MIN
            self._lab_sample(slug)
        elif kind == "diversion":
            g.diversion = True

    def remove(self, slug: str, kind: str) -> None:
        g = self.g[slug]
        if kind == "aerator":
            g.aerators = max(0, g.aerators - 1)
        elif kind == "diversion":
            g.diversion = False

    def is_observed(self, slug: str) -> bool:
        return self.sensors and (slug in SENSORED or self.minute < self.g[slug].observed_until)

    def nearest_kund(self, slug: str) -> str:
        return min(KUNDS, key=lambda k: haversine_km(slug, k))

    # ---------------------------------------------------------------- arrivals
    def expected_arrivals(self, minute: int) -> dict[str, float]:
        p = self.params
        base = p["idols_total"] * profile(minute) / PROFILE_NORM
        lam = {s: base * p["shares"].get(s, 0.0) for s in self.g}
        for s, g in self.g.items():
            if g.diversion and lam[s] > 0:
                moved = lam[s] * DIVERSION_SHARE
                lam[s] -= moved
                lam[self.nearest_kund(s)] += moved
        return lam

    # ---------------------------------------------------------------- dynamics
    def step(self, arrivals: bool = True, inflow: dict[str, float] | None = None) -> list[tuple[str, str, int, float]]:
        """Advance one 60-s sub-step. Returns readings (slug, param, t_ms, value) produced this minute.

        `inflow` overrides the idol arrivals per ghat for this minute (tests)."""
        sat, kk1 = do_sat(), k1()
        if inflow is not None:
            lam = {s: inflow.get(s, 0.0) for s in self.g}
        else:
            lam = self.expected_arrivals(self.minute) if arrivals else {s: 0.0 for s in self.g}
        rain = self.params.get("rain")
        raining = bool(rain) and rain["from_min"] <= self.minute < rain["to_min"]
        pop = self.params.get("pop_share", 0.4)
        for s, g in self.g.items():
            n = float(self.rng.poisson(lam[s])) if (self.stochastic and inflow is None) else lam[s]
            if n > 0:
                g.idols_total += int(n)
                g.arrivals.append((self.minute, n))
                load = CREW_LOAD_FACTOR if self.minute < g.crew_until else 1.0
                g.BOD += n * g.L_idol * load / g.V
                g.tss_x += n * TSS_PER_IDOL_G / g.V
                g.iod += n * IOD_PER_IDOL_G * load / g.V
                g.cond_pending += 0.4 * pop * n / (g.V / 1000.0)
            k2 = g.k2 + AERATOR_K2 * min(g.aerators, 2) + (rain["k2_add"] if raining else 0.0)
            sod = g.SOD + min(0.1 * g.settled / 100.0, 1.0)
            iod_use = K_IOD * g.iod
            g.iod -= iod_use * DT_DAY
            dDO = k2 * (sat - g.DO) - kk1 * g.BOD / BOD_U_RATIO - sod / g.depth - iod_use + g.B_DO
            dBOD = -kk1 * g.BOD + g.B_BOD
            g.DO = float(np.clip(g.DO + dDO * DT_DAY, 0.0, g.do_max))
            g.BOD = max(0.0, g.BOD + dBOD * DT_DAY)
            settle = K_SETTLE * g.tss_x * DT_DAY
            g.tss_x -= settle
            g.settled += settle
            dissolve = g.cond_pending * DT_DAY * 4.0  # ~6 h time constant
            g.cond_pending -= dissolve
            g.cond_x += dissolve
            if raining:
                f = rain["dilution_per_h"] / 60.0
                if g.BOD > g.BOD0:
                    g.BOD -= (g.BOD - g.BOD0) * f
                g.tss_x = g.tss_x * (1 - f) + rain["tss_per_h"] / 60.0
                g.cond_x *= (1 - f)
        self.minute += 1
        return self._emit()

    # ---------------------------------------------------------------- sensors
    def truth(self, slug: str) -> dict:
        """Hidden truth. Tests and calibration only; never sent to clients."""
        g = self.g[slug]
        return {"DO": g.DO, "BOD": g.BOD, "COD": g.BOD * g.cod_ratio, "pH": g.pH0,
                "turbidity": g.turb0 + TURB_PER_TSS * g.tss_x, "conductivity": g.cond0 + g.cond_x,
                "TSS": g.tss0 + g.tss_x, "temp": TEMP_C}

    def _noisy(self, param: str, v: float) -> float:
        kind, sd = NOISE[param]
        return v + self.rng.normal(0, sd) if kind == "abs" else v * (1 + self.rng.normal(0, sd))

    def observe(self, slug: str, t_ms: int) -> list[tuple[str, str, int, float]]:
        tr, out = self.truth(slug), []
        for p in ("DO", "pH", "turbidity", "conductivity", "temp"):
            if self.rng.random() < DROPOUT:
                continue
            v = self._noisy(p, tr[p])
            if p in ("DO", "turbidity", "conductivity"):
                v = max(0.0, v)
            if self.rng.random() < GLITCH:
                v = PLAUSIBLE[p][1] * 1.5  # implausible spike
            out.append((slug, p, t_ms, round(float(v), 3)))
        return out

    def _lab_sample(self, slug: str) -> None:
        tr = self.truth(slug)
        vals = {p: round(float(tr[p] * (1 + self.rng.normal(0, 0.10))), 2) for p in ("BOD", "COD", "TSS")}
        self.lab_queue.append((self.minute + LAB_LAG_MIN, slug, self.minute, vals))

    def _emit(self) -> list[tuple[str, str, int, float]]:
        if not self.sensors:
            return []
        out = []
        for s in self.g:
            if self.is_observed(s):
                out += self.observe(s, self.t_ms)
                if s in SENSORED and self.minute % LAB_EVERY_MIN == 0:
                    self._lab_sample(s)
        due = [q for q in self.lab_queue if q[0] <= self.minute]
        self.lab_queue = [q for q in self.lab_queue if q[0] > self.minute]
        for _, s, m, vals in due:
            for p, v in vals.items():
                out.append((s, p, T_START_MS + m * MIN_MS, v))
        return out

    def warmup(self, minutes: int = 30) -> list[tuple[str, str, int, float]]:
        """Pre-start readings for sensored ghats (steady state, noise only), t < t_start."""
        out = []
        if not self.sensors:
            return out
        for i in range(minutes, 0, -1):
            for s in SENSORED:
                out += self.observe(s, T_START_MS - i * MIN_MS)
        return out
