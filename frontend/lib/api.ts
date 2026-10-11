import type {
  Allocation,
  Brief,
  GapsResponse,
  GhatDetail,
  Leaderboard,
  Ranking,
  Sourced,
  WhatIfRequest,
  WhatIfResponse,
} from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

async function getJson<T>(url: string, timeoutMs = 2500, init?: RequestInit): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/** Try the live API, fall back to the static snapshot in /public/data. */
async function liveOrStatic<T>(apiPath: string, staticPath: string): Promise<Sourced<T>> {
  try {
    return { data: await getJson<T>(`${API_URL}${apiPath}`), source: "live" };
  } catch {
    return { data: await getJson<T>(staticPath, 10000), source: "static" };
  }
}

export const fetchRanking = () => liveOrStatic<Ranking>("/api/ranking", "/data/ranking.json");
export const fetchGhat = (slug: string) =>
  liveOrStatic<GhatDetail>(`/api/ghats/${encodeURIComponent(slug)}`, `/data/ghats/${encodeURIComponent(slug)}.json`);
export const fetchGaps = () => liveOrStatic<GapsResponse>("/api/gaps", "/data/gaps.json");
export const fetchBrief = () => liveOrStatic<Brief>("/api/brief", "/data/brief.json");
export const fetchLeaderboard = () => liveOrStatic<Leaderboard>("/api/models/leaderboard", "/data/leaderboard.json");
export const fetchAllocation = (budget?: number) =>
  liveOrStatic<Allocation>(budget === undefined ? "/api/allocate" : `/api/allocate?budget=${budget}`, "/data/allocate.json");

/** The API understood the request but refused it (HTTP 422), e.g. an implausible reading. */
export class ApiRejected extends Error {
  constructor(public detail: string) {
    super(detail);
  }
}

/** POST /api/whatif. Throws ApiRejected on HTTP 422 (show the detail to the user);
 * throws anything else when the API is unreachable (callers fall back to lib/score.ts). */
export async function postWhatIf(body: WhatIfRequest): Promise<WhatIfResponse> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(`${API_URL}/api/whatif`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (res.status === 422) {
      const j = (await res.json().catch(() => null)) as { detail?: unknown } | null;
      const d = j?.detail;
      const text = typeof d === "string" ? d : Array.isArray(d) ? d.map((x) => (x as { msg?: string })?.msg ?? "").filter(Boolean).join("; ") : "";
      throw new ApiRejected(text || "Implausible reading, not scored.");
    }
    if (!res.ok) throw new Error(`${res.status} /api/whatif`);
    return (await res.json()) as WhatIfResponse;
  } finally {
    clearTimeout(timer);
  }
}

export async function pingApi(): Promise<boolean> {
  try {
    await getJson<unknown>(`${API_URL}/api/health`, 1500);
    return true;
  } catch {
    return false;
  }
}

// Served from public/pdf/ (copied by scripts/copy-pdfs.mjs), so links work without the API.
export const pdfHref = (pdf: string, page: number) => `/pdf/${pdf}.pdf#page=${page}`;
