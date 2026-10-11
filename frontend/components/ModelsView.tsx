"use client";

// ML Insights: leaderboard, feature importances, per-ghat forecast agreement, and an honest reading guide.
// The forecast is a model estimate (never a measurement) and is NOT used in the ranking.

import { useState } from "react";
import Link from "next/link";
import { fetchLeaderboard, fetchRanking } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import { STATUS } from "@/lib/plain";
import type { GhatRank, Lang, Leaderboard, LeaderboardRow, Ranking } from "@/lib/types";
import { Card, CardTitle, Kpi, Pill, type PillTone } from "./dash/ui";
import { MODEL_SHADE, featureLabel, modelName } from "./ml/labels";
import { LoadState } from "./LoadState";

type Row = LeaderboardRow & { auc_groupkfold_std?: number; n_test_temporal?: number };
type Lb = Omit<Leaderboard, "rows" | "importances"> & {
  n_sites?: number;
  positive_rate?: number;
  label?: string;
  caveat?: { en: string; hi: string };
  importances: Record<string, { feature: string; importance: number; method?: string }[]>;
  rows: Row[];
};

const MODELS = ["random_forest", "logreg", "xgboost", "lightgbm"];
const f3 = (v: number | null | undefined) => (typeof v === "number" ? v.toFixed(3) : "—");
const pct = (v: number) => `${Math.round(v * 100)}%`;
const TONE: Record<GhatRank["tier"], PillTone> = { high: "danger", medium: "watch", low: "lower", insufficient_data: "missing" };

const METHOD: Record<string, Record<Lang, string>> = {
  abs_coefficient_standardised: { en: "absolute standardised coefficient", hi: "मानकीकृत गुणांक (निरपेक्ष)" },
  impurity: { en: "impurity decrease", hi: "impurity में कमी" },
  gain: { en: "gain", hi: "gain" },
  split: { en: "split count", hi: "split गिनती" },
  mean_abs_shap: { en: "mean |SHAP| value", hi: "औसत |SHAP| मान" },
};

