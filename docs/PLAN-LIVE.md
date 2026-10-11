# Ghat Watch Live — real-time pipeline + single-screen command center (Plan v1)

Written 12:57 PM, 11 Oct 2026. Deadline 5:00 PM. Builds on the delivered v1 (docs/PLAN.md): deterministic ranking, bilingual brief, 4-model forecast, CQL allocator, Next.js UI. Nothing in v1 may break; v1 pages fold into one screen.

## v2 AMENDMENTS (after Opus 5.5 review, 13:15) — authoritative wherever they conflict with the text below

### A. Scope (replaces §1)
Backend MUST: `clock`, `simulator` (DO, BOD, turbidity, idols; COD derived; pH and conductivity = baseline + noise; **metals are lab-only, not simulated**), `processor` (validate, staleness, windows, hysteresis, ETA, live score/tier), `alerts` (reduced set, §H), `dispatch` (suggestions + apply, §I), templated `sitrep`, `engine`; endpoints `snapshot`, `WS`, `control`, `dispatch`, `ack`, `suggestions`, `sitrep`, `scenarios`; tests (§K). Plain dicts (not pydantic) for WS payloads.
Backend SHOULD: `commands` (6 intents, §G), calibration-lite (§D), `history`. COULD: SSE, ingest, export. **Replay is cut** (Durga 2025 has 3 points per ghat; a timeline would be invented).
Frontend MUST: route restructure (§E), top bar with controls + connection pill, alert feed (ack, speak), 7 tiles with sparkline, tabs Plan (existing ActionSheet) / Dispatch / Sitrep / Models (existing ModelsView), simple drawer (values, 120-min chart, quick actions), voice out (§F), text command box, minimal `mockLive.ts` emitting the exact §B shapes, WS client with 2-s snapshot polling as the only fallback.
Frontend SHOULD: static schematic SVG map with tier-coloured markers (no moving glyphs), mic push-to-talk (§G). COULD: keyboard shortcuts (no "V"), SSE, export; Evidence and What-if are links to the existing routes (open in the drawer as links, not embedded).

### B. Frozen contract (replaces the "REST + WS contract", SimState, GhatLive, Alert text in §2). Backend copies this into `live/schema.py` docstrings; frontend into `lib/liveTypes.ts`; `mockLive.ts` emits exactly these shapes.
- Every simulated timestamp is an integer `t` = Unix epoch **milliseconds of simulated time**; the client formats with `timeZone:'Asia/Kolkata'`. Durations are sim minutes; slopes are per sim hour. Unmeasured values are `null`, never 0.
- `WS /ws/live`: on connect `{type:"snapshot", seq, state: SimState}`. Then every real second: `{type:"tick", seq, t, speed, running, scenario, ghats:{slug: GhatLive (without series)}, points:{slug:{DO:[[t,v]...], BOD:[[t,v]...], turbidity:[[t,v]...]}}, resources:[Resource], alerts_upsert:[Alert], alerts_resolved:[id], events:[Event], suggestions_version, sitrep_version}`. `points` holds **every** point produced since the previous tick. If the client sees a `seq` gap it refetches `/api/live/snapshot`. There is no separate `{type:"alert"}` message.
- `SimState = {seq, t, t_start, speed, running, scenario:{name, label{en,hi}, params}, source:"sim", ghats:{slug: GhatLive (with series: last 120 min)}, resources:[Resource], alerts_open:[Alert], events_recent:[Event] (last 50), suggestions:[Suggestion], suggestions_version, sitrep_version, stats:{idols_total, idols_by_ghat:{slug:n}, readings_total, rejected_total}}`.
- `GhatLive = {slug, name{en,hi}, water_body, ngt_lake_ban, sensor:"live"|"stale"|"none", last_seen:t|null, live_tier:"critical"|"high"|"medium"|"low"|"no_data", live_score:number|null, partial:bool, tier_note{en,hi}, breach:{DO:bool|null, BOD:bool|null, pH:bool|null}, values:{DO,BOD,COD,pH,turbidity,conductivity,TSS,temp: number|null}, as_of:{param: t|null}, windows:{DO:{mean_5,mean_30,slope_per_h,min_60,max_60}|null, turbidity:{...}|null}, eta:{do_5,do_3,do_0: minutes|null}, p_breach:number|null (v1 Durga 2026 outlook, static), anomaly:[param], idols_per_h, idols_total, resources_on_site:[id], open_alerts:[id], initial_source{en,hi}, simulated:true, series?:{DO:[[t,v]], BOD:[[t,v]], turbidity:[[t,v]]}}`.
- `Alert = {id, t_open, t_update, ghat, code, severity:"info"|"warn"|"high"|"critical", text{en,hi}, speak{en,hi}, values:{param:number}, recommended:[kind], state:"open"|"acked"|"resolved", baseline:bool}`.
- `Resource = {id, kind:"aerator"|"crew"|"test_team"|"diversion", name{en,hi}, at:slug|"depot", status:"idle"|"en_route"|"working", target:slug|null, eta_min:number|null, since:t}`.
- `Suggestion = {id, kind, ghat, q_gain, travel_min, rank_score, reason{en,hi}, experimental:true}`.
- `Event = {id, t, kind:"dispatch"|"arrival"|"effect"|"control"|"info", ghat:slug|null, text{en,hi}}`.
- REST: `GET /api/live/snapshot` → SimState. `POST /api/live/control {action:"start"|"pause"|"reset"|"speed"|"scenario", value?}` → SimState-lite `{seq,t,speed,running,scenario}`. `GET /api/live/scenarios` → `[{name,label{en,hi},params}]`. `POST /api/live/dispatch {kind, ghat}` → server picks the nearest idle unit → `{ok, order?:{id,resource_id,kind,ghat,eta_min}, error?:{en,hi}}`. `POST /api/live/ack {alert_id}` → `{ok}`. `GET /api/live/suggestions` → `{version, items:[Suggestion]}`. `GET /api/live/sitrep` → `{version, t, markdown{en,hi}, speak{en,hi}}`. `POST /api/live/command {text, lang}` → `{intent, args, ok, speak{en,hi}, ui_action:{type:"select_ghat"|"open_tab"|"control"|"none", value?}}`. `GET /api/live/history?slug=&param=&minutes=` → `[[t,v]]`. `GET /api/live/calibration` → §D table or `{available:false}`. The client refetches `/suggestions` and `/sitrep` when the matching version changes.

