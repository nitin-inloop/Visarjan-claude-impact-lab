"use client";

// Leaflet part of GhatMap. Loaded with next/dynamic ssr:false from ./GhatMap.
// Mapbox (streets / satellite-streets) when NEXT_PUBLIC_MAPBOX_TOKEN is set, else OpenStreetMap / Esri World Imagery.
// The token is read from the environment only; never hard-coded.

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GHAT_GEO } from "@/lib/ghatGeo";
import type { GhatRank, Lang } from "@/lib/types";
import { HAS_MAPBOX, LABEL_SIDE, MARK, MAPBOX_TOKEN as TOKEN, keyReading, shortGhat, type Layer } from "./mapStyle";


const MB_ATTR = '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>';
const OSM_ATTR = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors';
const ESRI_ATTR = "Imagery © Esri, Maxar, Earthstar Geographics, and the GIS User Community · Labels © Esri";

function useDarkTheme(): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.dataset.theme === "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

function makeLayers(kind: Layer, dark = false): L.TileLayer[] {
  if (HAS_MAPBOX) {
    const style = kind === "map" ? (dark ? "dark-v11" : "streets-v12") : "satellite-streets-v12";
    return [
      L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/256/{z}/{x}/{y}?access_token=${encodeURIComponent(TOKEN.trim())}`, {
        attribution: MB_ATTR,
        maxZoom: 19,
        tileSize: 256,
      }),
    ];
  }
  // No Mapbox token: CARTO dark now needs a key, so dark mode reuses OSM tiles with an inverting CSS filter (gm-dark).
  if (kind === "map" && dark) return [L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: OSM_ATTR, maxZoom: 19, className: "gm-dark-tiles" })];
  if (kind === "map") return [L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: OSM_ATTR, maxZoom: 19 })];
  return [
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: ESRI_ATTR, maxZoom: 19 }),
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19 }),
  ];
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
const LABEL_MIN_ZOOM = 11;

function markerHtml(g: GhatRank, lang: Lang): string {
  const m = MARK[g.tier];
  const side = LABEL_SIDE[g.slug] ?? "right";
  const pos =
    side === "up"
      ? "bottom:36px;left:50%;transform:translateX(-50%);"
      : side === "left"
        ? "right:36px;top:3px;"
        : "left:36px;top:3px;";
  const dot = `<span style="position:absolute;inset:0;border-radius:9999px;background:${m.fill};color:${m.text};border:2px ${m.dashed ? "dashed" : "solid"} ${m.border};box-shadow:0 1px 3px rgba(0,0,0,.4);font:700 13px/26px ui-sans-serif,system-ui,sans-serif;text-align:center">${esc(String(g.rank))}</span>`;
  const lbl = `<span class="gm-lbl" style="position:absolute;${pos}white-space:nowrap;background:rgba(255,255,255,.96);border:1px solid #E6E6E9;border-radius:6px;padding:1px 6px;font:600 12px/18px ui-sans-serif,system-ui,sans-serif;color:#111113;box-shadow:0 1px 2px rgba(0,0,0,.15)">${esc(shortGhat(g.name[lang]))}</span>`;
  return dot + lbl;
}

function popupHtml(g: GhatRank, lang: Lang): string {
  const m = MARK[g.tier];
  const k = keyReading(g, lang);
  const pill = `<span style="display:inline-block;border-radius:5px;padding:0 6px;font-size:11px;font-weight:700;background:${m.dashed ? "#fff" : m.fill};color:${m.dashed ? "#3F3F46" : "#fff"};border:1px ${m.dashed ? "dashed #A1A1AA" : `solid ${m.fill}`}">${esc(m.word[lang])}</span>`;
  return (
    `<div style="font:13px/1.4 ui-sans-serif,system-ui,sans-serif;color:#111113;min-width:200px;max-width:260px">` +
    `<div style="font-weight:700;margin-bottom:4px">${esc(String(g.rank))}. ${esc(g.name[lang])}</div>` +
    `<div style="margin-bottom:6px">${pill}</div>` +
    `<div style="color:#3A3A40">${esc(k.line)}</div>` +
    (k.source ? `<div style="color:#6B6B75;font-size:12px;margin-top:2px">${lang === "hi" ? "स्रोत" : "Source"}: ${esc(k.source)}</div>` : "") +
    `<a data-gm-open="${esc(g.slug)}" href="/ghat/${esc(g.slug)}" style="display:inline-block;margin-top:8px;font-weight:600;color:#111113">${lang === "hi" ? "विवरण →" : "Details →"}</a>` +
    `</div>`
  );
}

export default function GhatMapLeaflet({
  ghats,
  lang,
  layer,
  height,
  focus,
  onOpen,
  onFail,
}: {
  ghats: GhatRank[];
  lang: Lang;
  layer: Layer;
  height: number;
  focus?: string | null;
  onOpen: (slug: string) => void;
  onFail: () => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.LayerGroup | null>(null);
  const byslug = useRef<Record<string, L.Marker>>({});
  const tiles = useRef<L.TileLayer[]>([]);
  const dark = useDarkTheme();
  const openRef = useRef(onOpen);
  const failRef = useRef(onFail);
  useEffect(() => {
    openRef.current = onOpen;
    failRef.current = onFail;
  });

  // map
  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: true, scrollWheelZoom: false, zoomSnap: 0.25, attributionControl: true });
    m.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noreferrer">Leaflet</a>');
    m.fitBounds(L.latLngBounds(Object.values(GHAT_GEO).map((p) => [p.lat, p.lon] as L.LatLngTuple)).pad(0.12));
    markers.current = L.layerGroup().addTo(m);
    const syncLabels = () => el.current?.classList.toggle("gm-nolabels", m.getZoom() < LABEL_MIN_ZOOM);
    m.on("zoomend", syncLabels);
    syncLabels();
    m.on("popupopen", (e) => {
      const a = e.popup.getElement()?.querySelector<HTMLAnchorElement>("a[data-gm-open]");
      if (a)
        a.onclick = (ev) => {
          ev.preventDefault();
          openRef.current(a.dataset.gmOpen ?? "");
        };
    });
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  // tiles (switch layer)
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    tiles.current.forEach((t) => t.remove());
    const ls = makeLayers(layer, dark);
    tiles.current = ls;
    let loaded = false;
    let errors = 0;
    const base = ls[0];
    base.on("tileload", () => {
      loaded = true;
    });
    base.on("tileerror", () => {
      if (loaded) return;
      errors += 1;
      if (errors >= 6) failRef.current();
    });
    ls.forEach((t) => t.addTo(m));
    const watchdog = setTimeout(() => {
      if (!loaded) failRef.current();
    }, 9000);
    return () => clearTimeout(watchdog);
  }, [layer, dark]);

  // markers
  useEffect(() => {
    const lg = markers.current;
    if (!lg) return;
    lg.clearLayers();
    byslug.current = {};
    for (const g of ghats) {
      const geo = GHAT_GEO[g.slug];
      if (!geo) continue;
      const icon = L.divIcon({ className: "gm-mk", iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14], html: markerHtml(g, lang) });
      const mk = L.marker([geo.lat, geo.lon], {
        icon,
        keyboard: true,
        title: `${g.rank}. ${g.name[lang]}: ${MARK[g.tier].word[lang]}`,
        alt: `${g.name[lang]}: ${MARK[g.tier].word[lang]}`,
        riseOnHover: true,
      });
      mk.bindPopup(popupHtml(g, lang), { closeButton: true, autoPanPadding: [24, 24] });
      mk.addTo(lg);
      byslug.current[g.slug] = mk;
    }
  }, [ghats, lang]);

  // fly to the focused ghat
  useEffect(() => {
    const m = map.current;
    if (!m || !focus) return;
    const geo = GHAT_GEO[focus];
    if (!geo) return;
    m.closePopup();
    m.flyTo([geo.lat, geo.lon], 14, { duration: 0.8 });
    // open the popup after the flight; opening it mid-flight auto-pans and cancels the animation
    const t = setTimeout(() => byslug.current[focus]?.openPopup(), 1000);
    return () => clearTimeout(t);
  }, [focus]);

  // keep Leaflet in sync with container height
  useEffect(() => {
    map.current?.invalidateSize();
  }, [height]);

  return (
    <>
      <style>{`.gm-nolabels .gm-lbl{display:none}.gm-mk{position:relative}.gm-map.leaflet-container{font:inherit;background:#EEF0F2}:root[data-theme="dark"] .gm-map.leaflet-container{background:#1A1A1E}.gm-dark-tiles{filter:invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9) saturate(0.6)}.gm-map .leaflet-control-attribution{font-size:10px}`}</style>
      <div ref={el} className="gm-map w-full" style={{ height }} />
    </>
  );
}
