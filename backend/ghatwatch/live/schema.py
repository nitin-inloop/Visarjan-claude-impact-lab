"""FROZEN CONTRACT for Ghat Watch Live (docs/PLAN-LIVE.md, v2 amendment B, copied verbatim).

WS payloads are plain dicts (not pydantic). Shapes below are authoritative.

- Every simulated timestamp is an integer `t` = Unix epoch **milliseconds of simulated time**; the client formats with `timeZone:'Asia/Kolkata'`. Durations are sim minutes; slopes are per sim hour. Unmeasured values are `null`, never 0.
- `WS /ws/live`: on connect `{type:"snapshot", seq, state: SimState}`. Then every real second: `{type:"tick", seq, t, speed, running, scenario, ghats:{slug: GhatLive (without series)}, points:{slug:{DO:[[t,v]...], BOD:[[t,v]...], turbidity:[[t,v]...]}}, resources:[Resource], alerts_upsert:[Alert], alerts_resolved:[id], events:[Event], suggestions_version, sitrep_version}`. `points` holds **every** point produced since the previous tick. If the client sees a `seq` gap it refetches `/api/live/snapshot`. There is no separate `{type:"alert"}` message.
- `SimState = {seq, t, t_start, speed, running, scenario:{name, label{en,hi}, params}, source:"sim", ghats:{slug: GhatLive (with series: last 120 min)}, resources:[Resource], alerts_open:[Alert], events_recent:[Event] (last 50), suggestions:[Suggestion], suggestions_version, sitrep_version, stats:{idols_total, idols_by_ghat:{slug:n}, readings_total, rejected_total}}`.
- `GhatLive = {slug, name{en,hi}, water_body, ngt_lake_ban, sensor:"live"|"stale"|"none", last_seen:t|null, live_tier:"critical"|"high"|"medium"|"low"|"no_data", live_score:number|null, partial:bool, tier_note{en,hi}, breach:{DO:bool|null, BOD:bool|null, pH:bool|null}, values:{DO,BOD,COD,pH,turbidity,conductivity,TSS,temp: number|null}, as_of:{param: t|null}, windows:{DO:{mean_5,mean_30,slope_per_h,min_60,max_60}|null, turbidity:{...}|null}, eta:{do_5,do_3,do_0: minutes|null}, p_breach:number|null (v1 Durga 2026 outlook, static), anomaly:[param], idols_per_h, idols_total, resources_on_site:[id], open_alerts:[id], initial_source{en,hi}, simulated:true, series?:{DO:[[t,v]], BOD:[[t,v]], turbidity:[[t,v]]}}`.
- `Alert = {id, t_open, t_update, ghat, code, severity:"info"|"warn"|"high"|"critical", text{en,hi}, speak{en,hi}, values:{param:number}, recommended:[kind], state:"open"|"acked"|"resolved", baseline:bool}`.
- `Resource = {id, kind:"aerator"|"crew"|"test_team"|"diversion", name{en,hi}, at:slug|"depot", status:"idle"|"en_route"|"working", target:slug|null, eta_min:number|null, since:t}`.
- `Suggestion = {id, kind, ghat, q_gain, travel_min, rank_score, reason{en,hi}, experimental:true}`.
- `Event = {id, t, kind:"dispatch"|"arrival"|"effect"|"control"|"info", ghat:slug|null, text{en,hi}}`.
- REST: `GET /api/live/snapshot` → SimState. `POST /api/live/control {action:"start"|"pause"|"reset"|"speed"|"scenario", value?}` → SimState-lite `{seq,t,speed,running,scenario}`. `GET /api/live/scenarios` → `[{name,label{en,hi},params}]`. `POST /api/live/dispatch {kind, ghat}` → server picks the nearest idle unit → `{ok, order?:{id,resource_id,kind,ghat,eta_min}, error?:{en,hi}}`. `POST /api/live/ack {alert_id}` → `{ok}`. `GET /api/live/suggestions` → `{version, items:[Suggestion]}`. `GET /api/live/sitrep` → `{version, t, markdown{en,hi}, speak{en,hi}}`. `POST /api/live/command {text, lang}` → `{intent, args, ok, speak{en,hi}, ui_action:{type:"select_ghat"|"open_tab"|"control"|"none", value?}}`. `GET /api/live/history?slug=&param=&minutes=` → `[[t,v]]`. `GET /api/live/calibration` → §D table or `{available:false}`. The client refetches `/suggestions` and `/sitrep` when the matching version changes.
"""
from __future__ import annotations

TIERS = ("critical", "high", "medium", "low", "no_data")
SEVERITIES = ("info", "warn", "high", "critical")
SEV_RANK = {s: i for i, s in enumerate(SEVERITIES)}
RESOURCE_KINDS = ("aerator", "crew", "test_team", "diversion")
EVENT_KINDS = ("dispatch", "arrival", "effect", "control", "info")
VALUE_KEYS = ("DO", "BOD", "COD", "pH", "turbidity", "conductivity", "TSS", "temp")
CONTINUOUS = ("DO", "pH", "turbidity", "conductivity", "temp")
LAB = ("BOD", "COD", "TSS")
SERIES_KEYS = ("DO", "BOD", "turbidity")
SPEEDS = (1, 60, 180, 600)


def bi(en: str, hi: str) -> dict:
    return {"en": en, "hi": hi}
