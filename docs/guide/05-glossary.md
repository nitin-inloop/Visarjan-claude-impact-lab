# 5. Glossary

## Data codes

| Term | Meaning |
|---|---|
| **BDL** | Below detection limit. The lab found some, but too little to measure. Very low, **not zero and not missing**. Shown as "BDL", never scored. |
| **ND** | Not detected. Treated like BDL: very low. |
| **not sampled** | A blank cell, `_` or `-` in the report. The test was not done. **Missing, never clean, never 0.** Listed as a data gap. |
| **`*`, `**`** | In the report, the whole phase (pre or after) was not sampled. Listed as a phase gap. |
| **`_`** | An underscore in a cell: not sampled. |
| **pre / during / after** | The three test rounds: before immersion, during immersion, one week after immersion. |
| **value_as_printed** | The cell exactly as printed in the PDF. |
| **source page** | The page of that year's MPPCB report where the reading is printed. Every reason cites it; page links open the PDF. |
| **unit_assumed** | The unit used in the data pack. The reports print no units. |
| **site match confidence** | How sure the standard ghat name is ("high" or "medium"; Rani Kamlapati is "medium"). |
| **needs_check** | Statewide rows with an unreadable site name. Dropped before ML training (879 rows). |

## Organisations and places

| Term | Meaning |
|---|---|
| **MPPCB** | Madhya Pradesh Pollution Control Board. Tests the ghats and publishes the reports. |
| **CPCB** | Central Pollution Control Board. Sets the national water-quality classes A to E. |
| **NGT** | National Green Tribunal. Has banned immersion in Bhopal's Upper and Lower Lakes. |
| **BMC** | Bhopal Municipal Corporation. Plans visarjan and is building new ghats. Our user is a BMC officer. |
| **Ghat / kund** | A ghat is a bank or steps at the water. A kund is a small pond, often built for immersion. |
| **Visarjan** | Immersion of idols. Durga visarjan 2026 is on 20 October. |

## Scoring terms

| Term | Meaning |
|---|---|
| **Class B** | CPCB class for organised outdoor bathing: pH 6.5–8.5, DO ≥ 5 mg/l, BOD ≤ 3 mg/l (and coliform ≤ 500, not tested). The standard Ghat Watch applies. |
| **Breach** | A reading that breaks a class B limit (DO < 5, BOD > 3, pH outside 6.5–8.5). |
| **Exceedance** | How far a reading is past the limit, on a scale of 0 to 1. DO: (5 − v)/5. BOD: (v − 3)/9. pH: distance outside 6.5–8.5. Capped at 0 and 1. |
| **Score** | Weighted average of exceedances for a ghat, 0 to 1. Weights by parameter, year and phase. |
| **Coverage** | Share of the 54 expected DO/BOD/pH readings that exist (3 parameters × 3 phases × 6 festival-years). Below 0.5 means "Not tested". |
| **Breach rate** | Breaching readings / available readings. |
| **Trend** | Breach rate of the latest year minus the earliest: worsening, stable or improving. |
| **Tier** | The ghat's status. Backend: Insufficient data / High / Medium / Low. On screen: **Not tested / Danger / Watch / Lower risk**. |
| **Not tested** | Too little recent data (coverage < 0.5 or no Durga 2025 table). Shown first, grey, never green. Action: test first. |
| **Danger** | High tier: DO = 0 in 2024–25, DO < 3 in Durga 2025, or score ≥ 0.45. Act here first. |
| **Watch** | Medium tier: score ≥ 0.25, or persistent BOD above the limit. |
| **Lower risk** | Low tier: lower than the other ghats, **not clean**. |
| **Persistent-BOD floor** | Rule 3b: BOD above 3 in two-thirds or more of readings since 2024 (min 6) and median ≥ 6 lifts a ghat to Watch. |
| **Context flag** | A note about a parameter with no class B limit (COD, solids, turbidity, conductivity, metals). Never scored. |
| **Gap** | A line listing what was not sampled. |
| **Actions** | Aerate, Clean, Test first, Sample metals (see the pipeline guide). |
| **Aeration** | Adding oxygen to water, for example with aerator machines. |
| **What-if** | Officer-entered 2026 values added as Durga 2026 pre-immersion readings to re-score a ghat. |

