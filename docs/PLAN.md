# Ghat Watch — Build Plan (Session 1: planning)

Hackathon: Claude Impact Lab × Cerebras, Bhopal, Sunday 11 Oct 2026. Deadline 5:00 PM. Plan written 12:15 PM.
Track 2: Visarjan Ghat Watch. Data pack: `track-2-visarjan-ghat-watch/` (read-only, never modify).

## 0. One-line product

**Ghat Watch**: a one-screen action sheet that ranks Bhopal's 7 immersion ghats by water-quality risk against the CPCB Class B (outdoor bathing) limits, gives the reason for every rank in plain words with the number, year, phase and MPPCB report page behind it, shows missing data as missing, and produces a forwardable one-page brief in Hindi and English for the BMC officer planning Durga visarjan on 20 Oct 2026.

One user: the BMC officer who decides where to send aeration, cleaning crews and extra water testing.
One workflow: open → read ranked sheet → open evidence if challenged → forward brief.
One outcome: aeration/cleaning/testing goes to the right ghats before 20 Oct.

## 1. What the data actually says (verified during review)

Source: `data/bhopal_ghats_2023_2025.csv` (1,524 rows, 7 ghats, 6 festival-years, 3 phases, 13 params).

| Fact | Value | Where |
|---|---|---|
| DO readings | 116; 42 below 5 mg/l; 4 exactly 0 (all Bairagarh) | 2023 p26, p60; 2025 p28 |
| BOD readings | 112; 100 above 3 mg/l | all |
| pH readings | 115; 6 outside 6.5–8.5 (Hathaikheda 9.2 Durga 2024 pre, 8.92 Ganesh 2023 during; Khatlapura 6.49 Ganesh 2024 during; Prempura 8.53, 8.55) | |
| Conductivity > 2250 (class E) | 0 | |
| Heavy-metal spike | Ganesh 2024 only: Khatlapura during Cr 1.98, Cu 2.66, Zn 1.96; Bairagarh after Pb 1.77 | 2024 p69 |
| Durga 2025 missing | Bairagarh, Malikhedi have no table at all | 2025 p64–65 |
| Ganesh 2025 partial | Bairagarh, Malikhedi sampled only `during` (pre/after = `*`, `**`) | 2025 p28 |
| Other gaps | Prempura BOD not sampled all 3 phases Durga 2023 (+pH during); Khatlapura BOD during Durga 2023; Khatlapura 4 metals during Ganesh 2023; Suspended solids absent in Durga 2023 & Durga 2025 | |
| BDL | 174 rows, all metals | |
| Site ambiguity | Rani Kamlapati: Ganesh tables = "Kamla Park kund", Durga tables = "Lower Lake ghat" (confidence medium). Treat as one site, show the caveat | |

Worst recent readings (what the officer needs to hear first):
- Bairagarh: DO 0 during Ganesh 2025 (p28); DO 0, 0, 0 across Ganesh after 2023 / Durga pre+during 2023; BOD 13–14 Ganesh 2024; conductivity 1045–1882; **no Durga 2025 data**.
- Malikhedi: DO 0.6 during Ganesh 2025 (p28); BOD 16.8 Ganesh after 2023; **no Durga 2025 data**.
- Shahpura: DO 2.5 pre / 2.8 during Durga 2025 (p65); BOD 10.4–11.6 across 2024–25.
- Rani Kamlapati: DO 2.5 / 2.4 / 2.6 all three phases Durga 2025 (p64); BOD 8.8 during.
- Khatlapura: DO 4.0–4.6 all Ganesh 2024; metals spike Ganesh 2024 (p69).
- Hathaikheda: DO always ≥ 5.1 but BOD 22 (highest of all), COD 177.8, turbidity 193.5 Ganesh 2024 after (p71); pH 9.2.
- Prempura: lowest BOD of the seven; DO 3.9 during Ganesh 2024 only breach cluster.

Statewide file `mp_immersion_sites_2023_2025.csv` (21,600 rows): after dropping `needs_check` and page-duplicate rows → 547 site-festival-year groups, 544 with a during/after DO or BOD reading, 49.3% breach Class B, 273 unique sites. Pre-immersion pH/DO/BOD/COD/TDS/turbidity/conductivity present for ~85%. Parse outliers to null: DO > 20 (14 rows), pH > 14 (2), BOD > 500 (1), any negative. Site-type keyword breach rates: lake 0.85, kund 0.72, ghat 0.58, river 0.39, pond 0.33, dam 0.29. This is the ML training set.

