"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { fetchBrief } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { Brief, Lang } from "@/lib/types";
import { LoadState } from "./LoadState";
import { ListenButton } from "./voice/ListenButton";

type View = Lang | "both";

function Memo({ md, lang }: { md: string; lang: Lang }) {
  return (
    <div lang={lang} className="memo border border-rule rounded-md bg-paper px-5 py-6 sm:px-8 sm:py-8 shadow-[0_1px_0_var(--rule)]">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}

export function BriefView({ initial }: { initial: Brief | null }) {
  const { lang, t } = useLang();
  const { data, error } = useLive(fetchBrief, initial);
  const [choice, setChoice] = useState<View | null>(null);
  const [copied, setCopied] = useState(false);
  const view: View = choice ?? lang;
  if (!data) return <LoadState error={error} />;

  const langs: Lang[] = view === "both" ? ["en", "hi"] : [view];
  const plain = langs.map((l) => data.plain[l]).join("\n\n");
  const md = langs.map((l) => data.markdown[l]).join("\n\n---\n\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: user can select text */
    }
  };
  const download = () => {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ghatwatch-brief-durga-2026-${view}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const tabs: { v: View; label: string }[] = [
    { v: "hi", label: "हिंदी" },
    { v: "en", label: "English" },
    { v: "both", label: lang === "hi" ? "दोनों" : "Both" },
  ];
  // WhatsApp share: wa.me takes the text in the URL; keep it under ~3500 chars so phones open it.
  // Short summary for WhatsApp (falls back to the full text, trimmed, for older payloads).
  const shortLang: Lang = view === "both" ? lang : view;
  const short = data.short?.[shortLang] ?? null;
  const waText = short ?? (plain.length > 3500 ? `${plain.slice(0, 3400)}\n…` : plain);
  const wa = `https://wa.me/?text=${encodeURIComponent(waText)}`;
  const big = "min-h-14 inline-flex items-center justify-center gap-2 rounded-xl px-5 text-xl font-bold no-underline";

  return (
    <div className={clsx("pt-6", view === "both" && "xl:w-[min(1200px,94vw)] xl:relative xl:left-1/2 xl:-translate-x-1/2")}>
      <div className="no-print">
        <h1 className="text-3xl font-extrabold leading-tight">{lang === "hi" ? "ब्रीफ भेजें" : "Brief to forward"}</h1>
        <p className="mt-1 text-lg">
          {lang === "hi"
            ? "यह एक पेज का नोट है। कॉपी करें, WhatsApp पर भेजें या प्रिंट करें।"
            : "This is a one-page note. Copy it, send it on WhatsApp, or print it."}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button type="button" className={clsx(big, "border-2 border-accent bg-paper text-accent hover:bg-surface")} onClick={copy}>
            <span aria-hidden>{copied ? "✅" : "📋"}</span>
            {copied ? (lang === "hi" ? "कॉपी हो गया" : "Copied") : lang === "hi" ? "कॉपी करें" : "Copy"}
          </button>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={clsx(big, "bg-[#1f7a3d] text-white hover:opacity-90")}>
            <span aria-hidden>💬</span>
            {lang === "hi" ? "WhatsApp पर भेजें" : "Share on WhatsApp"}
          </a>
          <button type="button" className={clsx(big, "bg-accent text-white hover:opacity-90")} onClick={() => window.print()}>
            <span aria-hidden>🖨</span>
            {lang === "hi" ? "प्रिंट करें" : "Print"}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-lg">{lang === "hi" ? "ब्रीफ की भाषा:" : "Brief language:"}</span>
          <div role="group" className="inline-flex">
            {tabs.map((tb) => (
              <button
                key={tb.v}
                type="button"
                aria-pressed={view === tb.v}
                onClick={() => setChoice(tb.v)}
                className={clsx(
                  "min-h-12 px-4 text-lg border-2 border-ink first:rounded-l-lg last:rounded-r-lg",
                  view === tb.v ? "bg-ink text-paper font-bold" : "bg-paper hover:bg-surface",
                )}
              >
                {tb.label}
              </button>
            ))}
          </div>
          <button type="button" className="text-base text-muted underline underline-offset-2 min-h-12" onClick={download}>
            {t.download}
          </button>
        </div>
      </div>
      {short && (
        <section lang={shortLang} className="mt-5 rounded-xl border-2 border-accent bg-paper p-4 sm:p-5" aria-label={lang === "hi" ? "छोटा सार" : "Short summary"}>
          <p className="text-base font-semibold text-muted">
            {lang === "hi" ? "छोटा सार (WhatsApp पर यही जाएगा)" : "Short summary (this is what WhatsApp sends)"}
          </p>
          <div className="mt-3">
            <ListenButton text={short} lang={shortLang} size="lg" />
          </div>
          <p className="mt-2 whitespace-pre-line text-xl leading-relaxed">{short}</p>
        </section>
      )}
      {short && <h2 className="no-print mt-6 text-2xl font-bold">{lang === "hi" ? "पूरा ब्रीफ" : "Full brief"}</h2>}
      <div className={clsx("mt-5 grid gap-5", view === "both" && "xl:grid-cols-2")}>
        {langs.map((l, i) => (
          <div key={l} className={i > 0 ? "print-break" : undefined}>
            <Memo md={data.markdown[l]} lang={l} />
          </div>
        ))}
      </div>
    </div>
  );
}
