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
- **Demo links**: `http://localhost:3000/?lang=hi` opens in Hindi, `?ghat=shahpura` opens a ghat's drawer, `/#dispatch`, `/#sitrep`, `/#models` open a tab. The demo moment: send a test team to Bairagarh from the Dispatch tab (or type `send test team to bairagarh`) and watch its hidden dissolved oxygen near 0 appear about 27 sim-minutes later.
- **Hand checks before the demo** (headless verification cannot cover audio): click "Enable voice" and confirm you hear the confirmation; switch to हिन्दी and press Speak on an alert; press "Talk", allow the microphone, say "status Shahpura".

**Phase 2 verification (11 Oct 2026):** 17 backend tests pass (9 live + 8 phase 1). Over a WebSocket run at 600× each tick carried every simulated point (about 20 per sensored ghat per 10 sim-minutes, 12–14 KB per tick), Bairagarh and Malikhedi stayed `null` until a test team arrived, and the alert codes seen were `DO_LOW` (up to critical), `DO_ETA_60`, `DO_FALLING_FAST`, `BOD_HIGH`, `IDOL_SURGE`, `SENSOR_STALE`, plus baseline `DO_LOW` and `NO_SENSOR` at t0. Scenarios: `ban_enforced` (default), `ban_not_enforced`, `aerators_prepositioned`, `heavy_rain`.

**Calibration-lite, stated plainly:** the per-idol leachable BOD load was fitted on the 5 sensored ghats for Durga 2025 pre→during. BOD-change error 0.38 mg/l against 1.68 for a no-change baseline. The out-of-fit checks are weak: DO-change error 0.91 against a 0.60 no-change baseline, turbidity 12.1 against 12.6. This is a sanity check on one festival, not validation. Kund parameters remain uncalibrated defaults because no kund has a sensor.

## Report intake (phase 3): PDF, photo or manual entry → OCR → review → re-rank

New readings reach the ranking three ways: drop an MPPCB PDF (text or scanned), photograph a report table on a phone, or type values by hand. Five processing stages run and show their logs: Extractor (pypdf layout text, or PaddleOCR for scans and photos), Normaliser (parameter and site aliases, BDL / `*` / blank codes, assumed units), Validator (plausibility bounds, duplicates against the pack, completeness, confidence), Analyst (CPCB class B per reading, before → after re-ranking with the new rows, the four-model forecast on the new pre-immersion values with the champion served and all four shown, an allocation hint), Reporter (bilingual intake report). Nothing enters the ranking until the officer reviews the extracted table, with OCR confidence per cell, and presses Accept. Accepted rows are stored apart from the official pack and are labelled "officer-added, not yet verified by MPPCB" wherever they influence a rank.

- **OCR** runs PaddleOCR in an isolated environment, `backend/.ocr-venv`, so the main backend never depends on it. If the environment is missing, text PDFs and manual entry still work and the UI says OCR is not installed. To enable: `python -m venv backend/.ocr-venv && backend/.ocr-venv/Scripts/pip install paddlepaddle paddleocr pypdfium2` (the first OCR run downloads the PP-OCRv5 models).
- **Map**: the command center now shows OpenStreetMap tiles (CARTO dark style) with the ghats as live markers. Positions are approximate. Offline, the schematic map takes over automatically.

**Phase 3 verification (11 Oct 2026):** 24 backend tests (8 phase 1, 9 live, 7 intake; the slow OCR test is opt-in with `GHATWATCH_RUN_OCR_TEST=1`). The text-PDF parser reproduces the data pack exactly: 453 of 453 Bhopal rows for 2025 (pages 28–30 and 64–65) and 273 of 273 for the 2024 Ganesh layout (pages 69–72). OCR on a 150-dpi render of the 2025 report page 28 recovered 117 of 117 pack values (mean confidence 0.994) using PP-OCRv5 mobile models with oneDNN disabled, in about 2 minutes per full page on this laptop CPU (112 s measured end to end through the intake API with nothing else running; up to 3.5 minutes under load); a photo of a single table is proportionally faster. The 2023 CPCB-format report layout, phone photos and Hindi-script tables are not yet verified.

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
- Live mode: simulator, stream processor, escalating alerts, dispatch with effects fed back into the simulation, live sitrep, WebSocket feed with polling and demo-generator fallbacks, dark single-screen command center in English and Hindi, spoken alerts and sitrep, typed and spoken commands.
- Verified: 17 backend tests pass (8 phase 1 invariants, 9 live); every API route returns 200; frontend lint and production build pass; all routes render with the live API, with the static snapshot and with the demo generator; screenshots checked at 1440 px and 390 px in both languages.

**Not verified by machine (check by hand in Chrome)**
- Actual audio output, Hindi voice quality, interruption timing, and the microphone flow. Headless checks covered voice selection and queue logic only.
- The brief's light print stylesheet after the dark-theme change.

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
backend/ghatwatch/live/        real-time pipeline: simulator, processor, alerts, dispatch, sitrep, commands, WebSocket
frontend/                      Next.js 16 · dark live command center at /, classic pages under (classic)/
docs/PLAN.md · PLAN-LIVE.md    the phase 1 and phase 2 plans (phase 2 includes the Opus review amendments)
docs/METHOD.md · METHOD-LIVE.md  scoring rules and class B rationale · every simulator assumption and the calibration result
```

## Method in one paragraph

Each DO, BOD and pH reading gets an exceedance in 0–1 (DO: `(5 − v)/5`; BOD: `(v − 3)/9`; pH: distance outside 6.5–8.5). A ghat's score is the weighted mean of exceedances (DO 0.45, BOD 0.40, pH 0.15; 2025 weighs 1.0, 2024 0.75, 2023 0.5; during and after weigh 1.0, pre 0.5). Coverage below 50% or a missing Durga 2025 table → "Insufficient data". Any DO = 0 in 2024–25, DO < 3 in Durga 2025, or score ≥ 0.45 → High; score ≥ 0.25, or BOD above the limit in two-thirds of readings since 2024 with a median of 6 mg/l or more → Medium; else Low. Full detail in [docs/METHOD.md](docs/METHOD.md).

## Demo

_TODO: link to the 2-minute screen recording._

## License

MIT — see [LICENSE](LICENSE). The code is offered to the Government of Madhya Pradesh through MPSeDC.
