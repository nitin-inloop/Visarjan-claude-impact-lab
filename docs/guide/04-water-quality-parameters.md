# 4. The 13 water-quality parameters

MPPCB tests 13 things in the water at each ghat. This page explains each one in plain words, its limit, why it matters at an immersion ghat, how Ghat Watch uses it, and what the Bhopal readings look like.

Notes before you read:

- **Units are assumed.** The reports print no units. The units below are the standard ones used in the data pack.
- **Only 3 parameters are scored** (DO, BOD, pH), because only they have a CPCB class B limit in this data. The rest are shown as context, labelled "no CPCB bathing limit set".
- **No health claims.** Ghat Watch compares readings with limits. It does not say what a reading does to people. The "why it matters" notes below are about the water itself.
- The "highest / lowest" examples are the extreme readings across the 7 Bhopal ghats in `bhopal_ghats_2023_2025.csv`, with the page of that year's MPPCB report.

## Summary table

| Parameter | Unit | CPCB class B limit | Used for | Bhopal range (numeric readings) |
|---|---|---|---|---|
| pH | none | 6.5 to 8.5 | **Scored** (weight 0.15) | 6.49 to 9.2 (115 readings, 6 outside range) |
| Dissolved oxygen (DO) | mg/l | 5 or more | **Scored** (weight 0.45) | 0 to 11.0 (116 readings, 42 below 5) |
| BOD | mg/l | 3 or less | **Scored** (weight 0.40) | 1.3 to 22 (112 readings, 100 above 3) |
| COD | mg/l | no class B limit | Context; can trigger "Clean" | 10 to 177.84 |
| Total solids | mg/l | no class B limit | Context; can trigger "Clean" | 152 to 1,574 |
| Dissolved solids | mg/l | no class B limit | Context; can trigger "Clean" | 124 to 1,422 |
| Suspended solids | mg/l | no class B limit | Context; can trigger "Clean" | 22 to 316 (80 readings) |
| Turbidity | NTU | no class B limit | Context; can trigger "Clean" | 1.4 to 193.5 |
| Conductivity | µS/cm | no class B limit (class E caps it at 2,250) | Context | 211.4 to 1,882 |
| Chromium | mg/l | no class B limit | Context; ≥ 1.5 triggers "Sample metals" | 0.03 to 1.98 (65 BDL) |
| Lead | mg/l | no class B limit | Context; ≥ 1.5 triggers "Sample metals" | 0.02 to 1.77 (52 BDL) |
| Zinc | mg/l | no class B limit | Context; ≥ 1.5 triggers "Sample metals" | 0.008 to 2.67 (21 BDL) |
| Copper | mg/l | no class B limit | Context; ≥ 1.5 triggers "Sample metals" | 0.008 to 2.66 (36 BDL) |

mg/l = milligrams per litre. NTU = nephelometric turbidity units (a measure of cloudiness). µS/cm = microsiemens per centimetre (the same as micromhos/cm).

## CPCB classes A to E, and why class B

The Central Pollution Control Board (CPCB) sorts surface water into five classes by its "designated best use" (`data/cpcb_water_quality_criteria.csv`):

| Class | Best use | Key limits |
|---|---|---|
| A | Drinking water source without conventional treatment, after disinfection | Coliform ≤ 50 MPN/100 ml · pH 6.5–8.5 · DO ≥ 6 · BOD ≤ 2 |
| **B** | **Outdoor bathing (organised)** | Coliform ≤ 500 MPN/100 ml · **pH 6.5–8.5 · DO ≥ 5 · BOD ≤ 3** |
| C | Drinking water source after conventional treatment and disinfection | Coliform ≤ 5,000 · pH 6–9 · DO ≥ 4 · BOD ≤ 3 |
| D | Wildlife and fisheries | pH 6.5–8.5 · DO ≥ 4 · free ammonia ≤ 1.2 |
| E | Irrigation, industrial cooling, controlled waste disposal | pH 6.0–8.5 · conductivity ≤ 2,250 · sodium absorption ratio ≤ 26 · boron ≤ 2 |

**Why class B.** At a ghat, devotees, priests and workers stand in the water. The closest designated use is organised outdoor bathing, which is class B. Class B has four limits. The reports do not test coliform, so Ghat Watch applies the other three: pH, DO and BOD. Classes C and D are shown as secondary context in the evidence view.

