"""Analyst: class B status per reading, before/after re-rank, four-model forecast, allocation hint."""
from __future__ import annotations

import copy
import math
from functools import lru_cache

import numpy as np
import pandas as pd

from ..data import ARTIFACTS_DIR, SITE_BY_SLUG, load_bhopal, load_user_readings
from ..limits import class_limits
from ..scoring import SCORED_PARAMS, Reading, rank_all
from .schema import NOT_VERIFIED, bi
from .validate import implausible

MISSING = {"not sampled", "*", "**", "_", "DRY", "na"}
PRE_KEY = {"pH": "pH", "Dissolved oxygen": "DO", "BOD": "BOD", "COD": "COD", "Total solids": "TS",
           "Dissolved solids": "TDS", "Turbidity": "turbidity", "Conductivity": "conductivity"}
ACTION_TEXT = {
    "none": bi("No extra action ranks above the others for this ghat.", "इस घाट के लिए कोई अतिरिक्त कार्रवाई प्राथमिक नहीं है।"),
    "test": bi("Send a test team first: the data here are incomplete.", "पहले जांच दल भेजें: यहां का डेटा अधूरा है।"),
    "clean": bi("Clean the ghat (remove idol material, floating waste).", "घाट की सफाई करें (मूर्ति सामग्री, तैरता कचरा हटाएं)।"),
    "aerate": bi("Put an aerator on this ghat: oxygen is the binding problem.", "इस घाट पर एरेटर लगाएं: ऑक्सीजन मुख्य समस्या है।"),
    "clean_aerate": bi("Clean and aerate this ghat.", "इस घाट की सफाई करें और एरेटर लगाएं।"),
}


def reading_status(r: dict) -> dict:
    lim = class_limits("B")
    p = r["parameter"]
    if implausible(p, r.get("value")):  # e.g. DO 45: needs review, never "ok" and never scored
        return {"row_id": r["row_id"], "status": "missing", "needs_review": True,
                "limit_text": "implausible value: check the page and correct it before accepting"}
    if r.get("flag") in MISSING:
        st = "missing"
    elif p in lim and r.get("value") is not None:
        st = "breach" if lim[p].breached(float(r["value"])) else "ok"
    elif r.get("value") is None and not r.get("flag"):
        st = "missing"
    else:
        st = "no_limit"
    return {"row_id": r["row_id"], "status": st, "limit_text": lim[p].text if p in lim else None}


def _clean(v: object) -> object:
    if isinstance(v, float) and math.isnan(v):
        return None
    return v


def rows_to_readings(rows: list[dict], job_id: str | None, source_file: str | None) -> dict[str, list[Reading]]:
    """Scorable rows (known ghat, DO/BOD/pH, numeric, not a duplicate of the pack) -> Readings per slug."""
    out: dict[str, list[Reading]] = {}
    for r in rows:
        if (not r.get("slug") or r["slug"] not in SITE_BY_SLUG or r.get("parameter") not in SCORED_PARAMS
                or r.get("value") is None or r.get("already_in_pack") or r.get("year") is None
                or r.get("festival") not in ("Ganesh", "Durga") or r.get("phase") not in ("pre", "during", "after")
                or implausible(r.get("parameter"), r.get("value"))):
            continue
        page = r.get("page")
        out.setdefault(r["slug"], []).append(Reading(
            int(r["year"]), r["festival"], r["phase"], r["parameter"], float(r["value"]),
            None if r["parameter"] == "pH" else "mg/l", int(page) if page not in (None, "") else None,
            entered=True, upload=job_id or "manual", source_file=source_file or "manual entry"))
    return out


def user_rows(exclude_job: str | None = None) -> list[dict]:
    """Accepted officer rows as Row-like dicts (optionally without one job)."""
    df = load_user_readings()
    if df.empty:
        return []
    if exclude_job:
        df = df[df["job_id"].astype(str) != str(exclude_job)]
    out = []
    for r in df.itertuples():
        out.append({"row_id": None, "slug": _clean(r.slug), "parameter": r.parameter, "value": _clean(r.value),
                    "flag": _clean(r.flag), "year": int(r.year) if pd.notna(r.year) else None,
                    "festival": r.festival, "phase": r.phase, "already_in_pack": bool(r.already_in_pack),
                    "page": int(r.source_page) if pd.notna(r.source_page) else None,
                    "job_id": str(r.job_id), "source_file": _clean(r.source_file)})
    return out


