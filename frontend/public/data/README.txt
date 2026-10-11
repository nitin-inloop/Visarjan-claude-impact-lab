STATIC SNAPSHOT USED WHEN THE API IS NOT REACHABLE

The JSON files here (ranking.json, gaps.json, brief.json, leaderboard.json, allocate.json, ghats/{slug}.json)
are written by backend/scripts/build_artifacts.py.

frontend/scripts/make-mock.mjs can regenerate PLACEHOLDER versions in the same layout from the data pack CSV
(PLAN.md section 3 rules; its forecast, leaderboard and allocation numbers are MOCK). Running it OVERWRITES the
real artifacts, so only use it if the backend cannot be run.
