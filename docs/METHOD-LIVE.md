# Ghat Watch Live: method and assumptions

**Everything in the live view is simulated.** No sensor is deployed. The simulator exists so the pipeline (readings, processing, alerts, dispatch, sitrep, voice) can be shown working end to end. Code: `backend/ghatwatch/live/`.

## What is simulated

Seven Bhopal ghats on the night of 20 Oct 2026, from 15:00 to 06:00 IST (15 sim-hours, in 60-s steps). Speeds are 1x, 60x, 180x (the default) and 600x. The engine ticks once per real second (`GHATWATCH_LIVE_TICK_S`).

The simulator tracks dissolved oxygen (DO), BOD, suspended solids and turbidity, conductivity, and idol arrivals. COD is derived as BOD x the ghat's observed COD/BOD ratio. pH and temperature are a baseline plus noise. There is no pH nudge from plaster of Paris (gypsum is pH-neutral), and metals are not simulated (they are lab-only).

## Observed and hidden values

- **Sensored ghats** (Shahpura, Rani Kamlapati, Khatlapura, Prempura, Hathaikheda):
  - DO, pH, turbidity, conductivity and temperature are reported every sim-minute, with noise (DO ±0.15, pH ±0.05, turbidity ±5 %, conductivity ±2 %), 1 % dropout and 0.1 % implausible spikes, which the processor rejects.
  - BOD, COD and TSS are lab samples taken every 60 sim-min, with results 30 min later and ±10 % error. The first BOD therefore arrives about 90 min in. Until then BOD is `null`, and the ghat cannot be `low` (note: "DO within limit, BOD not yet measured").
- **Bairagarh and Malikhedi have no sensor.** Their values stay `null` and their tier is `no_data` (never clean) until a test team arrives. The team then reports field readings for 120 sim-min plus one lab BOD set 30 min after arrival. The simulator's hidden state never appears in `values`, `points` or `series`.

## Starting conditions (observed)

- The 5 sensored ghats start from their Durga 2025 "pre" readings (MPPCB 2025 p. 64/65).
- Bairagarh and Malikhedi have no Durga 2025 table, so they start from their Ganesh 2025 "during" readings (p. 28/29), marked "assumed".
- The start is a steady state. Background terms `B_DO` and `B_BOD` are solved so that nothing drifts when no idols arrive (tested: within ±0.3 mg/l over 15 h).

## Dynamics (rates per day)

- `dDO/dt = k2 (DO_sat − DO) − k1·BOD/0.68 − SOD/depth − K_IOD·IOD + B_DO`
- `dBOD/dt = −k1·BOD + B_BOD` (plus an instant load from each idol)
- `DO_sat` follows the APHA formula at 26 °C (about 8.0 mg/l).
- `k1 = 0.23 × 1.047^(T−20)`, and BOD5 is 0.68 of ultimate BOD.
- DO is clamped to `[0, max(1.6 × DO_sat, observed max for the ghat)]`.

| Water-body type | Ghats | V (m³) | depth (m) | k2 (/d) | SOD (g/m²/d) | L_idol (g BOD/idol) |
|---|---|---|---|---|---|---|
| kund | Bairagarh, Malikhedi | 3,000 | 2.0 | 0.5 | 2.0 | 8 (uncalibrated default) |
| lake ghat | Prempura, Khatlapura, Rani Kamlapati | 30,000 | 3.0 | 1.5 | 1.0 | 35 (fitted; default 4) |
| dam | Hathaikheda | 40,000 | 4.0 | 2.0 | 1.0 | 25 (fitted; default 3) |
| Shahpura lake | Shahpura | 25,000 | 2.5 | 1.0 | 1.5 | 87.5 (fitted; default 5) |

Other assumptions:

| Assumption | Value |
|---|---|
| Immediate oxygen demand (flowers, offerings, stirred-up sediment) | 60 g O₂ per idol, decaying at 4 per day |
| Fine solids that stay suspended | 500 g per idol; turbidity = 0.8 × TSS; settling 2 per day |
| Settled solids add to SOD | +0.1 per 100 mg/l, capped at +1 |
| Plaster of Paris conductivity | 0.4 µS/cm per PoP idol per 1,000 m³, dissolving over about 6 h; PoP share 0.4 |
| Idol arrivals | Non-homogeneous Poisson, 12,000 idols in total. Relative intensity: 0.5 (15–17 h), 3.0 (17–23 h), 1.0 (23–02 h), 0.2 (02–06 h) |

### Scenarios

- `ban_enforced` (default): 85 % of idols go to the kunds, Hathaikheda and Shahpura (30/20/20/15 %); 5 % each still trickles into the three lake ghats.
- `ban_not_enforced`: 2025-like shares, with 15 % at each lake ghat.
- `aerators_prepositioned`: aerators already working at Shahpura and Rani Kamlapati at 15:00.
- `heavy_rain`: rain from 18:00 to 21:00. Excess BOD and TSS are diluted 10 % per hour, runoff adds 10 mg/l TSS per hour, and k2 rises by 0.5.

