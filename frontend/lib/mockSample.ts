// Demo-mode (no backend) handling of the downloadable sample report, public/samples/ghatwatch-sample-report-SYNTHETIC.pdf.
// Rows are the sample's real cell values (samples/dummy/expected.json), so what a visitor sees matches the PDF.
// Class B checks are computed here; re-ranking needs the server, so tiers are shown unchanged and the summary says so.

import type { Analysis, AnalysisGhat, IntakeReason, JobIssue, Row, StageKey, TierScoreRank } from "./intakeTypes";
import { PARAM_UNIT } from "./intakeTypes";
import type { Bilingual, ReadingStatus } from "./types";
import sample from "./sampleReport.json";

export const SAMPLE_PDF = "/samples/ghatwatch-sample-report-SYNTHETIC.pdf";
export const SAMPLE_PAGES = ["/samples/sample-page-1.jpg", "/samples/sample-page-2.jpg"];

export const isSampleFile = (name: string) => /synthetic|ghatwatch-sample/i.test(name);

type SRow = { page: number; site_as_printed: string; slug: string | null; parameter: string; value: number | null; flag: string | null; value_as_printed: string };

/** Ghat state before the upload (snapshot ranking). */
const BEFORE: Record<string, { name: Bilingual; at: TierScoreRank }> = {
  khatlapura: { name: { en: "Khatlapura ghat", hi: "खटलापुरा घाट" }, at: { tier: "low", score: 0.1514, rank: 6 } },
  prempura: { name: { en: "Prempura ghat", hi: "प्रेमपुरा घाट" }, at: { tier: "low", score: 0.0535, rank: 7 } },
  bairagarh: { name: { en: "Bairagarh (Sant Hirdaram) kund", hi: "बैरागढ़ (संत हिरदाराम) कुंड" }, at: { tier: "insufficient_data", score: 0.4614, rank: 1 } },
};

const PLAUSIBLE: Record<string, [number, number]> = { "Dissolved oxygen": [0, 20], pH: [0, 14], BOD: [0, 100] };

function check(r: Row): { status: ReadingStatus; limit: string } {
  if (r.value === null || r.needs_review) return { status: "missing", limit: "" };
  if (r.parameter === "Dissolved oxygen") return { status: r.value < 5 ? "breach" : "ok", limit: "≥ 5" };
  if (r.parameter === "BOD") return { status: r.value > 3 ? "breach" : "ok", limit: "≤ 3" };
  if (r.parameter === "pH") return { status: r.value < 6.5 || r.value > 8.5 ? "breach" : "ok", limit: "6.5–8.5" };
  return { status: "no_limit", limit: "" };
}

export function sampleRows(jobId: string, fileName: string): Row[] {
  const page = /-p1\b|page-1/i.test(fileName) ? 1 : /-p2\b|page-2/i.test(fileName) ? 2 : null;
  return (sample.rows as SRow[])
    .filter((r) => page === null || r.page === page)
    .map((r, i) => {
      const range = PLAUSIBLE[r.parameter];
      const implausible = r.value !== null && !!range && (r.value < range[0] || r.value > range[1]);
      return {
        row_id: `${jobId}-s${i}`,
        page: r.page,
        site_as_printed: r.site_as_printed,
        slug: r.slug,
        site_match_confidence: r.slug ? 0.96 : 0.38,
        year: 2026,
        festival: "Durga",
        phase: "pre",
        parameter: r.parameter,
        parameter_as_printed: r.parameter,
        value: r.value,
        flag: r.flag === "*" ? "not sampled" : r.flag,
        value_as_printed: r.value_as_printed,
        unit_assumed: PARAM_UNIT[r.parameter] ?? "",
        confidence: 0.99,
        issues: [],
        already_in_pack: false,
        needs_review: implausible,
      } satisfies Row;
    });
}

