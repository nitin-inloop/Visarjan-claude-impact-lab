"use client";

// Light, keyless street map for the simple home page. Loaded with next/dynamic ssr:false.
// Big status markers with the ghat name always visible. Tap a marker to open that ghat.
// If no tile loads (offline, blocked), onFail() switches the parent to the schematic map.

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GHAT_GEO } from "@/lib/ghatGeo";
import { STATUS, shortName } from "@/lib/plain";
import type { GhatRank, Lang } from "@/lib/types";

const PROVIDERS = [
  {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors",
    maxZoom: 18,
  },
];

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
const LEFT = new Set(["rani-kamlapati", "hathaikheda"]);
/** label above the marker (open ground to the north) */
const UP = new Set(["bairagarh"]);

export default function SimpleMapLeaflet({
  ghats,
  lang,
  onOpen,
  onFail,
}: {
  ghats: GhatRank[];
  lang: Lang;
  onOpen: (slug: string) => void;
  onFail: () => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const openRef = useRef(onOpen);
  const failRef = useRef(onFail);
  useEffect(() => {
    openRef.current = onOpen;
    failRef.current = onFail;
  });

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: true, scrollWheelZoom: false, attributionControl: true, zoomSnap: 0.25 });
    m.fitBounds(
      L.latLngBounds(Object.values(GHAT_GEO).map((p) => [p.lat, p.lon] as L.LatLngTuple)).pad(0.08),
    );
    map.current = m;
    layer.current = L.layerGroup().addTo(m);

    let idx = 0;
    let loaded = false;
    let errors = 0;
    let tl: L.TileLayer | null = null;
    const tryProvider = () => {
      const p = PROVIDERS[idx];
      if (!p) {
        failRef.current();
        return;
      }
      tl?.remove();
      tl = L.tileLayer(p.url, { attribution: p.attribution, maxZoom: p.maxZoom });
      tl.on("tileload", () => {
        loaded = true;
      });
      tl.on("tileerror", () => {
        if (loaded) return;
        errors += 1;
        if (errors >= 3) {
          errors = 0;
          idx += 1;
          tryProvider();
        }
      });
      tl.addTo(m);
    };
    tryProvider();
    const watchdog = setTimeout(() => {
      if (!loaded) failRef.current();
    }, 8000);
    return () => {
      clearTimeout(watchdog);
      m.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const lg = layer.current;
    if (!lg) return;
    lg.clearLayers();
    for (const g of ghats) {
      const geo = GHAT_GEO[g.slug];
      if (!geo) continue;
      const s = STATUS[g.tier];
      const side = UP.has(g.slug) ? "sm-up" : LEFT.has(g.slug) ? "sm-left" : "sm-right";
      const html =
        `<span class="sm-dot" style="background:${s.solid}">${esc(String(g.rank))}</span>` +
        `<span class="sm-lbl ${side}" style="border-color:${s.bd}"><b>${esc(shortName(g.name[lang]))}</b>` +
        `<i style="color:${s.fg}">${esc(s.icon)} ${esc(s.word[lang])}</i></span>`;
      const icon = L.divIcon({ className: "sm-mk", iconSize: [40, 40], iconAnchor: [20, 20], html });
      const mk = L.marker([geo.lat, geo.lon], {
        icon,
        keyboard: true,
        title: `${g.rank}. ${g.name[lang]}: ${s.word[lang]}`,
        alt: `${g.name[lang]}: ${s.word[lang]}`,
      });
      mk.on("click", () => openRef.current(g.slug));
      mk.addTo(lg);
    }
  }, [ghats, lang]);

  return <div ref={el} className="sm-map h-[420px] sm:h-[520px] w-full rounded-lg" />;
}
