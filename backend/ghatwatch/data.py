"""Load and clean the data pack CSVs (read-only).

Rules: a blank, BDL, ND, `not sampled`, `*`, `**` or `_` value is never a number
and is never treated as 0 or as clean.
"""
from __future__ import annotations

from dataclasses import dataclass, asdict
from functools import lru_cache
from pathlib import Path

import numpy as np
import pandas as pd

BACKEND_DIR = Path(__file__).resolve().parents[1]
REPO_ROOT = BACKEND_DIR.parent
PACK_DIR = REPO_ROOT / "track-2-visarjan-ghat-watch"
DATA_DIR = PACK_DIR / "data"
RESOURCES_DIR = PACK_DIR / "resources"
ARTIFACTS_DIR = BACKEND_DIR / "artifacts"
FRONTEND_DATA_DIR = REPO_ROOT / "frontend" / "public" / "data"

BHOPAL_CSV = DATA_DIR / "bhopal_ghats_2023_2025.csv"
STATEWIDE_CSV = DATA_DIR / "mp_immersion_sites_2023_2025.csv"
CRITERIA_CSV = DATA_DIR / "cpcb_water_quality_criteria.csv"

# PDF id -> file in resources/ (MPPCB immersion reports)
PDFS: dict[str, str] = {
    "2023": "Idol_immer._Report_23_CPCB.pdf",
    "2024": "Ganesh_and_Durga_visarjan_report-2024.pdf",
    "2025": "Ganesh_and_Durga_visarjan_report-2025.pdf",
}

YEARS = [2023, 2024, 2025]
FESTIVALS = ["Ganesh", "Durga"]  # chronological order within a year
PHASES = ["pre", "during", "after"]
SCORED_PARAMS = ["Dissolved oxygen", "BOD", "pH"]
METALS = ["Chromium", "Lead", "Zinc", "Copper"]
NON_NUMERIC_FLAGS = {"BDL", "ND", "not sampled", "*", "**", "_", "DRY", "na"}
MISSING_FLAGS = {"not sampled", "*", "**", "_", "DRY", "na"}


@dataclass(frozen=True)
class Site:
    slug: str
    csv_name: str
    name_en: str
    name_hi: str
    water_body: str
    water_body_hi: str
    confidence: str
    note_en: str = ""
    note_hi: str = ""

    @property
    def ngt_lake_ban(self) -> bool:
        return self.water_body in ("Upper Lake", "Lower Lake")


SITES: list[Site] = [
    Site("bairagarh", "Bairagarh (Sant Hirdaram) kund", "Bairagarh (Sant Hirdaram) kund",
         "बैरागढ़ (संत हिरदाराम) कुंड", "Upper Lake", "बड़ा तालाब (अपर लेक)", "high"),
    Site("khatlapura", "Khatlapura ghat", "Khatlapura ghat", "खटलापुरा घाट",
         "Lower Lake", "छोटा तालाब (लोअर लेक)", "high"),
    Site("prempura", "Prempura ghat", "Prempura ghat", "प्रेमपुरा घाट",
         "Upper Lake", "बड़ा तालाब (अपर लेक)", "high"),
    Site("rani-kamlapati", "Rani Kamlapati ghat / Kamla Park kund",
         "Rani Kamlapati ghat / Kamla Park kund", "रानी कमलापति घाट / कमला पार्क कुंड",
         "Lower Lake", "छोटा तालाब (लोअर लेक)", "medium",
         "Ganesh tables say 'Kamla Park kund', Durga tables say 'Lower Lake ghat'. These may be two places.",
         "गणेश तालिकाओं में 'कमला पार्क कुंड' और दुर्गा तालिकाओं में 'लोअर लेक घाट' लिखा है। ये दो अलग जगहें हो सकती हैं।"),
    Site("hathaikheda", "Hathaikheda dam / kund", "Hathaikheda dam / kund", "हथाईखेड़ा डैम / कुंड",
         "Hathaikheda dam", "हथाईखेड़ा डैम", "high"),
    Site("malikhedi", "Malikhedi kund", "Malikhedi kund", "मालीखेड़ी कुंड", "Kund", "कुंड", "high"),
    Site("shahpura", "Shahpura lake ghat", "Shahpura lake ghat", "शाहपुरा झील घाट",
         "Shahpura Lake", "शाहपुरा झील", "high"),
]
SITE_BY_SLUG: dict[str, Site] = {s.slug: s for s in SITES}
SLUG_BY_CSV: dict[str, str] = {s.csv_name: s.slug for s in SITES}


def _fix_unit(u: object) -> object:
    """Repair the conductivity unit mojibake (replacement char + 'S/cm' -> 'µS/cm')."""
    if isinstance(u, str) and u.endswith("S/cm"):
        return "µS/cm"
    return u


def _none_if_na(series: pd.Series) -> pd.Series:
    return series.astype(object).where(series.notna(), None)