def user_extra(exclude_job: str | None = None) -> tuple[dict[str, list[Reading]], dict]:
    """(extra_by_slug, user_data block) for /api/ranking from accepted_readings.csv."""
    rows = user_rows(exclude_job)
    extra: dict[str, list[Reading]] = {}
    sources: dict[str, dict] = {}
    df = load_user_readings()
    for r in rows:
        for slug, rd in rows_to_readings([r], r["job_id"], r["source_file"]).items():
            extra.setdefault(slug, []).extend(rd)
    for r in df.itertuples():
        jid = str(r.job_id)
        if exclude_job and jid == str(exclude_job):
            continue
        sources.setdefault(jid, {"job_id": jid, "file_name": _clean(r.source_file),
                                 "year": int(r.year) if pd.notna(r.year) else None, "festival": r.festival})
    n = len(rows)
    ud = {"included": n > 0, "rows": n, "sources": list(sources.values())}
    if n:
        ud["duplicates_ignored"] = sum(1 for r in rows if r["already_in_pack"])
        ud["note"] = NOT_VERIFIED
    return extra, ud


def _merge(a: dict[str, list[Reading]], b: dict[str, list[Reading]]) -> dict[str, list[Reading]]:
    out = {k: list(v) for k, v in a.items()}
    for k, v in b.items():
        out.setdefault(k, []).extend(v)
    return out


def forecast_for(slug: str, rows: list[dict]) -> dict | None:
    """Four-model outlook from the job's latest pre-immersion values for this ghat (v1 what-if path)."""
    pre_rows = [r for r in rows if r.get("slug") == slug and r.get("phase") == "pre" and r.get("value") is not None
                and r.get("parameter") in PRE_KEY and r.get("year") is not None and r.get("festival")]
    if not pre_rows:
        return None
    y, f = max((int(r["year"]), r["festival"] == "Durga") for r in pre_rows)
    fest = "Durga" if f else "Ganesh"
    pre = {PRE_KEY[r["parameter"]]: float(r["value"]) for r in pre_rows
           if int(r["year"]) == y and r["festival"] == fest}
    try:
        fc = _forecast_basis(slug, pre, y, fest)
    except Exception as e:  # forecast is optional
        return {"available": False, "reason": f"forecast failed: {e!r}", "champion": None, "p_breach": None,
                "models": {}, "top_reasons": [], "basis": {"year": y, "festival": fest, "phase": "pre"}}
    if fc.get("available"):
        fc["basis"] = {"year": y, "festival": fest, "phase": "pre", "entered": True}
    return fc


def _forecast_basis(slug: str, pre: dict, year: int, festival: str) -> dict:
    """ml.predict.whatif_forecast generalised to the year/festival the entered pre values belong to
    (identical to it for Durga 2026); the Bhopal feature table is cached per process."""
    from ..ml.dataset import PRE_FEATURES, featurise
    from ..ml.predict import WHATIF_KEYS, forecast_row, load_models
    loaded = load_models()
    if loaded is None:
        return {"available": False, "reason": "ML models not built"}
    _, meta = loaded
    t = _feature_rows(tuple(meta["top_ros"]))
    row = t[t["slug"] == slug].copy()
    for c in PRE_FEATURES:
        row[c] = np.nan
    row["year"], row["festival"] = year, festival
    for k, f in WHATIF_KEYS.items():
        if pre.get(k) is not None:
            row[f] = float(pre[k])
    X = featurise(row.reset_index(drop=True), meta["top_ros"])
    return forecast_row(X, {"year": year, "festival": festival, "phase": "pre"})


@lru_cache(maxsize=4)
def _feature_rows(top_ros: tuple):
    from ..ml.dataset import bhopal_feature_rows
    return bhopal_feature_rows(list(top_ros))


def warm_up() -> None:
    """Import the ML stack and load the models once (first analysis would otherwise pay ~15 s)."""
    try:
        from ..ml.predict import load_models
        loaded = load_models()
        if loaded is not None:
            _feature_rows(tuple(loaded[1]["top_ros"]))
    except Exception:
        pass