---

## pH

- **Plain meaning:** how acidic or alkaline the water is. 7 is neutral; lower is acidic, higher is alkaline.
- **Unit:** none.
- **Class B limit:** 6.5 to 8.5.
- **Why it matters at a ghat:** materials put into the water, such as paint, plaster and offerings, can shift the water's chemistry. pH outside the range means the water no longer meets the bathing standard.
- **How Ghat Watch uses it:** scored. Exceedance = distance outside 6.5–8.5, capped at 1. Weight 0.15.
- **In the Bhopal data:** highest 9.2 at Hathaikheda dam / kund, Durga 2024 pre (2024 report p. 23), exceedance 0.7. Lowest 6.49 at Khatlapura ghat, Ganesh 2024 during (p. 69). Only 6 of 115 readings are outside the range, so pH rarely drives a rank.

## Dissolved oxygen (DO)

- **Plain meaning:** the amount of oxygen dissolved in the water. Fish and other water life need it.
- **Unit:** mg/l.
- **Class B limit:** 5 mg/l or more.
- **Why it matters at a ghat:** organic material (flowers, food offerings, other waste) is broken down by bacteria, which use up oxygen. At 0 mg/l the water supports no fish life.
- **How Ghat Watch uses it:** scored, with the largest weight (0.45). Exceedance = (5 − value) / 5. Any DO = 0 in 2024–25, or DO < 3 in Durga 2025, makes a ghat "Danger" directly. DO < 3 in 2024–25 triggers "Aerate". Alerts: DO = 0 is critical; DO < 3 is high.
- **In the Bhopal data:** 42 of 116 readings are below 5. DO read 0 four times, all at Bairagarh (Sant Hirdaram) kund, for example Durga 2023 during (2023 report p. 60) and Ganesh 2025 during (2025 report p. 28). Rani Kamlapati ghat read 2.5 / 2.4 / 2.6 before, during and after Durga 2025 (p. 64). Highest: 11.0 at Hathaikheda, Ganesh 2024 after (p. 71).

## BOD (biochemical oxygen demand)

- **Plain meaning:** how much oxygen bacteria need to break down the organic waste in the water. Higher BOD means more organic waste.
- **Unit:** mg/l (measured over 5 days at 20°C).
- **Class B limit:** 3 mg/l or less.
- **Why it matters at a ghat:** flowers, food and other organic offerings raise BOD. High BOD pulls DO down.
- **How Ghat Watch uses it:** scored, weight 0.40. Exceedance = (value − 3) / 9, so 12 mg/l (four times the limit) or more counts as 1.0. "Persistent-BOD floor": BOD above 3 in at least two-thirds of readings since 2024 (minimum 6) with a median of 6 or more lifts a ghat to "Watch". BOD > 6 in 2024–25 triggers "Clean" and a high alert.
- **In the Bhopal data:** 100 of 112 readings are above 3. Highest 22 mg/l at Hathaikheda, Ganesh 2024 after (2024 report p. 71). Shahpura read 10.4–11.4 in Durga 2025 (2025 report p. 65). Lowest 1.3 at Prempura, Ganesh 2023 pre (2023 report p. 26). Even "Lower risk" ghats breach: Khatlapura 12 of 12 readings since 2024, Prempura 9 of 12.

## COD (chemical oxygen demand)

- **Plain meaning:** how much oxygen is needed to break down all the pollution in the water by chemical means, not only what bacteria can eat. It is usually higher than BOD.
- **Unit:** mg/l.
- **Class B limit:** none set.
- **Why it matters at a ghat:** it captures organic and some non-organic material from idols and offerings that uses oxygen.
- **How Ghat Watch uses it:** context only, never scored. A COD context flag triggers "Clean". In uploads, the soft check BOD ≤ COD is applied.
- **In the Bhopal data:** highest 177.84 at Hathaikheda, Ganesh 2024 after (2024 report p. 71). Lowest 10 at Malikhedi, Ganesh 2023 during (2023 report p. 27).

## Total solids

