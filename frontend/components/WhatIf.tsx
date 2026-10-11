"use client";

import { useState } from "react";
import { fetchGhat, fetchRanking, postWhatIf } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { paramName } from "@/lib/i18n";
import { scoreGhat, scoreNewSite } from "@/lib/score";
import { useLive } from "@/lib/useLive";
import type { Forecast, PreReadings, Ranking, Reason, Tier } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { ScoreBar } from "./ScoreBar";
import { ForecastPanel } from "./ForecastPanel";
import { ReasonLine } from "./ReasonLine";
import { LoadState } from "./LoadState";

const FIELDS: { key: keyof PreReadings; label: string; unit: string; step: string }[] = [
  { key: "pH", label: "pH", unit: "", step: "0.01" },
  { key: "DO", label: "Dissolved oxygen", unit: "mg/l", step: "0.1" },
  { key: "BOD", label: "BOD", unit: "mg/l", step: "0.1" },
  { key: "COD", label: "COD", unit: "mg/l", step: "0.1" },
  { key: "TDS", label: "Dissolved solids", unit: "mg/l", step: "1" },
  { key: "turbidity", label: "Turbidity", unit: "NTU", step: "0.1" },
  { key: "conductivity", label: "Conductivity", unit: "µS/cm", step: "1" },
];
const NEW = "__new__";

interface Result {
  score: number;
  tier: Tier;
  forecast: Forecast | null;
  reasons: Reason[];
  live: boolean;
  driver: string | null;
}

export function WhatIf({ initial }: { initial: Ranking | null }) {
  const { lang, t } = useLang();
  const { data, error } = useLive(fetchRanking, initial);
  const [slug, setSlug] = useState<string>("");
  const [name, setName] = useState("");
  const [water, setWater] = useState("");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [res, setRes] = useState<Result | null>(null);

  if (!data) return <LoadState error={error} />;
  const selected = slug || data.ghats[0]?.slug || NEW;
  const isNew = selected === NEW;
  const current = data.ghats.find((g) => g.slug === selected);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pre: PreReadings = {};
    for (const f of FIELDS) {
      const v = vals[f.key];
      if (v !== undefined && v.trim() !== "" && Number.isFinite(Number(v))) pre[f.key] = Number(v);
    }
    if (Object.keys(pre).length === 0) {
      setMsg(t.noInput);
      return;
    }
    setMsg(null);
    setBusy(true);
    try {
      const body = isNew ? { new_site: { name: name || "New ghat", water_body: water || "" }, pre } : { slug: selected, pre };
      const r = await postWhatIf(body);
      setRes({ score: r.score_with_2026, tier: r.tier, forecast: r.forecast, reasons: r.reasons ?? [], live: true, driver: null });
    } catch {
      let s;
      if (isNew) s = scoreNewSite(pre);
      else {
        const detail = await fetchGhat(selected).catch(() => null);
        s = scoreGhat(detail?.data.readings ?? [], pre);
      }
      setRes({ score: s.score, tier: s.tier, forecast: null, reasons: [], live: false, driver: s.driver });
    } finally {
      setBusy(false);
    }
  };

  const explain = () => {
    if (!res) return null;
    const b = res.score.toFixed(2);
    const parts: string[] = [];
    if (current && !isNew) {
      const a = current.score.toFixed(2);
      parts.push(res.score > current.score + 0.005 ? t.movedUp(a, b) : res.score < current.score - 0.005 ? t.movedDown(a, b) : t.movedNone(a));
    }
    if (res.driver) parts.push(t.drivenBy(paramName(t, res.driver)));
    return parts.join(" ");
  };

  const input = "w-full rounded border border-ink/60 px-3 py-2 text-base bg-paper";

  return (
    <div className="pt-6">
      <h1 className="text-[1.6rem] font-bold leading-tight">{t.whatifTitle}</h1>
      <p className="text-muted mt-1">{t.whatifNote}</p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="block">
          <span className="block font-semibold mb-1">{t.ghat}</span>
          <select className={input} value={selected} onChange={(e) => { setSlug(e.target.value); setRes(null); }}>
            {data.ghats.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.name[lang]}
              </option>
            ))}
            <option value={NEW}>{t.newGhat}</option>
          </select>
        </label>
        {isNew && (
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block font-semibold mb-1">{t.newName}</span>
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block">
              <span className="block font-semibold mb-1">{t.newWater}</span>
              <input className={input} value={water} onChange={(e) => setWater(e.target.value)} />
            </label>
          </div>
        )}
        <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="block text-[0.95rem] font-semibold mb-1">
                {f.key === "DO" ? "DO" : paramName(t, f.label)} {f.unit && <span className="text-muted font-normal text-sm">({f.unit})</span>}
              </span>
              <input
                className={input + " tabular"}
                type="number"
                inputMode="decimal"
                step={f.step}
                min={0}
                value={vals[f.key] ?? ""}
                onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
              />
            </label>
          ))}
        </fieldset>
        {msg && <p className="text-high font-semibold">{msg}</p>}
        <button type="submit" disabled={busy} className="rounded bg-accent text-white px-5 py-2.5 font-semibold disabled:opacity-60">
          {busy ? t.working : t.calculate}
        </button>
      </form>

      {res && (
        <section className="mt-8" aria-live="polite">
          <p className="text-lg font-semibold">{explain()}</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {!isNew && current && (
              <div className="border border-rule rounded-md p-4">
                <h2 className="font-bold mb-2">{t.current}</h2>
                <TierBadge tier={current.tier} />
                <p className="mt-2 text-sm tabular">
                  {t.score} <b>{current.score.toFixed(2)}</b>
                </p>
                <ScoreBar score={current.score} tier={current.tier} label={t.score} />
                <div className="mt-3">
                  <ForecastPanel forecast={current.forecast} compact />
                </div>
              </div>
            )}
            <div className="border-2 border-accent rounded-md p-4">
              <h2 className="font-bold mb-2">{isNew ? `${name || t.newGhat} · ${t.only2026}` : t.with2026}</h2>
              <TierBadge tier={res.tier} />
              <p className="mt-2 text-sm tabular">
                {t.score} <b>{res.score.toFixed(2)}</b>
              </p>
              <ScoreBar score={res.score} tier={res.tier} label={t.score} />
              <div className="mt-3">{res.live ? <ForecastPanel forecast={res.forecast ?? undefined} compact /> : <p className="text-sm text-muted">{t.forecastOff}</p>}</div>
            </div>
          </div>
          {res.reasons.length > 0 && (
            <ul className="mt-4 space-y-2">
              {res.reasons.slice(0, 4).map((r, i) => (
                <ReasonLine key={i} reason={r} />
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