Lake PDFs (`Upper_Lower_Lake_monthly_2025-26`, `Bhopal-2023-24_upper_lake`, `comparatives 2003-2023`): monthly lake-body baselines (Upper Lake DO 6–7.2, BOD 1–2.2 in 2025-26). Use only as a context line ("the lake body itself meets class B most months; the ghat does not"). Not parsed into the model; cite as a resource. Stretch only.

## 2. Judging-driven priorities

Day-one impact counts double. Jury checklist: traceable ranking, missing shown as missing, short bilingual brief, honesty about gaps.

MoSCoW:
- **Must**: deterministic ranking + reasons + page trace + gaps + actions; bilingual brief (print/copy); README with 5-step run; LICENSE; works offline with no API key.
- **Should**: What-if / 2026 pre-immersion entry that re-ranks instantly; ML champion forecast (4 models, leaderboard, best served); evidence page with PDF deep-link.
- **Could**: CQL budgeted allocation suggestion; action-log export (closes the data loop for next year); lake-baseline context line.

ML and CQL live in separate modules and must never block the Must path. If they fail, the ranking page still renders from artifacts.

## 3. Method

### 3.1 Standard
CPCB Class B (outdoor bathing, organised): pH 6.5–8.5, DO ≥ 5 mg/l, BOD ≤ 3 mg/l. Rationale: devotees and workers stand in the water at ghats; coliform is not tested so only 3 limits apply. Class C/D shown as secondary ("would it even pass the weaker DO 4 limit?") in evidence view only. No Class B limit for COD, solids, turbidity, conductivity, metals → these are **context flags**, never part of the legal breach score, and labelled "no CPCB bathing limit set".

### 3.2 Reading-level exceedance (0..1)
- DO: `clip((5 - v)/5, 0, 1)` → 0 mg/l = 1.0; 2.5 = 0.5; ≥5 = 0
- BOD: `clip((v - 3)/9, 0, 1)` → 3 = 0; 12 or more = 1.0 (four times the limit saturates)
- pH: `clip(distance_outside(6.5, 8.5), 0, 1)` → 9.2 = 0.7

### 3.3 Ghat score
Weights: parameter DO 0.45, BOD 0.40, pH 0.15. Year 2025 = 1.0, 2024 = 0.75, 2023 = 0.5. Phase during = 1.0, after = 1.0, pre = 0.5.
`score = Σ(w_p · w_y · w_ph · exceed) / Σ(w_p · w_y · w_ph)` over available DO/BOD/pH numeric readings. Blank, BDL, `*`, `**`, `_` never enter the sums.
`breach_rate = breaching readings / available readings` (DO<5, BOD>3, pH outside).
`coverage = available DO+BOD+pH readings / 54` (3 params × 3 phases × 6 festival-years). Also per-festival-year coverage for the gap panel.
`trend` = breach_rate(2025) − breach_rate(2023): ≥ +0.15 worsening, ≤ −0.15 improving, else stable (use latest/earliest available year if missing).

### 3.4 Tiers (apply in order, show the rule that fired)
1. `coverage < 0.5` or no Durga 2025 table → tier **"Insufficient data"**, displayed at the top of the sheet with a red data-gap marker, action "Test first". Score shown but labelled "on partial data". Never sorted below a Low ghat.
2. any DO = 0 in 2024–2025, or DO < 3 in Durga 2025, or `score ≥ 0.45` → **High**
3. `score ≥ 0.25` → **Medium**
3b. BOD above 3 mg/l in ≥ 2/3 of readings since 2024 (at least 6 readings) with median ≥ 6 mg/l → **Medium** (persistent-BOD floor; added at integration so a ghat failing BOD in nearly every recent test, e.g. Hathaikheda, is never labelled Low)
4. else **Low**
Sort: Insufficient-data ghats first (by score desc), then High, Medium, Low by score desc.

