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
    <div lang={lang} className="memo rounded-2xl border border-[#E6E6E9] bg-white px-5 py-6 sm:px-8 sm:py-8">
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
  const big = "min-h-11 inline-flex items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-semibold no-underline";

  return (
    <div className={clsx("mx-auto", view === "both" ? "max-w-[1300px]" : "max-w-4xl")}>
      <div className="no-print">
        <h1 className="text-[26px] font-bold tracking-tight text-[#111113]">{lang === "hi" ? "ब्रीफ भेजें" : "Brief to forward"}</h1>
        <p className="mt-1 text-[14px] text-[#6B6B75]">
          {lang === "hi"
            ? "यह एक पेज का नोट है। कॉपी करें, WhatsApp पर भेजें या प्रिंट करें।"
            : "This is a one-page note. Copy it, send it on WhatsApp, or print it."}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button type="button" className={clsx(big, "border border-[#E6E6E9] bg-white text-[#111113] hover:bg-[#F6F6F7]")} onClick={copy}>
            <span aria-hidden>{copied ? "✅" : "📋"}</span>
            {copied ? (lang === "hi" ? "कॉपी हो गया" : "Copied") : lang === "hi" ? "कॉपी करें" : "Copy"}
          </button>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={clsx(big, "bg-[#1f7a3d] text-white hover:opacity-90")}>
            <span aria-hidden>💬</span>
            {lang === "hi" ? "WhatsApp पर भेजें" : "Share on WhatsApp"}
          </a>
          <button type="button" className={clsx(big, "bg-[#111113] text-white hover:bg-[#2B2B30]")} onClick={() => window.print()}>
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
                  "min-h-10 px-3 text-[14px] border border-[#E6E6E9] first:rounded-l-xl last:rounded-r-xl",
                  view === tb.v ? "bg-[#111113] text-white font-semibold" : "bg-white hover:bg-[#F6F6F7]",
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
        <section lang={shortLang} className="mt-5 rounded-2xl border border-[#E6E6E9] bg-white p-5" aria-label={lang === "hi" ? "छोटा सार" : "Short summary"}>
          <p className="text-base font-semibold text-muted">
            {lang === "hi" ? "छोटा सार (WhatsApp पर यही जाएगा)" : "Short summary (this is what WhatsApp sends)"}
          </p>
          <div className="mt-3">
            <ListenButton text={short} lang={shortLang} size="lg" />
          </div>
          <p className="mt-2 whitespace-pre-line text-[16px] leading-relaxed">{short}</p>
        </section>
      )}
      {short && <h2 className="no-print mt-6 text-[13px] font-semibold uppercase tracking-wide text-[#3A3A40]">{lang === "hi" ? "पूरा ब्रीफ" : "Full brief"}</h2>}
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
