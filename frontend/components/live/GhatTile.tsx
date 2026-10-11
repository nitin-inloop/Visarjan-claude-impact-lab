"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { fmtNum, TIER_CHIP, TIER_ICON, TIER_ORDER, TIER_TEXT } from "@/lib/liveFormat";
import type { GhatLive, LiveTier, Point } from "@/lib/liveTypes";
import { useUi } from "./CommandCenter";
import { SimBadge } from "./TopBar";

export function TierChip({ tier, className }: { tier: LiveTier; className?: string }) {
  const { t } = useLang();
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded px-1.5 py-px text-xs font-bold whitespace-nowrap", TIER_CHIP[tier], className)}>
      <span aria-hidden>{TIER_ICON[tier]}</span>
      {t.lv.tier[tier]}
    </span>
  );
}

export function SensorBadge({ s }: { s: GhatLive["sensor"] }) {
  const { t } = useLang();
  const icon = s === "live" ? "●" : s === "stale" ? "◐" : "○";
  return (
    <span className={clsx("inline-flex items-center gap-1 text-xs whitespace-nowrap", s === "live" ? "text-low" : s === "stale" ? "text-medium" : "text-nodata")}>
      <span aria-hidden>{icon}</span>
      {t.lv.sensor[s]}
    </span>
  );
}

/** 60-min DO sparkline with the 5 mg/l line. */
function DoSpark({ pts, now }: { pts: Point[]; now: number }) {
  const W = 200;
  const H = 40;
  const from = now - 60 * 60_000;
  const p = pts.filter((x) => x[0] >= from);
  const max = Math.max(8, ...p.map((x) => x[1]));
  const x = (tt: number) => ((tt - from) / (60 * 60_000)) * W;
  const y = (v: number) => H - 2 - (v / max) * (H - 4);
  const d = p.map((pt, i) => `${i ? "L" : "M"}${x(pt[0]).toFixed(1)},${y(pt[1]).toFixed(1)}`).join("");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-10" preserveAspectRatio="none" aria-hidden>
      <line x1={0} x2={W} y1={y(5)} y2={y(5)} stroke="var(--critical)" strokeWidth={1} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
      {d && <path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />}
    </svg>
  );
}

function Arrow({ slope }: { slope: number | null }) {
  if (slope === null) return null;
  const a = slope <= -0.5 ? "↓" : slope >= 0.5 ? "↑" : "→";
  return (
    <span className={clsx("text-xl", slope <= -0.5 ? "text-critical" : slope >= 0.5 ? "text-low" : "text-muted")} aria-hidden>
      {a}
    </span>
  );
}

