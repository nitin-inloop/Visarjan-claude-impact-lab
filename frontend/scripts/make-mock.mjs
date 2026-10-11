// Generates PLACEHOLDER JSON in public/data/ from the data pack CSV, following PLAN.md §3 and the §5 contract.
// Replaced at integration by backend/scripts/build_artifacts.py. Run: node scripts/make-mock.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CSV = path.resolve(ROOT, "../track-2-visarjan-ghat-watch/data/bhopal_ghats_2023_2025.csv");
const OUT = path.join(ROOT, "public/data");
fs.mkdirSync(path.join(OUT, "ghats"), { recursive: true });

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; } else q = false;
      } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur.replace(/\r$/, "")); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const [h, ...rest] = rows;
  return rest.filter((r) => r.length === h.length).map((r) => Object.fromEntries(h.map((k, i) => [k, r[i]])));
}

const raw = parseCsv(fs.readFileSync(CSV, "latin1"));
const SLUG = {
  "Bairagarh (Sant Hirdaram) kund": "bairagarh", "Khatlapura ghat": "khatlapura", "Prempura ghat": "prempura",
  "Rani Kamlapati ghat / Kamla Park kund": "rani-kamlapati", "Hathaikheda dam / kund": "hathaikheda",
  "Malikhedi kund": "malikhedi", "Shahpura lake ghat": "shahpura",
};
const NAME_HI = {
  bairagarh: "बैरागढ़ (संत हिरदाराम) कुंड", khatlapura: "खटलापुरा घाट", prempura: "प्रेमपुरा घाट",
  "rani-kamlapati": "रानी कमलापति घाट / कमला पार्क कुंड", hathaikheda: "हथाईखेड़ा डैम / कुंड",
  malikhedi: "मालीखेड़ी कुंड", shahpura: "शाहपुरा झील घाट",
};
const LAKE = new Set(["bairagarh", "prempura", "khatlapura", "rani-kamlapati"]);
const UNIT = { pH: "", Turbidity: "NTU", Conductivity: "µS/cm" };
const unitOf = (p) => (p in UNIT ? UNIT[p] : "mg/l");
const LIMIT = { "Dissolved oxygen": "≥ 5", BOD: "≤ 3", pH: "6.5–8.5" };
const W_P = { "Dissolved oxygen": 0.45, BOD: 0.4, pH: 0.15 };
const W_Y = { 2025: 1.0, 2024: 0.75, 2023: 0.5 };
const W_PH = { pre: 0.5, during: 1.0, after: 1.0 };
const clip = (x) => Math.max(0, Math.min(1, x));
const exceed = (p, v) =>
  p === "Dissolved oxygen" ? clip((5 - v) / 5) : p === "BOD" ? clip((v - 3) / 9) : clip(v < 6.5 ? 6.5 - v : v > 8.5 ? v - 8.5 : 0);
const breaches = (p, v) => (p === "Dissolved oxygen" ? v < 5 : p === "BOD" ? v > 3 : v < 6.5 || v > 8.5);
const FY = [[2023, "Ganesh"], [2023, "Durga"], [2024, "Ganesh"], [2024, "Durga"], [2025, "Ganesh"], [2025, "Durga"]];
const PHASES = ["pre", "during", "after"];
const PARAMS = ["pH", "Dissolved oxygen", "BOD", "COD", "Total solids", "Dissolved solids", "Suspended solids", "Turbidity", "Conductivity", "Chromium", "Lead", "Zinc", "Copper"];
const P_HI = {
  "Dissolved oxygen": "घुलित ऑक्सीजन", BOD: "बीओडी", pH: "पीएच", COD: "सीओडी", Turbidity: "गंदलापन", Chromium: "क्रोमियम",
  Lead: "सीसा", Zinc: "जस्ता", Copper: "तांबा", Conductivity: "चालकता", "Suspended solids": "निलंबित ठोस",
  "Total solids": "कुल ठोस", "Dissolved solids": "घुलित ठोस",
};
const PH_EN = { pre: "before immersion", during: "during immersion", after: "after immersion" };
const PH_HI = { pre: "विसर्जन से पहले", during: "विसर्जन के दौरान", after: "विसर्जन के बाद" };
const F_HI = { Ganesh: "गणेश", Durga: "दुर्गा" };
const LIM_EN = { "Dissolved oxygen": "at least 5 mg/l", BOD: "at most 3 mg/l", pH: "between 6.5 and 8.5" };
const LIM_HI = { "Dissolved oxygen": "कम से कम 5 mg/l", BOD: "अधिकतम 3 mg/l", pH: "6.5 से 8.5 के बीच" };
const MISSING = new Set(["not sampled", "*", "**", "_"]);
const r2 = (x) => Math.round(x * 100) / 100;

