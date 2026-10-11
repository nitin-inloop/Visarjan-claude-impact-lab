"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtClock, fmtNum } from "@/lib/liveFormat";
import type { LiveEvent, Point, ResourceKind, ValueParam } from "@/lib/liveTypes";
import { useUi } from "./CommandCenter";
import { AlertRow } from "./AlertFeed";
import { SensorBadge, TierChip } from "./GhatTile";
import { SimBadge } from "./TopBar";
import { useDispatch } from "./Tabs";

const SPAN = 120 * 60_000;

function MiniChart({ title, unit, pts, now, limit, limitMode, markers }: { title: string; unit: string; pts: Point[]; now: number; limit: number | null; limitMode: "min" | "max"; markers: LiveEvent[] }) {
  const W = 460;
  const H = 96;
  const L = 30;
  const R = 6;
  const T = 8;
  const B = 18;
  const from = now - SPAN;
  const p = pts.filter((x) => x[0] >= from);
  const vals = p.map((x) => x[1]);
  const max = Math.max(limit !== null ? limit * 1.4 : 1, ...vals) * 1.05;
  const x = (tt: number) => L + ((tt - from) / SPAN) * (W - L - R);
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const d = p.map((pt, i) => `${i ? "L" : "M"}${x(pt[0]).toFixed(1)},${y(pt[1]).toFixed(1)}`).join("");
  const last = p.length ? p[p.length - 1][1] : null;
  const ticks = [0, 30, 60, 90, 120].map((m) => now - SPAN + m * 60_000);
  return (
    <figure className="mt-3">
      <figcaption className="flex justify-between text-xs text-muted">
        <span className="font-semibold text-ink">{title}</span>
        <span className="tabular">{last !== null ? `${fmtNum(last)} ${unit}` : "—"}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${title}: ${p.length} points${last !== null ? `, latest ${fmtNum(last)} ${unit}` : ""}`}>
        {[0, max / 2].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
            <text x={L - 4} y={y(v) + 3} fontSize={9} textAnchor="end" fill="var(--muted)">
              {v.toFixed(v < 10 ? 1 : 0)}
            </text>
          </g>
        ))}
        {ticks.map((tt) => (
          <text key={tt} x={x(tt)} y={H - 4} fontSize={9} textAnchor="middle" fill="var(--muted)">
            {fmtClock(tt)}
          </text>
        ))}
        {limit !== null && (
          <>
            <line x1={L} x2={W - R} y1={y(limit)} y2={y(limit)} stroke="var(--critical)" strokeDasharray="5 4" />
            <text x={W - R} y={y(limit) - 3} fontSize={9} textAnchor="end" fill="var(--critical)">
              {limitMode === "min" ? "≥" : "≤"} {limit}
            </text>
          </>
        )}
        {markers
          .filter((e) => e.t >= from)
          .map((e) => (
            <g key={e.id}>
              <line x1={x(e.t)} x2={x(e.t)} y1={T} y2={H - B} stroke="var(--accent)" strokeDasharray="2 3" />
              <title>{e.text.en}</title>
            </g>
          ))}
        {d && <path d={d} fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeLinejoin="round" />}
        {p.length > 0 && p.length < 4 && p.map((pt) => <circle key={pt[0]} cx={x(pt[0])} cy={y(pt[1])} r={3} fill="var(--ink)" />)}
      </svg>
    </figure>
  );
}

const ROWS: { p: ValueParam; label: string; unit: string; limit: string; bad: (v: number) => boolean }[] = [
  { p: "DO", label: "DO", unit: "mg/l", limit: "≥ 5", bad: (v) => v < 5 },
  { p: "BOD", label: "BOD", unit: "mg/l", limit: "≤ 3", bad: (v) => v > 3 },
  { p: "pH", label: "pH", unit: "", limit: "6.5–8.5", bad: (v) => v < 6.5 || v > 8.5 },
  { p: "turbidity", label: "Turbidity", unit: "NTU", limit: "—", bad: () => false },
  { p: "conductivity", label: "Conductivity", unit: "µS/cm", limit: "—", bad: () => false },
  { p: "COD", label: "COD", unit: "mg/l", limit: "—", bad: () => false },
];

export function Drawer() {
  const { t, lang } = useLang();
  const { data } = useLiveStore();
  const { selected, select } = useUi();
  const { send, msg } = useDispatch();
  const closeRef = useRef<HTMLButtonElement>(null);
  const g = selected && data ? data.ghats[selected] : null;
  useEffect(() => {
    if (selected) closeRef.current?.focus();
  }, [selected]);
  if (!g || !data) return null;
  const series = data.series[g.slug];
  const markers = data.events.filter((e) => e.ghat === g.slug && (e.kind === "arrival" || e.kind === "effect"));
  const alerts = data.alerts.filter((a) => a.ghat === g.slug && a.state !== "resolved");
  const res = data.resources.filter((r) => r.target === g.slug || (r.at === g.slug && r.status !== "idle"));
  const kinds: ResourceKind[] = ["aerator", "crew", "test_team", ...(g.ngt_lake_ban ? (["diversion"] as ResourceKind[]) : [])];
  return (
    <div className="no-print fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <button type="button" aria-label={t.lv.close} className="absolute inset-0 bg-black/50 cursor-default" onClick={() => select(null)} tabIndex={-1} />
      <aside className="cc-drawer relative h-full w-full sm:w-[520px] bg-paper border-l border-rule overflow-y-auto">
        <div className="sticky top-0 bg-paper border-b border-rule px-4 py-3 flex items-start gap-3 z-10">
          <div className="min-w-0 flex-1">
            <h2 id="drawer-title" className="text-lg font-bold text-ink leading-snug">
              {g.name[lang]}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <TierChip tier={g.live_tier} />
              <SensorBadge s={g.sensor} />
              <SimBadge />
            </div>
            <p className="text-xs text-muted mt-1">{g.tier_note[lang]}</p>
          </div>
          <button ref={closeRef} type="button" onClick={() => select(null)} className="rounded border border-rule px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent">
            {t.lv.close}
          </button>
        </div>
        <div className="px-4 py-3 space-y-5">
          <section>
            <h3 className="label-caps mb-1">{t.lv.values}</h3>
            <table className="w-full text-sm">
              <tbody>
                {ROWS.map((r) => {
                  const v = g.values[r.p];
                  return (
                    <tr key={r.p} className="border-b border-rule">
                      <th scope="row" className="text-left font-normal text-muted py-1">
                        {r.label}
                      </th>
                      <td className={clsx("text-right tabular py-1 font-semibold", v === null ? "text-muted font-normal" : r.bad(v) ? "text-critical" : "text-ink")}>
                        {v === null ? (r.p === "BOD" ? t.lv.awaitingLab : "—") : `${fmtNum(v, r.p === "pH" ? 2 : 1)} ${r.unit}`}
                        {v !== null && r.bad(v) && <span className="sr-only"> ({t.status.breach})</span>}
                      </td>
                      <td className="text-right text-xs text-muted py-1 pl-3 whitespace-nowrap">
                        {t.lv.limit} {r.limit}
                      </td>
                      <td className="text-right text-xs text-muted py-1 pl-3 tabular whitespace-nowrap">{g.as_of[r.p] ? fmtClock(g.as_of[r.p] as number) : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-muted mt-1">
              {t.lv.lastSeen}: <span className="tabular">{g.last_seen ? fmtClock(g.last_seen) : t.lv.never}</span> · {g.idols_per_h} {t.lv.idolsH} · {t.lv.total} <span className="tabular">{g.idols_total}</span>
            </p>
          </section>
          <section>
            <h3 className="label-caps">{t.lv.chart}</h3>
            {g.sensor === "none" && !(series?.DO.length) ? (
              <p className="text-sm text-nodata border border-dashed border-nodata/60 rounded p-3 mt-2">{t.lv.sensor.none}</p>
            ) : (
              <>
                <MiniChart title="DO" unit="mg/l" pts={series?.DO ?? []} now={data.t} limit={5} limitMode="min" markers={markers} />
                <MiniChart title="BOD" unit="mg/l" pts={series?.BOD ?? []} now={data.t} limit={3} limitMode="max" markers={markers} />
                <MiniChart title="Turbidity" unit="NTU" pts={series?.turbidity ?? []} now={data.t} limit={null} limitMode="max" markers={markers} />
                {markers.length > 0 && (
                  <p className="text-xs text-muted mt-1">
                    <span className="text-accent">┊</span> {t.lv.intervention}
                  </p>
                )}
              </>
            )}
          </section>
          <section>
            <h3 className="label-caps mb-2">{t.lv.quick}</h3>
            <div className="flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button key={k} type="button" className="rounded bg-accent text-paper px-3 py-1.5 text-sm font-semibold" onClick={() => send(k, g.slug)}>
                  {t.lv.send(t.lv.kind[k])}
                </button>
              ))}
            </div>
            {msg && (
              <p className={clsx("mt-2 text-sm", msg.ok ? "text-low" : "text-medium")} role="status">
                {msg.text}
              </p>
            )}
            {res.length > 0 && (
              <ul className="mt-2 text-sm text-muted">
                {res.map((r) => (
                  <li key={r.id}>
                    {r.name[lang]}: {t.lv.resStatus[r.status]}
                    {r.eta_min !== null ? `, ${t.lv.min(Math.round(r.eta_min))}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </section>
          {alerts.length > 0 && (
            <section>
              <h3 className="label-caps mb-2">{t.lv.alerts}</h3>
              <ul className="space-y-2">
                {alerts.map((a) => (
                  <AlertRow key={a.id} a={a} compact />
                ))}
              </ul>
            </section>
          )}
          <section className="text-sm space-y-1">
            <p>
              <span className="text-muted">{t.lv.pBreach}: </span>
              <span className="tabular font-semibold text-ink">{g.p_breach !== null ? `${Math.round(g.p_breach * 100)}%` : "—"}</span>{" "}
              <span className="text-xs text-muted">({t.lv.pBreachNote})</span>
            </p>
            <p>
              <span className="text-muted">{t.lv.initialSource}: </span>
              <span className="text-ink">{g.initial_source[lang]}</span>
            </p>
          </section>
          <section className="flex flex-wrap gap-3 text-sm pb-6">
            <Link href={`/ghat/${g.slug}`} className="text-link underline">
              {t.lv.evidence}
            </Link>
            <Link href="/whatif" className="text-link underline">
              {t.lv.whatif}
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
