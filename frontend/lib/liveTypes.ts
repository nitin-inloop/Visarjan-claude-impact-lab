// FROZEN CONTRACT: docs/PLAN-LIVE.md, v2 amendment B. Copied verbatim; do not drift.
//
// - Every simulated timestamp is an integer `t` = Unix epoch milliseconds of simulated time;
//   the client formats with timeZone:'Asia/Kolkata'. Durations are sim minutes; slopes are per sim hour.
//   Unmeasured values are null, never 0.
// - WS /ws/live: on connect {type:"snapshot", seq, state: SimState}. Then every real second:
//   {type:"tick", seq, t, speed, running, scenario, ghats:{slug: GhatLive (without series)},
//    points:{slug:{DO:[[t,v]...], BOD:[[t,v]...], turbidity:[[t,v]...]}}, resources:[Resource],
//    alerts_upsert:[Alert], alerts_resolved:[id], events:[Event], suggestions_version, sitrep_version}.
//   `points` holds every point produced since the previous tick. If the client sees a seq gap it
//   refetches /api/live/snapshot. There is no separate {type:"alert"} message.
// - REST: GET /api/live/snapshot -> SimState. POST /api/live/control {action, value?} -> SimState-lite
//   {seq,t,speed,running,scenario}. GET /api/live/scenarios -> [{name,label{en,hi},params}].
//   POST /api/live/dispatch {kind, ghat} -> {ok, order?:{id,resource_id,kind,ghat,eta_min}, error?:{en,hi}}.
//   POST /api/live/ack {alert_id} -> {ok}. GET /api/live/suggestions -> {version, items:[Suggestion]}.
//   GET /api/live/sitrep -> {version, t, markdown{en,hi}, speak{en,hi}}.
//   POST /api/live/command {text, lang} -> {intent, args, ok, speak{en,hi}, ui_action:{type, value?}}.
//   GET /api/live/history?slug=&param=&minutes= -> [[t,v]]. GET /api/live/calibration -> table or {available:false}.
//   The client refetches /suggestions and /sitrep when the matching version changes.

export interface Bi {
  en: string;
  hi: string;
}

export type SimT = number; // epoch ms of simulated time
export type Point = [SimT, number];
export type SeriesParam = "DO" | "BOD" | "turbidity";
export type Series = Record<SeriesParam, Point[]>;

export type SensorState = "live" | "stale" | "none";
export type LiveTier = "critical" | "high" | "medium" | "low" | "no_data";
export type Severity = "info" | "warn" | "high" | "critical";
export type AlertState = "open" | "acked" | "resolved";
export type ResourceKind = "aerator" | "crew" | "test_team" | "diversion";
export type ResourceStatus = "idle" | "en_route" | "working";
export type EventKind = "dispatch" | "arrival" | "effect" | "control" | "info";

export type ValueParam = "DO" | "BOD" | "COD" | "pH" | "turbidity" | "conductivity" | "TSS" | "temp";
export type Values = Record<ValueParam, number | null>;

export interface Window {
  mean_5: number | null;
  mean_30: number | null;
  slope_per_h: number | null;
  min_60: number | null;
  max_60: number | null;
}

export interface GhatLive {
  slug: string;
  name: Bi;
  water_body: string;
  ngt_lake_ban: boolean;
  sensor: SensorState;
  last_seen: SimT | null;
  live_tier: LiveTier;
  live_score: number | null;
  partial: boolean;
  tier_note: Bi;
  breach: { DO: boolean | null; BOD: boolean | null; pH: boolean | null };
  values: Values;
  as_of: Partial<Record<ValueParam, SimT | null>>;
  windows: { DO: Window | null; turbidity: Window | null };
  eta: { do_5: number | null; do_3: number | null; do_0: number | null };
  /** v1 Durga 2026 outlook, static */
  p_breach: number | null;
  anomaly: string[];
  idols_per_h: number;
  idols_total: number;
  resources_on_site: string[];
  open_alerts: string[];
  initial_source: Bi;
  simulated: true;
  series?: Series;
}

export interface Alert {
  id: string;
  t_open: SimT;
  t_update: SimT;
  ghat: string;
  code: string;
  severity: Severity;
  text: Bi;
  speak: Bi;
  values: Record<string, number>;
  recommended: string[];
  state: AlertState;
  baseline: boolean;
}

export interface Resource {
  id: string;
  kind: ResourceKind;
  name: Bi;
  at: string; // slug | "depot"
  status: ResourceStatus;
  target: string | null;
  eta_min: number | null;
  since: SimT;
}

export interface Suggestion {
  id: string;
  kind: ResourceKind;
  ghat: string;
  q_gain: number;
  travel_min: number;
  rank_score: number;
  reason: Bi;
  experimental: true;
}

export interface LiveEvent {
  id: string;
  t: SimT;
  kind: EventKind;
  ghat: string | null;
  text: Bi;
}

export interface Scenario {
  name: string;
  label: Bi;
  params: Record<string, unknown>;
}

export interface SimStats {
  idols_total: number;
  idols_by_ghat: Record<string, number>;
  readings_total: number;
  rejected_total: number;
}

export interface SimState {
  seq: number;
  t: SimT;
  t_start: SimT;
  speed: number;
  running: boolean;
  scenario: Scenario;
  source: "sim";
  ghats: Record<string, GhatLive>;
  resources: Resource[];
  alerts_open: Alert[];
  events_recent: LiveEvent[];
  suggestions: Suggestion[];
  suggestions_version: number;
  sitrep_version: number;
  stats: SimStats;
}

export interface SnapshotMsg {
  type: "snapshot";
  seq: number;
  state: SimState;
}

export interface TickMsg {
  type: "tick";
  seq: number;
  t: SimT;
  speed: number;
  running: boolean;
  scenario: Scenario;
  ghats: Record<string, GhatLive>;
  points: Record<string, Partial<Series>>;
  resources: Resource[];
  alerts_upsert: Alert[];
  alerts_resolved: string[];
  events: LiveEvent[];
  suggestions_version: number;
  sitrep_version: number;
}

export type WsMsg = SnapshotMsg | TickMsg;

export type ControlAction = "start" | "pause" | "reset" | "speed" | "scenario";
export interface ControlReq {
  action: ControlAction;
  value?: number | string;
}
export interface SimStateLite {
  seq: number;
  t: SimT;
  speed: number;
  running: boolean;
  scenario: Scenario;
}

export interface DispatchReq {
  kind: ResourceKind;
  ghat: string;
}
export interface DispatchRes {
  ok: boolean;
  order?: { id: string; resource_id: string; kind: ResourceKind; ghat: string; eta_min: number };
  error?: Bi;
}

export interface AckRes {
  ok: boolean;
}

export interface SuggestionsRes {
  version: number;
  items: Suggestion[];
}

export interface SitrepRes {
  version: number;
  t: SimT;
  markdown: Bi;
  speak: Bi;
}

export type UiActionType = "select_ghat" | "open_tab" | "control" | "none";
export interface CommandRes {
  intent: string;
  args: Record<string, unknown>;
  ok: boolean;
  speak: Bi;
  ui_action: { type: UiActionType; value?: string };
}

export type HistoryRes = Point[];

export interface CalibrationRow {
  [k: string]: string | number | null;
}
export type CalibrationRes = { available: false } | ({ available?: true } & Record<string, unknown>);