const readingsBy = {};
const meta = {};
for (const r of raw) {
  const slug = SLUG[r.site];
  if (!slug) continue;
  meta[slug] ??= { water_body: r.water_body, conf: "high" };
  if (r.site_match_confidence === "medium") meta[slug].conf = "medium";
  const num = r.value !== "" && !r.flag ? Number(r.value) : null;
  const isCore = r.parameter in LIMIT;
  const status =
    num === null ? (r.flag === "BDL" ? "no_limit" : "missing") : isCore ? (breaches(r.parameter, num) ? "breach" : "ok") : "no_limit";
  (readingsBy[slug] ??= []).push({
    year: Number(r.year), festival: r.festival, phase: r.phase, parameter: r.parameter, value: num,
    unit: unitOf(r.parameter), flag: r.flag || null, value_as_printed: r.value_as_printed || null,
    limit_class_b: LIMIT[r.parameter] ?? null, status, page: Number(r.source_page), pdf: String(r.year),
  });
}

const all = Object.values(readingsBy).flat();
const core = (p) => all.filter((x) => x.parameter === p && x.value !== null);
const summary = {
  do_readings: core("Dissolved oxygen").length,
  do_below_5: core("Dissolved oxygen").filter((x) => x.value < 5).length,
  do_zero: core("Dissolved oxygen").filter((x) => x.value === 0).length,
  bod_readings: core("BOD").length,
  bod_above_3: core("BOD").filter((x) => x.value > 3).length,
  ph_readings: core("pH").length,
  ph_outside: core("pH").filter((x) => x.value < 6.5 || x.value > 8.5).length,
};

const CONTEXT = ["Chromium", "Copper", "Lead", "Zinc", "COD", "Turbidity"];
const ctxOwner = {};
for (const p of CONTEXT) {
  const xs = all.filter((x) => x.parameter === p && x.value !== null);
  const mx = xs.reduce((a, b) => (b.value > a.value ? b : a));
  for (const slug in readingsBy) if (readingsBy[slug].includes(mx)) (ctxOwner[slug] ??= []).push(mx);
}

const u = (x) => (x.unit ? " " + x.unit : "");
const breachText = (x) => ({
  en: `${x.parameter} was ${x.value}${u(x)} ${PH_EN[x.phase]}, ${x.festival} ${x.year}. The bathing limit is ${LIM_EN[x.parameter]}. Source: MPPCB ${x.year} report, page ${x.page}.`,
  hi: `${F_HI[x.festival]} ${x.year}, ${PH_HI[x.phase]} ${P_HI[x.parameter]} ${x.value}${u(x)} दर्ज हुई। स्नान मानक ${LIM_HI[x.parameter]} है। स्रोत: MPPCB ${x.year} रिपोर्ट, पृष्ठ ${x.page}।`,
});
const ctxText = (x) => ({
  en: `${x.parameter} ${x.value}${u(x)} ${PH_EN[x.phase]}, ${x.festival} ${x.year}: highest of the 7 ghats. No CPCB bathing limit set. Source: MPPCB ${x.year} report, page ${x.page}.`,
  hi: `${F_HI[x.festival]} ${x.year}, ${PH_HI[x.phase]} ${P_HI[x.parameter]} ${x.value}${u(x)}: 7 घाटों में सबसे अधिक। इसके लिए CPCB स्नान मानक तय नहीं। स्रोत: MPPCB ${x.year} रिपोर्ट, पृष्ठ ${x.page}।`,
});
const reason = (kind, x, text) => ({
  kind, parameter: x.parameter, value: x.value, unit: x.unit, limit: x.limit_class_b ?? "no CPCB bathing limit",
  year: x.year, festival: x.festival, phase: x.phase, source: { report: `MPPCB ${x.year}`, pdf: x.pdf, page: x.page }, text,
});

