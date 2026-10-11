"use client";

import Link from "next/link";
import { fetchRanking } from "@/lib/api";
import { downloadCsv, useActionLog } from "@/lib/actionlog";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { Ranking } from "@/lib/types";
import { DaysLeft } from "./DaysLeft";
import { RankCard } from "./RankCard";
import { LoadState } from "./LoadState";
import { UserDataBadge } from "./UserDataBadge";

const TIER_ORDER = { insufficient_data: 0, high: 1, medium: 2, low: 3 } as const;

export function ActionSheet({ initial }: { initial: Ranking | null }) {
  const { t } = useLang();
  const { data, error } = useLive(fetchRanking, initial);
  const log = useActionLog();
  if (!data) return <LoadState error={error} />;
  const ghats = [...data.ghats].sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.rank - b.rank);
  const s = data.summary;
  return (
    <>
      <section className="pt-6 pb-5 border-b border-rule">
        <h1 className="text-[1.75rem] sm:text-[2rem] font-bold leading-tight">{t.title}</h1>
        <div className="mt-2">
          <DaysLeft />
        </div>
        <p className="mt-2 text-[0.95rem] text-muted">{t.standardLine}</p>
        <UserDataBadge ranking={data} />
        <p className="mt-3 text-lg leading-relaxed">
          {t.summaryDo(s.do_below_5, s.do_readings, s.do_zero)}
          <br />
          {t.summaryBod(s.bod_above_3, s.bod_readings)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 no-print">
          <Link href="/brief" className="rounded bg-accent text-paper px-4 py-2 font-semibold no-underline hover:opacity-90">
            {t.openBrief}
          </Link>
          <Link href="/whatif" className="rounded border-2 border-accent text-accent px-4 py-1.5 font-semibold no-underline hover:bg-surface">
            {t.enterReadings}
          </Link>
          <button
            type="button"
            onClick={() => downloadCsv(log)}
            className="rounded border border-rule px-4 py-1.5 text-muted hover:border-ink hover:text-ink"
          >
            {t.downloadLog} {log.length > 0 && <span className="tabular">({log.length})</span>}
          </button>
        </div>
        <p className="mt-2 text-sm text-muted no-print">{t.logNote}</p>
      </section>
      <ol className="mt-5 space-y-5" aria-label={t.sheet}>
        {ghats.map((g) => (
          <li key={g.slug}>
            <RankCard g={g} />
          </li>
        ))}
      </ol>
    </>
  );
}