export function GhatTile({ g }: { g: GhatLive }) {
  const { t, lang } = useLang();
  const { data } = useLiveStore();
  const { select, selected, ranking } = useUi();
  const other = lang === "en" ? "hi" : "en";
  const wb = ranking?.ghats.find((r) => r.slug === g.slug)?.water_body_name?.[lang] ?? g.water_body;
  const DO = g.windows.DO?.mean_5 ?? g.values.DO;
  const slope = g.windows.DO?.slope_per_h ?? null;
  const noData = g.sensor !== "live" && g.live_tier === "no_data";
  const res = (data?.resources ?? []).filter((r) => g.resources_on_site.includes(r.id));
  const openN = (data?.alerts ?? []).filter((a) => a.ghat === g.slug && a.state === "open").length;
  const etaText =
    DO !== null && DO < 5 ? t.lv.etaBelow : g.eta.do_5 !== null && g.eta.do_5 <= 240 ? t.lv.eta(g.eta.do_5) : DO !== null ? t.lv.etaSteady : null;
  return (
    <button
      type="button"
      onClick={() => select(g.slug)}
      aria-pressed={selected === g.slug}
      className={clsx(
        "group text-left w-full h-full rounded-md bg-surface p-3 flex flex-col gap-2 transition-colors hover:bg-raised",
        noData ? "border-2 border-dashed border-nodata/70" : "border border-rule",
        selected === g.slug && "!border-accent ring-1 ring-accent",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ink leading-snug">{g.name[lang].split(" /")[0]}</div>
          <div lang={other} className="text-xs text-muted leading-snug truncate">
            {g.name[other].split(" /")[0]}
          </div>
        </div>
        <SimBadge />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <span>{wb}</span>
        {g.ngt_lake_ban && <span className="rounded border border-rule px-1 text-muted">{t.lv.ngt}</span>}
        <span className="ml-auto">
          <SensorBadge s={g.sensor} />
        </span>
      </div>
      <div>
        <TierChip tier={g.live_tier} />
        <p className={clsx("text-xs mt-1 leading-snug", TIER_TEXT[g.live_tier])}>{g.tier_note[lang]}</p>
      </div>
      <div className="flex items-end gap-2">
        <div>
          <div className="label-caps">DO</div>
          <div className={clsx("text-[2.4rem] leading-none font-semibold tabular", DO === null ? "text-nodata" : DO < 5 ? "text-critical" : "text-ink")}>
            {DO === null ? "—" : fmtNum(DO)}
          </div>
        </div>
        <div className="pb-1 text-xs text-muted">
          mg/l
          <div className="flex items-center gap-1">
            <Arrow slope={slope} />
            <span className="tabular">{slope !== null ? `${slope > 0 ? "+" : ""}${fmtNum(slope)}${t.lv.perH}` : ""}</span>
          </div>
        </div>
      </div>
      {g.sensor !== "none" ? (
        <DoSpark pts={data?.series[g.slug]?.DO ?? []} now={data?.t ?? 0} />
      ) : (
        <div className="h-10 flex items-center text-xs text-nodata border border-dashed border-nodata/50 rounded px-2">{t.lv.sensor.none}</div>
      )}
      <dl className="grid grid-cols-3 gap-1 text-xs">
        <div className="col-span-3 flex justify-between gap-2">
          <dt className="text-muted">BOD</dt>
          <dd className={clsx("tabular text-right", g.values.BOD === null ? "text-muted" : g.values.BOD > 3 ? "text-high font-semibold" : "text-ink")}>
            {g.values.BOD === null ? t.lv.awaitingLab : `${fmtNum(g.values.BOD)} mg/l`}
          </dd>
        </div>
        <div>
          <dt className="text-muted">pH</dt>
          <dd className="tabular text-ink">{fmtNum(g.values.pH, 2)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted">NTU</dt>
          <dd className="tabular text-ink">{fmtNum(g.values.turbidity)}</dd>
        </div>
      </dl>
      {etaText && <p className={clsx("text-xs", (g.eta.do_5 !== null && g.eta.do_5 <= 240) || (DO !== null && DO < 5) ? "text-high" : "text-muted")}>{etaText}</p>}
      <div className="mt-auto pt-1 border-t border-rule flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="tabular">
          {g.idols_per_h} {t.lv.idolsH}
        </span>
        {res.length > 0 && (
          <span className="text-accent">
            {res.map((r) => t.lv.kind[r.kind]).join(", ")} {t.lv.onSite}
          </span>
        )}
        {openN > 0 && (
          <span className="ml-auto rounded bg-raised px-1.5 text-ink tabular">
            {t.lv.alerts}: {openN}
          </span>
        )}
      </div>
    </button>
  );
}

export function GhatStrip() {
  const { data } = useLiveStore();
  if (!data) return <div className="h-64 rounded-md border border-rule bg-surface animate-pulse" aria-busy="true" />;
  const gs = Object.values(data.ghats).sort((a, b) => TIER_ORDER.indexOf(a.live_tier) - TIER_ORDER.indexOf(b.live_tier) || (a.windows.DO?.mean_5 ?? 99) - (b.windows.DO?.mean_5 ?? 99));
  return (
    <ul className="grid gap-3 grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
      {gs.map((g) => (
        <li key={g.slug} className="min-w-0">
          <GhatTile g={g} />
        </li>
      ))}
    </ul>
  );
}