### 3.5 Reasons (plain words, templated, every one carries a citation)
Top 3 contributions by `w·exceed`, each rendered as:
EN: "Dissolved oxygen was 0 mg/l during Ganesh 2025. The bathing limit is at least 5 mg/l. Source: MPPCB 2025 report, page 28."
HI: "गणेश 2025 के विसर्जन के दौरान घुलित ऑक्सीजन 0 mg/l थी। स्नान मानक कम से कम 5 mg/l है। स्रोत: MPPCB 2025 रिपोर्ट, पृष्ठ 28।"
Plus up to 2 context flags (metals / COD / turbidity "highest of the 7 ghats" with value, phase, page) and 1 gap line ("No Durga 2025 test exists for this ghat").

### 3.6 Actions (derived, shown as chips)
- DO share of score ≥ 0.5 or any DO < 3 in 2024–25 → **Aerate**: floating aerators + DO spot checks on immersion day and day+7.
- BOD/COD/turbidity flags → **Clean**: nirmalya collection point + extra cleaning crew before and after.
- Insufficient data → **Test first**: pre-immersion sample by 17 Oct, all three phases this year.
- Metals spike in history → **Sample metals** during + after.
- Upper/Lower Lake ghats (Bairagarh, Prempura, Khatlapura, Rani Kamlapati) → banner: NGT ban on lake immersion; route idols to designated kunds; keep baseline testing. (Source: Free Press Journal 26 Feb 2026, from the pack.)

### 3.7 ML forecast (Should) — "4 algorithms, serve the champion"
Task: `P(breach)` = any DO < 5 or BOD > 3 in during/after, given pre-immersion readings and site context. Train on statewide (544 rows).
Features: pre pH, DO, BOD, COD, TS, TDS, turbidity, conductivity (NaN allowed); site-type one-hots from name keywords (river, lake, talab, kund, pond, dam, ghat, temporary); festival; year; regional office (normalised: strip spaces/dots, top-10 one-hot + other); site prior-year breach rate (computed only from earlier years; NaN for first year). No during/after features (leakage).
Models: `LogisticRegression` (impute median + missing indicators + scaler), `RandomForestClassifier`, `XGBClassifier`, `LGBMClassifier`. Fixed sensible hyperparameters; optional 15-iteration random search if under 10 min total.
Validation: (a) GroupKFold(5) by site_key over all years; (b) temporal: train 2023–24, test 2025. Metrics: ROC-AUC, PR-AUC, Brier, log-loss, F1@0.5.
Champion = best mean GroupKFold ROC-AUC, tie-break lower Brier. Refit on all rows. Save `artifacts/models/leaderboard.json`, `champion.joblib`, per-model `.joblib`, feature importances (SHAP TreeExplainer for RF/XGB/LGBM, coefficients for LR).
Serve: `/api/forecast` returns champion name, probability, top-3 reasons, and all four model probabilities ("model agreement"). `GHATWATCH_MODEL` env var overrides champion.
Bhopal application: for each ghat use the latest available pre readings (Durga 2025, else Ganesh 2025, else 2024) → "Durga 2026 outlook". What-if endpoint recomputes with officer-entered 2026 pre values. UI label: "Model estimate from 544 MP site-festival records (2023–25). Not a measurement."