def allocation_hint(gh_after: dict, rows: list[dict]) -> dict | None:
    """Best single action for this ghat under the experimental CQL Q-table, given the new readings."""
    p = ARTIFACTS_DIR / "rl" / "cql_report.json"
    if not p.exists():
        return None
    try:
        from ..artifacts import read_json
        from ..rl.allocate import allocate
        rep = read_json(p)
        if not rep.get("check_cql_ge_do_nothing", False):
            return None
        g = copy.deepcopy(gh_after)
        ser = {k: list(v) for k, v in (g.get("series") or {}).items()}
        for r in rows:
            if r.get("slug") == g["slug"] and r.get("parameter") in ("Dissolved oxygen", "BOD") and r.get("value") is not None:
                ser.setdefault(r["parameter"], []).append({"year": int(r["year"]), "festival": r["festival"],
                                                           "value": float(r["value"])})
        g["series"] = ser
        plan = allocate([g], rep["Q"], 100.0)
        action = plan[0]["action"] if plan else "none"
        t = ACTION_TEXT.get(action, ACTION_TEXT["none"])
        return {"action": action, "text": {"en": t["en"] + " (experimental CQL policy)",
                                           "hi": t["hi"] + " (प्रायोगिक CQL नीति)"}}
    except Exception:
        return None


def _with_upload_key(reasons: list[dict]) -> list[dict]:
    out = copy.deepcopy(reasons)
    for r in out:
        src = r.get("source") or {}
        src.setdefault("upload", None)
        r["source"] = src
    return out


def analyze(rows: list[dict], job_id: str, source_file: str | None) -> dict:
    """Analysis block (contract §4) for the reviewed rows of one job."""
    df = load_bhopal()
    base_extra, _ = user_extra(exclude_job=job_id)
    job_extra = rows_to_readings(rows, job_id, source_file)
    before = {g["slug"]: g for g in rank_all(df, extra_by_slug=base_extra)}
    after = {g["slug"]: g for g in rank_all(df, detail=True, extra_by_slug=_merge(base_extra, job_extra))}
    slugs = [s for s in SITE_BY_SLUG if any(r.get("slug") == s for r in rows)]
    ghats = []
    changed_en, changed_hi = [], []
    for s in slugs:
        b, a = before[s], after[s]
        ch = (b["tier"], b["score"], b["rank"]) != (a["tier"], a["score"], a["rank"])
        fc = forecast_for(s, rows)
        ghats.append({
            "slug": s, "name": a["name"],
            "before": {"tier": b["tier"], "score": b["score"], "rank": b["rank"]},
            "after": {"tier": a["tier"], "score": a["score"], "rank": a["rank"]},
            "changed": ch, "tier_rule": a["tier_rule"],
            "reasons": _with_upload_key(a["reasons"]),
            "forecast": fc, "allocation_hint": allocation_hint(a, rows),
            "scored_rows": len(job_extra.get(s, [])),
        })
        if ch:
            changed_en.append(f"{a['name']['en']}: {b['tier']} → {a['tier']} (score {b['score']} → {a['score']}, "
                              f"rank {b['rank']} → {a['rank']})")
            changed_hi.append(f"{a['name']['hi']}: {b['tier']} → {a['tier']} (स्कोर {b['score']} → {a['score']}, "
                              f"रैंक {b['rank']} → {a['rank']})")
    n_scored = sum(len(v) for v in job_extra.values())
    n_dup = sum(1 for r in rows if r.get("already_in_pack"))
    unmatched = sorted({r["site_as_printed"] for r in rows if not r.get("slug")})
    en = (f"{len(rows)} rows reviewed; {n_scored} new DO/BOD/pH readings enter the score; {n_dup} duplicate the "
          f"official pack (pack value kept). ")
    hi = (f"{len(rows)} पंक्तियों की समीक्षा; {n_scored} नई DO/बीओडी/पीएच रीडिंग स्कोर में जुड़ती हैं; {n_dup} आधिकारिक "
          f"डेटा में पहले से हैं (आधिकारिक मान रखा गया)। ")
    if changed_en:
        en += "Changed: " + "; ".join(changed_en) + ". "
        hi += "बदलाव: " + "; ".join(changed_hi) + "। "
    else:
        en += "No ghat changes tier, score or rank. "
        hi += "किसी घाट का स्तर, स्कोर या रैंक नहीं बदला। "
    if unmatched:
        en += f"Unmatched sites kept apart: {', '.join(unmatched)}. "
        hi += f"बेमेल स्थल अलग रखे गए: {', '.join(unmatched)}। "
    en += f"These are {NOT_VERIFIED['en']}."
    hi += f"ये {NOT_VERIFIED['hi']} हैं।"
    return {"standard": "CPCB class B", "readings": [reading_status(r) for r in rows], "ghats": ghats,
            "summary": {"en": en, "hi": hi}}
