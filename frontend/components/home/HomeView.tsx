"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AiAlerts } from "@/components/ai/AiAnalysis";
import { daysUntilVisarjan } from "@/components/DaysLeft";
import { Card, CardTitle, Kpi, Pill, type PillTone } from "@/components/dash/ui";
import { GhatMap } from "@/components/map/GhatMap";
import { PdfLink } from "@/components/PdfLink";
import { UserDataBadge } from "@/components/UserDataBadge";
import { ListenButton } from "@/components/voice/ListenButton";
import { fetchGhat, fetchRanking } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { tierReason } from "@/lib/plain";
import type { GhatDetail, GhatRank, Lang, Ranking, Reason, Tier } from "@/lib/types";

type Src = "live" | "static" | "snapshot";
type Param = "DO" | "BOD" | "pH";
const noop = () => () => undefined;
const SERIES_KEY: Record<Param, string> = { DO: "Dissolved oxygen", BOD: "BOD", pH: "pH" };
const PHASES = ["pre", "during", "after"] as const;
const POINTS = [2023, 2024, 2025].flatMap((y) => (["Ganesh", "Durga"] as const).flatMap((f) => PHASES.map((p) => `${f} ${y} ${p}`)));

function breaches(param: Param, v: number) {
  if (param === "DO") return v < 5;
  if (param === "BOD") return v > 3;
  return v < 6.5 || v > 8.5;
}

const TONE: Record<Tier, PillTone> = { high: "danger", medium: "watch", low: "lower", insufficient_data: "missing" };
const TIER_WORD: Record<Tier, { en: string; hi: string }> = {
  high: { en: "Danger", hi: "खतरा" },
  medium: { en: "Watch", hi: "निगरानी" },
  low: { en: "Lower", hi: "कम" },
  insufficient_data: { en: "Not tested", hi: "जांच नहीं हुई" },
};

const ACTION_WORD: Record<string, { en: string; hi: string }> = {
  aerate: { en: "Aerate", hi: "हवा मशीन" },
  clean: { en: "Clean", hi: "सफ़ाई" },
  test_first: { en: "Test first", hi: "पहले जांच" },
  sample_metals: { en: "Metals test", hi: "धातु जांच" },
  lake_ban: { en: "Lake ban", hi: "झील प्रतिबंध" },
};

function keyReason(g: GhatRank): Reason | undefined {
  return tierReason(g) ?? undefined;
}
function shortParam(p: string) {
  return p === "Dissolved oxygen" ? "DO" : p;
}
function readingText(r: Reason | undefined, lang: Lang) {
  if (!r) return "—";
  if (r.value === null) return lang === "hi" ? `${shortParam(r.parameter)}: जांच नहीं हुई` : `${shortParam(r.parameter)}: not tested`;
  return `${shortParam(r.parameter)} ${r.value} · ${lang === "hi" ? "चाहिए" : "need"} ${r.limit}`;
}
function lastTest(r: Reason | undefined) {
  return r ? `${r.festival} ${r.year}${r.phase ? ` · ${r.phase}` : ""}` : "—";
}

