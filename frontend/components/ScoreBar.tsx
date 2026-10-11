"use client";

import clsx from "clsx";
import type { Tier } from "@/lib/types";

const FILL: Record<Tier, string> = { insufficient_data: "bg-gap", high: "bg-high", medium: "bg-medium", low: "bg-low" };

/** Score 0..1 with tick marks at the tier thresholds 0.25 and 0.45. */
export function ScoreBar({ score, tier, label }: { score: number; tier: Tier; label: string }) {
  const pct = Math.max(0, Math.min(1, score)) * 100;
  return (
    <div
      className="relative h-2.5 w-full rounded-sm bg-surface border border-rule"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={score}
      aria-label={label}
    >
      <div className={clsx("h-full rounded-sm", FILL[tier], tier === "insufficient_data" && "opacity-60")} style={{ width: `${pct}%` }} />
      <span aria-hidden className="absolute top-[-3px] bottom-[-3px] w-px bg-ink/40" style={{ left: "25%" }} />
      <span aria-hidden className="absolute top-[-3px] bottom-[-3px] w-px bg-ink/40" style={{ left: "45%" }} />
    </div>
  );
}
