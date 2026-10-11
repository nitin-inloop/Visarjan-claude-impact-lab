"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtClock } from "@/lib/liveFormat";
import { useUi } from "./CommandCenter";
import { SevChip } from "./AlertFeed";

/** Newest open critical/high alert, with Ack and Speak. Critical uses an assertive live region. */
export function AlertBanner() {
  const { t, lang } = useLang();
  const { data, api } = useLiveStore();
  const { select, voiceApi } = useUi();
  const top = (data?.alerts ?? [])
    .filter((a) => a.state === "open" && (a.severity === "critical" || a.severity === "high"))
    .sort((a, b) => b.t_update - a.t_update || (b.severity === "critical" ? 1 : 0) - (a.severity === "critical" ? 1 : 0))[0];
  const critical = top?.severity === "critical";
  return (
    <div aria-live={critical ? "assertive" : "polite"} aria-atomic="true">
      {top && (
        <div
          key={top.id + top.severity}
          className={clsx(
            "cc-enter flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border px-3 py-2",
            critical ? "border-critical bg-[color-mix(in_srgb,var(--critical)_12%,var(--paper))]" : "border-high bg-high-bg",
          )}
        >
          <span className="text-xs font-semibold text-muted">{t.lv.newest}</span>
          <SevChip s={top.severity} />
          <span className="text-xs tabular text-muted">{fmtClock(top.t_update)}</span>
          <button type="button" className="text-left text-ink font-semibold hover:underline min-w-0 flex-1" onClick={() => select(top.ghat)}>
            {top.text[lang]}
          </button>
          <div className="flex gap-1.5">
            <button type="button" className="rounded border border-ink/40 px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent" onClick={() => api.ack(top.id).catch(() => undefined)}>
              {t.lv.ack}
            </button>
            <button type="button" className="rounded border border-ink/40 px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent" onClick={() => voiceApi.say(top.speak, critical)}>
              {t.lv.speak}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
