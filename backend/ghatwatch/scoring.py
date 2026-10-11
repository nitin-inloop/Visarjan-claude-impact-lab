"""Deterministic ghat risk score, tiers, reasons, gaps and actions (PLAN.md §3.2-3.6).

Only numeric DO / BOD / pH readings enter the score. Blank, BDL, `*`, `**`, `_`
and `not sampled` never enter any sum and are reported as gaps instead.
"""
from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pandas as pd

from . import text as T
from .data import (FESTIVALS, METALS, PHASES, SCORED_PARAMS, SITE_BY_SLUG, SITES, YEARS,
                   load_bhopal, star_phases)
from .limits import class_limits

STANDARD = "CPCB class B (outdoor bathing)"
W_PARAM = {"Dissolved oxygen": 0.45, "BOD": 0.40, "pH": 0.15}
W_YEAR = {2023: 0.5, 2024: 0.75, 2025: 1.0, 2026: 1.0}
W_PHASE = {"pre": 0.5, "during": 1.0, "after": 1.0}
SHORT = {"Dissolved oxygen": "DO", "BOD": "BOD", "pH": "pH"}
EXPECTED_READINGS = len(SCORED_PARAMS) * len(PHASES) * len(YEARS) * len(FESTIVALS)  # 54
TIER_HIGH, TIER_MEDIUM = 0.45, 0.25
# Persistent-BOD floor (§3.4 rule 3b): a ghat whose recent BOD readings breach the bathing limit in
# at least two-thirds of cases, with a median of twice the limit or more, is at least Medium.
BOD_PERSIST_YEARS_FROM = 2024
BOD_PERSIST_MIN_N = 6
BOD_PERSIST_FRAC = 2 / 3
BOD_PERSIST_MEDIAN = 6.0
TREND_STEP = 0.15
METAL_SPIKE_MG_L = 1.5  # screening trigger for "sample metals"; no CPCB bathing limit exists
CONTEXT_PARAMS = ["COD", "Turbidity", "Total solids", "Suspended solids", "Conductivity", *METALS]
CLEAN_CONTEXT = {"COD", "Turbidity", "Total solids", "Suspended solids"}
TIER_ORDER = {"insufficient_data": 0, "high": 1, "medium": 2, "low": 3}
# Physically plausible ranges; anything outside is a typo / unit slip and is never scored.
PLAUSIBLE = {"Dissolved oxygen": (0.0, 20.0), "BOD": (0.0, 500.0), "pH": (0.0, 14.0)}
PHASE_WORD = {"pre": "before", "during": "during", "after": "after"}


class ImplausibleReading(ValueError):
    """A reading outside PLAUSIBLE (or negative); the API turns it into a 422."""


def implausible(param: str, v: float | None) -> str | None:
    """Reason text when `v` cannot be a real reading of `param`, else None."""
    if v is None:
        return None
    name = SHORT.get(param, param)
    if v != v or v in (float("inf"), float("-inf")):
        return f"{name} {v} is not a number."
    if v < 0:
        return f"{name} {v:g} is negative, which is impossible."
    lo, hi = PLAUSIBLE.get(param, (0.0, float("inf")))
    if not lo <= v <= hi:
        return f"{name} {v:g} is outside the plausible range {lo:g}-{hi:g}; check for a typo or unit slip."
    return None


def weights_block() -> dict:
    return {"param": {SHORT[k]: v for k, v in W_PARAM.items()},
            "year": {str(k): v for k, v in W_YEAR.items() if k <= 2025},
            "phase": W_PHASE}


def exceedance(param: str, v: float) -> float:
    """Reading-level exceedance in [0, 1] (§3.2)."""
    if param == "Dissolved oxygen":
        e = (5.0 - v) / 5.0
    elif param == "BOD":
        e = (v - 3.0) / 9.0
    elif param == "pH":
        e = max(6.5 - v, v - 8.5, 0.0)
    else:
        return 0.0
    return float(np.clip(e, 0.0, 1.0))


def is_breach(param: str, v: float) -> bool:
    return class_limits("B")[param].breached(v)


