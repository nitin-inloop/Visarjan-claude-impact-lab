"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtClock, SEV_BAR, SEV_CHIP, SEV_ICON, SEV_ORDER, SEV_RANK } from "@/lib/liveFormat";
import type { Alert, Severity } from "@/lib/liveTypes";
import { useUi } from "./CommandCenter";

export function SevChip({ s }: { s: Severity }) {
  const { t } = useLang();
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded px-1.5 py-px text-xs font-bold whitespace-nowrap", SEV_CHIP[s])}>
      <span aria-hidden>{SEV_ICON[s]}</span>
      {t.lv.sev[s]}
    </span>
  );
}

export function AlertRow({ a, compact = false }: { a: Alert; compact?: boolean }) {
  const { t, lang } = useLang();
  const { api, data } = useLiveStore();
  const { select, voiceApi, selected } = useUi();
  const g = data?.ghats[a.ghat];
  return (
    <li
      className={clsx(
        "cc-enter border border-rule border-l-4 rounded bg-surface px-3 py-2",
        SEV_BAR[a.severity],
        selected === a.ghat && "ring-1 ring-accent",
        a.state === "acked" && "opacity-75",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <SevChip s={a.severity} />
        <span className="text-xs tabular text-muted">{fmtClock(a.t_update)}</span>
        {a.baseline && <span className="text-xs rounded border border-rule px-1 text-muted">{t.lv.baseline}</span>}
        {a.state === "acked" && <span className="text-xs text-muted">✓ {t.lv.acked}</span>}
        <button type="button" className="ml-auto text-sm font-semibold text-link hover:underline text-left" onClick={() => select(a.ghat)}>
          {g?.name[lang].split(" /")[0] ?? a.ghat}
        </button>
      </div>
      <p className={clsx("mt-1 text-ink", compact ? "text-sm" : "text-[0.95rem]")}>{a.text[lang]}</p>
      <div className="mt-1.5 flex gap-1.5">
        {a.state === "open" && (
          <button type="button" className="rounded border border-rule px-2 py-0.5 text-xs font-semibold text-ink hover:border-accent" onClick={() => api.ack(a.id).catch(() => undefined)}>
            {t.lv.ack}
          </button>
        )}
        <button type="button" className="rounded border border-rule px-2 py-0.5 text-xs font-semibold text-ink hover:border-accent" onClick={() => voiceApi.say(a.speak, a.severity === "critical")}>
          {t.lv.speak}
        </button>
      </div>
    </li>
  );
}

type Filter = "all" | Severity;

export function AlertFeed() {
  const { t } = useLang();
  const { data } = useLiveStore();
  const [filter, setFilter] = useState<Filter>("all");
  const alerts = [...(data?.alerts ?? [])]
    .filter((a) => a.state !== "resolved" && (filter === "all" || a.severity === filter))
    .sort((a, b) => Number(a.state === "acked") - Number(b.state === "acked") || SEV_RANK[b.severity] - SEV_RANK[a.severity] || b.t_update - a.t_update);
  return (
    <div className="rounded-md border border-rule bg-paper/60 h-full flex flex-col min-h-[18rem] max-h-[27rem]">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-rule">
        <h2 className="text-sm font-bold text-ink mr-auto">
          {t.lv.alerts} <span className="text-muted font-normal tabular">({t.lv.alertsN((data?.alerts ?? []).filter((a) => a.state === "open").length)})</span>
        </h2>
        <div role="group" aria-label={t.lv.alerts} className="inline-flex rounded border border-rule overflow-hidden">
          {(["all", ...SEV_ORDER] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={clsx("px-2 py-0.5 text-xs font-semibold", filter === f ? "bg-raised text-ink" : "text-muted hover:text-ink")}
            >
              {f === "all" ? t.lv.all : t.lv.sev[f]}
            </button>
          ))}
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto p-2 space-y-2" aria-live="polite" aria-relevant="additions" aria-label={t.lv.alerts}>
        {alerts.length === 0 && <li className="text-sm text-muted p-2">{t.lv.noAlerts}</li>}
        {alerts.map((a) => (
          <AlertRow key={a.id} a={a} compact />
        ))}
      </ul>
    </div>
  );
}