### 3.8 CQL allocation (Could) — honest framing
No intervention is logged anywhere in the pack, so offline RL cannot learn from real action outcomes. We therefore (1) build a small simulator calibrated on the data, (2) log transitions from a mixed-quality behaviour policy, (3) train tabular discrete **Conservative Q-Learning** on that fixed log, (4) compare its policy value against random / heuristic / do-nothing in the simulator, (5) use it only to suggest how to split a fixed budget across ghats. All of this is labelled experimental in UI and README, and the README proposes BMC log 2026 actions so next year it trains on real transitions (the app's action-log export is that data-collection form).
Spec: per-ghat state = (do_tier ∈{≥5, 3–5, <3}, bod_tier ∈{≤3, 3–8, >8}, known ∈{0,1}, trend ∈{0,1,2}) → 54 states. Actions = none(0), test(1), clean(2), aerate(3), clean+aerate(5) with costs in brackets. Two steps per episode (pre-festival, immersion day). Breach probability per state from empirical statewide rates (fallback: ML champion); aerate ×0.6 on DO-breach prob, clean ×0.7 on BOD-breach prob, test sets known=1 and removes the unknown-state penalty. Reward = −10·P(breach) − cost. Behaviour policy: 30% random, 50% heuristic, 20% do-nothing → 20k transitions, seed 42. CQL: Q[54×5], loss = TD + α·(logsumexp_a Q(s,·) − Q(s,a_log)), α = 1.0, lr 0.1, 300 epochs, numpy only. Budget allocation: greedy by (Q(s,a) − Q(s,none))/cost until budget exhausted. Outputs `artifacts/rl/cql_report.json` (policy values, per-state greedy action) and `/api/allocate?budget=N`.

### 3.9 Brief (Must)
Templated bilingual text, no LLM required. Structure (≤ 1 A4 page each language):
1. Title: "Durga Visarjan 2026 — Ghat water-quality risk brief" / "दुर्गा विसर्जन 2026 — घाट जल-गुणवत्ता जोखिम सार". Date, prepared from MPPCB reports 2023–25.
2. Two-sentence situation (counts of readings below DO 5 / above BOD 3).
3. Ranked list: ghat — tier — one reason with number and page — action chip.
4. Data gaps in one paragraph.
5. Footer: standard used (CPCB class B), "readings reported against limits; no health effects claimed", sources with page ranges, NGT note.
If `ANTHROPIC_API_KEY` or `CEREBRAS_API_KEY` is present, an optional "polish" pass may rewrite for fluency but must keep every number and citation (diff-check numbers before accepting). Default off. No keys in code; `.env.example` only.

## 4. Architecture

```
D:\Visarjan                      ← repo root (git init here; MIT)
├── track-2-visarjan-ghat-watch/ ← data pack, untouched
├── backend/                     ← Python 3.12, FastAPI
│   ├── ghatwatch/
│   │   ├── data.py        load/clean both CSVs, site slugs, outlier nulling, BDL handling
│   │   ├── limits.py      CPCB classes from csv
│   │   ├── scoring.py     exceedance, score, tiers, reasons (en/hi), gaps, actions, trend
│   │   ├── brief.py       bilingual brief (markdown + plain text), optional LLM polish
│   │   ├── ml/ dataset.py train.py predict.py
│   │   ├── rl/ simulator.py cql.py allocate.py
│   │   └── api.py         FastAPI app, CORS, static /pdf
│   ├── scripts/build_artifacts.py   → backend/artifacts/*.json + copies to frontend/public/data/
│   ├── tests/             pytest: invariants (see §6)
│   ├── artifacts/         committed JSON (ranking, reasons, gaps, brief, leaderboard, cql_report); models/*.joblib
│   └── requirements.txt
├── frontend/                    ← Next.js 16, App Router, TypeScript, Tailwind
│   ├── app/ page.tsx (action sheet) · ghat/[slug]/page.tsx (evidence) · brief/page.tsx · whatif/page.tsx · models/page.tsx
│   ├── components/  RankCard, TierBadge, ReasonLine, GapPanel, ActionChips, ReadingsTable, Sparkline, LangToggle, PdfLink
│   ├── lib/api.ts (fetch API, fallback to /public/data/*.json) · lib/i18n.ts
│   └── public/data/*.json (copied artifacts) · public/pdf/ (copied PDFs)
├── docs/ PLAN.md · METHOD.md (scoring rules, class B rationale, ML+CQL caveats, what works / doesn't)
├── README.md · LICENSE (MIT) · .env.example · .gitignore
```

Site slugs: `bairagarh`, `khatlapura`, `prempura`, `rani-kamlapati`, `hathaikheda`, `malikhedi`, `shahpura`.
PDF names → ids: `2023` = Idol_immer._Report_23_CPCB.pdf, `2024` = Ganesh_and_Durga_visarjan_report-2024.pdf, `2025` = Ganesh_and_Durga_visarjan_report-2025.pdf. Deep link: `/pdf/2025.pdf#page=28` (serve from `resources/` via FastAPI StaticFiles and also copy into `frontend/public/pdf/` so the static build works).

## 5. API contract (frontend and backend both code to this)

All responses JSON, UTF-8. Text fields are returned as `{en, hi}` objects so the UI can toggle without refetch.

`GET /api/ranking`
```json
{ "generated_at": "2026-10-11T13:00:00+05:30", "standard": "CPCB class B (outdoor bathing)",
  "weights": {"param": {"DO":0.45,"BOD":0.40,"pH":0.15}, "year": {"2025":1.0,"2024":0.75,"2023":0.5}, "phase": {"pre":0.5,"during":1.0,"after":1.0}},
  "summary": {"do_readings":116,"do_below_5":42,"do_zero":4,"bod_readings":112,"bod_above_3":100,"ph_readings":115,"ph_outside":6},
  "ghats": [ {
    "slug":"bairagarh", "name":{"en":"Bairagarh (Sant Hirdaram) kund","hi":"बैरागढ़ (संत हिरदाराम) कुंड"},
    "water_body":"Upper Lake", "ngt_lake_ban": true, "site_confidence":"high",
    "rank":1, "tier":"insufficient_data|high|medium|low", "tier_rule":{"en":"...","hi":"..."},
    "score":0.71, "breach_rate":0.83, "coverage":0.57, "trend":"worsening|stable|improving",
    "readings_available": 31, "readings_expected": 54,
    "reasons":[ {"kind":"breach|context|gap", "parameter":"Dissolved oxygen", "value":0.0, "unit":"mg/l", "limit":"≥ 5",
                 "year":2025, "festival":"Ganesh", "phase":"during", "source":{"report":"MPPCB 2025","pdf":"2025","page":28},
                 "text":{"en":"...","hi":"..."} } ],
    "actions":[ {"code":"aerate|clean|test_first|sample_metals|lake_ban", "text":{"en":"...","hi":"..."}} ],
    "forecast": {"available":true, "champion":"lightgbm", "p_breach":0.82, "models":{"logreg":0.77,"random_forest":0.80,"xgboost":0.84,"lightgbm":0.82},
                 "basis":{"year":2025,"festival":"Ganesh","phase":"pre"}, "top_reasons":[{"feature":"pre_do","direction":"up","text":{"en":"..","hi":".."}}]}
  } ] }
```
`GET /api/ghats/{slug}` → the ranking entry plus `"readings": [ {year, festival, phase, parameter, value, unit, flag, value_as_printed, limit_class_b, status:"breach|ok|no_limit|missing", page, pdf} ]` and `"gaps": [ {year, festival, phase|null, parameters:[...], text:{en,hi}} ]` and `"series": {"Dissolved oxygen":[{label:"Ganesh 2023 pre", value:5.6}, ...], "BOD":[...]}`.
`GET /api/gaps` → all gaps across ghats, grouped by ghat.
`GET /api/brief` → `{ "markdown": {"en": "...", "hi": "..."}, "plain": {"en":"...","hi":"..."}, "generated_at": "..." }`.
`POST /api/whatif` body `{ "slug":"shahpura", "pre": {"pH":7.6,"DO":3.1,"BOD":6.2,"COD":40,"TDS":300,"turbidity":20,"conductivity":480} }` → `{ "score_with_2026": ..., "tier": ..., "forecast": {...}, "reasons":[...] }` (treat entered values as year 2026 Durga pre, weight 1.0). Also accepts `{"new_site": {"name":"...", "water_body":"..."}, "pre": {...}}` for a new BMC kund, scored on entered values only.
`GET /api/models/leaderboard` → `{ "champion":"lightgbm", "selection_rule":"...", "rows":[{"model":"lightgbm","auc_groupkfold":0.81,"auc_temporal_2025":0.78,"pr_auc":..,"brier":..,"logloss":..,"f1":..}], "n_train":544, "features":[...], "importances":{"lightgbm":[{"feature":"pre_do","importance":..}]} }`.
`GET /api/allocate?budget=8` → `{ "experimental":true, "budget":8, "plan":[{"slug":"bairagarh","action":"test","cost":1,"q_gain":..}], "policy_values":{"cql":..,"heuristic":..,"random":..,"do_nothing":..}, "caveat":{"en":"..","hi":".."} }`.
`GET /api/health` → `{status:"ok", artifacts_built_at}`.
Static: `GET /pdf/{2023|2024|2025}.pdf`.

Frontend fallback: `lib/api.ts` tries `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`), on failure loads `/data/ranking.json`, `/data/ghats/{slug}.json`, `/data/brief.json`, `/data/leaderboard.json`, `/data/allocate.json`. What-if degrades to a client-side recompute of the deterministic score only (port §3.2–3.4 to TS in `lib/score.ts`; same constants).