function exportCsv(ghats: GhatRank[]) {
  const esc = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
  const rows = [["rank", "ghat", "status", "key reading", "limit", "source page"]];
  for (const g of ghats) {
    const r = keyReason(g);
    rows.push([
      String(g.rank),
      g.name.en,
      TIER_WORD[g.tier].en,
      r ? (r.value === null ? `${r.parameter}: not tested` : `${r.parameter} ${r.value} ${r.unit}`) : "",
      r?.limit ?? "",
      r?.source.pdf && r.source.page ? `${r.source.report ?? r.source.pdf} p.${r.source.page} (/pdf/${r.source.pdf}.pdf#page=${r.source.page})` : "not tested",
    ]);
  }
  const blob = new Blob([rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ghat-priority-durga-2026.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

type Counts = { label: string; breach: number; ok: number; missing: number };

function BreachChart({ details, param, lang }: { details: GhatDetail[]; param: Param; lang: Lang }) {
  const n = 7;
  const data: Counts[] = POINTS.map((label) => {
    let breach = 0;
    let ok = 0;
    for (const d of details) {
      const pt = d.series?.[SERIES_KEY[param]]?.find((s) => s.label === label);
      if (pt && typeof pt.value === "number") {
        if (breaches(param, pt.value)) breach++;
        else ok++;
      }
    }
    return { label, breach, ok, missing: Math.max(0, n - breach - ok) };
  });
  const W = 760, H = 330, L = 28, B = 46, T = 8;
  const cw = (W - L) / data.length;
  const y = (v: number) => ((H - B - T) * v) / n;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={lang === "hi" ? "हर त्योहार चरण में सीमा उल्लंघन" : "Limit breaches at each festival phase"}>
      <defs>
        <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="var(--d-track)" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--d-bar-light)" strokeWidth="2" />
        </pattern>
      </defs>
      {[0, 2, 4, 6, 7].map((v) => (
        <g key={v}>
          <line x1={L} x2={W} y1={H - B - y(v)} y2={H - B - y(v)} stroke="var(--d-hover)" />
          <text x={L - 8} y={H - B - y(v) + 4} textAnchor="end" fontSize="11" fill="var(--d-bar-mid)">{v}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = L + i * cw + cw * 0.22;
        const w = cw * 0.56;
        let base = H - B;
        const segs = [
          { v: d.breach, fill: "var(--d-bar-dark)", name: lang === "hi" ? "उल्लंघन" : "breach" },
          { v: d.ok, fill: "var(--d-bar-mid)", name: lang === "hi" ? "सीमा में" : "within limit" },
          { v: d.missing, fill: "url(#hatch)", name: lang === "hi" ? "जांच नहीं" : "not tested" },
        ];
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${d.breach} breach · ${d.ok} within limit · ${d.missing} not tested`}</title>
            {segs.map((s, j) => {
              if (s.v === 0) return null;
              const h = y(s.v);
              base -= h;
              return <rect key={j} x={x} y={base} width={w} height={Math.max(0, h - 1)} rx={2} fill={s.fill} />;
            })}
            <text x={x + w / 2} y={H - B + 14} textAnchor="middle" fontSize="10" fill="var(--d-bar-mid)">
              {(lang === "hi" ? { pre: "पहले", during: "दौरान", after: "बाद" } : { pre: "pre", during: "dur", after: "aft" })[d.label.split(" ")[2] as "pre" | "during" | "after"]}
            </text>
            {i % 3 === 0 && (
              <text x={L + (i + 1.5) * cw} y={H - B + 32} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--d-ink2)">
                {`${d.label.split(" ")[0] === "Ganesh" ? (lang === "hi" ? "गणेश" : "Ganesh") : lang === "hi" ? "दुर्गा" : "Durga"} ${d.label.split(" ")[1]}`}
              </text>
            )}
            {i % 3 === 0 && i > 0 && <line x1={L + i * cw} x2={L + i * cw} y1={T} y2={H - B + 36} stroke="var(--d-hover)" />}
          </g>
        );
      })}
    </svg>
  );
}

function Legend({ lang }: { lang: Lang }) {
  const items = [
    { c: "bg-[var(--d-bar-dark)]", t: lang === "hi" ? "उल्लंघन" : "Breach" },
    { c: "bg-[var(--d-bar-mid)]", t: lang === "hi" ? "सीमा में" : "Within limit" },
    { c: "border border-dashed border-[var(--d-muted2)] bg-[var(--d-track)]", t: lang === "hi" ? "जांच नहीं हुई" : "Not tested" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[var(--d-ink2)]">
      {items.map((i) => (
        <span key={i.t} className="inline-flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${i.c}`} />
          {i.t}
        </span>
      ))}
    </div>
  );
}

