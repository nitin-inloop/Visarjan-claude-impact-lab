"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AiAlerts } from "@/components/ai/AiAnalysis";
import { daysUntilVisarjan } from "@/components/DaysLeft";
import { UserDataBadge } from "@/components/UserDataBadge";
import { fetchRanking } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { WORDS, daysLeftText } from "@/lib/plain";
import type { Ranking } from "@/lib/types";
import { GhatCard } from "./GhatCard";
import { SimpleMap } from "./SimpleMap";

type Src = "live" | "static" | "snapshot";
const noop = () => () => undefined;

export function HomeView({ initial }: { initial: Ranking | null }) {
  const { lang } = useLang();
  const [ranking, setRanking] = useState<Ranking | null>(initial);
  const [src, setSrc] = useState<Src>("snapshot");
  const days = useSyncExternalStore(noop, () => daysUntilVisarjan(), () => null);
  useEffect(() => {
    let alive = true;
    fetchRanking()
      .then((r) => {
        if (!alive) return;
        setRanking(r.data);
        setSrc(r.source);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);
  const ghats = [...(ranking?.ghats ?? [])].sort((a, b) => a.rank - b.rank);
  const nTest = ghats.filter((g) => g.tier === "insufficient_data").length;
  const nDanger = ghats.filter((g) => g.tier === "high").length;

  return (
    <div className="pt-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
        {lang === "hi" ? "दुर्गा विसर्जन, 20 अक्टूबर 2026" : "Durga visarjan, 20 October 2026"}
      </h1>
      {days !== null && <p className="mt-1 text-2xl font-bold text-accent">{daysLeftText(days, lang)}</p>}

      <div className="mt-4">
        <AiAlerts lang={lang} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/intake"
          className="flex min-h-16 items-center justify-center gap-3 rounded-xl bg-accent px-5 py-4 text-xl font-bold text-white no-underline shadow hover:opacity-90"
        >
          <span aria-hidden className="text-2xl">⬆</span>
          {lang === "hi" ? "नई जांच रिपोर्ट डालें" : "Upload new test report"}
        </Link>
        <Link
          href="/brief"
          className="flex min-h-16 items-center justify-center gap-3 rounded-xl border-2 border-accent bg-paper px-5 py-4 text-xl font-bold text-accent no-underline hover:bg-surface"
        >
          <span aria-hidden className="text-2xl">📄</span>
          {lang === "hi" ? "ब्रीफ भेजें" : "Get brief to forward"}
        </Link>
      </div>

      <section aria-labelledby="list-h" className="mt-8">
        <h2 id="list-h" className="text-2xl font-bold">
          {lang === "hi" ? "पहले कहां काम करें" : "Where to work first"}
        </h2>
        {ghats.length > 0 && (
          <p className="mt-1 text-lg">
            {lang === "hi"
              ? `${ghats.length} घाट। ${nDanger} में खतरा। ${nTest} की इस साल जांच नहीं हुई।`
              : `${ghats.length} ghats. ${nDanger} in danger. ${nTest} not tested this year.`}
          </p>
        )}
        <UserDataBadge ranking={ranking} />
        {src === "static" && (
          <p className="mt-2 text-base text-muted" role="status">
            {lang === "hi" ? "सर्वर बंद है। सहेजी हुई सूची दिखा रहे हैं।" : "Server is off. Showing the saved list."}
          </p>
        )}
        {ghats.length === 0 ? (
          <p className="mt-4 text-lg">{lang === "hi" ? "सूची लोड हो रही है…" : "Loading the list…"}</p>
        ) : (
          <ol className="mt-4 space-y-4" aria-label={lang === "hi" ? "घाट, सबसे ज़रूरी पहले" : "Ghats, most urgent first"}>
            {ghats.map((g) => (
              <GhatCard key={g.slug} g={g} lang={lang} />
            ))}
          </ol>
        )}
      </section>

      <aside className="mt-8 rounded-xl border-2 border-rule bg-surface p-4 text-lg space-y-1">
        <p className="font-bold">{lang === "hi" ? "शब्दों का मतलब" : "What the words mean"}</p>
        <p>{WORDS.oxygen[lang]}</p>
        <p>{WORDS.bod[lang]}</p>
        <p>
          {lang === "hi"
            ? "“जांच नहीं हुई” का मतलब पानी साफ़ नहीं है। इसका मतलब है हमें पता नहीं।"
            : "“Not tested” does not mean clean. It means we do not know."}
        </p>
      </aside>

      {ghats.length > 0 && <SimpleMap ghats={ghats} lang={lang} />}
    </div>
  );
}
