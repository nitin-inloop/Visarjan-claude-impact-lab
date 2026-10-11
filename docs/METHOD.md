# Ghat Watch — Method

This document explains how Ghat Watch turns the MPPCB immersion reports into a ranked action sheet. Everything here is implemented in `backend/ghatwatch/` and checked by `backend/tests/test_invariants.py`.

## 1. Data used

| Source | Use |
|---|---|
| `data/bhopal_ghats_2023_2025.csv` (1,524 rows, 7 ghats, 2023–2025, Ganesh + Durga, pre / during / after) | All Bhopal evidence, the score, reasons, gaps, the brief |
| `data/cpcb_water_quality_criteria.csv` | Class B limits (class C and D shown as secondary context in the evidence view) |
| `data/mp_immersion_sites_2023_2025.csv` (21,600 rows) | ML training set and simulator calibration only. Never shown as Bhopal evidence |
| `resources/*.pdf` (MPPCB reports 2023, 2024, 2025) | Served at `/pdf/2023.pdf` etc. so every reason links to its page |

No public data beyond the pack was used. IS 10500 (drinking-water) metal limits are mentioned below as a reference only and do not enter any calculation.

Headline counts, recomputed from the CSV on every build: 116 dissolved-oxygen (DO) readings, 42 below 5 mg/l, 4 exactly 0 (all Bairagarh); 112 BOD readings, 100 above 3 mg/l; 115 pH readings, 6 outside 6.5–8.5. These are tested in `test_4`.

## 2. Why CPCB class B

Devotees, priests and workers stand in the water at a ghat, so the relevant designated best use is **class B, outdoor bathing (organised)**: pH 6.5–8.5, DO at least 5 mg/l, BOD at most 3 mg/l. Class B also sets total coliform ≤ 500 MPN/100 ml, but the reports do not test coliform, so only the three limits above can be applied.

COD, total / dissolved / suspended solids, turbidity, conductivity and metals (chromium, lead, zinc, copper) have **no class B limit**. They are shown as context flags labelled "no CPCB bathing limit set" and never enter the breach score. Conductivity never exceeds the class E cap (2,250 µS/cm). For orientation only: IS 10500 drinking-water limits for these metals are far below the Ganesh 2024 spike values (e.g. Pb 1.77 mg/l at Bairagarh), but IS 10500 is a drinking-water standard and is not used for scoring.

## 3. How blanks, BDL, `*`, `**`, `_` are treated

| As printed | `flag` | Treatment |
|---|---|---|
| number | – | numeric reading |
| `BDL` / `ND` | BDL / ND | not a number, shown as "BDL"; very low but **not 0**; never scored (all BDL rows are metals, which have no class B limit anyway) |
| blank, `_`, `-` | not sampled | missing; shown as "not sampled"; listed as a gap; **never clean, never 0** |
| `*`, `**` | `*` / `**` | the whole phase was not sampled; listed as a phase gap |
| no table in the report | – | whole festival-year missing (Bairagarh and Malikhedi, Durga 2025); listed as a gap; forces tier "Insufficient data" |

Blank cells with no flag in the CSV (the Ganesh 2025 pre/after rows at Bairagarh and Malikhedi, sitting under a `*`/`**` column) are given the flag `not sampled` on load. The conductivity unit mojibake in the CSV is normalised to `µS/cm`.

Statewide file cleaning (ML only): 879 `needs_check` rows dropped; 603 page-duplicate rows (same year, festival, site, phase, parameter) dropped; implausible values set to null and counted: DO > 20 (14), pH > 14 or < 0 (2), BOD > 500 (1), other negatives (0). Result: 547 site-festival-year groups, 544 with a during/after DO or BOD reading, 49.3% breach class B.

## 4. Scoring

### 4.1 Reading-level exceedance (0 to 1)

- DO: `clip((5 − v) / 5, 0, 1)` — 0 mg/l → 1.0; 2.5 → 0.5; ≥ 5 → 0
- BOD: `clip((v − 3) / 9, 0, 1)` — 3 → 0; 12 or more (four times the limit) → 1.0
- pH: `clip(distance outside 6.5–8.5, 0, 1)` — 9.2 → 0.7

