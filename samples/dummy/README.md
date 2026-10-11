# Dummy intake reports: SYNTHETIC TEST DATA

**Everything in this folder is synthetic. It is not real MPPCB data and must never be used as evidence for a decision.**
Every page is stamped "SYNTHETIC TEST DATA - NOT REAL MPPCB DATA".

The layout copies the MPPCB immersion-report tables (2025 report, pp. 28-30): a `Location- <site>` line, then
`S. No. | Parameter | Pre Immersion`. The values are invented to test the intake pipeline (upload, extract, normalise,
validate, analyse, accept).

| File | What it tests |
|---|---|
| `durga-2026-pre-SYNTHETIC.pdf` | Text-layer PDF, 2 pages, "Durga 2026 pre-immersion": Khatlapura, Prempura, Bairagarh and a new kund (Ahmedpur Visarjan Kund) |
| `durga-2026-pre-SYNTHETIC-scanned.pdf` | The same pages as an image-only PDF with no text layer, so the pipeline has to use OCR |
| `durga-2026-pre-SYNTHETIC-p1.png`, `-p2.jpg` | The page images on their own (image upload path) |
| `expected.json` | Cell-by-cell values that a correct extraction should produce (51 cells) |

The traps built into the data:
- Khatlapura DO printed as `45` (a typo for 4.5). It must be flagged as implausible (outside 0-20 mg/l) and never scored.
- Prempura Lead is `BDL`. Prempura Turbidity is blank, which must come out as "not sampled" and never as clean.
- Bairagarh pH is `*` (not sampled), and Bairagarh has no Conductivity row at all.
- "Ahmedpur Visarjan Kund" is not one of the 7 ghats. It must stay unmatched and unranked.

To regenerate (needs reportlab and Pillow), run from `backend/`: `python scripts/make_dummy_reports.py`
