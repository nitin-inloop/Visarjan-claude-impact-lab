"use client";

// Offline schematic of the 7 ghats (no tiles). Water bodies drawn from OSM bounding boxes; shapes approximate.
import { GHAT_GEO, type GeoPoint } from "@/lib/ghatGeo";
import type { GhatRank, Lang } from "@/lib/types";
import { LABEL_SIDE, MARK, shortGhat } from "./mapStyle";

const W = 640;
const H = 380;
const LON0 = 77.28;
const LON1 = 77.52;
const LAT0 = 23.18;
const LAT1 = 23.295;
const px = (p: GeoPoint) => ({ x: ((p.lon - LON0) / (LON1 - LON0)) * W, y: ((LAT1 - p.lat) / (LAT1 - LAT0)) * H });

export function Schematic({ ghats, lang, onOpen }: { ghats: GhatRank[]; lang: Lang; onOpen: (s: string) => void }) {
  const hi = lang === "hi";
  const upper = [px({ lat: 23.2716, lon: 77.3 }), px({ lat: 23.2084, lon: 77.398 })];
  const lower = [px({ lat: 23.2545, lon: 77.3975 }), px({ lat: 23.2425, lon: 77.4138 })];
  const shah = px({ lat: 23.207, lon: 77.4215 });
  const hath = px({ lat: 23.272, lon: 77.495 });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="h-full w-full" role="group" aria-label={hi ? "घाटों का सादा नक्शा" : "Simple map of the ghats"}>
      <rect width={W} height={H} fill="var(--d-page)" />
      <g fill="#DCE4EA" stroke="#B8C4CE" strokeWidth={1}>
        <ellipse cx={(upper[0].x + upper[1].x) / 2} cy={(upper[0].y + upper[1].y) / 2} rx={(upper[1].x - upper[0].x) / 2} ry={(upper[1].y - upper[0].y) / 2} />
        <ellipse cx={(lower[0].x + lower[1].x) / 2} cy={(lower[0].y + lower[1].y) / 2} rx={(lower[1].x - lower[0].x) / 2 + 4} ry={(lower[1].y - lower[0].y) / 2 + 4} />
        <ellipse cx={shah.x} cy={shah.y} rx={9} ry={13} />
        <ellipse cx={hath.x} cy={hath.y} rx={22} ry={11} />
      </g>
      <g fontSize={12} fill="var(--d-muted)" fontStyle="italic">
        <text x={(upper[0].x + upper[1].x) / 2 - 10} y={(upper[0].y + upper[1].y) / 2 + 30} textAnchor="middle">
          {hi ? "बड़ा तालाब" : "Upper Lake"}
        </text>
        <text x={lower[1].x + 6} y={lower[1].y + 22} textAnchor="start">
          {hi ? "छोटा तालाब" : "Lower Lake"}
        </text>
        <text x={hath.x} y={hath.y - 16} textAnchor="middle">
          {hi ? "हथाईखेड़ा बांध" : "Hathaikheda dam"}
        </text>
      </g>
      {ghats.map((g) => {
        const geo = GHAT_GEO[g.slug];
        if (!geo) return null;
        const { x, y } = px(geo);
        const m = MARK[g.tier];
        const side = LABEL_SIDE[g.slug] ?? "right";
        const [dx, dy, anchor] = side === "up" ? [0, -20, "middle"] : side === "left" ? [-18, 4, "end"] : [18, 4, "start"];
        return (
          <g
            key={g.slug}
            role="link"
            tabIndex={0}
            aria-label={`${g.rank}. ${g.name[lang]}: ${m.word[lang]}`}
            className="cursor-pointer"
            onClick={() => onOpen(g.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(g.slug);
              }
            }}
          >
            <circle cx={x} cy={y} r={12} fill={m.fill} stroke={m.border} strokeWidth={2} strokeDasharray={m.dashed ? "3 2" : undefined} />
            <text x={x} y={y + 4.5} fontSize={12} fontWeight={700} fill={m.text} textAnchor="middle">
              {g.rank}
            </text>
            <text x={x + dx} y={y + dy} fontSize={12} fontWeight={600} fill="var(--d-ink)" textAnchor={anchor as "start"} paintOrder="stroke" stroke="var(--d-page)" strokeWidth={3}>
              {shortGhat(g.name[lang])}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