### 4.2 Ghat score

Weights: parameter DO 0.45, BOD 0.40, pH 0.15; year 2025 = 1.0, 2024 = 0.75, 2023 = 0.5; phase during = 1.0, after = 1.0, pre = 0.5.

`score = Σ(w_param · w_year · w_phase · exceedance) / Σ(w_param · w_year · w_phase)` over the available numeric DO / BOD / pH readings only.

- `breach_rate` = breaching readings / available readings (DO < 5, BOD > 3, pH outside 6.5–8.5).
- `coverage` = available DO + BOD + pH readings / 54 (3 parameters × 3 phases × 6 festival-years). Per-table coverage is also reported.
- `trend` = breach rate of the latest year minus the earliest year: ≥ +0.15 worsening, ≤ −0.15 improving, else stable.

### 4.3 Tiers (applied in order; the rule that fired is shown on the card)

1. `coverage < 0.5` or no Durga 2025 table → **Insufficient data** (action "Test first"; score shown as "on partial data"; always sorted to the top).
2. any DO = 0 in 2024–2025, or DO < 3 in Durga 2025, or score ≥ 0.45 → **High**.
3. score ≥ 0.25 → **Medium**.
3b. BOD above 3 mg/l in at least two-thirds of the readings since 2024 (minimum 6 readings) with a median of 6 mg/l or more (twice the limit) → **Medium**. This persistent-BOD floor exists so that a ghat failing BOD in nearly every recent test is never labelled Low just because its dissolved oxygen held up.
4. otherwise **Low**. The Low rule text always states how many recent BOD readings still breached, so Low is read as "lower than the others", never as "clean".

Sort: Insufficient data first, then High, Medium, Low; score descending within a tier.

Result on the current data:

| Rank | Ghat | Tier | Score | Coverage | Rule |
|---|---|---|---|---|---|
| 1 | Bairagarh (Sant Hirdaram) kund | Insufficient data | 0.46 | 0.72 | no Durga 2025 table |
| 2 | Malikhedi kund | Insufficient data | 0.26 | 0.72 | no Durga 2025 table |
| 3 | Shahpura lake ghat | High | 0.27 | 1.00 | DO 2.5 mg/l before Durga 2025 immersion |
| 4 | Rani Kamlapati ghat / Kamla Park kund | High | 0.21 | 1.00 | DO 2.4 mg/l during Durga 2025 |
| 5 | Hathaikheda dam / kund | Medium | 0.20 | 1.00 | BOD above 3 mg/l in 12 of 12 readings since 2024, median 7 mg/l |
| 6 | Khatlapura ghat | Low | 0.15 | 0.98 | score < 0.25; BOD still above 3 mg/l in 12 of 12 readings since 2024 (median 5.8, just under twice the limit) |
| 7 | Prempura ghat | Low | 0.05 | 0.93 | score < 0.25; BOD above 3 mg/l in 9 of 12 readings since 2024 (median 3.9) |

Note on Hathaikheda: its DO always meets the limit, so the legal score stays below 0.25 even though it has the highest BOD (22 mg/l), COD (177.8) and turbidity (193.5 NTU, Ganesh 2024 after, page 71). The persistent-BOD floor lifts it to Medium; the COD/turbidity values appear as context flags and trigger the "Clean" action. Note on Khatlapura: it stays Low only because its median BOD (5.8) is just under the 6 mg/l floor; the card says so, and its Ganesh 2024 metal spike (chromium 1.98 mg/l, page 69) triggers "Sample metals".

### 4.4 Reasons

Each ghat gets up to 3 breach reasons (largest `w · exceedance` contributions, at most 2 per parameter so one parameter does not crowd out the others), up to 2 context flags, and 1 gap line. Every breach and context reason carries year, festival, phase, parameter, value, unit, limit text and a source `{report, pdf, page}` taken from the row's `source_page`; test 1 checks that each one exists in the CSV with that page. Example:

