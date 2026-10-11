"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { IntakeClient } from "@/lib/intakeApi";
import type { AcceptedRes } from "@/lib/intakeTypes";
import { btn, ghatName } from "./shared";

const when = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
};

export function AcceptedList({ client, version, onChanged }: { client: IntakeClient; version: number; onChanged?: () => void }) {
  const { lang, t } = useLang();
  const x = ix[lang];
  const [data, setData] = useState<AcceptedRes | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(() => {
    client
      .accepted()
      .then(setData)
      .catch(() => setData({ rows: 0, groups: [] }));
  }, [client]);

  useEffect(() => {
    load();
  }, [load, version]);

  const remove = async (jobId: string) => {
    setBusy(jobId);
    try {
      await client.removeAccepted(jobId);
      onChanged?.();
    } finally {
      setBusy(null);
      load();
    }
  };

  return (
    <section aria-label={x.accepted}>
      <h3 className="text-sm font-bold text-ink mb-2">
        {x.accepted} {data && data.rows > 0 && <span className="text-muted font-normal tabular">({x.rows(data.rows)})</span>}
      </h3>
      {!data ? (
        <p className="text-sm text-muted">{t.loading}</p>
      ) : data.groups.length === 0 ? (
        <p className="text-sm text-muted">{x.acceptedNone}</p>
      ) : (
        <ul className="space-y-1.5">
          {data.groups.map((g, i) => (
            <li key={`${g.job_id}-${g.slug ?? g.site_name}-${i}`} className="rounded border border-rule bg-surface px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-ink">{ghatName(g.slug, lang) ?? g.site_name}</span>
              <span className="text-muted">
                {t.festival[g.festival] ?? g.festival} {g.year} · {g.phases.map((p) => t.phase[p as "pre"] ?? p).join(", ")} · {x.rows(g.rows)}
              </span>
              <span className="text-xs text-muted">
                {x.source}: {g.source_file} · {x.acceptedAt} {when(g.accepted_at)}
              </span>
              <button type="button" className={`${btn} ml-auto`} disabled={busy === g.job_id} onClick={() => remove(g.job_id)}>
                {x.remove}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
