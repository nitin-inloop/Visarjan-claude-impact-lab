"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtClock } from "@/lib/liveFormat";
import type { CalibrationRes, ResourceKind } from "@/lib/liveTypes";
import type { Allocation, Leaderboard, Ranking } from "@/lib/types";
import { ActionSheet } from "@/components/ActionSheet";
import { ModelsView } from "@/components/ModelsView";
import { useUi, type TabId } from "./CommandCenter";
import { SimBadge } from "./TopBar";

const TABS: TabId[] = ["plan", "dispatch", "sitrep", "models"];
const small = "rounded border border-rule bg-surface px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent";

export function useDispatch() {
  const { api } = useLiveStore();
  const { lang, t } = useLang();
  const { data } = useLiveStore();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const send = async (kind: ResourceKind, ghat: string) => {
    try {
      const r = await api.dispatch({ kind, ghat });
      if (r.ok && r.order) {
        const gname = data?.ghats[ghat]?.name[lang].split(" /")[0] ?? ghat;
        setMsg({ ok: true, text: t.lv.dispatched(t.lv.kind[kind], gname, r.order.eta_min) });
      } else setMsg({ ok: false, text: r.error?.[lang] ?? "—" });
    } catch {
      setMsg({ ok: false, text: t.lv.conn.offline });
    }
  };
  return { send, msg };
}