def _clean_common(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["unit_assumed"] = _none_if_na(df["unit_assumed"].map(_fix_unit))
    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    df["flag"] = _none_if_na(df["flag"])
    df["value_as_printed"] = _none_if_na(df["value_as_printed"])
    # Never numeric if a non-numeric flag is set, or the cell is blank.
    bad = df["flag"].map(lambda f: f in NON_NUMERIC_FLAGS).astype(bool)
    df.loc[bad, "value"] = np.nan
    df["is_numeric"] = df["value"].notna()
    return df


@lru_cache(maxsize=1)
def load_bhopal() -> pd.DataFrame:
    """Bhopal 7-ghat readings with slug, water body, NGT flag and cleaned flags.

    Blank cells with no flag (the Ganesh 2025 pre/after rows at Bairagarh and
    Malikhedi, printed under a `*`/`**` column) get flag 'not sampled'.
    """
    df = pd.read_csv(BHOPAL_CSV, encoding="utf-8")
    df = _clean_common(df)
    blank = df["value"].isna() & df["flag"].isna()
    df.loc[blank, "flag"] = "not sampled"
    df["slug"] = df["site"].map(SLUG_BY_CSV)
    if df["slug"].isna().any():
        raise ValueError(f"Unknown site names: {df.loc[df['slug'].isna(), 'site'].unique()}")
    df["water_body"] = df["slug"].map(lambda s: SITE_BY_SLUG[s].water_body)
    df["ngt_lake_ban"] = df["slug"].map(lambda s: SITE_BY_SLUG[s].ngt_lake_ban)
    df["pdf"] = df["year"].astype(int).astype(str)
    df["source_page"] = df["source_page"].astype(int)
    df["year"] = df["year"].astype(int)
    return df


def star_phases(df: pd.DataFrame) -> set[tuple[str, int, str, str]]:
    """(slug, year, festival, phase) where the report printed `*`/`**` for a whole phase."""
    star = df[df["flag"].isin(["*", "**"])]
    return {(r.slug, int(r.year), r.festival, r.phase) for r in star.itertuples()}


@dataclass
class StatewideStats:
    rows_raw: int
    rows_needs_check_dropped: int
    rows_duplicate_dropped: int
    implausible_nulled: dict[str, int]
    rows_clean: int

    def to_dict(self) -> dict:
        return asdict(self)


def site_key(s: object) -> str:
    """Lower-case alphanumeric key of a printed site name."""
    return "".join(ch for ch in str(s).lower() if ch.isalnum())


def normalise_ro(s: object) -> str:
    """'R. O. Ujjain' / 'R.O.Ujjain' -> 'ujjain'; spelling variants merged."""
    t = "".join(ch for ch in str(s).lower() if ch.isalpha())
    t = t[2:] if t.startswith("ro") else t
    return {"singrouli": "singrauli", "chhindwada": "chhindwara"}.get(t, t)


@lru_cache(maxsize=1)
def load_statewide() -> tuple[pd.DataFrame, StatewideStats]:
    """Statewide readings: drop needs_check and page-duplicate rows, null implausible values."""
    raw = pd.read_csv(STATEWIDE_CSV, encoding="utf-8")
    n_raw = len(raw)
    df = raw[raw["needs_check"].isna()].copy()
    n_nc = n_raw - len(df)
    df = _clean_common(df)
    df["site_key"] = df["site_as_printed"].map(site_key)
    before = len(df)
    df = df.drop_duplicates(["year", "festival", "site_key", "phase", "parameter"], keep="first")
    n_dup = before - len(df)
    v, p = df["value"], df["parameter"]
    rules = {
        "DO > 20": (p == "Dissolved oxygen") & (v > 20),
        "pH > 14 or < 0": (p == "pH") & ((v > 14) | (v < 0)),
        "BOD > 500": (p == "BOD") & (v > 500),
        "negative (other)": v < 0,
    }
    counts: dict[str, int] = {}
    for name, mask in rules.items():
        mask = mask.fillna(False).astype(bool) & df["value"].notna()
        counts[name] = int(mask.sum())
        df.loc[mask, "value"] = np.nan
    df["is_numeric"] = df["value"].notna()
    df["ro"] = df["regional_office"].map(normalise_ro)
    stats = StatewideStats(n_raw, n_nc, n_dup, counts, len(df))
    return df.reset_index(drop=True), stats


# ---------------------------------------------------------------- phase 3: officer-added readings (intake)

USER_COLUMNS = ["year", "festival", "site", "slug", "phase", "parameter", "value", "unit_assumed", "flag",
                "value_as_printed", "parameter_as_printed", "site_as_printed", "site_match_confidence",
                "source_page", "job_id", "source_file", "accepted_at", "entered_by", "already_in_pack",
                "confidence"]


def intake_dir() -> Path:
    """Runtime intake folder (uploads, jobs, accepted rows); GHATWATCH_INTAKE_DIR overrides (tests)."""
    import os
    return Path(os.environ.get("GHATWATCH_INTAKE_DIR") or (BACKEND_DIR / "intake_data"))


def accepted_csv() -> Path:
    return intake_dir() / "accepted_readings.csv"


def load_user_readings() -> pd.DataFrame:
    """Officer-accepted intake rows (kept apart from the official pack). Empty-safe; never cached."""
    p = accepted_csv()
    if not p.exists() or p.stat().st_size == 0:
        return pd.DataFrame(columns=USER_COLUMNS)
    df = pd.read_csv(p, encoding="utf-8", dtype={"job_id": str, "slug": str, "flag": str})
    for c in USER_COLUMNS:
        if c not in df.columns:
            df[c] = None
    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    df["flag"] = _none_if_na(df["flag"])
    df["slug"] = _none_if_na(df["slug"])
    df["source_page"] = pd.to_numeric(df["source_page"], errors="coerce")
    df["year"] = pd.to_numeric(df["year"], errors="coerce").astype("Int64")
    df["already_in_pack"] = df["already_in_pack"].astype(str).str.lower().isin(["true", "1"])
    bad = df["flag"].map(lambda f: f in NON_NUMERIC_FLAGS).astype(bool)
    df.loc[bad, "value"] = np.nan
    df["is_numeric"] = df["value"].notna()
    return df
