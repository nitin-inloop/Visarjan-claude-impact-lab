"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import type { Trend } from "@/lib/types";

const ARROW: Record<Trend, string> = { worsening: "↗", stable: "→", improving: "↘" };

export function TrendArrow({ trend }: { trend: Trend }) {
  const { t } = useLang();
  return (
    <span className={clsx("inline-flex items-center gap-1 whitespace-nowrap", trend === "worsening" ? "text-high" : trend === "improving" ? "text-low" : "text-muted")}>
      <span aria-hidden className="font-bold">
        {ARROW[trend]}
      </span>
      {t.trend[trend]}
    </span>
  );
}