@dataclass
class Reading:
    """One numeric DO/BOD/pH reading that enters the score."""
    year: int
    festival: str
    phase: str
    parameter: str
    value: float
    unit: str | None
    page: int | None
    entered: bool = False  # officer-entered (what-if), not from a report
    upload: str | None = None  # intake job id when the reading came from an accepted upload / manual intake
    source_file: str | None = None  # uploaded file name (or "manual entry")

    @property
    def weight(self) -> float:
        return W_PARAM[self.parameter] * W_YEAR.get(self.year, 1.0) * W_PHASE[self.phase]

    @property
    def exceed(self) -> float:
        return exceedance(self.parameter, self.value)

    @property
    def contribution(self) -> float:
        return self.weight * self.exceed

    @property
    def breach(self) -> bool:
        return is_breach(self.parameter, self.value)


def scored_readings(g: pd.DataFrame) -> list[Reading]:
    rows = g[g["parameter"].isin(SCORED_PARAMS) & g["is_numeric"]]
    return [Reading(int(r.year), r.festival, r.phase, r.parameter, float(r.value),
                    r.unit_assumed, int(r.source_page)) for r in rows.itertuples()]


@dataclass
class ScoreResult:
    score: float | None
    breach_rate: float | None
    n: int
    do_share: float
    readings: list[Reading] = field(default_factory=list)


def compute_score(readings: list[Reading]) -> ScoreResult:
    """§3.3 weighted mean exceedance and breach rate over available readings."""
    if not readings:
        return ScoreResult(None, None, 0, 0.0, [])
    wsum = sum(r.weight for r in readings)
    csum = sum(r.contribution for r in readings)
    do_c = sum(r.contribution for r in readings if r.parameter == "Dissolved oxygen")
    score = csum / wsum if wsum else 0.0
    br = sum(r.breach for r in readings) / len(readings)
    return ScoreResult(round(score, 4), round(br, 4), len(readings),
                       (do_c / csum) if csum > 0 else 0.0, readings)


def trend(readings: list[Reading]) -> tuple[str, dict]:
    """breach_rate(latest year) - breach_rate(earliest year), §3.3."""
    by_year: dict[int, list[bool]] = {}
    for r in readings:
        if r.year <= 2025:
            by_year.setdefault(r.year, []).append(r.breach)
    rates = {y: sum(v) / len(v) for y, v in sorted(by_year.items())}
    if len(rates) < 2:
        return "stable", {str(y): round(v, 3) for y, v in rates.items()}
    ys = sorted(rates)
    d = rates[ys[-1]] - rates[ys[0]]
    label = "worsening" if d >= TREND_STEP else "improving" if d <= -TREND_STEP else "stable"
    return label, {str(y): round(v, 3) for y, v in rates.items()}


# ---------------------------------------------------------------- gaps

def _table_pages(df: pd.DataFrame, year: int, festival: str) -> list[int]:
    sub = df[(df["year"] == year) & (df["festival"] == festival)]
    return sorted(int(p) for p in sub["source_page"].unique())


def detect_gaps(df: pd.DataFrame, slug: str) -> list[dict]:
    """All data gaps for one ghat: missing tables, `*`/`**` phases, not-sampled and absent parameters."""
    g = df[df["slug"] == slug]
    all_params = list(dict.fromkeys(df["parameter"]))
    stars = {k for k in star_phases(df) if k[0] == slug}
    gaps: list[dict] = []
    for year in YEARS:
        for fest in FESTIVALS:
            t = g[(g["year"] == year) & (g["festival"] == fest)]
            pages = _table_pages(df, year, fest)
            if t.empty:
                pr = f"{pages[0]}–{pages[-1]}" if pages else ""
                gaps.append({
                    "kind": "missing_table", "year": year, "festival": fest, "phase": None,
                    "parameters": all_params,
                    "source": T.source(year, pages[0] if pages else None),
                    "text": {"en": f"No {fest} {year} test exists for this ghat: the MPPCB {year} report has no table for it (other Bhopal ghats are on pages {pr}).",
                             "hi": f"इस घाट की {T.FEST_HI[fest]} {year} की कोई जांच नहीं है: MPPCB {year} रिपोर्ट में इसकी तालिका नहीं है (भोपाल के अन्य घाट पृष्ठ {pr} पर हैं)।"},
                })
                continue
            page = int(t["source_page"].iloc[0])
            for ph in PHASES:
                if (slug, year, fest, ph) in stars:
                    gaps.append({
                        "kind": "phase_not_sampled", "year": year, "festival": fest, "phase": ph,
                        "parameters": all_params, "source": T.source(year, page),
                        "text": {"en": f"Not sampled {T.PHASE_EN[ph]} in {fest} {year} (report prints '*' / '**'). Page {page}.",
                                 "hi": f"{T.FEST_HI[fest]} {year} में {T.PHASE_HI[ph]} नमूना नहीं लिया गया (रिपोर्ट में '*' / '**')। पृष्ठ {page}।"},
                    })
                    continue
                miss = t[(t["phase"] == ph) & t["flag"].isin(["not sampled", "_"])]
                if not miss.empty:
                    ps = list(miss["parameter"])
                    gaps.append({
                        "kind": "parameter_not_sampled", "year": year, "festival": fest, "phase": ph,
                        "parameters": ps, "source": T.source(year, page),
                        "text": {"en": f"{T.params_en(ps)} not sampled {T.PHASE_EN[ph]} in {fest} {year} (blank or '_' in the report). Page {page}.",
                                 "hi": f"{T.FEST_HI[fest]} {year} में {T.PHASE_HI[ph]} {T.params_hi(ps)} की जांच नहीं हुई (रिपोर्ट में खाली या '_')। पृष्ठ {page}।"},
                    })
            absent = [p for p in all_params if p not in set(t["parameter"])]
            if absent:
                gaps.append({
                    "kind": "parameter_absent", "year": year, "festival": fest, "phase": None,
                    "parameters": absent, "source": T.source(year, page),
                    "text": {"en": f"{T.params_en(absent)} not in the {fest} {year} table at all (not tested that year at any Bhopal ghat). Page {page}.",
                             "hi": f"{T.FEST_HI[fest]} {year} की तालिका में {T.params_hi(absent)} शामिल ही नहीं है (उस वर्ष किसी भी भोपाल घाट पर जांच नहीं)। पृष्ठ {page}।"},
                })
    return gaps