export function sampleIssues(rows: Row[]): JobIssue[] {
  const issues: JobIssue[] = [];
  for (const r of rows.filter((x) => x.needs_review))
    issues.push({
      id: `i-range-${r.row_id}`,
      row_id: r.row_id,
      level: "error",
      text: {
        en: `${r.parameter} ${r.value_as_printed} at ${r.slug ?? r.site_as_printed} is outside the possible range. Probably a typo (4.5?). Held back until you check it.`,
        hi: `${r.slug ?? r.site_as_printed} पर ${r.parameter} ${r.value_as_printed} संभव सीमा से बाहर है। शायद टाइपो (4.5?)। जांच तक रोका गया।`,
      },
    });
  const unk = rows.find((r) => r.slug === null);
  if (unk)
    issues.push({
      id: "i-site",
      row_id: unk.row_id,
      level: "warn",
      text: {
        en: `"${unk.site_as_printed}" is not one of the 7 ghats. Kept as a new site, not ranked.`,
        hi: `"${unk.site_as_printed}" 7 घाटों में से नहीं है। नया स्थल रखा गया, रैंक नहीं किया गया।`,
      },
    });
  const flagged = rows.filter((r) => r.flag);
  if (flagged.length)
    issues.push({
      id: "i-flags",
      row_id: flagged[0].row_id,
      level: "info",
      text: {
        en: `${flagged.length} cells were BDL or not sampled (${flagged.map((r) => `${r.slug ?? "new"} ${r.parameter}`).join(", ")}). Not sampled is never treated as clean.`,
        hi: `${flagged.length} खाने BDL या बिना नमूने के थे। बिना नमूना कभी साफ़ नहीं माना जाता।`,
      },
    });
  for (const i of issues) rows.find((r) => r.row_id === i.row_id)?.issues.push(i.id);
  return issues;
}

export function sampleAnalysis(jobId: string, rows: Row[]): Analysis {
  const readings = rows.map((r) => {
    const c = check(r);
    return { row_id: r.row_id, status: c.status, limit_text: c.limit };
  });
  const ghats: AnalysisGhat[] = Object.entries(BEFORE)
    .filter(([slug]) => rows.some((r) => r.slug === slug))
    .map(([slug, b]) => {
      const reasons: IntakeReason[] = rows
        .filter((r) => r.slug === slug && check(r).status === "breach")
        .map((r) => {
          const limit = check(r).limit;
          const unit = PARAM_UNIT[r.parameter] ?? "";
          return {
            kind: "breach",
            parameter: r.parameter,
            value: r.value,
            unit,
            limit,
            year: 2026,
            festival: "Durga",
            phase: "pre",
            source: { report: null, pdf: null, page: r.page, upload: jobId },
            text: {
              en: `${r.parameter} ${r.value} ${unit} before the Durga 2026 immersion; the bathing limit is ${limit}. From the sample report, page ${r.page} (synthetic test data).`,
              hi: `दुर्गा 2026 विसर्जन से पहले ${r.parameter} ${r.value} ${unit}; स्नान मानक ${limit} है। नमूना रिपोर्ट पृष्ठ ${r.page} से (कृत्रिम परीक्षण डेटा)।`,
            },
          };
        });
      const lowDo = reasons.some((x) => x.parameter === "Dissolved oxygen");
      const highBod = reasons.some((x) => x.parameter === "BOD");
      const hint = lowDo
        ? { action: "aerate", text: { en: `Low oxygen at ${b.name.en}: pre-position an aerator.`, hi: `${b.name.hi} पर कम ऑक्सीजन: एरेटर पहले से रखें।` } }
        : highBod
          ? { action: "clean", text: { en: `High BOD at ${b.name.en}: clean the ghat before immersion.`, hi: `${b.name.hi} पर अधिक BOD: विसर्जन से पहले घाट साफ़ करें।` } }
          : null;
      return { slug, name: b.name, before: b.at, after: b.at, changed: false, reasons, forecast: null, allocation_hint: hint };
    });
  const breaches = readings.filter((r) => r.status === "breach").length;
  return {
    standard: "CPCB class B",
    readings,
    ghats,
    summary: {
      en: `Sample report (synthetic test data): ${rows.length} readings read, ${breaches} break the CPCB class B bathing limits. Demo mode has no server, so the ghat ranking is shown unchanged; with the backend running, accepting these rows re-ranks the ghats.`,
      hi: `नमूना रिपोर्ट (कृत्रिम परीक्षण डेटा): ${rows.length} माप पढ़े, ${breaches} CPCB श्रेणी B स्नान मानक तोड़ते हैं। डेमो मोड में सर्वर नहीं है, इसलिए रैंकिंग बदली नहीं दिखती; बैकएंड चलने पर स्वीकार करने से घाट दोबारा रैंक होते हैं।`,
    },
  };
}

