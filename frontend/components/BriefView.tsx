"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { fetchBrief } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { Brief, Lang } from "@/lib/types";
import { LoadState } from "./LoadState";

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
    { v: "en", label: t.english },
    { v: "hi", label: t.hindi },
    { v: "both", label: t.both },
  ];
  const btn = "rounded border border-ink px-3 py-1.5 font-semibold hover:bg-surface";

  return (
    <div className={clsx("pt-6", view === "both" && "xl:w-[min(1200px,94vw)] xl:relative xl:left-1/2 xl:-translate-x-1/2")}>
      <div className="no-print">
        <h1 className="text-[1.6rem] font-bold leading-tight">{t.briefTitle}</h1>
        <p className="text-muted">{t.briefNote}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div role="tablist" className="inline-flex border border-ink rounded overflow-hidden mr-2">
            {tabs.map((tb) => (
              <button
                key={tb.v}
                role="tab"
                aria-selected={view === tb.v}
                onClick={() => setChoice(tb.v)}
                className={clsx("px-3 py-1.5", view === tb.v ? "bg-ink text-paper font-semibold" : "hover:bg-surface")}
              >
                {tb.label}
              </button>
            ))}
          </div>
          <button type="button" className={btn} onClick={copy}>
            {copied ? `✓ ${t.copied}` : t.copy}
          </button>
          <button type="button" className={clsx(btn, "bg-accent text-paper border-accent hover:bg-accent hover:opacity-90")} onClick={() => window.print()}>
            {t.print}
          </button>
          <button type="button" className={btn} onClick={download}>
            {t.download}
          </button>
        </div>
      </div>
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
