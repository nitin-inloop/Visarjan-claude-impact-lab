"use client";

// /map page: full-width ghat map plus a side list. Clicking a ghat in the list flies the map to it.
import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { fetchRanking } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { Ranking } from "@/lib/types";
import { Card, CardTitle } from "../dash/ui";
import { LoadState } from "../LoadState";
import { GhatMap } from "./GhatMap";
import { MARK, keyReading, shortGhat } from "./mapStyle";

const NARROW = "(max-width: 640px)";
function subNarrow(cb: () => void) {
  const mq = window.matchMedia(NARROW);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function MapView({ initial }: { initial: Ranking | null }) {
  const { lang } = useLang();
  const hi = lang === "hi";
  const rk = useLive(fetchRanking, initial);
  const [focus, setFocus] = useState<string | null>(null);
  const narrow = useSyncExternalStore(subNarrow, () => window.matchMedia(NARROW).matches, () => false);
  if (!rk.data) return <LoadState error={rk.error} />;
  const ghats = [...rk.data.ghats].sort((a, b) => a.rank - b.rank);
  return (
    <div className="space-y-5 pb-10 pt-6">
      <header>
        <h1 className="text-[26px] font-bold leading-tight text-[#111113]">{hi ? "नक्शा" : "Map"}</h1>
        <p className="mt-1 text-sm text-[#6B6B75]">
          {hi
            ? `भोपाल के ${ghats.length} विसर्जन घाट, प्राथमिकता क्रम और स्थिति के साथ · जगहें अनुमानित हैं`
            : `${ghats.length} Bhopal immersion ghats with priority rank and status · places are approximate`}
        </p>
      </header>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_20rem]">
        <Card className="min-w-0">
          <GhatMap ghats={ghats} lang={lang} height={narrow ? 440 : 640} focus={focus} />
        </Card>
        <Card className="xl:max-h-[720px] xl:overflow-y-auto">
          <CardTitle>{hi ? "घाट" : "Ghats"}</CardTitle>
          <ul className="divide-y divide-[#F0F0F2]">
            {ghats.map((g) => {
              const m = MARK[g.tier];
              const k = keyReading(g, lang);
              const active = focus === g.slug;
              return (
                <li key={g.slug}>
                  <button
                    onClick={() => setFocus(g.slug)}
                    aria-pressed={active}
                    className={`flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left ${active ? "bg-[#F4F4F5]" : "hover:bg-[#F8F8F9]"}`}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold"
                      style={{ background: m.fill, color: m.text, border: m.dashed ? `1.5px dashed ${m.border}` : undefined }}
                    >
                      {g.rank}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#111113]">{shortGhat(g.name[lang])}</span>
                      <span className="block text-xs font-medium text-[#3A3A40]">{m.word[lang]}</span>
                      <span className="mt-0.5 block text-xs text-[#6B6B75]">
                        {k.line}
                        {k.source && <> · {k.source}</>}
                      </span>
                    </span>
                  </button>
                  <Link href={`/ghat/${g.slug}`} className="mb-2 ml-11 inline-block text-xs font-semibold text-[#111113] hover:underline">
                    {hi ? "विवरण →" : "Details →"}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