def coverage_by_table(df: pd.DataFrame, slug: str) -> dict[str, float]:
    g = df[(df["slug"] == slug) & df["parameter"].isin(SCORED_PARAMS) & df["is_numeric"]]
    out = {}
    for year in YEARS:
        for fest in FESTIVALS:
            n = int(((g["year"] == year) & (g["festival"] == fest)).sum())
            out[f"{fest} {year}"] = round(n / (len(SCORED_PARAMS) * len(PHASES)), 3)
    return out


# ---------------------------------------------------------------- tiers

def worst_recent(readings: list[Reading]) -> Reading | None:
    """The most exceeding reading of the latest year present (DO first on ties)."""
    if not readings:
        return None
    y = max(r.year for r in readings)
    latest = [r for r in readings if r.year == y]
    return max(latest, key=lambda r: (r.exceed, r.parameter == "Dissolved oxygen", r.festival == "Durga",
                                      {"pre": 0, "during": 2, "after": 1}[r.phase]))


def last_test_text(r: Reading | None) -> dict:
    if r is None:
        return {"en": "No DO, BOD or pH reading exists yet.", "hi": "अभी तक कोई DO, बीओडी या pH रीडिंग नहीं है।"}
    unit = f" {r.unit}" if r.unit else ""
    if r.upload:
        f = r.source_file or "officer upload"
        src_en = f"officer-added, {f}" + (f" p. {r.page}" if r.page is not None else "")
        src_hi = f"अधिकारी द्वारा जोड़ा गया, {f}" + (f" पृ. {r.page}" if r.page is not None else "")
    elif r.entered:
        src_en, src_hi = "officer-entered", "अधिकारी द्वारा दर्ज"
    else:
        src_en = f"{r.year} report p. {r.page}"
        src_hi = f"{r.year} रिपोर्ट पृ. {r.page}"
    name = SHORT[r.parameter]
    return {"en": f"Last test: {name} {T.fmt(r.value)}{unit} {PHASE_WORD[r.phase]} {r.festival} {r.year} ({src_en}).",
            "hi": f"अंतिम जांच: {T.FEST_HI[r.festival]} {r.year} {T.PHASE_HI[r.phase]} {name} {T.fmt(r.value)}{unit} ({src_hi})।"}


def test_first_rule(why_en: str, why_hi: str, readings: list[Reading]) -> dict:
    last = last_test_text(worst_recent(readings))
    return {"en": f"Test first: {why_en}. {last['en']}", "hi": f"पहले जांच करें: {why_hi}। {last['hi']}"}


