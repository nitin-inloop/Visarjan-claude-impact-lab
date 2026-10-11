// Plain-language words for the simple UI (home, brief, ghat page, intake).
// Short sentences, everyday words. Status is always colour + icon + word.
import type { ActionCode, Lang, Reason, Tier } from "./types";

export interface StatusLook {
  icon: string;
  word: Record<Lang, string>;
  hint: Record<Lang, string>;
  /** text colour */
  fg: string;
  /** background */
  bg: string;
  /** border */
  bd: string;
  /** solid marker fill */
  solid: string;
}

// "Not tested" is grey with a "?" and never green. "Lower risk" is blue-grey, never green:
// these ghats still broke the limit in past tests.
export const STATUS: Record<Tier, StatusLook> = {
  high: {
    icon: "⛔",
    word: { en: "Danger", hi: "खतरा" },
    hint: { en: "Act here first", hi: "यहां पहले काम करें" },
    fg: "#9b1c1c",
    bg: "#fdecec",
    bd: "#9b1c1c",
    solid: "#c81e1e",
  },
  medium: {
    icon: "⚠",
    word: { en: "Watch", hi: "सावधान" },
    hint: { en: "Keep an eye on it", hi: "इस पर नज़र रखें" },
    fg: "#7a4100",
    bg: "#fff4e0",
    bd: "#b45309",
    solid: "#d97706",
  },
  low: {
    icon: "▽",
    word: { en: "Lower risk", hi: "कम खतरा" },
    hint: { en: "Still broke limits in the past", hi: "पहले भी सीमा पार हुई थी" },
    fg: "#1e3a5f",
    bg: "#eaf1fa",
    bd: "#3b5b85",
    solid: "#3b5b85",
  },
  insufficient_data: {
    icon: "?",
    word: { en: "Not tested", hi: "जांच नहीं हुई" },
    hint: { en: "No test for Durga 2025. Test the water first.", hi: "दुर्गा 2025 में जांच नहीं हुई। पहले पानी जांचें।" },
    fg: "#374151",
    bg: "#f1f2f4",
    bd: "#6b7280",
    solid: "#6b7280",
  },
};

export const ACTION: Record<ActionCode, { icon: string; word: Record<Lang, string> }> = {
  test_first: { icon: "🧪", word: { en: "Test water first", hi: "पहले पानी जांचें" } },
  aerate: { icon: "💨", word: { en: "Put air machine", hi: "हवा की मशीन लगाएं" } },
  clean: { icon: "🧹", word: { en: "Clean the ghat", hi: "घाट साफ़ करें" } },
  sample_metals: { icon: "⚗", word: { en: "Test for metals", hi: "धातु की जांच करें" } },
  lake_ban: { icon: "🚫", word: { en: "No idols in the lake (NGT order)", hi: "तालाब में मूर्ति नहीं (NGT आदेश)" } },
};

/** Short name: "Bairagarh (Sant Hirdaram) kund" -> "Bairagarh". */
export function shortName(name: string): string {
  return name
    .split(" /")[0]
    .replace(/ \(.*\)/, "")
    .replace(/ (ghat|kund|lake ghat|lake|dam)$/i, "")
    .replace(/ (घाट|कुंड|झील घाट|झील|बांध|डैम)$/u, "")
    .trim();
}

const PARAM: Record<string, { name: Record<Lang, string>; need: Record<Lang, string> }> = {
  DO: { name: { en: "Oxygen", hi: "ऑक्सीजन" }, need: { en: "needs 5 or more", hi: "5 या ज़्यादा चाहिए" } },
  BOD: { name: { en: "Waste (BOD)", hi: "गंदगी (BOD)" }, need: { en: "should be 3 or less", hi: "3 या कम होनी चाहिए" } },
  pH: { name: { en: "pH", hi: "pH" }, need: { en: "should be 6.5 to 8.5", hi: "6.5 से 8.5 होना चाहिए" } },
};

export function paramKey(p: string | null | undefined): "DO" | "BOD" | "pH" | null {
  const s = (p ?? "").toLowerCase();
  if (s.includes("oxygen") || s === "do") return "DO";
  if (s.includes("bod") || s.includes("biochemical")) return "BOD";
  if (s === "ph") return "pH";
  return null;
}

const FEST: Record<string, Record<Lang, string>> = {
  Ganesh: { en: "Ganesh", hi: "गणेश" },
  Durga: { en: "Durga", hi: "दुर्गा" },
};

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, ""));

/** "Oxygen 0 — needs 5 or more" + "Ganesh 2025". Falls back to the backend's own sentence. */
export function plainReason(r: Reason, lang: Lang): { main: string; when: string } {
  const k = paramKey(r.parameter);
  const when = r.year ? `${FEST[r.festival]?.[lang] ?? r.festival ?? ""} ${r.year}`.trim() : "";
  if (r.kind === "breach" && k && r.value !== null) {
    const p = PARAM[k];
    return { main: `${p.name[lang]} ${fmt(r.value)} — ${p.need[lang]}`, when };
  }
  // gaps and context: the backend sentence is already plain; drop its trailing "Source: ..." part.
  return { main: (r.text?.[lang] ?? "").replace(/\s*(Source|स्रोत)[:：].*$/u, ""), when };
}

export const WORDS = {
  oxygen: {
    en: "Oxygen = oxygen in water. Fish need 5 or more.",
    hi: "ऑक्सीजन = पानी में घुली हवा। मछलियों को 5 या ज़्यादा चाहिए।",
  },
  bod: {
    en: "BOD = rotting waste in water. Should be 3 or less.",
    hi: "BOD = पानी में सड़ने वाली गंदगी। 3 या कम होनी चाहिए।",
  },
  noHealth: {
    en: "This tool shows test results only. It does not say if the water is safe for health.",
    hi: "यह सिर्फ़ जांच के नतीजे दिखाता है। पानी सेहत के लिए ठीक है या नहीं, यह नहीं बताता।",
  },
};

export function daysLeftText(n: number, lang: Lang): string {
  if (n > 1) return lang === "hi" ? `विसर्जन में ${n} दिन बाकी` : `${n} days left`;
  if (n === 1) return lang === "hi" ? "विसर्जन कल है" : "1 day left";
  if (n === 0) return lang === "hi" ? "विसर्जन आज है" : "Visarjan is today";
  return lang === "hi" ? "विसर्जन हो चुका" : "Visarjan is over";
}
