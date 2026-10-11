// FROZEN CONTRACT: docs/PLAN-INTAKE.md §4. Copied verbatim; do not drift.
//
// - `GET /api/intake/capabilities` → `{text_pdf: true, ocr: {available: bool, engine: "PaddleOCR 3.x"|null, venv: "backend/.ocr-venv", how_to_enable{en,hi}}, max_upload_mb: 25}`.
// - `POST /api/intake/upload` (multipart: `file`, optional `year`, `festival`, `pages` like "28-30", `force_ocr` bool) → `{job_id}`. `POST /api/intake/manual` body `{year, festival, site: {slug|null, name}, phase, readings: {parameter: {value: number|null, flag: string|null}}, source_note}` → `{job_id}`.
// - `GET /api/intake/jobs` → `[JobSummary]`; `GET /api/intake/jobs/{id}` → `Job`; `GET /api/intake/jobs/{id}/page/{n}.png` → PNG (rendered page or uploaded image); `POST /api/intake/jobs/{id}/rerun` body `{rows: [Row]}` (corrected rows) → `Job`; `POST /api/intake/jobs/{id}/accept` body `{rows: [Row]}` → `{ok, accepted_rows, ranking_changed: [slug]}`; `POST /api/intake/jobs/{id}/reject` → `{ok}`; `GET /api/intake/jobs/{id}/report` → `{markdown{en,hi}}`; `GET /api/intake/accepted` → `{rows: n, groups: [{job_id, source_file, year, festival, slug, site_name, phases: [..], rows, accepted_at}]}`; `DELETE /api/intake/accepted/{job_id}` → `{ok}`.
// - `Row = {row_id, page: number|null, site_as_printed, slug: string|null, site_match_confidence: number, year, festival: "Ganesh"|"Durga", phase: "pre"|"during"|"after", parameter (standard name), parameter_as_printed, value: number|null, flag: string|null, value_as_printed, unit_assumed, confidence: number (0–1; 1.0 for manual), issues: [issue_id], already_in_pack: bool}`.
// - `Stage = {key: "extract"|"normalize"|"validate"|"analyze"|"report", title{en,hi}, status: "pending"|"running"|"done"|"failed"|"skipped", started: iso|null, finished: iso|null, log: [{t: iso, text{en,hi}}], summary{en,hi}|null}`.
// - `Job = {id, created: iso, kind: "upload"|"manual", source: {file_name|null, mime|null, pages: [n], bytes|null, ocr_used: bool, ocr_engine: string|null}, context: {year, festival}, status: "running"|"needs_review"|"accepted"|"rejected"|"failed", stages: [Stage], rows: [Row], issues: [{id, row_id|null, level: "info"|"warn"|"error", text{en,hi}}], quality: {rows: n, numeric: n, flagged: n, mean_confidence: number, tables_found: n, sites_matched: n, sites_unmatched: n}, analysis: Analysis|null, report_available: bool}`.
// - `Analysis = {standard: "CPCB class B", readings: [{row_id, status: "breach"|"ok"|"no_limit"|"missing", limit_text}], ghats: [{slug, name{en,hi}, before: {tier, score, rank}, after: {tier, score, rank}, changed: bool, reasons: [v1 reason shape with source {report|null, pdf|null, page|null, upload: job_id|null}], forecast: {available, champion, p_breach, models{logreg,random_forest,xgboost,lightgbm}, top_reasons, basis{year,festival,phase}}|null, allocation_hint: {action, text{en,hi}}|null}], summary{en,hi}}`.
// - `GET /api/ranking` adds `user_data: {included: bool, rows: n, sources: [{job_id, file_name, year, festival}]}`; `?include_user=0` supported. Reason `source` gains optional `upload`.

import type { Bilingual, ForecastReason, Phase, ReadingStatus, ReasonKind, Tier } from "./types";

export type IntakeFestival = "Ganesh" | "Durga";
export type IntakePhase = Phase;
export type StageKey = "extract" | "normalize" | "validate" | "analyze" | "report";
export type StageStatus = "pending" | "running" | "done" | "failed" | "skipped";
export type JobStatus = "running" | "needs_review" | "accepted" | "rejected" | "failed";
export type JobKind = "upload" | "manual";
export type IssueLevel = "info" | "warn" | "error";

export interface Capabilities {
  text_pdf: true;
  ocr: { available: boolean; engine: string | null; venv: string; how_to_enable: Bilingual };
  max_upload_mb: number;
}

export interface JobIdRes {
  job_id: string;
}

export interface ManualReq {
  year: number;
  festival: IntakeFestival;
  site: { slug: string | null; name: string };
  phase: IntakePhase;
  readings: Record<string, { value: number | null; flag: string | null }>;
  source_note: string;
}