- **Plain meaning:** everything left behind when the water sample is dried: dissolved plus suspended material.
- **Unit:** mg/l.
- **Class B limit:** none set.
- **Why it matters at a ghat:** idol material (clay, plaster, paint) and offerings add solids to the water.
- **How Ghat Watch uses it:** context only. A solids context flag triggers "Clean". In uploads, the soft check dissolved solids ≤ total solids is applied.
- **In the Bhopal data:** highest 1,574 at Bairagarh, Durga 2023 after (2023 report p. 60). Lowest 152 at Prempura, Durga 2024 pre (2024 report p. 25).

## Dissolved solids (TDS)

- **Plain meaning:** the part of the solids that is dissolved in the water and cannot be seen or filtered out.
- **Unit:** mg/l.
- **Class B limit:** none set.
- **Why it matters at a ghat:** dissolved salts and chemicals from materials put into the water raise it.
- **How Ghat Watch uses it:** context only.
- **In the Bhopal data:** highest 1,422 at Bairagarh, Durga 2023 after (2023 report p. 60). Lowest 124 at Prempura, Durga 2024 pre (2024 report p. 25).

## Suspended solids

- **Plain meaning:** small particles floating in the water that a filter would catch.
- **Unit:** mg/l.
- **Class B limit:** none set.
- **Why it matters at a ghat:** broken-down idol material, clay and debris float in the water after immersion.
- **How Ghat Watch uses it:** context only. Not in the Durga 2023 and Durga 2025 tables, so there are only 80 numeric readings.
- **In the Bhopal data:** highest 316 at Hathaikheda, Ganesh 2024 after (2024 report p. 71). Lowest 22 at Malikhedi, Ganesh 2023 pre (2023 report p. 27).

## Turbidity

- **Plain meaning:** how cloudy the water is.
- **Unit:** NTU.
- **Class B limit:** none set.
- **Why it matters at a ghat:** suspended idol material and debris make water cloudy.
- **How Ghat Watch uses it:** context only. A turbidity context flag triggers "Clean". In the statewide forecast, pre-immersion turbidity is the second most important feature.
- **In the Bhopal data:** highest 193.5 NTU at Hathaikheda, Ganesh 2024 after (2024 report p. 71). Lowest 1.4 at Malikhedi, Ganesh 2023 pre (2023 report p. 27).

## Conductivity

- **Plain meaning:** how well the water carries electricity, which shows how much dissolved salt it holds.
- **Unit:** µS/cm.
- **Class B limit:** none set. Class E (irrigation) caps it at 2,250.
- **Why it matters at a ghat:** dissolved material from immersion raises it.
- **How Ghat Watch uses it:** context only. No Bhopal reading exceeds the class E cap.
- **In the Bhopal data:** highest 1,882 at Bairagarh, Durga 2023 after (2023 report p. 60). Lowest 211.4 at Prempura, Ganesh 2024 pre (2024 report p. 70).

## The 4 metals: chromium, lead, zinc, copper

- **Plain meaning:** heavy metals dissolved in the water. In immersion reports they are often linked to idol paint.
- **Unit:** mg/l.
- **Class B limit:** none set for any of the four.
- **Why it matters at a ghat:** painted idols can release metals into the water. Only these four metals were tested.
- **How Ghat Watch uses them:** context only, never scored. A reading of **1.5 mg/l or more** (`METAL_SPIKE_MG_L` in `scoring.py`) is flagged "far above its usual level" and triggers the **"Sample metals"** action. This is a screening trigger chosen by us, not a legal limit. Typical readings are 0.01–0.3 mg/l. Many metal readings are **BDL** (below detection limit): very low, but not zero. IS 10500 drinking-water limits are mentioned in METHOD.md for orientation only and are not used in any calculation.

| Metal | Highest reading (all Ganesh 2024, 2024 report) | Other readings ≥ 1.5 | BDL readings |
|---|---|---|---|
| Chromium | 1.98, Khatlapura, during (p. 69) | – | 65 |
| Lead | 1.77, Bairagarh, after (p. 69) | – | 52 |
| Zinc | 2.67, Hathaikheda, after (p. 71) | 1.96 Khatlapura during (p. 69); 1.54 Rani Kamlapati after (p. 70) | 21 |
| Copper | 2.66, Khatlapura, during (p. 69) | 1.638 Shahpura after (p. 72) | 36 |

Every reading of 1.5 or more is from Ganesh 2024.
