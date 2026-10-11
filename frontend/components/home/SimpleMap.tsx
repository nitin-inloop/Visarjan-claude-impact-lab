"use client";

// Map for the simple home page: real street map when tiles load, otherwise a schematic drawing.
// Positions are approximate (see lib/ghatGeo.ts for the source of each point).
import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { GHAT_GEO, type GeoPoint } from "@/lib/ghatGeo";
import { STATUS, shortName } from "@/lib/plain";
import type { GhatRank, Lang, Tier } from "@/lib/types";

const SimpleMapLeaflet = dynamic(() => import("./SimpleMapLeaflet"), {
  ssr: false,
  loading: () => <div className="h-[420px] sm:h-[520px] w-full grid place-items-center text-muted">…</div>,
});

function subOnline(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

const LEGEND: Tier[] = ["high", "medium", "low", "insufficient_data"];

export function SimpleMap({ ghats, lang }: { ghats: GhatRank[]; lang: Lang }) {
  const router = useRouter();
  const online = useSyncExternalStore(subOnline, () => navigator.onLine, () => true);
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);
  const open = useCallback((slug: string) => router.push(`/ghat/${slug}`), [router]);
  const real = online && !failed;
  return (
    <section aria-labelledby="map-h" className="mt-10">
      <h2 id="map-h" className="text-2xl font-bold">
        {lang === "hi" ? "नक्शा" : "Map"}
      </h2>
      <p className="text-muted mt-1">
        {lang === "hi"
          ? "जगहें अनुमानित हैं। घाट खोलने के लिए निशान पर दबाएं।"
          : "Places are approximate. Tap a marker to open that ghat."}
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 my-3 text-[1.05rem]" aria-label={lang === "hi" ? "रंगों का मतलब" : "What the colours mean"}>
        {LEGEND.map((tr) => {
          const s = STATUS[tr];
          return (
            <li key={tr} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-grid place-items-center w-7 h-7 rounded-full text-white font-bold border-2 border-white shadow"
                style={{ background: s.solid }}
              >
                {s.icon === "?" ? "?" : ""}
              </span>
              <span style={{ color: s.fg }} className="font-semibold">
                {s.icon} {s.word[lang]}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={`rounded-lg border-2 border-rule bg-surface ${real ? "overflow-hidden" : "overflow-x-auto"}`}>
        {real ? (
          <SimpleMapLeaflet ghats={ghats} lang={lang} onOpen={open} onFail={onFail} />
        ) : (
          <Schematic ghats={ghats} lang={lang} onOpen={open} />
        )}
      </div>
      {!real && (
        <p className="text-muted mt-2">
          {lang === "hi" ? "इंटरनेट नक्शा नहीं खुला, इसलिए सादा चित्र दिखाया है।" : "The street map did not load, so a simple drawing is shown."}
        </p>
      )}
    </section>
  );
}

// Schematic fallback: same projection as components/live/MapPanel.tsx, light colours, works offline.
const W = 640;
const H = 380;
const LON0 = 77.29;
const LON1 = 77.53;
const LAT0 = 23.165;
const LAT1 = 23.3;
const px = (p: GeoPoint) => ({ x: ((p.lon - LON0) / (LON1 - LON0)) * W, y: ((LAT1 - p.lat) / (LAT1 - LAT0)) * H });
const LBL: Record<string, [number, number, "start" | "end"]> = {
  bairagarh: [-24, -4, "end"],
  prempura: [24, 6, "start"],
  "rani-kamlapati": [-24, 22, "end"],
  khatlapura: [24, -10, "start"],
  hathaikheda: [-24, 26, "end"],
  shahpura: [24, 8, "start"],
  malikhedi: [24, 4, "start"],
};

function Schematic({ ghats, lang, onOpen }: { ghats: GhatRank[]; lang: Lang; onOpen: (s: string) => void }) {
  // water bodies drawn from OSM bounding boxes (approximate shapes)
  const upper = [px({ lat: 23.2716, lon: 77.3 }), px({ lat: 23.2084, lon: 77.398 })];
  const lower = [px({ lat: 23.2545, lon: 77.3975 }), px({ lat: 23.2425, lon: 77.4138 })];
  const shah = [px({ lat: 23.213, lon: 77.418 }), px({ lat: 23.2004, lon: 77.4251 })];
  const hath = px({ lat: 23.272, lon: 77.495 });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px] h-auto" role="group" aria-label={lang === "hi" ? "घाटों का सादा नक्शा" : "Simple map of the ghats"}>
      <rect width={W} height={H} fill="#f4f6f8" />
      <g fill="#bcd7ea" stroke="#7aa7c7" strokeWidth={1.5}>
        <ellipse cx={(upper[0].x + upper[1].x) / 2} cy={(upper[0].y + upper[1].y) / 2} rx={(upper[1].x - upper[0].x) / 2} ry={(upper[1].y - upper[0].y) / 2} />
        <ellipse cx={(lower[0].x + lower[1].x) / 2} cy={(lower[0].y + lower[1].y) / 2} rx={(lower[1].x - lower[0].x) / 2 + 4} ry={(lower[1].y - lower[0].y) / 2 + 4} />
        <ellipse cx={(shah[0].x + shah[1].x) / 2} cy={(shah[0].y + shah[1].y) / 2} rx={10} ry={14} />
        <ellipse cx={hath.x} cy={hath.y} rx={22} ry={12} />
      </g>
      <g fontSize={14} fill="#2f5e80" fontStyle="italic">
        <text x={(upper[0].x + upper[1].x) / 2 - 10} y={(upper[0].y + upper[1].y) / 2 + 30} textAnchor="middle">
          {lang === "hi" ? "बड़ा तालाब" : "Upper Lake"}
        </text>
        <text x={lower[1].x + 8} y={lower[1].y + 22} textAnchor="start">
          {lang === "hi" ? "छोटा तालाब" : "Lower Lake"}
        </text>
        <text x={shah[1].x + 18} y={shah[1].y + 30} textAnchor="start">
          {lang === "hi" ? "शाहपुरा झील" : "Shahpura Lake"}
        </text>
        <text x={hath.x} y={hath.y - 18} textAnchor="middle">
          {lang === "hi" ? "हथाईखेड़ा बांध" : "Hathaikheda dam"}
        </text>
      </g>
      {ghats.map((g) => {
        const geo = GHAT_GEO[g.slug];
        if (!geo) return null;
        const { x, y } = px(geo);
        const s = STATUS[g.tier];
        const [dx, dy, anchor] = LBL[g.slug] ?? [24, 4, "start"];
        return (
          <g
            key={g.slug}
            role="link"
            tabIndex={0}
            aria-label={`${g.rank}. ${g.name[lang]}: ${s.word[lang]}`}
            className="cursor-pointer"
            onClick={() => onOpen(g.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(g.slug);
              }
            }}
          >
            <circle cx={x} cy={y} r={24} fill="transparent" />
            <circle cx={x} cy={y} r={16} fill={s.solid} stroke="#fff" strokeWidth={3} />
            <text x={x} y={y + 6} fontSize={16} fontWeight={800} fill="#fff" textAnchor="middle">
              {g.rank}
            </text>
            <text x={x + dx} y={y + dy} fontSize={16} fontWeight={700} fill="#111827" textAnchor={anchor} paintOrder="stroke" stroke="#f4f6f8" strokeWidth={4}>
              {shortName(g.name[lang])}
            </text>
            <text x={x + dx} y={y + dy + 17} fontSize={14} fontWeight={700} fill={s.fg} textAnchor={anchor} paintOrder="stroke" stroke="#f4f6f8" strokeWidth={4}>
              {s.icon} {s.word[lang]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