def decide_tier(score: float | None, coverage: float, has_durga_latest: bool,
                readings: list[Reading], has_2026: bool = False, new_site: bool = False) -> tuple[str, dict]:
    """§3.4 tiers, applied in order; returns (tier, rule text en/hi).

    `has_2026` means 2026 Durga data with at least DO and BOD (pH alone does not clear the rule).
    A new site needs at least one DO and one BOD reading before it can be tiered."""
    s = 0.0 if score is None else score
    if new_site:
        have = {r.parameter for r in readings}
        if not {"Dissolved oxygen", "BOD"} <= have:
            return "insufficient_data", test_first_rule(
                "this new site has no DO and BOD readings yet", "इस नए स्थल की DO और बीओडी रीडिंग अभी नहीं है", readings)
    else:
        if coverage < 0.5:
            pct = round(coverage * 100)
            return "insufficient_data", test_first_rule(
                f"only {pct}% of the expected DO/BOD/pH readings exist, score is on partial data",
                f"अपेक्षित DO/BOD/pH रीडिंग में से केवल {pct}% उपलब्ध हैं, स्कोर आंशिक डेटा पर है", readings)
        if not has_durga_latest and not has_2026:
            return "insufficient_data", test_first_rule(
                "no Durga 2025 test", "दुर्गा 2025 की कोई जांच नहीं", readings)
    do = [r for r in readings if r.parameter == "Dissolved oxygen"]
    zero = [r for r in do if r.value == 0 and r.year >= 2024]
    low_new = [r for r in do if r.festival == "Durga" and r.year >= 2025 and r.value < 3]
    if zero and low_new and max(r.year for r in low_new) > max(r.year for r in zero):
        zero = []  # newer evidence (e.g. a 2026 Durga reading) leads the rule text; the tier is High either way
    if zero:
        r = max(zero, key=lambda x: (x.year, x.festival == "Durga"))
        return "high", {
            "en": f"High: dissolved oxygen was 0 mg/l {T.when_en(r.year, r.festival, r.phase)}.",
            "hi": f"उच्च: {T.when_hi(r.year, r.festival, r.phase)} घुलित ऑक्सीजन 0 mg/l थी।"}
    low = [r for r in do if r.festival == "Durga" and r.year >= 2025 and r.value < 3]
    if low:
        r = min(low, key=lambda x: x.value)
        return "high", {
            "en": f"High: dissolved oxygen fell below 3 mg/l in Durga {r.year} ({T.fmt(r.value)} mg/l {T.PHASE_EN[r.phase]}).",
            "hi": f"उच्च: दुर्गा {r.year} में घुलित ऑक्सीजन 3 mg/l से नीचे थी ({T.PHASE_HI[r.phase]} {T.fmt(r.value)} mg/l)।"}
    if s >= TIER_HIGH:
        return "high", {"en": f"High: risk score {s:.2f} is at or above {TIER_HIGH}.",
                        "hi": f"उच्च: जोखिम स्कोर {s:.2f} है, जो {TIER_HIGH} या उससे अधिक है।"}
    if s >= TIER_MEDIUM:
        return "medium", {"en": f"Medium: risk score {s:.2f} is between {TIER_MEDIUM} and {TIER_HIGH}.",
                          "hi": f"मध्यम: जोखिम स्कोर {s:.2f} है, जो {TIER_MEDIUM} और {TIER_HIGH} के बीच है।"}
    bod = [r.value for r in readings if r.parameter == "BOD" and r.year >= BOD_PERSIST_YEARS_FROM]
    if len(bod) >= BOD_PERSIST_MIN_N:
        n_over = sum(v > 3 for v in bod)
        med = float(np.median(bod))
        if n_over / len(bod) >= BOD_PERSIST_FRAC and med >= BOD_PERSIST_MEDIAN:
            span_en, span_hi = _bod_span(readings)
            return "medium", {
                "en": (f"Medium: BOD was above the bathing limit of 3 mg/l in {n_over} of {len(bod)} readings "
                       f"{span_en} (median {T.fmt(med)} mg/l, at least twice the limit), even though dissolved "
                       f"oxygen held up."),
                "hi": (f"मध्यम: {span_hi} बीओडी {len(bod)} में से {n_over} रीडिंग में स्नान मानक 3 mg/l से अधिक रहा "
                       f"(माध्यिका {T.fmt(med)} mg/l, मानक से कम से कम दोगुना), हालांकि घुलित ऑक्सीजन ठीक रही।")}
    if bod:
        n_over = sum(v > 3 for v in bod)
        med = float(np.median(bod))
        span_en, span_hi = _bod_span(readings)
        return "low", {
            "en": (f"Low: risk score {s:.2f} is below {TIER_MEDIUM}. BOD still exceeded 3 mg/l in {n_over} of {len(bod)} "
                   f"readings {span_en} (median {T.fmt(med)} mg/l). Lower risk than the other ghats, not clean."),
            "hi": (f"निम्न: जोखिम स्कोर {s:.2f} है, जो {TIER_MEDIUM} से कम है। फिर भी {span_hi} बीओडी {len(bod)} में से "
                   f"{n_over} रीडिंग में 3 mg/l से अधिक रहा (माध्यिका {T.fmt(med)} mg/l)। अन्य घाटों से कम जोखिम, पर स्वच्छ नहीं।")}
    return "low", {"en": f"Low: risk score {s:.2f} is below {TIER_MEDIUM}.",
                   "hi": f"निम्न: जोखिम स्कोर {s:.2f} है, जो {TIER_MEDIUM} से कम है।"}