const ACTION = {
  aerate: { en: "Aerate: floating aerators, DO spot checks on immersion day and day +7", hi: "वायु-संचार: तैरते एरेटर, विसर्जन के दिन और 7 दिन बाद DO जाँच" },
  clean: { en: "Clean: nirmalya collection point and extra cleaning crew before and after", hi: "सफाई: निर्माल्य संग्रह केंद्र, पहले और बाद में अतिरिक्त सफाई दल" },
  test_first: { en: "Test first: pre-immersion sample by 17 Oct, all three phases this year", hi: "पहले जाँच: 17 अक्टूबर तक विसर्जन-पूर्व नमूना, इस वर्ष तीनों चरण" },
  sample_metals: { en: "Sample metals: during and after immersion", hi: "धातु जाँच: विसर्जन के दौरान और बाद में नमूना" },
  lake_ban: { en: "Lake ban: NGT bars lake immersion; route idols to designated kunds, keep baseline testing", hi: "झील पर रोक: NGT ने झील में विसर्जन रोका है; मूर्तियाँ निर्धारित कुंडों में भेजें, आधार जाँच जारी रखें" },
};

function gapsFor(rs) {
  const gaps = [];
  for (const [y, f] of FY) {
    const fy = rs.filter((x) => x.year === y && x.festival === f);
    if (!fy.length) {
      gaps.push({ year: y, festival: f, phase: null, parameters: [], text: { en: `No ${f} ${y} test exists for this ghat.`, hi: `इस घाट के लिए ${F_HI[f]} ${y} की कोई जाँच उपलब्ध नहीं।` } });
      continue;
    }
    for (const ph of PHASES) {
      const miss = fy.filter((x) => x.phase === ph && x.flag && MISSING.has(x.flag)).map((x) => x.parameter);
      if (miss.length)
        gaps.push({
          year: y, festival: f, phase: ph, parameters: miss,
          text: {
            en: `${f} ${y}, ${PH_EN[ph]}: not sampled: ${miss.join(", ")}.`,
            hi: `${F_HI[f]} ${y}, ${PH_HI[ph]}: नमूना नहीं लिया गया: ${miss.map((m) => P_HI[m] ?? m).join(", ")}।`,
          },
        });
    }
    if (!fy.some((x) => x.parameter === "Suspended solids"))
      gaps.push({ year: y, festival: f, phase: null, parameters: ["Suspended solids"], text: { en: `${f} ${y}: suspended solids not reported.`, hi: `${F_HI[f]} ${y}: निलंबित ठोस दर्ज नहीं।` } });
  }
  return gaps;
}

