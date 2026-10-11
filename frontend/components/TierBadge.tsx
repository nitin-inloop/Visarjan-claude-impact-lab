"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import type { Tier } from "@/lib/types";

const ICON: Record<Tier, string> = { insufficient_data: "?", high: "▲", medium: "◆", low: "✓" };
const STYLE: Record<Tier, string> = {
  insufficient_data: "border-2 border-dashed border-gap text-gap bg-paper",
  high: "border border-high text-high bg-high-bg",
  medium: "border border-medium text-medium bg-medium-bg",
  low: "border border-low text-low bg-low-bg",
};

export function TierBadge({ tier, large = false }: { tier: Tier; large?: boolean }) {
  const { t } = useLang();
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded font-semibold whitespace-nowrap",
        large ? "px-3 py-1 text-base" : "px-2 py-0.5 text-sm",
        STYLE[tier],
      )}
    >
      <span aria-hidden className="text-[0.85em] leading-none">
        {ICON[tier]}
      </span>
      {t.tier[tier]}
    </span>
  );
}