def _bod_span(readings: list[Reading]) -> tuple[str, str]:
    """'since 2024' / 'in 2026' for the BOD readings counted by the tier rules."""
    ys = sorted({r.year for r in readings if r.parameter == "BOD" and r.year >= BOD_PERSIST_YEARS_FROM})
    if not ys:
        return "", ""
    if ys[0] == ys[-1]:
        return f"in {ys[0]}", f"{ys[0]} में"
    return f"since {ys[0]}", f"{ys[0]} से"


# ---------------------------------------------------------------- reasons

def _limit_text(param: str) -> str:
    return class_limits("B")[param].text


def upload_source(r: Reading) -> tuple[dict, dict]:
    """Source block + sentence for a reading from an accepted intake job (PLAN-INTAKE.md §2)."""
    f = r.source_file or "officer upload"
    pg_en = f" page {r.page}" if r.page is not None else ""
    pg_hi = f" पृष्ठ {r.page}" if r.page is not None else ""
    src = {"report": f"Officer-added: {f}", "pdf": None, "page": r.page, "upload": r.upload}
    txt = {"en": f"Source: officer-added from {f}{pg_en} (not yet verified by MPPCB).",
           "hi": f"स्रोत: अधिकारी द्वारा जोड़ा गया, {f}{pg_hi} (MPPCB द्वारा अभी सत्यापित नहीं)।"}
    return src, txt


def breach_reasons(readings: list[Reading], k: int = 3, per_param: int = 2) -> list[dict]:
    """Top-k breach contributions by w*exceed (at most `per_param` per parameter)."""
    cands = sorted([r for r in readings if r.breach and r.contribution > 0],
                   key=lambda r: (-r.contribution, -r.year, r.festival != "Durga"))
    out, used = [], {}
    # an officer-added (intake) breach is always surfaced: it is new evidence the officer must see cited
    ups = [r for r in cands if r.upload]
    if ups and not any(r.upload for r in cands[:k]):
        cands = [ups[0]] + [r for r in cands if r is not ups[0]]
    for r in cands:
        if used.get(r.parameter, 0) >= per_param:
            continue
        used[r.parameter] = used.get(r.parameter, 0) + 1
        if r.upload:
            src, src_txt = upload_source(r)
        else:
            src = (T.source(r.year, r.page) if not r.entered
                   else {"report": "Officer entry 2026", "pdf": None, "page": None})
            src_txt = None if not r.entered else {"en": "Source: officer-entered 2026 reading.",
                                                   "hi": "स्रोत: अधिकारी द्वारा दर्ज 2026 रीडिंग।"}
        out.append({
            "kind": "breach", "parameter": r.parameter, "value": r.value, "unit": r.unit,
            "limit": _limit_text(r.parameter), "year": r.year, "festival": r.festival, "phase": r.phase,
            "contribution": round(r.contribution, 4), "source": src,
            "text": T.breach_sentence(r.parameter, r.value, r.unit, r.year, r.festival, r.phase, r.page, src_txt),
        })
        if len(out) >= k:
            break
    return out


