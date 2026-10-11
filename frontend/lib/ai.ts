// Fetch calls for the AI layer (backend/ghatwatch/ai/api.py). Every call resolves to null on any
// failure, so the UI can render nothing when the API is down.
import { API_URL } from "./api";
import type { Lang } from "./types";

export type Bi = { en: string; hi: string };

export interface AiMeta {
  ai_written: boolean;
  provider: "cerebras" | "claude" | "template";
  model: string | null;
  latency_ms: number;
  numbers_checked: boolean;
}

export interface AiAnswer extends AiMeta {
  job_id: string;
  text: Bi;
  guards_failed: string[];
}

export type AlertSeverity = "critical" | "high" | "medium" | "review" | "info";

export interface AiAlert {
  id: string;
  rule: "do_zero" | "do_below_3" | "bod_above_6" | "no_recent_test" | "implausible_value" | "tier_changed";
  severity: AlertSeverity;
  ghat: { slug: string; name: Bi };
  message: Bi;
  action: { code: string; text: Bi };
  deadline: { date: string; days_before_visarjan: number; text: Bi };
  source: { report: string | null; pdf: string | null; page: number | null; upload: string | null };
  message_ai_written?: boolean;
}

export interface AiAlerts extends AiMeta {
  lang: Lang;
  visarjan_date: string;
  count: number;
  alerts: AiAlert[];
  rephrased: number;
}

export interface AiStatus {
  cerebras: boolean;
  claude: boolean;
  documents: boolean;
  text: boolean;
}

async function call<T>(path: string, init?: RequestInit, timeoutMs = 20000): Promise<T | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_URL}${path}`, { ...init, signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const fetchAiStatus = () => call<AiStatus>("/api/ai/status", undefined, 3000);
export const fetchAiAlerts = (lang: Lang) => call<AiAlerts>(`/api/ai/alerts?lang=${lang}`);
export const fetchJobAnalysis = (jobId: string) =>
  call<AiAnswer>(`/api/ai/jobs/${encodeURIComponent(jobId)}/analysis`, { method: "POST" });

const PROVIDER: Record<string, string> = { cerebras: "Cerebras", claude: "Claude" };

/** Badge text: "Written by AI (Cerebras, 0.4 s) · numbers checked against the report" or "Standard text". */
export function aiBadge(m: AiMeta, lang: Lang): string {
  if (!m.ai_written) return lang === "hi" ? "मानक पाठ" : "Standard text";
  const who = PROVIDER[m.provider] ?? m.provider;
  const secs = (m.latency_ms / 1000).toFixed(1);
  return lang === "hi"
    ? `AI द्वारा लिखा (${who}, ${secs} से.) · संख्याएं रिपोर्ट से मिलाई गईं`
    : `Written by AI (${who}, ${secs} s) · numbers checked against the report`;
}
