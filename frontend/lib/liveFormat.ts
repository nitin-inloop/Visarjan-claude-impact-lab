import type { LiveTier, Severity } from "./liveTypes";

const clockFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
const dayFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" });

export const fmtClock = (t: number) => clockFmt.format(t);
export const fmtDay = (t: number) => dayFmt.format(t);

export function fmtNum(v: number | null | undefined, d = 1): string {
  return typeof v === "number" && Number.isFinite(v) ? v.toFixed(d) : "—";
}

export const TIER_ORDER: LiveTier[] = ["critical", "high", "no_data", "medium", "low"];
export const SEV_ORDER: Severity[] = ["critical", "high", "warn", "info"];
export const SEV_RANK: Record<Severity, number> = { info: 0, warn: 1, high: 2, critical: 3 };

export const TIER_ICON: Record<LiveTier, string> = { critical: "✕", high: "▲", medium: "◆", low: "✓", no_data: "○" };
export const TIER_TEXT: Record<LiveTier, string> = {
  critical: "text-critical",
  high: "text-high",
  medium: "text-medium",
  low: "text-low",
  no_data: "text-nodata",
};
export const TIER_CHIP: Record<LiveTier, string> = {
  critical: "bg-critical text-paper border border-critical",
  high: "border border-high text-high bg-high-bg",
  medium: "border border-medium text-medium bg-medium-bg",
  low: "border border-low text-low",
  no_data: "border border-dashed border-nodata text-nodata",
};
export const TIER_VAR: Record<LiveTier, string> = {
  critical: "var(--critical)",
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)",
  no_data: "var(--nodata)",
};

export const SEV_ICON: Record<Severity, string> = { critical: "✕", high: "▲", warn: "◆", info: "i" };
export const SEV_CHIP: Record<Severity, string> = {
  critical: "bg-critical text-paper border border-critical",
  high: "border border-high text-high bg-high-bg",
  warn: "border border-medium text-medium",
  info: "border border-nodata text-muted",
};
export const SEV_BAR: Record<Severity, string> = {
  critical: "border-l-critical",
  high: "border-l-high",
  warn: "border-l-medium",
  info: "border-l-nodata",
};