## Upload terms

| Term | Meaning |
|---|---|
| **Text layer** | The machine-readable text inside a digital PDF. Read first, with `pypdf`. |
| **OCR** | Optical character recognition: reading text from an image. Used for scans and photos. Ghat Watch uses **PaddleOCR**. |
| **Claude document fallback** | When text and OCR give no rows, Claude reads the PDF or image and returns rows in a fixed format. |
| **Normalise** | Map printed names (`D.Oxygen`, `Cond.`) to the 13 standard parameters and the 7 ghats. |
| **Plausible range** | The physically possible range for a value, for example DO 0–20, pH 0–14. |
| **needs_review** | A row flagged because a value is outside its plausible range or uncertain. |
| **Held back** | A flagged value is not scored until the officer checks it (for example the typo DO 45). |
| **already_in_pack** | An uploaded row that duplicates a reading already in the data pack. The pack value wins. |
| **Accept** | The officer's confirmation that adds uploaded rows to the ranking. They are labelled "not yet verified by MPPCB". |
| **Confidence** | How sure the extraction is for a cell (1.0 clean; lower for fuzzy OCR or unchecked numbers). |

## AI and voice terms

| Term | Meaning |
|---|---|
| **Template text** | Fixed, checked wording built from the rules. Used when no key is set or an AI check fails. Marked "Standard text". |
| **Guards** | Automatic checks on every AI sentence: numbers both ways, no health words, forecast called an estimate, length cap. Any failure means the template is used. |
| **Claude** | Anthropic's AI model. Used for the fast officer answer (default `claude-haiku-5-5`) and as the document-reading fallback. |
| **Cerebras** | A fast AI inference service. Fallback for the answer; first choice for alert rephrasing and brief polish (default `gpt-oss-120b`). |
| **ElevenLabs** | A text-to-speech service used for the Hindi and English voice when a key is set. Otherwise the browser voice is used. |
| **Mapbox** | A map service. Used for streets and satellite maps when a token is set. Otherwise OpenStreetMap and Esri tiles. |

## Machine-learning terms

| Term | Meaning |
|---|---|
| **p(breach)** | The model's estimated probability that a site breaches class B (DO < 5 or BOD > 3) during or after immersion. An estimate, not a measurement. |
| **Label** | The answer the model learns to predict: breach yes or no. |
| **Feature** | An input to the model, for example pre-immersion BOD. 30 features. |
| **Champion model** | The model with the highest mean GroupKFold ROC-AUC (tie-break: lower Brier). Currently random forest. |
| **ROC-AUC** | How well a model ranks breaching sites above non-breaching ones. 0.5 is chance, 1.0 is perfect. |
| **PR-AUC** | Precision-recall area: how well the model finds breaches without false alarms. Higher is better. |
| **Brier score** | Average squared gap between the predicted probability and what happened. Lower is better. |
| **Log-loss** | Another penalty for confident wrong predictions. Lower is better. |
| **F1 at 0.5** | Balance of precision and recall when "breach" means p ≥ 0.5. |
| **GroupKFold** | Cross-validation in 5 folds where all records of one site stay in the same fold, so the model is never tested on a site it trained on. |
| **Temporal split** | Train on 2023–24, test on 2025 (205 records). |
| **SHAP** | A method that shows how much each feature pushed a prediction up or down. |
| **Model agreement** | How close the 4 models' probabilities are for a ghat. |
| **CQL** | Conservative Q-learning, an offline reinforcement-learning method. Used only in the experimental budget allocation, trained on a simulator with assumed action effects. |
