// Live data client: WebSocket first; if it does not open within 3 s, poll GET /api/live/snapshot
// every 2 s; if that also fails, run the local demo generator (mockLive). Reconnects with backoff.
// Create only inside useEffect and call stop() in cleanup (StrictMode mounts twice in dev).

import { API_URL } from "./api";
import { MockLive } from "./mockLive";
import type {
  AckRes,
  CalibrationRes,
  CommandRes,
  ControlReq,
  DispatchReq,
  DispatchRes,
  Scenario,
  SimState,
  SimStateLite,
  SitrepRes,
  SuggestionsRes,
  WsMsg,
} from "./liveTypes";
import type { Lang, Ranking } from "./types";

export type ConnMode = "connecting" | "ws" | "poll" | "mock" | "offline";

export const WS_URL = API_URL.replace(/^http/, "ws") + "/ws/live";

async function req<T>(path: string, init?: RequestInit, timeoutMs = 3000): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: init?.body ? { "Content-Type": "application/json" } : undefined,
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${res.status} ${path}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

const post = <T>(path: string, body: unknown) => req<T>(path, { method: "POST", body: JSON.stringify(body) });

export interface LiveApi {
  kind: "http" | "mock";
  snapshot(): Promise<SimState>;
  control(r: ControlReq): Promise<SimStateLite>;
  scenarios(): Promise<Scenario[]>;
  dispatch(r: DispatchReq): Promise<DispatchRes>;
  ack(alertId: string): Promise<AckRes>;
  suggestions(): Promise<SuggestionsRes>;
  sitrep(): Promise<SitrepRes>;
  command(text: string, lang: Lang): Promise<CommandRes>;
  calibration(): Promise<CalibrationRes>;
}

async function staticCalibration(): Promise<CalibrationRes> {
  try {
    const res = await fetch("/data/live/calibration.json", { cache: "no-store" });
    if (!res.ok) return { available: false };
    return (await res.json()) as CalibrationRes;
  } catch {
    return { available: false };
  }
}

export const httpApi: LiveApi = {
  kind: "http",
  snapshot: () => req<SimState>("/api/live/snapshot"),
  control: (r) => post<SimStateLite>("/api/live/control", r),
  scenarios: () => req<Scenario[]>("/api/live/scenarios"),
  dispatch: (r) => post<DispatchRes>("/api/live/dispatch", r),
  ack: (id) => post<AckRes>("/api/live/ack", { alert_id: id }),
  suggestions: () => req<SuggestionsRes>("/api/live/suggestions"),
  sitrep: () => req<SitrepRes>("/api/live/sitrep"),
  command: (text, lang) => post<CommandRes>("/api/live/command", { text, lang }, ),
  calibration: async () => {
    try {
      const c = await req<CalibrationRes>("/api/live/calibration");
      if (c && (c as { available?: boolean }).available !== false) return c;
    } catch {
      /* fall through to the static artefact */
    }
    return staticCalibration();
  },
};

export function mockApi(m: MockLive): LiveApi {
  return {
    kind: "mock",
    snapshot: async () => m.snapshot(),
    control: async (r) => m.control(r),
    scenarios: async () => m.scenarios(),
    dispatch: async (r) => m.dispatch(r),
    ack: async (id) => m.ack(id),
    suggestions: async () => m.getSuggestions(),
    sitrep: async () => m.sitrep(),
    command: async (text, lang) => m.command(text, lang),
    calibration: staticCalibration,
  };
}

export interface ClientCallbacks {
  /** A message from WS or the mock. `via` tells where it came from. */
  onMessage(msg: WsMsg, via: ConnMode): void;
  /** A full state from the 2-s snapshot poll. */
  onPoll(state: SimState): void;
  onMode(mode: ConnMode, api: LiveApi): void;
}

export interface LiveClient {
  stop(): void;
  refetchSnapshot(): void;
}

