"""Build and read the precomputed JSON artifacts (backend/artifacts/)."""
from __future__ import annotations

import json
import shutil
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .brief import build_brief
from .data import ARTIFACTS_DIR, FRONTEND_DATA_DIR, SITES, load_bhopal, load_statewide
from .scoring import ranking_payload

IST = timezone(timedelta(hours=5, minutes=30))
DETAIL_KEYS = ("readings", "gaps", "series")


def now_ist() -> str:
    return datetime.now(IST).replace(microsecond=0).isoformat()


def write_json(path: Path, obj) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def read_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def split_ranking(full: dict) -> tuple[dict, dict[str, dict]]:
    """Full payload with per-ghat detail -> (ranking without detail, {slug: detail})."""
    details = {g["slug"]: g for g in full["ghats"]}
    lean = dict(full)
    lean["ghats"] = [{k: v for k, v in g.items() if k not in DETAIL_KEYS} for g in full["ghats"]]
    return lean, details


def gaps_payload(details: dict[str, dict], generated_at: str) -> dict:
    return {"generated_at": generated_at,
            "ghats": [{"slug": g["slug"], "name": g["name"], "rank": g["rank"], "tier": g["tier"],
                       "coverage": g["coverage"], "coverage_by_table": g["coverage_by_table"], "gaps": g["gaps"]}
                      for g in sorted(details.values(), key=lambda x: x["rank"])]}


def build_all(out_dir: Path = ARTIFACTS_DIR, copy_to: Path | None = FRONTEND_DATA_DIR, log=print) -> dict:
    """Build every artifact. ML and RL failures are logged and never block the ranking."""
    t0 = time.perf_counter()
    gen = now_ist()
    timings: dict[str, float] = {}

    # ML (Should): train, then forecasts
    leaderboard: dict = {"available": False, "reason": "not built"}
    forecasts: dict = {}
    try:
        from .ml.predict import bhopal_forecasts, load_models
        from .ml.train import train_all
        t = time.perf_counter()
        leaderboard = train_all(out_dir / "models") | {"available": True, "generated_at": gen}
        load_models.cache_clear()
        forecasts = bhopal_forecasts()
        timings["ml_seconds"] = round(time.perf_counter() - t, 1)
        log(f"ML: champion={leaderboard['champion']} ({timings['ml_seconds']}s)")
    except Exception as e:  # never block the Must path
        leaderboard = {"available": False, "reason": f"ML build failed: {e!r}"}
        log(f"ML failed: {e!r}")

    full = ranking_payload(gen, detail=True)
    for g in full["ghats"]:
        if g["slug"] in forecasts:
            g["forecast"] = forecasts[g["slug"]]
    ranking, details = split_ranking(full)
    brief = build_brief(ranking) | {"generated_at": gen}

    # RL (Could)
    allocate: dict = {"available": False, "experimental": True, "reason": "not built"}
    try:
        from .rl.allocate import allocate_payload, build_report
        t = time.perf_counter()
        report = build_report() | {"generated_at": gen}
        write_json(out_dir / "rl" / "cql_report.json", report)
        allocate = allocate_payload(list(details.values()), report, 8) | {"generated_at": gen}
        timings["rl_seconds"] = round(time.perf_counter() - t, 1)
        log(f"CQL policy values: {report['policy_values']} ({timings['rl_seconds']}s)")
    except Exception as e:
        allocate = {"available": False, "experimental": True, "reason": f"CQL build failed: {e!r}"}
        log(f"RL failed: {e!r}")

    _, stats = load_statewide()
    write_json(out_dir / "ranking.json", ranking)
    for slug, d in details.items():
        write_json(out_dir / "ghats" / f"{slug}.json", d)
    write_json(out_dir / "gaps.json", gaps_payload(details, gen))
    write_json(out_dir / "brief.json", brief)
    write_json(out_dir / "leaderboard.json", leaderboard)
    write_json(out_dir / "allocate.json", allocate)
    runtime = round(time.perf_counter() - t0, 1)
    manifest = {"artifacts_built_at": gen, "runtime_seconds": runtime, "timings": timings,
                "bhopal_rows": int(len(load_bhopal())), "statewide_cleaning": stats.to_dict(),
                "sites": [s.slug for s in SITES]}
    write_json(out_dir / "manifest.json", manifest)

    if copy_to is not None:
        for p in out_dir.rglob("*.json"):
            dest = copy_to / p.relative_to(out_dir)
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(p, dest)
        log(f"Copied JSON artifacts to {copy_to}")
    return manifest
