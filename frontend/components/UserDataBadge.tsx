"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { Ranking } from "@/lib/types";

/** "Includes officer-added data (n rows, not yet verified by MPPCB)" when the ranking carries accepted uploads. */
export function UserDataBadge({ ranking }: { ranking: Ranking | null }) {
  const { lang } = useLang();
  const u = ranking?.user_data;
  if (!u?.included) return null;
  const x = ix[lang];
  return (
    <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-medium bg-medium-bg px-2.5 py-1 text-sm text-medium" role="note">
      <span aria-hidden>◆</span>
      <span className="font-semibold">{x.badge(u.rows)}</span>
      <Link
        href="/#intake"
        className="text-link underline underline-offset-2"
        onClick={(e) => {
          // On the command center a native hash change is needed so the tab switches (hashchange).
          if (window.location.pathname === "/") {
            e.preventDefault();
            window.location.hash = "intake";
          }
        }}
      >
        {x.badgeLink}
      </Link>
    </p>
  );
}
