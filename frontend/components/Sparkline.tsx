"use client";

import { useLang } from "@/lib/lang";
import { seriesLabel } from "@/lib/i18n";
import type { SeriesPoint } from "@/lib/types";

interface Props {
  title: string;
  points: SeriesPoint[];
  limit: number;
  /** "min": breach when value < limit (DO); "max": breach when value > limit (BOD) */
  mode: "min" | "max";
  limitText: string;
}

const W = 380;
const H = 150;
const PAD = { l: 26, r: 6, t: 14, b: 34 };

export function Sparkline({ title, points, limit, mode, limitText }: Props) {
  const { t } = useLang();
  const vals = points.map((p) => p.value).filter((v): v is number => v !== null);
  const max = Math.max(limit * 1.3, ...vals, 1);
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(1, points.length - 1);
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
  const breach = (v: number) => (mode === "min" ? v < limit : v > limit);

  // Break the line at missing points.
  const segs: string[] = [];
  let cur = "";
  points.forEach((p, i) => {
    if (p.value === null) {
      if (cur) segs.push(cur);
      cur = "";
    } else cur += `${cur ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`;
  });
  if (cur) segs.push(cur);

  const desc = points.map((p) => `${seriesLabel(t, p.label)}: ${p.value === null ? t.notSampled : p.value}`).join("; ");

  return (
    <figure className="mt-4">
      <figcaption className="font-semibold text-[0.95rem]">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px] h-auto mt-1" role="img" aria-label={`${title}. ${desc}`}>
        {/* y axis ticks */}
        {[0, max / 2, max].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="var(--rule)" strokeWidth={v === 0 ? 1 : 0.5} />
            <text x={PAD.l - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">
              {Math.round(v * 10) / 10}
            </text>
          </g>
        ))}
        {/* festival group separators + labels */}
        {Array.from({ length: Math.ceil(points.length / 3) }, (_, g) => {
          const label = points[g * 3]?.label.split(" ").slice(0, 2).join(" ") ?? "";
          return (
            <g key={g}>
              {g > 0 && <line x1={(x(g * 3 - 1) + x(g * 3)) / 2} x2={(x(g * 3 - 1) + x(g * 3)) / 2} y1={PAD.t} y2={H - PAD.b} stroke="var(--rule)" strokeWidth={0.5} />}
              <text x={x(g * 3 + 1)} y={H - 19} textAnchor="middle" fontSize="10" fill="var(--muted)">
                {seriesLabel(t, label).split(" ")[0]}
              </text>
              <text x={x(g * 3 + 1)} y={H - 7} textAnchor="middle" fontSize="10" fill="var(--muted)">
                {label.split(" ")[1]}
              </text>
            </g>
          );
        })}
        {/* limit line */}
        <line x1={PAD.l} x2={W - PAD.r} y1={y(limit)} y2={y(limit)} stroke="var(--high)" strokeWidth={1.25} strokeDasharray="5 4" />
        <text x={W - PAD.r} y={y(limit) - 4} textAnchor="end" fontSize="10" fill="var(--high)" fontWeight={600}>
          {limitText}
        </text>
        {segs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--ink)" strokeWidth={1.75} strokeLinejoin="round" />
        ))}
        {points.map((p, i) =>
          p.value === null ? (
            <text key={i} x={x(i)} y={H - PAD.b - 3} textAnchor="middle" fontSize="10" fill="var(--muted)">
              ×
            </text>
          ) : breach(p.value) ? (
            <circle key={i} cx={x(i)} cy={y(p.value)} r={4} fill="var(--high)" stroke="var(--paper)" strokeWidth={1}>
              <title>{`${seriesLabel(t, p.label)}: ${p.value}`}</title>
            </circle>
          ) : (
            <circle key={i} cx={x(i)} cy={y(p.value)} r={3.5} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.5}>
              <title>{`${seriesLabel(t, p.label)}: ${p.value}`}</title>
            </circle>
          ),
        )}
      </svg>
      <p className="text-xs text-muted">{t.breachMarked}</p>
    </figure>
  );
}
