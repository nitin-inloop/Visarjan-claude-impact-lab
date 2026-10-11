"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtClock, SEV_CHIP, SEV_ICON, SEV_ORDER } from "@/lib/liveFormat";
import type { Scenario } from "@/lib/liveTypes";
import type { AnnounceLevel } from "@/lib/voice";
import { useUi } from "./CommandCenter";
import { CommandBox } from "./CommandBox";

const SPEEDS = [1, 60, 180, 600];

export const btn = "rounded border border-rule bg-surface px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent focus-visible:border-accent disabled:opacity-50";

export function SimBadge({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <span className={clsx("inline-block rounded-sm border border-medium px-1.5 py-px text-[0.65rem] font-bold tracking-[0.08em] text-medium whitespace-nowrap", className)} title={t.lv.simNote}>
      {t.lv.simulated}
    </span>
  );
}

function ConnPill() {
  const { t } = useLang();
  const { mode } = useLiveStore();
  const dot = mode === "ws" || mode === "poll" ? "bg-low" : mode === "mock" ? "bg-medium" : mode === "offline" ? "bg-critical" : "bg-nodata";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap"
      title={t.lv.connHint[mode]}
      role="status"
    >
      <span aria-hidden className={clsx("inline-block size-2 rounded-full", dot)} />
      {t.lv.conn[mode]}
    </span>
  );
}

function AlertCounts() {
  const { t } = useLang();
  const { data } = useLiveStore();
  const open = (data?.alerts ?? []).filter((a) => a.state !== "resolved");
  return (
    <div className="flex items-center gap-1" aria-label={t.lv.alerts}>
      {SEV_ORDER.map((s) => {
        const n = open.filter((a) => a.severity === s).length;
        return (
          <span key={s} className={clsx("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold tabular", n ? SEV_CHIP[s] : "border border-rule text-muted")} title={t.lv.sev[s]}>
            <span aria-hidden>{SEV_ICON[s]}</span>
            <span className="sr-only">{t.lv.sev[s]}</span>
            {n}
          </span>
        );
      })}
    </div>
  );
}

function SimControls() {
  const { t, lang } = useLang();
  const { data, api } = useLiveStore();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  useEffect(() => {
    let alive = true;
    api
      .scenarios()
      .then((s) => alive && setScenarios(s))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [api]);
  const running = data?.running ?? false;
  const ctl = (action: "start" | "pause" | "reset" | "speed" | "scenario", value?: number | string) => {
    api.control({ action, value }).catch(() => undefined);
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button type="button" className={clsx(btn, "min-w-[4.5rem]")} onClick={() => ctl(running ? "pause" : "start")} aria-pressed={running} disabled={!data}>
        <span aria-hidden className="mr-1">{running ? "❚❚" : "▶︎"}</span>
        {running ? t.lv.pause : t.lv.play}
      </button>
      <div role="group" aria-label={t.lv.speed} className="inline-flex rounded border border-rule overflow-hidden">
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => ctl("speed", s)}
            aria-pressed={data?.speed === s}
            disabled={!data}
            className={clsx("px-2 py-1 text-sm tabular font-semibold", data?.speed === s ? "bg-accent text-paper" : "bg-surface text-muted hover:text-ink")}
          >
            {s}×
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor="cc-scenario">
        {t.lv.scenario}
      </label>
      <select
        id="cc-scenario"
        className="rounded border border-rule bg-surface px-2 py-1 text-sm text-ink max-w-[13rem]"
        value={data?.scenario.name ?? ""}
        onChange={(e) => ctl("scenario", e.target.value)}
        disabled={!data}
        title={t.lv.scenario}
      >
        {!scenarios.some((s) => s.name === data?.scenario.name) && data && <option value={data.scenario.name}>{data.scenario.label[lang]}</option>}
        {scenarios.map((s) => (
          <option key={s.name} value={s.name}>
            {s.label[lang]}
          </option>
        ))}
      </select>
      <button type="button" className={btn} onClick={() => ctl("reset")} disabled={!data}>
        {t.lv.reset}
      </button>
    </div>
  );
}

function VoiceControls() {
  const { t } = useLang();
  const { voice, voiceApi } = useUi();
  if (!voice.supported) return <span className="text-xs text-muted">{t.lv.noSpeech}</span>;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {!voice.enabled ? (
        <button type="button" className={clsx(btn, "border-accent text-accent")} onClick={voiceApi.enable}>
          {t.lv.voiceEnable}
        </button>
      ) : (
        <button type="button" className={btn} onClick={() => voiceApi.setMuted(!voice.muted)} aria-pressed={voice.muted}>
          {voice.muted ? t.lv.unmute : t.lv.mute}
        </button>
      )}
      {voice.speaking && (
        <button type="button" className={btn} onClick={voiceApi.stop}>
          {t.lv.stopSpeak}
        </button>
      )}
      <label className="text-xs text-muted flex items-center gap-1">
        {t.lv.announce}
        <select className="rounded border border-rule bg-surface px-1.5 py-1 text-sm text-ink" value={voice.level} onChange={(e) => voiceApi.setLevel(e.target.value as AnnounceLevel)}>
          {(["all", "high", "critical", "off"] as const).map((l) => (
            <option key={l} value={l}>
              {t.lv.level[l]}
            </option>
          ))}
        </select>
      </label>
      <span className="text-xs text-muted max-w-[16rem] truncate" title={voice.voiceName ?? t.lv.noVoice}>
        {voice.hindiMissing ? <span className="text-medium">{t.lv.hindiMissing}</span> : null}
        {voice.hindiMissing ? " · " : ""}
        {voice.voiceName ?? (voice.enabled ? t.lv.noVoice : "")}
      </span>
    </div>
  );
}

function LangButton() {
  const { lang, t, setLang } = useLang();
  return (
    <button type="button" onClick={() => setLang(lang === "en" ? "hi" : "en")} className={btn} aria-label={t.langSwitch} title={t.langSwitch}>
      <span lang={lang === "en" ? "hi" : "en"}>{t.langName}</span>
    </button>
  );
}

export function TopBar() {
  const { t } = useLang();
  const { data } = useLiveStore();
  return (
    <header className="no-print sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 py-2 flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="mr-auto min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold leading-tight text-ink">{t.lv.title}</h1>
            <SimBadge />
          </div>
          <p className="text-xs text-muted leading-tight">{t.lv.sub}</p>
        </div>
        <div className="text-right" aria-live="off">
          <div className="text-[2rem] leading-none font-semibold tabular text-ink" aria-label={t.lv.simClock}>
            {data ? fmtClock(data.t) : "--:--"}
          </div>
          <div className="text-[0.65rem] text-muted">{t.lv.simClock}</div>
        </div>
        <SimControls />
        <div className="flex items-center gap-2">
          <ConnPill />
          <AlertCounts />
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 pb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <CommandBox />
        <VoiceControls />
        <div className="ml-auto flex items-center gap-2">
          <Link href="/brief" className="text-sm text-link">
            {t.openBrief}
          </Link>
          <LangButton />
        </div>
      </div>
    </header>
  );
}
