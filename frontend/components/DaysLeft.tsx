"use client";

import { useLang } from "@/lib/lang";

export function daysUntilVisarjan(now = new Date()): number {
  const target = Date.UTC(2026, 9, 20);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}

export function DaysLeft() {
  const { lang, t } = useLang();
  const now = new Date();
  const date = now.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <p className="text-[0.95rem]" suppressHydrationWarning>
      <span suppressHydrationWarning>
        {t.today}: {date}
      </span>
      <br />
      <b suppressHydrationWarning>{t.daysLeft(daysUntilVisarjan(now))}</b>
    </p>
  );
}
