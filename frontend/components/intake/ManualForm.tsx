"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import { paramName } from "@/lib/i18n";
import { ix } from "@/lib/intakeI18n";
import { PARAM_UNIT, PARAMS_13, type IntakeFestival, type ManualReq } from "@/lib/intakeTypes";
import type { Phase } from "@/lib/types";
import { GHATS, btnPrimary, input } from "./shared";

type CellFlag = "" | "BDL" | "not sampled";

export function ManualForm({ onSubmit, busy }: { onSubmit(req: ManualReq): void; busy: boolean }) {
  const { lang, t } = useLang();
  const x = ix[lang];
  const [slug, setSlug] = useState<string>("shahpura");
  const [newName, setNewName] = useState("");
  const [year, setYear] = useState(2026);
  const [festival, setFestival] = useState<IntakeFestival>("Durga");
  const [phase, setPhase] = useState<Phase>("pre");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<string, CellFlag>>({});
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const readings: ManualReq["readings"] = {};
    for (const p of PARAMS_13) {
      const f = flags[p] ?? "";
      const v = (vals[p] ?? "").trim().replace(",", ".");
      if (f) readings[p] = { value: null, flag: f };
      else if (v !== "" && Number.isFinite(Number(v))) readings[p] = { value: Number(v), flag: null };
    }
    if (Object.keys(readings).length === 0) {
      setErr(x.needOne);
      return;
    }
    const isNew = slug === "";
    if (isNew && !newName.trim()) {
      setErr(x.newSiteName);
      return;
    }
    setErr(null);
    onSubmit({
      year,
      festival,
      phase,
      site: { slug: isNew ? null : slug, name: isNew ? newName.trim() : GHATS.find((g) => g.slug === slug)?.name.en ?? slug },
      readings,
      source_note: note,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm sm:col-span-2">
          <span className="block text-xs text-muted mb-0.5">{x.ghat}</span>
          <select className={`${input} w-full`} value={slug} onChange={(e) => setSlug(e.target.value)}>
            {GHATS.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.name[lang]}
              </option>
            ))}
            <option value="">{x.newSite}</option>
          </select>
        </label>
        {slug === "" && (
          <label className="text-sm sm:col-span-2">
            <span className="block text-xs text-muted mb-0.5">{x.newSiteName}</span>
            <input className={`${input} w-full`} value={newName} onChange={(e) => setNewName(e.target.value)} />
          </label>
        )}
        <label className="text-sm">
          <span className="block text-xs text-muted mb-0.5">{x.year}</span>
          <input type="number" min={2020} max={2030} className={`${input} w-full tabular`} value={year} onChange={(e) => setYear(Number(e.target.value) || 2026)} />
        </label>
        <label className="text-sm">
          <span className="block text-xs text-muted mb-0.5">{x.festival}</span>
          <select className={`${input} w-full`} value={festival} onChange={(e) => setFestival(e.target.value as IntakeFestival)}>
            <option value="Durga">{t.festival.Durga}</option>
            <option value="Ganesh">{t.festival.Ganesh}</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="block text-xs text-muted mb-0.5">{x.phase}</span>
          <select className={`${input} w-full`} value={phase} onChange={(e) => setPhase(e.target.value as Phase)}>
            {(["pre", "during", "after"] as Phase[]).map((p) => (
              <option key={p} value={p}>
                {t.phaseLong[p]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
        {PARAMS_13.map((p) => {
          const f = flags[p] ?? "";
          return (
            <div key={p} className="flex items-center gap-2 text-sm">
              <label htmlFor={`mf-${p}`} className="w-36 shrink-0 text-ink">
                {paramName(t, p)}
              </label>
              <input
                id={`mf-${p}`}
                inputMode="decimal"
                className={`${input} w-20 tabular`}
                value={f ? "" : vals[p] ?? ""}
                disabled={!!f}
                onChange={(e) => setVals((v) => ({ ...v, [p]: e.target.value }))}
              />
              <span className="w-12 text-xs text-muted">{PARAM_UNIT[p]}</span>
              <select
                aria-label={`${paramName(t, p)}: ${x.bdlToggle}`}
                className={`${input} text-xs`}
                value={f}
                onChange={(e) => setFlags((v) => ({ ...v, [p]: e.target.value as CellFlag }))}
              >
                <option value="">—</option>
                <option value="BDL">BDL</option>
                <option value="not sampled">{t.notSampled}</option>
              </select>
            </div>
          );
        })}
      </div>
      <label className="block text-sm">
        <span className="block text-xs text-muted mb-0.5">{x.sourceNote}</span>
        <input className={`${input} w-full`} placeholder={x.sourceNotePh} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      {err && (
        <p className="text-sm text-medium" role="alert">
          {err}
        </p>
      )}
      <button type="submit" className={btnPrimary} disabled={busy}>
        {busy ? x.working : x.submitManual}
      </button>
    </form>
  );
}
