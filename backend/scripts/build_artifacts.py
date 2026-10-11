"""Build all Ghat Watch artifacts: ranking, per-ghat evidence, gaps, brief, ML leaderboard, CQL report.

Run from the repo root or from backend/:  python backend/scripts/build_artifacts.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.artifacts import build_all  # noqa: E402


def main() -> None:
    t0 = time.perf_counter()
    manifest = build_all()
    print(f"Artifacts built at {manifest['artifacts_built_at']} in {time.perf_counter() - t0:.1f}s")


if __name__ == "__main__":
    main()
