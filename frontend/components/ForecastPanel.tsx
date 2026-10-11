"use client";

import { useLang } from "@/lib/lang";
import type { Forecast } from "@/lib/types";

const MODEL_LABEL: Record<string, string> = {
  logreg: "Logistic regression",
  random_forest: "Random forest",
  xgboost: "XGBoost",
  lightgbm: "LightGBM",
};
export const modelLabel = (m: string) => MODEL_LABEL[m] ?? m;

export function ForecastPanel({ forecast, compact = false }: { forecast: Forecast | undefined; compact?: boolean }) {
  const { lang, t } = useLang();
  if (!forecast || !forecast.available || forecast.p_breach === undefined) {
    return <p className="text-muted text-[0.95rem]">{t.forecastUnavailable}</p>;
  }
  const pct = Math.round(forecast.p_breach * 100);
  const models = Object.entries(forecast.models ?? {});
  return (
    <div>
      <p className="text-[0.95rem]">
        {t.pBreach}: <b className="text-2xl tabular">{pct}%</b>
      </p>
      {forecast.champion && (
        <p className="text-sm text-muted">
          {t.champion}: {modelLabel(forecast.champion)}
          {forecast.basis && <> · {t.basis(forecast.basis.year, t.festival[forecast.basis.festival] ?? forecast.basis.festival, t.phase[forecast.basis.phase as "pre"] ?? forecast.basis.phase)}</>}
        </p>
      )}
      {!compact && models.length > 0 && (
        <>
          <h4 className="mt-3 text-sm font-semibold">{t.agreement}</h4>
          <ul className="mt-1 space-y-1 text-sm">
            {models.map(([m, p]) => (
              <li key={m} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-2">
                <span className={m === forecast.champion ? "font-semibold" : ""}>{modelLabel(m)}</span>
                <span className="h-2 bg-surface border border-rule rounded-sm">
                  <span className="block h-full bg-ink/70" style={{ width: `${Math.round(p * 100)}%` }} />
                </span>
                <span className="tabular text-right">{Math.round(p * 100)}%</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {!compact && forecast.top_reasons && forecast.top_reasons.length > 0 && (
        <>
          <h4 className="mt-3 text-sm font-semibold">{t.topReasons}</h4>
          <ul className="mt-1 list-disc pl-5 text-[0.95rem] space-y-0.5">
            {forecast.top_reasons.map((r) => (
              <li key={r.feature}>{r.text[lang]}</li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-3 text-sm italic border-l-[3px] border-rule pl-2">{t.caveat}</p>
    </div>
  );
}
