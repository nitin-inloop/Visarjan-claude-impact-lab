# Ghat Watch — report intake method (phase 3)

Code: `backend/ghatwatch/intake/`. Contract: `docs/PLAN-INTAKE.md` §4 (copied into `intake/schema.py`).

## Pipeline ("processing agents")

Each job runs five stages in a background thread. Each stage records its status, start and end times, short log lines in English and Hindi, and a summary:

1. **Extractor**: reads text PDFs with `pypdf` layout mode, or with `pdftotext -layout` when pypdf returns almost nothing and pdftotext is installed. Scanned PDFs (little text), photos (PNG/JPEG) and uploads with `force_ocr` go to OCR. The parser runs on the result.
2. **Normaliser**: maps printed parameter names (`D.Oxygen`, `DO`, `suspended-solids`, `Cond.`, `TDS`, `BOD (5 days 20C)`, `Cr/Pb/Zn/Cu`, Hindi labels) to the 13 standard names. It also maps printed site names to the v1 slugs:
   - every `site_as_printed` variant in the data pack matches with confidence 1.0;
   - a site with one distinctive name token matches with confidence 0.9;
   - otherwise a fuzzy match (rapidfuzz if present, else difflib) needs a ratio of at least 0.75 and is capped at 0.85;
   - anything else stays `slug: null`. Places outside Bhopal (Sehore, Jabalpur, …) are never merged into a Bhopal ghat.
3. **Validator**: checks plausibility ranges (DO 0–20, pH 0–14, BOD 0–500, COD 0–2000, turbidity 0–2000, conductivity 0–10000, metals 0–50) and rejects negatives. Soft checks: BOD ≤ COD and TDS ≤ TS. It flags low read confidence and unknown year, festival or phase. A row that duplicates a pack cell (same year, festival, ghat, phase and parameter) is marked `already_in_pack`, and the pack value wins. It also reports unmatched sites and completeness per table.
4. **Analyst**: gives each reading its CPCB class B status. It runs the v1 `assess_ghat` before and after adding the job's scorable rows as `extra` readings, so each ghat gets tier, score and rank before and after. Before = pack plus rows already accepted from other jobs. The four-model forecast is the v1 what-if path, generalised to the year and festival of the entered pre values; for Durga 2026 it is identical to `/api/whatif`. The allocation hint comes from the experimental CQL Q-table (`rl.allocate`).
5. **Reporter**: writes a bilingual markdown report: source, pages, quality, sites, before → after, forecast, reasons, issues. It always includes "officer-added readings, not yet verified by MPPCB".

Nothing reaches the ranking until the officer accepts. Accepted rows go to `backend/intake_data/accepted_readings.csv`, which is kept apart from the read-only pack (v1 columns plus `job_id, source_file, accepted_at, entered_by="officer"`). `/api/ranking` re-scores the ghats with these rows unless `?include_user=0`. It returns `user_data`, and every reason built on an officer-added reading cites "officer-added from <file> page N (not yet verified by MPPCB)" with `source.pdf = null` and `source.upload = <job id>`.

Scoring rules for officer-added rows:
- New rows use `W_YEAR.get(year, 1.0)`.
- Accepted 2023–2025 rows that are not in the pack fill coverage. Denominators stay 2023–2025, and `YEARS` is unchanged.
- An accepted Durga 2026 row lifts the "no Durga 2025 table" rule, the same way the what-if does.
- An officer-added breach is always shown among the reasons.

Live hook: on the next reset, `live.simulator.initial_conditions()` prefers an accepted 2026 pre-immersion row for a ghat and names the upload as the source (`initial_source`).

## What the parser handles (measured)

| Test | Pages | Result |
|---|---|---|
| 2025 Ganesh + Durga, Bhopal (`Location-` headers, `S. No. Parameter Pre/During/After`) | 2025 pp. 28–30, 64–65 | **453 / 453 rows = 100 %** match the v1 CSV (site, phase, parameter, value or flag) |
| 2024 Ganesh, Bhopal (site line without `Location-`, `S.No. Parameter` + `2024 2024 2024` year line) | 2024 pp. 69–72 | **273 / 273 = 100 %** |

