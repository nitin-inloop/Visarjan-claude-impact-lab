"use client";

// Report intake (docs/PLAN-INTAKE.md §3): source → five processing agents → review → accept.
// Used by the command-center "Intake" tab and the classic /intake route.

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import { connectIntake, pollJob, type IntakeClient, type UploadOpts } from "@/lib/intakeApi";
import type { Capabilities, IntakeFestival, Job, ManualReq, Row } from "@/lib/intakeTypes";
import { CapabilitiesBanner } from "./CapabilitiesBanner";
import { SourceChooser } from "./SourceChooser";
import { StageTimeline } from "./StageTimeline";
import { ReviewTable } from "./ReviewTable";
import { IntakeResults } from "./IntakeResults";
import { AcceptedList } from "./AcceptedList";
import { btn, btnPrimary, input } from "./shared";

const JOB_KEY = "ghatwatch.intakeJob";
const remember = (id: string | null) => {
  try {
    if (id) sessionStorage.setItem(JOB_KEY, id);
    else sessionStorage.removeItem(JOB_KEY);
  } catch {
    /* private mode */
  }
};

export function IntakePanel({ onOpenPlan }: { onOpenPlan?: () => void }) {
  const { lang, t } = useLang();
  const x = ix[lang];
  const [client, setClient] = useState<IntakeClient | null>(null);
  const [caps, setCaps] = useState<Capabilities | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [pollKey, setPollKey] = useState(0);
  const [job, setJob] = useState<Job | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const dirty = useRef(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [acceptedV, setAcceptedV] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  const startUpload = useCallback(
    async (c: IntakeClient, file: File, opts: UploadOpts) => {
      setBusy(true);
      setMsg(null);
      setProgress(0);
      try {
        const r = await c.upload(file, opts, setProgress);
        dirty.current = false;
        setRows([]);
        setJob(null);
        setJobId(r.job_id);
        remember(r.job_id);
      } catch {
        setMsg({ ok: false, text: x.failed });
      } finally {
        setBusy(false);
        setProgress(null);
      }
    },
    [x.failed],
  );

  // Connect: real API if /api/intake/capabilities answers, otherwise the local mock.
  useEffect(() => {
    let alive = true;
    connectIntake().then(({ client: c, caps: k }) => {
      if (!alive) return;
      setClient(c);
      setCaps(k);
      // ?demo=1 starts a demo job (mock only) so the flow can be shown without a file.
      let stored: string | null = null;
      try {
        stored = sessionStorage.getItem(JOB_KEY);
      } catch {
        stored = null;
      }
      if (stored) {
        // Re-open the job from before a tab switch / reload (if the backend still knows it).
        c.job(stored)
          .then(() => alive && setJobId(stored))
          .catch(() => remember(null));
      } else if (c.kind === "mock" && new URLSearchParams(window.location.search).get("demo") === "1") {
        void startUpload(c, new File(["demo"], "mppcb_2025_p28.jpg", { type: "image/jpeg" }), {});
      }
    });
    return () => {
      alive = false;
    };
  }, [startUpload]);

  // Poll the job every 1.5 s while running.
  useEffect(() => {
    if (!client || !jobId) return;
    return pollJob(client, jobId, (j) => {
      setJob(j);
      if (!dirty.current) setRows(j.rows);
    });
  }, [client, jobId, pollKey]);

  const running = job?.status === "running";
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [running]);

  const onManual = async (req: ManualReq) => {
    if (!client) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await client.manual(req);
      dirty.current = false;
      setRows([]);
      setJob(null);
      setJobId(r.job_id);
      remember(r.job_id);
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };

  const editRows = (rs: Row[]) => {
    dirty.current = true;
    setRows(rs);
  };

  const setContext = (year: number, festival: IntakeFestival) => editRows(rows.map((r) => ({ ...r, year, festival })));

  const rerun = async () => {
    if (!client || !job) return;
    setBusy(true);
    setMsg(null);
    try {
      const j = await client.rerun(job.id, rows);
      dirty.current = false;
      setJob(j);
      setRows(j.rows);
      if (j.status === "running") setPollKey((k) => k + 1);
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };

  const accept = async () => {
    if (!client || !job) return;
    setBusy(true);
    try {
      const r = await client.accept(job.id, rows);
      setMsg({ ok: r.ok, text: x.acceptedMsg(r.accepted_rows, r.ranking_changed.length) });
      setJob({ ...job, status: "accepted" });
      setAcceptedV((v) => v + 1);
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };

  const reject = async () => {
    if (!client || !job) return;
    setBusy(true);
    try {
      await client.reject(job.id);
      setMsg({ ok: true, text: x.rejectedMsg });
      setJob({ ...job, status: "rejected" });
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    remember(null);
    setJobId(null);
    setJob(null);
    setRows([]);
    setMsg(null);
    dirty.current = false;
  };

  const ctxYear = rows[0]?.year ?? job?.context.year ?? 2026;
  const ctxFest = rows[0]?.festival ?? job?.context.festival ?? "Durga";
  const reviewable = job?.status === "needs_review";
  const q = job?.quality;

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-xl font-bold text-ink">{x.title}</h2>
        <p className="text-sm text-muted">{x.sub}</p>
        <CapabilitiesBanner caps={caps} kind={client?.kind ?? null} />
      </header>

      {!jobId ? (
        <SourceChooser caps={caps} busy={busy || !client} progress={progress} onUpload={(f, o) => client && startUpload(client, f, o)} onManual={onManual} />
      ) : (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-ink font-semibold">{job?.source.file_name ?? (job?.kind === "manual" ? x.manual : "…")}</span>
          {job && job.source.pages.length > 0 && <span className="text-muted tabular">{job.source.pages.map((p) => x.pageThumb(p)).join(", ")}</span>}
          <button type="button" className={`${btn} ml-auto`} onClick={reset}>
            {x.newJob}
          </button>
        </div>
      )}

      {job && <StageTimeline job={job} now={now} />}

      {job && rows.length > 0 && (
        <section aria-label={x.review} className="space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <h3 className="text-sm font-bold text-ink mr-auto">{x.review}</h3>
            <label className="text-xs">
              <span className="block text-muted">{x.year}</span>
              <input
                type="number"
                className={`${input} w-20 tabular`}
                value={ctxYear}
                disabled={!reviewable}
                onChange={(e) => setContext(Number(e.target.value) || ctxYear, ctxFest)}
              />
            </label>
            <label className="text-xs">
              <span className="block text-muted">{x.festival}</span>
              <select className={input} value={ctxFest} disabled={!reviewable} onChange={(e) => setContext(ctxYear, e.target.value as IntakeFestival)}>
                <option value="Ganesh">{t.festival.Ganesh}</option>
                <option value="Durga">{t.festival.Durga}</option>
              </select>
            </label>
            {job.kind === "upload" && <span className="text-xs text-muted pb-1">({x.detected})</span>}
          </div>
          {q && (
            <p className="text-xs text-muted tabular">
              {x.quality({ rows: q.rows, numeric: q.numeric, flagged: q.flagged, mean: q.mean_confidence, tables: q.tables_found, matched: q.sites_matched, unmatched: q.sites_unmatched })}
            </p>
          )}
          <ReviewTable job={job} rows={rows} onChange={editRows} pageUrl={(n) => (client ? client.pageUrl(job.id, n) : "")} readOnly={!reviewable} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={btn} disabled={!reviewable || busy} onClick={rerun}>
              {x.rerun}
            </button>
            <button type="button" className={btnPrimary} disabled={!reviewable || busy} onClick={accept}>
              {x.accept}
            </button>
            <button type="button" className={btn} disabled={!reviewable || busy} onClick={reject}>
              {x.reject}
            </button>
            {busy && <span className="text-sm text-muted">{x.working}</span>}
          </div>
        </section>
      )}

      {msg && (
        <p className={clsx("text-sm", msg.ok ? "text-low" : "text-medium")} role="status">
          {msg.text}
        </p>
      )}

      {job?.analysis && client && <IntakeResults job={job} client={client} onOpenPlan={onOpenPlan} />}

      {client && <AcceptedList client={client} version={acceptedV} />}
    </div>
  );
}