## 6. Tests (pytest, must pass before push)
1. Every reason has a `page` and `pdf`, and the (year, festival, site, phase, parameter, value) exists in the CSV with that page.
2. No ghat with `coverage < 0.5` has tier `low` or `medium`; insufficient-data ghats sort first.
3. Rows with flag in {BDL, not sampled, *, **} never contribute to score or breach_rate.
4. Bairagarh tier is `insufficient_data` and score ≥ 0.45; Prempura score < Shahpura score (sanity against the data).
5. `score ∈ [0,1]`, `breach_rate ∈ [0,1]` for all; what-if with DO = 0 raises score.
6. Leaderboard has 4 rows, champion present; `predict` returns 4 probabilities in [0,1].
7. CQL policy value ≥ do-nothing policy value in the simulator (else fail loudly and the API marks allocate unavailable).
8. Brief contains all 7 ghat names in both languages and the string "page"/"पृष्ठ".

## 7. Frontend spec (Next.js)
- Stack: Next 16, App Router, TypeScript, Tailwind, no UI kit. Fonts: Inter + Noto Sans Devanagari (next/font/google; fall back to system if offline). `lang` toggle in header persists in localStorage; all strings via `lib/i18n.ts` dictionary.
- `/` Action sheet: header (title, date, "Durga visarjan: 20 Oct 2026 · 9 days", standard used), a 2-line summary with the two headline counts, then 7 rank cards. Card: rank, name (+ water body, NGT badge, confidence badge), tier badge with rule tooltip, score bar, trend arrow, 3 reason lines each ending in a "p.28 ↗" PDF link, action chips, data-gap line in red when applicable. Insufficient-data cards have a distinct dashed border. Buttons: "Open brief", "Enter 2026 readings", "Evidence".
- `/ghat/[slug]` Evidence: readings table (year/festival/phase × parameter), cell colour by status, blanks rendered as "not sampled" (never 0), BDL as "BDL", page link per row group; DO and BOD sparklines across the 18 festival-phase points with the limit line; forecast panel with champion + model-agreement row + top reasons; gaps list.
- `/brief` Brief: side-by-side or toggled EN/HI, "Copy", "Print / Save PDF" (print stylesheet, A4), "Download .md".
- `/whatif` 2026 entry: pick ghat, enter pre readings, see new score/tier/forecast next to the current one; explain what moved and why; "Add new ghat" (name + water body) for the new BMC kunds, scored on entered values only and labelled "2026 data only".
- `/models` For the jury: leaderboard table, champion rule, importances bar list, CQL comparison table with the caveat paragraph.
- Mobile-first (officer on phone); print styles for `/` and `/brief`. Accessibility: tier is never colour-only (icon + label).

