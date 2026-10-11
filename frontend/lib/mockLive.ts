// Demo generator: emits exactly the amendment-B shapes (snapshot, then ticks) when no backend is
// reachable. Dynamics are a plausible toy, seeded from ranking.json. Honest by construction:
// unsensored ghats never expose hidden values until a test team takes a lab reading.

import { GHAT_ORDER, travelMin } from "./ghatGeo";
import type {
  Alert,
  Bi,
  CommandRes,
  ControlReq,
  DispatchReq,
  DispatchRes,
  GhatLive,
  LiveEvent,
  LiveTier,
  Point,
  Resource,
  ResourceKind,
  Scenario,
  Series,
  SeriesParam,
  Severity,
  SimState,
  SimStateLite,
  SitrepRes,
  Suggestion,
  SuggestionsRes,
  TickMsg,
  Values,
  WsMsg,
} from "./liveTypes";
import type { Lang, Ranking } from "./types";

const MIN = 60_000;
export const T_START = Date.UTC(2026, 9, 20, 9, 30); // 2026-10-20T15:00+05:30
const HORIZON_MIN = 15 * 60;
const KEEP_MIN = 6 * 60;

interface Meta {
  name: Bi;
  water_body: string;
  ngt: boolean;
  sensored: boolean;
  do0: number; // pre-immersion DO (observed Durga 2025 pre, or hidden truth for unsensored)
  bod0: number;
  turb0: number;
  ph0: number;
  cond0: number;
  share: number; // share of idols
  sag: number; // DO sag per (idols/h) at equilibrium, mg/l
  source: Bi;
}

const SRC_PRE: Bi = { en: "Durga 2025 pre, MPPCB 2025 p. 64/65", hi: "दुर्गा 2025 पूर्व, MPPCB 2025 पृ. 64/65" };
const SRC_GANESH: Bi = { en: "assumed from Ganesh 2025 during, p. 28", hi: "गणेश 2025 दौरान से अनुमानित, पृ. 28" };

const META: Record<string, Meta> = {
  bairagarh: { name: { en: "Bairagarh (Sant Hirdaram) kund", hi: "बैरागढ़ (संत हिरदाराम) कुंड" }, water_body: "Upper Lake", ngt: true, sensored: false, do0: 0.6, bod0: 9.5, turb0: 18, ph0: 7.6, cond0: 410, share: 0.17, sag: 0.003, source: SRC_GANESH },
  malikhedi: { name: { en: "Malikhedi kund", hi: "मालीखेड़ी कुंड" }, water_body: "Kund", ngt: false, sensored: false, do0: 0.9, bod0: 8.8, turb0: 22, ph0: 7.7, cond0: 450, share: 0.16, sag: 0.004, source: SRC_GANESH },
  shahpura: { name: { en: "Shahpura lake ghat", hi: "शाहपुरा झील घाट" }, water_body: "Shahpura Lake", ngt: false, sensored: true, do0: 2.5, bod0: 5.4, turb0: 12, ph0: 7.9, cond0: 380, share: 0.18, sag: 0.0055, source: SRC_PRE },
  "rani-kamlapati": { name: { en: "Rani Kamlapati ghat / Kamla Park kund", hi: "रानी कमलापति घाट / कमला पार्क कुंड" }, water_body: "Lower Lake", ngt: true, sensored: true, do0: 2.6, bod0: 4.6, turb0: 9, ph0: 8.0, cond0: 360, share: 0.07, sag: 0.013, source: SRC_PRE },
  hathaikheda: { name: { en: "Hathaikheda dam / kund", hi: "हथाईखेड़ा डैम / कुंड" }, water_body: "Hathaikheda dam", ngt: false, sensored: true, do0: 7.4, bod0: 2.6, turb0: 7, ph0: 7.8, cond0: 300, share: 0.28, sag: 0.0052, source: SRC_PRE },
  khatlapura: { name: { en: "Khatlapura ghat", hi: "खटलापुरा घाट" }, water_body: "Lower Lake", ngt: true, sensored: true, do0: 5.9, bod0: 2.5, turb0: 8, ph0: 8.1, cond0: 340, share: 0.07, sag: 0.02, source: SRC_PRE },
  prempura: { name: { en: "Prempura ghat", hi: "प्रेमपुरा घाट" }, water_body: "Upper Lake", ngt: true, sensored: true, do0: 6.6, bod0: 2.2, turb0: 6, ph0: 8.2, cond0: 320, share: 0.07, sag: 0.017, source: SRC_PRE },
};

const SCENARIOS: Scenario[] = [
  { name: "ngt_ban", label: { en: "NGT ban enforced (default)", hi: "NGT रोक लागू (डिफ़ॉल्ट)" }, params: { idols_total: 12000, lake_share: 0.15 } },
  { name: "ban_not_enforced", label: { en: "Ban not enforced (2025 shares)", hi: "रोक लागू नहीं (2025 हिस्सेदारी)" }, params: { idols_total: 12000, lake_share: 0.45 } },
  { name: "heavy_turnout", label: { en: "Heavy turnout (+40%)", hi: "भारी भीड़ (+40%)" }, params: { idols_total: 16800, lake_share: 0.15 } },
];

const RES_DEF: { id: string; kind: ResourceKind; en: string; hi: string }[] = [
  { id: "aer-1", kind: "aerator", en: "Aerator 1", hi: "एरेटर 1" },
  { id: "aer-2", kind: "aerator", en: "Aerator 2", hi: "एरेटर 2" },
  { id: "aer-3", kind: "aerator", en: "Aerator 3", hi: "एरेटर 3" },
  { id: "crew-1", kind: "crew", en: "Cleaning crew 1", hi: "सफाई दल 1" },
  { id: "crew-2", kind: "crew", en: "Cleaning crew 2", hi: "सफाई दल 2" },
  { id: "crew-3", kind: "crew", en: "Cleaning crew 3", hi: "सफाई दल 3" },
  { id: "test-1", kind: "test_team", en: "Test team 1", hi: "जाँच दल 1" },
  { id: "test-2", kind: "test_team", en: "Test team 2", hi: "जाँच दल 2" },
  { id: "div-1", kind: "diversion", en: "Diversion squad", hi: "डायवर्जन दल" },
];

