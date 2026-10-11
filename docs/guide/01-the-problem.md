# 1. The problem

## What happens at the ghats

During the Ganesh and Durga festivals, families immerse idols in lakes and ponds at Bhopal's immersion ghats. A ghat is a set of steps or a bank at the water's edge. A kund is a small pond, often built for immersion.

The **MP Pollution Control Board (MPPCB)** tests the water at these ghats three times each festival:

- **pre**: before immersion;
- **during**: during immersion;
- **after**: one week after immersion.

## The reports nobody compares

The results are printed in reports of **90 to 120 pages** (2025: 92 pages, 2024: 118 pages, 2023: 87 pages). They are PDFs. Nobody lines the readings up against the legal limits, or compares one year with the next. So when an officer plans the next festival, the decision rests on memory.

## What the numbers show

We put all Bhopal readings from 2023 to 2025 (1,524 rows, 7 ghats) next to the **CPCB class B** limits. Class B is the national standard for outdoor bathing water. The results are alarming:

| Finding | Number | Limit |
|---|---|---|
| Dissolved oxygen (DO) readings below the limit | **42 of 116** | at least 5 mg/l |
| DO readings of exactly 0 | **4**, all at Bairagarh (Sant Hirdaram) kund | at least 5 mg/l |
| BOD readings above the limit | **100 of 112** | at most 3 mg/l |
| pH readings outside the range | 6 of 115 | 6.5 to 8.5 |

Dissolved oxygen is the oxygen in the water that fish need. Water at 0 mg/l supports no fish life. BOD (biochemical oxygen demand) measures how much organic waste is using up that oxygen. See [the parameters guide](04-water-quality-parameters.md).

These counts are recomputed from the CSV on every build and checked by a test (`backend/tests/test_invariants.py`, test 4).

## Why now

- The **National Green Tribunal (NGT)** has banned immersion in Bhopal's Upper and Lower Lakes.
- **Bhopal Municipal Corporation (BMC)** is building new ghats (source: Free Press Journal, 26 Feb 2026, listed in the data pack).
- **Durga visarjan falls on 20 October 2026**, nine days after this event (11 October).

## Who the user is and what they decide

The user is **the BMC officer who plans Durga visarjan at the ghats**. Before 20 October, this officer decides:

- where to send **aeration** (machines that add oxygen to the water);
- where to send **cleaning crews**;
- where to send **water testing**.

The officer needs a ranked list, the reason for each rank, the page to check it on, and a brief to forward.

## Why it is hard

| Difficulty | What it means |
|---|---|
| **No units** | The reports print no units. The data pack uses the standard unit for each test (mg/l, NTU, µS/cm). |
| **A blank is not clean** | A blank cell means "not sampled". Some ghats were sampled only during immersion. A blank must never be read as 0 or as good water. |
| **BDL** | "Below detection limit": the value is very low, but it is not zero and not missing. |
| **Only 4 metals** | Only chromium, lead, zinc and copper were tested. |
| **Whole tables missing** | The 2025 report has no Durga table for Bairagarh and Malikhedi. |
| **No coliform** | Class B also has a coliform (bacteria) limit, but the reports do not test coliform. |
| **An ambiguous site** | "Rani Kamlapati ghat / Kamla Park kund": the Ganesh tables say "Kamla Park kund", the Durga tables say "Lower Lake ghat". It may be two places. |

## The 7 Bhopal ghats

| Ghat | Water body | Note |
|---|---|---|
| Bairagarh (Sant Hirdaram) kund | Upper Lake | No Durga 2025 table |
| Khatlapura ghat | Lower Lake | |
| Prempura ghat | Upper Lake | |
| Rani Kamlapati ghat / Kamla Park kund | Lower Lake | May be two places (site match confidence "medium") |
| Hathaikheda dam / kund | Hathaikheda dam | |
| Malikhedi kund | Kund | No Durga 2025 table |
| Shahpura lake ghat | Shahpura Lake | |

Source: `track-2-visarjan-ghat-watch/PROBLEM-STATEMENT.md` and `docs/METHOD.md`.