### C. Simulator corrections (amend §3)
- **Steady-state start**: per ghat solve a background term `B_DO` so dDO/dt = 0 at the pre-immersion values, and `B_BOD` likewise. Only immersion load and interventions move the state. `DO_sat` from temperature (APHA, ≈ 8.1 at 26 °C). Clamp DO to `[0, max(1.6×DO_sat, observed_max_for_ghat)]` (Hathaikheda observed 10.8). Rates are per day; sub-step dt = 1/1440 day. Add a `depth` column (SOD/depth). `k1·BOD` uses ultimate BOD ≈ BOD5/0.68. **Drop the pH/PoP nudge** (gypsum is pH-neutral) and metals dynamics.
- **Organic load**: replace the per-idol mass-yield formula with one parameter per water-body type, `L_idol` (g leachable BOD per idol), **fitted** (§D). Most idol mass is particulate and lifted out; it is not dissolved BOD.
- **Clock**: start `2026-10-20T15:00+05:30`, horizon 15 sim-h; speed ∈ {1, 60, 180, 600}, default 180 (1 real minute = 3 sim-hours). Arrival peak 17:00–23:00.

### D. Calibration-lite (replaces §3.6; SHOULD)
Fit `L_idol` per water-body type by 1-D search so the default scenario reproduces observed Durga 2025 pre→during ΔBOD at 21:00 sim time for the 5 sensored ghats. Report ΔDO and Δturbidity as out-of-fit checks. Only pre→during is used (the MPPCB "after" is a week later). `artifacts/live/calibration.json` holds observed, simulated and a no-change-baseline MAE, labelled "fitted on 5 ghats, one festival; a sanity check, not validation".

### E. Frontend structure (amend §5 Route)
Root `app/layout.tsx` keeps only `<html lang data-theme="dark">`, fonts, `<body>`. Move `brief/`, `whatif/`, `models/`, `ghat/` into `app/(classic)/` with a `layout.tsx` holding the current Header, `max-w-3xl` main and Footer (URLs unchanged). `app/page.tsx` stays a server component reading `ranking.json` via `readSnapshot` and renders `<CommandCenter initialRanking=…/>` (`"use client"`). Create WS, `speechSynthesis`, `SpeechRecognition` only inside `useEffect` with cleanup (StrictMode double-mount). WS URL = `API_URL.replace(/^http/, "ws") + "/ws/live"`. State: `useReducer` + context (no zustand). Add `lib/speech.d.ts` declaring `webkitSpeechRecognition`. Set `viewport.themeColor` to `#0a0f1a`.