### Interventions (assumed effects)

| Intervention | Effect |
|---|---|
| Aerator | k2 +3 per day per set, at most 2 sets effective |
| Cleaning crew | Organic input halved and suspended solids cut 40 % for 120 min |
| Test team | Readings for 120 min (see above) |
| Diversion | 70 % of the ghat's arrivals go to the nearest kund |

Travel time is the straight-line distance between the approximate coordinates (PLAN-LIVE §6) at 25 km/h, plus 10 min setup.

## Processing, alerts and suggestions

**Windows and trends.** Each reading feeds a 5/30/60-min window. The slope is a least-squares fit over the last 30 min and needs at least 10 readings. An ETA is given only when DO is falling at least 0.2 mg/l per hour.

**Hysteresis.** DO enters breach when the 5-min mean drops below 5 and clears when the 30-min mean reaches 5.5 or more. BOD enters breach above 3 and clears at 2.7 or less.

**Live score and tier.** The live score uses the v1 exceedance function and weights (0.45 DO, 0.40 BOD, 0.15 pH), renormalised over the parameters available.

| Tier | Condition |
|---|---|
| critical | DO below 2 |
| high | DO below 3, or score 0.45 or more |
| medium | score 0.25 or more, or BOD above 6 |
| no_data | sensor `none` or `stale` (no reading for over 10 min) |

**Alert codes.**

| Code | Severity |
|---|---|
| `DO_LOW` | warn below 5, high below 3, critical below 1 |
| `DO_ETA_60` | high |
| `DO_FALLING_FAST` | warn (slope −1 per hour or steeper, with DO below 6.5) |
| `BOD_HIGH` | warn above 3, high above 8 |
| `NO_SENSOR` | info |
| `SENSOR_STALE` | warn |
| `IDOL_SURGE` | info (at least 30 idols per hour and at least 1.5 × the ghat's mean hourly rate) |

How alerts behave:

- A ghat has at most one open alert per code.
- Severity only escalates while an alert is open.
- An alert resolves after its condition has been clear for 15 sim-min.
- Conditions already true at 15:00 open with `baseline:true` and are not spoken. A baseline alert loses that flag if it later escalates beyond its starting severity.

**Suggestions.** These use the v1 CQL Q-table (used because its do-nothing check passed), mapped as in amendment I:

- The state is the DO tier, the BOD tier, whether the ghat is known, and the trend (±0.5 mg/l per hour).
- Unknown DO or BOD counts as tier 1.
- `rank_score = (Q[s,a] − Q[s,none]) / cost − 0.02 × travel_min`.
- Diversion is rule-based: it applies only to lake ghats under the NGT ban that have arrivals.
- Every suggestion is labelled experimental.

## Calibration result (calibration-lite)

`L_idol` was fitted per water-body type by grid search. The target was the observed Durga 2025 pre→during BOD change at 21:00 sim time, at the 5 sensored ghats, under the default scenario with expected arrivals. **This is fitted on 5 ghats and one festival. It is a sanity check, not validation.**

| | Fitted simulator | No-change baseline |
|---|---|---|
| BOD change MAE (fitted) | **0.38 mg/l** | 1.68 mg/l |
| DO change MAE (out of fit) | 0.91 mg/l | 0.60 mg/l |
| Turbidity change MAE (out of fit) | 12.1 NTU | 12.6 NTU |

- The DO change has the same sign as observed at 3 of 5 ghats.
- The simulator under-predicts the DO drop at the lake ghats: about −0.2 mg/l simulated against −0.9 and −1.7 observed.
- It over-predicts the DO drop at Shahpura and Hathaikheda, where the observed change was +0.3 and 0.0.
- One BOD parameter per type cannot fit both Rani Kamlapati (+2.0) and Khatlapura/Prempura (+0.2/+0.4).
- The kund value is not fitted, because no kund has a sensor.

Artifact: `backend/artifacts/live/calibration.json` (copied to `frontend/public/data/live/`), regenerated by `python backend/scripts/build_artifacts.py`.

## Limits

- Every rate and volume above is an assumption, chosen to be plausible, not measured.
- The coordinates are approximate.
- Each ghat is a single well-mixed cell, with no transport between ghats.
- There is no diurnal photosynthesis term; the steady-state background absorbs it.
- The CQL policy was trained on the v1 simulator, not on this one.
- Durga 2025 has only 3 samples per ghat, so the shape of the live curves between them is invented.
- `p_breach` is the static v1 pre-immersion estimate and is not updated live.
- The action log (`backend/live_logs/actions.jsonl`) records simulated dispatches only.