const ghats = [];
const details = {};
for (const slug of Object.keys(readingsBy)) {
  const rs = readingsBy[slug];
  const avail = rs.filter((x) => x.parameter in W_P && x.value !== null);
  let num = 0;
  let den = 0;
  const contrib = avail.map((x) => {
    const w = W_P[x.parameter] * W_Y[x.year] * W_PH[x.phase];
    const e = exceed(x.parameter, x.value);
    num += w * e;
    den += w;
    return { x, c: w * e };
  });
  const score = den ? num / den : 0;
  const br = (xs) => (xs.length ? xs.filter((x) => breaches(x.parameter, x.value)).length / xs.length : 0);
  const coverage = avail.length / 54;
  const years = [...new Set(avail.map((x) => x.year))].sort();
  const delta = br(avail.filter((x) => x.year === years.at(-1))) - br(avail.filter((x) => x.year === years[0]));
  const trend = delta >= 0.15 ? "worsening" : delta <= -0.15 ? "improving" : "stable";
  const hasDurga25 = rs.some((x) => x.year === 2025 && x.festival === "Durga");
  const DO = avail.filter((x) => x.parameter === "Dissolved oxygen");
  const doZero = DO.find((x) => x.value === 0 && x.year >= 2024);
  const doD25 = DO.filter((x) => x.year === 2025 && x.festival === "Durga" && x.value < 3);
  const pct = Math.round(coverage * 100);
  let tier;
  let tier_rule;
  if (coverage < 0.5 || !hasDurga25) {
    tier = "insufficient_data";
    tier_rule = !hasDurga25
      ? { en: `Insufficient data: no Durga 2025 table for this ghat (coverage ${pct}%). Score is on partial data.`, hi: `आंकड़े अपर्याप्त: इस घाट की दुर्गा 2025 तालिका नहीं है (कवरेज ${pct}%)। स्कोर आंशिक आंकड़ों पर है।` }
      : { en: `Insufficient data: coverage ${pct}% is below 50%.`, hi: `आंकड़े अपर्याप्त: कवरेज ${pct}%, 50% से कम।` };
  } else if (doZero) {
    tier = "high";
    tier_rule = { en: `High: dissolved oxygen was 0 mg/l in ${doZero.festival} ${doZero.year}.`, hi: `उच्च: ${F_HI[doZero.festival]} ${doZero.year} में घुलित ऑक्सीजन 0 mg/l थी।` };
  } else if (doD25.length) {
    const lo = Math.min(...doD25.map((x) => x.value));
    tier = "high";
    tier_rule = { en: `High: dissolved oxygen below 3 mg/l in Durga 2025 (lowest ${lo} mg/l).`, hi: `उच्च: दुर्गा 2025 में घुलित ऑक्सीजन 3 mg/l से कम (न्यूनतम ${lo} mg/l)।` };
  } else if (score >= 0.45) {
    tier = "high";
    tier_rule = { en: `High: score ${score.toFixed(2)} is 0.45 or more.`, hi: `उच्च: स्कोर ${score.toFixed(2)}, 0.45 या अधिक।` };
  } else if (score >= 0.25) {
    tier = "medium";
    tier_rule = { en: `Medium: score ${score.toFixed(2)} is between 0.25 and 0.45.`, hi: `मध्यम: स्कोर ${score.toFixed(2)}, 0.25 और 0.45 के बीच।` };
  } else {
    tier = "low";
    tier_rule = { en: `Low: score ${score.toFixed(2)} is below 0.25 and no oxygen alarm fired.`, hi: `कम: स्कोर ${score.toFixed(2)}, 0.25 से कम, ऑक्सीजन चेतावनी नहीं।` };
  }
  const top = contrib.filter((c) => c.c > 0).sort((a, b) => b.c - a.c || b.x.year - a.x.year).slice(0, 3);
  const reasons = top.map(({ x }) => reason("breach", x, breachText(x)));
  for (const x of (ctxOwner[slug] ?? []).slice(0, 2)) reasons.push(reason("context", x, ctxText(x)));
  if (!hasDurga25)
    reasons.push({
      kind: "gap", parameter: "All parameters", value: null, unit: "", limit: "", year: 2025, festival: "Durga", phase: null,
      source: { report: "MPPCB 2025", pdf: "2025", page: 64 },
      text: {
        en: "No Durga 2025 test exists for this ghat. The 2025 report's Durga tables (pages 64–65) do not list it.",
        hi: "इस घाट की दुर्गा 2025 की कोई जाँच नहीं है। 2025 रिपोर्ट की दुर्गा तालिकाओं (पृष्ठ 64–65) में यह घाट नहीं है।",
      },
    });

  const doShare = num ? contrib.filter((c) => c.x.parameter === "Dissolved oxygen").reduce((a, c) => a + c.c, 0) / num : 0;
  const codes = [];
  if (tier === "insufficient_data") codes.push("test_first");
  if (doShare >= 0.5 || DO.some((x) => x.year >= 2024 && x.value < 3)) codes.push("aerate");
  if (avail.some((x) => x.parameter === "BOD" && x.year >= 2024 && x.value > 3) || (ctxOwner[slug] ?? []).some((x) => ["COD", "Turbidity"].includes(x.parameter))) codes.push("clean");
  if (rs.some((x) => ["Chromium", "Lead", "Zinc", "Copper"].includes(x.parameter) && x.value !== null && x.value >= 1)) codes.push("sample_metals");
  if (LAKE.has(slug)) codes.push("lake_ban");

  // MOCK forecast numbers (placeholder until the backend champion model is served)
  const pre = [[2025, "Durga"], [2025, "Ganesh"], [2024, "Durga"], [2024, "Ganesh"]].find(([y, f]) =>
    rs.some((x) => x.year === y && x.festival === f && x.phase === "pre" && x.value !== null),
  );
  const p = r2(clip(0.4 + 0.6 * score));
  const forecast = {
    available: true, champion: "lightgbm", p_breach: p,
    models: { logreg: r2(clip(p - 0.06)), random_forest: r2(clip(p - 0.02)), xgboost: r2(clip(p + 0.03)), lightgbm: p },
    basis: { year: pre[0], festival: pre[1], phase: "pre" },
    top_reasons: [
      { feature: "pre_do", direction: "up", text: { en: "Low dissolved oxygen before immersion raises the chance of a breach.", hi: "विसर्जन से पहले कम घुलित ऑक्सीजन से उल्लंघन की संभावना बढ़ती है।" } },
      { feature: "site_type_lake", direction: "up", text: { en: "Lake and kund sites breach more often across MP (lake 85%, kund 72%).", hi: "मध्यप्रदेश में झील और कुंड स्थलों पर उल्लंघन अधिक होता है (झील 85%, कुंड 72%)।" } },
      { feature: "prior_breach_rate", direction: "up", text: { en: "This site breached the limit in earlier years.", hi: "इस स्थल पर पिछले वर्षों में भी मानक का उल्लंघन हुआ।" } },
    ],
  };
  ghats.push({
    slug, name: { en: Object.keys(SLUG).find((k) => SLUG[k] === slug), hi: NAME_HI[slug] },
    water_body: meta[slug].water_body, ngt_lake_ban: LAKE.has(slug), site_confidence: meta[slug].conf,
    rank: 0, tier, tier_rule, score: r2(score), breach_rate: r2(br(avail)), coverage: r2(coverage), trend,
    readings_available: avail.length, readings_expected: 54, reasons,
    actions: codes.map((code) => ({ code, text: ACTION[code] })), forecast,
  });
  const order = (x) => FY.findIndex(([y, f]) => y === x.year && f === x.festival) * 3 + PHASES.indexOf(x.phase);
  const series = {};
  for (const p2 of ["Dissolved oxygen", "BOD"]) {
    series[p2] = FY.flatMap(([y, f]) =>
      PHASES.map((ph) => {
        const hit = rs.find((x) => x.year === y && x.festival === f && x.phase === ph && x.parameter === p2);
        return { label: `${f} ${y} ${ph}`, value: hit && hit.value !== null ? hit.value : null };
      }),
    );
  }
  details[slug] = {
    readings: [...rs].sort((a, b) => order(a) - order(b) || PARAMS.indexOf(a.parameter) - PARAMS.indexOf(b.parameter)),
    gaps: gapsFor(rs),
    series,
  };
}
const TIER_ORDER = { insufficient_data: 0, high: 1, medium: 2, low: 3 };
ghats.sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || b.score - a.score);
ghats.forEach((g, i) => (g.rank = i + 1));