export function ModelsView({
  initialLb,
  ranking: initialRanking,
}: {
  initialLb: Leaderboard | null;
  ranking: Ranking | null;
  /** accepted for older callers (components/live/Tabs.tsx); not shown here */
  initialAlloc?: unknown;
}) {
  const { lang } = useLang();
  const hi = lang === "hi";
  const lb = useLive(fetchLeaderboard, initialLb);
  const rk = useLive(fetchRanking, initialRanking);
  const [tab, setTab] = useState<string | null>(null);

  if (!lb.data) return <LoadState error={lb.error} />;
  const L = lb.data as unknown as Lb;
  const champ = L.champion;
  const champRow = L.rows.find((r) => r.model === champ);
  const model = tab ?? champ;
  const imps = [...(L.importances[model] ?? [])].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance)).slice(0, 10);
  const maxImp = Math.max(1e-9, ...imps.map((i) => Math.abs(i.importance)));
  const method = imps[0]?.method;
  const rows = [...L.rows].sort((a, b) => b.auc_groupkfold - a.auc_groupkfold);

  const ghats = [...(rk.data?.ghats ?? [])].sort((a, b) => a.rank - b.rank);
  const withF = ghats.filter((g) => g.forecast?.available && typeof g.forecast.p_breach === "number");
  const ps = withF.map((g) => g.forecast.p_breach as number);
  const allP = withF.flatMap((g) => Object.values(g.forecast.models ?? {}));
  const pMin = ps.length ? Math.min(...ps) : null;
  const pMax = ps.length ? Math.max(...ps) : null;
  const missing = ghats.length - withF.length;

  const basisText = (g: GhatRank) => {
    const b = g.forecast.basis;
    if (!b) return null;
    const fest = b.festival === "Durga" ? (hi ? "दुर्गा" : "Durga") : b.festival === "Ganesh" ? (hi ? "गणेश" : "Ganesh") : b.festival;
    return hi ? `${fest} ${b.year} की विसर्जन-पूर्व रीडिंग से` : `from ${fest} ${b.year} pre-immersion readings`;
  };

  return (
    <div className="space-y-5 pb-10 pt-6">
      <header>
        <h1 className="text-[26px] font-bold leading-tight text-[var(--d-ink)]">{hi ? "एमएल अंतर्दृष्टि" : "ML Insights"}</h1>
        <p className="mt-1 text-sm text-[var(--d-muted)]">
          {hi
            ? `विसर्जन के दौरान/बाद में सीमा उल्लंघन का पूर्वानुमान · ${L.n_train} मध्य प्रदेश स्थल-त्योहार रिकॉर्ड (2023–25) पर प्रशिक्षित`
            : `Forecast of limit breach during/after immersion · trained on ${L.n_train} MP site-festival records (2023–25)`}
        </p>
        <p className="mt-2 inline-flex items-center gap-2 rounded-md border border-dashed border-[var(--d-muted2)] px-2 py-1 text-xs font-semibold text-[var(--d-ink3)]">
          {hi ? "मॉडल अनुमान, मापन नहीं · रैंकिंग में उपयोग नहीं" : "Model estimate, not a measurement · not used in the ranking"}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label={hi ? "चैंपियन मॉडल" : "Champion model"} value={modelName(champ, lang)} sub={hi ? "सबसे अधिक CV ROC-AUC" : "highest CV ROC-AUC"} />
        <Kpi
          label="CV ROC-AUC"
          value={f3(champRow?.auc_groupkfold)}
          sub={
            champRow?.auc_groupkfold_std !== undefined
              ? `± ${champRow.auc_groupkfold_std.toFixed(3)} · ${hi ? "5 फोल्ड, स्थल-वार" : "5 folds, grouped by site"}`
              : undefined
          }
        />
        <Kpi
          label={hi ? "2025 होल्ड-आउट AUC" : "2025 hold-out AUC"}
          value={f3(champRow?.auc_temporal_2025)}
          sub={champRow?.n_test_temporal ? (hi ? `2025 के ${champRow.n_test_temporal} रिकॉर्ड पर` : `on ${champRow.n_test_temporal} unseen 2025 records`) : undefined}
        />
        <Kpi
          label={hi ? "प्रशिक्षण रिकॉर्ड" : "Training records"}
          value={String(L.n_train)}
          sub={[
            L.n_sites ? (hi ? `${L.n_sites} स्थल` : `${L.n_sites} sites`) : null,
            typeof L.positive_rate === "number" ? (hi ? `${pct(L.positive_rate)} में उल्लंघन` : `${pct(L.positive_rate)} breached`) : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardTitle info={L.selection_rule}>{hi ? "मॉडल लीडरबोर्ड" : "Model leaderboard"}</CardTitle>
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-[var(--d-border)] text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--d-muted)]">
                  <th className="py-2 pr-3">{hi ? "मॉडल" : "Model"}</th>
                  <th className="py-2 pr-3">CV AUC</th>
                  <th className="py-2 pr-3">{hi ? "2025 AUC" : "2025 AUC"}</th>
                  <th className="py-2 pr-3">PR-AUC</th>
                  <th className="py-2">Brier ↓</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.model} className="border-b border-[var(--d-subtle)] last:border-0">
                    <td className="py-3 pr-3">
                      <span className="font-semibold text-[var(--d-ink)]">{modelName(r.model, lang)}</span>{" "}
                      {r.model === champ && <Pill tone="neutral">{hi ? "चैंपियन" : "Champion"}</Pill>}
                    </td>
                    <MetricCell v={r.auc_groupkfold} strong={r.model === champ} />
                    <MetricCell v={r.auc_temporal_2025} strong={r.model === champ} />
                    <MetricCell v={r.pr_auc} strong={r.model === champ} />
                    <MetricCell v={r.brier} strong={r.model === champ} max={0.3} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[var(--d-muted)]">
            {hi ? "चयन नियम: " : "Selection rule: "}
            {L.selection_rule} {hi ? "Brier: कम बेहतर है।" : "Brier: lower is better."}
          </p>
        </Card>

        <Card className="xl:col-span-2">
          <CardTitle info={method ? (METHOD[method]?.[lang] ?? method) : undefined}>{hi ? "पूर्वानुमान किससे चलता है" : "What drives the forecast"}</CardTitle>
          <div role="tablist" className="mb-4 inline-flex flex-wrap rounded-lg border border-[var(--d-border)] bg-[var(--d-page)] p-0.5 text-xs">
            {MODELS.filter((m) => L.importances[m]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={m === model}
                onClick={() => setTab(m)}
                className={`rounded-md px-2.5 py-1.5 font-semibold ${m === model ? "bg-[var(--d-card)] text-[var(--d-ink)] shadow-sm" : "text-[var(--d-muted)] hover:text-[var(--d-ink)]"}`}
              >
                {modelName(m, lang)}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {imps.map((i) => (
              <li key={i.feature} className="grid grid-cols-[minmax(0,11rem)_1fr_3.2rem] items-center gap-2 text-[13px]">
                <span className="truncate text-[var(--d-ink2)]" title={i.feature}>
                  {featureLabel(i.feature, lang)}
                </span>
                <span className="h-2.5 rounded-sm bg-[var(--d-subtle)]">
                  <span className="block h-full rounded-sm bg-[var(--d-bar-dark)]" style={{ width: `${(Math.abs(i.importance) / maxImp) * 100}%` }} />
                </span>
                <span className="text-right tabular-nums text-[var(--d-muted)]">{Math.abs(i.importance) < 0.01 ? i.importance.toExponential(1) : i.importance.toFixed(3)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--d-muted)]">
            {hi
              ? "बार इस मॉडल के अंदर का महत्व दिखाते हैं। मॉडलों के बीच संख्याएं तुलनीय नहीं हैं।"
              : "Bars show importance within this model; numbers are not comparable across models."}
            {method && ` (${METHOD[method]?.[lang] ?? method})`}
          </p>
        </Card>
      </div>

      <Card>
        <CardTitle
          info={hi ? "गहरी पट्टी = चैंपियन का अनुमान; बिंदु = चारों मॉडल" : "Dark bar = champion estimate; dots = each of the 4 models"}
          right={
            <ul className="hidden flex-wrap items-center gap-3 text-xs text-[var(--d-muted)] sm:flex">
              {MODELS.map((m) => (
                <li key={m} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-white ring-1 ring-[var(--d-muted3)]" style={{ background: MODEL_SHADE[m] }} />
                  {modelName(m, lang)}
                </li>
              ))}
            </ul>
          }
        >
          {hi ? "घाट-वार पूर्वानुमान" : "Per-ghat forecast"}
        </CardTitle>
        {ghats.length === 0 && <p className="text-sm text-[var(--d-muted)]">{hi ? "रैंकिंग डेटा उपलब्ध नहीं।" : "Ranking data not available."}</p>}
        <ul className="divide-y divide-[var(--d-subtle)]">
          {ghats.map((g) => {
            const f = g.forecast;
            const ok = f?.available && typeof f.p_breach === "number";
            const reason = f?.top_reasons?.[0]?.text?.[lang];
            return (
              <li key={g.slug} className="grid grid-cols-1 gap-2 py-3 md:grid-cols-[15rem_1fr_4rem] md:items-center md:gap-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[var(--d-ink)]">
                    <span className="tabular-nums text-[var(--d-muted)]">{g.rank}.</span>
                    <Link href={`/ghat/${g.slug}`} className="truncate text-[var(--d-ink)] hover:underline">
                      {g.name[lang]}
                    </Link>
                  </p>
                  <p className="mt-1">
                    <Pill tone={TONE[g.tier]}>{STATUS[g.tier].word[lang]}</Pill>
                  </p>
                </div>
                {ok ? (
                  <div className="min-w-0">
                    <AgreementBar p={f.p_breach as number} models={f.models ?? {}} lang={lang} />
                    <p className="mt-1.5 text-xs text-[var(--d-muted)]">
                      {basisText(g)}
                      {reason && <> · {reason}</>}
                    </p>
                  </div>
                ) : (
                  <p className="rounded-md border border-dashed border-[var(--d-muted2)] px-2 py-1.5 text-xs text-[var(--d-ink3)]">
                    {hi ? "पूर्वानुमान नहीं: विसर्जन-पूर्व रीडिंग नहीं है।" : "No forecast: no pre-immersion reading to base it on."}
                  </p>
                )}
                <p className="text-right text-xl font-bold tabular-nums text-[var(--d-ink)]">{ok ? pct(f.p_breach as number) : "—"}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-xs text-[var(--d-muted)]">
          {hi
            ? "p(उल्लंघन) = मॉडल का अनुमान कि विसर्जन के दौरान या एक सप्ताह बाद सीमा टूटेगी। यह मापन नहीं है।"
            : "p(breach) = the model's estimate that a limit is broken during or one week after immersion. It is not a measurement."}
        </p>
      </Card>

      <Card>
        <CardTitle>{hi ? "इसे कैसे पढ़ें" : "How to read this"}</CardTitle>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--d-ink2)]">
          {pMin !== null && pMax !== null && (
            <li>
              {hi
                ? `सभी ${withF.length} घाटों का चैंपियन अनुमान ${pMin.toFixed(2)}–${pMax.toFixed(2)} के बीच है (चारों मॉडल: ${Math.min(...allP).toFixed(3)}–${Math.max(...allP).toFixed(3)})। मॉडल ऊंचे जोखिम की पुष्टि करता है, पर घाटों को एक-दूसरे से अलग नहीं करता।`
                : `All ${withF.length} ghats sit at ${pMin.toFixed(2)}–${pMax.toFixed(2)} on the champion (all four models: ${Math.min(...allP).toFixed(3)}–${Math.max(...allP).toFixed(3)}). The model confirms high risk everywhere but does not separate the ghats from each other.`}
            </li>
          )}
          {missing > 0 && (
            <li>
              {hi ? `${missing} घाटों का पूर्वानुमान नहीं है; उन्हें सुरक्षित न मानें।` : `${missing} ghat(s) have no forecast; do not read that as safe.`}
            </li>
          )}
          <li>
            {hi
              ? "प्राथमिकता क्रम CPCB स्नान मानकों और MPPCB रिपोर्ट की रीडिंग (पृष्ठ संख्या सहित) से बनता है, इस मॉडल से नहीं।"
              : "The priority ranking is built from CPCB bathing limits and MPPCB report readings (with page numbers), not from this model."}
          </li>
          {L.label && (
            <li>
              {hi ? "लेबल: " : "Label: "}
              {hi ? "उल्लंघन = विसर्जन के दौरान या एक सप्ताह बाद कोई भी DO < 5 mg/l या BOD > 3 mg/l।" : L.label.replace(/^P\(breach\)\s*=\s*/, "a breach = ") + "."}
            </li>
          )}
          {typeof L.positive_rate === "number" && (
            <li>
              {hi
                ? `प्रशिक्षण के ${L.n_train} रिकॉर्ड में से ${pct(L.positive_rate)} में उल्लंघन हुआ था, इसलिए आधार दर पहले से ऊंची है।`
                : `${pct(L.positive_rate)} of the ${L.n_train} training records breached, so the base rate is already high.`}
            </li>
          )}
          {L.caveat && <li className="font-semibold text-[var(--d-ink)]">{L.caveat[lang]}</li>}
        </ul>
      </Card>
    </div>
  );
}

function MetricCell({ v, strong, max = 1 }: { v: number | undefined; strong: boolean; max?: number }) {
  const w = typeof v === "number" ? Math.min(1, v / max) * 100 : 0;
  return (
    <td className="py-3 pr-3">
      <div className="flex items-center gap-2">
        <span className={`w-11 tabular-nums ${strong ? "font-bold text-[var(--d-ink)]" : "text-[var(--d-ink2)]"}`}>{f3(v)}</span>
        <span className="hidden h-1.5 w-12 rounded-sm bg-[var(--d-subtle)] sm:block">
          <span className={`block h-full rounded-sm ${strong ? "bg-[var(--d-bar-dark)]" : "bg-[var(--d-bar-mid)]"}`} style={{ width: `${w}%` }} />
        </span>
      </div>
    </td>
  );
}

function AgreementBar({ p, models, lang }: { p: number; models: Record<string, number>; lang: Lang }) {
  return (
    <div className="relative h-5" role="img" aria-label={`${modelName("random_forest", lang)} ${pct(p)}; ${Object.entries(models).map(([m, v]) => `${modelName(m, lang)} ${pct(v)}`).join(", ")}`}>
      <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-sm bg-[var(--d-subtle)]">
        <div className="h-full rounded-sm bg-[var(--d-bar-dark)]" style={{ width: `${p * 100}%` }} />
      </div>
      {[0.25, 0.5, 0.75].map((t) => (
        <span key={t} className="absolute top-0 h-5 w-px bg-[var(--d-border)]" style={{ left: `${t * 100}%` }} aria-hidden />
      ))}
      {MODELS.filter((m) => typeof models[m] === "number").map((m) => (
        <span
          key={m}
          title={`${modelName(m, lang)}: ${pct(models[m])}`}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ring-1 ring-[var(--d-muted3)]"
          style={{ left: `${models[m] * 100}%`, background: MODEL_SHADE[m] }}
        />
      ))}
    </div>
  );
}
