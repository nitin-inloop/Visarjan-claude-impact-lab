"use client";

import Link from "next/link";
import { fetchGhat } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { GhatDetail } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { TrendArrow } from "./TrendArrow";
import { SiteBadges } from "./SiteBadges";
import { ReasonLine } from "./ReasonLine";
import { ReadingsTable, TableLegend } from "./ReadingsTable";
import { Sparkline } from "./Sparkline";
import { ForecastPanel } from "./ForecastPanel";
import { LoadState } from "./LoadState";

export function GhatEvidence({ slug, initial }: { slug: string; initial: GhatDetail | null }) {
  const { lang, t } = useLang();
  const { data: g, error } = useLive(() => fetchGhat(slug), initial, [slug]);
  if (!g) return <LoadState error={error} />;
  const doSeries = g.series?.["Dissolved oxygen"] ?? [];
  const bodSeries = g.series?.["BOD"] ?? [];
  return (
    <div className="pt-4">
      <Link href={`/#${g.slug}`} className="no-print text-[0.95rem]">
        ← {t.back}
      </Link>
      <header className="mt-3 pb-4 border-b border-rule">
        <p className="text-sm text-muted">
          {t.evidence} · {t.rank} {g.rank}
        </p>
        <h1 className="text-[1.6rem] font-bold leading-tight">{g.name[lang]}</h1>
        <p className="text-muted">{g.water_body_name?.[lang] ?? g.water_body}</p>
        <SiteBadges g={g} />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <TierBadge tier={g.tier} large />
          <TrendArrow trend={g.trend} />
          <span className="text-sm text-muted tabular">
            {t.score} {g.score.toFixed(2)} · {Math.round(g.coverage * 100)}% {t.coverage}
          </span>
        </div>
        <p className="mt-2 text-[0.95rem]">{g.tier_rule[lang]}</p>
        <ul className="mt-3 space-y-2">
          {g.reasons.map((r, i) => (
            <ReasonLine key={i} reason={r} />
          ))}
        </ul>
      </header>

      <section className="mt-6" aria-labelledby="readings-h">
        <h2 id="readings-h" className="text-xl font-bold">
          {t.readings}
        </h2>
        <p className="text-sm text-muted mb-2">{t.readingsNote}</p>
        <ReadingsTable readings={g.readings} />
        <TableLegend />
      </section>

      <section className="mt-6">
        {doSeries.length > 0 && <Sparkline title={t.doTrend} points={doSeries} limit={5} mode="min" limitText={t.limitLabel("≥ 5")} />}
        {bodSeries.length > 0 && <Sparkline title={t.bodTrend} points={bodSeries} limit={3} mode="max" limitText={t.limitLabel("≤ 3")} />}
      </section>

      {g.forecast?.available && (
        <section className="mt-6 border border-rule rounded-md p-4" aria-labelledby="fc-h">
          <h2 id="fc-h" className="text-xl font-bold mb-2">
            {t.forecast}
          </h2>
          <ForecastPanel forecast={g.forecast} />
        </section>
      )}

      <section className="mt-6" aria-labelledby="gaps-h">
        <h2 id="gaps-h" className="text-xl font-bold">
          {t.gaps}
        </h2>
        {g.gaps.length === 0 ? (
          <p className="text-muted">{t.noGaps}</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {g.gaps.map((gap, i) => (
              <li key={i} className={gap.phase === null && gap.parameters.length === 0 ? "text-gap font-semibold pl-3 border-l-[3px] border-gap" : "pl-3 border-l-[3px] border-rule"}>
                {gap.text[lang]}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
