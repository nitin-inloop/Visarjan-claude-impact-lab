"use client";

// AiAnalysis: plain-language answer for one intake job (what the report shows, what changed, what to do,
// where, by when, what is still missing), from POST /api/ai/jobs/{id}/analysis.
// AiAlerts: short alert list for the officer (what to do, where, by when), from GET /api/ai/alerts.
// Both render nothing when the API is unreachable. Scores and tiers never come from AI; the backend
// checks every AI number against the report and falls back to standard text.

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/types";
import { ListenButton } from "@/components/voice/ListenButton";
import { aiBadge, fetchAiAlerts, fetchJobAnalysis, type AiAlert, type AiAlerts as AlertsPayload, type AiAnswer, type AlertSeverity } from "@/lib/ai";

const SEV: Record<AlertSeverity, { icon: string; word: { en: string; hi: string }; cls: string }> = {
  critical: { icon: "⛔", word: { en: "Urgent", hi: "तुरंत" }, cls: "border-red-700 bg-red-50 text-red-900" },
  high: { icon: "▲", word: { en: "High", hi: "उच्च" }, cls: "border-orange-600 bg-orange-50 text-orange-900" },
  medium: { icon: "?", word: { en: "Test needed", hi: "जांच ज़रूरी" }, cls: "border-amber-600 border-dashed bg-amber-50 text-amber-900" },
  review: { icon: "✎", word: { en: "Check value", hi: "मान जांचें" }, cls: "border-sky-700 bg-sky-50 text-sky-900" },
  info: { icon: "ℹ", word: { en: "Note", hi: "सूचना" }, cls: "border-slate-500 bg-slate-50 text-slate-800" },
};

function Badge({ meta, lang }: { meta: AiAnswer | AlertsPayload; lang: Lang }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-base " +
        (meta.ai_written ? "border-violet-300 bg-violet-50 text-violet-900" : "border-slate-300 bg-white text-slate-700")
      }
    >
      <span aria-hidden>{meta.ai_written ? "✦" : "≡"}</span>
      {aiBadge(meta, lang)}
    </span>
  );
}

/** What the voice says for one alert: status word, ghat, message, action, deadline. */
function alertSpeech(a: AiAlert, lang: Lang): string {
  const end = (t: string) => (/[.!?।]$/.test(t.trim()) ? t.trim() : `${t.trim()}${lang === "hi" ? "।" : "."}`);
  return [SEV[a.severity].word[lang], a.ghat.name[lang], a.message[lang], a.action.text[lang], a.deadline.text[lang]]
    .filter((x) => x && x.trim())
    .map(end)
    .join(" ");
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?।])\s+/).filter((s) => s.trim().length > 0);
}

export function AiAnalysis({ jobId, lang }: { jobId: string; lang: Lang }) {
  const [data, setData] = useState<AiAnswer | null>(null);
  useEffect(() => {
    let live = true;
    fetchJobAnalysis(jobId).then((d) => {
      if (live) setData(d);
    });
    return () => {
      live = false;
    };
  }, [jobId]);
  if (!data || !data.text || data.job_id !== jobId) return null;
  const title = lang === "hi" ? "इस रिपोर्ट का सार" : "What this report means";
  return (
    <section className="rounded-xl border-2 border-slate-300 bg-white p-5 text-lg leading-relaxed text-slate-900" lang={lang}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <Badge meta={data} lang={lang} />
      </div>
      <div className="mb-3">
        <ListenButton text={data.text[lang]} lang={lang} />
      </div>
      <ul className="space-y-2">
        {sentences(data.text[lang]).map((s, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-1 text-slate-500">
              ●
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AlertRow({ a, lang }: { a: AiAlert; lang: Lang }) {
  const s = SEV[a.severity];
  const page = a.source.page
    ? lang === "hi"
      ? `${a.source.report ?? ""} पृष्ठ ${a.source.page}`
      : `${a.source.report ?? ""} page ${a.source.page}`
    : a.source.report ?? "";
  return (
    <li className={"rounded-lg border-l-8 border p-4 " + s.cls}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5 text-lg font-bold">
          <span aria-hidden>{s.icon}</span>
          {s.word[lang]}
        </span>
        <span className="text-lg font-semibold">{a.ghat.name[lang]}</span>
        <span className="ml-auto rounded bg-white/70 px-2 py-0.5 text-base font-semibold">⏱ {a.deadline.text[lang]}</span>
      </div>
      <p className="mt-2 text-lg">{a.message[lang]}</p>
      <p className="mt-1 text-lg font-semibold">→ {a.action.text[lang]}</p>
      {page.trim() && <p className="mt-1 text-base opacity-80">{lang === "hi" ? "स्रोत: " : "Source: "}{page}</p>}
      <div className="mt-3">
        <ListenButton text={alertSpeech(a, lang)} lang={lang} size="sm" />
      </div>
    </li>
  );
}

export function AiAlerts({ lang }: { lang: Lang }) {
  const [data, setData] = useState<AlertsPayload | null>(null);
  const [all, setAll] = useState(false);
  useEffect(() => {
    let live = true;
    fetchAiAlerts(lang).then((d) => {
      if (live) setData(d);
    });
    return () => {
      live = false;
    };
  }, [lang]);
  if (!data || !Array.isArray(data.alerts) || data.alerts.length === 0) return null;
  const shown = all ? data.alerts : data.alerts.slice(0, 3);
  const title = lang === "hi" ? "अलर्ट: क्या करें, कहां, कब तक" : "Alerts: what to do, where, by when";
  return (
    <section className="rounded-xl border-2 border-slate-300 bg-white p-5 text-slate-900" lang={lang}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <Badge meta={data} lang={lang} />
      </div>
      <div className="mb-3">
        <ListenButton label="all" size="lg" lang={lang} text={shown.slice(0, 5).map((a) => alertSpeech(a, lang))} />
      </div>
      <ul className="space-y-3">
        {shown.map((a) => (
          <AlertRow key={a.id} a={a} lang={lang} />
        ))}
      </ul>
      {data.alerts.length > 5 && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-3 rounded-lg border-2 border-slate-400 px-4 py-2 text-lg font-semibold hover:bg-slate-50"
        >
          {all
            ? lang === "hi" ? "कम दिखाएं" : "Show fewer"
            : lang === "hi" ? `सभी ${data.alerts.length} अलर्ट दिखाएं` : `Show all ${data.alerts.length} alerts`}
        </button>
      )}
    </section>
  );
}
