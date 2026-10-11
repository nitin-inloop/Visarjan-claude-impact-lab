"use client";

// Simple report intake for the /intake route: one big upload button, progress in plain words,
// review shows only the rows that need attention, then what changed. Same API/mocks as IntakePanel
// (which stays in use inside the experimental live mode).

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiAnalysis } from "@/components/ai/AiAnalysis";
import { StatusPill } from "@/components/home/GhatCard";
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

  return (
    <div className="pt-6 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold leading-tight">{x.title}</h1>
        <p className="mt-2 text-lg">{x.sub}</p>
      </header>

      {!jobId && (
        <section className="space-y-3">
          <button
            type="button"
            disabled={busy || !client}
            onClick={() => fileRef.current?.click()}
            className="w-full min-h-20 flex items-center justify-center gap-3 rounded-xl bg-accent px-5 py-5 text-2xl font-bold text-white shadow hover:opacity-90 disabled:opacity-60"
          >
            <span aria-hidden className="text-3xl">⬆</span>
            {x.upload}
          </button>
          <button
            type="button"
            disabled={busy || !client}
            onClick={() => camRef.current?.click()}
            className="w-full min-h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-accent bg-paper px-5 text-xl font-bold text-accent hover:bg-surface disabled:opacity-60"
          >
            <span aria-hidden>📷</span>
            {x.camera}
          </button>
          <input ref={fileRef} type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" className="sr-only" tabIndex={-1} onChange={(e) => upload(e.target.files?.[0])} />
          <input ref={camRef} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} onChange={(e) => upload(e.target.files?.[0])} />
          {progress !== null && (
            <p className="text-xl font-semibold" role="status">
              ⏳ {x.sending(progress)}
            </p>
          )}
          <details open={manual} onToggle={(e) => setManual((e.target as HTMLDetailsElement).open)} className="rounded-xl border-2 border-rule p-3">
            <summary className="min-h-12 flex items-center text-lg font-semibold cursor-pointer">✍ {x.manual}</summary>
            <div className="mt-3">
              <ManualForm onSubmit={onManual} busy={busy} />
            </div>
          </details>
        </section>
      )}

      {jobId && (
        <p className="text-lg">
          <span className="text-muted">{x.file}: </span>
          <b>{job?.source.file_name ?? "…"}</b>
        </p>
      )}

      {job && (
        <ol className="space-y-2 text-xl" aria-live="polite">
          {x.steps.map((label, i) => {
            const cur = stepOf(job);
            const failed = job.status === "failed";
            const state = failed && i === Math.min(cur, 3) ? "fail" : i < cur || (i === 3 && cur === 4) ? "done" : i === cur ? "now" : "todo";
            if (i === 3 && state !== "done") return null;
            return (
              <li key={i} className={state === "todo" ? "text-muted" : "font-semibold"}>
                <span aria-hidden className="inline-block w-8">{state === "done" ? "✅" : state === "now" ? "⏳" : state === "fail" ? "❌" : "○"}</span>
                {label}
              </li>
            );
          })}
          {job.status === "failed" && <li className="text-lg text-critical">{x.failed}</li>}
        </ol>
      )}

      {job && done && rows.length > 0 && (
        <section aria-labelledby="rv-h" className="space-y-3">
          <p className="text-xl font-bold">{x.found(rows.length, nCheck)}</p>
          {unclearSites.map((u) => (
            <div key={u.site} className="rounded-xl border-2 border-dashed border-[#6b7280] bg-[#f1f2f4] p-3 text-lg">
              <p className="font-bold">? {u.site}</p>
              <p>{x.siteUnclear(u.n)}</p>
            </div>
          ))}
          {flagged.length > 0 && (
            <>
              <h2 id="rv-h" className="text-2xl font-bold">
                ⚠ {x.attention}
              </h2>
              <ul className="space-y-3">
                {flagged.map((r) => {
                  const site = ghatName(r.slug, lang) ?? r.site_as_printed;
                  const k = paramKey(r.parameter);
                  const pname = k === "DO" ? x.oxygen : k === "BOD" ? x.bod : r.parameter;
                  const why = [
                    ...(r.needs_review ? [x.needsCheck] : []),
                    ...(r.confidence < 0.8 ? [x.lowConf] : []),
                    ...issueText(r),
                  ];
                  return (
                    <li key={r.row_id} className="rounded-xl border-2 border-[#b45309] bg-[#fff4e0] p-3">
                      <p className="text-lg font-bold">
                        {site} · {pname}
                      </p>
                      <label className="mt-2 flex flex-wrap items-center gap-3 text-lg">
                        <span>{lang === "hi" ? "नंबर:" : "Number:"}</span>
                        <input
                          type="number"
                          step="any"
                          inputMode="decimal"
                          disabled={!reviewable}
                          value={r.value ?? ""}
                          onChange={(e) =>
                            editRows(rows.map((y) => (y.row_id === r.row_id ? { ...y, value: e.target.value === "" ? null : Number(e.target.value) } : y)))
                          }
                          className="min-h-12 w-32 rounded-lg border-2 border-ink bg-paper px-3 text-xl"
                        />
                        {r.value_as_printed && (
                          <span className="text-muted">
                            {x.printed}: “{r.value_as_printed}”
                          </span>
                        )}
                      </label>
                      <p className="mt-1 text-base">{why.join(" · ")}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {nCheck === 0 && <p className="text-lg">✅ {x.looksOk}</p>}
          <details className="rounded-xl border-2 border-rule p-3">
            <summary className="min-h-12 flex items-center text-lg font-semibold cursor-pointer">{x.allRows(rows.length)}</summary>
            <div className="mt-3 overflow-x-auto">
              <ReviewTable job={job} rows={rows} onChange={editRows} pageUrl={(n) => (client ? client.pageUrl(job.id, n) : "")} readOnly={!reviewable} />
            </div>
          </details>
        </section>
      )}

      {job?.analysis && <Changes job={job} lang={lang} after={job.status === "accepted"} />}

      {job?.analysis && <AiAnalysis jobId={job.id} lang={lang} />}

      {job && reviewable && (
        <div className="grid gap-3">
          {edited && (
            <button type="button" disabled={busy} onClick={rerun} className="min-h-14 rounded-xl border-2 border-accent bg-paper text-xl font-bold text-accent disabled:opacity-60">
              🔄 {x.checkAgain}
            </button>
          )}
          <button type="button" disabled={busy} onClick={accept} className="min-h-16 rounded-xl bg-accent text-2xl font-bold text-white shadow disabled:opacity-60">
            ✔ {x.accept}
          </button>
          <button type="button" disabled={busy} onClick={reject} className="min-h-14 rounded-xl border-2 border-rule bg-paper text-xl font-semibold text-ink disabled:opacity-60">
            ✖ {x.reject}
          </button>
          {busy && <p className="text-lg text-muted">{x.working}</p>}
        </div>
      )}

      {msg && (
        <p className={`text-xl font-bold ${msg.ok ? "text-ink" : "text-critical"}`} role="status">
          {msg.ok ? "✅ " : "❌ "}
          {msg.text}
        </p>
      )}

      {jobId && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={reset} className="min-h-14 rounded-xl border-2 border-accent bg-paper text-xl font-bold text-accent">
            ⬆ {x.another}
          </button>
          <Link href="/" className="min-h-14 flex items-center justify-center rounded-xl border-2 border-rule bg-paper text-xl font-bold text-ink no-underline">
            🏠 {x.back}
          </Link>
        </div>
      )}
    </div>
  );
}

function Changes({ job, lang, after }: { job: Job; lang: Lang; after: boolean }) {
  const x = T[lang];
  const a = job.analysis!;
  const list = a.ghats.filter((g) => g.changed || g.before.tier !== g.after.tier || g.before.rank !== g.after.rank);
  const shown = list.length > 0 ? list : a.ghats;
  return (
    <section aria-labelledby="ch-h" className="rounded-xl border-2 border-accent p-4 space-y-3">
      <h2 id="ch-h" className="text-2xl font-bold">
        {after ? x.changed : x.willChange}
      </h2>
      {list.length === 0 && <p className="text-lg">{x.noChange}</p>}
      <ul className="space-y-3">
        {shown.map((g) => (
          <li key={g.slug} className="rounded-lg border border-rule bg-surface p-3">
            <p className="text-xl font-bold">
              <Link href={`/ghat/${g.slug}`} className="text-ink">
                {g.name[lang]}
              </Link>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusPill tier={g.before.tier} lang={lang} />
              <span aria-hidden className="text-2xl">→</span>
              <span className="sr-only">{lang === "hi" ? "बदलकर" : "becomes"}</span>
              <StatusPill tier={g.after.tier} lang={lang} />
            </div>
            <p className="mt-1 text-lg">{x.rank(g.before.rank, g.after.rank)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
