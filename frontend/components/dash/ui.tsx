// Shared dashboard primitives (monochrome, professional). Used by every dashboard page.
// Palette: page #F6F6F7 · card #FFFFFF · border #E6E6E9 · ink #111113 · muted #6B6B75 · bars #2B2B30/#8A8A93/#C9C9CF
// Status colours only for meaning: danger #DC2626 · watch #D97706 · ok #16A34A · not tested #6B6B75 (never green).

import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pad = /(^|\s)p-0(\s|$)/.test(className) ? "" : "p-5";
  return <section className={`rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] ${pad} ${className}`}>{children}</section>;
}

export function CardTitle({ children, info, right }: { children: ReactNode; info?: string; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">
        {children}
        {info && (
          <span title={info} className="grid h-4 w-4 place-items-center rounded-full border border-[var(--d-muted3)] text-[10px] text-[var(--d-muted)]">
            i
          </span>
        )}
      </h2>
      {right}
    </div>
  );
}

/** Tiny bar sparkline (values >= 0). */
export function MiniBars({ values, className = "" }: { values: number[]; className?: string }) {
  const max = Math.max(1, ...values);
  return (
    <svg viewBox={`0 0 ${values.length * 6} 40`} className={`h-10 w-16 shrink-0 ${className}`} aria-hidden>
      {values.map((v, i) => {
        const h = Math.max(2, (v / max) * 38);
        return <rect key={i} x={i * 6 + 1} y={40 - h} width={2.5} height={h} rx={1} fill="var(--d-bar-dark)" />;
      })}
    </svg>
  );
}

export function Kpi({ label, value, sub, tone = "neutral", bars }: {
  label: string; value: string; sub?: string; tone?: "up-bad" | "down-good" | "neutral"; bars?: number[];
}) {
  const color = tone === "up-bad" ? "text-[var(--d-danger)]" : tone === "down-good" ? "text-[var(--d-ok)]" : "text-[var(--d-muted)]";
  return (
    <Card className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">{label}</p>
        <p className="mt-2 text-[34px] font-bold leading-none tabular-nums text-[var(--d-ink)]">{value}</p>
        {sub && <p className={`mt-3 text-sm ${color}`}>{sub}</p>}
      </div>
      {bars && <MiniBars values={bars} />}
    </Card>
  );
}

export type PillTone = "danger" | "watch" | "ok" | "lower" | "missing" | "neutral";
const PILL: Record<PillTone, string> = {
  danger: "bg-[var(--d-danger-bg)] text-[var(--d-danger-ink)] border-[var(--d-danger-border)]",
  watch: "bg-[var(--d-watch-bg)] text-[var(--d-warn-ink)] border-[var(--d-watch-border)]",
  ok: "bg-[var(--d-ok-bg)] text-[var(--d-ok-ink)] border-[var(--d-ok-border)]",
  lower: "bg-[var(--d-slate-bg)] text-[var(--d-slate-ink)] border-[var(--d-slate-border)]",
  missing: "bg-[var(--d-card)] text-[var(--d-ink3)] border-dashed border-[var(--d-muted2)]",
  neutral: "bg-[var(--d-subtle2)] text-[var(--d-ink4)] border-[var(--d-border2)]",
};
export function Pill({ tone, children }: { tone: PillTone; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${PILL[tone]}`}>{children}</span>;
}