## 8. Run in 5 steps (README target)
1. `git clone <repo> && cd <repo>`
2. `cd backend && pip install -r requirements.txt && python scripts/build_artifacts.py` (trains the 4 models and CQL, writes artifacts, ~1–3 min)
3. `uvicorn ghatwatch.api:app --port 8000`
4. `cd ../frontend && npm install && npm run dev`
5. Open http://localhost:3000. (No API key needed. Optional `.env` for LLM polish.)

## 9. Session 2 split (Opus 5.5 agents, parallel, then I integrate)
- **Agent A (backend)**: §3, §4 backend, §5, §6, artifacts, `docs/METHOD.md`, LICENSE. Work only in `backend/`, `docs/`, root files.
- **Agent B (frontend)**: §7 against §5 contract with hand-written mock JSON under `frontend/public/data/` matching the contract exactly (replaced by real artifacts at integration). Work only in `frontend/`.
- **Integration (me)**: run build_artifacts, start API, `npm run build`, smoke every route, run pytest, fix contract drift, write README (team placeholders), git init + commit, hand the `gh repo create --public` command to the user.

Timeline: 12:20 launch → 14:15 agents report → 14:15–15:15 integrate/fix → 15:15–15:45 README/push-ready → 16:00 user records demo → 17:00 submit.

## 10. Decisions taken without asking (change if wrong)
- Repo root is `D:\Visarjan`; MIT licence; product name "Ghat Watch".
- CPCB Class B as the standard; Class C/D only as secondary context.
- Rani Kamlapati treated as one site with a visible "may be two places" caveat.
- Statewide file used only for ML training and context percentiles, never shown as Bhopal evidence.
- No LLM required at runtime; brief is templated. LLM polish is optional and off by default.
- Metals: reported as context with "no CPCB bathing limit"; IS 10500 drinking-water limits mentioned only in METHOD.md as reference, not used for scoring.
- Team name/members left as placeholders in README for the user to fill.
