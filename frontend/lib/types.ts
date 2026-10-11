// Mirrors docs/PLAN.md §5 (API contract). Keep in sync with backend/ghatwatch/api.py.

export type Lang = "en" | "hi";
export interface Bilingual {
  en: string;
  hi: string;
}

export type Tier = "insufficient_data" | "high" | "medium" | "low";
export type Trend = "worsening" | "stable" | "improving";
export type Phase = "pre" | "during" | "after";
export type Festival = "Ganesh" | "Durga";
export type ReasonKind = "breach" | "context" | "gap";
export type ActionCode = "aerate" | "clean" | "test_first" | "sample_metals" | "lake_ban";
export type ReadingStatus = "breach" | "ok" | "no_limit" | "missing";
export type ModelName = "logreg" | "random_forest" | "xgboost" | "lightgbm";

export interface Source {
  report: string | null;
  /** null for officer-added rows (docs/PLAN-INTAKE.md §2) */
  pdf: string | null;
  page: number | null;
  /** intake job id when the reading was officer-added from an upload */
  upload?: string | null;
}

export interface Reason {
  kind: ReasonKind;
  parameter: string;
  value: number | null;
  unit: string;
  limit: string;
  year: number;
  festival: string;
  phase: Phase | null;
  source: Source;
  text: Bilingual;
}

export interface Action {
  code: ActionCode;
  text: Bilingual;
}

export interface ForecastReason {
  feature: string;
  direction: "up" | "down";
  text: Bilingual;
}

export interface Forecast {
  available: boolean;
  champion?: string;
  p_breach?: number;
  models?: Partial<Record<ModelName, number>> & Record<string, number>;
  basis?: { year: number; festival: string; phase: string };
  top_reasons?: ForecastReason[];
}

export interface GhatRank {
  slug: string;
  name: Bilingual;
  water_body: string;
  /** optional backend extra: bilingual water body */
  water_body_name?: Bilingual;
  ngt_lake_ban: boolean;
  /** optional backend extra: explanation when site_confidence is not "high" */
  site_note?: Bilingual | null;
  site_confidence: "high" | "medium" | "low";
  rank: number;
  tier: Tier;
  tier_rule: Bilingual;
  score: number;
  breach_rate: number;
  coverage: number;
  trend: Trend;
  readings_available: number;
  readings_expected: number;
  reasons: Reason[];
  actions: Action[];
  forecast: Forecast;
}

export interface Summary {
  do_readings: number;
  do_below_5: number;
  do_zero: number;
  bod_readings: number;
  bod_above_3: number;
  ph_readings: number;
  ph_outside: number;
}

export interface Ranking {
  generated_at: string;
  standard: string;
  weights: {
    param: Record<string, number>;
    year: Record<string, number>;
    phase: Record<string, number>;
  };
  summary: Summary;
  ghats: GhatRank[];
  /** docs/PLAN-INTAKE.md §4: present when accepted officer-added readings are included */
  user_data?: {
    included: boolean;
    rows: number;
    sources: { job_id: string; file_name: string; year: number; festival: string }[];
  };
}

export interface Reading {
  year: number;
  festival: string;
  phase: Phase;
  parameter: string;
  value: number | null;
  unit: string | null;
  flag: string | null;
  value_as_printed: string | null;
  limit_class_b: string | null;
  status: ReadingStatus;
  /** null when the table is absent from the report (e.g. Bairagarh Durga 2025) */
  page: number | null;
  pdf: string;
}

export interface Gap {
  year: number;
  festival: string;
  phase: Phase | null;
  parameters: string[];
  text: Bilingual;
}

export interface SeriesPoint {
  label: string;
  value: number | null;
}

export interface GhatDetail extends GhatRank {
  readings: Reading[];
  gaps: Gap[];
  series: Record<string, SeriesPoint[]>;
}

export interface GapsResponse {
  generated_at?: string;
  ghats: { slug: string; name: Bilingual; gaps: Gap[] }[];
}

export interface Brief {
  markdown: Bilingual;
  plain: Bilingual;
  generated_at: string;
}

export interface PreReadings {
  pH?: number;
  DO?: number;
  BOD?: number;
  COD?: number;
  TDS?: number;
  turbidity?: number;
  conductivity?: number;
}

export interface WhatIfRequest {
  slug?: string;
  new_site?: { name: string; water_body: string };
  pre: PreReadings;
}

export interface WhatIfResponse {
  score_with_2026: number;
  tier: Tier;
  forecast: Forecast;
  reasons: Reason[];
}

export interface LeaderboardRow {
  model: string;
  auc_groupkfold: number;
  auc_temporal_2025: number;
  pr_auc: number;
  brier: number;
  logloss: number;
  f1: number;
}

export interface Leaderboard {
  champion: string;
  selection_rule: string;
  rows: LeaderboardRow[];
  n_train: number;
  features: string[];
  importances: Record<string, { feature: string; importance: number }[]>;
}

export interface AllocationStep {
  slug: string;
  action: string;
  cost: number;
  q_gain: number;
}

export interface Allocation {
  experimental: boolean;
  budget: number;
  plan: AllocationStep[];
  policy_values: { cql: number; heuristic: number; random: number; do_nothing: number };
  caveat: Bilingual;
}

export type DataSource = "live" | "static";
export interface Sourced<T> {
  data: T;
  source: DataSource;
}
