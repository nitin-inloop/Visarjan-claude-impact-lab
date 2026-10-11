"""Build all Ghat Watch artifacts: ranking, per-ghat evidence, gaps, brief, ML leaderboard, CQL report.

Run from the repo root or from backend/:  python backend/scripts/build_artifacts.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.artifacts import build_all  # noqa: E402


def build_live_calibration() -> None:
    """Calibration-lite for the live simulator (PLAN-LIVE v2 D) -> artifacts/live/calibration.json."""
    import shutil

    from ghatwatch.artifacts import write_json
    from ghatwatch.data import ARTIFACTS_DIR, FRONTEND_DATA_DIR
    from ghatwatch.live.calibration import run_calibration
    try:
        cal = run_calibration()
        out = ARTIFACTS_DIR / "live" / "calibration.json"
        write_json(out, cal)
        dest = FRONTEND_DATA_DIR / "live" / "calibration.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(out, dest)
        print(f"Live calibration: L_idol={cal['L_idol']} MAE={cal['mae']}")
    except Exception as e:  # never block the v1 build
        print(f"Live calibration failed: {e!r}")


def main() -> None:
    t0 = time.perf_counter()
    manifest = build_all()
    build_live_calibration()
    print(f"Artifacts built at {manifest['artifacts_built_at']} in {time.perf_counter() - t0:.1f}s")


if __name__ == "__main__":
    main()
