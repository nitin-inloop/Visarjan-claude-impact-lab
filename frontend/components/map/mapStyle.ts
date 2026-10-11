// Shared look for the ghat map (Leaflet markers, legend, schematic). Owned by Session F.
// Status colour only where it carries meaning; never green (past tests broke limits everywhere).
import type { GhatRank, Lang, Tier } from "@/lib/types";
import { tierReason } from "@/lib/plain";

export type Layer = "map" | "satellite";

/** Read from the environment only (frontend/.env.local, gitignored). Never hard-code a token. */
export const MAPBOX_TOKEN = (process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "").trim();
export const HAS_MAPBOX = MAPBOX_TOKEN.length > 0;

export interface MarkLook {
  fill: string;
  text: string;
  border: string;
  dashed: boolean;
  word: Record<Lang, string>;
}

export const MARK: Record<Tier, MarkLook> = {
  high: { fill: "#DC2626", text: "#fff", border: "#fff", dashed: false, word: { en: "Danger", hi: "खतरा" } },
  medium: { fill: "#D97706", text: "#fff", border: "#fff", dashed: false, word: { en: "Watch", hi: "सावधान" } },
  low: { fill: "#475569", text: "#fff", border: "#fff", dashed: false, word: { en: "Lower risk", hi: "कम खतरा" } },
  insufficient_data: { fill: "#F4F4F5", text: "#3F3F46", border: "#6B6B75", dashed: true, word: { en: "Not tested", hi: "जांच नहीं हुई" } },
};

export const LEGEND_TIERS: Tier[] = ["high", "medium", "low", "insufficient_data"];

/** Label side per ghat so the two Lower Lake ghats (close together) do not collide. */
export const LABEL_SIDE: Record<string, "left" | "right" | "up"> = {
  bairagarh: "up",
  "rani-kamlapati": "left",
  hathaikheda: "left",
  khatlapura: "right",
  prempura: "right",
  shahpura: "right",
  malikhedi: "right",
};

export const shortGhat = (name: string) => name.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();

/** Key reading vs limit, with its report page. Falls back to the tier rule (e.g. "not tested"). */
export function keyReading(g: GhatRank, lang: Lang): { line: string; source: string | null } {
  const t = tierReason(g);
  const r = t && t.kind === "breach" ? t : null;
  if (r && r.value !== null && r.value !== undefined && r.source) {
    const fest = r.festival === "Durga" ? (lang === "hi" ? "दुर्गा" : "Durga") : r.festival === "Ganesh" ? (lang === "hi" ? "गणेश" : "Ganesh") : r.festival;
    const line = `${r.parameter} ${r.value} ${r.unit ?? ""} · ${lang === "hi" ? "सीमा" : "limit"} ${r.limit} (${fest} ${r.year})`;
    const source = `${r.source.report}, ${lang === "hi" ? "पृ." : "p."} ${r.source.page}`;
    return { line, source };
  }
  return { line: g.tier_rule[lang], source: null };
}
