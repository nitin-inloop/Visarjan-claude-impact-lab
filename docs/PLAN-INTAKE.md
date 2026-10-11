# Ghat Watch — Phase 3: real map, report intake (PDF / photo / manual), OCR, agentic processing

Written 13:50, 11 Oct 2026. Deadline 17:00. Agents report by 15:10. Builds on v1 (PLAN.md) and Live (PLAN-LIVE.md); nothing existing may break (17 pytest, lint, build).

## 0. What the officer gets

1. **A real map of Bhopal** on the command center: OpenStreetMap tiles (dark CARTO style), the 7 ghats and the depot as live markers coloured by tier, resources shown where they are. Offline, the existing schematic takes over automatically.
2. **Report intake**: drop an MPPCB PDF (text or scanned), a photo of a report table, or type readings by hand. The system extracts the readings, normalises names and codes, validates them, re-ranks the ghats with the new data, runs the four-model forecast on the new pre-immersion values, suggests allocation, and writes a bilingual intake report. Every step is shown as a stage with its log. Nothing enters the ranking until the officer reviews the extracted table and presses Accept.
3. **OCR with PaddleOCR** for scanned pages and photos, running in an isolated Python environment so it can be absent without breaking anything. Per-cell confidence is shown in the review table.

## 1. Scope (ordered)

Backend MUST: text-PDF extraction (pypdf layout; pdftotext if present), MPPCB table parser proven against the data pack, normaliser, validator, analyser (class B per reading, re-rank with extra readings, 4-model forecast, allocation hint), bilingual report, job store, review/accept flow, ranking integration (`user_data_included`), capabilities endpoint, tests.
Backend SHOULD: OCR worker in `backend/.ocr-venv` (PaddleOCR PP-OCRv5 via subprocess; pypdfium2 page rendering; table reconstruction from word boxes; confidence per cell), page images for the review UI, live simulator initial conditions refreshed from accepted 2026 pre readings on next reset.
Frontend MUST: Leaflet map with tile fallback to the schematic; Intake tab in the command center and `/intake` classic route: dropzone + manual form, stage timeline, review table with confidence colours and page image, Accept/Reject, results (before → after tier/score per ghat, forecast champion + four models, reasons with citations to the uploaded document page, download report), accepted-data list with remove; "includes officer-added data" badge wherever the ranking is shown.
Frontend SHOULD: camera capture on phone (`<input capture>`), refined marker coordinates via a quick web search (label approximate), resource markers on the map.
COULD: side-by-side page image with highlighted word boxes; LLM polish of the report when a key exists.

## 2. Backend design — `backend/ghatwatch/intake/`

