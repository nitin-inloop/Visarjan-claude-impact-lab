// Client-side port of PLAN.md §3.2–3.4 (deterministic score), used when the API is unreachable.
import type { PreReadings, Reading, Tier } from "./types";

export const W_PARAM: Record<string, number> = { "Dissolved oxygen": 0.45, BOD: 0.4, pH: 0.15 };
export const W_YEAR: Record<number, number> = { 2026: 1.0, 2025: 1.0, 2024: 0.75, 2023: 0.5 };
export const W_PHASE: Record<string, number> = { pre: 0.5, during: 1.0, after: 1.0 };

const clip = (x: number) => Math.max(0, Math.min(1, x));

/** Physically plausible ranges (mirrors backend scoring.PLAUSIBLE); values outside are never scored. */
export const PLAUSIBLE: Record<string, [number, number]> = { "Dissolved oxygen": [0, 20], BOD: [0, 500], pH: [0, 14] };

/** Reason text when a value cannot be a real reading (negative / out of range / NaN), else null. */
export function implausibleReason(parameter: string, v: number | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  const name = parameter === "Dissolved oxygen" ? "DO" : parameter;
  if (!Number.isFinite(v)) return `${name} is not a number.`;
  if (v < 0) return `${name} ${v} is negative, which is impossible.`;
  const r = PLAUSIBLE[parameter];
  if (r && (v < r[0] || v > r[1])) return `${name} ${v} is outside the plausible range ${r[0]}-${r[1]}; check for a typo or unit slip.`;
  return null;
}

export function exceedance(parameter: string, v: number): number {
  if (parameter === "Dissolved oxygen") return clip((5 - v) / 5);
  if (parameter === "BOD") return clip((v - 3) / 9);
  if (parameter === "pH") return clip(v < 6.5 ? 6.5 - v : v > 8.5 ? v - 8.5 : 0);
  return 0;
}

interface Pt {
  year: number;
  festival: string;
  phase: string;
  parameter: string;
  value: number;
}

export interface ScoreResult {
  score: number;
  coverage: number;
  tier: Tier;
  /** parameter with the largest weighted contribution */
  driver: string | null;
}

function toPoints(readings: Reading[]): Pt[] {
  return readings
    .filter((r) => r.parameter in W_PARAM && r.value !== null && r.value !== undefined && !implausibleReason(r.parameter, r.value))
    .map((r) => ({ year: r.year, festival: r.festival, phase: r.phase, parameter: r.parameter, value: r.value as number }));
}

export function prePoints(pre: PreReadings): Pt[] {
  const map: [keyof PreReadings, string][] = [
    ["DO", "Dissolved oxygen"],
    ["BOD", "BOD"],
    ["pH", "pH"],
  ];
  return map
    .filter(([k, p]) => typeof pre[k] === "number" && Number.isFinite(pre[k]) && !implausibleReason(p, pre[k] as number))
    .map(([k, p]) => ({ year: 2026, festival: "Durga", phase: "pre", parameter: p, value: pre[k] as number }));
}

/**
 * score = Σ(w_p·w_y·w_ph·exceed) / Σ(w_p·w_y·w_ph); tiers per §3.4.
 * expected = 54 for an existing ghat, 3 for a new ghat scored on 2026 entries only.
 * Entered 2026 Durga readings count as recent Durga data for the "no Durga 2025 table" rule.
 */
/** §3.4 rule 3b (mirrors backend scoring.py): BOD above 3 mg/l in ≥ 2/3 of readings since 2024
 *  (at least 6 readings) with a median ≥ 6 mg/l makes a ghat at least Medium. */
export function persistentBod(pts: Pt[]): boolean {
  const bod = pts.filter((p) => p.parameter === "BOD" && p.year >= 2024).map((p) => p.value);
  if (bod.length < 6) return false;
  const over = bod.filter((v) => v > 3).length;
  const sorted = [...bod].sort((a, b) => a - b);
  const mid = sorted.length / 2;
  const median = sorted.length % 2 ? sorted[Math.floor(mid)] : (sorted[mid - 1] + sorted[mid]) / 2;
  return over / bod.length >= 2 / 3 && median >= 6;
}

export function scorePoints(pts: Pt[], expected: number, newSite = false): ScoreResult {
  let num = 0;
  let den = 0;
  const byParam: Record<string, number> = {};
  for (const p of pts) {
    const w = W_PARAM[p.parameter] * (W_YEAR[p.year] ?? 0.5) * (W_PHASE[p.phase] ?? 1);
    const c = w * exceedance(p.parameter, p.value);
    num += c;
    den += w;
    byParam[p.parameter] = (byParam[p.parameter] ?? 0) + c;
  }
  const score = den ? num / den : 0;
  const coverage = pts.length / expected;
  // 2026 entries clear the "no Durga 2025 test" rule only when they include at least DO and BOD
  const p26 = new Set(pts.filter((p) => p.festival === "Durga" && p.year >= 2026).map((p) => p.parameter));
  const has2026 = p26.has("Dissolved oxygen") && p26.has("BOD");
  const recentDurga = pts.some((p) => p.festival === "Durga" && p.year === 2025) || has2026;
  const latestDurgaYear = Math.max(0, ...pts.filter((p) => p.festival === "Durga").map((p) => p.year));
  const DO = pts.filter((p) => p.parameter === "Dissolved oxygen");
  const have = new Set(pts.map((p) => p.parameter));
  let tier: Tier;
  if (newSite ? !(have.has("Dissolved oxygen") && have.has("BOD")) : coverage < 0.5 || !recentDurga)
    tier = "insufficient_data";
  else if (
    DO.some((p) => p.value === 0 && p.year >= 2024) ||
    DO.some((p) => p.festival === "Durga" && p.year === latestDurgaYear && p.value < 3) ||
    score >= 0.45
  )
    tier = "high";
  else if (score >= 0.25) tier = "medium";
  else if (persistentBod(pts)) tier = "medium";
  else tier = "low";
  const driver = Object.entries(byParam).sort((a, b) => b[1] - a[1]).find(([, v]) => v > 0)?.[0] ?? null;
  return { score, coverage, tier, driver };
}

export function scoreGhat(readings: Reading[], pre?: PreReadings): ScoreResult {
  return scorePoints([...toPoints(readings), ...(pre ? prePoints(pre) : [])], 54);
}

export function scoreNewSite(pre: PreReadings): ScoreResult {
  return scorePoints(prePoints(pre), 3, true);
}
