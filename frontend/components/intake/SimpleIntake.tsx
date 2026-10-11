"use client";

// Simple report intake for the /intake route: one big upload button, progress in plain words,
// review shows only the rows that need attention, then what changed. Same API/mocks as IntakePanel
// (which stays in use inside the experimental live mode).

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiAnalysis } from "@/components/ai/AiAnalysis";
import { Card, CardTitle, Pill, type PillTone } from "@/components/dash/ui";
import { useLang } from "@/lib/lang";
import { connectIntake, pollJob, type IntakeClient } from "@/lib/intakeApi";
import type { Job, ManualReq, Row, Stage } from "@/lib/intakeTypes";
import { paramKey } from "@/lib/plain";
import type { Lang } from "@/lib/types";
import { ManualForm } from "./ManualForm";
import { ReviewTable } from "./ReviewTable";
import { ghatName } from "./shared";

const JOB_KEY = "ghatwatch.intakeJob";
const remember = (id: string | null) => {
  try {
    if (id) sessionStorage.setItem(JOB_KEY, id);
    else sessionStorage.removeItem(JOB_KEY);
  } catch {
    /* private mode */
  }
};

const T = {
  en: {
    title: "Upload a new test report",
    sub: "PDF or a clear photo of the table. We read the numbers. You check them. Then the ghat list updates.",
    upload: "Upload report (PDF or photo)",
    camera: "Take a photo",
    manual: "No file? Type the numbers by hand",
    sending: (p: number) => `Sending the report… ${p}%`,
    steps: ["Reading the report…", "Checking the numbers…", "Comparing with the limits…", "Done"],
    failed: "Something went wrong. Please try again, or type the numbers by hand.",
    badType: "Please choose a PDF, JPG or PNG file.",
    found: (n: number, m: number) => (m === 0 ? `We found ${n} numbers. All look fine.` : `We found ${n} numbers. ${m} need your check.`),
    attention: "Please check these",
    looksOk: "Nothing needs your attention.",
    allRows: (n: number) => `See all ${n} numbers`,
    siteUnclear: (n: number) => `${n} numbers. This is not one of our 7 ghats, so it will not change the list. To link it to a ghat, open “See all numbers”.`,
    lowConf: "Hard to read",
    needsCheck: "⚠ Needs checking: this value looks impossible, so it was not counted",
    heldBack: (n: number) => (n === 1 ? "1 value held back for checking." : `${n} values held back for checking.`),
    printed: "Printed as",
    willChange: "What will change",
    changed: "What changed",
    noChange: "No ghat changed its place in the list.",
    rank: (a: number, b: number) => (a === b ? `Stays at number ${a}` : `Moves from number ${a} to number ${b}`),
    accept: "Numbers are right — add to list",
    checkAgain: "Check again with my changes",
    reject: "Wrong report — throw away",
    working: "Working…",
    accepted: (n: number) => `Saved. ${n} numbers added. The ghat list is updated.`,
    rejected: "Thrown away. Nothing was added.",
    another: "Upload another report",
    back: "Back to the ghat list",
    file: "File",
    oxygen: "Oxygen",
    bod: "Waste (BOD)",
  },
  hi: {
    title: "नई जांच रिपोर्ट डालें",
    sub: "PDF या टेबल की साफ़ फ़ोटो डालें। हम नंबर पढ़ेंगे। आप जांच लें। फिर घाट सूची बदल जाएगी।",
    upload: "रिपोर्ट डालें (PDF या फ़ोटो)",
    camera: "फ़ोटो खींचें",
    manual: "फ़ाइल नहीं है? नंबर हाथ से भरें",
    sending: (p: number) => `रिपोर्ट भेज रहे हैं… ${p}%`,
    steps: ["रिपोर्ट पढ़ रहे हैं…", "नंबर जांच रहे हैं…", "सीमा से मिला रहे हैं…", "हो गया"],
    failed: "कुछ गड़बड़ हुई। फिर से कोशिश करें, या नंबर हाथ से भरें।",
    badType: "PDF, JPG या PNG फ़ाइल चुनें।",
    found: (n: number, m: number) => (m === 0 ? `${n} नंबर मिले। सब ठीक लग रहे हैं।` : `${n} नंबर मिले। ${m} को आप जांच लें।`),
    attention: "इन्हें जांच लें",
    looksOk: "कुछ भी जांचने की ज़रूरत नहीं।",
    allRows: (n: number) => `सभी ${n} नंबर देखें`,
    siteUnclear: (n: number) => `${n} नंबर। यह हमारे 7 घाटों में से नहीं है, इसलिए सूची नहीं बदलेगी। किसी घाट से जोड़ने के लिए “सभी नंबर देखें” खोलें।`,
    lowConf: "पढ़ने में मुश्किल",
    needsCheck: "⚠ जांच करें: यह नंबर सही नहीं लगता, इसलिए गिना नहीं गया",
    heldBack: (n: number) => `${n} नंबर जांच के लिए रोके गए।`,
    printed: "रिपोर्ट में लिखा",
    willChange: "क्या बदलेगा",
    changed: "क्या बदला",
    noChange: "किसी घाट का क्रम नहीं बदला।",
    rank: (a: number, b: number) => (a === b ? `${a} नंबर पर ही है` : `${a} नंबर से ${b} नंबर पर`),
    accept: "नंबर सही हैं — सूची में जोड़ें",
    checkAgain: "मेरे बदलाव के साथ फिर जांचें",
    reject: "गलत रिपोर्ट — हटा दें",
    working: "काम चल रहा है…",
    accepted: (n: number) => `सहेज लिया। ${n} नंबर जुड़े। घाट सूची बदल गई।`,
    rejected: "हटा दिया। कुछ नहीं जुड़ा।",
    another: "दूसरी रिपोर्ट डालें",
    back: "घाट सूची पर वापस",
    file: "फ़ाइल",
    oxygen: "ऑक्सीजन",
    bod: "गंदगी (BOD)",
  },
};