export function sampleStageText(rows: Row[], issues: JobIssue[], fileName: string, ocr: boolean) {
  const sites = new Set(rows.map((r) => r.slug ?? r.site_as_printed));
  const matched = [...sites].filter((s) => s in BEFORE).length;
  const err = issues.filter((i) => i.level === "error").length;
  const warn = issues.filter((i) => i.level === "warn").length;
  const pages = new Set(rows.map((r) => r.page)).size;
  const logs: Record<StageKey, Bilingual[]> = {
    extract: [
      { en: `Received ${fileName} (${pages} page${pages > 1 ? "s" : ""}).`, hi: `${fileName} प्राप्त (${pages} पृष्ठ)।` },
      ocr
        ? { en: "No text layer: ran OCR on every page.", hi: "टेक्स्ट परत नहीं: हर पृष्ठ पर OCR चलाया।" }
        : { en: "Read the PDF text layer (OCR is the fallback for scans and photos).", hi: "PDF की टेक्स्ट परत पढ़ी (स्कैन/फ़ोटो के लिए OCR)।" },
      { en: `Found ${sites.size} tables (Location headers), ${rows.length} cells.`, hi: `${sites.size} तालिकाएँ, ${rows.length} खाने मिले।` },
    ],
    normalize: [
      { en: "Mapped parameter labels to the 13 standard names.", hi: "मापदंड नाम 13 मानक नामों से मिलाए।" },
      { en: `Sites: ${matched} matched, ${sites.size - matched} not one of the 7 ghats.`, hi: `स्थल: ${matched} मिले, ${sites.size - matched} 7 घाटों में नहीं।` },
    ],
    validate: [
      { en: `${err} value outside the possible range (held back), ${warn} site warning.`, hi: `${err} मान संभव सीमा से बाहर (रोका गया), ${warn} स्थल चेतावनी।` },
      { en: "BDL and blank cells kept as flags, never as clean.", hi: "BDL और खाली खाने चिह्न के रूप में रखे, साफ़ नहीं माने।" },
    ],
    analyze: [{ en: "Checked every reading against CPCB class B.", hi: "हर माप CPCB श्रेणी B से जांचा।" }],
    report: [{ en: "Bilingual intake report written.", hi: "द्विभाषी इनटेक रिपोर्ट लिखी गई।" }],
  };
  const summary: Record<StageKey, Bilingual> = {
    extract: { en: `${rows.length} cells from ${sites.size} tables${ocr ? " (OCR)" : ""}`, hi: `${sites.size} तालिकाओं से ${rows.length} खाने${ocr ? " (OCR)" : ""}` },
    normalize: { en: `${matched} of ${sites.size} sites matched`, hi: `${sites.size} में से ${matched} स्थल मिले` },
    validate: { en: `${err} error, ${warn} warning`, hi: `${err} त्रुटि, ${warn} चेतावनी` },
    analyze: { en: "Class B checks done", hi: "श्रेणी B जांच पूरी" },
    report: { en: "Report ready (en/hi)", hi: "रिपोर्ट तैयार (en/hi)" },
  };
  return { logs, summary, matched, sites: sites.size };
}