function DispatchTab() {
  const { t, lang } = useLang();
  const { data } = useLiveStore();
  const { select } = useUi();
  const { send, msg } = useDispatch();
  if (!data) return null;
  const gname = (s: string | null) => (s === null ? "" : s === "depot" ? t.lv.depot : data.ghats[s]?.name[lang].split(" /")[0] ?? s);
  const events = [...data.events].reverse().slice(0, 60);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section>
        <h3 className="text-sm font-bold text-ink mb-2">{t.lv.suggestions}</h3>
        {msg && (
          <p className={clsx("mb-2 text-sm", msg.ok ? "text-low" : "text-medium")} role="status">
            {msg.text}
          </p>
        )}
        {data.suggestions.length === 0 ? (
          <p className="text-sm text-muted">{t.lv.noSuggestions}</p>
        ) : (
          <ol className="space-y-2">
            {data.suggestions.map((s) => (
              <li key={s.id} className="rounded border border-rule bg-surface p-3 flex gap-3 items-start">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink">
                    {t.lv.kind[s.kind]} → {gname(s.ghat)}
                  </div>
                  <p className="text-sm text-muted mt-0.5">{s.reason[lang]}</p>
                  <p className="text-xs text-muted tabular mt-1">
                    {t.lv.travel(Math.round(s.travel_min))} · {t.lv.gain} {s.q_gain.toFixed(2)}
                  </p>
                </div>
                <button type="button" className="rounded bg-accent text-paper px-3 py-1 text-sm font-semibold" onClick={() => send(s.kind, s.ghat)}>
                  {t.lv.apply}
                </button>
              </li>
            ))}
          </ol>
        )}
        <h3 className="text-sm font-bold text-ink mt-5 mb-2">{t.lv.resources}</h3>
        <div className="overflow-x-auto rounded border border-rule">
          <table className="w-full text-sm">
            <thead className="bg-surface text-muted text-xs">
              <tr>
                <th className="text-left px-2 py-1.5">{t.lv.unit}</th>
                <th className="text-left px-2 py-1.5">{t.lv.status}</th>
                <th className="text-left px-2 py-1.5">{t.lv.location}</th>
                <th className="text-right px-2 py-1.5">{t.lv.etaCol}</th>
              </tr>
            </thead>
            <tbody>
              {data.resources.map((r) => (
                <tr key={r.id} className="border-t border-rule">
                  <td className="px-2 py-1.5 text-ink">{r.name[lang]}</td>
                  <td className={clsx("px-2 py-1.5", r.status === "idle" ? "text-muted" : r.status === "en_route" ? "text-medium" : "text-low")}>{t.lv.resStatus[r.status]}</td>
                  <td className="px-2 py-1.5">
                    {r.status === "en_route" && r.target ? (
                      <button type="button" className="text-link hover:underline" onClick={() => select(r.target)}>
                        → {gname(r.target)}
                      </button>
                    ) : r.at !== "depot" ? (
                      <button type="button" className="text-link hover:underline" onClick={() => select(r.at)}>
                        {gname(r.at)}
                      </button>
                    ) : (
                      <span className="text-muted">{t.lv.depot}</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5 text-right tabular text-ink">{r.eta_min !== null ? t.lv.min(Math.round(r.eta_min)) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h3 className="text-sm font-bold text-ink mb-2">{t.lv.actionLog}</h3>
        {events.length === 0 ? (
          <p className="text-sm text-muted">{t.lv.noEvents}</p>
        ) : (
          <ol className="space-y-1 text-sm max-h-[32rem] overflow-y-auto pr-1">
            {events.map((e) => (
              <li key={e.id} className="flex gap-2 border-b border-rule py-1">
                <span className="tabular text-muted text-xs pt-0.5 w-11 shrink-0">{fmtClock(e.t)}</span>
                <span className="text-xs uppercase tracking-wide text-muted pt-0.5 w-16 shrink-0">{e.kind}</span>
                <span className="text-ink">{e.text[lang]}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function SitrepTab() {
  const { t, lang } = useLang();
  const { sitrep, refreshSitrep } = useLiveStore();
  const { voiceApi } = useUi();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!sitrep) refreshSitrep();
  }, [sitrep, refreshSitrep]);
  const print = () => {
    document.body.dataset.print = "sitrep";
    const done = () => {
      delete document.body.dataset.print;
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  };
  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-2 mb-3 no-print">
        <h3 className="text-sm font-bold text-ink mr-2">{t.lv.sitrepTitle}</h3>
        <SimBadge />
        <span className="text-xs text-muted tabular">{sitrep ? fmtClock(sitrep.t) : ""}</span>
        <div className="ml-auto flex gap-1.5">
          <button type="button" className={small} disabled={!sitrep} onClick={() => sitrep && voiceApi.say(sitrep.speak)}>
            {t.lv.speak}
          </button>
          <button
            type="button"
            className={small}
            disabled={!sitrep}
            onClick={() => {
              if (!sitrep) return;
              navigator.clipboard
                ?.writeText(sitrep.markdown[lang])
                .then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                })
                .catch(() => undefined);
            }}
          >
            {copied ? t.lv.copied : t.lv.copy}
          </button>
          <button type="button" className={small} onClick={print}>
            {t.lv.print}
          </button>
        </div>
      </div>
      <article className="memo rounded border border-rule bg-surface p-4 text-[0.95rem]" lang={lang}>
        {sitrep ? <ReactMarkdown>{sitrep.markdown[lang]}</ReactMarkdown> : <p className="text-muted">{t.loading}</p>}
      </article>
      <p className="mt-3 text-sm no-print">
        <Link href="/brief" className="text-link">
          {t.lv.histBrief}
        </Link>
      </p>
    </div>
  );
}

type Row = Record<string, unknown>;

const cell = (v: unknown) => (typeof v === "number" ? (Number.isInteger(v) ? String(v) : v.toFixed(2)) : v === null || v === undefined ? "—" : String(v));

/** Flatten one level of nesting: {observed:{DO:1}} -> {"observed DO":1}. */
function flatten(r: Row): Row {
  const out: Row = {};
  for (const [k, v] of Object.entries(r)) {
    if (v && typeof v === "object" && !Array.isArray(v)) for (const [k2, v2] of Object.entries(v as Row)) out[`${k} ${k2}`] = typeof v2 === "object" ? JSON.stringify(v2) : v2;
    else out[k] = Array.isArray(v) ? v.join(", ") : v;
  }
  return out;
}

function CalibrationTable() {
  const { t } = useLang();
  const { api } = useLiveStore();
  const [cal, setCal] = useState<CalibrationRes | null>(null);
  useEffect(() => {
    let alive = true;
    api
      .calibration()
      .then((c) => alive && setCal(c))
      .catch(() => alive && setCal({ available: false }));
    return () => {
      alive = false;
    };
  }, [api]);
  const c = cal as Row | null;
  const available = c && c.available !== false;
  const rawRows = available ? ((Object.values(c).find((v) => Array.isArray(v) && v.length && typeof v[0] === "object") as Row[] | undefined) ?? null) : null;
  const rows = rawRows ? rawRows.map(flatten) : null;
  const notes = available
    ? Object.entries(c)
        .filter(([k, v]) => k !== "available" && !Array.isArray(v) && v !== null && v !== undefined)
        .map(([k, v]) => [k, typeof v === "object" ? Object.entries(flatten(v as Row)).map(([a, b]) => `${a} ${cell(b)}`).join(", ") : v] as [string, unknown])
    : [];
  const cols = rows ? [...new Set(rows.flatMap((r) => Object.keys(r)))] : [];
  return (
    <section className="max-w-4xl mt-8">
      <h3 className="text-lg font-bold text-ink mb-1">
        {t.lv.calibration} <SimBadge className="align-middle" />
      </h3>
      {!available ? (
        <p className="text-sm text-muted">{cal ? t.lv.calibNa : t.loading}</p>
      ) : (
        <>
          {notes.length > 0 && (
            <ul className="text-sm text-muted mb-2">
              {notes.map(([k, v]) => (
                <li key={k}>
                  <span className="text-ink">{k}</span>: {cell(v)}
                </li>
              ))}
            </ul>
          )}
          {rows ? (
            <div className="overflow-x-auto rounded border border-rule">
              <table className="w-full text-sm">
                <thead className="bg-surface text-xs text-muted">
                  <tr>
                    {cols.map((k) => (
                      <th key={k} className="px-2 py-1.5 text-left whitespace-nowrap">
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-rule">
                      {cols.map((k) => (
                        <td key={k} className="px-2 py-1.5 tabular text-ink whitespace-nowrap">
                          {cell(r[k])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <pre className="text-xs text-muted overflow-x-auto">{JSON.stringify(cal, null, 2)}</pre>
          )}
        </>
      )}
    </section>
  );
}

export function Tabs({ initialRanking, initialLb, initialAlloc }: { initialRanking: Ranking | null; initialLb: Leaderboard | null; initialAlloc: Allocation | null }) {
  const { t } = useLang();
  const { tab, setTab } = useUi();
  return (
    <section id="cc-tabs" className="rounded-md border border-rule bg-paper/70 scroll-mt-28">
      <div role="tablist" aria-label="Views" className="no-print flex gap-1 overflow-x-auto border-b border-rule px-2">
        {TABS.map((x) => (
          <button
            key={x}
            role="tab"
            id={`tab-${x}`}
            aria-selected={tab === x}
            aria-controls={`panel-${x}`}
            onClick={() => setTab(x)}
            onKeyDown={(e) => {
              const i = TABS.indexOf(x);
              if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length]);
              if (e.key === "ArrowLeft") setTab(TABS[(i + TABS.length - 1) % TABS.length]);
            }}
            className={clsx(
              "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px",
              tab === x ? "border-accent text-ink font-semibold" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {t.lv.tabs[x]}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="p-3 sm:p-5">
        {tab === "plan" && (
          <div className="max-w-3xl">
            <ActionSheet initial={initialRanking} />
          </div>
        )}
        {tab === "dispatch" && <DispatchTab />}
        {tab === "sitrep" && <SitrepTab />}
        {tab === "models" && (
          <>
            <div className="max-w-3xl">
              <ModelsView initialLb={initialLb} initialAlloc={initialAlloc} ranking={initialRanking} />
            </div>
            <CalibrationTable />
          </>
        )}
      </div>
    </section>
  );
}
