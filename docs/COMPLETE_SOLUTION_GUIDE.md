# Ghat Watch: End-to-End Solution Architecture & Workflow Guide

> **Single Source of Truth**  
> This document provides an exhaustive, end-to-end explanation of the **Visarjan Ghat Watch** system. It details the problem domain, the regulatory framework, the exact math and logic, how the system ingests and responds to uploaded reports and readings, and every operational workflow across the backend, machine learning, offline reinforcement learning, live telemetry simulation, and the guarded AI layer.

---

## Table of Contents
1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [Regulatory Standard: CPCB Class B Bathing Criteria](#2-regulatory-standard-cpcb-class-b-bathing-criteria)
3. [End-to-End Response to Uploaded Values (The Intake Pipeline)](#3-end-to-end-response-to-uploaded-values-the-intake-pipeline)
   - 3.1 [Ingestion Modes: PDF, Scanned Image, and Manual Form](#31-ingestion-modes-pdf-scanned-image-and-manual-form)
   - 3.2 [The 5 Processing Agents (Extractor → Normaliser → Validator → Analyst → Reporter)](#32-the-5-processing-agents)
   - 3.3 [Human-in-the-Loop Officer Audit & Acceptance Gate](#33-human-in-the-loop-officer-audit--acceptance-gate)
   - 3.4 [How Accepted Values Propagate System-Wide](#34-how-accepted-values-propagate-system-wide)
4. [Deterministic Risk Scoring & Ranking Engine](#4-deterministic-risk-scoring--ranking-engine)
   - 4.1 [Parameter Exceedance Calculation](#41-parameter-exceedance-calculation)
   - 4.2 [Weighted Aggregation Matrix](#42-weighted-aggregation-matrix)
   - 4.3 [Tier Assignment Hierarchy & Decision Rules](#43-tier-assignment-hierarchy--decision-rules)
   - 4.4 [Deterministic Action Generation](#44-deterministic-action-generation)
5. [The 4-Model ML Forecasting Engine](#5-the-4-model-ml-forecasting-engine)
   - 5.1 [Task Formulation & Statewide Training Dataset](#51-task-formulation--statewide-training-dataset)
   - 5.2 [Features & Champion Selection Rule](#52-features--champion-selection-rule)
   - 5.3 [SHAP Explainability & Advisory Framing](#53-shap-explainability--advisory-framing)
6. [Offline Reinforcement Learning: Conservative Q-Learning (CQL) Allocation](#6-offline-reinforcement-learning-conservative-q-learning-cql-allocation)
   - 6.1 [The 54-State Environmental Transition Model](#61-the-54-state-environmental-transition-model)
   - 6.2 [Tabular Conservative Q-Learning Formulation](#62-tabular-conservative-q-learning-formulation)
   - 6.3 [Greedy Marginal Utility Budget Optimizer](#63-greedy-marginal-utility-budget-optimizer)
7. [The Real-Time Live Immersion Simulator (Visarjan Night 2026)](#7-the-real-time-live-immersion-simulator-visarjan-night-2026)
   - 7.1 [Physical & Biochemical Water Quality Dynamics](#71-physical--biochemical-water-quality-dynamics)
   - 7.2 [Sensored vs Unsensored Sites](#72-sensored-vs-unsensored-sites)
   - 7.3 [Alert Generation, Hysteresis, and Field Dispatch](#73-alert-generation-hysteresis-and-field-dispatch)
8. [Guarded AI & Bilingual Speech Engine](#8-guarded-ai--bilingual-speech-engine)
   - 8.1 [The Fallback Chain: Claude Haiku → Cerebras → Deterministic Template](#81-the-fallback-chain)
   - 8.2 [Zero-Hallucination Two-Way Numeric & Safety Guardrails](#82-zero-hallucination-guardrails)
   - 8.3 [Bilingual Voice Normalization & ElevenLabs TTS](#83-bilingual-voice-normalization--tts)
9. [Summary Workflow Map](#9-summary-workflow-map)

---

## 1. Executive Summary & Problem Statement

During idol immersion festivals (**Ganesh Visarjan** and **Durga Visarjan**), thousands of idols fabricated from clay or Plaster of Paris (PoP), decorated with paints, varnishes, synthetic cloths, and organic offerings (flowers, coconut, food), are immersed into water bodies across Bhopal (Upper Lake, Lower Lake, Shahpura Lake, Hathaikheda Dam, and dedicated Kunds).

This creates an intense, sudden surge in biochemical oxygen demand (**BOD**), rapid depletion of dissolved oxygen (**DO**), spikes in turbidity and solids, and potential leaching of toxic heavy metals (Lead, Chromium, Zinc, Copper).

### The Operational Challenge
1. **Delayed Official Reports**: Madhya Pradesh Pollution Control Board (MPPCB) monitors water quality in three distinct phases: **Pre-immersion**, **During-immersion**, and **Post-immersion (after 1 week)**. Official reports are published as scanned tabular PDFs long after the event.
2. **Missing & Asymmetric Data**: Several sites lack complete tables or have unmonitored phases (marked with asterisks `*` or blanks).
3. **Actionable Governance Gap**: Municipal bodies (Bhopal Municipal Corporation - BMC) and environmental engineers need to know:
   - Which ghat is at severe risk *right now*?
   - What specific operational action should be taken (*Aerate*, *Clean*, *Sample Metals*, or *Test First*)?
   - How to prioritize limited intervention budgets across ghats?

### The Ghat Watch Solution
Ghat Watch is a comprehensive environmental intelligence platform providing:
- **Zero-hallucination, deterministic legal scoring** grounded in CPCB Class B bathing standards with page-level PDF citations.
- **Automated Document & Reading Intake**: Ingests fresh PDFs, mobile phone scans, photos, or manual field tests through layout parsing, OCR, and AI fallbacks.
- **Machine Learning Forecasts**: A 4-model champion leaderboard predicting breach probability before immersion occurs.
- **Offline RL Resource Allocation**: Conservative Q-Learning allocating aeration and cleaning budgets based on calibrated water-body physics.
- **Live Digital Twin**: Real-time simulation of immersion night with real-time alerts, team dispatching, and bilingual voice announcements.

---

## 2. Regulatory Standard: CPCB Class B Bathing Criteria

The Central Pollution Control Board (CPCB) designates water bodies by their **Designated Best Use**. Because devotees, priests, municipal workers, and boat operators stand directly in the water during visarjan, Ghat Watch strictly adopts **CPCB Class B: Outdoor Bathing (Organised)**.

### Parameters, Limits, and Treatment

| Parameter | Standard Limit | Role in Ghat Watch | Scoring Rule |
|---|---|---|---|
| **Dissolved Oxygen (DO)** | **≥ 5.0 mg/l** | **Core Legal Metric** | Exceedance = $\text{clip}\left(\frac{5.0 - \text{DO}}{5.0}, 0, 1\right)$. Below 5 is a breach; 0 mg/l yields maximum penalty 1.0. |
| **Biochemical Oxygen Demand (BOD)** | **≤ 3.0 mg/l** | **Core Legal Metric** | Exceedance = $\text{clip}\left(\frac{\text{BOD} - 3.0}{9.0}, 0, 1\right)$. Above 3 is a breach; 12+ mg/l (4x limit) yields 1.0. |
| **pH** | **6.5 to 8.5** | **Core Legal Metric** | Exceedance = $\text{clip}(\text{distance outside } [6.5, 8.5], 0, 1)$. |
| **Total Coliform** | ≤ 500 MPN/100 ml | *Omitted* | MPPCB immersion monitoring reports do not test bacteriological coliform. Class B is evaluated on the 3 measured parameters. |
| **COD, Solids (TS, TDS, TSS), Turbidity, Conductivity** | *No bathing limit set* | **Contextual Evidence** | Displayed as situational awareness flags. Never penalize the legal breach score directly, but trigger specific cleaning actions. |
| **Heavy Metals (Pb, Cr, Zn, Cu)** | *No bathing limit set* (IS 10500 is drinking water) | **Toxicity Flags** | Any reading $\ge 1.5\text{ mg/l}$ triggers an immediate alert: *"Sample metals: far above usual baseline"*. |

### Handling Missing Values, Codes, and Gaps (The Honesty Principle)
- **`BDL` / `ND` (Below Detection Limit / Not Detected)**: Treated as non-numeric flags. They are **never set to 0** and are never scored.
- **Blank, `_`, `-`**: Stored as `not sampled`. They are **never treated as clean and never treated as 0**. They are cataloged as data gaps.
- **Asterisks `*`, `**`**: Represent an entire phase that was skipped or inaccessible.
- **Missing Tables**: If a ghat has no table in a given report (e.g., Bairagarh and Malikhedi in Durga 2025), it is flagged with the highest operational priority: **Insufficient Data ("Test First")**.

---

## 3. End-to-End Response to Uploaded Values (The Intake Pipeline)

When a municipal officer or lab technician submits new water quality data into Ghat Watch, the system executes an asynchronous, 5-stage pipeline designed for total auditability and zero silent failures.

```
                              [ Upload / Manual Form ]
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       Stage 1: Extractor (Text / OCR / AI)    │
                 └───────────────────────┬───────────────────────┘
                                         │ Raw Cells
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       Stage 2: Normaliser (Aliases & Slugs)   │
                 └───────────────────────┬───────────────────────┘
                                         │ Standardized Rows
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       Stage 3: Validator (Ranges & Duplicates)│
                 └───────────────────────┬───────────────────────┘
                                         │ Validated Candidate Rows
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       Stage 4: Analyst (Before/After Re-rank) │
                 └───────────────────────┬───────────────────────┘
                                         │ Scored Diffs & Predictions
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       Stage 5: Reporter (Bilingual Report)    │
                 └───────────────────────┬───────────────────────┘
                                         │
                                         ▼
                         [ Officer Review & Audit UI ]
                         │                           │
                    (Re-run Edits)              (Accept / Reject)
                                                     │
                                                     ▼
                                      [ accepted_readings.csv ]
                                                     │
                                   ┌─────────────────┴─────────────────┐
                                   ▼                                   ▼
                         /api/ranking Re-scored               Live Digital Twin Hook
```

### 3.1 Ingestion Modes: PDF, Scanned Image, and Manual Form

1. **Digital PDF Upload (`/api/intake/upload`)**:
   - Accepts multi-page official PDF reports up to 25 MB.
   - User can specify target page ranges (e.g., `28-30`) or process the full document.
2. **Scanned PDF / Photo Upload (`/api/intake/upload` with `force_ocr=true` or image file)**:
   - Accepts PNG, JPEG, or scanned PDF pages (e.g. mobile photo of a physical lab sheet).
3. **Manual Form (`/api/intake/manual`)**:
   - Enables field officers to type in direct parameter values for a specific ghat, festival, year, and sampling phase (Pre, During, After).

### 3.2 The 5 Processing Agents

Each job runs in an asynchronous background thread and logs its status, execution timing, and bilingual notes at every phase:

#### Stage 1: Extractor (`extract_text.py`, `ocr.py`, `extract.py`)
- **Direct PDF Text Layer**: Uses `pypdf` with layout-mode preservation. If pypdf detects low character density (scanned page), it automatically switches to OCR.
- **Isolated PaddleOCR Worker**: If the document is a scan or photo, Ghat Watch spawns `backend/.ocr-venv/Scripts/python intake/ocr_worker.py`. 
  - Uses `PP-OCRv5` mobile models on CPU with oneDNN PIR disabled for rock-solid stability.
  - Clusters word boxes on the Y-axis and positions them on character columns according to X-coordinates, replicating table layout.
  - Computes an OCR confidence score for every single bounding box.
- **Claude Extractor Fallback (`ai/extract.py`)**: If the text layer is empty and PaddleOCR is not installed, the file is routed to Claude with a strict JSON schema prompt. Extracted numbers are cross-referenced with the text layer; any discrepancies lower the read confidence to 0.4.

#### Stage 2: Normaliser (`normalize.py`)
- **Parameter Aliasing**: Maps messy printed headers into 13 standardized parameter names:
  - `"D.Oxygen"`, `"DO"`, `"घुलित ऑक्सीजन"` $\rightarrow$ `Dissolved oxygen`
  - `"BOD (5 days 20C)"`, `"बीओडी"` $\rightarrow$ `BOD`
  - `"Cond."`, `"EC"`, `"चालकता"` $\rightarrow$ `Conductivity`
- **Ghat Name Resolution**: Maps printed site titles to canonical database slugs (`khatlapura`, `prempura`, `bairagarh`, `rani-kamlapati`, `hathaikheda`, `shahpura`, `malikhedi`):
  - Exact match from data pack dictionary: Confidence = 1.0.
  - Distinctive keyword token match: Confidence = 0.9.
  - Fuzzy string matching (`rapidfuzz` or `difflib` with ratio $\ge 0.75$): Capped at 0.85.
  - Non-Bhopal sites (e.g. Sehore, Jabalpur, Rajgarh) are marked `slug: null` and kept strictly isolated.

#### Stage 3: Validator (`validate.py`)
- **Physical Plausibility Checks**: Rejects impossible physical readings:
  - DO: $0 \le v \le 20\text{ mg/l}$
  - pH: $0 \le v \le 14$
  - BOD: $0 \le v \le 500\text{ mg/l}$
  - COD: $0 \le v \le 2000\text{ mg/l}$
  - Negative numbers are strictly marked as errors.
- **Biochemical Consistency (Soft Checks)**:
  - Flags a warning if $\text{BOD} > \text{COD}$ (biochemically anomalous).
  - Flags a warning if $\text{Dissolved Solids} > \text{Total Solids}$.
- **Duplicate Detection**: Cross-references against the official MPPCB baseline pack. If a cell matches an official data point (same year, festival, ghat, phase, parameter), it is marked `already_in_pack`, and the official pack value is preserved.

#### Stage 4: Analyst (`analyze.py`)
- Computes **CPCB Class B exceedances** for every valid row.
- Runs a **Before vs. After differential assessment**:
  - *Before*: The current official ranking (plus any previously accepted officer rows).
  - *After*: The prospective ranking if this upload's scorable rows are added.
  - Detects if any ghat changes tier (e.g., from *Low* to *Medium* or *Insufficient Data* to *High*).
- **ML Outlook Generation**: If pre-immersion readings are provided, feeds them into the 4-model forecasting pipeline to generate breach probabilities.
- **CQL Allocation Hint**: Looks up the offline reinforcement learning Q-table to recommend the highest-value intervention (Aerate, Clean, Test).

#### Stage 5: Reporter (`report.py`)
- Synthesizes a comprehensive bilingual markdown report in English and Hindi detailing:
  - Document metadata, OCR accuracy stats, and recovered cell counts.
  - Matched vs. unmatched ghats.
  - Clear Before $\rightarrow$ After comparison table of scores and tiers.
  - All identified regulatory breaches and citations.

---

### 3.3 Human-in-the-Loop Officer Audit & Acceptance Gate

Ghat Watch adheres to a strict principle: **No machine extraction or uploaded reading ever reaches the official public ranking automatically.**

1. **Review Stage (`GET /api/intake/jobs/{id}`)**:
   - The officer inspects the extracted table alongside the rendered PDF/image page in the UI.
   - Low-confidence cells (confidence $< 0.7$) and unmapped ghats are highlighted with warning badges.
2. **Interactive Correction & Re-run (`POST /api/intake/jobs/{id}/rerun`)**:
   - The officer can correct typos, adjust site mappings, or fix misinterpreted flags.
   - The system re-executes Normalise, Validate, Analyse, and Report in real-time, boosting edited cells to confidence 1.0.
3. **Acceptance Gate (`POST /api/intake/jobs/{id}/accept`)**:
   - The officer clicks **Accept**.
   - Only plausible, scorable rows are committed to `backend/intake_data/accepted_readings.csv`.
   - The file is physically separated from the read-only official data pack.
   - Each row is stamped with `job_id`, `source_file`, `source_page`, `accepted_at`, and `entered_by="officer"`.
4. **Rejection Gate (`POST /api/intake/jobs/{id}/reject`)**:
   - Discards candidate rows; none enter the ranking database.

---

### 3.4 How Accepted Values Propagate System-Wide

Once accepted, the new data immediately updates the entire platform:

1. **Ranking Recalculation (`GET /api/ranking`)**:
   - Automatically re-scores all ghats.
   - Every reason generated from officer data explicitly states:  
     `"officer-added from <file> page N (not yet verified by MPPCB)"`.
   - The API payload adds a `user_data` metadata block detailing the number of officer rows included.
   - Users can toggle `?include_user=0` to inspect the untouched official baseline at any time.
2. **Missing Table Rule Resolution**:
   - If an accepted reading provides fresh 2026 pre-immersion data for an incomplete ghat (such as Bairagarh or Malikhedi), it resolves the `"no Durga 2025 table"` data-gap penalty, allowing the ghat to move out of *Insufficient Data* if coverage thresholds are met.
3. **Live Simulator Digital Twin Hook**:
   - When the live simulation engine resets, `live.simulator.initial_conditions()` checks `accepted_readings.csv`.
   - If an accepted 2026 pre-immersion reading exists for a ghat, the simulator initializes its starting state from this verified field data rather than older historical defaults, displaying the upload file name as the `initial_source`.

---

## 4. Deterministic Risk Scoring & Ranking Engine

The risk scoring engine (`backend/ghatwatch/scoring.py`) calculates a fully deterministic, auditable numerical risk score between 0.0 and 1.0 for each ghat.

### 4.1 Parameter Exceedance Calculation
Each reading $v$ of parameter $p$ is mapped to an exceedance penalty $e(p, v) \in [0, 1]$:

$$\text{DO Exceedance} = \text{clip}\left(\frac{5.0 - v}{5.0}, 0.0, 1.0\right)$$
- If $\text{DO} \ge 5.0\text{ mg/l} \implies e = 0.0$ (Compliant)
- If $\text{DO} = 2.5\text{ mg/l} \implies e = 0.5$
- If $\text{DO} = 0.0\text{ mg/l} \implies e = 1.0$ (Max penalty)

$$\text{BOD Exceedance} = \text{clip}\left(\frac{v - 3.0}{9.0}, 0.0, 1.0\right)$$
- If $\text{BOD} \le 3.0\text{ mg/l} \implies e = 0.0$ (Compliant)
- If $\text{BOD} = 7.5\text{ mg/l} \implies e = 0.5$
- If $\text{BOD} \ge 12.0\text{ mg/l} \implies e = 1.0$ (Saturation at 4x standard)

$$\text{pH Exceedance} = \text{clip}\left(\max(6.5 - v, v - 8.5, 0.0), 0.0, 1.0\right)$$
- If $6.5 \le v \le 8.5 \implies e = 0.0$
- If $v = 9.2 \implies e = 0.7$

---

### 4.2 Weighted Aggregation Matrix

Every numeric reading $r$ is assigned a compound weight based on parameter importance, recency, and festival phase:

$$W(r) = w_{\text{param}} \times w_{\text{year}} \times w_{\text{phase}}$$

| Dimension | Category / Value | Weight | Rationale |
|---|---|---|---|
| **Parameter ($w_{\text{param}}$)** | Dissolved Oxygen (DO) | **0.45** | Critical for aquatic survival and immediate human asphyxiation risk |
| | BOD | **0.40** | Direct measure of decomposing organic load and sewage |
| | pH | **0.15** | Direct chemical irritation indicator |
| **Year ($w_{\text{year}}$)** | 2026 (Officer/Live) | **1.00** | Present operational conditions |
| | 2025 | **1.00** | Most recent completed historical season |
| | 2024 | **0.75** | Intermediate baseline |
| | 2023 | **0.50** | Distant baseline |
| **Phase ($w_{\text{phase}}$)** | During Immersion | **1.00** | Peak exposure moment for devotees |
| | After (1 week post) | **1.00** | Lingering ecological destruction |
| | Pre Immersion | **0.50** | Baseline water state prior to immersion |

The overall Ghat Risk Score is the weighted average exceedance across all available numeric readings:

$$\text{Score} = \frac{\sum_{r \in \mathcal{R}} W(r) \cdot e(r)}{\sum_{r \in \mathcal{R}} W(r)}$$

- **Breach Rate**: Fraction of all tests that breached Class B limits ($\text{DO} < 5$, $\text{BOD} > 3$, or $\text{pH} \notin [6.5, 8.5]$).
- **Coverage**: Fraction of the 54 expected data points present ($\frac{N_{\text{available}}}{54}$).
- **Trend**: Difference between the breach rate of the most recent year and the earliest year ($\ge +0.15$ Worsening, $\le -0.15$ Improving, otherwise Stable).

---

### 4.3 Tier Assignment Hierarchy & Decision Rules

Tiers are assigned through a strict, hierarchical rule cascade. The first rule that evaluates to true determines the ghat's tier and provides the exact explanatory citation:

```
[ Assess Ghat Readings & History ]
                │
                ▼
      Coverage < 50% OR
      No Durga 2025 Table? ───────► YES ──────► TIER 1: INSUFFICIENT DATA ("Test First")
                │ NO
                ▼
      Any DO = 0 mg/l (2024-25) OR
      DO < 3 mg/l (Durga 2025) OR
      Score ≥ 0.45? ──────────────► YES ──────► TIER 2: HIGH RISK ("Aerate / Intervene")
                │ NO
                ▼
      Score ≥ 0.25? ──────────────► YES ──────► TIER 3: MEDIUM RISK
                │ NO
                ▼
      Persistent BOD Floor:
      BOD > 3 in ≥ 66% tests AND
      Median BOD ≥ 6.0 mg/l? ─────► YES ──────► TIER 3: MEDIUM RISK (Persistent BOD)
                │ NO
                ▼
      All rules passed ───────────────────────► TIER 4: LOW RISK ("Lower risk, not clean")
```

#### Detailed Rule Specifications:
1. **Rule 1 (Insufficient Data)**:
   - Fired if data coverage is $< 50\%$ OR if the whole Durga 2025 table is missing.
   - *Design Rationale*: Ensures that missing data is never mistaken for clean water. Sorts directly to the top of the board with the mandate: **"Test First"**.
2. **Rule 2 (High Risk)**:
   - Fired if $\text{DO} = 0\text{ mg/l}$ anywhere in 2024–2025, OR if $\text{DO} < 3.0\text{ mg/l}$ in Durga 2025, OR if $\text{Score} \ge 0.45$.
   - Indicates severe anoxia and acute environmental distress.
3. **Rule 3 (Medium Risk)**:
   - Fired if $\text{Score} \ge 0.25$.
4. **Rule 3b (Persistent-BOD Floor - Medium Risk)**:
   - Fired if BOD has exceeded $3\text{ mg/l}$ in at least two-thirds ($\ge 66.7\%$) of readings since 2024 (minimum 6 readings) and the median BOD is $\ge 6.0\text{ mg/l}$ (twice the legal bathing limit).
   - *Design Rationale*: Prevents a chronic sewage-carrying site from being marked "Low Risk" simply because mechanical reaeration kept dissolved oxygen high.
5. **Rule 4 (Low Risk)**:
   - All other sites ($\text{Score} < 0.25$).
   - The card explicitly prints how many recent BOD readings still breached:  
     `"Low: risk score 0.15 is below 0.25. BOD still exceeded 3 mg/l in 12 of 12 readings since 2024 (median 5.8 mg/l). Lower risk than other ghats, not clean."`

---

### 4.4 Deterministic Action Generation

Each ghat is assigned explicit, machine-derived operational action chips:
- **`Aerate`**: Triggered if DO accounts for $\ge 50\%$ of the ghat's exceedance penalty or if any $\text{DO} < 3.0\text{ mg/l}$ occurred in 2024–2025.
- **`Clean`**: Triggered if any $\text{BOD} > 6.0\text{ mg/l}$ occurred in 2024–2025 or if high COD, turbidity, or suspended solids flags are present.
- **`Test First`**: Triggered automatically for any ghat in the *Insufficient Data* tier. Demands pre-immersion sampling prior to 17 October.
- **`Sample Metals`**: Triggered if any heavy metal reading $\ge 1.5\text{ mg/l}$ is recorded in the site's history.
- **`NGT Lake Ban Banner`**: Displays a legal alert banner for ghats situated on Upper and Lower Lakes (Bairagarh, Prempura, Khatlapura, Rani Kamlapati) citing the National Green Tribunal immersion prohibition order (FPJ, 26 Feb 2026).

---

## 5. The 4-Model ML Forecasting Engine

While legal scoring assesses retrospective regulatory compliance, the ML layer (`backend/ghatwatch/ml/`) predicts the probability of a Class B breach *before* immersion takes place.

### 5.1 Task Formulation & Statewide Training Dataset
- **Objective**: Predict $P(\text{Breach}) = P(\text{Any DO} < 5.0\text{ or BOD} > 3.0\text{ During or 1 week After immersion})$.
- **Dataset**: Trained on `data/mp_immersion_sites_2023_2025.csv` containing **544 site-festival-year events across 267 distinct water bodies statewide** in Madhya Pradesh. 
- **Strict Leakage Prevention**: Features are extracted exclusively from **Pre-immersion** data. No during or after immersion values are ever seen by the feature extractor.

### 5.2 Features & Champion Selection Rule
- **30 Extracted Features**:
  - Pre-immersion chemistry: DO, BOD, pH, COD, Total Solids, Dissolved Solids, Turbidity, Conductivity.
  - Environmental & morphometric keywords: Extracted from water body names (`kund`, `talab`, `lake`, `river`, `dam`, `temporary`).
  - Regional Office encoding (Top 10 ROs + other).
  - Historical site track record: Historical breach rate strictly from earlier years.
- **Validation Scheme**: Evaluated using 5-Fold `GroupKFold` grouped by geographical site, supplemented by temporal holdout validation (train on 2023–2024, test on 2025).
- **The Champion Selection Rule**: Fixed by code: **Highest mean GroupKFold ROC-AUC**, broken on lowest Brier score.

#### The Model Leaderboard:

| Model Algorithm | GroupKFold ROC-AUC | Temporal 2025 AUC | PR-AUC | Brier Score | Log-Loss | Status |
|---|---|---|---|---|---|---|
| **Random Forest (400 trees)** | **0.886 (±0.025)** | **0.854** | **0.871** | **0.145** | **0.451** | **CHAMPION (Served)** |
| LightGBM (300 trees, depth 4) | 0.874 (±0.023) | 0.842 | 0.856 | 0.152 | 0.487 | Benchmark |
| XGBoost (300 trees, depth 4) | 0.873 (±0.021) | 0.836 | 0.855 | 0.153 | 0.481 | Benchmark |
| Logistic Regression (scaled + impute) | 0.814 (±0.041) | 0.803 | 0.791 | 0.176 | 0.569 | Benchmark |

### 5.3 SHAP Explainability & Advisory Framing
- **Model Agreement**: All four model outputs are displayed side-by-side on the frontend to showcase model confidence and consensus.
- **TreeSHAP Attributions**: The top 3 features influencing the forecast are rendered in bilingual text:
  - *Example*: `"Pre-immersion BOD was 4.2 mg/l (+0.18 breach probability), Site type is kund (+0.12), Past breach rate was 100% (+0.08)"`.
- **Honest Framing**: The ML forecast is strictly an **advisory decision-support tool**. Because all 7 Bhopal ghats exhibit pre-immersion BOD already above 3 mg/l, all 7 yield elevated breach probabilities (0.89 to 0.98). The ML forecast is therefore intentionally **excluded from determining the legal ranking tiers**.

---

## 6. Offline Reinforcement Learning: Conservative Q-Learning (CQL) Allocation

Municipal officers have limited budgets for deploying mobile aerator units and cleaning crews. Ghat Watch employs offline reinforcement learning (`backend/ghatwatch/rl/`) to optimize intervention distribution.

### 6.1 The 54-State Environmental Transition Model
Because past historical reports do not log where mobile aerators or clean-up crews were deployed, an offline agent cannot learn from historical action logs. Ghat Watch resolves this by calibrating a Markov Decision Process (MDP) simulator against observed statewide data:

$$\mathcal{S} = \text{DO Tier } \{ \ge 5, 3\text{--}5, < 3 \} \times \text{BOD Tier } \{ \le 3, 3\text{--}8, > 8 \} \times \text{Data Known } \{0, 1\} \times \text{Trend } \{\text{Imp}, \text{Stb}, \text{Wor}\} = 54 \text{ States}$$

#### Actions & Assumed Environmental Impacts:
- **`None`** (Cost 0): System follows baseline degradation.
- **`Test`** (Cost 1): Resolves unknown data state; removes data uncertainty penalty.
- **`Clean`** (Cost 2): Cut organic loading; multiplies BOD breach probability by $0.7$.
- **`Aerate`** (Cost 3): Injects mechanical oxygen; multiplies DO breach probability by $0.6$.
- **`Clean + Aerate`** (Cost 5): Combined intervention.

$$\text{Reward } R(s, a) = -10 \cdot P(\text{Breach} \mid s, a) - \text{Cost}(a)$$

### 6.2 Tabular Conservative Q-Learning Formulation
A dataset of 20,000 transitions is generated using a mixed behavior policy (30% random, 50% heuristic, 20% do nothing). Tabular Conservative Q-Learning is trained directly on this batch log using NumPy:

$$Q^{k+1}(s, a) = Q^k(s, a) + \alpha \left[ R(s, a) + \gamma \max_{a'} Q^k(s', a') - Q^k(s, a) \right] - \alpha \cdot \kappa \left[ \frac{\exp(Q^k(s, a))}{\sum_b \exp(Q^k(s, b))} - \hat{\pi}_{\beta}(a \mid s) \right]$$

The conservative penalty term suppresses overestimation on state-action pairs poorly supported in the transition log.

#### Policy Evaluation Results (20,000 Monte Carlo Simulation Episodes):
- **Conservative Q-Learning (CQL)**: **Mean Return = −13.25** (Optimal)
- Expert Heuristic: Mean Return = −13.59
- Do Nothing: Mean Return = −14.23
- Random Actions: Mean Return = −16.44

*Failsafe Invariant*: If CQL performance ever drops below the "Do Nothing" policy, the build pipeline fails loudly and marks allocation unavailable.

### 6.3 Greedy Marginal Utility Budget Optimizer
Given a finite municipal budget $B$ (e.g. 8 resource units):
1. For each ghat, compute marginal benefit: $\Delta Q(s, a) = Q(s, a) - Q(s, \text{None})$.
2. Compute marginal cost-effectiveness ratio: $\frac{\Delta Q(s, a)}{\text{Cost}(a)}$.
3. Greedily allocate the highest marginal return action per ghat until budget $B$ is exhausted.
4. *Constraint*: `"Test"` is exclusively recommended to ghats with incomplete data.

---

## 7. The Real-Time Live Immersion Simulator (Visarjan Night 2026)

The Live Digital Twin (`backend/ghatwatch/live/`) simulates the dynamic water quality evolution across all 7 Bhopal ghats on the night of **20 October 2026 from 15:00 to 06:00 IST** (15 simulation hours).

### 7.1 Physical & Biochemical Water Quality Dynamics

The simulation executes differential mass-balance equations at 60-second time steps:

$$\frac{d\text{DO}}{dt} = k_2 (\text{DO}_{\text{sat}} - \text{DO}) - k_1 \frac{\text{BOD}}{0.68} - \frac{\text{SOD}}{\text{depth}} - K_{\text{IOD}} \cdot \text{IOD} + B_{\text{DO}}$$

$$\frac{d\text{BOD}}{dt} = -k_1 \cdot \text{BOD} + B_{\text{BOD}} + \text{Load}_{\text{idols}}$$

- **Reaeration Rate ($k_2$)**: Calibrated to water body geometry: $0.5/\text{day}$ in enclosed kunds, $1.5/\text{day}$ in lakes, $2.0/\text{day}$ in dams.
- **Deoxygenation Rate ($k_1$)**: Temperature-adjusted via Streeter-Phelps: $k_1 = 0.23 \times 1.047^{(T - 20)}$.
- **Sediment Oxygen Demand ($\text{SOD}$)**: $1.0\text{ to }2.0\text{ g/m}^2/\text{day}$, elevated by settling idol solids.
- **Immediate Oxygen Demand ($\text{IOD}$)**: Represents organic offerings, crushed flowers, and stirred bed sediments decaying rapidly at $4.0/\text{day}$.
- **Idol Surge arrivals**: Modeled as a non-homogeneous Poisson process distributing 12,000 idols over the night, peaking between 17:00 and 23:00 IST.

### 7.2 Sensored vs Unsensored Sites
- **Sensored Ghats (Shahpura, Rani Kamlapati, Khatlapura, Prempura, Hathaikheda)**:
  - Stream real-time DO, pH, turbidity, conductivity, and temperature every sim-minute with simulated sensor noise (DO $\pm 0.15$), $1\%$ network dropout, and $0.1\%$ spike errors.
  - BOD, COD, and TSS represent physical laboratory samples arriving every 60 sim-minutes with a 30-minute processing delay.
- **Unsensored Ghats (Bairagarh and Malikhedi Kunds)**:
  - Values remain `null` and tier remains `no_data` until a mobile test team is dispatched in the simulation.
  - The simulator's internal truth state is strictly hidden from the UI to reflect true operational uncertainty.

### 7.3 Alert Generation, Hysteresis, and Field Dispatch
- **Hysteresis Thresholds**: Prevent alert flickering:
  - DO alert triggers when 5-min rolling average $< 5.0\text{ mg/l}$; only clears when 30-min rolling average recovers to $\ge 5.5\text{ mg/l}$.
  - BOD alert triggers $> 3.0\text{ mg/l}$; clears $< 2.7\text{ mg/l}$.
- **Alert Codes & Severity**:
  - `DO_LOW`: Warning below 5, High below 3, Critical below 1.
  - `DO_ETA_60`: High alert; computed via least-squares linear trend predicting DO breach within 60 minutes.
  - `DO_FALLING_FAST`: DO dropping faster than $-1.0\text{ mg/l/hour}$.
  - `IDOL_SURGE`: Immersion rate exceeds 30 idols/hour and is $1.5\times$ above the ghat's average.
- **Real-Time Field Interventions**:
  - Operators can dispatch mobile aerator sets ($k_2 + 3/\text{day}$), cleaning crews (halves organic input for 120 mins), mobile test teams, or crowd diversions (reroutes 70% of arriving idols to alternative kunds).
  - Teams travel across a realistic road graph at 25 km/h with 10 minutes setup delay.

---

## 8. Guarded AI & Bilingual Speech Engine

The AI integration (`backend/ghatwatch/ai/` and `voice/`) provides conversational intelligence, automated report briefs, and accessibility voice readouts for field personnel.

### 8.1 The Fallback Chain: Claude Haiku → Cerebras → Deterministic Template

```
                    [ Incoming Request / Report ]
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Fast Claude (Haiku 5.5) │ ──► Passes Guards? ──► Serves Claude Text
                    └────────────┬────────────┘           │ NO
                                 │ Timeout / Error        │
                                 ▼                        │
                    ┌─────────────────────────┐           │
                    │ Cerebras (gpt-oss-120b) │ ──► Passes Guards? ──► Serves Cerebras Text
                    └────────────┬────────────┘           │ NO
                                 │ Timeout / Error        │
                                 ▼                        ▼
                    ┌─────────────────────────────────────────┐
                    │  Deterministic Jinja Template (Guaranteed)│ ──► Serves Standard Text
                    └─────────────────────────────────────────┘
```

The system operates with zero external key dependencies: if no API keys are provided or network issues occur, the deterministic template activates automatically.

### 8.2 Zero-Hallucination Two-Way Numeric & Safety Guardrails
Every response synthesized by an LLM must pass four deterministic verification gates (`guards.py`). A failure at any gate instantly aborts the LLM response and defaults to the template:

1. **Two-Way Strict Numeric Guard**:
   - **No Invented Numbers**: Every single digit/number in the AI output must exist in the structured input data or date whitelist.
   - **No Dropped Numbers**: Every critical number present in the baseline template (measured values, page citations, deadlines) must appear in the AI text.
2. **Strict Prohibition on Health Claims**:
   - Checks against an extensive English and Hindi blacklist: `["health", "disease", "toxic", "skin", "infection", "cancer", "बीमारी", "स्वास्थ्य", "हानिकारक", "त्वचा"]`.
   - The platform strictly compares chemistry against CPCB legal standards and never speculates on human health consequences.
3. **Mandatory Estimate Framing**:
   - If predictive forecasts are discussed, words of certainty (`"will breach"`, `"definitely"`, `"निश्चित"`) trigger immediate rejection; the text must explicitly label predictions as `"estimates"` or `"अनुमान"`.
4. **Length & Structure Bounds**:
   - English outputs are hard-capped at 900 characters; Hindi at 1,100 characters.

### 8.3 Bilingual Voice Normalization & ElevenLabs TTS
For field workers operating outdoors or with limited reading capability, every ghat card, alert, and summary provides a **सुनें / Listen** button.

- **Audio Pipeline (`voice/api.py`, `voice/normalize.py`)**:
  - Text is pre-processed into spoken phonetics:
    - `"mg/l"` $\rightarrow$ `"मिलीग्राम प्रति लीटर"` / `"milligrams per litre"`
    - `"DO"` $\rightarrow$ `"घुलित ऑक्सीजन"` / `"dissolved oxygen"`
    - `"BOD"` $\rightarrow$ `"बी.ओ.डी."`
    - `"p. 28"` $\rightarrow$ `"पृष्ठ अट्ठाईस"` / `"page 28"`
    - Numbers in Hindi are spelled out phonetically (`0.6` $\rightarrow$ `"शून्य दशमलव छह"`).
  - Audio generation routes to **ElevenLabs Multilingual v2** (`Kanika` voice for Hindi, `George` for English).
  - Audio files are cached by MD5 content hash in `backend/voice_cache/`, eliminating latency and recurring token costs on repeated plays.
  - **Browser Web Speech Fallback**: If ElevenLabs is unavailable or unconfigured, the frontend automatically falls back to browser-native `window.speechSynthesis`.

---

## 9. Summary Workflow Map

| Operation | User Action | System Execution | Output / Outcome |
|---|---|---|---|
| **View Dashboard** | Open Web App | Fetches `/api/ranking`, `/api/brief` | Ranked action sheet, legal citations, bilingual brief, alert list |
| **Inspect Evidence** | Click Ghat Card | Loads `/api/ghats/{slug}` with PDF viewer | Historic readings, CPCB Class B comparison, MPPCB source page links |
| **Upload Report** | Upload PDF / Photo / Scan | Background thread runs Extractor $\rightarrow$ Normaliser $\rightarrow$ Validator $\rightarrow$ Analyst $\rightarrow$ Reporter | Asynchronous Job ID, extraction progress logs, preliminary before/after diff |
| **Review Extraction** | Inspect Job in Review UI | Views extracted rows against page images | Edit confidence, correct unrecognized sites, re-run validation |
| **Accept Readings** | Click "Accept" | Writes scorable rows to `accepted_readings.csv`, invalidates cache | Re-scores `/api/ranking`, updates reasons with citations, feeds live simulator |
| **Run What-If** | Input hypothetical 2026 values | Executes `/api/whatif` | Instant simulated rank, tier changes, and 4-model ML breach probabilities |
| **Allocate Budget** | Adjust budget slider | Queries `/api/allocate?budget=N` | Greedy CQL policy assigns optimal aerator and cleaning allocations |
| **Monitor Live Night** | Navigate to `/live` | Connects to 60s live digital twin engine | Real-time sensor charts, alert toasts, idol surge tracking, team dispatching |
| **Listen to Brief** | Tap "सुनें / Listen" | Invokes `/api/voice/tts` | Natural Hindi or English voice reading of verified on-screen text |

---

*Ghat Watch is developed for the Bhopal Municipal Corporation and Madhya Pradesh environmental monitoring teams, providing mathematically verified, legally grounded water quality intelligence during religious immersion festivals.*
