// Local stand-in for /api/intake/* (docs/PLAN-INTAKE.md §4) used when the backend does not answer
// GET /api/intake/capabilities. Values come from public/data/ghats/*.json (MPPCB 2025 Ganesh, p. 28);
// stages complete over ~4 s. The analysis numbers are illustrative and say so in the summary.

import type {
  AcceptRes,
  AcceptedRes,
  Analysis,
  Capabilities,
  Job,
  JobIdRes,
  JobIssue,
  ManualReq,
  OkRes,
  ReportRes,
  Row,
  Stage,
  StageKey,
} from "./intakeTypes";
import { PARAM_UNIT, PARAMS_13 } from "./intakeTypes";
import type { Bilingual } from "./types";

const STAGE_MS = 800;

const TITLES: Record<StageKey, Bilingual> = {
  extract: { en: "Extractor", hi: "निष्कर्षक" },
  normalize: { en: "Normaliser", hi: "मानकीकरण" },
  validate: { en: "Validator", hi: "सत्यापक" },
  analyze: { en: "Analyst", hi: "विश्लेषक" },
  report: { en: "Reporter", hi: "रिपोर्टर" },
};
const KEYS: StageKey[] = ["extract", "normalize", "validate", "analyze", "report"];

type V = number | string; // string = printed code (flag)
// MPPCB 2025 Ganesh, page 28 (values as in public/data/ghats/*.json), parameter order = PARAMS_13.
const KHATLAPURA_PRE: V[] = [7.34, 310, 278, 32, 7.3, 4.4, 19.6, 6.1, 447.8, 0.03, 0.031, 0.082, 0.138];
const KHATLAPURA_AFTER: V[] = [7.76, 404, 318, 86, 6.5, 5.2, 28.8, 8.2, 470, 0.03, 0.031, 0.04, 0.08];
const PREMPURA_PRE: V[] = [7.41, 308, 240, 68, 65, 4.8, 29.4, 10.5, 391, 0.03, 0.031, 0.03, 0.133]; // DO misread 6.5 -> 65
const BAIRAGARH_PRE: V[] = ["*", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
const UNKNOWN_PRE: V[] = [7.9, 352, 300, 52, 5.6, 3.8, 24, 9.4, 455, "BDL", "BDL", 0.05, 0.09];

const AS_PRINTED: Record<string, string> = {
  pH: "pH",
  "Total solids": "Total Solids",
  "Dissolved solids": "T.D.S.",
  "Suspended solids": "T.S.S.",
  "Dissolved oxygen": "D.Oxygen",
  BOD: "B.O.D.",
  COD: "C.O.D.",
  Turbidity: "Turbidity",
  Conductivity: "Cond.",
  Chromium: "Cr",
  Lead: "Pb",
  Zinc: "Zn",
  Copper: "Cu",
};

/** deterministic pseudo-confidence in [0.72, 0.99] from a string */
function conf(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return 0.72 + ((h >>> 0) % 2700) / 10000;
}

function makeRows(jobId: string): Row[] {
  const out: Row[] = [];
  const add = (site: string, slug: string | null, smc: number, phase: Row["phase"], vals: V[], page: number, inPack: boolean) => {
    PARAMS_13.forEach((p, i) => {
      const v = vals[i];
      const isNum = typeof v === "number";
      const id = `${jobId}-${slug ?? "new"}-${phase}-${i}`;
      out.push({
        row_id: id,
        page,
        site_as_printed: site,
        slug,
        site_match_confidence: smc,
        year: 2025,
        festival: "Ganesh",
        phase,
        parameter: p,
        parameter_as_printed: AS_PRINTED[p] ?? p,
        value: isNum ? v : null,
        flag: isNum ? null : v === "-" ? "not sampled" : v,
        value_as_printed: String(v),
        unit_assumed: PARAM_UNIT[p] ?? "",
        confidence: id.endsWith("-pre-4") && slug === "prempura" ? 0.64 : Math.round(conf(id) * 100) / 100,
        issues: [],
        already_in_pack: inPack,
      });
    });
  };
  add("Location- Khatlapura Ghat", "khatlapura", 0.97, "pre", KHATLAPURA_PRE, 28, true);
  add("Location- Khatlapura Ghat", "khatlapura", 0.97, "after", KHATLAPURA_AFTER, 28, true);
  add("Location- Prempura Ghat", "prempura", 0.95, "pre", PREMPURA_PRE, 28, true);
  add("Location- Sant Hirdaram Nagar (Bairagarh)", "bairagarh", 0.78, "pre", BAIRAGARH_PRE, 28, true);
  add("Location- Gufa Mandir Talab", null, 0.41, "pre", UNKNOWN_PRE, 29, false);
  return out;
}

function makeIssues(rows: Row[]): JobIssue[] {
  const issues: JobIssue[] = [];
  const doBad = rows.find((r) => r.slug === "prempura" && r.parameter === "Dissolved oxygen" && (r.value ?? 0) > 20);
  if (doBad)
    issues.push({
      id: "i-do-range",
      row_id: doBad.row_id,
      level: "error",
      text: { en: `Dissolved oxygen ${doBad.value} mg/l is outside 0–20. Likely a misread decimal (6.5?).`, hi: `घुलित ऑक्सीजन ${doBad.value} mg/l, 0–20 की सीमा से बाहर है। संभवतः दशमलव गलत पढ़ा गया (6.5?)।` },
    });
  const unk = rows.find((r) => r.slug === null);
  if (unk)
    issues.push({
      id: "i-site",
      row_id: unk.row_id,
      level: "warn",
      text: { en: `Site "${unk.site_as_printed}" does not match any of the 7 ghats (best 41%). Kept as a new site.`, hi: `स्थल "${unk.site_as_printed}" 7 घाटों में से किसी से मेल नहीं खाता (सर्वोत्तम 41%)। नया स्थल रखा गया।` },
    });
  const kh = rows.find((r) => r.slug === "khatlapura" && r.phase === "pre");
  if (kh)
    issues.push({
      id: "i-dup",
      row_id: kh.row_id,
      level: "info",
      text: { en: "Khatlapura, Prempura and Bairagarh Ganesh 2025 rows are already in the MPPCB pack (duplicates are not double-counted).", hi: "खटलापुरा, प्रेमपुरा और बैरागढ़ की गणेश 2025 पंक्तियाँ पहले से MPPCB पैक में हैं (दोहराव दो बार नहीं गिना जाता)।" },
    });
  const bod = rows.find((r) => r.slug === "khatlapura" && r.phase === "after" && r.parameter === "BOD");
  if (bod)
    issues.push({
      id: "i-bod",
      row_id: bod.row_id,
      level: "info",
      text: { en: "BOD ≤ COD check passed for all tables.", hi: "सभी तालिकाओं में BOD ≤ COD जाँच सफल।" },
    });
  for (const i of issues) {
    const r = rows.find((x) => x.row_id === i.row_id);
    if (r) r.issues.push(i.id);
  }
  return issues;
}

function makeAnalysis(jobId: string): Analysis {
  return {
    standard: "CPCB class B",
    readings: [],
    summary: {
      en: "Demo analysis (illustrative numbers, not computed from your file). One ghat changes tier; the unmatched site is kept apart.",
      hi: "डेमो विश्लेषण (उदाहरण के अंक, आपकी फ़ाइल से गणना नहीं)। एक घाट का स्तर बदलता है; बेमेल स्थल अलग रखा गया।",
    },
    ghats: [
      {
        slug: "khatlapura",
        name: { en: "Khatlapura ghat", hi: "खटलापुरा घाट" },
        before: { tier: "low", score: 0.1514, rank: 6 },
        after: { tier: "medium", score: 0.2381, rank: 4 },
        changed: true,
        reasons: [
          {
            kind: "breach",
            parameter: "BOD",
            value: 5.2,
            unit: "mg/l",
            limit: "≤ 3",
            year: 2025,
            festival: "Ganesh",
            phase: "after",
            source: { report: null, pdf: null, page: 28, upload: jobId },
            text: {
              en: "BOD was 5.2 mg/l after the Ganesh 2025 immersion. The bathing limit is at most 3 mg/l. Officer-added from mppcb_2025_p28.jpg page 28 (not yet verified by MPPCB).",
              hi: "गणेश 2025 विसर्जन के बाद बीओडी 5.2 mg/l था। स्नान मानक अधिकतम 3 mg/l है। mppcb_2025_p28.jpg पृष्ठ 28 से अधिकारी द्वारा जोड़ा (MPPCB द्वारा अभी सत्यापित नहीं)।",
            },
          },
        ],
        forecast: {
          available: true,
          champion: "random_forest",
          p_breach: 0.9095,
          models: { logreg: 0.7243, random_forest: 0.9095, xgboost: 0.9836, lightgbm: 0.9869 },
          top_reasons: [
            { feature: "pre_bod", direction: "up", text: { en: "Pre-immersion BOD (4.4) pushes the breach estimate up.", hi: "विसर्जन-पूर्व बीओडी (4.4) उल्लंघन की संभावना बढ़ाता है।" } },
            { feature: "site_prior_breach_rate", direction: "up", text: { en: "This site's breach record in earlier years pushes the breach estimate up.", hi: "पिछले वर्षों में इस स्थल का उल्लंघन रिकॉर्ड उल्लंघन की संभावना बढ़ाता है।" } },
          ],
          basis: { year: 2025, festival: "Ganesh", phase: "pre" },
        },
        allocation_hint: { action: "aerate", text: { en: "Pre-position one aerator at Khatlapura before the evening peak.", hi: "शाम के चरम से पहले खटलापुरा में एक एरेटर तैनात करें।" } },
      },
      {
        slug: "prempura",
        name: { en: "Prempura ghat", hi: "प्रेमपुरा घाट" },
        before: { tier: "low", score: 0.0535, rank: 7 },
        after: { tier: "low", score: 0.0535, rank: 7 },
        changed: false,
        reasons: [],
        forecast: null,
        allocation_hint: null,
      },
      {
        slug: "bairagarh",
        name: { en: "Bairagarh (Sant Hirdaram) kund", hi: "बैरागढ़ (संत हिरदाराम) कुंड" },
        before: { tier: "insufficient_data", score: 0.4614, rank: 1 },
        after: { tier: "insufficient_data", score: 0.4614, rank: 1 },
        changed: false,
        reasons: [],
        forecast: null,
        allocation_hint: { action: "test_first", text: { en: "Still no measured values for Bairagarh: send the test team first.", hi: "बैरागढ़ के लिए अभी भी कोई माप नहीं: पहले जाँच दल भेजें।" } },
      },
    ],
  };
}

interface MockJob {
  base: Job;
  t0: number;
}

const iso = (ms: number) => new Date(ms).toISOString();

const LOGS: Record<StageKey, Bilingual[]> = {
  extract: [
    { en: "Received mppcb_2025_p28.jpg (image, 1 page).", hi: "mppcb_2025_p28.jpg प्राप्त (छवि, 1 पृष्ठ)।" },
    { en: "No text layer: OCR run on page 28 and 29.", hi: "टेक्स्ट परत नहीं: पृष्ठ 28 और 29 पर OCR चलाया।" },
    { en: "Found 5 tables (Location headers), 65 cells.", hi: "5 तालिकाएँ (Location शीर्षक), 65 खाने मिले।" },
  ],
  normalize: [
    { en: "Mapped 13 parameter labels (D.Oxygen → Dissolved oxygen, T.D.S. → Dissolved solids…).", hi: "13 मापदंड नाम मानकीकृत (D.Oxygen → घुलित ऑक्सीजन…)।" },
    { en: "Sites: 4 matched, 1 unmatched (Gufa Mandir Talab).", hi: "स्थल: 4 मिले, 1 नहीं मिला (गुफा मंदिर तालाब)।" },
    { en: "Header: Ganesh Idol Immersion -2025 → Ganesh 2025.", hi: "शीर्षक: Ganesh Idol Immersion -2025 → गणेश 2025।" },
  ],
  validate: [
    { en: "1 value outside plausible range (DO 65).", hi: "1 मान संभावित सीमा से बाहर (DO 65)।" },
    { en: "39 rows duplicate the existing pack.", hi: "39 पंक्तियाँ मौजूदा पैक की दोहराव हैं।" },
  ],
  analyze: [
    { en: "Class B status computed for 52 readings.", hi: "52 मापों की class B स्थिति निकाली।" },
    { en: "Re-ranked 7 ghats; forecast run with 4 models.", hi: "7 घाटों की पुनः रैंकिंग; 4 मॉडलों से पूर्वानुमान।" },
  ],
  report: [{ en: "Bilingual intake report written.", hi: "द्विभाषी इनटेक रिपोर्ट लिखी गई।" }],
};

const SUMMARY: Record<StageKey, Bilingual> = {
  extract: { en: "65 rows from 5 tables (OCR)", hi: "5 तालिकाओं से 65 पंक्तियाँ (OCR)" },
  normalize: { en: "4 of 5 sites matched", hi: "5 में से 4 स्थल मिले" },
  validate: { en: "1 error, 1 warning, 2 notes", hi: "1 त्रुटि, 1 चेतावनी, 2 सूचनाएँ" },
  analyze: { en: "1 ghat changes tier", hi: "1 घाट का स्तर बदला" },
  report: { en: "Report ready (en/hi)", hi: "रिपोर्ट तैयार (en/hi)" },
};

function progress(m: MockJob, now: number): Job {
  const el = now - m.t0;
  const stages: Stage[] = KEYS.map((k, i) => {
    const s0 = m.t0 + i * STAGE_MS;
    const s1 = s0 + STAGE_MS;
    const status = now >= s1 ? "done" : now >= s0 ? "running" : "pending";
    const logs = LOGS[k];
    const shown = status === "done" ? logs.length : status === "running" ? Math.max(1, Math.ceil(((now - s0) / STAGE_MS) * logs.length)) : 0;
    return {
      key: k,
      title: TITLES[k],
      status,
      started: status === "pending" ? null : iso(s0),
      finished: status === "done" ? iso(s1) : null,
      log: logs.slice(0, shown).map((text, j) => ({ t: iso(s0 + (j * STAGE_MS) / logs.length), text })),
      summary: status === "done" ? SUMMARY[k] : null,
    };
  });
  const done = el >= KEYS.length * STAGE_MS;
  const b = m.base;
  if (b.status === "accepted" || b.status === "rejected") return { ...b, stages };
  return {
    ...b,
    stages,
    status: done ? "needs_review" : "running",
    rows: el >= 2 * STAGE_MS ? b.rows : [],
    analysis: done ? b.analysis : null,
    report_available: done,
  };
}

function pageSvg(n: number): string {
  const lines =
    n === 28
      ? ["Ganesh Idol Immersion -2025", "Location- Khatlapura Ghat", "Parameter      Pre     After", "pH             7.34    7.76", "D.Oxygen       7.3     6.5", "B.O.D.         4.4     5.2", "Location- Prempura Ghat", "D.Oxygen       6.5", "Location- Sant Hirdaram Nagar", "pH             *"]
      : ["Location- Gufa Mandir Talab", "Parameter      Pre", "pH             7.9", "D.Oxygen       5.6", "Cr             BDL"];
  const text = lines.map((l, i) => `<text x="40" y="${80 + i * 46}" font-family="monospace" font-size="26" fill="#222">${l}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="1100" viewBox="0 0 850 1100"><rect width="850" height="1100" fill="#f4f1ea"/><text x="40" y="40" font-family="sans-serif" font-size="20" fill="#888">DEMO page ${n} (mock, not the real report)</text>${text}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export class MockIntake {
  private jobs = new Map<string, MockJob>();
  private acceptedGroups: AcceptedRes["groups"] = [];
  private n = 0;

  capabilities(): Capabilities {
    return {
      text_pdf: true,
      ocr: {
        available: false,
        engine: null,
        venv: "backend/.ocr-venv",
        how_to_enable: { en: "Create backend/.ocr-venv and install paddleocr + pypdfium2.", hi: "backend/.ocr-venv बनाएँ और paddleocr + pypdfium2 स्थापित करें।" },
      },
      max_upload_mb: 25,
    };
  }

  upload(file: File, year?: number, festival?: string): JobIdRes {
    const id = `demo-${++this.n}`;
    const rows = makeRows(id);
    const issues = makeIssues(rows);
    const numeric = rows.filter((r) => r.value !== null).length;
    const base: Job = {
      id,
      created: iso(Date.now()),
      kind: "upload",
      source: { file_name: file.name, mime: file.type || null, pages: [28, 29], bytes: file.size, ocr_used: true, ocr_engine: "PaddleOCR 3.x (demo)" },
      context: { year: year ?? 2025, festival: festival === "Durga" ? "Durga" : "Ganesh" },
      status: "running",
      stages: [],
      rows,
      issues,
      quality: {
        rows: rows.length,
        numeric,
        flagged: rows.length - numeric,
        mean_confidence: rows.reduce((a, r) => a + r.confidence, 0) / rows.length,
        tables_found: 5,
        sites_matched: 4,
        sites_unmatched: 1,
      },
      analysis: makeAnalysis(id),
      report_available: false,
    };
    this.jobs.set(id, { base, t0: Date.now() });
    return { job_id: id };
  }

  manual(req: ManualReq): JobIdRes {
    const id = `demo-${++this.n}`;
    const rows: Row[] = Object.entries(req.readings).map(([p, v], i) => ({
      row_id: `${id}-${i}`,
      page: null,
      site_as_printed: req.site.name,
      slug: req.site.slug,
      site_match_confidence: 1,
      year: req.year,
      festival: req.festival,
      phase: req.phase,
      parameter: p,
      parameter_as_printed: p,
      value: v.value,
      flag: v.flag,
      value_as_printed: v.value !== null ? String(v.value) : v.flag ?? "",
      unit_assumed: PARAM_UNIT[p] ?? "",
      confidence: 1,
      issues: [],
      already_in_pack: false,
    }));
    const numeric = rows.filter((r) => r.value !== null).length;
    const an = makeAnalysis(id);
    const base: Job = {
      id,
      created: iso(Date.now()),
      kind: "manual",
      source: { file_name: null, mime: null, pages: [], bytes: null, ocr_used: false, ocr_engine: null },
      context: { year: req.year, festival: req.festival },
      status: "running",
      stages: [],
      rows,
      issues: [],
      quality: { rows: rows.length, numeric, flagged: rows.length - numeric, mean_confidence: 1, tables_found: 1, sites_matched: req.site.slug ? 1 : 0, sites_unmatched: req.site.slug ? 0 : 1 },
      analysis: { ...an, ghats: an.ghats.filter((g) => g.slug === req.site.slug) },
      report_available: false,
    };
    this.jobs.set(id, { base, t0: Date.now() - 2 * STAGE_MS });
    return { job_id: id };
  }

  job(id: string): Job {
    const m = this.jobs.get(id);
    if (!m) throw new Error("404");
    return progress(m, Date.now());
  }

  rerun(id: string, rows: Row[]): Job {
    const m = this.jobs.get(id);
    if (!m) throw new Error("404");
    const fixed = rows.map((r) => ({ ...r, issues: r.issues.filter((i) => !(i === "i-do-range" && r.value !== null && r.value <= 20)) }));
    m.base = { ...m.base, rows: fixed, issues: m.base.issues.filter((i) => fixed.some((r) => r.issues.includes(i.id)) || i.row_id === null) };
    m.t0 = Date.now() - 3 * STAGE_MS; // re-run analyse + report only
    return progress(m, Date.now());
  }

  accept(id: string, rows: Row[]): AcceptRes {
    const m = this.jobs.get(id);
    if (!m) throw new Error("404");
    m.base = { ...m.base, status: "accepted" };
    const bySite = new Map<string, Row[]>();
    for (const r of rows) {
      const k = r.slug ?? `new:${r.site_as_printed}`;
      bySite.set(k, [...(bySite.get(k) ?? []), r]);
    }
    for (const rs of bySite.values()) {
      this.acceptedGroups.push({
        job_id: id,
        source_file: m.base.source.file_name ?? "manual entry",
        year: rs[0].year,
        festival: rs[0].festival,
        slug: rs[0].slug,
        site_name: rs[0].site_as_printed.replace(/^Location-\s*/, ""),
        phases: [...new Set(rs.map((r) => r.phase))],
        rows: rs.length,
        accepted_at: iso(Date.now()),
      });
    }
    return { ok: true, accepted_rows: rows.length, ranking_changed: (m.base.analysis?.ghats ?? []).filter((g) => g.changed).map((g) => g.slug) };
  }

  reject(id: string): OkRes {
    const m = this.jobs.get(id);
    if (m) m.base = { ...m.base, status: "rejected" };
    return { ok: true };
  }

  report(id: string): ReportRes {
    const j = this.job(id);
    const lines = (l: "en" | "hi") =>
      [
        l === "en" ? `# Intake report (demo) — ${j.source.file_name ?? "manual entry"}` : `# इनटेक रिपोर्ट (डेमो) — ${j.source.file_name ?? "हाथ से दर्ज"}`,
        "",
        l === "en" ? "Officer-added readings, not yet verified by MPPCB." : "अधिकारी द्वारा जोड़े गए माप, MPPCB द्वारा अभी सत्यापित नहीं।",
        "",
        ...(j.analysis?.ghats ?? []).map((g) => `- ${g.name[l]}: ${g.before.tier} ${g.before.score.toFixed(3)} → ${g.after.tier} ${g.after.score.toFixed(3)}`),
        "",
        j.analysis?.summary[l] ?? "",
      ].join("\n");
    return { markdown: { en: lines("en"), hi: lines("hi") } };
  }

  accepted(): AcceptedRes {
    return { rows: this.acceptedGroups.reduce((a, g) => a + g.rows, 0), groups: this.acceptedGroups };
  }

  removeAccepted(jobId: string): OkRes {
    this.acceptedGroups = this.acceptedGroups.filter((g) => g.job_id !== jobId);
    return { ok: true };
  }

  pageUrl(_id: string, n: number): string {
    return pageSvg(n);
  }
}
