"use client";

import { useLang } from "@/lib/lang";

export function LangToggle() {
  const { lang, t, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      className="rounded border border-ink px-3 py-1.5 text-[0.95rem] font-semibold hover:bg-surface"
      aria-label={t.langSwitch}
      title={t.langSwitch}
    >
      <span lang={lang === "en" ? "hi" : "en"}>{t.langName}</span>
    </button>
  );
}