const generated_at = "2026-10-11T12:30:00+05:30";
const write = (f, o) => fs.writeFileSync(path.join(OUT, f), JSON.stringify(o, null, 2) + "\n", "utf8");
write("ranking.json", {
  generated_at, standard: "CPCB class B (outdoor bathing)",
  weights: { param: { DO: 0.45, BOD: 0.4, pH: 0.15 }, year: { 2025: 1.0, 2024: 0.75, 2023: 0.5 }, phase: { pre: 0.5, during: 1.0, after: 1.0 } },
  summary, ghats,
});
for (const g of ghats) write(`ghats/${g.slug}.json`, { ...g, ...details[g.slug] });
write("gaps.json", { generated_at, ghats: ghats.map((g) => ({ slug: g.slug, name: g.name, gaps: details[g.slug].gaps })) });

const TIER_EN = { insufficient_data: "Insufficient data", high: "High risk", medium: "Medium risk", low: "Low risk" };
const TIER_HI = { insufficient_data: "आंकड़े अपर्याप्त", high: "उच्च जोखिम", medium: "मध्यम जोखिम", low: "कम जोखिम" };
const firstReason = (g, l) => (g.reasons.find((r) => r.kind === "breach") ?? g.reasons[0]).text[l];
const gapGhats = ghats.filter((g) => g.tier === "insufficient_data");
const en = `# Durga Visarjan 2026 — Ghat water-quality risk brief

**Bhopal Municipal Corporation.** Prepared 11 Oct 2026 from MPPCB immersion reports 2023–25, for immersion on 20 Oct 2026.

## Situation

Across the 7 ghats, ${summary.do_below_5} of ${summary.do_readings} dissolved-oxygen readings were below the bathing limit of 5 mg/l (${summary.do_zero} were zero). ${summary.bod_above_3} of ${summary.bod_readings} BOD readings were above the limit of 3 mg/l.

## Ranked ghats

${ghats.map((g) => `${g.rank}. **${g.name.en}** — ${TIER_EN[g.tier]}. ${firstReason(g, "en")} Action: ${g.actions.map((a) => a.text.en.split(":")[0]).join(", ")}.`).join("\n")}

## Data gaps

${gapGhats.map((g) => g.name.en).join(" and ")} have no Durga 2025 test (2025 report, pages 64–65). Test these first, before 17 Oct. Suspended solids were not reported in Durga 2023 or Durga 2025.

---

Standard: CPCB class B (outdoor bathing): DO ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5. Readings are reported against limits; no health effects are claimed. Sources: MPPCB idol immersion reports 2023 (pages 26–28, 59–61), 2024 (pages 23–26, 69–72), 2025 (pages 28–30, 64–65). NGT has banned immersion in Upper and Lower Lake; route idols to designated kunds.
`;
const hi = `# दुर्गा विसर्जन 2026 — घाट जल-गुणवत्ता जोखिम सार

**भोपाल नगर निगम।** 11 अक्टूबर 2026 को MPPCB विसर्जन रिपोर्ट 2023–25 से तैयार, 20 अक्टूबर 2026 के विसर्जन हेतु।

## स्थिति

7 घाटों पर घुलित ऑक्सीजन के ${summary.do_readings} में से ${summary.do_below_5} माप स्नान मानक 5 mg/l से कम थे (${summary.do_zero} शून्य थे)। बीओडी के ${summary.bod_readings} में से ${summary.bod_above_3} माप 3 mg/l की सीमा से अधिक थे।

## घाटों की जोखिम सूची

${ghats.map((g) => `${g.rank}. **${g.name.hi}** — ${TIER_HI[g.tier]}। ${firstReason(g, "hi")} कार्रवाई: ${g.actions.map((a) => a.text.hi.split(":")[0]).join(", ")}।`).join("\n")}

## आंकड़ों की कमी

${gapGhats.map((g) => g.name.hi).join(" और ")} की दुर्गा 2025 की कोई जाँच नहीं है (2025 रिपोर्ट, पृष्ठ 64–65)। इनकी जाँच 17 अक्टूबर से पहले करें। दुर्गा 2023 और दुर्गा 2025 में निलंबित ठोस दर्ज नहीं किए गए।

---

मानक: CPCB श्रेणी B (खुले में स्नान): DO ≥ 5 mg/l, BOD ≤ 3 mg/l, pH 6.5–8.5। माप मानकों के सापेक्ष दिए गए हैं; स्वास्थ्य प्रभाव का दावा नहीं। स्रोत: MPPCB मूर्ति विसर्जन रिपोर्ट 2023 (पृष्ठ 26–28, 59–61), 2024 (पृष्ठ 23–26, 69–72), 2025 (पृष्ठ 28–30, 64–65)। NGT ने बड़ी और छोटी झील में विसर्जन पर रोक लगाई है; मूर्तियाँ निर्धारित कुंडों में भेजें।
`;
const plain = (m) => m.replace(/^#+ /gm, "").replace(/\*\*/g, "").replace(/^---\n/gm, "");
write("brief.json", { markdown: { en, hi }, plain: { en: plain(en), hi: plain(hi) }, generated_at });

const imp = (pairs) => pairs.map(([feature, importance]) => ({ feature, importance }));
write("leaderboard.json", {
  champion: "lightgbm",
  selection_rule: "Best mean GroupKFold(5) ROC-AUC grouped by site; tie-break on lower Brier score.",
  rows: [
    { model: "lightgbm", auc_groupkfold: 0.81, auc_temporal_2025: 0.78, pr_auc: 0.79, brier: 0.17, logloss: 0.51, f1: 0.74 },
    { model: "xgboost", auc_groupkfold: 0.8, auc_temporal_2025: 0.77, pr_auc: 0.78, brier: 0.18, logloss: 0.53, f1: 0.73 },
    { model: "random_forest", auc_groupkfold: 0.79, auc_temporal_2025: 0.76, pr_auc: 0.77, brier: 0.18, logloss: 0.54, f1: 0.72 },
    { model: "logreg", auc_groupkfold: 0.74, auc_temporal_2025: 0.72, pr_auc: 0.71, brier: 0.2, logloss: 0.59, f1: 0.68 },
  ],
  n_train: 544,
  features: ["pre_ph", "pre_do", "pre_bod", "pre_cod", "pre_ts", "pre_tds", "pre_turbidity", "pre_conductivity", "site_type_lake", "site_type_kund", "site_type_river", "festival_durga", "year", "prior_breach_rate"],
  importances: {
    lightgbm: imp([["pre_do", 0.24], ["pre_bod", 0.19], ["prior_breach_rate", 0.14], ["site_type_lake", 0.1], ["pre_cod", 0.08], ["pre_turbidity", 0.06], ["pre_conductivity", 0.05], ["year", 0.04]]),
    xgboost: imp([["pre_do", 0.22], ["pre_bod", 0.2], ["prior_breach_rate", 0.13], ["site_type_lake", 0.11]]),
    random_forest: imp([["pre_bod", 0.21], ["pre_do", 0.2], ["pre_cod", 0.12], ["prior_breach_rate", 0.11]]),
    logreg: imp([["pre_do", 0.31], ["pre_bod", 0.25], ["site_type_lake", 0.15], ["site_type_river", 0.09]]),
  },
});
write("allocate.json", {
  experimental: true, budget: 8,
  plan: [
    { slug: "bairagarh", action: "test", cost: 1, q_gain: 3.1 },
    { slug: "malikhedi", action: "test", cost: 1, q_gain: 2.9 },
    { slug: "shahpura", action: "aerate", cost: 3, q_gain: 2.4 },
    { slug: "rani-kamlapati", action: "aerate", cost: 3, q_gain: 2.2 },
  ],
  policy_values: { cql: -6.2, heuristic: -6.9, random: -9.4, do_nothing: -10.8 },
  caveat: {
    en: "Experimental. No intervention outcomes are logged in the data, so this policy was trained on a simulator calibrated to MPPCB readings, not on real results. Use it only as a suggestion for splitting a fixed budget. Logging 2026 actions lets next year's model learn from real outcomes.",
    hi: "प्रायोगिक। आंकड़ों में किसी कार्रवाई का परिणाम दर्ज नहीं है, इसलिए यह नीति MPPCB मापों पर आधारित सिम्युलेटर से सीखी गई है, वास्तविक परिणामों से नहीं। इसे केवल तय बजट बाँटने के सुझाव के रूप में लें। 2026 की कार्रवाइयाँ दर्ज करने से अगले वर्ष मॉडल वास्तविक परिणामों से सीख सकेगा।",
  },
});
fs.writeFileSync(
  path.join(OUT, "README.txt"),
  "PLACEHOLDER DATA\n\nEvery JSON file in this folder was generated by frontend/scripts/make-mock.mjs from the data pack CSV\n(track-2-visarjan-ghat-watch/data/bhopal_ghats_2023_2025.csv) using the PLAN.md section 3 rules.\nReadings, pages, scores and tiers follow the real data; the forecast blocks, leaderboard.json and allocate.json\ncontain MOCK model numbers.\n\nAll files are placeholders replaced by backend/scripts/build_artifacts.py at integration (same names and layout):\n  ranking.json, gaps.json, brief.json, leaderboard.json, allocate.json, ghats/{slug}.json\n",
);
console.log(ghats.map((g) => `${g.rank} ${g.slug} ${g.tier} score=${g.score} cov=${g.coverage} trend=${g.trend} actions=${g.actions.map((a) => a.code)}`).join("\n"));
console.log(summary);