How the parser reads the tables:
- Each cell goes to the Pre, During or After column whose header centre is nearest. Blank cells therefore stay blank (`not sampled`). Example: the 2025 Bairagarh and Malikhedi tables, which print `*` / `* *` and only a During column.
- Codes: `BDL`, `ND`, `*`, `**` (also `* *`), `_`, `-` and blank become flags. Clean numbers get confidence 1.0, fuzzy ones (OCR `0.03.`, `7,3`) 0.7.
- Year and festival come from the page header or footer ("Ganesh Idol Immersion -2025", "Durga Visarjan 2025", "XL/W.comp/Ganesh") and carry forward across pages. The upload form fills only what the page does not print.
- Tables for other districts on the same pages (Sehore, Rajgarh, Jabalpur) are extracted but stay unmatched.

Not tested: the 2023 CPCB report layout (pp. 26–28, 59–61).

## OCR (PaddleOCR, isolated venv)

`intake/ocr_worker.py` is a standalone script run with `backend/.ocr-venv/Scripts/python`. The API process never imports paddle.

Worker settings:
- Pages are rendered with pypdfium2 at 150 dpi.
- PaddleOCR 3.x runs with `lang="en"` and `enable_mkldnn=False`. Paddle 3.3's oneDNN/PIR path raises `NotImplementedError` at `predict()` on this Windows CPU.
- Textline orientation is off.
- Models come from `GHATWATCH_OCR_DET` / `GHATWATCH_OCR_REC` (default `PP-OCRv5_mobile_det` / `PP-OCRv5_mobile_rec`).
- Each page is a separate worker call with a 900 s timeout and a log line per page.

The worker rebuilds text lines from the word boxes:
- boxes are clustered on y (tolerance 0.6 × median box height) and sorted by x;
- each box is placed at its character column (x / median character width), with two or more spaces between boxes, so `parse_mppcb` reads OCR text exactly like PDF text;
- per-cell confidence = min(parse confidence, OCR box score).

When OCR ran on a table that also exists in the pack, the job measures how many pack values it recovered (`job.ocr.measured_recovery`). The measurement is also written to `intake_data/ocr_measurement.json` and shown under `capabilities.ocr.measured`.

Measured on the 2025 report, page 28 (three Bhopal tables, 117 values), at 200 dpi with the default PP-OCRv6 medium models and textline orientation on:
- Khatlapura 39/39, Prempura 39/39, Bairagarh 33/39 (two parameter labels were garbled), so 111/117 = 94.9 % on the page;
- about 6 minutes of CPU time for the page.

Measured through the API with the final settings: page 28 rendered to a 150 dpi PNG, uploaded with `force_ocr`, PP-OCRv5 mobile models, two other OCR jobs competing for the CPU:
- 194 text boxes, mean box score 0.994;
- **117 / 117 pack values recovered (100 %)**, Khatlapura 39/39;
- 203.7 s of OCR time (207 s wall).

Pytest test 7 (opt-in with `GHATWATCH_RUN_OCR_TEST=1`) runs the worker on the PDF page directly: Khatlapura **39/39 (100 %) in 109.8 s**.
The coordinator timed the same configuration at about 167 s while other OCR jobs were running. Expect about 2–3 minutes per full page on this CPU; a photo of one table is faster.

Not verified: photos taken on a phone (skew, shadows), handwritten corrections, Hindi-script tables, and any page other than page 28.

## Honesty

- Extracted values are proposals until an officer reviews them.
- Confidence is shown for every cell.
- Officer-added rows are stored apart from the pack and labelled "not yet verified by MPPCB" in the ranking (`user_data.note`), in the reasons and in the report.
- Unmatched sites are never merged silently.
- Duplicates of pack cells never override the pack.
