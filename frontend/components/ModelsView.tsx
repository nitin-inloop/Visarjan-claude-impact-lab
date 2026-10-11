"use client";

import { useState } from "react";
import clsx from "clsx";
import { fetchAllocation, fetchLeaderboard } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { useLive } from "@/lib/useLive";
import type { Allocation, Bilingual, Leaderboard, Ranking } from "@/lib/types";
import { modelLabel } from "./ForecastPanel";
import { LoadState } from "./LoadState";

const fmt = (v: number | null | undefined, d = 2) => (typeof v === "number" ? v.toFixed(d) : "—");

export function ModelsView({ initialLb, initialAlloc, ranking }: { initialLb: Leaderboard | null; initialAlloc: Allocation | null; ranking: Ranking | null }) {
  const { lang, t } = useLang();
  const lb = useLive(fetchLeaderboard, initialLb);
  const [budget, setBudget] = useState<number>(initialAlloc?.budget ?? 8);
  const [query, setQuery] = useState<number | undefined>(undefined);
  const alloc = useLive(() => fetchAllocation(query), initialAlloc, [query]);
  const names: Record<string, Bilingual> = Object.fromEntries((ranking?.ghats ?? []).map((g) => [g.slug, g.name]));

  if (!lb.data) return <LoadState error={lb.error} />;
  const L = lb.data;
  const imps = L.importances[L.champion] ?? [];
  const maxImp = Math.max(...imps.map((i) => Math.abs(i.importance)), 1e-9);
  const A = alloc.data;
  const pv = A ? Object.entries(A.policy_values) : [];
  const pvMax = Math.max(...pv.map(([, v]) => v));

  const actionName = (a: string) =>
    a
      .split("+")
      .map((x) => (t.action as Record<string, string>)[x === "test" ? "test_first" : x] ?? x)
      .join(" + ");
  const th = "px-2 py-2 text-right font-semibold whitespace-nowrap";
  const td = "px-2 py-1.5 text-right tabular";

  return (
    <div className="pt-6 space-y-8">
      <header>
        <h1 className="text-[1.6rem] font-bold leading-tight">
          {t.modelsTitle}{" "}
          <span className="align-middle inline-block rounded border-2 border-dashed border-medium text-medium text-sm px-2 py-0.5">{t.experimental}</span>
        </h1>
        <p className="text-muted mt-1">{t.trainedOn(L.n_train)}</p>
      </header>

      <section aria-labelledby="lb-h">
        <h2 id="lb-h" className="text-xl font-bold mb-2">
          {t.leaderboard}
        </h2>
        <div className="overflow-x-auto border border-rule rounded-md -mx-4 sm:mx-0">
          <table className="w-full text-sm border-collapse min-w-max">
            <thead className="bg-surface">
              <tr>
                <th className={clsx(th, "!text-left")}>{t.colModel}</th>
                <th className={th}>{t.colAuc}</th>
                <th className={th}>{t.colAucT}</th>
                <th className={th}>{t.colPr}</th>
                <th className={th}>{t.colBrier}</th>
                <th className={th}>{t.colLog}</th>
                <th className={th}>{t.colF1}</th>
              </tr>
            </thead>
            <tbody>
              {L.rows.map((r) => {
                const champ = r.model === L.champion;
                return (
                  <tr key={r.model} className={clsx("border-t border-rule", champ && "bg-accent/5 font-semibold")}>
                    <th scope="row" className="px-2 py-1.5 text-left whitespace-nowrap">
                      {champ && <span aria-hidden>★ </span>}
                      {modelLabel(r.model)}
                    </th>
                    <td className={td}>{fmt(r.auc_groupkfold)}</td>
                    <td className={td}>{fmt(r.auc_temporal_2025)}</td>
                    <td className={td}>{fmt(r.pr_auc)}</td>
                    <td className={td}>{fmt(r.brier)}</td>
                    <td className={td}>{fmt(r.logloss)}</td>
                    <td className={td}>{fmt(r.f1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[0.95rem]">
          <b>{t.championRule}:</b> {L.selection_rule}
        </p>
      </section>

      <section aria-labelledby="imp-h">
        <h2 id="imp-h" className="text-xl font-bold mb-2">
          {t.importances} ({modelLabel(L.champion)})
        </h2>
        <ul className="space-y-1.5 text-sm">
          {imps.map((i) => (
            <li key={i.feature} className="grid grid-cols-[minmax(8rem,12rem)_1fr_3.5rem] items-center gap-2">
              <span className="truncate">{i.feature}</span>
              <span className="h-3 bg-surface rounded-sm">
                <span className="block h-full bg-accent rounded-sm" style={{ width: `${(Math.abs(i.importance) / maxImp) * 100}%` }} />
              </span>
              <span className="tabular text-right">{fmt(i.importance)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cql-h" className="border-2 border-dashed border-medium rounded-md p-4">
        <h2 id="cql-h" className="text-xl font-bold mb-2">
          {t.cql} <span className="text-sm font-semibold text-medium">({t.experimental})</span>
        </h2>
        {!A ? (
          <LoadState error={alloc.error} />
        ) : (
          <>
            <p className="text-[0.95rem]">{A.caveat[lang]}</p>
            <h3 className="mt-4 font-semibold">{t.policyValues}</h3>
            <table className="mt-1 text-sm">
              <tbody>
                {pv.map(([k, v]) => (
                  <tr key={k} className={clsx(v === pvMax && "font-semibold")}>
                    <th scope="row" className="pr-4 py-1 text-left font-normal">
                      {t.policy[k] ?? k}
                    </th>
                    <td className="py-1 text-right tabular">{fmt(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form
              className="mt-4 flex items-end gap-2 no-print"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(budget);
              }}
            >
              <label className="block">
                <span className="block text-sm font-semibold mb-1">{t.budget}</span>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-24 rounded border border-ink/60 px-2 py-1.5 tabular"
                />
              </label>
              <button type="submit" className="rounded bg-accent text-white px-4 py-2 font-semibold">
                {t.update}
              </button>
            </form>
            <h3 className="mt-4 font-semibold">
              {t.plan}: {t.budget} {A.budget}
            </h3>
            <ol className="mt-1 list-decimal pl-5 space-y-1">
              {A.plan.map((p, i) => (
                <li key={`${p.slug}-${i}`}>
                  <b>{names[p.slug]?.[lang] ?? p.slug}</b>: {actionName(p.action)}{" "}
                  <span className="text-sm text-muted tabular">
                    ({t.cost} {p.cost}, {t.gain} {fmt(p.q_gain)})
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
    </div>
  );
}
