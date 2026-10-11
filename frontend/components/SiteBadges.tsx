"use client";

import { useLang } from "@/lib/lang";
import type { GhatRank } from "@/lib/types";

export function SiteBadges({ g }: { g: Pick<GhatRank, "ngt_lake_ban" | "site_confidence" | "site_note"> }) {
  const { lang, t } = useLang();
  if (!g.ngt_lake_ban && g.site_confidence === "high") return null;
  return (
    <div className="mt-1.5 flex flex-col gap-1 text-sm">
      {g.ngt_lake_ban && (
        <p>
          <span className="inline-block rounded border border-ink px-1.5 font-semibold mr-1.5">{t.ngtBan}</span>
          <span className="text-muted">{t.ngtBanNote}</span>
        </p>
      )}
      {g.site_confidence !== "high" && (
        <p>
          <span className="inline-block rounded border border-medium text-medium px-1.5 font-semibold mr-1.5">{t.siteMedium}</span>
          <span className="text-muted">{g.site_note?.[lang] ?? t.siteMediumNote}</span>
        </p>
      )}
    </div>
  );
}
