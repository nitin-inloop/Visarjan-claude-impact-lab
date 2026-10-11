# 6. Limits and honesty

What the data and the tool do **not** cover. These limits are also shown in the app where they apply.

## Limits of the data

| Limit | What it means for the officer |
|---|---|
| **No coliform tested** | Class B has 4 limits; the reports test only 3 of them (pH, DO, BOD). Bacteria are not covered at all. |
| **Units are assumed** | The reports print no units. The standard unit for each test is assumed (mg/l, NTU, µS/cm). |
| **Only 4 metals** | Chromium, lead, zinc and copper. No other metals were tested. |
| **No class B limit for most parameters** | COD, solids, turbidity, conductivity and metals are shown as context, never scored. |
| **Missing tables** | No Durga 2025 table for Bairagarh and Malikhedi. Both are shown as "Not tested", not as clean. |
| **Suspended solids gaps** | Not in the Durga 2023 and Durga 2025 tables. |
| **The two-place site** | "Rani Kamlapati ghat / Kamla Park kund": Ganesh tables say "Kamla Park kund", Durga tables say "Lower Lake ghat". Treated as one site with a visible caveat. |
| **2023 layout** | The upload parser was not tested on the 2023 CPCB-format report pages. |
| **Lake baselines** | The Upper/Lower Lake monthly water-quality PDFs are not parsed. |

## Limits of the method

| Limit | Detail |
|---|---|
| **Judgement-call weights** | Parameter, year and phase weights and the BOD cap at 12 mg/l are our choices. They are documented and set in one place (`backend/ghatwatch/scoring.py`). |
| **Ganesh and Durga weighted the same** | The score weights by year and phase, not by festival. Any seasonal difference between the two festivals is not modelled. |
| **"Lower risk" is not clean** | Every ghat failed the BOD limit in most recent tests. |
| **Metal trigger is not a limit** | The 1.5 mg/l "Sample metals" trigger is a screening choice, not a CPCB limit. |
| **Approximate map positions** | Ghat markers are placed approximately. Do not use them for navigation. |
| **The forecast does not separate ghats** | All 7 Bhopal ghats come out at 0.89–0.98. It is a model estimate from 544 statewide records (not checked table by table by the data provider) and is not used in the ranking. |
| **The simulator and budget allocation are experimental** | The `/lab` page and CQL allocation use assumed action effects (aerate × 0.6, clean × 0.7), not measured ones. No intervention is logged in the data pack. A discussion aid only. |
| **Officer-added data is unverified** | Uploaded and accepted rows are labelled "not yet verified by MPPCB". |

## Not verified

- **Live AI calls.** Real Claude and Cerebras responses (quality and latency), Claude reading real or scanned MPPCB pages, and ElevenLabs Hindi audio were tested only with mocked responses, because there were no keys on the build machine. On any failure the code falls back to template text and the browser voice.
- **OCR** was verified on the synthetic sample (51 of 51 values) and on 2025 report page 28 (117 of 117). Not verified: phone photos with skew or shadows, handwritten corrections, Hindi-script tables, other pages.

## No health claims

Ghat Watch reports readings against limits. It does not say a ghat is unsafe or that water causes illness. The AI guards reject health words in English and Hindi, and the brief footer says "readings reported against limits; no health effects claimed".

## What would make it better next year

1. **Test coliform** at every ghat, so all four class B limits can be applied.
2. **Print units** in the reports.
3. **Sample all three phases** at every ghat, every festival, so no ghat is "Not tested".
4. **Publish the tables as CSV** alongside the PDF, so no extraction is needed.
5. **Resolve the Rani Kamlapati / Kamla Park site** with a fixed site code and GPS position for every ghat, including the new BMC ghats.
6. **Log 2026 actions**: for each ghat, what was done (aerators, cleaning crew, extra tests), when, and the readings before and after. This would let next year's version learn from real outcomes instead of a simulator. The app's action-log export is designed as that form.
7. **Test more metals** if paint is a concern, and agree a screening level with MPPCB.
