"use client";

import Link from "next/link";
import { fetchGhat } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { GhatDetail } from "@/lib/types";
import { StatusPill } from "./home/GhatCard";
import { PdfLink } from "./PdfLink";
import { SiteBadges } from "./SiteBadges";
import { ACTION, STATUS, WORDS, plainReason } from "@/lib/plain";
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
    <div className="mx-auto max-w-5xl space-y-5">
      <Link href="/" className="no-print inline-flex min-h-10 items-center text-[14px] font-medium text-[#3A3A40] no-underline hover:text-[#111113]">
        ← {lang === "hi" ? "घाट सूची" : "All ghats"}
      </Link>
      <header className="rounded-2xl border border-[#E6E6E9] bg-white p-5 sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#8A8A93]">{lang === "hi" ? `क्रम ${g.rank} / 7` : `Number ${g.rank} of 7`}</p>
        <h1 className="text-[26px] font-bold tracking-tight text-[#111113]">{g.name[lang]}</h1>
        <p className="text-lg text-muted">{g.water_body_name?.[lang] ?? g.water_body}</p>
        <div className="mt-3">
          <StatusPill tier={g.tier} lang={lang} big />
        </div>
        <p className="mt-2 text-lg font-semibold" style={{ color: STATUS[g.tier].fg }}>
          {STATUS[g.tier].hint[lang]}
        </p>
        <SiteBadges g={g} />

        <h2 className="mt-6 text-[13px] font-semibold uppercase tracking-wide text-[#3A3A40]">{lang === "hi" ? "क्यों" : "Why"}</h2>
        <ul className="mt-2 space-y-3">
          {g.reasons.map((r, i) => {
            const pr = plainReason(r, lang);
            return (
              <li key={i} className="text-[16px] leading-relaxed pl-3 border-l-4" style={{ borderColor: r.kind === "gap" || r.value === null ? "#6b7280" : STATUS.high.bd }}>
                <span className="font-semibold">{pr.main}</span>
                {pr.when && <span className="text-muted"> · {pr.when}</span>}
                <span className="block text-base">
                  <span className="text-muted">{lang === "hi" ? "सबूत: " : "Proof: "}</span>
                  <PdfLink source={r.source} />
                </span>
              </li>
            );
          })}
        </ul>

        {g.actions.length > 0 && (
          <>
            <h2 className="mt-6 text-[13px] font-semibold uppercase tracking-wide text-[#3A3A40]">{lang === "hi" ? "क्या करें" : "What to do"}</h2>
            <ul className="mt-2 space-y-2">
              {g.actions.map((a) => (
                <li key={a.code} className="flex items-start gap-3 rounded-xl border border-[#EFEFF1] bg-[#FAFAFB] px-3 py-2 text-[15px]">
                  <span aria-hidden>{ACTION[a.code]?.icon ?? "•"}</span>
                  <span>
                    <b>{ACTION[a.code]?.word[lang] ?? a.text[lang]}</b>
                    <span className="block text-base text-muted">{a.text[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-5 rounded-xl bg-[#F6F6F7] p-3 text-[14px] text-[#3A3A40]">
          <p>{WORDS.oxygen[lang]}</p>
          <p>{WORDS.bod[lang]}</p>
        </div>
      </header>

      <section className="rounded-2xl border border-[#E6E6E9] bg-white p-5 sm:p-6" aria-labelledby="readings-h">
        <h2 id="readings-h" className="text-[13px] font-semibold uppercase tracking-wide text-[#3A3A40]">
          {lang === "hi" ? "सभी नंबर (हर नंबर के साथ रिपोर्ट का पेज)" : "All numbers (each with its report page)"}
        </h2>
        <p className="text-sm text-muted mb-2">{t.readingsNote}</p>
        <ReadingsTable readings={g.readings} />
        <TableLegend />
      </section>

      <section className="rounded-2xl border border-[#E6E6E9] bg-white p-5 sm:p-6">
        {doSeries.length > 0 && <Sparkline title={t.doTrend} points={doSeries} limit={5} mode="min" limitText={t.limitLabel("≥ 5")} />}
        {bodSeries.length > 0 && <Sparkline title={t.bodTrend} points={bodSeries} limit={3} mode="max" limitText={t.limitLabel("≤ 3")} />}
      </section>

      {g.forecast?.available && (
        <details className="rounded-2xl border border-[#E6E6E9] bg-white p-5 sm:p-6">
          <summary className="min-h-12 flex items-center text-lg font-semibold cursor-pointer">
            {lang === "hi" ? "प्रयोगात्मक अनुमान (मॉडल)" : "Experimental forecast (model)"}
          </summary>
          <ForecastPanel forecast={g.forecast} />
        </details>
      )}

      <section className="rounded-2xl border border-[#E6E6E9] bg-white p-5 sm:p-6" aria-labelledby="gaps-h">
        <h2 id="gaps-h" className="text-[13px] font-semibold uppercase tracking-wide text-[#3A3A40]">
          ? {lang === "hi" ? "जो जांच नहीं हुई" : "Tests that are missing"}
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
