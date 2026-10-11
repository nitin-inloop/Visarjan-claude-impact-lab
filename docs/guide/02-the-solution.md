# 2. The solution

## One user, one workflow, one outcome

| | |
|---|---|
| **User** | The BMC officer who plans Durga visarjan at the ghats. |
| **Workflow** | Open the dashboard → read the ranked ghats and alerts → check a reason against its report page → (optionally) upload the 2026 report → forward the brief. |
| **Outcome** | A ranked list of the 7 ghats by water-quality risk, the reason for every rank in plain words, every number traceable to the MPPCB report page, missing data shown as missing, and a brief in Hindi and English. |

## Status words

Every ghat gets one status. The status is always shown with an icon, a colour and a word, never colour alone.

| Status on screen | Backend tier | Meaning |
|---|---|---|
| **Not tested** (grey, "?") | Insufficient data | Too little recent data to judge. Never green. Always listed first. Action: test first. |
| **Danger** ⛔ | High | Act here first. |
| **Watch** ⚠ | Medium | Keep an eye on it. |
| **Lower risk** ▽ | Low | Lower than the other ghats, **not clean**. These ghats still broke the BOD limit in past tests. Never green. |

## Result on the current data (built 11 Oct 2026)

| Rank | Ghat | Status | Why (from `ranking.json` / README) |
|---|---|---|---|
| 1 | Bairagarh (Sant Hirdaram) kund | Not tested | No Durga 2025 table. DO 0 mg/l during Ganesh 2025 (2025 report p. 28). |
| 2 | Malikhedi kund | Not tested | No Durga 2025 table. DO 0.6 mg/l during Ganesh 2025 (p. 29). |
| 3 | Shahpura lake ghat | Danger | DO 2.5–2.8 mg/l, BOD 10.4–11.4 in Durga 2025 (p. 65). |
| 4 | Rani Kamlapati ghat / Kamla Park kund | Danger | DO 2.4–2.6 mg/l in all three Durga 2025 phases (p. 64). |
| 5 | Hathaikheda dam / kund | Watch | BOD above 3 in 12 of 12 readings since 2024, median 7 mg/l. |
| 6 | Khatlapura ghat | Lower risk | BOD still above 3 in 12 of 12 readings since 2024 (median 5.8). |
| 7 | Prempura ghat | Lower risk | Lowest BOD of the seven; DO 3.9 during Ganesh 2024 (p. 70). |

## Tour of the screens

| Screen | Address | What the officer sees | What the officer does |
|---|---|---|---|
| **Dashboard** | `/` | Days left until 20 October; 4 headline numbers (DO below limit 42/116, BOD above limit 100/112, ghats needing action, days left); a chart of limit breaches by festival and phase; the forecast; the map; the alerts; the ghat priority table with status, reason and actions. | Reads which ghats need what. Opens a ghat. |
| **ML Insights** | `/models` | The 4-model leaderboard, what drives the forecast, each ghat's forecast and how far the 4 models agree, and a "how to read this" panel. | Reads the outlook as an estimate. It does not change the ranking. |
| **Upload & OCR** | `/intake` | Upload a 2026 test report (PDF or photo). The values are extracted with their page and confidence. Suspicious values (for example DO 45) are held back for checking. A fast AI answer explains what the report shows, which ghat needs what by when, and what is missing. The before → after status change is shown. | Reviews the rows, presses **Accept** to update the ranking (or removes the upload to restore the original ranking). |
| **Ghat map** | `/map` | Markers numbered by priority and coloured by status. Mapbox streets or satellite when a token is set, otherwise OpenStreetMap and Esri satellite. | Sees where the priority ghats are. Positions are approximate. |
| **Brief** | `/brief` | A WhatsApp-length summary and the full brief, in Hindi and English. | Copies, shares or prints it. Can listen to it (voice). |
| **Ghat page** | `/ghat/[slug]` | Every reading for one ghat against its limit, the reasons with page links to the PDF, the data gaps, the actions. | Checks a number against the report page. |
| **What-if** | `/whatif` | Enter 2026 pre-immersion values for a ghat (or a new BMC kund) and see it re-scored. Impossible values (negative, DO > 20, pH > 14) are rejected with a message. | Tries fresh test results before they are official. |
| **Lab** | `/lab` | An experimental live simulator and budget allocation. | Optional. Clearly labelled experimental. Not part of the main workflow. |

## What the officer gets on day one

- A ranked list of the 7 ghats, with the reason for each rank and the page to check it on.
- A clear list of what is missing ("Not tested"), with "Test first" as the action (pre-immersion sample by 17 Oct).
- Actions per ghat: **Aerate**, **Clean**, **Test first**, **Sample metals**, and an NGT lake-ban banner for the four lake ghats.
- Alerts with deadlines counted back from 20 October.
- A brief in Hindi and English to forward.
- A way to add the 2026 test results and see the ranking update.
- It runs with no API keys and keeps working if the API is down (saved snapshot).

## Design principles

1. **Traceability.** Every reason carries year, festival, phase, parameter, value, unit, limit and the report page. Page links open the original PDF.
2. **Missing is not clean.** Blanks are "not sampled", never 0. A ghat with no recent table is "Not tested" and goes to the top, not the bottom.
3. **No health claims.** Readings are reported against limits. The AI checks reject health words in English and Hindi.
4. **Rules decide, AI only words.** Score, tier, rank, action and deadline come from fixed rules in `scoring.py` and `alerts.py`. AI may only rephrase, and only if every number survives.
5. **Hindi and English** everywhere: reasons, brief, alerts, answers.
6. **Voice.** The brief and answers can be read aloud (ElevenLabs if a key is set, otherwise the browser voice). Only text already on screen is spoken.
7. **Honest labels.** "Lower risk" is never "safe". The forecast is labelled an estimate. Officer-added readings are labelled "not yet verified by MPPCB".
