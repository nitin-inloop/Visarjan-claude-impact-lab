"use client";

import Link from "next/link";
import { PdfLink } from "@/components/PdfLink";
import { ListenButton } from "@/components/voice/ListenButton";
import { ACTION, STATUS, plainReason } from "@/lib/plain";
import type { GhatRank, Lang } from "@/lib/types";

export function StatusPill({ tier, lang, big = false }: { tier: GhatRank["tier"]; lang: Lang; big?: boolean }) {
  const s = STATUS[tier];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 font-bold ${big ? "px-4 py-1.5 text-xl" : "px-3 py-1 text-lg"}`}
      style={{ color: s.fg, background: s.bg, borderColor: s.bd, borderStyle: tier === "insufficient_data" ? "dashed" : "solid" }}
    >
      <span aria-hidden>{s.icon}</span>
      {s.word[lang]}
    </span>
  );
}

export function GhatCard({ g, lang }: { g: GhatRank; lang: Lang }) {
  const s = STATUS[g.tier];
  // Cite the reading that set the tier (same rule as the brief): oxygen or BOD if the tier rule names it.
  const rule = g.tier_rule?.en ?? "";
  const want = rule.includes("oxygen") ? "Dissolved oxygen" : rule.includes("BOD") ? "BOD" : null;
  const r =
    (want && g.reasons.find((x) => x.kind === "breach" && x.parameter === want)) ||
    g.reasons.find((x) => x.kind === "breach") ||
    g.reasons[0];
  const pr = r ? plainReason(r, lang) : null;
  const gap = g.tier === "insufficient_data";
  const end = lang === "hi" ? "।" : ".";
  const act = g.actions[0] ? ACTION[g.actions[0].code]?.word[lang] ?? g.actions[0].text[lang] : "";
  const speech = [g.name[lang], s.word[lang], s.hint[lang], pr?.main, act && (lang === "hi" ? `क्या करें: ${act}` : `What to do: ${act}`)]
    .filter(Boolean)
    .map((x) => `${x}${end}`)
    .join(" ");
  return (
    <li className="rounded-xl border-2 bg-paper p-4 sm:p-5" style={{ borderColor: s.bd, borderLeftWidth: 10 }}>
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 grid place-items-center w-12 h-12 rounded-full text-2xl font-extrabold text-white"
          style={{ background: s.solid }}
          aria-label={lang === "hi" ? `क्रम ${g.rank}` : `Rank ${g.rank}`}
        >
          {g.rank}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-bold leading-snug">
            <Link href={`/ghat/${g.slug}`} className="text-ink no-underline hover:underline">
              {g.name[lang]}
            </Link>
          </h3>
          <p className="text-muted text-base">{g.water_body_name?.[lang] ?? g.water_body}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StatusPill tier={g.tier} lang={lang} />
            <ListenButton text={speech} lang={lang} size="sm" />
          </div>
        </div>
      </div>

      {gap && <p className="mt-3 text-lg font-semibold" style={{ color: s.fg }}>{s.hint[lang]}</p>}
      {pr && (
        <p className="mt-3 text-xl leading-relaxed">
          <span className="font-semibold">{pr.main}</span>
          <span className="text-muted"> · {gap ? (lang === "hi" ? "पिछली जांच" : "last test") + " " : ""}{pr.when}</span>
          {r && (
            <span className="block text-base mt-1">
              <span className="text-muted">{lang === "hi" ? "सबूत: " : "Proof: "}</span>
              <PdfLink source={r.source} />
            </span>
          )}
        </p>
      )}

      {g.actions.length > 0 && (
        <>
          <p className="mt-3 text-base font-semibold text-muted">{lang === "hi" ? "क्या करें:" : "What to do:"}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {g.actions.map((a) => (
              <li key={a.code} className="inline-flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 text-lg">
                <span aria-hidden>{ACTION[a.code]?.icon ?? "•"}</span>
                {ACTION[a.code]?.word[lang] ?? a.text[lang]}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link
        href={`/ghat/${g.slug}`}
        className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-accent px-4 text-lg font-bold text-accent no-underline hover:bg-surface"
      >
        {lang === "hi" ? "पूरी जानकारी देखें" : "See all numbers"} <span aria-hidden>→</span>
      </Link>
    </li>
  );
}
