"use client";

import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { DEPOT, GHAT_GEO, type GeoPoint } from "@/lib/ghatGeo";
import { TIER_ICON, TIER_ORDER, TIER_VAR } from "@/lib/liveFormat";
import { useUi } from "./CommandCenter";

const W = 640;
const H = 360;
const LON0 = 77.3;
const LON1 = 77.53;
const LAT0 = 23.165;
const LAT1 = 23.295;
const px = (p: GeoPoint) => ({ x: ((p.lon - LON0) / (LON1 - LON0)) * W, y: ((LAT1 - p.lat) / (LAT1 - LAT0)) * H });

// Label offsets (dx, dy, anchor) so neighbouring names do not collide.
const LABEL: Record<string, [number, number, "start" | "end" | "middle"]> = {
  bairagarh: [14, -8, "start"],
  prempura: [0, 26, "middle"],
  "rani-kamlapati": [-14, 22, "end"],
  khatlapura: [12, -24, "start"],
  hathaikheda: [0, 28, "middle"],
  shahpura: [-14, 4, "end"],
  malikhedi: [14, 4, "start"],
};

export function MapPanel({ note }: { note?: string } = {}) {
  const { t, lang } = useLang();
  const { data } = useLiveStore();
  const { select, selected } = useUi();
  const ghats = data ? Object.values(data.ghats) : [];
  const dp = px(DEPOT);
  return (
    <div className="rounded-md border border-rule bg-paper/60 h-full flex flex-col">
      <div className="flex items-center gap-3 px-3 py-2 border-b border-rule">
        <h2 className="text-sm font-bold text-ink">{t.lv.map}</h2>
        <span className="text-xs text-muted">{t.lv.approx}</span>
        {note && (
          <span className="text-xs text-medium" role="status">
            {note}
          </span>
        )}
        <ul className="ml-auto hidden sm:flex flex-wrap gap-x-3 text-xs text-muted" aria-label="Legend">
          {TIER_ORDER.map((tr) => (
            <li key={tr} className="flex items-center gap-1">
              <span aria-hidden style={{ color: TIER_VAR[tr] }}>
                {TIER_ICON[tr]}
              </span>
              {t.lv.tier[tr]}
            </li>
          ))}
        </ul>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto flex-1" role="group" aria-label={`${t.lv.map}. ${t.lv.approx}`}>
        <defs>
          <radialGradient id="cc-vignette" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#15203a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0a0f1a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={W} height={H} fill="url(#cc-vignette)" />
        {/* Stylised water bodies (schematic, not to scale) */}
        <g fill="#16324a" stroke="#2c5677" strokeWidth={1}>
          <path d="M92,82 C118,50 196,56 238,92 C258,108 262,128 248,140 C232,160 222,204 207,210 C192,215 186,190 178,174 C142,182 110,164 100,138 C92,120 86,100 92,82 Z" />
          <path d="M262,118 C270,104 300,100 314,108 C322,114 316,124 302,126 C288,128 268,128 262,118 Z" />
          <path d="M500,72 C508,58 548,56 566,66 C576,74 568,90 548,92 C526,94 504,86 500,72 Z" />
          <ellipse cx={338} cy={244} rx={18} ry={12} />
          <circle cx={556} cy={306} r={6} />
        </g>
        <g fontSize={11} fill="#7f9bb5" fontStyle="italic">
          <text x={150} y={112} textAnchor="middle">{lang === "hi" ? "बड़ा तालाब" : "Upper Lake"}</text>
          <text x={322} y={126} textAnchor="start">{lang === "hi" ? "छोटा तालाब" : "Lower Lake"}</text>
          <text x={535} y={52} textAnchor="middle">{lang === "hi" ? "हथाईखेड़ा जलाशय" : "Hathaikheda reservoir"}</text>
          <text x={366} y={280} textAnchor="middle">{lang === "hi" ? "शाहपुरा झील" : "Shahpura lake"}</text>
        </g>
        {/* depot */}
        <g>
          <rect x={dp.x - 4} y={dp.y - 4} width={8} height={8} fill="none" stroke="var(--muted)" strokeWidth={1.25} />
          <text x={dp.x + 8} y={dp.y + 16} fontSize={10} fill="var(--muted)">
            {t.lv.depot}
          </text>
        </g>
        {ghats.map((g) => {
          const geo = GHAT_GEO[g.slug];
          if (!geo) return null;
          const { x, y } = px(geo);
          const col = TIER_VAR[g.live_tier];
          const alerting = (data?.alerts ?? []).some((a) => a.ghat === g.slug && a.state === "open" && a.severity !== "info");
          const [dx, dy, anchor] = LABEL[g.slug] ?? [12, 4, "start"];
          const nd = g.live_tier === "no_data";
          const sel = selected === g.slug;
          return (
            <g
              key={g.slug}
              role="button"
              tabIndex={0}
              aria-label={`${g.name[lang]}: ${t.lv.tier[g.live_tier]}`}
              aria-pressed={sel}
              className="cursor-pointer focus:outline-none [&:focus-visible>circle.ring]:stroke-[var(--accent)]"
              onClick={() => select(g.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(g.slug);
                }
              }}
            >
              {alerting && <circle className="cc-pulse" cx={x} cy={y} r={9} fill="none" stroke={col} strokeWidth={2} />}
              <circle className="ring" cx={x} cy={y} r={sel ? 14 : 12} fill="transparent" stroke={sel ? "var(--accent)" : "transparent"} strokeWidth={2} />
              <circle cx={x} cy={y} r={8} fill={nd ? "var(--paper)" : col} stroke={nd ? col : "var(--paper)"} strokeWidth={nd ? 2 : 1.5} strokeDasharray={nd ? "3 2" : undefined} />
              <text x={x + dx} y={y + dy} fontSize={12} fontWeight={600} fill="var(--ink)" textAnchor={anchor}>
                {g.name[lang].split(" /")[0].replace(/ \(.*\)/, "").replace(/ (ghat|kund|lake ghat)$/i, "")}
              </text>
              <text x={x + dx} y={y + dy + 13} fontSize={10.5} fill={col} textAnchor={anchor}>
                {TIER_ICON[g.live_tier]} {t.lv.tier[g.live_tier]}
                {g.values.DO !== null && g.sensor === "live" ? ` · DO ${g.values.DO.toFixed(1)}` : ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