const KIND_NAME: Record<ResourceKind, Bi> = {
  aerator: { en: "aerator", hi: "एरेटर" },
  crew: { en: "cleaning crew", hi: "सफाई दल" },
  test_team: { en: "test team", hi: "जाँच दल" },
  diversion: { en: "diversion squad", hi: "डायवर्जन दल" },
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Arrival intensity by IST hour: small bump in the late afternoon, main peak 17:00–23:00. */
function profile(t: number): number {
  const h = (((t / MIN + 330) / 60) % 24 + 24) % 24; // IST hour of day
  const peak = Math.exp(-(((h - 20) / 2.4) ** 2));
  const late = h >= 23 || h < 6 ? 0.08 : 0;
  return 0.12 + peak + late;
}
const PROFILE_SUM_PER_MIN = (() => {
  let s = 0;
  for (let m = 0; m < HORIZON_MIN; m++) s += profile(T_START + m * MIN);
  return s;
})();

interface Truth {
  DO: number;
  BOD: number;
  turb: number;
  sagState: number;
  load: number; // cumulative organic load index
  idolsTotal: number;
  idolsPerH: number;
  crewUntil: number;
  diverted: boolean;
}

interface Obs {
  sensor: "live" | "stale" | "none";
  last_seen: number | null;
  values: Values;
  as_of: Partial<Record<keyof Values, number | null>>;
  series: Series; // 6 h ring
  bodMeasured: boolean;
  liveUntil: number | null; // for test-team readings at unsensored ghats
  pendingLab: { due: number; bod: number; cod: number }[];
}

interface Transit {
  resId: string;
  ghat: string;
  arrive: number;
  workUntil: number | null;
}

export type MockListener = (msg: WsMsg) => void;

export class MockLive {
  private ranking: Ranking | null;
  private rand = mulberry32(20261020);
  private seq = 0;
  private t = T_START;
  private speed = 180;
  private running = true;
  private scenario: Scenario = SCENARIOS[0];
  private truth: Record<string, Truth> = {};
  private obs: Record<string, Obs> = {};
  private ghats: Record<string, GhatLive> = {};
  private resources: Resource[] = [];
  private transits: Transit[] = [];
  private alerts: Record<string, Alert> = {};
  private clearSince: Record<string, number> = {};
  private events: LiveEvent[] = [];
  private suggestions: Suggestion[] = [];
  private suggestionsVersion = 1;
  private sitrepVersion = 1;
  private readingsTotal = 0;
  private pending: { points: Record<string, Partial<Series>>; upsert: Map<string, Alert>; resolved: string[]; events: LiveEvent[] } = this.emptyPending();
  private fracMin = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<MockListener>();
  private idSeq = 0;

  constructor(ranking: Ranking | null) {
    this.ranking = ranking;
    this.reset();
  }

  private emptyPending() {
    return { points: {} as Record<string, Partial<Series>>, upsert: new Map<string, Alert>(), resolved: [] as string[], events: [] as LiveEvent[] };
  }

  private nid(p: string) {
    this.idSeq += 1;
    return `${p}-${this.idSeq}`;
  }

  private reset() {
    this.rand = mulberry32(20261020);
    this.t = T_START;
    this.fracMin = 0;
    this.truth = {};
    this.obs = {};
    this.alerts = {};
    this.clearSince = {};
    this.events = [];
    this.transits = [];
    this.readingsTotal = 0;
    this.pending = this.emptyPending();
    for (const slug of GHAT_ORDER) {
      const m = META[slug];
      this.truth[slug] = { DO: m.do0, BOD: m.bod0, turb: m.turb0, sagState: 0, load: 0, idolsTotal: 0, idolsPerH: 0, crewUntil: 0, diverted: false };
      const series: Series = { DO: [], BOD: [], turbidity: [] };
      const values: Values = { DO: null, BOD: null, COD: null, pH: null, turbidity: null, conductivity: null, TSS: null, temp: null };
      this.obs[slug] = { sensor: m.sensored ? "live" : "none", last_seen: null, values, as_of: {}, series, bodMeasured: false, liveUntil: null, pendingLab: [] };
      if (m.sensored) {
        // 60 min of pre-roll so sparklines are not empty at t0 (steady state, noise only).
        for (let k = 60; k >= 1; k--) this.sensorReading(slug, T_START - k * MIN, false);
        this.obs[slug].pendingLab.push({ due: T_START + 90 * MIN, bod: 0, cod: 0 });
      }
    }
    this.resources = RES_DEF.map((r) => ({ id: r.id, kind: r.kind, name: { en: r.en, hi: r.hi }, at: "depot", status: "idle", target: null, eta_min: null, since: T_START }));
    for (const slug of GHAT_ORDER) this.recompute(slug);
    this.evaluateAlerts(true);
    this.pending = this.emptyPending();
    this.pushEvent("control", null, { en: `Simulation reset: ${this.scenario.label.en}, start 15:00 IST.`, hi: `सिमुलेशन रीसेट: ${this.scenario.label.hi}, आरंभ 15:00 IST।` });
    this.computeSuggestions();
    this.sitrepVersion += 1;
    this.seq += 1;
  }

  // ---------- simulation ----------

  private noise(sd: number) {
    // Box-Muller-lite: sum of uniforms
    return (this.rand() + this.rand() + this.rand() - 1.5) * sd * 1.15;
  }

  private sensorReading(slug: string, t: number, record = true) {
    const tr = this.truth[slug];
    const m = META[slug];
    const o = this.obs[slug];
    if (this.rand() < 0.01 && record) return; // 1% dropout
    const DO = Math.max(0, r2(tr.DO + this.noise(0.12)));
    const turb = Math.max(0, r1(tr.turb * (1 + this.noise(0.05))));
    const ph = r2(m.ph0 + this.noise(0.05));
    const cond = Math.round(m.cond0 * (1 + this.noise(0.02)) + tr.idolsTotal * 0.02);
    o.values.DO = DO;
    o.values.turbidity = turb;
    o.values.pH = ph;
    o.values.conductivity = cond;
    o.values.temp = r1(26 + this.noise(0.2));
    o.values.TSS = r1(turb * 1.25);
    for (const p of ["DO", "turbidity", "pH", "conductivity", "temp", "TSS"] as const) o.as_of[p] = t;
    o.last_seen = t;
    this.pushPoint(slug, "DO", [t, DO]);
    this.pushPoint(slug, "turbidity", [t, turb]);
    if (record) this.readingsTotal += 1;
  }

  private pushPoint(slug: string, p: SeriesParam, pt: Point) {
    const s = this.obs[slug].series[p];
    s.push(pt);
    const cut = pt[0] - KEEP_MIN * MIN;
    while (s.length && s[0][0] < cut) s.shift();
    const pend = (this.pending.points[slug] ??= {});
    (pend[p] ??= []).push(pt);
  }

  private stepMinute() {
    this.t += MIN;
    const params = this.scenario.params as { idols_total: number; lake_share: number };
    const total = params.idols_total;
    const baseIntensity = (total * profile(this.t)) / PROFILE_SUM_PER_MIN; // idols this minute, city-wide
    for (const slug of GHAT_ORDER) {
      const m = META[slug];
      const tr = this.truth[slug];
      let share = m.share;
      if (m.ngt) share = share * (params.lake_share / 0.15);
      if (tr.diverted) share *= 0.3;
      const lam = baseIntensity * share;
      const idols = Math.max(0, Math.round(lam + this.noise(Math.sqrt(Math.max(lam, 0.01)))));
      tr.idolsTotal += idols;
      tr.idolsPerH = tr.idolsPerH * (59 / 60) + idols; // ~ per-hour rolling sum
      const crew = this.t < tr.crewUntil ? 0.5 : 1;
      tr.load += idols * crew;
      // DO sag: first-order towards sag * idols/h, plus aerator recovery
      const aerators = this.resources.filter((r) => r.kind === "aerator" && r.status === "working" && r.at === slug).length;
      const target = Math.min(m.do0 * 0.95, m.sag * tr.idolsPerH * crew);
      tr.sagState += (target - tr.sagState) * 0.03;
      const aerBoost = Math.min(2, aerators) * 0.035;
      tr.sagState = Math.max(-1.5, tr.sagState - aerBoost * (1 + tr.sagState * 0.2));
      tr.DO = Math.max(0, Math.min(9.5, m.do0 - tr.sagState));
      tr.BOD = m.bod0 + tr.load * 0.0028 * (m.sensored ? 1 : 1.5);
      tr.turb = m.turb0 + tr.idolsPerH * 0.12 + (this.rand() < 0.002 ? 20 : 0);

      const o = this.obs[slug];
      if (m.sensored) {
        this.sensorReading(slug, this.t);
        // lab BOD every 60 min, 30 min lag; first result after 90 min
        const minsIn = Math.round((this.t - T_START) / MIN);
        if (minsIn > 0 && minsIn % 60 === 0) o.pendingLab.push({ due: this.t + 30 * MIN, bod: 0, cod: 0 });
      }
      for (const lab of o.pendingLab.filter((l) => l.due <= this.t)) {
        const bod = r1(tr.BOD * (1 + this.noise(0.08)));
        lab.bod = bod;
        o.values.BOD = bod;
        o.values.COD = r1(bod * 3.6 + 8);
        o.as_of.BOD = this.t;
        o.as_of.COD = this.t;
        o.bodMeasured = true;
        this.pushPoint(slug, "BOD", [this.t, bod]);
        this.readingsTotal += 1;
      }
      o.pendingLab = o.pendingLab.filter((l) => l.due > this.t);
      // staleness
      if (m.sensored) o.sensor = o.last_seen !== null && this.t - o.last_seen > 10 * MIN ? "stale" : "live";
      else if (o.liveUntil !== null) o.sensor = this.t <= o.liveUntil ? "live" : "stale";
    }
    this.advanceResources();
    for (const slug of GHAT_ORDER) this.recompute(slug);
    this.evaluateAlerts(false);
  }

  private advanceResources() {
    for (const tr of [...this.transits]) {
      const res = this.resources.find((r) => r.id === tr.resId);
      if (!res) continue;
      if (res.status === "en_route") {
        const left = Math.max(0, Math.round((tr.arrive - this.t) / MIN));
        res.eta_min = left;
        if (this.t >= tr.arrive) {
          res.status = "working";
          res.at = tr.ghat;
          res.eta_min = null;
          res.since = this.t;
          this.pushEvent("arrival", tr.ghat, {
            en: `${res.name.en} arrived at ${META[tr.ghat].name.en}.`,
            hi: `${res.name.hi} ${META[tr.ghat].name.hi} पहुँचा।`,
          });
          this.applyEffect(res, tr);
        }
      } else if (res.status === "working" && tr.workUntil !== null && this.t >= tr.workUntil) {
        res.status = "idle";
        res.target = null;
        res.since = this.t;
        this.transits = this.transits.filter((x) => x !== tr);
      }
    }
  }

  private applyEffect(res: Resource, tr: Transit) {
    const g = tr.ghat;
    const name = META[g].name;
    if (res.kind === "aerator") {
      this.pushEvent("effect", g, { en: `Aeration started at ${name.en}; DO expected to recover over 30–60 min.`, hi: `${name.hi} पर वायु-संचार शुरू; 30–60 मिनट में DO सुधरने की उम्मीद।` });
    } else if (res.kind === "crew") {
      this.truth[g].crewUntil = this.t + 120 * MIN;
      this.truth[g].load *= 0.4;
      tr.workUntil = this.t + 120 * MIN;
      this.pushEvent("effect", g, { en: `Nirmalya removal at ${name.en}; organic input halved for 2 h.`, hi: `${name.hi} पर निर्माल्य हटाया गया; 2 घंटे तक जैविक भार आधा।` });
    } else if (res.kind === "test_team") {
      const o = this.obs[g];
      const truth = this.truth[g];
      const m = META[g];
      const DO = Math.max(0, r2(truth.DO + this.noise(0.1)));
      const bod = r1(truth.BOD * (1 + this.noise(0.08)));
      o.values = { DO, BOD: bod, COD: r1(bod * 3.6 + 8), pH: r2(m.ph0 + this.noise(0.05)), turbidity: r1(truth.turb), conductivity: Math.round(m.cond0), TSS: r1(truth.turb * 1.25), temp: 26 };
      for (const p of Object.keys(o.values) as (keyof Values)[]) o.as_of[p] = this.t;
      o.last_seen = this.t;
      o.bodMeasured = true;
      this.pushPoint(g, "DO", [this.t, DO]);
      this.pushPoint(g, "BOD", [this.t, bod]);
      this.pushPoint(g, "turbidity", [this.t, r1(truth.turb)]);
      this.readingsTotal += 8;
      if (!m.sensored) o.liveUntil = this.t + 120 * MIN;
      o.sensor = "live";
      tr.workUntil = this.t + 20 * MIN;
      this.pushEvent("effect", g, {
        en: `Lab reading at ${name.en}: DO ${DO} mg/l, BOD ${bod} mg/l.`,
        hi: `${name.hi} पर लैब माप: DO ${DO} mg/l, BOD ${bod} mg/l।`,
      });
    } else {
      this.truth[g].diverted = true;
      this.pushEvent("effect", g, { en: `Diversion active at ${name.en}: 70% of arrivals routed to the nearest kund.`, hi: `${name.hi} पर डायवर्जन: 70% मूर्तियाँ निकटतम कुंड भेजी गईं।` });
    }
  }

  private windowOf(pts: Point[]) {
    if (!pts.length) return null;
    const now = pts[pts.length - 1][0];
    const inLast = (m: number) => pts.filter((p) => p[0] > now - m * MIN).map((p) => p[1]);
    const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : null);
    const last30 = pts.filter((p) => p[0] > now - 30 * MIN);
    let slope: number | null = null;
    if (last30.length >= 5) {
      const xs = last30.map((p) => (p[0] - now) / (60 * MIN));
      const ys = last30.map((p) => p[1]);
      const mx = xs.reduce((s, v) => s + v, 0) / xs.length;
      const my = ys.reduce((s, v) => s + v, 0) / ys.length;
      let num = 0;
      let den = 0;
      xs.forEach((x, i) => {
        num += (x - mx) * (ys[i] - my);
        den += (x - mx) ** 2;
      });
      slope = den > 0 ? r2(num / den) : null;
    }
    const l60 = inLast(60);
    const m5 = mean(inLast(5));
    const m30 = mean(inLast(30));
    return { mean_5: m5 === null ? null : r2(m5), mean_30: m30 === null ? null : r2(m30), slope_per_h: slope, min_60: l60.length ? Math.min(...l60) : null, max_60: l60.length ? Math.max(...l60) : null };
  }

  private recompute(slug: string) {
    const m = META[slug];
    const o = this.obs[slug];
    const tr = this.truth[slug];
    const rk = this.ranking?.ghats.find((g) => g.slug === slug);
    const continuous = m.sensored && o.sensor !== "none";
    const doW = continuous ? this.windowOf(o.series.DO) : null;
    const tuW = continuous ? this.windowOf(o.series.turbidity) : null;
    const doNow = doW?.mean_5 ?? o.values.DO;
    const bod = o.values.BOD;
    let tier: LiveTier;
    let note: Bi;
    let score: number | null = null;
    let partial = false;
    if (o.sensor === "none" || o.sensor === "stale" || doNow === null) {
      tier = "no_data";
      note =
        o.sensor === "stale"
          ? { en: "Last lab reading is old; send a test team", hi: "अंतिम लैब माप पुराना; जाँच दल भेजें" }
          : { en: "No live sensor; status unknown, not clean", hi: "लाइव सेंसर नहीं; स्थिति अज्ञात, साफ़ नहीं" };
    } else {
      const parts: [number, number][] = [[0.45, Math.max(0, Math.min(1, (5 - doNow) / 5))]];
      if (bod !== null) parts.push([0.4, Math.max(0, Math.min(1, (bod - 3) / 3))]);
      else partial = true;
      const ph = o.values.pH;
      if (ph !== null) parts.push([0.15, ph < 6.5 || ph > 8.5 ? 1 : 0]);
      const wsum = parts.reduce((s, p) => s + p[0], 0);
      score = r2(parts.reduce((s, p) => s + p[0] * p[1], 0) / wsum);
      if (doNow < 2 || doNow === 0) tier = "critical";
      else if (doNow < 3 || score >= 0.45) tier = "high";
      else if (score >= 0.25 || (bod !== null && bod > 6)) tier = "medium";
      else tier = "low";
      if (!o.bodMeasured && doNow >= 5 && (tier === "low" || tier === "medium")) {
        tier = "medium";
        note = { en: "DO within limit, BOD not yet measured", hi: "DO सीमा में, BOD अभी मापा नहीं गया" };
      } else if (tier === "critical") note = { en: "DO below 2 mg/l", hi: "DO 2 mg/l से कम" };
      else if (tier === "high") note = doNow < 5 ? { en: "DO below the 5 mg/l limit", hi: "DO 5 mg/l सीमा से कम" } : { en: "BOD above limit", hi: "BOD सीमा से अधिक" };
      else if (tier === "medium") note = { en: "Close to limits; watch", hi: "सीमा के पास; निगरानी रखें" };
      else note = { en: "Within class B limits", hi: "श्रेणी B सीमा में" };
    }
    const slope = doW?.slope_per_h ?? null;
    const etaTo = (lvl: number) => (doNow !== null && slope !== null && slope < -0.05 && doNow > lvl ? Math.round(((doNow - lvl) / -slope) * 60) : null);
    const resOn = this.resources.filter((r) => r.at === slug && r.status === "working").map((r) => r.id);
    const open = Object.values(this.alerts).filter((a) => a.ghat === slug && a.state !== "resolved").map((a) => a.id);
    this.ghats[slug] = {
      slug,
      name: rk?.name ?? m.name,
      water_body: rk?.water_body ?? m.water_body,
      ngt_lake_ban: rk?.ngt_lake_ban ?? m.ngt,
      sensor: o.sensor,
      last_seen: o.last_seen,
      live_tier: tier,
      live_score: score,
      partial,
      tier_note: note,
      breach: {
        DO: doNow === null ? null : doNow < 5,
        BOD: bod === null ? null : bod > 3,
        pH: o.values.pH === null ? null : o.values.pH < 6.5 || o.values.pH > 8.5,
      },
      values: { ...o.values },
      as_of: { ...o.as_of },
      windows: { DO: doW, turbidity: tuW },
      eta: { do_5: etaTo(5), do_3: etaTo(3), do_0: etaTo(0) },
      p_breach: rk?.forecast?.p_breach ?? null,
      anomaly: [],
      idols_per_h: Math.round(tr.idolsPerH),
      idols_total: tr.idolsTotal,
      resources_on_site: resOn,
      open_alerts: open,
      initial_source: m.source,
      simulated: true,
    };
  }

  // ---------- alerts ----------

  private upsertAlert(ghat: string, code: string, severity: Severity, text: Bi, speak: Bi, values: Record<string, number>, recommended: string[], baselineRun: boolean) {
    const key = `${ghat}:${code}`;
    delete this.clearSince[key];
    const cur = this.alerts[key];
    const rank: Record<Severity, number> = { info: 0, warn: 1, high: 2, critical: 3 };
    if (cur && cur.state !== "resolved") {
      if (rank[severity] > rank[cur.severity]) {
        const next: Alert = { ...cur, severity, text, speak, values, t_update: this.t, state: "open", baseline: false };
        this.alerts[key] = next;
        this.pending.upsert.set(next.id, next);
      }
      return;
    }
    const a: Alert = { id: this.nid(`al-${ghat}-${code}`), t_open: this.t, t_update: this.t, ghat, code, severity, text, speak, values, recommended, state: "open", baseline: baselineRun };
    if (baselineRun && code !== "NO_SENSOR") {
      a.text = { en: `${text.en} Already below the limit before immersion (Durga 2025 pre, MPPCB 2025 p. 64/65).`, hi: `${text.hi} विसर्जन से पहले ही सीमा से कम था (दुर्गा 2025 पूर्व, MPPCB 2025 पृ. 64/65)।` };
    }
    this.alerts[key] = a;
    this.pending.upsert.set(a.id, a);
  }

  private clearAlert(ghat: string, code: string) {
    const key = `${ghat}:${code}`;
    const cur = this.alerts[key];
    if (!cur || cur.state === "resolved") return;
    const since = (this.clearSince[key] ??= this.t);
    if (this.t - since >= 15 * MIN) {
      cur.state = "resolved";
      this.pending.resolved.push(cur.id);
      delete this.alerts[key];
      delete this.clearSince[key];
    }
  }

  private evaluateAlerts(baseline: boolean) {
    for (const slug of GHAT_ORDER) {
      const g = this.ghats[slug];
      const n = g.name;
      if (g.sensor === "none") {
        this.upsertAlert(slug, "NO_SENSOR", "info", { en: `${n.en}: no live sensor. Status unknown, not clean.`, hi: `${n.hi}: लाइव सेंसर नहीं। स्थिति अज्ञात, साफ़ नहीं।` }, { en: `${n.en} has no live data.`, hi: `${n.hi} का लाइव डेटा नहीं है।` }, {}, ["test_team"], baseline);
      } else this.clearAlert(slug, "NO_SENSOR");
      const DO = g.windows.DO?.mean_5 ?? (g.sensor === "live" ? g.values.DO : null);
      if (DO !== null && DO < 5) {
        const sev: Severity = DO < 1 ? "critical" : DO < 3 ? "high" : "warn";
        const d = r1(DO);
        this.upsertAlert(
          slug,
          "DO_LOW",
          sev,
          { en: `${n.en}: dissolved oxygen ${d} mg/l, below the 5 mg/l limit.`, hi: `${n.hi}: घुलित ऑक्सीजन ${d} mg/l, 5 mg/l सीमा से कम।` },
          { en: `${n.en}. Dissolved oxygen ${d}. Below limit.`, hi: `${n.hi}। घुलित ऑक्सीजन ${d}। सीमा से कम।` },
          { DO: d },
          ["aerator"],
          baseline,
        );
      } else if (DO !== null && DO >= 5.5) this.clearAlert(slug, "DO_LOW");
      const eta = g.eta.do_5;
      if (DO !== null && DO >= 5 && eta !== null && eta <= 60) {
        this.upsertAlert(slug, "DO_ETA_60", "high", { en: `${n.en}: DO projected to fall below 5 mg/l in about ${eta} min.`, hi: `${n.hi}: लगभग ${eta} मिनट में DO 5 mg/l से नीचे जाने का अनुमान।` }, { en: `${n.en}. Oxygen will cross the limit in about ${eta} minutes.`, hi: `${n.hi}। लगभग ${eta} मिनट में ऑक्सीजन सीमा से नीचे जाएगी।` }, { DO: r1(DO), eta_min: eta }, ["aerator"], baseline);
      } else this.clearAlert(slug, "DO_ETA_60");
      const slope = g.windows.DO?.slope_per_h ?? null;
      if (DO !== null && slope !== null && slope <= -1 && DO < 6.5) {
        const s = r1(slope);
        this.upsertAlert(slug, "DO_FALLING_FAST", "warn", { en: `${n.en}: DO falling fast, ${s} mg/l per hour.`, hi: `${n.hi}: DO तेज़ी से गिर रहा, ${s} mg/l प्रति घंटा।` }, { en: `${n.en}. Oxygen falling fast.`, hi: `${n.hi}। ऑक्सीजन तेज़ी से गिर रही है।` }, { slope_per_h: s }, ["aerator", "crew"], baseline);
      } else if (slope === null || slope > -0.5) this.clearAlert(slug, "DO_FALLING_FAST");
      const bod = g.values.BOD;
      if (bod !== null && bod > 3) {
        const sev: Severity = bod > 8 ? "high" : "warn";
        this.upsertAlert(slug, "BOD_HIGH", sev, { en: `${n.en}: lab BOD ${bod} mg/l, above the 3 mg/l limit.`, hi: `${n.hi}: लैब BOD ${bod} mg/l, 3 mg/l सीमा से अधिक।` }, { en: `${n.en}. Lab BOD ${Math.round(bod)}. Above limit.`, hi: `${n.hi}। लैब बीओडी ${Math.round(bod)}। सीमा से अधिक।` }, { BOD: bod }, ["crew"], baseline);
      } else if (bod !== null && bod <= 2.7) this.clearAlert(slug, "BOD_HIGH");
    }
    for (const slug of GHAT_ORDER) {
      this.ghats[slug].open_alerts = Object.values(this.alerts).filter((a) => a.ghat === slug && a.state !== "resolved").map((a) => a.id);
    }
    if (this.pending.upsert.size || this.pending.resolved.length) this.computeSuggestions();
  }

  // ---------- dispatch / suggestions ----------

  private computeSuggestions() {
    const items: Suggestion[] = [];
    const idleKinds = new Set(this.resources.filter((r) => r.status === "idle").map((r) => r.kind));
    const busyAt = (slug: string, kind: ResourceKind) => this.resources.some((r) => r.kind === kind && r.status !== "idle" && (r.at === slug || r.target === slug));
    for (const slug of GHAT_ORDER) {
      const g = this.ghats[slug];
      const tm = travelMin("depot", slug);
      const add = (kind: ResourceKind, q: number, en: string, hi: string) => {
        if (!idleKinds.has(kind) || busyAt(slug, kind)) return;
        items.push({ id: this.nid("sg"), kind, ghat: slug, q_gain: r2(q), travel_min: tm, rank_score: r2(q - 0.02 * tm), reason: { en: `${en} Experimental (heuristic, demo generator).`, hi: `${hi} प्रायोगिक (नियम-आधारित, डेमो जनरेटर)।` }, experimental: true });
      };
      if (g.sensor !== "live") add("test_team", 1.6, `${g.name.en}: no live data; a lab reading reveals the real state.`, `${g.name.hi}: लाइव डेटा नहीं; लैब माप से असली स्थिति पता चलेगी।`);
      const DO = g.windows.DO?.mean_5 ?? g.values.DO;
      if (g.sensor === "live" && DO !== null && DO < 5.5) add("aerator", 1.2 + (5.5 - DO) * 0.25, `${g.name.en}: DO ${r1(DO)} mg/l and falling with arrivals.`, `${g.name.hi}: DO ${r1(DO)} mg/l, आगमन के साथ गिर रहा।`);
      if (g.idols_per_h > 60 && (g.values.BOD ?? 0) > 3) add("crew", 0.6 + g.idols_per_h / 500, `${g.name.en}: ${g.idols_per_h} idols/h; nirmalya load rising.`, `${g.name.hi}: ${g.idols_per_h} मूर्ति/घंटा; निर्माल्य भार बढ़ रहा।`);
      if (g.ngt_lake_ban && g.idols_per_h > 20 && !this.truth[slug].diverted) add("diversion", 0.5, `${g.name.en}: arrivals at an NGT-ban lake ghat.`, `${g.name.hi}: NGT रोक वाले झील घाट पर आगमन।`);
    }
    items.sort((a, b) => b.rank_score - a.rank_score);
    this.suggestions = items.slice(0, 5);
    this.suggestionsVersion += 1;
  }

  private pushEvent(kind: LiveEvent["kind"], ghat: string | null, text: Bi) {
    const e: LiveEvent = { id: this.nid("ev"), t: this.t, kind, ghat, text };
    this.events.push(e);
    if (this.events.length > 200) this.events.shift();
    this.pending.events.push(e);
    this.sitrepVersion += 1;
  }

  // ---------- public API (mirrors REST) ----------

  subscribe(fn: MockListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  start() {
    if (this.timer) return;
    this.emit({ type: "snapshot", seq: this.seq, state: this.snapshot() });
    this.timer = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private emit(msg: WsMsg) {
    this.listeners.forEach((f) => f(msg));
  }

  private tick() {
    if (this.running && this.t < T_START + HORIZON_MIN * MIN) {
      this.fracMin += this.speed / 60;
      let steps = Math.floor(this.fracMin);
      this.fracMin -= steps;
      while (steps-- > 0 && this.t < T_START + HORIZON_MIN * MIN) this.stepMinute();
    }
    this.seq += 1;
    const ghats: Record<string, GhatLive> = {};
    for (const s of GHAT_ORDER) ghats[s] = { ...this.ghats[s] };
    const msg: TickMsg = {
      type: "tick",
      seq: this.seq,
      t: this.t,
      speed: this.speed,
      running: this.running,
      scenario: this.scenario,
      ghats,
      points: this.pending.points,
      resources: this.resources.map((r) => ({ ...r })),
      alerts_upsert: [...this.pending.upsert.values()].map((a) => ({ ...a })),
      alerts_resolved: [...this.pending.resolved],
      events: [...this.pending.events],
      suggestions_version: this.suggestionsVersion,
      sitrep_version: this.sitrepVersion,
    };
    this.pending = this.emptyPending();
    this.emit(msg);
  }

  snapshot(): SimState {
    const ghats: Record<string, GhatLive> = {};
    const cut = this.t - 120 * MIN;
    for (const s of GHAT_ORDER) {
      const ser = this.obs[s].series;
      ghats[s] = { ...this.ghats[s], series: { DO: ser.DO.filter((p) => p[0] >= cut), BOD: ser.BOD.filter((p) => p[0] >= cut), turbidity: ser.turbidity.filter((p) => p[0] >= cut) } };
    }
    return {
      seq: this.seq,
      t: this.t,
      t_start: T_START,
      speed: this.speed,
      running: this.running,
      scenario: this.scenario,
      source: "sim",
      ghats,
      resources: this.resources.map((r) => ({ ...r })),
      alerts_open: Object.values(this.alerts).map((a) => ({ ...a })),
      events_recent: this.events.slice(-50),
      suggestions: this.suggestions,
      suggestions_version: this.suggestionsVersion,
      sitrep_version: this.sitrepVersion,
      stats: {
        idols_total: GHAT_ORDER.reduce((s, g) => s + this.truth[g].idolsTotal, 0),
        idols_by_ghat: Object.fromEntries(GHAT_ORDER.map((g) => [g, this.truth[g].idolsTotal])),
        readings_total: this.readingsTotal,
        rejected_total: 0,
      },
    };
  }

  private lite(): SimStateLite {
    return { seq: this.seq, t: this.t, speed: this.speed, running: this.running, scenario: this.scenario };
  }

  /** Re-emit a fresh snapshot (used after reset/scenario so clients re-baseline). */
  private resnap() {
    this.emit({ type: "snapshot", seq: this.seq, state: this.snapshot() });
  }

  control(req: ControlReq): SimStateLite {
    if (req.action === "start") this.running = true;
    else if (req.action === "pause") this.running = false;
    else if (req.action === "speed" && typeof req.value === "number" && [1, 60, 180, 600].includes(req.value)) this.speed = req.value;
    else if (req.action === "reset") {
      this.reset();
      this.resnap();
      return this.lite();
    } else if (req.action === "scenario") {
      const sc = SCENARIOS.find((s) => s.name === req.value);
      if (sc) {
        this.scenario = sc;
        this.reset();
        this.resnap();
        return this.lite();
      }
    }
    if (req.action === "start" || req.action === "pause" || req.action === "speed") {
      const v = req.action === "speed" ? `${this.speed}×` : req.action === "start" ? "running" : "paused";
      const vh = req.action === "speed" ? `${this.speed}×` : req.action === "start" ? "चालू" : "रुका";
      this.pushEvent("control", null, { en: `Simulation ${req.action === "speed" ? "speed " : ""}${v}.`, hi: `सिमुलेशन ${req.action === "speed" ? "गति " : ""}${vh}।` });
    }
    return this.lite();
  }

  scenarios(): Scenario[] {
    return SCENARIOS;
  }

  dispatch(req: DispatchReq): DispatchRes {
    if (!META[req.ghat]) return { ok: false, error: { en: "Unknown ghat.", hi: "अज्ञात घाट।" } };
    const idle = this.resources.filter((r) => r.kind === req.kind && r.status === "idle");
    if (!idle.length) return { ok: false, error: { en: `No idle ${KIND_NAME[req.kind].en} available.`, hi: `कोई खाली ${KIND_NAME[req.kind].hi} उपलब्ध नहीं।` } };
    idle.sort((a, b) => travelMin(a.at, req.ghat) - travelMin(b.at, req.ghat));
    const res = idle[0];
    const eta = res.at === req.ghat ? 5 : travelMin(res.at, req.ghat);
    res.status = "en_route";
    res.target = req.ghat;
    res.eta_min = eta;
    res.since = this.t;
    const tr: Transit = { resId: res.id, ghat: req.ghat, arrive: this.t + eta * MIN, workUntil: null };
    this.transits = this.transits.filter((x) => x.resId !== res.id);
    this.transits.push(tr);
    const n = META[req.ghat].name;
    this.pushEvent("dispatch", req.ghat, { en: `${res.name.en} dispatched to ${n.en}, ETA ${eta} min.`, hi: `${res.name.hi} ${n.hi} भेजा गया, ${eta} मिनट में पहुँचेगा।` });
    this.computeSuggestions();
    return { ok: true, order: { id: this.nid("ord"), resource_id: res.id, kind: req.kind, ghat: req.ghat, eta_min: eta } };
  }

  ack(alertId: string): { ok: boolean } {
    const a = Object.values(this.alerts).find((x) => x.id === alertId);
    if (!a) return { ok: false };
    a.state = "acked";
    a.t_update = this.t;
    this.pending.upsert.set(a.id, { ...a });
    return { ok: true };
  }

  getSuggestions(): SuggestionsRes {
    return { version: this.suggestionsVersion, items: this.suggestions };
  }

  sitrep(): SitrepRes {
    const fmtT = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(this.t);
    const order: LiveTier[] = ["critical", "high", "no_data", "medium", "low"];
    const gs = GHAT_ORDER.map((s) => this.ghats[s]).sort((a, b) => order.indexOf(a.live_tier) - order.indexOf(b.live_tier));
    const tierEn: Record<LiveTier, string> = { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM", low: "LOW", no_data: "NO LIVE DATA" };
    const tierHi: Record<LiveTier, string> = { critical: "गंभीर", high: "उच्च", medium: "मध्यम", low: "कम", no_data: "लाइव डेटा नहीं" };
    const open = Object.values(this.alerts).filter((a) => a.state !== "resolved");
    const cnt = (s: Severity) => open.filter((a) => a.severity === s).length;
    const deployed = this.resources.filter((r) => r.status !== "idle");
    const lineEn = (g: GhatLive) => {
      const v = g.values;
      if (g.sensor === "none") return `- **${g.name.en}**: ${tierEn[g.live_tier]}. No live data; status unknown, not clean.`;
      const eta = g.eta.do_5 !== null ? `, DO < 5 in ~${g.eta.do_5} min` : "";
      return `- **${g.name.en}**: ${tierEn[g.live_tier]}. DO ${v.DO ?? "n/a"} mg/l, BOD ${v.BOD ?? "awaiting lab"}${eta}. Resources on site: ${g.resources_on_site.length}.`;
    };
    const lineHi = (g: GhatLive) => {
      const v = g.values;
      if (g.sensor === "none") return `- **${g.name.hi}**: ${tierHi[g.live_tier]}। लाइव डेटा नहीं; स्थिति अज्ञात, साफ़ नहीं।`;
      const eta = g.eta.do_5 !== null ? `, लगभग ${g.eta.do_5} मिनट में DO < 5` : "";
      return `- **${g.name.hi}**: ${tierHi[g.live_tier]}। DO ${v.DO ?? "उपलब्ध नहीं"} mg/l, BOD ${v.BOD ?? "लैब प्रतीक्षा"}${eta}। मौके पर संसाधन: ${g.resources_on_site.length}।`;
    };
    const banEn = gs.filter((g) => g.ngt_lake_ban && g.idols_total > 0).map((g) => `${g.name.en} ${g.idols_total}`).join(", ");
    const banHi = gs.filter((g) => g.ngt_lake_ban && g.idols_total > 0).map((g) => `${g.name.hi} ${g.idols_total}`).join(", ");
    const en = [
      `# Situation report, ${fmtT} IST (SIMULATED)`,
      `Scenario: ${this.scenario.label.en}. Speed ${this.speed}×. Idols so far: ${GHAT_ORDER.reduce((s, g) => s + this.truth[g].idolsTotal, 0)}.`,
      `Open alerts: ${cnt("critical")} critical, ${cnt("high")} high, ${cnt("warn")} warn, ${cnt("info")} info.`,
      "## Ghats",
      ...gs.map(lineEn),
      "## Resources",
      deployed.length ? deployed.map((r) => `- ${r.name.en}: ${r.status === "en_route" ? `en route to ${META[r.target ?? ""]?.name.en ?? r.target}, ETA ${r.eta_min} min` : `working at ${META[r.at]?.name.en ?? r.at}`}`).join("\n") : "- All units at depot.",
      banEn ? `## NGT lake ban\nArrivals at lake ghats under the ban: ${banEn}.` : "",
      `Next review: ${new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(this.t + 30 * MIN)} IST.`,
    ].filter(Boolean).join("\n\n");
    const hi = [
      `# स्थिति रिपोर्ट, ${fmtT} IST (सिमुलेटेड)`,
      `परिदृश्य: ${this.scenario.label.hi}। गति ${this.speed}×। अब तक मूर्तियाँ: ${GHAT_ORDER.reduce((s, g) => s + this.truth[g].idolsTotal, 0)}।`,
      `खुले अलर्ट: ${cnt("critical")} गंभीर, ${cnt("high")} उच्च, ${cnt("warn")} चेतावनी, ${cnt("info")} सूचना।`,
      "## घाट",
      ...gs.map(lineHi),
      "## संसाधन",
      deployed.length ? deployed.map((r) => `- ${r.name.hi}: ${r.status === "en_route" ? `${META[r.target ?? ""]?.name.hi ?? r.target} की ओर, ${r.eta_min} मिनट` : `${META[r.at]?.name.hi ?? r.at} पर कार्यरत`}`).join("\n") : "- सभी इकाइयाँ डिपो पर।",
      banHi ? `## NGT झील रोक\nरोक वाले झील घाटों पर आगमन: ${banHi}।` : "",
    ].filter(Boolean).join("\n\n");
    const worst = gs.filter((g) => g.live_tier === "critical" || g.live_tier === "high");
    const speakEn = [
      `Situation at ${fmtT}.`,
      `${cnt("critical")} critical and ${cnt("high")} high alerts open.`,
      ...worst.slice(0, 4).map((g) => `${g.name.en.split(" /")[0]}: dissolved oxygen ${g.values.DO !== null ? Math.round(g.values.DO * 10) / 10 : "unknown"}.`),
      `${gs.filter((g) => g.sensor !== "live").length} ghats have no live data.`,
      `${deployed.length} units deployed.`,
    ].join(" ");
    const speakHi = [
      `${fmtT} की स्थिति।`,
      `${cnt("critical")} गंभीर और ${cnt("high")} उच्च अलर्ट खुले हैं।`,
      ...worst.slice(0, 4).map((g) => `${g.name.hi.split(" /")[0]}: घुलित ऑक्सीजन ${g.values.DO !== null ? Math.round(g.values.DO * 10) / 10 : "अज्ञात"}।`),
      `${gs.filter((g) => g.sensor !== "live").length} घाटों का लाइव डेटा नहीं है।`,
      `${deployed.length} इकाइयाँ तैनात।`,
    ].join(" ");
    return { version: this.sitrepVersion, t: this.t, markdown: { en, hi }, speak: { en: speakEn, hi: speakHi } };
  }

  history(slug: string, param: SeriesParam, minutes: number): Point[] {
    const s = this.obs[slug]?.series[param] ?? [];
    return s.filter((p) => p[0] >= this.t - minutes * MIN);
  }

  command(text: string, lang: Lang): CommandRes {
    return parseCommand(text, lang, this);
  }

  ghatStatusLine(slug: string): Bi {
    const g = this.ghats[slug];
    if (!g) return { en: "Unknown ghat.", hi: "अज्ञात घाट।" };
    if (g.sensor === "none") return { en: `${g.name.en}: no live data. Send a test team.`, hi: `${g.name.hi}: लाइव डेटा नहीं। जाँच दल भेजें।` };
    const DO = g.values.DO !== null ? r1(g.values.DO) : null;
    const bodEn = g.values.BOD !== null ? `BOD ${r1(g.values.BOD)}` : "BOD awaiting lab";
    const bodHi = g.values.BOD !== null ? `बीओडी ${r1(g.values.BOD)}` : "बीओडी लैब प्रतीक्षा";
    return { en: `${g.name.en}: dissolved oxygen ${DO ?? "unknown"}, ${bodEn}. Tier ${g.live_tier.replace("_", " ")}.`, hi: `${g.name.hi}: घुलित ऑक्सीजन ${DO ?? "अज्ञात"}, ${bodHi}।` };
  }

  allStatus(): Bi {
    const gs = GHAT_ORDER.map((s) => this.ghats[s]);
    const bad = gs.filter((g) => g.live_tier === "critical" || g.live_tier === "high");
    const nd = gs.filter((g) => g.live_tier === "no_data");
    return {
      en: `${bad.length} ghats critical or high: ${bad.map((g) => g.name.en.split(" /")[0]).join(", ") || "none"}. ${nd.length} with no live data.`,
      hi: `${bad.length} घाट गंभीर या उच्च: ${bad.map((g) => g.name.hi.split(" /")[0]).join(", ") || "कोई नहीं"}। ${nd.length} का लाइव डेटा नहीं।`,
    };
  }
}

// ---------- command parser (6 intents, en + hi) ----------

const ALIASES: [string, string[]][] = [
  ["bairagarh", ["bairagarh", "bairagadh", "sant hirdaram", "बैरागढ़", "बैरागढ"]],
  ["shahpura", ["shahpura", "शाहपुरा"]],
  ["rani-kamlapati", ["rani kamlapati", "kamlapati", "kamla park", "रानी कमलापति", "कमलापति", "कमला पार्क"]],
  ["khatlapura", ["khatlapura", "खटलापुरा"]],
  ["prempura", ["prempura", "प्रेमपुरा"]],
  ["hathaikheda", ["hathaikheda", "hathai kheda", "हथाईखेड़ा", "हथाईखेडा"]],
  ["malikhedi", ["malikhedi", "mali khedi", "मालीखेड़ी", "मालीखेडी"]],
];

export function findGhat(text: string): string | null {
  const s = text.toLowerCase();
  for (const [slug, al] of ALIASES) if (al.some((a) => s.includes(a))) return slug;
  return null;
}

function findKind(s: string): ResourceKind | null {
  if (/aerator|aerat|एरेटर|वायु/.test(s)) return "aerator";
  if (/test|जाँच|जांच/.test(s)) return "test_team";
  if (/crew|clean|सफाई|दल/.test(s)) return "crew";
  if (/divert|diversion|डायवर्ज/.test(s)) return "diversion";
  return null;
}

function parseCommand(text: string, _lang: Lang, sim: MockLive): CommandRes {
  const s = text.toLowerCase().trim();
  const none = { type: "none" as const };
  if (!s || /^(help|मदद|सहायता)/.test(s)) {
    return {
      intent: "help",
      args: {},
      ok: true,
      speak: { en: "Say: status Shahpura, status all, read sitrep, send aerator to Shahpura, pause, or start.", hi: "बोलें: शाहपुरा की स्थिति, सभी की स्थिति, रिपोर्ट पढ़ो, शाहपुरा एरेटर भेजो, रोको, या चालू करो।" },
      ui_action: none,
    };
  }
  if (/^(send|dispatch)\b|भेज/.test(s)) {
    const kind = findKind(s);
    const ghat = findGhat(s);
    if (!kind || !ghat) return { intent: "send", args: { kind, ghat }, ok: false, speak: { en: "Say which unit and which ghat, for example: send aerator to Shahpura.", hi: "इकाई और घाट बताएं, जैसे: शाहपुरा एरेटर भेजो।" }, ui_action: none };
    const r = sim.dispatch({ kind, ghat });
    if (!r.ok) return { intent: "send", args: { kind, ghat }, ok: false, speak: r.error ?? { en: "Dispatch failed.", hi: "भेजना विफल।" }, ui_action: none };
    return { intent: "send", args: { kind, ghat }, ok: true, speak: { en: `${KIND_NAME[kind].en} sent to ${META[ghat].name.en.split(" /")[0]}. Arrives in ${r.order?.eta_min} minutes.`, hi: `${KIND_NAME[kind].hi} ${META[ghat].name.hi.split(" /")[0]} भेजा गया। ${r.order?.eta_min} मिनट में पहुँचेगा।` }, ui_action: { type: "select_ghat", value: ghat } };
  }
  if (/sitrep|situation|report|रिपोर्ट|स्थिति रिपोर्ट/.test(s)) {
    return { intent: "read_sitrep", args: {}, ok: true, speak: sim.sitrep().speak, ui_action: { type: "open_tab", value: "sitrep" } };
  }
  if (/^(pause|stop)\b|रोको|रोकें|रोक दो/.test(s)) {
    sim.control({ action: "pause" });
    return { intent: "pause", args: {}, ok: true, speak: { en: "Simulation paused.", hi: "सिमुलेशन रोका गया।" }, ui_action: { type: "control", value: "pause" } };
  }
  if (/^(start|resume|play)\b|चालू|शुरू/.test(s)) {
    sim.control({ action: "start" });
    return { intent: "start", args: {}, ok: true, speak: { en: "Simulation running.", hi: "सिमुलेशन चालू।" }, ui_action: { type: "control", value: "start" } };
  }
  if (/status|स्थिति|हाल/.test(s) || findGhat(s)) {
    const ghat = findGhat(s);
    if (ghat) return { intent: "status", args: { ghat }, ok: true, speak: sim.ghatStatusLine(ghat), ui_action: { type: "select_ghat", value: ghat } };
    if (/all|सभी|सब/.test(s)) return { intent: "status_all", args: {}, ok: true, speak: sim.allStatus(), ui_action: none };
  }
  return { intent: "unknown", args: {}, ok: false, speak: { en: "Not understood. Say help for the list of commands.", hi: "समझ नहीं आया। आदेशों की सूची के लिए मदद बोलें।" }, ui_action: none };
}