def context_candidates(df: pd.DataFrame) -> dict[str, list[dict]]:
    """Context flags per slug: 'highest of the 7 ghats' and metal spikes (no class B limit)."""
    num = df[df["parameter"].isin(CONTEXT_PARAMS) & df["is_numeric"]]
    out: dict[str, list[dict]] = {s.slug: [] for s in SITES}
    seen: set[tuple] = set()

    def add(r, why: str, strength: float) -> None:
        key = (r.slug, r.parameter, int(r.year), r.festival, r.phase)
        if key in seen:
            return
        seen.add(key)
        out[r.slug].append({
            "kind": "context", "parameter": r.parameter, "value": float(r.value), "unit": r.unit_assumed,
            "limit": "no CPCB bathing limit set", "year": int(r.year), "festival": r.festival,
            "phase": r.phase, "why": why, "strength": strength,
            "source": T.source(int(r.year), int(r.source_page)),
            "text": T.context_sentence(r.parameter, float(r.value), r.unit_assumed, int(r.year),
                                       r.festival, r.phase, int(r.source_page), why),
        })

    for param, sub in num.groupby("parameter"):
        med = float(sub["value"].median()) or 1e-9
        top = sub.loc[sub["value"].idxmax()]
        add(top, "highest", float(top["value"]) / med)
        if param in METALS:
            for r in sub[sub["value"] >= METAL_SPIKE_MG_L].itertuples():
                add(r, "spike", float(r.value) / med)
    for slug in out:
        out[slug].sort(key=lambda c: (c["why"] != "highest", -c["strength"]))
    return out


def gap_reason(gaps: list[dict]) -> dict | None:
    """One gap line, most decision-relevant first."""
    def prio(g: dict) -> tuple:
        kind_rank = {"missing_table": 0, "phase_not_sampled": 1, "parameter_not_sampled": 2}.get(g["kind"], 9)
        scored = any(p in SCORED_PARAMS for p in g["parameters"])
        return (kind_rank, not scored, -g["year"], g["festival"] != "Durga")
    cands = [g for g in gaps if g["kind"] != "parameter_absent"]
    if not cands:
        return None
    g = min(cands, key=prio)
    return {"kind": "gap", "parameter": None, "value": None, "unit": None, "limit": None,
            "year": g["year"], "festival": g["festival"], "phase": g["phase"],
            "parameters": g["parameters"], "source": g["source"], "text": g["text"]}


# ---------------------------------------------------------------- actions

def derive_actions(tier: str, sr: ScoreResult, context: list[dict], all_rows: pd.DataFrame,
                   ngt: bool) -> list[dict]:
    """§3.6 action chips."""
    codes: list[str] = []
    rd = sr.readings
    if tier == "insufficient_data":
        codes.append("test_first")
    if sr.do_share >= 0.5 or any(r.parameter == "Dissolved oxygen" and r.year >= 2024 and r.value < 3 for r in rd):
        codes.append("aerate")
    if (any(r.parameter == "BOD" and r.year >= 2024 and r.value > 6 for r in rd)
            or any(c["parameter"] in CLEAN_CONTEXT for c in context)):
        codes.append("clean")
    metals = all_rows[all_rows["parameter"].isin(METALS) & all_rows["is_numeric"]]
    if (metals["value"] >= METAL_SPIKE_MG_L).any():
        codes.append("sample_metals")
    if ngt:
        codes.append("lake_ban")
    return [{"code": c, "text": T.ACTIONS[c]} for c in codes]


# ---------------------------------------------------------------- readings / series for evidence view

def reading_rows(g: pd.DataFrame, missing_tables: list[dict]) -> list[dict]:
    lim_b, lim_c = class_limits("B"), class_limits("C")
    out = []
    for r in g.itertuples():
        param = r.parameter
        if r.flag in ("not sampled", "*", "**", "_"):
            status = "missing"
        elif param in lim_b and r.is_numeric:
            status = "breach" if lim_b[param].breached(float(r.value)) else "ok"
        elif not r.is_numeric and r.flag is None:
            status = "missing"
        else:
            status = "no_limit"
        out.append({
            "year": int(r.year), "festival": r.festival, "phase": r.phase, "parameter": param,
            "value": float(r.value) if r.is_numeric else None, "unit": r.unit_assumed,
            "flag": r.flag, "value_as_printed": r.value_as_printed,
            "limit_class_b": lim_b[param].text if param in lim_b else None,
            "limit_class_c": lim_c[param].text if param in lim_c else None,
            "status": status, "page": int(r.source_page), "pdf": str(int(r.year)),
        })
    for gap in missing_tables:
        for ph in PHASES:
            for param in gap["parameters"]:
                out.append({
                    "year": gap["year"], "festival": gap["festival"], "phase": ph, "parameter": param,
                    "value": None, "unit": None, "flag": "no table in report", "value_as_printed": None,
                    "limit_class_b": lim_b[param].text if param in lim_b else None,
                    "limit_class_c": lim_c[param].text if param in lim_c else None,
                    "status": "missing", "page": None, "pdf": str(gap["year"]),
                })
    return out