```
intake/
  schema.py        Row, Job, Stage, Capabilities docstrings (plain dicts; shapes in §4)
  extract_text.py  pypdf layout text per page (fallback pdftotext -layout if on PATH); returns [{page, text}]
  parse_mppcb.py   MPPCB layout → rows: finds "Location-"/"Location:" headers (site_as_printed), the
                   "Parameter | Pre | During | After" tables, 13 parameter rows (+ S.No. prefixes), codes
                   (BDL, ND, *, **, _, -, blank → flag), numbers; emits one row per (site, phase, parameter)
                   with page, value_as_printed, parse_confidence (1.0 clean number, 0.7 fuzzy)
  ocr_worker.py    STANDALONE script run with backend/.ocr-venv/Scripts/python: args <file> <out.json>
                   [--pages a-b]; renders PDF pages (pypdfium2, 200 dpi) or loads image; PaddleOCR
                   (lang="en", use_textline_orientation=True); writes words [{page, text, box, conf}] and a
                   per-page text reconstruction (cluster by y, sort by x, join with 2+ spaces) that
                   parse_mppcb can consume; also writes page PNGs next to out.json
  ocr.py           detects the venv + paddleocr import; runs the worker with a 300 s timeout; capabilities()
  normalize.py     parameter aliases (D.Oxygen/DO/Dissolved Oxygen → "Dissolved oxygen"; suspended-solids;
                   Total Solids; Cond.; Cr/Pb/Zn/Cu names; Hindi labels if present) → the 13 standard names;
                   site aliases → slug via the v1 site_as_printed strings + fuzzy (rapidfuzz if available,
                   else difflib ratio ≥ 0.75) with match_confidence; unmatched sites kept with slug=null;
                   phase names; year/festival from the page header ("Ganesh Idol Immersion -2025",
                   "Durga Visarjan 2025") or from the form; units assumed as v1; codes → flag
  validate.py      plausibility (DO 0–20, pH 0–14, BOD 0–500, COD 0–2000, turbidity 0–2000,
                   conductivity 0–10000, metals 0–50), BOD ≤ COD soft check, TDS ≤ TS soft check,
                   duplicate of an existing pack row (same year/festival/site/phase/parameter) → "already in
                   pack", completeness per table, overall quality score; issues [{row_id, level, text{en,hi}}]
  analyze.py       per-reading class B status; for each affected slug: v1 assess before (pack only) and
                   after (pack + accepted-or-reviewed rows as `extra` Readings); forecast via the v1
                   what-if/predict path from the new pre values (champion + 4 probabilities + top reasons);
                   allocation hint from rl.allocate for the new state; what changed (tier, score, rank)
  report.py        bilingual markdown: source file + pages, rows accepted, per-ghat before→after, forecast,
                   issues, the sentence "officer-added readings, not yet verified by MPPCB"
  store.py         jobs: in memory + backend/intake_data/jobs/<id>/job.json, uploads under
                   backend/intake_data/uploads/, accepted rows appended to
                   backend/intake_data/accepted_readings.csv (v1 column set + job_id, source_file,
                   source_page, accepted_at, entered_by="officer")
  pipeline.py      the "processing agents": Extractor → Normaliser → Validator → Analyst → Reporter;
                   each stage records status (pending/running/done/failed/skipped), started/finished, log
                   lines (en/hi short), and output summary; runs in a background thread; job.status
  api.py           router, full paths under /api/intake
```

Ranking integration: `data.load_user_readings()` reads `accepted_readings.csv` (empty-safe); `scoring.rank_all(extra_by_slug=…)`; `/api/ranking` includes accepted rows by default and returns `user_data: {included: true, rows: n, sources: [...]}`; `?include_user=0` disables. Reason text for a user row cites "Officer-added from <file> page N (not yet verified by MPPCB)" instead of an MPPCB report page; `source.pdf` is `null` and `source.upload` is the job id so the UI links to `/api/intake/jobs/{id}/page/{n}.png`. New rows use `W_YEAR.get(year, 1.0)`; coverage denominators stay 2023–2025 (do not change `YEARS`); the tier rule "no Durga 2025 table" is lifted by any accepted 2026 Durga row for that ghat (same as what-if `has_2026`).
Live hook (SHOULD): `live.simulator.initial_conditions()` prefers an accepted 2026 pre row per ghat when present and sets `initial_source` to the upload.

Tests `backend/tests/test_intake.py` (< 40 s, no network; OCR test skipped when the venv is absent):
1. Parser on the 2025 PDF pages 28–30 and 64–65 reproduces the v1 CSV: ≥ 97% of the 453 2025 Bhopal rows match (site slug, phase, parameter, value or flag); print the mismatches.
2. Parser on 2024 pages 69–72 (different layout: "S.No. Parameter" with year lines) matches ≥ 90% of the 2024 Ganesh Bhopal rows.
3. Normaliser maps 12 alias strings and 7 site_as_printed strings; an unknown site returns slug null with confidence < 0.5.
4. Validator flags DO 25, pH 15, a negative, and a duplicate pack row.
5. Manual job: POST rows for Shahpura "Durga 2026 pre" with DO 1.0 → job done, analysis shows tier high, forecast has 4 model probabilities in [0,1]; Accept → `/api/ranking` reports `user_data.rows == n`, Shahpura reason cites the upload; `include_user=0` restores the original.
6. Pipeline stage records exist for all five stages with status done; a bad file yields Extractor failed and others skipped.
7. OCR (skip if unavailable): render 2025 page 28 to PNG via the worker, OCR it, parse → ≥ 80% of the 39 Khatlapura values recovered; store the measured figure in the job and print it.

