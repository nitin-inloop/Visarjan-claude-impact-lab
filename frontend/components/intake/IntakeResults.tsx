"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { IntakeClient } from "@/lib/intakeApi";
import type { AnalysisGhat, IntakeReason, Job } from "@/lib/intakeTypes";
import type { Forecast } from "@/lib/types";
import { ForecastPanel } from "@/components/ForecastPanel";
import { PdfLink } from "@/components/PdfLink";
import { TierBadge } from "@/components/TierBadge";
import { Lightbox, btn } from "./shared";

function stripSource(s: string) {
  return s.replace(/\s*(Source|स्रोत):[^]*$/u, "").trim();
}

function ReasonItem({ r, client }: { r: IntakeReason; client: IntakeClient }) {
  const { lang } = useLang();
  const x = ix[lang];
  const [open, setOpen] = useState(false);
  const page = r.source.page;
  return (
    <li className={clsx("pl-3 border-l-[3px]", r.kind === "gap" ? "border-gap text-gap" : r.kind === "context" ? "border-rule text-muted" : "border-ink/70")}>
      {stripSource(r.text[lang])}{" "}
      {r.source.upload && page !== null ? (
        <>
          <button type="button" className="whitespace-nowrap font-semibold tabular underline underline-offset-2 text-link" title={x.uploadedTitle} onClick={() => setOpen(true)}>
            {x.uploadedPage(page)} ↗
          </button>
          {open && <Lightbox src={client.pageUrl(r.source.upload, page)} alt={x.uploadedPage(page)} onClose={() => setOpen(false)} />}
        </>
      ) : r.source.pdf && page !== null ? (
        <PdfLink source={{ pdf: r.source.pdf, page, report: r.source.report ?? undefined }} />
      ) : null}
    </li>
  );
}

function GhatResult({ g, client }: { g: AnalysisGhat; client: IntakeClient }) {
  const { lang } = useLang();
  const x = ix[lang];
  return (
    <article className={clsx("rounded border p-3 bg-surface", g.changed ? "border-accent" : "border-rule")}>
      <h4 className="font-bold text-ink">{g.name[lang]}</h4>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs text-muted">{x.before}</span>
        <TierBadge tier={g.before.tier} />
        <span className="tabular text-muted text-xs">
          {x.score} {g.before.score.toFixed(3)} · {x.rank} {g.before.rank}
        </span>
        <span aria-hidden className="text-muted">→</span>
        <span className="text-xs text-muted">{x.after}</span>
        <TierBadge tier={g.after.tier} />
        <span className={clsx("tabular text-xs", g.changed ? "text-ink font-semibold" : "text-muted")}>
          {x.score} {g.after.score.toFixed(3)} · {x.rank} {g.after.rank}
        </span>
        {!g.changed && <span className="text-xs text-muted">({x.unchanged})</span>}
      </div>
      {g.reasons.length > 0 && (
        <>
          <h5 className="mt-3 text-sm font-semibold">{x.newReasons}</h5>
          <ul className="mt-1 space-y-1.5 text-[0.95rem]">
            {g.reasons.map((r, i) => (
              <ReasonItem key={i} r={r} client={client} />
            ))}
          </ul>
        </>
      )}
      {g.forecast && (
        <div className="mt-3 rounded border border-rule bg-paper p-3">
          <h5 className="text-sm font-semibold">
            {x.forecast} <span className="ml-1 text-xs font-normal italic text-medium">({x.estimate})</span>
          </h5>
          <div className="mt-1">
            <ForecastPanel forecast={g.forecast as Forecast} />
          </div>
        </div>
      )}
      {g.allocation_hint && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">{x.allocation}:</span> {g.allocation_hint.text[lang]}
        </p>
      )}
    </article>
  );
}

export function IntakeResults({ job, client, onOpenPlan }: { job: Job; client: IntakeClient; onOpenPlan?: () => void }) {
  const { lang } = useLang();
  const x = ix[lang];
  const a = job.analysis;
  const [dlErr, setDlErr] = useState(false);
  if (!a) return null;
  const download = async (l: "en" | "hi") => {
    try {
      const r = await client.report(job.id);
      const blob = new Blob([r.markdown[l]], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.href = url;
      el.download = `ghatwatch-intake-${job.id}-${l}.md`;
      el.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDlErr(false);
    } catch {
      setDlErr(true);
    }
  };
  const ghats = [...a.ghats].sort((p, q) => Number(q.changed) - Number(p.changed));
  return (
    <section aria-label={x.results} className="space-y-3">
      <h3 className="text-sm font-bold text-ink">{x.results}</h3>
      <p className="text-sm">{a.summary[lang]}</p>
      <p className="text-xs text-muted">
        {a.standard} · {x.notVerified}
      </p>
      <div className="@container"><div className="grid gap-3 @4xl:grid-cols-2">
        {ghats.map((g) => (
          <GhatResult key={g.slug} g={g} client={client} />
        ))}
      </div></div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btn} disabled={!job.report_available} onClick={() => download("en")}>
          {x.downloadEn}
        </button>
        <button type="button" className={btn} disabled={!job.report_available} onClick={() => download("hi")}>
          {x.downloadHi}
        </button>
        {onOpenPlan ? (
          <button type="button" className={btn} onClick={onOpenPlan}>
            {x.toPlan} →
          </button>
        ) : (
          <Link href="/#plan" className={clsx(btn, "no-underline")}>
            {x.toPlan} →
          </Link>
        )}
      </div>
      {dlErr && <p className="text-xs text-medium">{x.failed}</p>}
    </section>
  );
}
