# Ghat Watch — घाट वॉच

**Track 2: Visarjan Ghat Watch** · Claude Impact Lab × Cerebras Café Compute, Bhopal · 11 October 2026

| | |
|---|---|
| **Team name** | _TODO: fill in_ |
| **Members** | _TODO: fill in (4–5 names, technical and non-technical roles)_ |
| **Track** | 2 — Visarjan Ghat Watch |
| **The one user** | The Bhopal Municipal Corporation (BMC) officer who plans Durga visarjan at the ghats and decides where to send extra aeration, cleaning crews and water testing before **20 October 2026**. |
| **The one outcome** | A ranked list of Bhopal's 7 immersion ghats by water-quality risk, with the reason for every rank in plain words, every number traceable to the MPPCB report page, missing data shown as missing, and a one-page brief in Hindi and English the officer can forward. |

## What it does

1. **Ranks the 7 ghats** against the CPCB Class B (outdoor bathing) limits: dissolved oxygen ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5. The score, the tier and the rule that fired are shown for each ghat.
2. **Explains every rank** with up to three plain-language reasons. Each reason carries the value, the limit, the year, the festival, the phase and a link that opens the MPPCB PDF at the exact page.
3. **Shows missing data as missing.** Ghats with no Durga 2025 table (Bairagarh, Malikhedi) are tiered "Insufficient data" and listed first with "Test first", never ranked as clean. Blanks, `*`, `**` and BDL never enter the score.
4. **Suggests actions** per ghat: aerate, clean, test first, sample metals, and the NGT lake-immersion-ban note for Upper/Lower Lake ghats.
5. **Writes the brief** in Hindi and English: one page, copy / print / download.
6. **Lets the officer enter 2026 pre-immersion readings** (or a new BMC kund) and re-ranks instantly.
7. **Forecasts** the chance that a ghat breaches the bathing limit during/after immersion, from a model trained on 544 MP site-festival records (2023–25). Four algorithms are trained (logistic regression, random forest, XGBoost, LightGBM); the best on grouped cross-validation is served and all four are shown for agreement. Labelled as an estimate, never as a measurement.
8. **Experimental:** a Conservative Q-Learning (offline RL) policy that suggests how to split a fixed budget of tests/cleaning/aeration across ghats, trained on a simulator calibrated to the data because no real intervention log exists. See [docs/METHOD.md](docs/METHOD.md) for the caveats.

## Live mode (phase 2): real-time pipeline, one dark screen, voice

The home screen is a control-room view for immersion day. A simulated telemetry source (today) or real sensors and field tests (tomorrow, through the same contract) feed a real-time pipeline in the backend:

```
simulator / field readings → validate + staleness → rolling windows + hysteresis breach state
→ live score and tier → alerts (escalating, baseline-aware) → dispatch suggestions (CQL Q-table on the live state)
→ applied actions fed back into the simulation → Hindi/English situation report → WebSocket to the screen → voice
```

- **Simulator**: steady-state start from each ghat's latest pre-immersion readings, Poisson idol arrivals peaking 17:00–23:00 on 20 Oct 2026, Streeter-Phelps style oxygen balance with reaeration per water-body type, BOD and solids from a fitted per-idol leachable load, sensor noise and dropouts. Bairagarh and Malikhedi have **no live sensor** on purpose (mirroring the data gap); their state is hidden until a test team is sent. Every parameter is an assumption and is listed in `docs/METHOD-LIVE.md`. Everything on the screen carries a "SIMULATED" badge.
- **One screen**: sim clock and speed, alert feed, seven live ghat tiles, a detail drawer, and tabs for the ranked plan, dispatch, sitrep and models. The phase 1 pages still exist at their old URLs.
- **Voice**: click "Enable voice" once (Chrome requires a user gesture). Alerts of high severity and above and the sitrep are spoken in the selected language. Hindi speech needs a Hindi voice on the machine (Windows: Settings → Time & language → Language → add Hindi with the speech pack; Chrome also offers an online Hindi voice when connected). Without one the English text is spoken and the UI says so. Commands can be typed in the command box; the microphone button appears when the browser supports speech recognition (Chrome, online).
- **If the API is down** the screen runs on a built-in demo generator that emits the same message shapes, so the demo never looks dead. The connection pill tells you which source is active.

_Phase 2 results (tests, calibration error, alert codes) are filled in at the end of this section after integration._

## How to run (5 steps)

```bash
# 1. clone
git clone <REPO_URL> && cd <REPO_DIR>

# 2. backend: install, build artifacts (trains the 4 models + CQL, ~1–3 min on CPU)
cd backend && pip install -r requirements.txt && python scripts/build_artifacts.py

# 3. start the API
uvicorn ghatwatch.api:app --port 8000

# 4. frontend (new terminal)
cd frontend && npm install && npm run dev

# 5. open
http://localhost:3000
```

No API key is needed. The frontend falls back to the committed JSON snapshot in `frontend/public/data/` if the API is down. Python 3.12 and Node 20+.

## Result on the current data (built 11 Oct 2026)