## 3. Frontend design

Map: `components/live/MapLeaflet.tsx` (client, dynamic import with `ssr:false`, `leaflet` 1.9.4 + its CSS; no react-leaflet). Tiles: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` with attribution "© OpenStreetMap contributors © CARTO"; on `tileerror` for the first tiles or when offline, unmount and show the existing schematic with a note "map tiles unavailable, schematic shown". Markers: `L.divIcon` circles coloured by tier with the pulse ring when an alert is open, label with name and DO, click → select ghat; depot square; resources as small glyphs at their `at`/`target` positions (en_route shown at the target with the ETA). Fit bounds to the 7 ghats + padding; zoom 12. Coordinates: start from §6 of PLAN-LIVE.md; spend at most 10 minutes refining with web search (Khatlapura ghat, Prempura ghat, Sant Hirdaram Nagar visarjan kund, Kamla Park, Hathaikheda dam, Shahpura lake, Malikhedi) and keep the "positions approximate" note.

Intake UI: `components/intake/IntakePanel.tsx` used by both the command-center tab "Intake" and `app/(classic)/intake/page.tsx`. Parts:
- Source chooser: Upload (PDF/JPG/PNG dropzone; phone camera via `<input type=file accept="image/*,application/pdf" capture="environment">`), Manual (form: ghat select or "new site" name, year, festival, phase, 13 parameter inputs with units and a "BDL / not sampled" toggle per cell, source note/page).
- Context fields for uploads: year, festival (auto-detected from the page header when possible; editable).
- Stage timeline: five "processing agents" with status dots, elapsed time, and the log lines (en/hi); OCR confidence summary when OCR ran.
- Review table: rows grouped by site → phase, cells with value, flag, confidence colour (≥ 0.9 plain, 0.7–0.9 amber, < 0.7 red), editable inputs, site mapping dropdown when the slug is null or confidence < 0.8, issue badges from the validator, page image thumbnail per table (`/api/intake/jobs/{id}/page/{n}.png`) opening full size.
- Buttons: Re-run analysis with corrections, Accept (persists), Reject.
- Results: per affected ghat before → after (tier chips, score, rank), new reasons with citations, forecast panel (champion probability + the four model bars + top reasons + the estimate caveat), allocation hint, Download report (.md, en/hi), link to the Plan tab.
- Accepted data list: rows count by ghat/year/festival, source, accepted time, Remove.
- Capabilities banner: "Text PDFs: ready · OCR (PaddleOCR x.y): ready / not installed — how to enable".
Badges: wherever the ranking renders (Plan tab, classic home, brief), show "includes officer-added data (n rows, not yet verified by MPPCB)" when `user_data.included`.
i18n: all new strings en + hi. Dark theme tokens only. `npm run build` + `lint` clean.

## 4. Contract (frozen; both sides copy verbatim)

- `GET /api/intake/capabilities` → `{text_pdf: true, ocr: {available: bool, engine: "PaddleOCR 3.x"|null, venv: "backend/.ocr-venv", how_to_enable{en,hi}}, max_upload_mb: 25}`.
- `POST /api/intake/upload` (multipart: `file`, optional `year`, `festival`, `pages` like "28-30", `force_ocr` bool) → `{job_id}`. `POST /api/intake/manual` body `{year, festival, site: {slug|null, name}, phase, readings: {parameter: {value: number|null, flag: string|null}}, source_note}` → `{job_id}`.
- `GET /api/intake/jobs` → `[JobSummary]`; `GET /api/intake/jobs/{id}` → `Job`; `GET /api/intake/jobs/{id}/page/{n}.png` → PNG (rendered page or uploaded image); `POST /api/intake/jobs/{id}/rerun` body `{rows: [Row]}` (corrected rows) → `Job`; `POST /api/intake/jobs/{id}/accept` body `{rows: [Row]}` → `{ok, accepted_rows, ranking_changed: [slug]}`; `POST /api/intake/jobs/{id}/reject` → `{ok}`; `GET /api/intake/jobs/{id}/report` → `{markdown{en,hi}}`; `GET /api/intake/accepted` → `{rows: n, groups: [{job_id, source_file, year, festival, slug, site_name, phases: [..], rows, accepted_at}]}`; `DELETE /api/intake/accepted/{job_id}` → `{ok}`.
- `Row = {row_id, page: number|null, site_as_printed, slug: string|null, site_match_confidence: number, year, festival: "Ganesh"|"Durga", phase: "pre"|"during"|"after", parameter (standard name), parameter_as_printed, value: number|null, flag: string|null, value_as_printed, unit_assumed, confidence: number (0–1; 1.0 for manual), issues: [issue_id], already_in_pack: bool}`.
- `Stage = {key: "extract"|"normalize"|"validate"|"analyze"|"report", title{en,hi}, status: "pending"|"running"|"done"|"failed"|"skipped", started: iso|null, finished: iso|null, log: [{t: iso, text{en,hi}}], summary{en,hi}|null}`.
- `Job = {id, created: iso, kind: "upload"|"manual", source: {file_name|null, mime|null, pages: [n], bytes|null, ocr_used: bool, ocr_engine: string|null}, context: {year, festival}, status: "running"|"needs_review"|"accepted"|"rejected"|"failed", stages: [Stage], rows: [Row], issues: [{id, row_id|null, level: "info"|"warn"|"error", text{en,hi}}], quality: {rows: n, numeric: n, flagged: n, mean_confidence: number, tables_found: n, sites_matched: n, sites_unmatched: n}, analysis: Analysis|null, report_available: bool}`.
- `Analysis = {standard: "CPCB class B", readings: [{row_id, status: "breach"|"ok"|"no_limit"|"missing", limit_text}], ghats: [{slug, name{en,hi}, before: {tier, score, rank}, after: {tier, score, rank}, changed: bool, reasons: [v1 reason shape with source {report|null, pdf|null, page|null, upload: job_id|null}], forecast: {available, champion, p_breach, models{logreg,random_forest,xgboost,lightgbm}, top_reasons, basis{year,festival,phase}}|null, allocation_hint: {action, text{en,hi}}|null}], summary{en,hi}}`.
- `GET /api/ranking` adds `user_data: {included: bool, rows: n, sources: [{job_id, file_name, year, festival}]}`; `?include_user=0` supported. Reason `source` gains optional `upload`.

## 5. Split and timeline

- Agent A (Opus, backend): §2, §4, tests, `docs/METHOD-INTAKE.md` (short: what the parser handles, OCR accuracy measured on page 28, what is not verified). The OCR venv is being created at `backend/.ocr-venv` by the orchestrator in the background (`paddlepaddle`, `paddleocr`, `pypdfium2`); check `backend/.ocr-venv/Scripts/python -c "import paddleocr"` before relying on it; do not reinstall; if it is still installing near the end, ship OCR as "not available" gracefully and say so. Report by 15:10.
- Agent B (Opus, frontend): §3, §4; `npm i leaflet @types/leaflet`. Report by 15:10.
- Orchestrator: integrate 15:10–15:45 (upload the 2025 PDF through the UI, accept, see the ranking badge; OCR a rendered page image; map screenshot), commit by 15:50.

## 6. Honesty rules

Extracted values are proposals until reviewed; confidence is shown per cell; officer-added rows are stored apart from the official pack, labelled "not yet verified by MPPCB" in the ranking, brief and report; OCR accuracy is measured on a known page and printed in the capabilities/report; unmatched sites are never silently merged into a known ghat.