const OK_EXT = /\.(pdf|jpe?g|png)$/i;
const OK_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const siteUnclear = (r: Row) => r.slug === null || r.site_match_confidence < 0.8;

/** 0..3: which plain step is running; 4 = all done */
function stepOf(job: Job): number {
  const st = (k: Stage["key"]) => job.stages.find((s) => s.key === k)?.status;
  if (job.status !== "running") return 4;
  if (st("extract") !== "done" && st("extract") !== "skipped") return 0;
  if (st("normalize") === "running" || st("validate") === "running" || st("validate") === "pending") return 1;
  return 2;
}

export function SimpleIntake() {
  const { lang } = useLang();
  const x = T[lang];
  const [client, setClient] = useState<IntakeClient | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [pollKey, setPollKey] = useState(0);
  const [job, setJob] = useState<Job | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const dirty = useRef(false);
  const [edited, setEdited] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [manual, setManual] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  const startJob = useCallback((id: string) => {
    dirty.current = false;
    setEdited(false);
    setRows([]);
    setJob(null);
    setJobId(id);
    remember(id);
  }, []);

  useEffect(() => {
    let alive = true;
    connectIntake().then(({ client: c }) => {
      if (!alive) return;
      setClient(c);
      let stored: string | null = null;
      try {
        stored = sessionStorage.getItem(JOB_KEY);
      } catch {
        stored = null;
      }
      const deep = new URLSearchParams(window.location.search).get("job");
      if (deep && /^[\w-]{1,64}$/.test(deep)) stored = deep;
      if (stored) {
        const id = stored;
        c.job(id)
          .then(() => alive && setJobId(id))
          .catch(() => remember(null));
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!client || !jobId) return;
    return pollJob(client, jobId, (j) => {
      setJob(j);
      if (!dirty.current) setRows(j.rows);
    });
  }, [client, jobId, pollKey]);

  const upload = async (f: File | null | undefined) => {
    if (!f || !client) return;
    if (!OK_TYPES.includes(f.type) && !OK_EXT.test(f.name)) {
      setMsg({ ok: false, text: x.badType });
      return;
    }
    setBusy(true);
    setMsg(null);
    setProgress(0);
    try {
      const r = await client.upload(f, {}, setProgress);
      startJob(r.job_id);
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const onManual = async (req: ManualReq) => {
    if (!client) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await client.manual(req);
      startJob(r.job_id);
      setManual(false);
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };

  const editRows = (rs: Row[]) => {
    dirty.current = true;
    setEdited(true);
    setRows(rs);
  };

  const act = async (fn: () => Promise<void>) => {
    if (!client || !job) return;
    setBusy(true);
    setMsg(null);
    try {
      await fn();
    } catch {
      setMsg({ ok: false, text: x.failed });
    } finally {
      setBusy(false);
    }
  };
  const rerun = () =>
    act(async () => {
      const j = await client!.rerun(job!.id, rows);
      dirty.current = false;
      setEdited(false);
      setJob(j);
      setRows(j.rows);
      if (j.status === "running") setPollKey((k) => k + 1);
    });
  const accept = () =>
    act(async () => {
      const r = await client!.accept(job!.id, rows);
      setMsg({ ok: r.ok, text: x.accepted(r.accepted_rows) + (r.held_back ? ` ${x.heldBack(r.held_back)}` : "") });
      setJob({ ...job!, status: "accepted" });
    });
  const reject = () =>
    act(async () => {
      await client!.reject(job!.id);
      setMsg({ ok: true, text: x.rejected });
      setJob({ ...job!, status: "rejected" });
    });

  const reset = () => {
    remember(null);
    setJobId(null);
    setJob(null);
    setRows([]);
    setMsg(null);
    dirty.current = false;
    setEdited(false);
  };

  const reviewable = job?.status === "needs_review";
  const issueText = (r: Row) =>
    r.issues
      .map((id) => job?.issues.find((i) => i.id === id))
      .filter((i) => i && i.level !== "info")
      .map((i) => i!.text[lang]);
  // Number problems are shown one by one; an unclear ghat name is shown once per printed site.
  const flagged = rows.filter((r) => !siteUnclear(r) && (r.needs_review || r.confidence < 0.8 || issueText(r).length > 0));
  const unclearSites = [...new Set(rows.filter(siteUnclear).map((r) => r.site_as_printed))].map((site) => ({
    site,
    n: rows.filter((r) => siteUnclear(r) && r.site_as_printed === site).length,
  }));
  const nCheck = flagged.length + unclearSites.length;
  const done = job && job.status !== "running";

  const [drag, setDrag] = useState(false);
  const hi = lang === "hi";
  const dur = (s: Stage) => {
    if (!s.started || !s.finished) return null;
    const ms = new Date(s.finished).getTime() - new Date(s.started).getTime();
    return Number.isFinite(ms) && ms >= 0 ? (ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`) : null;
  };
  const DOT: Record<string, string> = {
    done: "bg-[var(--d-ink)] text-[var(--d-on-inv)]",
    running: "bg-[var(--d-card)] border-2 border-[var(--d-ink)] animate-pulse",
    failed: "bg-[var(--d-danger)] text-white",
    skipped: "bg-[var(--d-card)] border border-dashed border-[var(--d-muted2)]",
    pending: "bg-[var(--d-card)] border border-[var(--d-bar-light)]",
  };
  const STEP_NAMES = hi
    ? ["टेक्स्ट/OCR निकालना", "सामान्य करना", "जांचना", "विश्लेषण", "रिपोर्ट"]
    : ["Text/OCR extraction", "Normalise", "Validate", "Analyse", "Report"];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-[var(--d-ink)]">{x.title}</h1>
          <p className="mt-1 max-w-2xl text-[14px] text-[var(--d-muted)]">{x.sub}</p>
        </div>
        {jobId && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[13px] text-[var(--d-ink2)]">
              {x.file}: <b className="text-[var(--d-ink)]">{job?.source.file_name ?? "…"}</b>
              {job?.source.ocr_used && <span className="ml-2 text-[var(--d-muted)]">· OCR {job.source.ocr_engine ?? ""}</span>}
            </span>
            <button type="button" onClick={reset} className="rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[13px] font-medium text-[var(--d-ink)] hover:bg-[var(--d-page)]">
              ⬆ {x.another}
            </button>
          </div>
        )}
      </header>

      <div className="grid items-start gap-4 xl:grid-cols-[250px_minmax(0,1fr)_340px]">
        {/* Left: upload + pipeline */}
        <div className="space-y-4">
          <Card>
            <CardTitle>{hi ? "अपलोड" : "Upload"}</CardTitle>
            {!jobId ? (
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={busy || !client}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    upload(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center disabled:opacity-60 ${drag ? "border-[var(--d-ink)] bg-[var(--d-track)]" : "border-[var(--d-bar-light)] bg-[var(--d-card-alt)] hover:bg-[var(--d-page)]"}`}
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-[var(--d-ink2)]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                    <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
                  </svg>
                  <span className="text-[14px] font-semibold text-[var(--d-ink)]">{x.upload}</span>
                  <span className="text-[12px] text-[var(--d-muted)]">{hi ? "यहां खींचकर छोड़ें · PDF, JPG, PNG" : "Drag and drop here · PDF, JPG, PNG"}</span>
                </button>
                <button
                  type="button"
                  disabled={busy || !client}
                  onClick={() => camRef.current?.click()}
                  className="w-full rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[13px] font-medium text-[var(--d-ink)] hover:bg-[var(--d-page)] disabled:opacity-60"
                >
                  📷 {x.camera}
                </button>
                <input ref={fileRef} type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" className="sr-only" tabIndex={-1} onChange={(e) => upload(e.target.files?.[0])} />
                <input ref={camRef} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} onChange={(e) => upload(e.target.files?.[0])} />
                {progress !== null && (
                  <p className="text-[13px] font-semibold text-[var(--d-ink)]" role="status">
                    ⏳ {x.sending(progress)}
                  </p>
                )}
                <details open={manual} onToggle={(e) => setManual((e.target as HTMLDetailsElement).open)} className="rounded-xl border border-[var(--d-border)] p-3">
                  <summary className="cursor-pointer text-[13px] font-semibold text-[var(--d-ink)]">✍ {x.manual}</summary>
                  <div className="mt-3">
                    <ManualForm onSubmit={onManual} busy={busy} />
                  </div>
                </details>
              </div>
            ) : (
              <p className="text-[13px] text-[var(--d-ink2)]">
                {x.file}: <b>{job?.source.file_name ?? "…"}</b>
              </p>
            )}
          </Card>

          <Card>
            <CardTitle>{hi ? "प्रक्रिया" : "Pipeline"}</CardTitle>
            <ol className="relative space-y-4" aria-live="polite">
              {(job?.stages.length ? job.stages : STEP_NAMES.map((n, i) => ({ key: String(i), title: { en: n, hi: n }, status: "pending", started: null, finished: null, summary: null }))).map((s, i, arr) => (
                <li key={s.key} className="relative flex gap-3">
                  {i < arr.length - 1 && <span aria-hidden className="absolute left-[11px] top-6 h-[calc(100%+4px)] w-px bg-[var(--d-border)]" />}
                  <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] ${DOT[s.status] ?? DOT.pending}`}>
                    {s.status === "done" ? "✓" : s.status === "failed" ? "✕" : ""}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[13px] font-semibold text-[var(--d-ink)]">{STEP_NAMES[i] ?? s.title[lang]}</p>
                      <span className="text-[12px] tabular-nums text-[var(--d-muted)]">{dur(s as Stage) ?? ""}</span>
                    </div>
                    <p className="text-[12px] capitalize text-[var(--d-muted)]">{s.status}</p>
                    {s.summary && <p className="mt-0.5 line-clamp-3 text-[12px] text-[var(--d-ink2)]" title={s.summary[lang]}>{s.summary[lang]}</p>}
                  </div>
                </li>
              ))}
            </ol>
            {job?.status === "failed" && <p className="mt-3 text-[13px] text-[var(--d-danger)]">{x.failed}</p>}
            {job && stepOf(job) < 4 && <p className="mt-3 text-[12px] text-[var(--d-muted)]">{x.steps[Math.min(stepOf(job), 3)]}</p>}
          </Card>
        </div>

        {/* Centre: extracted table */}
        <div className="min-w-0 space-y-4">
          <Card className="overflow-hidden p-0">
            <div className="px-5 pt-5">
              <CardTitle right={rows.length > 0 ? <span className="text-[12px] text-[var(--d-muted)]">{x.found(rows.length, nCheck)}</span> : undefined}>
                {hi ? "निकाली गई तालिका (OCR)" : "Extracted table (OCR)"}
              </CardTitle>
            </div>
            {rows.length === 0 ? (
              <p className="px-5 pb-8 pt-2 text-[13px] text-[var(--d-muted)]">
                {job ? (hi ? "पढ़ रहे हैं…" : "Reading the report…") : hi ? "रिपोर्ट डालें, निकाली गई संख्याएं यहां दिखेंगी।" : "Upload a report; the extracted numbers appear here."}
              </p>
            ) : (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full min-w-[460px] text-left text-[13px]">
                  <thead className="sticky top-0 bg-[var(--d-card)]">
                    <tr className="border-y border-[var(--d-hover)] text-[11px] uppercase tracking-wider text-[var(--d-bar-mid)]">
                      <th className="py-2 pl-5 pr-2 font-medium">{hi ? "घाट" : "Ghat"}</th>
                      <th className="px-2 font-medium">{hi ? "मापदंड" : "Parameter"}</th>
                      <th className="px-2 font-medium">{hi ? "छपा मान" : "Value as printed"}</th>
                      <th className="px-2 font-medium">{hi ? "पृष्ठ" : "Page"}</th>
                      <th className="px-2 pr-5 font-medium">{hi ? "फ़्लैग" : "Flag"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const warn = r.needs_review || r.confidence < 0.8 || siteUnclear(r);
                      return (
                        <tr key={r.row_id} className={`border-b border-[var(--d-subtle3)] ${warn ? "bg-[var(--d-watch-bg)]" : ""}`}>
                          <td className="py-2 pl-5 pr-2 text-[var(--d-ink)]">{ghatName(r.slug, lang) ?? r.site_as_printed}</td>
                          <td className="px-2 text-[var(--d-ink2)]">{r.parameter}</td>
                          <td className="px-2 tabular-nums font-medium text-[var(--d-ink)]">{r.value_as_printed || (hi ? "जांच नहीं हुई" : "Not tested")}</td>
                          <td className="px-2 text-[var(--d-ink2)]">
                            {r.page !== null && client ? (
                              <a href={client.pageUrl(job!.id, r.page)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                                p. {r.page} ↗
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-2 pr-5 text-[12px]">
                            {r.needs_review ? (
                              <span className="font-semibold text-[var(--d-warn-ink)]">{hi ? "जांच ज़रूरी" : "needs review"}</span>
                            ) : siteUnclear(r) ? (
                              <span className="text-[var(--d-warn-ink)]">{hi ? "घाट अस्पष्ट" : "site unclear"}</span>
                            ) : r.confidence < 0.8 ? (
                              <span className="text-[var(--d-warn-ink)]">{x.lowConf}</span>
                            ) : (
                              <span className="text-[var(--d-muted)]">{r.flag ?? "—"}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {job && done && rows.length > 0 && (
            <Card>
              <CardTitle>{nCheck > 0 ? `⚠ ${x.attention}` : x.looksOk}</CardTitle>
              <div className="space-y-3">
                {unclearSites.map((u) => (
                  <div key={u.site} className="rounded-xl border border-dashed border-[var(--d-muted2)] bg-[var(--d-card-alt)] p-3 text-[13px]">
                    <p className="font-semibold">? {u.site}</p>
                    <p className="text-[var(--d-ink2)]">{x.siteUnclear(u.n)}</p>
                  </div>
                ))}
                {flagged.length > 0 && (
                  <ul id="rv-h" className="space-y-2">
                    {flagged.map((r) => {
                      const site = ghatName(r.slug, lang) ?? r.site_as_printed;
                      const k = paramKey(r.parameter);
                      const pname = k === "DO" ? x.oxygen : k === "BOD" ? x.bod : r.parameter;
                      const why = [...(r.needs_review ? [x.needsCheck] : []), ...(r.confidence < 0.8 ? [x.lowConf] : []), ...issueText(r)];
                      return (
                        <li key={r.row_id} className="rounded-xl border border-[var(--d-watch-border)] bg-[var(--d-watch-bg)] p-3">
                          <p className="text-[13px] font-semibold text-[var(--d-ink)]">
                            {site} · {pname}
                          </p>
                          <label className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
                            <span>{hi ? "नंबर:" : "Number:"}</span>
                            <input
                              type="number"
                              step="any"
                              inputMode="decimal"
                              disabled={!reviewable}
                              value={r.value ?? ""}
                              onChange={(e) =>
                                editRows(rows.map((y) => (y.row_id === r.row_id ? { ...y, value: e.target.value === "" ? null : Number(e.target.value) } : y)))
                              }
                              className="h-9 w-28 rounded-lg border border-[var(--d-bar-light)] bg-[var(--d-card)] px-2 text-[14px]"
                            />
                            {r.value_as_printed && (
                              <span className="text-[var(--d-muted)]">
                                {x.printed}: “{r.value_as_printed}”
                              </span>
                            )}
                          </label>
                          <p className="mt-1 text-[12px] text-[var(--d-ink2)]">{why.join(" · ")}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <details className="rounded-xl border border-[var(--d-border)] p-3">
                  <summary className="cursor-pointer text-[13px] font-semibold">{x.allRows(rows.length)}</summary>
                  <div className="mt-3 overflow-x-auto">
                    <ReviewTable job={job} rows={rows} onChange={editRows} pageUrl={(n) => (client ? client.pageUrl(job.id, n) : "")} readOnly={!reviewable} />
                  </div>
                </details>
              </div>
            </Card>
          )}
        </div>

        {/* Right: Claude answer, change, accept/reject */}
        <div className="space-y-4">
          {job?.analysis ? (
            <AiAnalysis jobId={job.id} lang={lang} />
          ) : (
            <Card>
              <CardTitle>{hi ? "Claude का उत्तर" : "Claude answer"}</CardTitle>
              <p className="text-[13px] text-[var(--d-muted)]">{hi ? "रिपोर्ट पढ़ने के बाद सार यहां दिखेगा।" : "The plain-language answer appears here after the report is read."}</p>
            </Card>
          )}
          {job?.analysis && <Changes job={job} lang={lang} after={job.status === "accepted"} />}

          {job && reviewable && (
            <Card className="space-y-2">
              {edited && (
                <button type="button" disabled={busy} onClick={rerun} className="w-full rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2.5 text-[14px] font-semibold text-[var(--d-ink)] hover:bg-[var(--d-page)] disabled:opacity-60">
                  🔄 {x.checkAgain}
                </button>
              )}
              <button type="button" disabled={busy} onClick={accept} className="w-full rounded-xl bg-[var(--d-ink)] px-3 py-2.5 text-[14px] font-semibold text-[var(--d-on-inv)] hover:bg-[var(--d-bar-dark)] disabled:opacity-60">
                ✔ {x.accept}
              </button>
              <button type="button" disabled={busy} onClick={reject} className="w-full rounded-xl border border-[var(--d-danger-border)] bg-[var(--d-card)] px-3 py-2.5 text-[14px] font-semibold text-[var(--d-danger-ink)] hover:bg-[var(--d-danger-bg)] disabled:opacity-60">
                ✖ {x.reject}
              </button>
              {busy && <p className="text-[13px] text-[var(--d-muted)]">{x.working}</p>}
            </Card>
          )}

          {msg && (
            <p className={`rounded-xl border px-3 py-2 text-[14px] font-semibold ${msg.ok ? "border-[var(--d-border)] bg-[var(--d-card)] text-[var(--d-ink)]" : "border-[var(--d-danger-border)] bg-[var(--d-danger-bg)] text-[var(--d-danger-ink)]"}`} role="status">
              {msg.ok ? "✅ " : "❌ "}
              {msg.text}
            </p>
          )}
          {jobId && (
            <Link href="/" className="block rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2.5 text-center text-[14px] font-medium text-[var(--d-ink)] no-underline hover:bg-[var(--d-page)]">
              {x.back}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const TIER_TONE: Record<string, PillTone> = { high: "danger", medium: "watch", low: "lower", insufficient_data: "missing" };
const TIER_LABEL: Record<string, { en: string; hi: string }> = {
  high: { en: "Danger", hi: "खतरा" },
  medium: { en: "Watch", hi: "निगरानी" },
  low: { en: "Lower risk", hi: "कम जोखिम" },
  insufficient_data: { en: "Not tested", hi: "जांच नहीं हुई" },
};

function Changes({ job, lang, after }: { job: Job; lang: Lang; after: boolean }) {
  const x = T[lang];
  const a = job.analysis!;
  const list = a.ghats.filter((g) => g.changed || g.before.tier !== g.after.tier || g.before.rank !== g.after.rank);
  const shown = list.length > 0 ? list : a.ghats;
  return (
    <section aria-labelledby="ch-h" className="space-y-3 rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-5">
      <h2 id="ch-h" className="text-[13px] font-semibold uppercase tracking-wide text-[var(--d-ink2)]">
        {after ? x.changed : x.willChange}
      </h2>
      {list.length === 0 && <p className="text-[13px] text-[var(--d-muted)]">{x.noChange}</p>}
      <ul className="space-y-3">
        {shown.map((g) => (
          <li key={g.slug} className="rounded-xl border border-[var(--d-hover)] bg-[var(--d-card-alt)] p-3">
            <p className="text-[14px] font-semibold">
              <Link href={`/ghat/${g.slug}`} className="text-[var(--d-ink)]">
                {g.name[lang]}
              </Link>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Pill tone={TIER_TONE[g.before.tier]}>{TIER_LABEL[g.before.tier][lang]}</Pill>
              <span aria-hidden className="text-lg">→</span>
              <span className="sr-only">{lang === "hi" ? "बदलकर" : "becomes"}</span>
              <Pill tone={TIER_TONE[g.after.tier]}>{TIER_LABEL[g.after.tier][lang]}</Pill>
            </div>
            <p className="mt-1 text-[13px] text-[var(--d-ink2)]">{x.rank(g.before.rank, g.after.rank)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