- EN: "Dissolved oxygen was 0 mg/l during Ganesh 2025. The bathing limit is at least 5 mg/l. Source: MPPCB 2025 report, page 28."
- HI: "गणेश 2025 के विसर्जन के दौरान घुलित ऑक्सीजन 0 mg/l थी। स्नान मानक कम से कम 5 mg/l है। स्रोत: MPPCB 2025 रिपोर्ट, पृष्ठ 28।"

Context flags: the single highest reading of a no-limit parameter across the 7 ghats ("highest reading at any of the 7 ghats"), and metal readings ≥ 1.5 mg/l ("far above its usual level"; typical metal readings are 0.01–0.3 mg/l).

### 4.5 Actions

- **Aerate**: DO share of the score ≥ 0.5, or any DO < 3 in 2024–25.
- **Clean**: any BOD > 6 mg/l (twice the limit) in 2024–25, or a COD / turbidity / solids context flag.
- **Test first**: tier Insufficient data (pre-immersion sample by 17 Oct, all three phases).
- **Sample metals**: any metal reading ≥ 1.5 mg/l in the history.
- **NGT lake ban** banner: Bairagarh and Prempura (Upper Lake), Khatlapura and Rani Kamlapati (Lower Lake). Source: Free Press Journal, 26 Feb 2026, listed in the data pack.

### 4.6 What-if (2026 entry)

Officer-entered values are added as Durga 2026 pre-immersion readings (year weight 1.0, phase weight 0.5) and the ghat is re-scored. An entry satisfies the "no Durga 2025 table" rule (fresh data exists), but the coverage rule still applies. A new BMC kund is scored on its entered values only, rules 2–4, labelled "2026 data only".

## 5. ML forecast (Should) — "4 algorithms, serve the champion"

- **Task**: P(breach) = any DO < 5 or BOD > 3 during or one week after immersion, for a site-festival-year.
- **Training set**: 544 statewide groups (267 sites), 49.3% positive.
- **Features** (30): pre-immersion pH, DO, BOD, COD, total solids, dissolved solids, turbidity, conductivity (missing allowed); site-type keywords from the printed name (river, lake, talab, kund, pond, dam, ghat, temporary); festival; year; regional office (normalised, top 10 + other); the site's breach rate in strictly earlier years. No during/after values are used, so the label does not leak.
- **Models** (fixed hyperparameters, seed 42): logistic regression (median impute + missing indicators + scaling), random forest (400 trees), XGBoost (300 trees, depth 4, lr 0.05), LightGBM (300 trees, depth 4, lr 0.05).
- **Validation**: GroupKFold(5) grouped by site, plus a temporal split (train 2023–24, test 2025, n = 205).
- **Champion rule**: highest mean GroupKFold ROC-AUC, tie-break lower Brier. All four are refit on every row and saved; `GHATWATCH_MODEL` overrides the served model.

| Model | AUC GroupKFold (±sd) | AUC temporal 2025 | PR-AUC | Brier | Log-loss | F1@0.5 |
|---|---|---|---|---|---|---|
| logreg | 0.814 (0.041) | 0.803 | 0.791 | 0.176 | 0.569 | 0.757 |
| **random_forest** (champion) | **0.886** (0.025) | **0.854** | 0.871 | 0.145 | 0.451 | 0.787 |
| xgboost | 0.873 (0.021) | 0.836 | 0.855 | 0.153 | 0.481 | 0.799 |
| lightgbm | 0.874 (0.023) | 0.842 | 0.856 | 0.152 | 0.487 | 0.776 |

Top features (mean |SHAP|, random forest): pre-immersion BOD, pre-immersion turbidity, pre-immersion DO, the site's earlier breach rate, site type "kund".

**Bhopal application**: each ghat uses its latest available pre-immersion readings (Durga 2025, else Ganesh 2025, else 2024) to give a "Durga 2026 outlook"; the four model probabilities are shown side by side ("model agreement") with the champion's top-3 SHAP reasons in English and Hindi.

