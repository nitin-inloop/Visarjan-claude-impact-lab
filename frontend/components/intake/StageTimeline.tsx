"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { Job, StageStatus } from "@/lib/intakeTypes";

const DOT: Record<StageStatus, string> = {
  pending: "border border-nodata bg-transparent",
  running: "bg-accent animate-pulse",
  done: "bg-low",
  failed: "bg-critical",
  skipped: "border border-dashed border-nodata bg-transparent",
};
const TXT: Record<StageStatus, string> = { pending: "text-muted", running: "text-accent", done: "text-low", failed: "text-critical", skipped: "text-muted" };

const time = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" });
};

export function StageTimeline({ job, now }: { job: Job; now: number }) {
  const { lang } = useLang();
  const x = ix[lang];
  const ocrConf = job.source.ocr_used ? job.quality.mean_confidence : null;
  return (
    <section aria-label={x.stages}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-ink">{x.stages}</h3>
        <span className={clsx("text-xs font-semibold rounded px-1.5 py-px border", job.status === "failed" ? "border-critical text-critical" : job.status === "running" ? "border-accent text-accent" : "border-rule text-muted")}>
          {x.jobStatus[job.status]}
        </span>
        {ocrConf !== null && (
          <span className="text-xs rounded px-1.5 py-px border border-medium text-medium tabular">{x.ocrChip(job.source.ocr_engine ?? "OCR", ocrConf)}</span>
        )}
      </div>
      <ol className="relative border-l border-rule ml-1.5 space-y-2.5">
        {job.stages.map((s) => {
          const start = s.started ? Date.parse(s.started) : null;
          const end = s.finished ? Date.parse(s.finished) : s.status === "running" ? now : null;
          const el = start !== null && end !== null ? Math.max(0, (end - start) / 1000) : null;
          return (
            <li key={s.key} className="pl-4 relative">
              <span aria-hidden className={clsx("absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full", DOT[s.status])} />
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-ink text-sm">{s.title[lang]}</span>
                <span className={clsx("text-xs", TXT[s.status])}>{x.stageStatus[s.status]}</span>
                {el !== null && <span className="text-xs text-muted tabular">{x.elapsed(el)}</span>}
                {s.summary && <span className="text-xs text-muted">· {s.summary[lang]}</span>}
              </div>
              {s.log.length > 0 && (
                <ul className="mt-0.5 space-y-0.5">
                  {s.log.slice(-6).map((l, i) => (
                    <li key={i} className="text-xs text-muted flex gap-2">
                      <span className="tabular shrink-0">{time(l.t)}</span>
                      <span>{l.text[lang]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