export function HomeView({ initial }: { initial: Ranking | null }) {
  const { lang } = useLang();
  const [ranking, setRanking] = useState<Ranking | null>(initial);
  const [src, setSrc] = useState<Src>("snapshot");
  const [details, setDetails] = useState<GhatDetail[]>([]);
  const [param, setParam] = useState<Param>("DO");
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
  const ghats = useMemo(() => [...(ranking?.ghats ?? [])].sort((a, b) => a.rank - b.rank), [ranking]);
  const slugKey = ghats.map((g) => g.slug).join(",");
  useEffect(() => {
    if (!slugKey) return;
    let alive = true;
    Promise.all(slugKey.split(",").map((s) => fetchGhat(s).then((r) => r.data).catch(() => null))).then((ds) => {
      if (alive) setDetails(ds.filter((d): d is GhatDetail => d !== null));
    });
    return () => {
      alive = false;
    };
  }, [slugKey]);

  const s = ranking?.summary;
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
  const needAction = ghats.filter((g) => g.tier === "high" || g.tier === "insufficient_data").length;
  const yearBars = (param: Param) =>
    [2023, 2024, 2025].flatMap((yr) =>
      (["Ganesh", "Durga"] as const).map((f) =>
        details.reduce((acc, d) => {
          const pts = (d.series?.[SERIES_KEY[param]] ?? []).filter((p) => p.label.startsWith(`${f} ${yr}`));
          return acc + pts.filter((p) => typeof p.value === "number" && breaches(param, p.value)).length;
        }, 0),
      ),
    );
  const hi = lang === "hi";

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-[var(--d-ink)]">{hi ? "दुर्गा विसर्जन की तैयारी" : "Durga Visarjan readiness"}</h1>
          <p className="mt-1 text-[14px] text-[var(--d-muted)]">
            {hi ? "स्वागत है, अधिकारी · डेटा: MPPCB रिपोर्ट 2023–2025" : "Welcome back, Officer · data: MPPCB reports 2023–2025"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[14px] font-medium text-[var(--d-ink)]" suppressHydrationWarning>
            {hi ? "20 अक्टूबर 2026" : "20 Oct 2026"}
            {days !== null && ` · ${days} ${hi ? "दिन बाकी" : "days left"}`}
          </span>
          <button
            type="button"
            onClick={() => exportCsv(ghats)}
            disabled={!ghats.length}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[14px] font-medium text-[var(--d-ink)] hover:bg-[var(--d-page)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4 19h16" /></svg>
            {hi ? "CSV निर्यात" : "Export CSV"}
          </button>
          <Link href="/brief" className="inline-flex items-center gap-2 rounded-xl bg-[var(--d-ink)] px-3 py-2 text-[14px] font-medium text-[var(--d-on-inv)] no-underline hover:bg-[var(--d-bar-dark)]">
            {hi ? "ब्रीफ डाउनलोड करें" : "Download brief"}
          </Link>
        </div>
      </div>

      {src === "static" && (
        <p className="text-[13px] text-[var(--d-muted)]" role="status">{hi ? "सर्वर बंद है। सहेजी हुई सूची दिखा रहे हैं।" : "Server is off. Showing the saved list."}</p>
      )}
      <UserDataBadge ranking={ranking} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label={hi ? "DO सीमा से कम" : "DO below limit"}
          value={s ? `${s.do_below_5}/${s.do_readings}` : "—"}
          sub={s ? `↓ ${pct(s.do_below_5, s.do_readings)}% ${hi ? "जांचें < 5" : "of tests < 5"}` : undefined}
          tone="up-bad"
          bars={details.length ? yearBars("DO") : undefined}
        />
        <Kpi
          label={hi ? "BOD सीमा से ऊपर" : "BOD above limit"}
          value={s ? `${s.bod_above_3}/${s.bod_readings}` : "—"}
          sub={s ? `↑ ${pct(s.bod_above_3, s.bod_readings)}% ${hi ? "जांचें > 3" : "of tests > 3"}` : undefined}
          tone="up-bad"
          bars={details.length ? yearBars("BOD") : undefined}
        />
        <Kpi
          label={hi ? "कार्रवाई ज़रूरी घाट" : "Ghats needing action"}
          value={ghats.length ? `${needAction}/${ghats.length}` : "—"}
          sub={
            ghats.length
              ? hi
                ? `${ghats.filter((g) => g.tier === "high").length} खतरा · ${ghats.filter((g) => g.tier === "insufficient_data").length} जांच नहीं`
                : `${ghats.filter((g) => g.tier === "high").length} danger · ${ghats.filter((g) => g.tier === "insufficient_data").length} not tested`
              : undefined
          }
          tone="up-bad"
        />
        <Kpi
          label={hi ? "विसर्जन तक दिन" : "Days to visarjan"}
          value={days !== null ? String(days) : "—"}
          sub={hi ? "20 अक्टूबर 2026" : "20 Oct 2026"}
        />
      </div>
      {s && (
        <p className="-mt-3 text-[12px] text-[var(--d-muted)]">
          {hi
            ? "CPCB श्रेणी B: DO ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5। छोटे बार: हर त्योहार-वर्ष के उल्लंघन। हर संख्या का स्रोत नीचे तालिका में पृष्ठ लिंक है।"
            : "CPCB class B: DO ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5. Mini bars: breaches per festival-year. Every reading links to its report page in the table below."}
        </p>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle right={<Link href="/map" className="text-[13px] font-medium text-[var(--d-ink2)] no-underline hover:underline">{hi ? "पूरा नक्शा ›" : "Full map ›"}</Link>}>
            {hi ? "घाट नक्शा" : "Ghat map"}
          </CardTitle>
          {ghats.length > 0 && <GhatMap ghats={ghats} lang={lang} height={440} />}
        </Card>

        <Card>
          <CardTitle info={hi ? "मॉडल अनुमान, मापन नहीं" : "Model estimate, not a measurement"}>{hi ? "उल्लंघन पूर्वानुमान" : "Breach forecast"}</CardTitle>
          <p className="text-[13px] text-[var(--d-muted)]">{hi ? "चैंपियन मॉडल p(उल्लंघन)" : "Champion model p(breach)"}</p>
          <p className="text-[12px] font-medium text-[var(--d-warn-ink)]">{hi ? "मॉडल अनुमान, मापन नहीं" : "Model estimate, not a measurement"}</p>
          <Link href="/models" className="mt-3 flex items-center justify-between rounded-xl bg-[var(--d-page)] px-3 py-2.5 text-[13px] font-semibold text-[var(--d-ink)] no-underline hover:bg-[var(--d-hover)]">
            <span>✦ {hi ? "ML अंतर्दृष्टि देखें" : "See ML insights"}</span>
            <span aria-hidden>›</span>
          </Link>
          <ul className="mt-4 space-y-3">
            {ghats.map((g) => {
              const p = g.forecast?.available ? g.forecast.p_breach : undefined;
              return (
                <li key={g.slug}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <Link href={`/ghat/${g.slug}`} className="text-[var(--d-ink)] no-underline hover:underline">{g.name[lang]}</Link>
                    <span className="tabular-nums font-semibold text-[var(--d-ink)]">{typeof p === "number" ? `${Math.round(p * 100)}%` : hi ? "उपलब्ध नहीं" : "n/a"}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[var(--d-track)]">
                    {typeof p === "number" && <div className="h-2 rounded-full bg-[var(--d-bar-dark)]" style={{ width: `${Math.round(p * 100)}%` }} />}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle
            info={hi ? "7 घाटों की गिनती, हर त्योहार चरण पर" : "Count over the 7 ghats at each festival phase"}
            right={
              <div className="flex rounded-xl border border-[var(--d-border)] bg-[var(--d-page)] p-0.5 text-[13px]" role="tablist">
                {(["DO", "BOD", "pH"] as Param[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="tab"
                    aria-selected={param === p}
                    onClick={() => setParam(p)}
                    className={`rounded-lg px-3 py-1 ${param === p ? "bg-[var(--d-card)] font-semibold text-[var(--d-ink)] shadow-sm" : "text-[var(--d-muted)]"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            }
          >
            {hi ? "त्योहार अनुसार सीमा उल्लंघन" : "Limit breaches by festival"}
          </CardTitle>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[13px] text-[var(--d-muted)]">{hi ? "सीमा" : "Limit"}</p>
              <p className="text-[22px] font-bold text-[var(--d-ink)]">
                {param === "DO" ? "DO ≥ 5 mg/l" : param === "BOD" ? "BOD ≤ 3 mg/l" : "pH 6.5–8.5"}
              </p>
            </div>
            <Legend lang={lang} />
          </div>
          {details.length ? (
            <>
              <BreachChart details={details} param={param} lang={lang} />
              <p className="mt-2 text-[12px] text-[var(--d-muted)]">
                {hi
                  ? "हर बार = 7 घाट, एक त्योहार चरण (पहले/दौरान/बाद)। धारीदार = जांच नहीं हुई, साफ़ नहीं माना गया। हर नंबर का पेज घाट विवरण में है।"
                  : "Each bar = the 7 ghats at one festival phase (pre/during/after). Hatched = not tested, never counted as clean. Each reading's report page is on the ghat page."}
              </p>
            </>
          ) : (
            <p className="py-16 text-center text-[14px] text-[var(--d-muted)]">{hi ? "लोड हो रहा है…" : "Loading…"}</p>
          )}
        </Card>
        <div className="xl:max-h-[505px] xl:overflow-y-auto">
          <AiAlerts lang={lang} />
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="px-5 pt-5">
          <CardTitle right={<span className="text-[12px] text-[var(--d-muted)]">{hi ? "सबसे ज़रूरी पहले" : "Most urgent first"}</span>}>
            {hi ? "घाट प्राथमिकता" : "Ghat priority"}
          </CardTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[13px]">
            <thead>
              <tr className="border-y border-[var(--d-hover)] text-[11px] uppercase tracking-wider text-[var(--d-bar-mid)]">
                <th className="py-2.5 pl-5 pr-2 font-medium"><input type="checkbox" aria-label="Select all" className="accent-[var(--d-ink)]" /></th>
                <th className="px-2 font-medium">#</th>
                <th className="px-2 font-medium">{hi ? "घाट" : "Ghat"}</th>
                <th className="px-2 font-medium">{hi ? "जल निकाय" : "Water body"}</th>
                <th className="px-2 font-medium">{hi ? "स्थिति" : "Status"}</th>
                <th className="px-2 font-medium">{hi ? "मुख्य रीडिंग" : "Key reading vs limit"}</th>
                <th className="px-2 font-medium">{hi ? "अंतिम जांच" : "Last test"}</th>
                <th className="px-2 font-medium">{hi ? "स्रोत" : "Source"}</th>
                <th className="px-2 font-medium">{hi ? "कार्रवाई" : "Actions"}</th>
                <th className="px-2 pr-5 font-medium"><span className="sr-only">Listen</span></th>
              </tr>
            </thead>
            <tbody>
              {ghats.map((g) => {
                const r = keyReason(g);
                return (
                  <tr key={g.slug} className="border-b border-[var(--d-subtle3)] align-middle hover:bg-[var(--d-card-alt)]">
                    <td className="py-3 pl-5 pr-2"><input type="checkbox" aria-label={g.name.en} className="accent-[var(--d-ink)]" /></td>
                    <td className="px-2 tabular-nums text-[var(--d-bar-mid)]">#{g.rank}</td>
                    <td className="px-2">
                      <Link href={`/ghat/${g.slug}`} className="font-semibold text-[var(--d-ink)] no-underline hover:underline">{g.name[lang]}</Link>
                    </td>
                    <td className="px-2 text-[var(--d-ink2)]">{g.water_body_name?.[lang] ?? g.water_body}</td>
                    <td className="whitespace-nowrap px-2"><Pill tone={TONE[g.tier]}>{TIER_WORD[g.tier][lang]}</Pill></td>
                    <td className="whitespace-nowrap px-2 tabular-nums text-[var(--d-ink)]">{readingText(r, lang)}</td>
                    <td className="whitespace-nowrap px-2 text-[var(--d-ink2)]">{lastTest(r)}</td>
                    <td className="px-2 text-[var(--d-ink2)]">{r ? <PdfLink source={r.source} /> : "—"}{r && typeof r.source.page !== "number" && (hi ? "जांच नहीं हुई" : "Not tested")}</td>
                    <td className="px-2">
                      <div className="flex flex-wrap gap-1">
                        {g.actions.length === 0 ? "—" : g.actions.map((a) => (
                          <span key={a.code} title={a.text[lang]} className="whitespace-nowrap rounded-md bg-[var(--d-subtle2)] px-1.5 py-0.5 text-[12px] text-[var(--d-ink4)]">{ACTION_WORD[a.code]?.[lang] ?? a.code}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 pr-5">
                      <div className="flex items-center gap-2">
                        <ListenButton text={[g.name[lang], TIER_WORD[g.tier][lang], r?.text[lang] ?? ""].filter(Boolean).join(". ")} lang={lang} size="sm" showSource={false} />
                        <Link href={`/ghat/${g.slug}`} className="text-[var(--d-muted)] no-underline hover:text-[var(--d-ink)]" aria-label={g.name.en}>›</Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-[12px] text-[var(--d-muted)]">
          {hi ? "“जांच नहीं हुई” का मतलब पानी साफ़ नहीं है। इसका मतलब है हमें पता नहीं।" : "“Not tested” does not mean clean. It means we do not know."}
        </p>
      </Card>
    </div>
  );
}
