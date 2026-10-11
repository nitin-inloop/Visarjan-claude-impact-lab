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
  critical: { icon: "⛔", word: { en: "Urgent", hi: "तुरंत" }, cls: "border-l-[var(--d-danger)]" },
  high: { icon: "▲", word: { en: "High", hi: "उच्च" }, cls: "border-l-[#EA580C]" },
  medium: { icon: "?", word: { en: "Test needed", hi: "जांच ज़रूरी" }, cls: "border-l-[#D97706]" },
  review: { icon: "✎", word: { en: "Check value", hi: "मान जांचें" }, cls: "border-l-[#0369A1]" },
  info: { icon: "ℹ", word: { en: "Note", hi: "सूचना" }, cls: "border-l-[var(--d-muted)]" },
};

function Badge({ meta, lang }: { meta: AiAnswer | AlertsPayload; lang: Lang }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[12px] font-medium " +
        (meta.ai_written ? "border-[var(--d-violet-border)] bg-[var(--d-violet-bg)] text-[var(--d-violet-ink)]" : "border-[var(--d-border)] bg-[var(--d-page)] text-[var(--d-ink3)]")
      }
    >
      <span aria-hidden>{meta.ai_written ? "✦" : "≡"}</span>
      <span title={aiBadge(meta, lang)}>{shortBadge(meta, lang)}</span>
    </span>
  );
}

const WHO: Record<string, string> = { cerebras: "Cerebras", claude: "Claude" };
function shortBadge(m: AiAnswer | AlertsPayload, lang: Lang): string {
  if (!m.ai_written) return lang === "hi" ? "मानक पाठ" : "Standard text";
  const secs = (m.latency_ms / 1000).toFixed(1);
  const chk = m.numbers_checked ? (lang === "hi" ? " · संख्याएं जांची गईं" : " · numbers checked") : "";
  return `${WHO[m.provider] ?? m.provider} · ${secs} ${lang === "hi" ? "से." : "s"}${chk}`;
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
  const who = data.ai_written ? WHO[data.provider] ?? "AI" : lang === "hi" ? "मानक" : "Standard";
  const title = lang === "hi" ? `${who} उत्तर: इस रिपोर्ट का सार` : `${who} answer: what this report means`;
  return (
    <section className="rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-5 text-[14px] leading-relaxed text-[var(--d-ink)]" lang={lang}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">{title}</h3>
        <Badge meta={data} lang={lang} />
      </div>
      <div className="mb-3">
        <ListenButton text={data.text[lang]} lang={lang} />
      </div>
      <ul className="space-y-2">
        {sentences(data.text[lang]).map((s, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-0.5 text-[10px] text-[var(--d-bar-mid)]">
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
    <li className={"rounded-xl border border-[var(--d-hover)] border-l-4 bg-[var(--d-card)] p-3 " + s.cls}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">
          <span aria-hidden>{s.icon}</span>
          {s.word[lang]}
        </span>
        <span className="text-[14px] font-semibold text-[var(--d-ink)]">{a.ghat.name[lang]}</span>
        <span className="ml-auto rounded-md bg-[var(--d-subtle2)] px-1.5 py-0.5 text-[12px] font-medium text-[var(--d-ink4)]">⏱ {a.deadline.text[lang]}</span>
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--d-ink2)]">{a.message[lang]}</p>
      <p className="mt-1 text-[13px] font-semibold text-[var(--d-ink)]">→ {a.action.text[lang]}</p>
      {page.trim() && <p className="mt-1 text-[12px] text-[var(--d-muted)]">{lang === "hi" ? "स्रोत: " : "Source: "}{page}</p>}
      <div className="mt-2">
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
    <section className="rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-5 text-[var(--d-ink)]" lang={lang}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">{title}</h3>
        <Badge meta={data} lang={lang} />
      </div>
      <div className="mb-3">
        <ListenButton label="all" size="sm" lang={lang} text={shown.slice(0, 5).map((a) => alertSpeech(a, lang))} />
      </div>
      <ul className="space-y-2.5">
        {shown.map((a) => (
          <AlertRow key={a.id} a={a} lang={lang} />
        ))}
      </ul>
      {data.alerts.length > 3 && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-3 w-full rounded-xl bg-[var(--d-page)] px-3 py-2 text-[13px] font-semibold text-[var(--d-ink)] hover:bg-[var(--d-hover)]"
        >
          {all
            ? lang === "hi" ? "कम दिखाएं" : "Show fewer"
            : lang === "hi" ? `सभी ${data.alerts.length} अलर्ट दिखाएं` : `Show all ${data.alerts.length} alerts`}
        </button>
      )}
    </section>
  );
}