export interface Row {
  row_id: string;
  page: number | null;
  site_as_printed: string;
  slug: string | null;
  site_match_confidence: number;
  year: number;
  festival: IntakeFestival;
  phase: IntakePhase;
  parameter: string;
  parameter_as_printed: string;
  value: number | null;
  flag: string | null;
  value_as_printed: string;
  unit_assumed: string | null;
  confidence: number;
  issues: string[];
  already_in_pack: boolean;
}

export interface StageLog {
  t: string;
  text: Bilingual;
}

export interface Stage {
  key: StageKey;
  title: Bilingual;
  status: StageStatus;
  started: string | null;
  finished: string | null;
  log: StageLog[];
  summary: Bilingual | null;
}

export interface JobIssue {
  id: string;
  row_id: string | null;
  level: IssueLevel;
  text: Bilingual;
}

export interface JobSource {
  file_name: string | null;
  mime: string | null;
  pages: number[];
  bytes: number | null;
  ocr_used: boolean;
  ocr_engine: string | null;
}

export interface JobQuality {
  rows: number;
  numeric: number;
  flagged: number;
  mean_confidence: number;
  tables_found: number;
  sites_matched: number;
  sites_unmatched: number;
}

export interface IntakeSource {
  report: string | null;
  pdf: string | null;
  page: number | null;
  upload: string | null;
}

/** v1 reason shape, with the intake source block. */
export interface IntakeReason {
  kind: ReasonKind;
  parameter: string;
  value: number | null;
  unit: string;
  limit: string;
  year: number;
  festival: string;
  phase: Phase | null;
  source: IntakeSource;
  text: Bilingual;
}

export interface TierScoreRank {
  tier: Tier;
  score: number;
  rank: number;
}

export interface IntakeForecast {
  available: boolean;
  champion: string;
  p_breach: number;
  models: { logreg: number; random_forest: number; xgboost: number; lightgbm: number };
  top_reasons: ForecastReason[];
  basis: { year: number; festival: string; phase: string };
}

export interface AnalysisGhat {
  slug: string;
  name: Bilingual;
  before: TierScoreRank;
  after: TierScoreRank;
  changed: boolean;
  reasons: IntakeReason[];
  forecast: IntakeForecast | null;
  allocation_hint: { action: string; text: Bilingual } | null;
}

export interface Analysis {
  standard: "CPCB class B";
  readings: { row_id: string; status: ReadingStatus; limit_text: string }[];
  ghats: AnalysisGhat[];
  summary: Bilingual;
}

export interface Job {
  id: string;
  created: string;
  kind: JobKind;
  source: JobSource;
  context: { year: number; festival: IntakeFestival };
  status: JobStatus;
  stages: Stage[];
  rows: Row[];
  issues: JobIssue[];
  quality: JobQuality;
  analysis: Analysis | null;
  report_available: boolean;
}

/** JobSummary fields are not spelled out in §4; only id/status are relied on. */
export interface JobSummary {
  id: string;
  status: JobStatus;
  created?: string;
  kind?: JobKind;
}

export interface AcceptRes {
  ok: boolean;
  accepted_rows: number;
  ranking_changed: string[];
}

export interface OkRes {
  ok: boolean;
}

export interface ReportRes {
  markdown: Bilingual;
}

export interface AcceptedGroup {
  job_id: string;
  source_file: string;
  year: number;
  festival: string;
  slug: string | null;
  site_name: string;
  phases: string[];
  rows: number;
  accepted_at: string;
}

export interface AcceptedRes {
  rows: number;
  groups: AcceptedGroup[];
}

export interface UserData {
  included: boolean;
  rows: number;
  sources: { job_id: string; file_name: string; year: number; festival: string }[];
}

export const PARAMS_13 = [
  "pH",
  "Total solids",
  "Dissolved solids",
  "Suspended solids",
  "Dissolved oxygen",
  "BOD",
  "COD",
  "Turbidity",
  "Conductivity",
  "Chromium",
  "Lead",
  "Zinc",
  "Copper",
] as const;

export const PARAM_UNIT: Record<string, string> = {
  pH: "",
  "Total solids": "mg/l",
  "Dissolved solids": "mg/l",
  "Suspended solids": "mg/l",
  "Dissolved oxygen": "mg/l",
  BOD: "mg/l",
  COD: "mg/l",
  Turbidity: "NTU",
  Conductivity: "µS/cm",
  Chromium: "mg/l",
  Lead: "mg/l",
  Zinc: "mg/l",
  Copper: "mg/l",
};
