"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { paramName } from "@/lib/i18n";
import { ix } from "@/lib/intakeI18n";
import { PARAMS_13, type IssueLevel, type Job, type JobIssue, type Row } from "@/lib/intakeTypes";
import type { Phase } from "@/lib/types";
import { GHATS, Lightbox, confClass, confText, ghatName, input } from "./shared";

const PHASES: Phase[] = ["pre", "during", "after"];
const LEVEL_CHIP: Record<IssueLevel, string> = {
  error: "border-critical text-critical",
  warn: "border-medium text-medium",
  info: "border-nodata text-muted",
};
const LEVEL_ICON: Record<IssueLevel, string> = { error: "✕", warn: "▲", info: "i" };

const display = (r: Row) => (r.value !== null ? String(r.value) : r.flag ?? "");

function parseCell(text: string): Pick<Row, "value" | "flag"> {
  const s = text.trim().replace(",", ".");
  if (/^-?\d+(\.\d+)?$/.test(s)) return { value: Number(s), flag: null };
  if (s === "") return { value: null, flag: "not sampled" };
  return { value: null, flag: s };
}

interface Props {
  job: Job;
  rows: Row[];
  onChange(rows: Row[]): void;
  pageUrl(n: number): string;
  readOnly?: boolean;
}

export function ReviewTable({ job, rows, onChange, pageUrl, readOnly = false }: Props) {
  const { lang, t } = useLang();
  const x = ix[lang];
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [zoom, setZoom] = useState<number | null>(null);

  const original = useMemo(() => new Map(job.rows.map((r) => [r.row_id, r])), [job.rows]);
  const issueById = useMemo(() => new Map(job.issues.map((i) => [i.id, i])), [job.issues]);

  const sites = useMemo(() => {
    const order: string[] = [];
    const by = new Map<string, Row[]>();
    for (const r of rows) {
      if (!by.has(r.site_as_printed)) {
        order.push(r.site_as_printed);
        by.set(r.site_as_printed, []);
      }
      by.get(r.site_as_printed)!.push(r);
    }
    return order.map((site) => {
      const rs = by.get(site)!;
      const phases = PHASES.filter((p) => rs.some((r) => r.phase === p));
      const extra = [...new Set(rs.map((r) => r.parameter))].filter((p) => !(PARAMS_13 as readonly string[]).includes(p));
      const params = [...PARAMS_13.filter((p) => rs.some((r) => r.parameter === p)), ...extra];
      const cell = new Map(rs.map((r) => [`${r.parameter}|${r.phase}`, r]));
      const pages = [...new Set(rs.map((r) => r.page).filter((p): p is number => p !== null))];
      const orig = rs.map((r) => original.get(r.row_id) ?? r);
      const needsMap = orig.some((r) => r.slug === null || r.site_match_confidence < 0.8);
      const issues = [...new Set(rs.flatMap((r) => r.issues))].map((id) => issueById.get(id)).filter((i): i is JobIssue => !!i);
      return { site, rs, phases, params, cell, pages, needsMap, issues, slug: rs[0].slug, smc: orig[0].site_match_confidence, inPack: rs.filter((r) => r.already_in_pack).length };
    });
  }, [rows, original, issueById]);

  const generalIssues = job.issues.filter((i) => i.row_id === null);

  const editCell = (r: Row, text: string) => {
    setDrafts((d) => ({ ...d, [r.row_id]: text }));
    const p = parseCell(text);
    onChange(rows.map((x2) => (x2.row_id === r.row_id ? { ...x2, ...p, value_as_printed: x2.value_as_printed } : x2)));
  };
  const mapSite = (site: string, slug: string | null) => onChange(rows.map((r) => (r.site_as_printed === site ? { ...r, slug } : r)));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="text-muted">{x.reviewNote}</span>
        <span className="rounded border border-rule px-1.5">{x.confHigh}</span>
        <span className="rounded border border-medium bg-medium-bg text-medium px-1.5">{x.confMid}</span>
        <span className="rounded border border-critical bg-high-bg text-critical px-1.5">{x.confLow}</span>
      </div>
      {generalIssues.length > 0 && (
        <ul className="space-y-1">
          {generalIssues.map((i) => (
            <IssueLine key={i.id} i={i} />
          ))}
        </ul>
      )}
      {sites.map((s) => (
        <section key={s.site} className="rounded border border-rule bg-surface/60">
          <header className="flex flex-wrap items-start gap-3 px-3 py-2 border-b border-rule">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink">
                {s.slug ? ghatName(s.slug, lang) : <span className="text-medium">{x.newSite}</span>}
                <span className={clsx("ml-2 text-xs tabular", confText(s.smc))}>{Math.round(s.smc * 100)}%</span>
              </div>
              <div className="text-xs text-muted">
                {x.asPrinted}: “{s.site}” · {x.rows(s.rs.length)}
                {s.inPack > 0 && <> · {x.inPack} ({s.inPack})</>}
              </div>
              {s.needsMap && (
                <label className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className={s.slug ? "text-muted" : "text-medium font-semibold"}>{s.slug ? x.mapTo : x.unmatched}</span>
                  <select className={input} value={s.slug ?? ""} disabled={readOnly} onChange={(e) => mapSite(s.site, e.target.value || null)}>
                    <option value="">{x.keepNew}</option>
                    {GHATS.map((g) => (
                      <option key={g.slug} value={g.slug}>
                        {g.name[lang]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            {s.pages.length > 0 && (
              <div className="flex gap-2">
                {s.pages.map((n) => (
                  <button key={n} type="button" onClick={() => setZoom(n)} className="group text-center" title={x.openFull}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pageUrl(n)} alt={x.pageThumb(n)} className="h-16 w-12 object-cover object-top rounded-sm border border-rule bg-white group-hover:border-accent" loading="lazy" />
                    <span className="block text-[10px] text-muted tabular">{x.pageThumb(n)}</span>
                  </button>
                ))}
              </div>
            )}
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="text-xs text-muted">
                <tr>
                  <th className="text-left px-2 py-1.5 font-semibold sticky left-0 bg-surface">{x.param}</th>
                  {s.phases.map((p) => (
                    <th key={p} className="text-left px-2 py-1.5 font-semibold">
                      {t.phaseLong[p]}
                    </th>
                  ))}
                  <th className="text-left px-2 py-1.5 font-semibold">{x.unit}</th>
                </tr>
              </thead>
              <tbody>
                {s.params.map((p) => {
                  const any = s.phases.map((ph) => s.cell.get(`${p}|${ph}`)).find((r) => r);
                  return (
                    <tr key={p} className="border-t border-rule">
                      <th scope="row" className="text-left px-2 py-1 font-normal sticky left-0 bg-surface align-top">
                        <span className="text-ink">{paramName(t, p)}</span>
                        {any && any.parameter_as_printed !== p && <span className="block text-[11px] text-muted">{any.parameter_as_printed}</span>}
                      </th>
                      {s.phases.map((ph) => {
                        const r = s.cell.get(`${p}|${ph}`);
                        if (!r) return <td key={ph} className="px-2 py-1 text-muted">—</td>;
                        const o = original.get(r.row_id);
                        const edited = !!o && (o.value !== r.value || o.flag !== r.flag);
                        const rIssues = r.issues.map((id) => issueById.get(id)).filter((i): i is JobIssue => !!i);
                        return (
                          <td key={ph} className="px-2 py-1 align-top">
                            <div className="flex items-center gap-1">
                              <input
                                className={clsx(input, "w-24 tabular border", confClass(r.confidence), edited && "outline outline-1 outline-accent")}
                                value={drafts[r.row_id] ?? display(r)}
                                readOnly={readOnly}
                                aria-label={`${s.site} ${paramName(t, p)} ${t.phase[ph]}`}
                                onChange={(e) => editCell(r, e.target.value)}
                              />
                              {rIssues.map((i) => (
                                <span key={i.id} title={i.text[lang]} className={clsx("text-[10px] font-bold rounded border px-1 leading-4", LEVEL_CHIP[i.level])}>
                                  <span aria-hidden>{LEVEL_ICON[i.level]}</span>
                                  <span className="sr-only">
                                    {x.level[i.level]}: {i.text[lang]}
                                  </span>
                                </span>
                              ))}
                            </div>
                            <div className={clsx("text-[11px] tabular", confText(r.confidence))}>
                              {Math.round(r.confidence * 100)}%{r.value_as_printed && r.value_as_printed !== display(r) ? ` · “${r.value_as_printed}”` : ""}
                              {edited && <span className="text-accent"> · {x.edited}</span>}
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-2 py-1 text-xs text-muted align-top whitespace-nowrap">{any?.unit_assumed || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {s.issues.length > 0 && (
            <ul className="px-3 py-2 border-t border-rule space-y-1">
              {s.issues.map((i) => (
                <IssueLine key={i.id} i={i} />
              ))}
            </ul>
          )}
        </section>
      ))}
      {zoom !== null && <Lightbox src={pageUrl(zoom)} alt={x.pageThumb(zoom)} onClose={() => setZoom(null)} />}
    </div>
  );
}

function IssueLine({ i }: { i: JobIssue }) {
  const { lang } = useLang();
  const x = ix[lang];
  return (
    <li className="text-xs flex gap-2 items-start">
      <span className={clsx("font-bold rounded border px-1 shrink-0", LEVEL_CHIP[i.level])}>
        {LEVEL_ICON[i.level]} {x.level[i.level]}
      </span>
      <span className="text-ink">{i.text[lang]}</span>
    </li>
  );
}
