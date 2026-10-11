"use client";

// Map panel: real Leaflet map when online and the first tiles load; otherwise the schematic MapPanel.
import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import { TIER_ICON, TIER_ORDER, TIER_VAR } from "@/lib/liveFormat";
import { MapPanel } from "./MapPanel";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
  loading: () => <div className="h-[360px] sm:h-[440px] w-full grid place-items-center text-sm text-muted">…</div>,
});

function subOnline(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export function MapLive() {
  const { t, lang } = useLang();
  const x = ix[lang];
  const online = useSyncExternalStore(subOnline, () => navigator.onLine, () => true);
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);

  if (!online || failed) return <MapPanel note={x.tilesDown} />;

  return (
    <div className="rounded-md border border-rule bg-paper/60 h-full flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 border-b border-rule">
        <h2 className="text-sm font-bold text-ink">{x.mapTitle}</h2>
        <span className="text-xs text-muted">{t.lv.approx}</span>
        <ul className="ml-auto flex flex-wrap gap-x-3 text-xs text-muted" aria-label="Legend">
          {TIER_ORDER.map((tr) => (
            <li key={tr} className="flex items-center gap-1">
              <span aria-hidden style={{ color: TIER_VAR[tr] }}>
                {TIER_ICON[tr]}
              </span>
              {t.lv.tier[tr]}
            </li>
          ))}
          <li className="hidden md:flex items-center gap-1">
            <span aria-hidden className="inline-block w-3 h-3 rounded-full border border-dashed border-ink" />
            {x.ngtOutline}
          </li>
        </ul>
      </div>
      <MapLeaflet onTilesFailed={onFail} />
    </div>
  );
}