| Rank | Ghat | Tier | Score | Coverage | Why |
|---|---|---|---|---|---|
| 1 | Bairagarh (Sant Hirdaram) kund | Insufficient data | 0.46 | 72% | No Durga 2025 table. DO 0 mg/l during Ganesh 2025 (2025 report p. 28). |
| 2 | Malikhedi kund | Insufficient data | 0.26 | 72% | No Durga 2025 table. DO 0.6 mg/l during Ganesh 2025 (p. 29). |
| 3 | Shahpura lake ghat | High | 0.27 | 100% | DO 2.5–2.8 mg/l, BOD 10.4–11.4 in Durga 2025 (p. 65). |
| 4 | Rani Kamlapati ghat / Kamla Park kund | High | 0.21 | 100% | DO 2.4–2.6 mg/l in all three Durga 2025 phases (p. 64). |
| 5 | Hathaikheda dam / kund | Medium | 0.20 | 100% | DO always ≥ 5, but BOD above 3 in 12 of 12 readings since 2024, median 7 mg/l; BOD 22, COD 177.8 after Ganesh 2024 (2024 report p. 71). |
| 6 | Khatlapura ghat | Low | 0.15 | 98% | BOD still above 3 in 12 of 12 readings since 2024 (median 5.8); DO 4.0–4.6 and chromium 1.98 mg/l in Ganesh 2024 (p. 69). |
| 7 | Prempura ghat | Low | 0.05 | 93% | Lowest BOD of the seven; DO 3.9 during Ganesh 2024 (p. 70). |

"Low" means lower than the other ghats, not clean: every ghat failed the BOD limit in most recent tests.

Forecast model leaderboard (544 statewide records, GroupKFold by site / 2025 hold-out):

| Model | CV AUC | 2025 AUC | PR-AUC | Brier |
|---|---|---|---|---|
| Logistic regression | 0.814 | 0.803 | 0.791 | 0.176 |
| **Random forest (champion)** | **0.886** | **0.854** | **0.871** | **0.145** |
| XGBoost | 0.873 | 0.836 | 0.855 | 0.153 |
| LightGBM | 0.874 | 0.842 | 0.856 | 0.152 |

The forecast puts all seven Bhopal ghats at 0.89–0.98 probability of breaching during/after immersion, so it confirms the picture but does not separate the ghats. It is shown next to the ranking, never used inside it.

CQL (experimental) policy values in the simulator, higher is better: CQL −13.25, rule heuristic −13.59, do-nothing −14.23, random −16.44.

## What works and what doesn't

**Works**
- Deterministic ranking, reasons with page citations, data-gap panel, action chips, bilingual brief, evidence table with PDF deep links, what-if entry (known ghat or new kund), 4-model leaderboard with champion serving, CQL allocation (experimental), action-log export, static fallback when the API is down.
- Verified: 8 backend invariant tests pass; every API route returns 200; frontend lint and production build pass; all routes render with the live API and with the static snapshot.

**Doesn't / limits**
- The reports print no units; units are the standard ones for each test (as in the data pack).
- Only 4 metals were tested; there is no CPCB bathing limit for metals, COD, solids, turbidity or conductivity, so they are shown as context, not scored.
- "Rani Kamlapati ghat / Kamla Park kund" may be two places (site match confidence: medium). Treated as one site with a visible caveat.
- The forecast model is trained on 544 records; treat probabilities as indicative. The CQL policy is trained on a simulator, not on logged interventions; it is a suggestion, not a learned policy from real outcomes. We propose BMC log 2026 actions (the app exports an action log) so next year it can be trained on real data.
- We report readings against limits. We do not claim health effects.

## Data used

Everything comes from the track data pack (public MPPCB reports and CPCB criteria). No other data was added.

| Source | Link |
|---|---|
| MPPCB Ganesh and Durga Visarjan Report 2025 | https://www.mppcb.mp.gov.in/proc/mon/Ganesh_and_Durga_visarjan_report-2025.pdf |
| MPPCB Ganesh and Durga Visarjan Report 2024 | https://www.mppcb.mp.gov.in/proc/mon/Ganesh_and_Durga_visarjan_report-2024.pdf |
| MPPCB Idol Immersion Report 2023 (CPCB format) | https://www.mppcb.mp.gov.in/proc/mon/Idol_immer._Report_23_CPCB.pdf |
| CPCB water quality criteria | https://cpcb.gov.in/water-quality-criteria/ |
| NGT ban and new BMC ghats (Free Press Journal, 26 Feb 2026) | https://www.freepressjournal.in/amp/bhopal/mp-news-idol-immersion-to-shift-from-lakes-to-safer-sites-ngt-ban-pushes-bmc-to-build-4-dedicated-ghats |
| Durga visarjan date 2026 (Drik Panchang) | https://www.drikpanchang.com/navratri/durga-puja/durga-visarjan-date-time.html?year=2026 |

IS 10500 drinking-water limits are mentioned in `docs/METHOD.md` as reference only; they are not used in scoring.

## Repository layout

```
track-2-visarjan-ghat-watch/   the data pack, untouched
backend/                       Python 3.12 · FastAPI · scoring, ML (4 models), CQL, brief
frontend/                      Next.js 16 · action sheet, evidence, brief, what-if, models
docs/PLAN.md                   the build plan
docs/METHOD.md                 scoring rules, class B rationale, ML + CQL caveats
```

## Method in one paragraph

Each DO, BOD and pH reading gets an exceedance in 0–1 (DO: `(5 − v)/5`; BOD: `(v − 3)/9`; pH: distance outside 6.5–8.5). A ghat's score is the weighted mean of exceedances (DO 0.45, BOD 0.40, pH 0.15; 2025 weighs 1.0, 2024 0.75, 2023 0.5; during and after weigh 1.0, pre 0.5). Coverage below 50% or a missing Durga 2025 table → "Insufficient data". Any DO = 0 in 2024–25, DO < 3 in Durga 2025, or score ≥ 0.45 → High; score ≥ 0.25, or BOD above the limit in two-thirds of readings since 2024 with a median of 6 mg/l or more → Medium; else Low. Full detail in [docs/METHOD.md](docs/METHOD.md).

## Demo

_TODO: link to the 2-minute screen recording._

## License

MIT — see [LICENSE](LICENSE). The code is offered to the Government of Madhya Pradesh through MPSeDC.
