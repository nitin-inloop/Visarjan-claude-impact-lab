"use client";

// Live state: useReducer + context. Applies snapshots and ticks, keeps per-ghat ring buffers
// (6 sim-h), alerts upsert/resolve, seq-gap refetch, and fans out newly arrived alerts to
// subscribers (voice). Alerts that arrive in a snapshot are never announced.

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { httpApi, startLiveClient, type ConnMode, type LiveApi, type LiveClient } from "./liveClient";
import type { Alert, GhatLive, LiveEvent, Point, Resource, Series, SeriesParam, SimState, Suggestion, SitrepRes, TickMsg, WsMsg } from "./liveTypes";
import type { Ranking } from "./types";

const KEEP_MS = 6 * 60 * 60_000;
const PARAMS: SeriesParam[] = ["DO", "BOD", "turbidity"];

export interface LiveData {
  seq: number;
  t: number;
  t_start: number;
  speed: number;
  running: boolean;
  scenario: SimState["scenario"];
  ghats: Record<string, GhatLive>;
  series: Record<string, Series>;
  resources: Resource[];
  alerts: Alert[];
  events: LiveEvent[];
  suggestions: Suggestion[];
  suggestions_version: number;
  sitrep_version: number;
  stats: SimState["stats"];
}

interface StoreState {
  data: LiveData | null;
  mode: ConnMode;
}

type Action = { type: "snapshot"; state: SimState } | { type: "tick"; msg: TickMsg } | { type: "mode"; mode: ConnMode } | { type: "suggestions"; items: Suggestion[] };

const emptySeries = (): Series => ({ DO: [], BOD: [], turbidity: [] });

function trim(pts: Point[], now: number): Point[] {
  const cut = now - KEEP_MS;
  let i = 0;
  while (i < pts.length && pts[i][0] < cut) i++;
  return i ? pts.slice(i) : pts;
}

function mergeSnapshotSeries(prev: Series | undefined, snap: Series | undefined, now: number): Series {
  const out = emptySeries();
  for (const p of PARAMS) {
    const s = snap?.[p] ?? [];
    const first = s.length ? s[0][0] : Infinity;
    const older = (prev?.[p] ?? []).filter((pt) => pt[0] < first);
    out[p] = trim([...older, ...s], now);
  }
  return out;
}

function applySnapshot(prev: LiveData | null, s: SimState): LiveData {
  const series: Record<string, Series> = {};
  const ghats: Record<string, GhatLive> = {};
  // A reset moves time backwards: drop old buffers.
  const keepOld = prev && s.t >= prev.t && prev.t_start === s.t_start;
  for (const [slug, g] of Object.entries(s.ghats)) {
    series[slug] = mergeSnapshotSeries(keepOld ? prev?.series[slug] : undefined, g.series, s.t);
    const rest = { ...g };
    delete rest.series;
    ghats[slug] = rest;
  }
  return {
    seq: s.seq,
    t: s.t,
    t_start: s.t_start,
    speed: s.speed,
    running: s.running,
    scenario: s.scenario,
    ghats,
    series,
    resources: s.resources,
    alerts: s.alerts_open.filter((a) => a.state !== "resolved"),
    events: s.events_recent.slice(-200),
    suggestions: s.suggestions,
    suggestions_version: s.suggestions_version,
    sitrep_version: s.sitrep_version,
    stats: s.stats,
  };
}

function applyTick(d: LiveData, m: TickMsg): LiveData {
  const series = { ...d.series };
  for (const [slug, pts] of Object.entries(m.points ?? {})) {
    const cur = series[slug] ?? emptySeries();
    const next: Series = { ...cur };
    for (const p of PARAMS) {
      const add = pts[p];
      if (add && add.length) next[p] = trim([...cur[p], ...add], m.t);
    }
    series[slug] = next;
  }
  let alerts = d.alerts;
  if (m.alerts_upsert?.length || m.alerts_resolved?.length) {
    const byId = new Map(alerts.map((a) => [a.id, a]));
    for (const a of m.alerts_upsert ?? []) {
      if (a.state === "resolved") byId.delete(a.id);
      else byId.set(a.id, a);
    }
    for (const id of m.alerts_resolved ?? []) byId.delete(id);
    alerts = [...byId.values()];
  }
  const ghats: Record<string, GhatLive> = { ...d.ghats };
  for (const [slug, g] of Object.entries(m.ghats ?? {})) {
    const rest = { ...g };
    delete rest.series;
    ghats[slug] = rest;
  }
  return {
    ...d,
    seq: m.seq,
    t: m.t,
    speed: m.speed,
    running: m.running,
    scenario: m.scenario ?? d.scenario,
    ghats,
    series,
    resources: m.resources ?? d.resources,
    alerts,
    events: m.events?.length ? [...d.events, ...m.events].slice(-200) : d.events,
    suggestions_version: m.suggestions_version,
    sitrep_version: m.sitrep_version,
  };
}

