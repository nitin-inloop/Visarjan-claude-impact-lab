"use client";

import Link from "next/link";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import type { GhatRank } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { ScoreBar } from "./ScoreBar";
import { TrendArrow } from "./TrendArrow";
import { ReasonLine } from "./ReasonLine";
import { ActionChips } from "./ActionChips";
import { SiteBadges } from "./SiteBadges";

export function RankCard({ g }: { g: GhatRank }) {
  const { lang, t } = useLang();
  const insufficient = g.tier === "insufficient_data";
  const breach = g.reasons.filter((r) => r.kind === "breach").slice(0, 3);
  const context = g.reasons.filter((r) => r.kind === "context").slice(0, 2);
  const gap = g.reasons.filter((r) => r.kind === "gap");
  return (
    <article
      id={g.slug}
      className={clsx("rounded-md p-4 sm:p-5 bg-paper", insufficient ? "border-2 border-dashed border-gap" : "border border-rule")}
      aria-labelledby={`${g.slug}-name`}
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0 text-center">
          <span className="sr-only">{t.rank}</span>
          <span className="block text-3xl sm:text-4xl font-bold tabular leading-none text-ink">{g.rank}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={`${g.slug}-name`} className="text-xl font-bold leading-snug">
            {g.name[lang]}
          </h2>
          <p className="text-muted text-[0.95rem]">{g.water_body_name?.[lang] ?? g.water_body}</p>
          <SiteBadges g={g} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <TierBadge tier={g.tier} large />
        <TrendArrow trend={g.trend} />
      </div>
      <details className="mt-1 text-[0.95rem]">
        <summary className="cursor-pointer text-accent">{t.whyTier}</summary>
        <p className="mt-1">{g.tier_rule[lang]}</p>
      </details>

      <div className="mt-3">
        <div className="flex justify-between text-sm text-muted mb-1 tabular">
          <span>
            {t.score} <b className="text-ink">{g.score.toFixed(2)}</b>
            {insufficient && <span> ({t.partialScore})</span>}
          </span>
          <span>
            {Math.round(g.breach_rate * 100)}% {t.breachRate} · {t.readingsOf(g.readings_available, g.readings_expected)}
          </span>
        </div>
        <ScoreBar score={g.score} tier={g.tier} label={t.score} />
      </div>

      {gap.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label={t.dataGap}>
          {gap.map((r, i) => (
            <ReasonLine key={`g${i}`} reason={r} />
          ))}
        </ul>
      )}
      <ul className="mt-4 space-y-2">
        {breach.map((r, i) => (
          <ReasonLine key={`b${i}`} reason={r} />
        ))}
        {context.map((r, i) => (
          <ReasonLine key={`c${i}`} reason={r} />
        ))}
      </ul>

      <h3 className="mt-4 mb-2 text-sm font-semibold text-muted">{t.actions}</h3>
      <ActionChips slug={g.slug} actions={g.actions} />

      <div className="mt-4 no-print">
        <Link href={`/ghat/${g.slug}`} className="inline-block rounded bg-accent text-paper px-4 py-2 font-semibold no-underline hover:opacity-90">
          {t.evidence}
        </Link>
      </div>
    </article>
  );
}
