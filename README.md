# Ghat Watch — घाट वॉच

**Track 2: Visarjan Ghat Watch** · Claude Impact Lab × Cerebras Café Compute, Bhopal · 11 October 2026

## What the officer does (one workflow)

1. **Dashboard (`/`).** Shows days left until 20 October, 4 headline numbers (DO below limit 42/116, BOD above limit 100/112, ghats needing action, days left) and a chart of limit breaches by festival and phase (DO / BOD / pH). Beside the chart: the breach forecast and the map with a Map / Satellite switch. Below: the alerts, and the **ghat priority table**, where each ghat has its status (Danger, Watch, Lower risk, Not tested), the reading that set it against the limit, the report page link, the actions and a **सुनें / Listen** button. Export CSV and Download brief are at the top. Hindi or English.
2. **ML Insights (second item in the sidebar, `/models`).** The 4-model leaderboard, what drives the forecast, each ghat's forecast with how far the 4 models agree, and a plain "how to read this" panel. The forecast is a model estimate and is not used in the ranking.
3. **Upload & OCR (`/intake`).** The officer uploads the 2026 test report (PDF or photo).
   - The PDF text layer, or OCR for scans and photos, extracts the table. Every value keeps its page, and suspicious values (for example DO 45) are flagged for checking.
   - **Claude then answers in seconds**, using the extracted values. The answer covers what the report shows, which ghat needs what action by when, and what is still missing. The before → after status change is shown.
   - The officer presses Accept to update the ranking.
4. **Ghat map (`/map`).** Mapbox streets or satellite when a token is set, otherwise OpenStreetMap and Esri satellite. Markers are numbered by priority and coloured by status.
5. **Brief (`/brief`).** A WhatsApp-length summary on top, with the full one-page brief in Hindi and English below it, every number with its MPPCB page. Buttons: Copy, Share on WhatsApp, Print, Listen.

## How the answer is made

- **Ranking (rules, not AI).** Each DO, BOD and pH reading is compared with the CPCB class B (outdoor bathing) limits: DO ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5. The tier rules are listed under "Method" below. The same input always gives the same rank, and every rank can be traced to readings and pages.
- **Missing is never clean.** Blank, `*`, `**`, `_` and "not sampled" never enter the score. BDL is kept as BDL. A ghat with no Durga 2025 test, or a new site without both DO and BOD, is shown as **Not tested / Test first** and listed at the top, never as low risk.
- **Alerts (rules, AI only rephrases).** DO = 0 → critical, aerate by 19 Oct. DO < 3 → aerate by 19 Oct. BOD > 6 → clean by 19 Oct. No recent test → test by 17 Oct. Suspicious value → check the page by 15 Oct. An upload that changed a tier → plan crews by 18 Oct. Each alert carries its source page.
- **AI** (details in [docs/METHOD-AI.md](docs/METHOD-AI.md)). AI never decides a score, tier or rank.
  - **Extraction order.** The PDF text layer is read first. OCR (PaddleOCR in `backend/.ocr-venv`) runs for scans and photos. Claude reads the document only as a fallback, and every value keeps its page.
  - **The answer after an upload** comes from Claude first (`claude-haiku-5-5`, fast settings), grounded on the extracted rows and the rule-based facts. Cerebras is the fallback. The screen shows the chain, for example "OCR → Claude · 1.2 s".
  - **Alert wording** comes from Cerebras first, because it is fast.
  - **Guards.** Any AI text that adds or drops a number, mentions health effects, presents the forecast as certain, or is too long is rejected, and the standard template is shown instead. The screen always says which one you are reading ("Written by AI (Cerebras, 0.4 s) · numbers checked" or "Standard text").
  - **Without API keys** everything works on the template text.
