"use client";

// GhatMap: Leaflet map of the 7 ghats with status-coloured, numbered, labelled markers and a "Map | Satellite" switch.
// Mapbox streets / satellite-streets when NEXT_PUBLIC_MAPBOX_TOKEN is set, else OpenStreetMap / Esri World Imagery.
// Offline or blocked tiles: falls back to a schematic drawing. Positions are approximate (lib/ghatGeo.ts).

import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { GhatRank, Lang } from "@/lib/types";
import { HAS_MAPBOX, LEGEND_TIERS, MARK, type Layer } from "./mapStyle";
import { Schematic } from "./Schematic";

const GhatMapLeaflet = dynamic(() => import("./GhatMapLeaflet"), {
  ssr: false,
  loading: () => <div className="grid h-full w-full place-items-center text-sm text-[#6B6B75]">…</div>,
});

function subOnline(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export function GhatMap({ ghats, lang, height = 420, focus }: { ghats: GhatRank[]; lang: Lang; height?: number; focus?: string | null }) {
  const hi = lang === "hi";
  const router = useRouter();
  const online = useSyncExternalStore(subOnline, () => navigator.onLine, () => true);
  const [layer, setLayer] = useState<Layer>("map");
  const [failed, setFailed] = useState<Layer | null>(null);
  const onFail = useCallback(() => setFailed(layer), [layer]);
  const open = useCallback((slug: string) => router.push(`/ghat/${slug}`), [router]);
  const real = online && failed !== layer;
  const source = !real
    ? hi
      ? "सादा चित्र (ऑफ़लाइन)"
      : "Schematic (offline)"
    : HAS_MAPBOX
      ? "Mapbox"
      : layer === "map"
        ? "OpenStreetMap"
        : "Esri World Imagery";

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-xl border border-[#E6E6E9] bg-[#F6F6F7]" style={{ height }}>
        {real ? (
          <GhatMapLeaflet ghats={ghats} lang={lang} layer={layer} height={height} focus={focus} onOpen={open} onFail={onFail} />
        ) : (
          <Schematic ghats={ghats} lang={lang} onOpen={open} />
        )}
        <div className="pointer-events-none absolute right-3 top-3 z-[500] flex flex-col items-end gap-1.5">
          <div role="radiogroup" aria-label={hi ? "नक्शे की परत" : "Map layer"} className="pointer-events-auto inline-flex rounded-lg border border-[#E6E6E9] bg-white p-0.5 text-xs shadow-sm">
            {(["map", "satellite"] as Layer[]).map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={layer === l}
                onClick={() => setLayer(l)}
                className={`rounded-md px-3 py-1.5 font-semibold ${layer === l ? "bg-[#111113] text-white" : "text-[#3A3A40] hover:bg-[#F4F4F5]"}`}
              >
                {l === "map" ? (hi ? "नक्शा" : "Map") : hi ? "सैटेलाइट" : "Satellite"}
              </button>
            ))}
          </div>
          <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-[#6B6B75]">{source}</span>
        </div>
        {!real && (
          <p className="absolute bottom-2 left-3 z-[500] rounded bg-white/90 px-2 py-1 text-xs text-[#52525B]">
            {hi ? "इंटरनेट नक्शा नहीं खुला, इसलिए सादा चित्र दिखाया है।" : "Map tiles did not load, so a simple drawing is shown."}
          </p>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-xs text-[#6B6B75]">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5" aria-label={hi ? "रंगों का मतलब" : "What the colours mean"}>
          {LEGEND_TIERS.map((t) => {
            const m = MARK[t];
            return (
              <li key={t} className="flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-3 w-3 rounded-full" style={{ background: m.fill, border: m.dashed ? `1.5px dashed ${m.border}` : undefined }} />
                <span className="font-medium text-[#3A3A40]">{m.word[lang]}</span>
              </li>
            );
          })}
          <li>{hi ? "संख्या = प्राथमिकता क्रम" : "Number = priority rank"}</li>
        </ul>
        <span>{hi ? "जगहें अनुमानित हैं।" : "Places are approximate."}</span>
      </div>
    </div>
  );
}