**Caveats**: (1) It is a model estimate from 544 statewide records, not a measurement. (2) All 7 Bhopal ghats come out at 0.89–0.98, because Bhopal's pre-immersion BOD is already above 3 mg/l and each ghat has breached before; the forecast therefore does not separate the ghats and is **not** used in the ranking. (3) The statewide file was not checked table by table by the data provider. (4) `year` is a feature, so 2026 is an extrapolation.

## 6. CQL budget allocation (Could) — EXPERIMENTAL

**Honest framing.** No intervention (aeration, cleaning, testing) is logged anywhere in the data pack, so offline RL cannot learn from real action outcomes. We therefore:

1. build a small simulator calibrated on statewide data: per-ghat state = DO tier {≥5, 3–5, <3} × BOD tier {≤3, 3–8, >8} × data known {0,1} × trend {improving, stable, worsening} = 54 states; breach probability per tier from statewide pre → during/after rates (Laplace-smoothed, forced non-decreasing with worse tiers);
2. assume action effects: aerate × 0.6 on DO-breach probability, clean × 0.7 on BOD-breach probability, test makes the state known and removes the unknown-data penalty (2.0); costs none 0, test 1, clean 2, aerate 3, clean + aerate 5; reward = −10 · P(breach) − cost; two steps per episode (pre-festival, immersion day);
3. log 20,000 transitions from a mixed behaviour policy (30% random, 50% heuristic, 20% do nothing; seed 42);
4. train tabular Conservative Q-Learning on that fixed log (numpy only; α = 1.0, lr 0.1, 300 full-batch epochs, γ = 0.95);
5. compare policy values in the simulator (20,000 episodes, mean 2-step return; higher is better):

| Policy | Value |
|---|---|
| **CQL** | **−13.25** |
| heuristic | −13.59 |
| do nothing | −14.23 |
| random | −16.44 |

6. split a fixed budget across ghats greedily by (Q(s,a) − Q(s,none)) / cost, one action per ghat. "Test" is only offered to ghats whose data is incomplete (in the simulator a test changes nothing else).

If CQL ever scores below do-nothing, the build marks allocation unavailable and test 7 fails loudly.

**Caveats**: the action effects are assumptions, not measurements; under these assumptions single aeration rarely pays for its cost, which is a property of the assumed numbers, not evidence about aerators. The allocation is a discussion aid only.

**Proposal: log 2026 actions.** If BMC records, for each ghat in 2026, what was done (aerators, cleaning crew, extra tests), when, and the MPPCB readings before and after, next year's version can learn from real transitions instead of a simulator. The app's action-log export is designed as that data-collection form.

## 7. Brief

Templated, no LLM needed: title, two-sentence situation, ranked list (tier, one reason with number and page, action chips), one paragraph of data gaps, footer (standard used, "readings reported against limits; no health effects claimed", report page ranges, NGT note). English and Hindi, markdown and plain text. Optional polish (`GHATWATCH_LLM_POLISH=1` and `ANTHROPIC_API_KEY`) rewrites only the English markdown and is discarded unless every number in the templated text survives. Off by default; no key is needed anywhere.

## 8. What works / what does not

Works:
- Deterministic ranking, tiers, reasons with page citations, gaps, actions; offline, no API key.
- Bilingual brief (markdown + plain text) and evidence pages served from precomputed JSON; the API falls back to computing on the fly.
- 4-model leaderboard with a fixed champion rule; what-if re-scoring and forecast.
- 8 invariant tests; full artifact build in about 30 s on CPU.

Does not / limits:
- No coliform data, so class B is applied on 3 of its 4 parameters.
- Units are assumed (the reports print none).
- Rani Kamlapati may be two places (Ganesh tables "Kamla Park kund", Durga tables "Lower Lake ghat"); treated as one site with a visible caveat.
- The ML forecast does not separate the 7 Bhopal ghats (all ≈ 0.9) and is not used in the ranking.
- CQL learns from a simulator with assumed effects, not from real interventions.
- Lake-body monthly baselines (Upper/Lower Lake PDFs) are not parsed.
- Score weights (parameter, year, phase) and the BOD saturation at 12 mg/l are judgement calls, documented here so they can be changed in one place (`scoring.py`).