- **Voice.** ElevenLabs reads Hindi or English aloud. Units and codes are spoken as words ("मिलीग्राम प्रति लीटर", "घुलित ऑक्सीजन"). Audio is cached. Without a key, the browser's own voice is used.
- **Forecast (shown, never used in the rank).** Four models were trained on 544 statewide site-festival records. They give all seven Bhopal ghats a 0.89–0.98 chance of breaching during or after immersion, so they confirm the picture but do not separate the ghats. The forecast is labelled "model estimate, not a measurement".

## Advanced / experimental (footer link → `/lab`)

These stay out of the officer's main path:
- **Live mode:** a simulated immersion-night control room (simulator, alerts, dispatch, voice commands); every value there is SIMULATED. See [docs/METHOD-LIVE.md](docs/METHOD-LIVE.md).
- **Model leaderboard** (`/models`).
- **What-if entry** (`/whatif`).
- **Budget split suggestion:** an offline reinforcement-learning policy (CQL) trained on a simulator, not on real outcomes.

## How to run (5 steps)

```bash
# 1. clone
git clone https://github.com/nitin-inloop/Visarjan-claude-impact-lab && cd Visarjan-claude-impact-lab

# 2. backend: virtual env + dependencies (Python 3.12)
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt

# 3. optional AI keys: copy ../.env.example to backend/.env and fill ANTHROPIC_API_KEY, CEREBRAS_API_KEY, ELEVENLABS_API_KEY
#    then start the API
.venv/bin/uvicorn ghatwatch.api:app --port 8000

# 4. frontend (new terminal)
cd frontend && npm install && npm run dev

# 5. open
http://localhost:3000
```

- **No key is required.** Without keys the app uses checked template text and the browser voice.
- **If the API is down,** the frontend shows the saved snapshot in `frontend/public/data/`, and report-page links still open (the PDFs are copied into `frontend/public/pdf/` by `npm run dev` / `npm run build`).
- **Mapbox (optional):** put your public token in `frontend/.env.local` as `NEXT_PUBLIC_MAPBOX_TOKEN=pk...` and restart `npm run dev`. Without it the map uses OpenStreetMap and Esri satellite tiles.
- **Precomputed files** (ranking, brief, trained models) are committed. `python scripts/build_artifacts.py` rebuilds them; on macOS XGBoost needs `brew install libomp`.
- **Scanned PDFs and photos** need either the Claude key or PaddleOCR in `backend/.ocr-venv` (see [docs/METHOD-INTAKE.md](docs/METHOD-INTAKE.md)).
- **Sample report:** `samples/dummy/` holds a SYNTHETIC test report (text PDF, scanned PDF and photo, plus the expected values) to try the upload.

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

**Works (verified 11 Oct 2026)**
- **Ranking:** deterministic, with plain reasons and PDF page links. The brief and the cards cite the reading that set each tier. Data gaps are shown as "Not tested", never as clean.
- **Brief:** a WhatsApp-length summary plus the full brief in Hindi and English, with copy, share and print.
- **Upload (text PDF):** the synthetic sample reads 51 of 51 values correctly, including BDL, blank, `*` and a new kund. The typo DO 45 is held back for checking, not scored. Accepting re-ranks; removing restores the original ranking exactly.
- **Manual entry and what-if:** impossible values (negative, DO > 20, pH > 14) are rejected with a message.
- **Alerts and the post-upload answer:** these work on template text with no keys. With keys, the AI wording goes through the guards above (tested with mocked providers).
- **Interface:** a professional dashboard (sidebar, top bar with ghat search and alerts bell, KPI cards, charts, priority table), plus the ML Insights page and a map with Map / Satellite layers and an offline fallback. Status is always icon/colour + word, and "Not tested" is never green. Works with the API off.
- **Checks:**
  - Backend: 67 pass, 2 skipped; `test_6_models` needs `libomp` on macOS.
  - Frontend: `npm run lint` and `npm run build` pass.
  - Screens checked at 390 px and 1440 px in both languages.