function reducer(s: StoreState, a: Action): StoreState {
  switch (a.type) {
    case "snapshot":
      return { ...s, data: applySnapshot(s.data, a.state) };
    case "tick":
      return s.data ? { ...s, data: applyTick(s.data, a.msg) } : s;
    case "mode":
      return { ...s, mode: a.mode };
    case "suggestions":
      return s.data ? { ...s, data: { ...s.data, suggestions: a.items } } : s;
  }
}

export type AlertListener = (alerts: Alert[]) => void;

interface Ctx {
  data: LiveData | null;
  mode: ConnMode;
  api: LiveApi;
  sitrep: SitrepRes | null;
  refreshSitrep(): void;
  subscribeAlerts(fn: AlertListener): () => void;
}

const LiveCtx = createContext<Ctx | null>(null);

export function useLiveStore(): Ctx {
  const c = useContext(LiveCtx);
  if (!c) throw new Error("useLiveStore outside LiveProvider");
  return c;
}

const sevRank = { info: 0, warn: 1, high: 2, critical: 3 } as const;

export function LiveProvider({ ranking, children }: { ranking: Ranking | null; children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { data: null, mode: "connecting" });
  const [api, setApi] = useState<LiveApi>(httpApi);
  const [sitrep, setSitrep] = useState<SitrepRes | null>(null);
  const listeners = useRef(new Set<AlertListener>());
  const lastSeq = useRef<number | null>(null);
  const pollAlerts = useRef<Map<string, Alert> | null>(null);
  const clientRef = useRef<LiveClient | null>(null);
  const apiRef = useRef<LiveApi>(httpApi);

  const emitAlerts = useCallback((as: Alert[]) => {
    if (!as.length) return;
    listeners.current.forEach((f) => f(as));
  }, []);

  useEffect(() => {
    const client = startLiveClient(ranking, {
      onMessage(msg: WsMsg) {
        if (msg.type === "snapshot") {
          lastSeq.current = msg.state.seq;
          pollAlerts.current = null;
          dispatch({ type: "snapshot", state: msg.state });
          return;
        }
        const gap = lastSeq.current !== null && msg.seq !== lastSeq.current + 1;
        lastSeq.current = msg.seq;
        dispatch({ type: "tick", msg });
        emitAlerts((msg.alerts_upsert ?? []).filter((a) => a.state === "open"));
        if (gap) client.refetchSnapshot();
      },
      onPoll(s: SimState) {
        // Polling only delivers snapshots. The first one is a baseline (never announced);
        // later, alerts that are new or escalated since the previous poll arrived live.
        const prev = pollAlerts.current;
        const now = new Map(s.alerts_open.map((a) => [a.id, a]));
        if (prev) {
          const fresh = s.alerts_open.filter((a) => a.state === "open" && (!prev.has(a.id) || sevRank[a.severity] > sevRank[prev.get(a.id)!.severity]));
          emitAlerts(fresh);
        }
        pollAlerts.current = now;
        lastSeq.current = s.seq;
        dispatch({ type: "snapshot", state: s });
      },
      onMode(mode, a) {
        apiRef.current = a;
        setApi(a);
        dispatch({ type: "mode", mode });
      },
    });
    clientRef.current = client;
    return () => {
      client.stop();
      clientRef.current = null;
    };
  }, [ranking, emitAlerts]);

  // Refetch suggestions when the version changes.
  const sv = state.data?.suggestions_version;
  useEffect(() => {
    if (sv === undefined) return;
    let alive = true;
    apiRef.current
      .suggestions()
      .then((r) => alive && dispatch({ type: "suggestions", items: r.items }))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [sv, api]);

  const refreshSitrep = useCallback(() => {
    apiRef.current
      .sitrep()
      .then(setSitrep)
      .catch(() => undefined);
  }, []);

  // Refetch the sitrep when its version changes (throttled to one request per 3 s).
  const rv = state.data?.sitrep_version;
  const lastSitrepFetch = useRef(0);
  useEffect(() => {
    if (rv === undefined) return;
    const wait = Math.max(0, 3000 - (Date.now() - lastSitrepFetch.current));
    const timer = setTimeout(() => {
      lastSitrepFetch.current = Date.now();
      refreshSitrep();
    }, wait);
    return () => clearTimeout(timer);
  }, [rv, api, refreshSitrep]);

  const subscribeAlerts = useCallback((fn: AlertListener) => {
    listeners.current.add(fn);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);

  const value = useMemo<Ctx>(
    () => ({ data: state.data, mode: state.mode, api, sitrep, refreshSitrep, subscribeAlerts }),
    [state.data, state.mode, api, sitrep, refreshSitrep, subscribeAlerts],
  );
  return <LiveCtx.Provider value={value}>{children}</LiveCtx.Provider>;
}