### F. Dark tokens and voice out (amend §5 Design system and §4 Output)
Under `:root[data-theme="dark"]` **redefine the existing variable names** (paper #0a0f1a, surface #0f1626, ink #e5ecf6, muted #93a1b7, rule rgba(148,163,184,.14), accent #5ad1c8, high/medium/low and their `-bg` dark variants) and add `--raised #15203a`, `--critical #ff5a5f`, `--nodata #8b93a5` via `@theme inline`; under `@media print` reset to the light values. Buttons on the teal accent use `text-paper`, not `text-white`.
Voice out: an **"Enable voice"** button in the top bar speaks a one-line confirmation (unlocks Chrome's user-activation requirement). Pick the voice on `voiceschanged`: `lang.startsWith('hi')` in Hindi mode, else en-IN, else en-GB/en-US; show the voice name; if no Hindi voice exists in Hindi mode, speak the English text and show "Hindi voice not installed". Split utterances by sentence (< 200 chars). Queue: critical cancels and interrupts; max 3 queued; drop items older than 20 s; **never speak `baseline` alerts or anything that arrived in the snapshot**. Announce level selector: all / high+ (default) / critical / off.

### G. Commands (amend §4 Input and §2 commands)
Text command box is MUST; mic is SHOULD (Chrome only, needs network and mic permission; `http://localhost` is a secure context). Six intents only: `status <ghat>`, `status all`, `read sitrep`, `send <aerator|crew|test team> to <ghat>`, `pause|start`, `help`; en + hi keywords and ghat aliases as in §2. No LLM fallback. No "V" key binding.

### H. Alerts (replaces the §2 alert rules)
Codes: `DO_LOW` (one per ghat; severity escalates warn < 5, high < 3, critical < 1), `DO_ETA_60` (high), `DO_FALLING_FAST` (warn), `BOD_HIGH` (warn > 3, high > 8), `NO_SENSOR` (info, standing), `SENSOR_STALE` (warn), `IDOL_SURGE` (info). Conditions already true at t0 open with `baseline:true` and text "already below the limit before immersion (Durga 2025 pre, MPPCB 2025 p. 64/65)" and are **not spoken**. Cut `TURBIDITY_SPIKE`, `METAL_HIGH`, `PH_OUT`, `BAN_VIOLATION` (ban arrivals become a sitrep line). One open alert per (ghat, code); escalation updates `t_update` and severity via `alerts_upsert`; auto-resolve after 15 sim-min clear.

### I. Dispatch and CQL mapping (amend §2 Dispatch)
Load `artifacts/rl/cql_report.json["Q"]` once; use it only if its do-nothing check passed, else the heuristic. State = `rl.simulator.encode(do_tier(DO mean_5), bod_tier(latest lab BOD), known, trend)`; unknown DO/BOD → tier 1 (as `allocate.ghat_state`); `known = 0` when sensor none/stale; trend: slope ≤ −0.5/h → 2, ≥ +0.5/h → 0, else 1. Kind → Q action: aerator→3 (aerate), crew→2 (clean), test_team→1 (test; skip when known = 1). Diversion is rule-based (only NGT-ban lake ghats with idols/h > 0). `rank_score = q_gain/cost − 0.02 × travel_min`. Reason text ends with "experimental (CQL, simulator-trained)". Travel = haversine from §6 at 25 km/h + 10 min setup. Test teams are expected to go first to Bairagarh and Malikhedi: that reveal (hidden DO near 0) is the demo moment.

### J. Honesty in the live view (amend §3.7 and §5)
`GhatLive.values` holds only **observed** values; for unsensored ghats the simulator's hidden truth never appears (mock included). Before the first lab result BOD shows "awaiting lab (≈ 90 min)". If BOD has never been measured, `live_tier` is capped at `medium` with `tier_note` "DO within limit, BOD not yet measured"; `live_score` renormalises over available parameters and sets `partial:true`. Tile order: critical, high, no_data, medium, low. Every tile and the sitrep header carry a "SIMULATED" badge. Drawer shows `initial_source` ("Durga 2025 pre, MPPCB 2025 p. 64/65"; Bairagarh/Malikhedi "assumed from Ganesh 2025 during, p. 28"). `p_breach` is labelled "pre-immersion model estimate, not updated live" (the live forecast hook is cut).

### K. Tests (replaces §2 Tests) — synchronous via `engine.step(n_substeps)`, fixed seed, < 30 s total
1. Zero-arrival run: no NaN over 15 sim-h; every ghat within ±0.3 mg/l DO of its start; DO ∈ [0, 15]; with equal inflow a kund sags deeper than the dam.
2. Calibration (if implemented): fitted ΔBOD MAE < no-change baseline MAE; simulated ΔDO sign matches observed for ≥ 3 of 5 ghats.
3. Processor fed DO alternating 4.9/5.1 for 60 min opens exactly 1 alert.
4. Bairagarh: `sensor:"none"`, `live_tier:"no_data"`, `values.DO is None`.
5. `simulator.apply(ghat,"aerator")` then step 30 sim-min: DO higher than a same-seed control.
6. 8 command phrases en/hi → correct intents.
7. With `GHATWATCH_LIVE_TICK_S=0.1`, `with TestClient(app) as c:` WS connect → snapshot → one tick within 2 s.
8. v1 `test_invariants.py` still passes.

### L. Wiring (amend §2 engine/api)
Pass `lifespan=` in the existing `FastAPI(...)` constructor; engine exposes `ensure_started()` called by WS and snapshot handlers; `APIRouter()` with no prefix and full paths (`/api/live/...` and `/ws/live`); tick body wrapped in try/except with logging; tick period from `GHATWATCH_LIVE_TICK_S` (default 1.0); `backend/live_logs/` is gitignored (done).

## 0. What changes, in one paragraph

Today the officer gets a ranked sheet built from three years of PDFs. On 20 Oct the same officer sits in a control room while 10,000+ idols go into the water over twelve hours. Ghat Watch Live adds the missing half: a real-time pipeline that takes readings as they arrive (today from a calibrated simulator or a replay of 2025; tomorrow from sensors or field tests through the same endpoint), evaluates every ghat against CPCB class B minute by minute, raises alerts with hysteresis, projects when dissolved oxygen will cross the limit, suggests where to move aerators, cleaning crews and test teams (CQL Q-table on the live state), applies those moves back into the simulation so the loop closes, regenerates a Hindi/English situation report, and speaks alerts and briefs aloud. One dark screen holds all of it; the v1 pages become tabs and drawers on that screen.

## 1. Scope and priorities (ordered; stop at the line time forces)

MUST
1. Live pipeline in the backend: sources → bus → processor → alerts → sitrep → WebSocket. Simulator with the dynamics in §3, time-accelerated, pause/reset/speed/scenario.
2. Single-screen dark command center at `/`: top bar, map, alert feed, 7 live ghat tiles, detail drawer, tabs (Plan = v1 ranking, Dispatch, Sitrep/Brief, Evidence, What-if, Models).
3. Voice out: speak alerts and sitrep (Web Speech synthesis, hi-IN / en-IN, mute, queue).
4. Dispatch loop: resources, suggestions, apply → effect in simulator → action log.
SHOULD
5. Voice in: push-to-talk commands (Web Speech recognition) parsed by the backend command endpoint.
6. Replay source (Durga 2025 as a compressed timeline) and ingest endpoint for real readings.
7. Simulator calibration report (sim vs observed deltas) on the Models tab.
COULD
8. Auto-dispatch toggle; keyboard shortcuts; SSE fallback; CSV export of live logs.

Non-goals today: real sensors, auth, multi-user, persistence beyond JSONL files, a GIS-accurate map.

## 2. Pipeline architecture (backend, Python, asyncio inside FastAPI)

```
backend/ghatwatch/live/
  schema.py      Reading, Derived, Alert, Resource, DispatchOrder, SimState, WsMessage (pydantic)
  bus.py         asyncio pub/sub; topics: readings, derived, alerts, dispatch, sim, log; bounded queues
  clock.py       SimClock: start 2026-10-20T06:00+05:30, speed ∈ {1, 60, 600}, pause, now()
  sources.py     SimSource (wraps simulator), ReplaySource (2025 Durga tables → timeline), IngestSource (HTTP)
  simulator.py   §3 dynamics, scenarios, interventions, calibration
  processor.py   validation, staleness, rolling windows, hysteresis breach state, slope, ETA, live score/tier, anomaly z, forecast hook
  alerts.py      rules → Alert; dedupe by (ghat, code) while open; ack; auto-resolve
  dispatch.py    resource pool, travel matrix, suggestions (CQL Q-table on live state + travel cost), apply, arrival → simulator effect, action log JSONL
  sitrep.py      live situation report en/hi (markdown + speakable plain text)
  commands.py    rule-based intent parser en/hi for voice/text commands → action + spoken reply
  engine.py      LiveEngine: owns clock, sources, processor, alerts, dispatch, ring buffers; tick loop; snapshot(); start/stop with FastAPI lifespan
  api.py         router: REST + WS + SSE (mounted in ghatwatch/api.py under /api/live and /ws/live)
backend/live_logs/   events.jsonl, actions.jsonl (gitignored)
```

Tick model: one engine tick per real second; the simulator advances `speed` simulated seconds per tick in 60-s sub-steps (so 600× = 10 sim-minutes per tick, 10 sub-steps). Readings are emitted per ghat per parameter once per simulated minute for sensored ghats (DO, pH, turbidity, conductivity, temperature continuous; BOD/COD as "lab" readings every 60 sim-minutes with 30-min lag; metals every 3 h). Ghats without a sensor emit nothing until a test team arrives (then one lab reading set). Default sensored ghats: Shahpura, Rani Kamlapati, Khatlapura, Prempura, Hathaikheda; **no sensor at Bairagarh and Malikhedi** on purpose (mirrors the data gap; the UI shows "no live data", never clean).

Processor per (ghat, parameter):
- validate: unit, plausibility bounds (DO 0–20, pH 0–14, BOD 0–500, turbidity 0–2000, conductivity 0–10,000); reject + count.
- staleness: `last_seen`; stale after 10 sim-min (continuous) / 120 sim-min (lab); status `live | stale | none`.
- windows: ring buffer 6 sim-h at 1-min; `mean_5`, `mean_30`, `slope_per_h` (least squares over last 30 min), `min_60`, `max_60`.
- hysteresis breach state: DO enters breach when `mean_5 < 5`, clears when `mean_30 ≥ 5.5`; BOD enters when latest lab `> 3`, clears `≤ 2.7`; pH enters outside 6.5–8.5 on `mean_5`, clears inside 6.6–8.4.
- ETA: minutes until DO reaches 5 (and 3, and 0) at current slope if slope < 0, else null.
- live score: v1 exceedance on current values (DO mean_5, BOD latest lab, pH mean_5) with weights .45/.40/.15 → `live_score`; `live_tier`: `critical` if DO mean_5 < 2 or DO = 0; `high` if DO < 3 or live_score ≥ .45; `medium` if ≥ .25 or BOD > 6; `low` otherwise; `no_data` if DO status none/stale.
- anomaly: z of current value vs this ghat's 2023–25 distribution for that parameter (mean/sd from v1 data); flag |z| ≥ 2.
- forecast hook: every 5 sim-min call v1 champion with current values as "pre" → `p_breach` (estimate label kept).

Alert rules (code → severity):
- `DO_BELOW_5` warn, `DO_BELOW_3` high, `DO_ZERO` critical, `DO_FALLING_FAST` warn (slope ≤ −1 mg/l/h and mean_5 < 6.5), `DO_ETA_60` high (ETA to 5 ≤ 60 min)
- `BOD_ABOVE_3` warn, `BOD_ABOVE_8` high, `PH_OUT` warn, `TURBIDITY_SPIKE` info (> 2× mean_30), `METAL_HIGH` warn (any ≥ 1.5 mg/l)
- `SENSOR_STALE` warn, `NO_SENSOR` info (standing, for Bairagarh/Malikhedi until tested), `IDOL_SURGE` info (arrivals > 2× hourly mean), `BAN_VIOLATION` warn (idols arriving at a lake ghat under the NGT ban)
- Each alert: `{id, ts_sim, ghat, code, severity, text{en,hi}, speak{en,hi}, values, recommended:[action codes], state}`. One open alert per (ghat, code). Auto-resolve when the condition clears for 15 sim-min.

Dispatch: resources `{id, kind: aerator|crew|test_team|diversion, name, at: ghat|depot, status: idle|en_route|working, eta_min, since}`; defaults 3 aerators, 3 crews, 2 test teams, 1 diversion squad at `depot` (BMC HQ). Travel minutes from the approximate coordinate table (§6) at 25 km/h + 10 min setup. Suggestions recomputed on any alert open/resolve or tier change: for each ghat, map live state → v1 CQL 54-state index (do tier, bod tier, known, trend from slope) → Q-gains per action; rank (gain − travel penalty)/cost; return top 5 suggestions with reason text. Apply: `POST /api/live/dispatch` → order → resource en_route → on arrival `simulator.apply(ghat, action)` (aerator: +k2 while on site; crew: remove 60% nirmalya load and halve idol organic input for 2 h; test team: emit one full lab reading set and set sensor known for 2 h; diversion: route 70% of arrivals from that ghat to the nearest kund) → event + `actions.jsonl` row. Auto-dispatch toggle (sim only) applies the top suggestion automatically.

Sitrep (regenerated on change, max every 60 sim-s): header (sim time, scenario, speed), one line per ghat ordered by live tier (tier, DO, BOD, trend arrow, ETA, resources on site, "no live data" where applicable), open alerts count by severity, deployed resources, data gaps, next review time; en + hi; `markdown` and `speak` (≤ 12 short sentences, numbers rounded, no symbols). The v1 historical brief stays available unchanged.

Commands (`POST /api/live/command {text, lang}`): rule-based grammar over normalised text, English and Hindi keywords, ghat aliases (en/hi/transliterations: "bairagarh/बैरागढ़", "shahpura/शाहपुरा", "rani kamlapati/kamla park/रानी कमलापति", "khatlapura/खटलापुरा", "prempura/प्रेमपुरा", "hathaikheda/हथाईखेड़ा", "malikhedi/मालीखेड़ी"). Intents: `status <ghat>`, `status all`, `read sitrep`, `read brief`, `send <aerator|crew|test team> to <ghat>`, `ack <ghat|all>`, `pause|start|speed <n>`, `language <hi|en>`, `open <ghat>`, `help`. Reply `{intent, args, ok, speak{en,hi}, ui_action}`. Optional LLM fallback only if `ANTHROPIC_API_KEY` is set; off by default.

REST + WS contract (all under the existing FastAPI app; CORS as v1):
- `GET /api/live/snapshot` → full `SimState` (below). `GET /api/live/stream` → SSE of the same messages as WS.
- `WS /ws/live` → on connect: `{type:"snapshot", state: SimState}`; then each real second `{type:"tick", sim_time, speed, running, ghats: {slug: GhatLive}, resources: [Resource], new_events: [Event], new_alerts: [Alert], resolved_alert_ids: [id], sitrep_version}`; also `{type:"alert", alert}` immediately when one opens with severity ≥ high. Client → server messages are not required (use REST for control).
- `POST /api/live/control {action: "start"|"pause"|"reset"|"speed"|"scenario", value?}`; `GET /api/live/scenarios` → presets with parameters.
- `POST /api/live/dispatch {resource_id?, kind, ghat, action}`; `POST /api/live/ack {alert_id}`; `GET /api/live/suggestions`.
- `GET /api/live/sitrep` → `{sim_time, markdown{en,hi}, speak{en,hi}, version}`.
- `POST /api/live/command {text, lang}`; `GET /api/live/commands` (help list en/hi).
- `POST /api/live/ingest [Reading]` (external readings; same validation); `GET /api/live/history?slug=&param=&minutes=360` (ring buffer).
- `GET /api/live/calibration` → simulator fit table (§3.6). `GET /api/live/export?what=actions|events` → CSV.

SimState: `{sim_time, started_at, speed, running, scenario:{name, params}, source:"sim"|"replay"|"ingest", ghats:{slug: GhatLive}, resources:[Resource], alerts_open:[Alert], events_recent:[Event], sitrep_version, stats:{idols_total, idols_by_ghat, readings_total, rejected_total}}`.
GhatLive: `{slug, name{en,hi}, sensor: "live"|"stale"|"none", last_seen_sim, live_tier, live_score, breach:{DO:bool,BOD:bool,pH:bool}, values:{DO,BOD,COD,pH,turbidity,conductivity,TSS,temp,Pb,Cr,Zn,Cu}, windows:{DO:{mean_5,mean_30,slope_per_h,min_60,max_60}, ...}, eta:{do_5,do_3,do_0}, p_breach, anomaly:[param], idols_per_h, idols_total, resources_on_site:[id], open_alerts:[id], series:{DO:[[t,v]...], BOD:[...], turbidity:[...]} (last 120 min, 1-min; snapshot only, ticks send last point)}`.
Event: `{id, ts_sim, kind: "dispatch"|"arrival"|"effect"|"control"|"ingest"|"info", ghat?, text{en,hi}}`.

Tests (pytest, `backend/tests/test_live.py`): (1) simulator 600× for 12 sim-h never NaN, DO within [0, DO_sat], kund ghats sag deeper than dam ghats under equal inflow; (2) calibration: simulated Durga-2025-like run reproduces observed pre→during DO deltas for sensored ghats within ±1.5 mg/l mean absolute error; (3) hysteresis: a value oscillating 4.9/5.1 opens one alert, not many; (4) staleness: a ghat with no readings has `sensor:"none"`, `live_tier:"no_data"`, and never `low`; (5) dispatch: applying `aerate` raises DO slope within 30 sim-min vs control; (6) command parser: 12 phrases en/hi map to the right intents; (7) WS: connect, get snapshot, get a tick within 3 s (httpx/ASGI test client with websockets); (8) v1 tests still pass.

## 3. Simulator (the "deeper" part): calibrated, physically motivated, honest

3.1 State per ghat: DO, BOD, COD, TSS, turbidity, pH, conductivity, Pb, Cr, Zn, Cu, temperature (26 °C), nirmalya_load (kg), settled_solids, idol arrivals (per minute), active interventions.
3.2 Water-body parameters (per ghat; table in `simulator.py`, all labelled assumptions): effective mixing volume V (kund 2–5 ×10³ m³; lake ghat cell 20–50 ×10³ m³; dam 40 ×10³ m³), reaeration k2 (kund 0.5/day, lake ghat 1.5/day, dam 2.0/day, Shahpura lake 1.0/day), sediment oxygen demand SOD (kund high), background inflow/outflow (small). Initial conditions: latest pre-immersion readings per ghat (Durga 2025 pre; Bairagarh/Malikhedi from Ganesh 2025 during as "last known", flagged).
3.3 Arrivals: non-homogeneous Poisson per ghat; daily profile λ(t) with a small morning bump and the main peak 17:00–23:00; scenario sets `idols_total` (default 12,000 across Bhopal) and ghat shares (default: NGT-ban scenario sends 85% to kunds/Hathaikheda/Shahpura, 15% "violation trickle" to lake ghats; "ban not enforced" uses 2025 shares); idol mix: size (small 70% / medium 25% / large 5% → mass 2 / 15 / 80 kg), material (`pop_share` default 0.4), painted (`painted_share` 0.8).
3.4 Dynamics per 60-s sub-step (units mg/l unless noted):
- Organic load in: per idol `m_org = mass × (0.08 clay / 0.03 PoP) + nirmalya 0.5 kg`; `BOD += (m_org × 1000 × y_bod) / V` with yield `y_bod` = 0.25 g BOD per g organic (assumption); BOD decays `k1 = 0.23/day × 1.047^(T−20)`.
- COD = 3.5 × BOD + baseline offset (fits the data's COD/BOD ratio ≈ 7 in kunds; use per-ghat ratio from v1 readings).
- DO: `dDO/dt = k2 (DO_sat − DO) − k1·BOD − SOD/depth + P(t)`; `DO_sat = 8.1` at 26 °C; `P(t)` small daytime photosynthesis (+0.3 mg/l/day amplitude, zero at night); aerators add +3.0/day to k2 per set; clamp [0, DO_sat × 1.1].
- Solids: `TSS += mass × (0.5 PoP / 0.3 clay) × 1000 / V` per idol; settles `k_s = 2/day`; turbidity = 0.8 × TSS (NTU, from the data's TSS–turbidity relation; fit per ghat if time). Settled solids feed SOD (+0.1 per 100 mg/l settled, capped).
- Conductivity/TDS: PoP (CaSO₄) dissolves slowly: `+0.4 µS/cm per PoP idol per 10³ m³` over 6 h; TDS = 0.64 × conductivity.
- pH: PoP nudges +0.02 per 100 PoP idols per 10³ m³, relaxes to baseline with τ = 12 h; clay nudges −0.01.
- Metals: painted idol adds `Pb 0.4, Cr 0.2, Zn 0.6, Cu 0.5 mg per kg of paint` with paint = 2% of mass; mix into V; settle `k = 1/day`.
- Rain scenario: dilution factor on all concentrations + 10% per hour of rain, turbidity +.
- Sensor model: Gaussian noise (DO ±0.15, pH ±0.05, turbidity ±5%, conductivity ±2%), 1% dropout per reading, lab readings (BOD/COD/metals) with 30-min lag and ±10% error.
3.5 Interventions (from dispatch): aerator on site: k2 += 3/day per set (max 2 sets effective); crew: nirmalya_load ×0.4, organic input ×0.5 for 120 min; diversion: 70% of this ghat's arrivals re-routed to nearest kund (adds there); test team: emits full lab set, sets `sensor` known for 120 min.
3.6 Calibration (runs in `build_artifacts.py` live step, < 20 s): for each ghat with Durga 2025 (or latest) pre/during/after readings, run the sim with 2025 shares and fit a per-ghat scalar `impact_multiplier` (1-D search) minimising squared error of simulated vs observed Δ(DO, BOD, turbidity) pre→during and pre→after; store `artifacts/live/calibration.json` with observed vs simulated deltas and MAE. Shown on the Models tab as "how real is the simulator".
3.7 Honesty: every parameter above is an assumption, listed in `docs/METHOD-LIVE.md`; the UI labels the simulator "simulated"; replay mode shows actual report values; ingest mode marks "field reading".

## 4. Voice

Output (`frontend/lib/voice.ts`): `speechSynthesis` queue with priorities (critical interrupts), language from UI (hi-IN voice if present, else en-IN, else default; show which voice is active), rate 1.0, mute toggle persisted, "Read sitrep" and per-alert speaker buttons, speaking indicator, respects `prefers-reduced-motion` only for visuals. Auto-announce threshold selector: all / high+ / critical / off (default high+).
Input: push-to-talk button (hold or toggle) using `webkitSpeechRecognition` / `SpeechRecognition` with `lang` = UI language; interim transcript shown; on final → `POST /api/live/command`; the reply is spoken and the `ui_action` executed (select ghat, open tab, control). If recognition unsupported (Firefox/Safari), the mic button becomes a text command box with the same backend. Caveat in the UI: recognition needs Chrome/Edge and network; Hindi synthesis depends on installed OS voices.

## 5. Single-screen command center (frontend)

Route: `/` becomes `app/page.tsx` → `<CommandCenter/>`. Old routes `/brief`, `/whatif`, `/models`, `/ghat/[slug]` keep working (they render the same components) but the nav points to the single screen; the Header gets the live controls.
Design system (dark, control room, not SaaS): tokens in `globals.css` under `:root[data-theme="dark"]` (default dark; a print stylesheet forces light for the brief): bg `#0a0f1a`, surface `#111827`-ish `#0f1626`, raised `#15203a`, line `rgba(148,163,184,.14)`, text `#e5ecf6`, muted `#93a1b7`, accent `#5ad1c8` (teal, interactive), accent-2 `#8ab4ff` (links), tiers on dark: critical `#ff5a5f`, high `#ff8a4c`, medium `#f2c14e`, low `#6fcf97` (outline only, never a filled green card), no_data `#8b93a5` dashed; grid texture `rgba(255,255,255,.025)`; focus ring accent. Type: Inter + Noto Sans Devanagari; tabular numerals (`font-variant-numeric: tabular-nums`) for telemetry; DO value 40–48 px; labels 12–13 px uppercase tracking .08em muted. Motion: value changes fade 200 ms; alert enters with 180 ms slide; markers pulse only while an alert is open; no gradients except a faint radial vignette on the map; no emoji.
Layout (1440 wide; ≥ 1024 two columns; < 768 stacked):
- Top bar (sticky): title + "Live · 20 Oct 2026 · Durga visarjan", sim clock HH:MM (large, tabular), play/pause, speed segmented (1×/60×/600×), scenario select, reset; connection pill (WS live / SSE / snapshot / offline); open alerts count by severity; language toggle; voice: mute, announce level, mic; export.
- Alert banner row (only when a critical/high alert is open): the newest, with Ack and Speak.
- Main grid row 1: Map panel (7 cols) + Alert feed (5 cols, scroll, filters, ack, speak, click → select ghat).
- Row 2: Ghat strip: 7 tiles in a responsive grid (4+3 on 1024). Tile: name (en/hi), water body, tier chip with icon, DO big number + unit + arrow + slope/h, 60-min sparkline with the 5 mg/l line, BOD/pH/turbidity small values, ETA line ("DO < 5 in ~42 min" / "रुझान स्थिर"), sensor badge (live ● / stale ◐ / no live data ○ dashed border), idols/h, resources on site icons, open alert count. Selected tile has accent border.
- Row 3: Tabs (URL hash so they're linkable): Plan (v1 ranked list with reasons and page links — existing `ActionSheet`), Dispatch (resources table with status/ETA, suggestions list with reason and Apply, auto-dispatch toggle, action log with CSV export), Sitrep (live sitrep en/hi with Speak/Copy/Print + link to the historical brief view), Evidence (selected ghat: existing `GhatEvidence`), What-if (existing), Models (existing `ModelsView` + calibration table).
- Detail drawer (right slide-over, 520 px; full-screen on phone): selected ghat: live gauges for DO/BOD/pH/turbidity/conductivity with limits, 6-h charts (DO, BOD, turbidity) with limit lines and intervention markers, forecast p_breach with the estimate caveat, open alerts, resources, quick actions (send aerator/crew/test team), historical reasons with PDF page links.
- Map: inline SVG schematic of Bhopal (stylised Upper Lake, Lower Lake, Hathaikheda reservoir, Shahpura lake, Malikhedi kund) with markers at approximate projected positions (§6); marker fill = tier, ring = pulsing when alert open, size ∝ idols/h; resource glyphs move along straight routes with ETA labels; legend; "positions approximate" note. No tile server (works offline).
- Data layer: `lib/live.ts` WS client (reconnect with backoff, falls back to SSE then 2-s polling of `/api/live/snapshot`); `useLiveStore` (zustand or React context + reducer) holding SimState + series ring buffers (trim to 6 h); if backend unreachable, a local `mockLive.ts` generator produces plausible ticks from the static ranking so the UI never looks dead (badge "demo generator").
- Keyboard: space play/pause, 1–7 select ghat, L language, M mute, V hold-to-talk, Esc close drawer, ? help.
- Accessibility: `aria-live="assertive"` for critical alerts, polite for others; tier never colour-only; all controls keyboard reachable; contrast ≥ 4.5:1 on dark.
Mock data: `frontend/lib/mockLive.ts` must emit the exact WS message shapes above so the UI can be built and demoed before the backend lands.

## 6. Approximate ghat coordinates (orientation only; label as approximate)

| slug | lat | lon | body |
|---|---|---|---|
| bairagarh | 23.271 | 77.337 | Upper Lake NW shore |
| prempura | 23.236 | 77.360 | Upper Lake S shore |
| rani-kamlapati | 23.254 | 77.395 | Kamla Park, between the lakes |
| khatlapura | 23.258 | 77.408 | Lower Lake |
| hathaikheda | 23.268 | 77.487 | Hathaikheda dam |
| shahpura | 23.198 | 77.439 | Shahpura lake |
| malikhedi | 23.186 | 77.497 | Malikhedi kund |
| depot (BMC HQ) | 23.252 | 77.402 | Mata Mandir area |

## 7. Split and timeline

- Agent A (Opus, backend): everything in §2–§3 under `backend/ghatwatch/live/`, mount in `api.py` via lifespan, `tests/test_live.py`, `docs/METHOD-LIVE.md`, calibration artifact. Keep v1 endpoints and tests intact. Report by 14:55.
- Agent B (Opus, frontend): §4–§5 under `frontend/`, dark theme tokens, command center, voice, map, mock live generator, keep old routes. Report by 14:55.
- Me: 13:30–14:55 monitor; 14:55–15:40 integrate (WS end-to-end, voice in Chrome, screenshots), fix drift, update README; 15:45 commit; 16:00 user records demo; 17:00 submit.

## 8. Risks and mitigations

- Time: MUST items are sized for 80 min of agent work each; SHOULD/COULD are cut first. The mock live generator guarantees a demo even if WS integration slips.
- WebSocket on Windows/uvicorn: `websockets` 16 is installed; SSE and polling fallbacks exist.
- Voice: Chrome-only recognition and OS-dependent Hindi voices; text command box fallback; en-IN fallback voice with a visible note.
- Simulator credibility: calibration table and the "simulated / replay / field" source badge keep it honest; replay mode shows real 2025 numbers.
- Performance: 7 ghats × 12 params × 1-min buffers for 6 h = small; WS ticks ~5–10 KB/s; fine.