**Not verified (no keys on the build machine)**
- **Real API calls:** Claude reading real or scanned MPPCB pages, real Cerebras and Claude response quality and latency, and ElevenLabs Hindi audio. All of these were tested only with mocked responses. The code falls back to template text and the browser voice on any failure.
- **OCR:** verified on the build machine (PaddleOCR 3.7). The scanned synthetic report gave 51 of 51 values, in 43 s, with mean confidence 0.986. The 2025 report page 28 gave 117 of 117 values.

**Doesn't / limits**
- **Units:** the reports print no units. Units are the standard ones for each test (as in the data pack).
- **Unscored parameters:** only 4 metals were tested. There is no CPCB bathing limit for metals, COD, solids, turbidity or conductivity, so they are shown as context, not scored. Coliform was not tested at all.
- **One site may be two:** "Rani Kamlapati ghat / Kamla Park kund" (site match confidence: medium). The Ganesh readings say Kamla Park kund and the Durga readings say Lower Lake ghat. It is scored as one site with a visible caveat.
- **Ganesh and Durga weighted equally:** readings from both festivals get the same weight, although Ganesh falls in the monsoon (more dilution).
- **Map positions are approximate:** Malikhedi and Hathaikheda could not be confirmed. On a phone, labels near the city centre overlap.
- **Forecast and budget policy:** the forecast is trained on 544 records and does not separate the Bhopal ghats. The budget policy is trained on a simulator; it is a suggestion, not learned from real outcomes.
- **No health claims:** we report readings against limits. We do not claim health effects.

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


Services used at run time (no data is taken from them): Anthropic Claude API, Cerebras inference API, ElevenLabs text-to-speech (all optional, via env keys); OpenStreetMap / Esri map tiles for the base map.

## Repository layout

```
track-2-visarjan-ghat-watch/   the data pack, untouched
backend/ghatwatch/             FastAPI: scoring.py (ranking), brief.py, data.py, limits.py
backend/ghatwatch/intake/      report upload: extract (Claude / PDF text / OCR) → normalise → validate → analyse → report
backend/ghatwatch/ai/          Claude + Cerebras clients, guards, extraction, officer answer, alerts
backend/ghatwatch/voice/       ElevenLabs text-to-speech with Hindi speech normalisation and cache
backend/ghatwatch/ml, rl, live forecast models, CQL policy, simulated live mode (experimental)
frontend/                      Next.js 16: simple home, /intake, /brief, /ghat/[slug]; /lab for experimental views
samples/dummy/                 SYNTHETIC test report for trying the upload
docs/                          METHOD.md (scoring), METHOD-AI.md, METHOD-INTAKE.md, METHOD-LIVE.md, plans
```

## Method in one paragraph

Each DO, BOD and pH reading gets an exceedance in 0–1 (DO: `(5 − v)/5`; BOD: `(v − 3)/9`; pH: distance outside 6.5–8.5). A ghat's score is the weighted mean of exceedances (DO 0.45, BOD 0.40, pH 0.15; 2025 weighs 1.0, 2024 0.75, 2023 0.5; during and after weigh 1.0, pre 0.5). Coverage below 50%, or a missing Durga 2025 table (unless 2026 Durga readings with both DO and BOD were added) → "Insufficient data" ("Test first"); a new site needs both DO and BOD before it gets any other tier; implausible values (negative, DO > 20, BOD > 500, pH outside 0–14) are held back and never scored. Any DO = 0 in 2024–25, DO < 3 in Durga 2025, or score ≥ 0.45 → High; score ≥ 0.25, or BOD above the limit in two-thirds of readings since 2024 with a median of 6 mg/l or more → Medium; else Low. Full detail in [docs/METHOD.md](docs/METHOD.md).

## Demo

_TODO: link to the 2-minute screen recording._

## License

MIT — see [LICENSE](LICENSE). The code is offered to the Government of Madhya Pradesh through MPSeDC.