export function startLiveClient(ranking: Ranking | null, cb: ClientCallbacks): LiveClient {
  let stopped = false;
  let mode: ConnMode = "connecting";
  let ws: WebSocket | null = null;
  let wsGen = 0;
  let backoff = 2000;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let pollTimer: ReturnType<typeof setTimeout> | null = null;
  let polling = false;
  let mock: MockLive | null = null;
  let mockUnsub: (() => void) | null = null;

  const setMode = (m: ConnMode, api: LiveApi) => {
    mode = m;
    cb.onMode(m, api);
  };

  const stopMock = () => {
    mockUnsub?.();
    mockUnsub = null;
    mock?.stop();
    mock = null;
  };

  const startMock = () => {
    if (mock || stopped) return;
    try {
      mock = new MockLive(ranking);
    } catch {
      setMode("offline", httpApi);
      return;
    }
    const api = mockApi(mock);
    setMode("mock", api);
    mockUnsub = mock.subscribe((msg) => !stopped && cb.onMessage(msg, "mock"));
    mock.start();
  };

  const stopPoll = () => {
    polling = false;
    if (pollTimer) clearTimeout(pollTimer);
    pollTimer = null;
  };

  const pollOnce = async () => {
    if (!polling || stopped) return;
    try {
      const s = await httpApi.snapshot();
      if (!polling || stopped) return;
      if (mode !== "poll") {
        stopMock();
        setMode("poll", httpApi);
      }
      cb.onPoll(s);
    } catch {
      if (!polling || stopped) return;
      if (mode !== "mock") startMock();
    }
    if (polling && !stopped) pollTimer = setTimeout(pollOnce, mode === "mock" ? 10000 : 2000);
  };

  const startPoll = () => {
    if (polling || stopped) return;
    polling = true;
    void pollOnce();
  };

  const scheduleReconnect = () => {
    if (stopped || reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      openWs();
    }, backoff);
    backoff = Math.min(backoff * 2, 30000);
  };

  const fallback = () => {
    if (stopped) return;
    startPoll();
    scheduleReconnect();
  };

  function openWs() {
    if (stopped) return;
    const gen = ++wsGen;
    let opened = false;
    let sock: WebSocket;
    try {
      sock = new WebSocket(WS_URL);
    } catch {
      fallback();
      return;
    }
    ws = sock;
    const openTimer = setTimeout(() => {
      if (!opened && gen === wsGen) {
        try {
          sock.close();
        } catch {
          /* ignore */
        }
        fallback();
      }
    }, 3000);
    sock.onopen = () => {
      if (gen !== wsGen || stopped) return;
      opened = true;
      clearTimeout(openTimer);
      backoff = 2000;
      stopPoll();
      stopMock();
      setMode("ws", httpApi);
    };
    sock.onmessage = (ev) => {
      if (gen !== wsGen || stopped) return;
      try {
        const msg = JSON.parse(typeof ev.data === "string" ? ev.data : "") as WsMsg;
        if (msg && (msg.type === "snapshot" || msg.type === "tick")) cb.onMessage(msg, "ws");
      } catch {
        /* ignore malformed frame */
      }
    };
    sock.onclose = () => {
      clearTimeout(openTimer);
      if (gen !== wsGen || stopped) return;
      ws = null;
      if (opened) fallback();
      else if (!polling) fallback();
    };
    sock.onerror = () => {
      /* onclose follows */
    };
  }

  openWs();

  return {
    stop() {
      stopped = true;
      wsGen++;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      stopPoll();
      stopMock();
      try {
        ws?.close();
      } catch {
        /* ignore */
      }
      ws = null;
    },
    refetchSnapshot() {
      if (stopped) return;
      if (mock) {
        cb.onMessage({ type: "snapshot", seq: mock.snapshot().seq, state: mock.snapshot() }, "mock");
        return;
      }
      httpApi
        .snapshot()
        .then((s) => !stopped && cb.onMessage({ type: "snapshot", seq: s.seq, state: s }, mode))
        .catch(() => undefined);
    },
  };
}
