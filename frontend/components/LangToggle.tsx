"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";

/** Big two-button language switch. The choice is remembered (localStorage, lib/lang.tsx). */
export function LangToggle() {
  const { lang, setLang } = useLang();
  const btn = (l: "en" | "hi", label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      lang={l}
      className={clsx(
        "min-h-12 min-w-[5.5rem] px-4 text-lg font-bold border-2 border-ink first:rounded-l-lg last:rounded-r-lg",
        lang === l ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-surface",
      )}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Language / भाषा" className="inline-flex no-print">
      {btn("hi", "हिंदी")}
      {btn("en", "English")}
    </div>
  );
}