def series(g: pd.DataFrame) -> dict[str, list[dict]]:
    """18 festival-phase points per scored parameter (value None when missing)."""
    out: dict[str, list[dict]] = {}
    for param in SCORED_PARAMS:
        pts = []
        for year in YEARS:
            for fest in FESTIVALS:
                for ph in PHASES:
                    m = g[(g["year"] == year) & (g["festival"] == fest) & (g["phase"] == ph) & (g["parameter"] == param)]
                    row = m.iloc[0] if not m.empty else None
                    num = row is not None and bool(row["is_numeric"])
                    pts.append({"label": f"{fest} {year} {ph}", "year": year, "festival": fest, "phase": ph,
                                "value": float(row["value"]) if num else None,
                                "flag": (row["flag"] if row is not None else "no table in report"),
                                "page": int(row["source_page"]) if row is not None else None})
        out[param] = pts
    return out


# ---------------------------------------------------------------- assemble

def _site_block(slug: str) -> dict:
    s = SITE_BY_SLUG[slug]
    return {"slug": slug, "name": {"en": s.name_en, "hi": s.name_hi}, "water_body": s.water_body,
            "water_body_name": {"en": s.water_body, "hi": s.water_body_hi},
            "ngt_lake_ban": s.ngt_lake_ban, "site_confidence": s.confidence,
            "site_note": {"en": s.note_en, "hi": s.note_hi} if s.note_en else None}


def assess_ghat(df: pd.DataFrame, slug: str, context_all: dict[str, list[dict]],
                extra: list[Reading] | None = None, detail: bool = False) -> dict:
    """Full assessment for one ghat; `extra` are officer-entered 2026 readings (what-if)."""
    g = df[df["slug"] == slug]
    extra = list(extra or [])
    rd = scored_readings(g) + extra
    sr = compute_score(rd)
    # accepted uploads of 2023-2025 tables fill historical gaps; denominators stay 2023-2025
    n_hist = len([r for r in rd if not r.entered or (r.upload and r.year in YEARS)])
    coverage = min(1.0, n_hist / EXPECTED_READINGS)
    has_durga25 = (not g[(g["year"] == 2025) & (g["festival"] == "Durga")].empty
                   or any(r.year == 2025 and r.festival == "Durga" for r in extra))
    p26 = {r.parameter for r in extra if r.year >= 2026 and r.festival == "Durga"}
    has_2026 = {"Dissolved oxygen", "BOD"} <= p26  # pH alone (or DO alone) does not clear "no Durga 2025"
    tier, rule = decide_tier(sr.score, coverage, has_durga25, rd, has_2026=has_2026)
    tr, rates = trend(rd)
    gaps = detect_gaps(df, slug)
    ctx = context_all.get(slug, [])[:2]
    reasons = breach_reasons(rd)
    reasons += [{k: v for k, v in c.items() if k not in ("strength",)} for c in ctx]
    gr = gap_reason(gaps)
    if gr:
        reasons.append(gr)
    out = _site_block(slug) | {
        "rank": None, "tier": tier, "tier_rule": rule,
        "score": sr.score, "score_label": ({"en": "on partial data", "hi": "आंशिक डेटा पर"}
                                           if tier == "insufficient_data" else None),
        "breach_rate": sr.breach_rate, "coverage": round(coverage, 3), "trend": tr,
        "breach_rate_by_year": rates, "readings_available": n_hist,
        "readings_expected": EXPECTED_READINGS, "coverage_by_table": coverage_by_table(df, slug),
        "reasons": reasons, "actions": derive_actions(tier, sr, ctx, g, SITE_BY_SLUG[slug].ngt_lake_ban),
        "forecast": {"available": False, "reason": "ML artifacts not built"},
    }
    if detail:
        out["readings"] = reading_rows(g, [x for x in gaps if x["kind"] == "missing_table"])
        out["gaps"] = gaps
        out["series"] = series(g)
    return out


def sort_key(gh: dict) -> tuple:
    return (TIER_ORDER[gh["tier"]], -(gh["score"] or 0.0))


