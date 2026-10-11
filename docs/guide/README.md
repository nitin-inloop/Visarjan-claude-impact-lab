# Ghat Watch: explanatory guide

Ghat Watch turns three years of MPPCB immersion water tests (2023 to 2025) into a ranked action list for the Bhopal Municipal Corporation (BMC) officer who plans Durga visarjan on **20 October 2026**. It compares every reading with the CPCB class B (outdoor bathing) limits. It ranks the 7 Bhopal ghats by risk, gives the reason for each rank with the report page, shows missing data as missing, and writes a short brief in Hindi and English. The officer can also upload a new 2026 report and see the ranking change. AI only writes wording, and every AI sentence is checked. The scores come from fixed, documented rules.

This guide is written for three readers: a jury member, a BMC officer and a new developer. Every number in it comes from the repository (the data pack, `backend/ghatwatch/`, `backend/artifacts/` and the method documents).

| # | Document | For whom | What it covers |
|---|---|---|---|
| 1 | [The problem](01-the-problem.md) | everyone | Why immersion water tests go unused, and what the numbers show |
| 2 | [The solution](02-the-solution.md) | jury, officer | What we built, a tour of each screen, design principles |
| 3 | [How the pipeline works](03-how-the-pipeline-works.md) | developer, jury | Data cleaning, scoring, upload/OCR, AI, alerts, brief, voice, ML, fallbacks |
| 4 | [The 13 water-quality parameters](04-water-quality-parameters.md) | everyone | Each test explained, its limit, how Ghat Watch uses it |
| 5 | [Glossary](05-glossary.md) | everyone | Every term and code |
| 6 | [Limits and honesty](06-limits-and-honesty.md) | jury, officer | What the data and the tool do not cover |
| 7 | [हिंदी सारांश](07-hindi-summary.md) | officer | One-page Hindi summary |

Detailed method documents (technical): [METHOD.md](../METHOD.md) (scoring), [METHOD-INTAKE.md](../METHOD-INTAKE.md) (upload and OCR), [METHOD-AI.md](../METHOD-AI.md) (AI, guards, voice), [METHOD-LIVE.md](../METHOD-LIVE.md) (experimental simulator).
