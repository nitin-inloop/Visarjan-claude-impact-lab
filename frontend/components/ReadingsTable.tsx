"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { paramName } from "@/lib/i18n";
import type { Phase, Reading } from "@/lib/types";
import { PdfLink } from "./PdfLink";

export const PARAMS = [
  "pH", "Dissolved oxygen", "BOD", "COD", "Total solids", "Dissolved solids", "Suspended solids",
  "Turbidity", "Conductivity", "Chromium", "Lead", "Zinc", "Copper",
];
const SHORT: Record<string, string> = { "Dissolved oxygen": "DO", "Total solids": "TS", "Dissolved solids": "TDS", "Suspended solids": "SS" };
const UNIT: Record<string, string> = { pH: "", Turbidity: "NTU", Conductivity: "µS/cm" };
const LIMIT: Record<string, string> = { pH: "6.5–8.5", "Dissolved oxygen": "≥ 5", BOD: "≤ 3" };
export const FESTIVAL_YEARS: [number, string][] = [
  [2023, "Ganesh"], [2023, "Durga"], [2024, "Ganesh"], [2024, "Durga"], [2025, "Ganesh"], [2025, "Durga"],
];
const PHASES: Phase[] = ["pre", "during", "after"];

const CELL: Record<Reading["status"], string> = {
  breach: "bg-high-bg text-high font-semibold",
  ok: "",
  no_limit: "",
  missing: "bg-surface text-muted italic text-xs",
};

export function ReadingsTable({ readings }: { readings: Reading[] }) {
  const { t } = useLang();
  const find = (y: number, f: string, ph: Phase, p: string) =>
    readings.find((r) => r.year === y && r.festival === f && r.phase === ph && r.parameter === p);

  const cell = (r: Reading | undefined, p: string) => {
    if (!r || (r.value === null && r.flag !== "BDL")) {
      return (
        <td key={p} className={clsx("px-2 py-1.5 text-center", CELL.missing)} title={t.status.missing}>
          {t.notSampled}
        </td>
      );
    }
    if (r.value === null) {
      return (
        <td key={p} className="px-2 py-1.5 text-center text-muted text-sm" title={r.flag ?? ""}>
          {t.bdl}
        </td>
      );
    }
    return (
      <td key={p} className={clsx("px-2 py-1.5 text-right tabular", CELL[r.status])} title={t.status[r.status]}>
        {r.status === "breach" && <span aria-hidden>▲ </span>}
        {r.value}
        {r.status === "breach" && <span className="sr-only"> ({t.status.breach})</span>}
      </td>
    );
  };

  return (
    <div className="overflow-x-auto border border-rule rounded-md -mx-4 sm:mx-0">
      <table className="text-sm border-collapse min-w-max">
        <thead>
          <tr className="bg-surface">
            <th scope="col" className="sticky left-0 bg-surface px-2 py-2 text-left font-semibold border-b border-rule">
              {t.readings}
            </th>
            {PARAMS.map((p) => (
              <th key={p} scope="col" className="px-2 py-2 text-right font-semibold border-b border-rule whitespace-nowrap" title={paramName(t, p)}>
                {SHORT[p] ?? paramName(t, p)}
                <span className="block text-xs font-normal text-muted">{UNIT[p] ?? "mg/l"}</span>
              </th>
            ))}
          </tr>
          <tr>
            <th scope="row" className="sticky left-0 bg-paper px-2 py-1.5 text-left font-semibold border-b-2 border-ink whitespace-nowrap">
              {t.limitRow}
            </th>
            {PARAMS.map((p) => (
              <td key={p} className="px-2 py-1.5 text-right border-b-2 border-ink whitespace-nowrap font-semibold">
                {LIMIT[p] ?? <span className="text-muted font-normal text-xs">—</span>}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {FESTIVAL_YEARS.map(([y, f]) => {
            const group = readings.filter((r) => r.year === y && r.festival === f);
            const pages = [...new Map(group.filter((r) => typeof r.page === "number").map((r) => [`${r.pdf}-${r.page}`, r])).values()];
            return (
              <Fragment key={`${f}${y}`}>
                <tr className="bg-surface/60">
                  <th scope="rowgroup" colSpan={PARAMS.length + 1} className="sticky left-0 px-2 pt-3 pb-1 text-left font-semibold border-t border-rule">
                    <span className="mr-3">
                      {t.festival[f] ?? f} {y}
                    </span>
                    {pages.length === 0 ? (
                      <span className="text-gap font-semibold">{t.noTable}</span>
                    ) : (
                      <span className="inline-flex gap-2 font-normal">
                        {pages.map((r) => (
                          <PdfLink key={`${r.pdf}-${r.page}`} source={{ pdf: r.pdf, page: r.page as number, report: `MPPCB ${r.pdf}` }} />
                        ))}
                      </span>
                    )}
                  </th>
                </tr>
                {PHASES.map((ph) => (
                  <tr key={ph} className="border-t border-rule/60">
                    <th scope="row" className="sticky left-0 bg-paper px-2 py-1.5 text-left font-normal whitespace-nowrap">
                      {t.phase[ph]}
                    </th>
                    {PARAMS.map((p) => cell(find(y, f, ph, p), p))}
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TableLegend() {
  const { t } = useLang();
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2" aria-label={t.legend}>
      <li>
        <span className="px-1.5 bg-high-bg text-high font-semibold">▲ 5.0</span> {t.status.breach}
      </li>
      <li>
        <span className="px-1.5 border border-rule">7.1</span> {t.status.ok} / {t.status.no_limit}
      </li>
      <li>
        <span className="px-1.5 bg-surface text-muted italic">{t.notSampled}</span> {t.status.missing}
      </li>
      <li>
        <span className="px-1.5 text-muted">BDL</span> {t.bdlLong}
      </li>
    </ul>
  );
}