def summary_counts(df: pd.DataFrame) -> dict:
    """Headline counts over the Bhopal file (numeric readings only)."""
    def vals(p: str) -> pd.Series:
        return df[(df["parameter"] == p) & df["is_numeric"]]["value"]
    do, bod, ph = vals("Dissolved oxygen"), vals("BOD"), vals("pH")
    return {"do_readings": int(len(do)), "do_below_5": int((do < 5).sum()), "do_zero": int((do == 0).sum()),
            "bod_readings": int(len(bod)), "bod_above_3": int((bod > 3).sum()),
            "ph_readings": int(len(ph)), "ph_outside": int(((ph < 6.5) | (ph > 8.5)).sum()),
            "bdl_rows": int((df["flag"] == "BDL").sum()),
            "not_sampled_rows": int(df["flag"].isin(["not sampled", "*", "**", "_"]).sum())}


def rank_all(df: pd.DataFrame | None = None, detail: bool = False,
             extra_by_slug: dict[str, list[Reading]] | None = None) -> list[dict]:
    """Rank the 7 ghats; `extra_by_slug` adds accepted officer readings (intake) per ghat."""
    df = load_bhopal() if df is None else df
    ctx = context_candidates(df)
    extra_by_slug = extra_by_slug or {}
    ghats = [assess_ghat(df, s.slug, ctx, extra=extra_by_slug.get(s.slug) or None, detail=detail)
             for s in SITES]
    ghats.sort(key=sort_key)
    for i, gh in enumerate(ghats, 1):
        gh["rank"] = i
    return ghats


def ranking_payload(generated_at: str, detail: bool = False,
                    extra_by_slug: dict[str, list[Reading]] | None = None,
                    user_data: dict | None = None) -> dict:
    """v1 ranking; with `extra_by_slug` accepted officer rows are scored and `user_data` describes them."""
    df = load_bhopal()
    out = {"generated_at": generated_at, "standard": STANDARD, "weights": weights_block(),
           "summary": summary_counts(df), "ghats": rank_all(df, detail=detail, extra_by_slug=extra_by_slug)}
    if user_data is not None:
        out["user_data"] = user_data
    return out


# ---------------------------------------------------------------- what-if

PRE_KEYS = {"pH": "pH", "DO": "Dissolved oxygen", "BOD": "BOD", "COD": "COD", "TDS": "Dissolved solids",
            "TS": "Total solids", "turbidity": "Turbidity", "conductivity": "Conductivity"}


def entered_readings(pre: dict) -> list[Reading]:
    """Officer-entered 2026 Durga pre-immersion values -> scored readings."""
    out = []
    bad = [f"{key}: {why}" for key, param in PRE_KEYS.items()
           if (why := implausible(param, None if pre.get(key) is None else float(pre[key])))]
    if bad:
        raise ImplausibleReading("Implausible reading, not scored. " + " ".join(bad))
    for key, param in PRE_KEYS.items():
        v = pre.get(key)
        if v is None or param not in SCORED_PARAMS:
            continue
        unit = None if param == "pH" else "mg/l"
        out.append(Reading(2026, "Durga", "pre", param, float(v), unit, None, entered=True))
    return out


def whatif(slug: str | None, pre: dict, new_site: dict | None = None) -> dict:
    """Re-score with 2026 Durga pre readings (year weight 1.0, phase weight 0.5).

    Implausible values raise fastapi HTTPException 422 (subclass of ImplausibleReading)."""
    try:
        extra = entered_readings(pre)
    except ImplausibleReading as e:
        from fastapi import HTTPException
        raise HTTPException(422, str(e)) from e
    if new_site is not None or slug is None:
        sr = compute_score(extra)
        tier, rule = decide_tier(sr.score, 0.0, False, extra, has_2026=True, new_site=True)
        rule = {"en": rule["en"] + " (2026 data only)", "hi": rule["hi"] + " (केवल 2026 डेटा)"}
        return {"new_site": new_site or {}, "score_before": None, "score_with_2026": sr.score,
                "tier_before": None, "tier": tier, "tier_rule": rule, "label": {"en": "2026 data only", "hi": "केवल 2026 डेटा"},
                "reasons": breach_reasons(extra), "breach_rate": sr.breach_rate}
    if slug not in SITE_BY_SLUG:
        raise KeyError(slug)
    df = load_bhopal()
    ctx = context_candidates(df)
    before = assess_ghat(df, slug, ctx)
    after = assess_ghat(df, slug, ctx, extra=extra)
    return {"slug": slug, "score_before": before["score"], "score_with_2026": after["score"],
            "tier_before": before["tier"], "tier": after["tier"], "tier_rule": after["tier_rule"],
            "breach_rate": after["breach_rate"], "reasons": after["reasons"], "actions": after["actions"]}
