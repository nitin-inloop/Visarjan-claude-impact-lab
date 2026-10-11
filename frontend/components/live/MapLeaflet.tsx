"use client";

// Real Bhopal map (docs/PLAN-INTAKE.md §3). Plain Leaflet, loaded with next/dynamic ssr:false from MapLive.
// Markers are created once and then patched in place, so the pulse ring does not restart on every tick.

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import { DEPOT, GHAT_GEO, type GeoPoint } from "@/lib/ghatGeo";
import { TIER_VAR } from "@/lib/liveFormat";
import type { Resource, ResourceKind } from "@/lib/liveTypes";
import { useUi } from "./CommandCenter";

// CARTO dark_all (the planned source) now answers every tile with an "API KEY REQUIRED" image
// (HTTP 200, so tileerror never fires); checked 11 Oct 2026. Keyless dark providers are used instead,
// in order; a provider whose first tiles error before any load is skipped; when all fail the
// schematic takes over (MapLive).
interface TileProvider {
  url: string;
  attribution: string;
  subdomains?: string;
  maxZoom: number;
  overlay?: string;
}
const PROVIDERS: TileProvider[] = [
  {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    attribution: "© Stadia Maps © OpenMapTiles © OpenStreetMap contributors",
    maxZoom: 19,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    overlay: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors",
    maxZoom: 16,
  },
];

/** label on the left for markers whose right side is crowded */
const LABEL_LEFT = new Set(["rani-kamlapati", "bairagarh", "shahpura"]);
const GLYPH: Record<ResourceKind, string> = { aerator: "A", crew: "C", test_team: "T", diversion: "D" };

export function shortName(name: string): string {
  return name
    .split(" /")[0]
    .replace(/ \(.*\)/, "")
    .replace(/ (ghat|kund|lake ghat)$/i, "")
    .replace(/ (घाट|कुंड|झील घाट)$/u, "");
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
const ll = (p: GeoPoint): L.LatLngTuple => [p.lat, p.lon];

function ghatIcon(slug: string): L.DivIcon {
  const side = LABEL_LEFT.has(slug) ? "gw-left" : "gw-right";
  return L.divIcon({
    className: "gw-mk",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<span class="gw-pulse"></span><span class="gw-ngt"></span><span class="gw-sel"></span><span class="gw-dot"></span><span class="gw-lbl ${side}"><b></b><i></i></span>`,
  });
}

function resIcon(r: Resource, idx: number, etaText: string): L.DivIcon {
  const enRoute = r.status === "en_route";
  const dx = -10 + (idx % 4) * 15;
  const dy = 16 + Math.floor(idx / 4) * 15;
  return L.divIcon({
    className: `gw-res ${enRoute ? "gw-res-route" : r.status === "idle" ? "gw-res-idle" : "gw-res-work"}`,
    iconSize: [14, 14],
    iconAnchor: [7 - dx, 7 - dy],
    html: `<span>${GLYPH[r.kind]}</span>${enRoute && etaText ? `<em>${esc(etaText)}</em>` : ""}`,
  });
}

export default function MapLeaflet({ onTilesFailed }: { onTilesFailed: () => void }) {
  const { lang, t } = useLang();
  const { data } = useLiveStore();
  const { select, selected } = useUi();
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const ghatMarkers = useRef(new Map<string, L.Marker>());
  const resMarkers = useRef(new Map<string, { m: L.Marker; key: string }>());
  const depotRef = useRef<L.Marker | null>(null);
  const selectRef = useRef(select);
  const failRef = useRef(onTilesFailed);

  useEffect(() => {
    selectRef.current = select;
    failRef.current = onTilesFailed;
  }, [select, onTilesFailed]);

  // Create the map once.
  useEffect(() => {
    if (!box.current) return;
    const map = L.map(box.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false });
    mapRef.current = map;
    let loaded = false;
    let layers: L.TileLayer[] = [];
    const applyProvider = (i: number) => {
      layers.forEach((l) => l.remove());
      layers = [];
      const p = PROVIDERS[i];
      if (!p) {
        failRef.current();
        return;
      }
      const base = L.tileLayer(p.url, { subdomains: p.subdomains ?? "abc", maxZoom: p.maxZoom, attribution: p.attribution });
      base.on("tileload", () => {
        loaded = true;
      });
      base.on("tileerror", () => {
        if (!loaded) applyProvider(i + 1);
      });
      base.addTo(map);
      layers.push(base);
      if (p.overlay) layers.push(L.tileLayer(p.overlay, { maxZoom: p.maxZoom }).addTo(map));
    };
    applyProvider(0);
    map.fitBounds(L.latLngBounds(Object.values(GHAT_GEO).map(ll)), { padding: [36, 36], maxZoom: 13 });
    // Re-enable wheel zoom after the user clicks into the map (avoids hijacking page scroll).
    map.once("focus", () => map.scrollWheelZoom.enable());

    const depot = L.marker(ll(DEPOT), {
      icon: L.divIcon({ className: "gw-depot", iconSize: [12, 12], iconAnchor: [6, 6], html: "<span></span><em></em>" }),
      keyboard: false,
      zIndexOffset: -100,
    }).addTo(map);
    depot.bindTooltip("Depot", { direction: "bottom", offset: [0, 6], className: "gw-tip" });
    depotRef.current = depot;

    const gm = ghatMarkers.current;
    const rm = resMarkers.current;
    for (const [slug, geo] of Object.entries(GHAT_GEO)) {
      const m = L.marker(ll(geo), { icon: ghatIcon(slug), keyboard: true, riseOnHover: true, title: slug });
      m.on("click", () => selectRef.current(slug));
      m.addTo(map);
      gm.set(slug, m);
    }
    return () => {
      gm.clear();
      rm.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Patch ghat markers in place.
  useEffect(() => {
    depotRef.current?.setTooltipContent(t.lv.depot);
    const dl = depotRef.current?.getElement()?.querySelector("em");
    if (dl) {
      const idle = data ? data.resources.filter((r) => r.status === "idle" && r.at === "depot").length : 0;
      dl.textContent = `${t.lv.depot}${idle ? ` · ${idle} ${t.lv.resStatus.idle}` : ""}`;
    }
    if (!data) return;
    for (const [slug, m] of ghatMarkers.current) {
      const g = data.ghats[slug];
      const el = m.getElement();
      if (!g || !el) continue;
      const col = TIER_VAR[g.live_tier];
      const alerting = data.alerts.some((a) => a.ghat === slug && a.state === "open" && a.severity !== "info");
      const nd = g.live_tier === "no_data";
      el.style.color = col;
      el.classList.toggle("gw-alert", alerting);
      el.classList.toggle("gw-nd", nd);
      el.classList.toggle("gw-ban", g.ngt_lake_ban);
      el.classList.toggle("gw-selected", selected === slug);
      const name = shortName(g.name[lang]);
      const doTxt = g.values.DO !== null ? `DO ${g.values.DO.toFixed(1)}` : t.lv.tier.no_data;
      const b = el.querySelector(".gw-lbl b");
      const i = el.querySelector(".gw-lbl i");
      if (b && b.textContent !== name) b.textContent = name;
      if (i && i.textContent !== doTxt) i.textContent = doTxt;
      const label = `${g.name[lang]}: ${t.lv.tier[g.live_tier]}${g.values.DO !== null ? `, DO ${g.values.DO.toFixed(1)} mg/l` : ""}`;
      el.setAttribute("aria-label", label);
      el.setAttribute("title", label);
      el.setAttribute("role", "button");
      el.setAttribute("aria-pressed", selected === slug ? "true" : "false");
    }
  }, [data, lang, selected, t]);

  // Resources: at their `at` (or `target` while en route, with the ETA). Position changes animate via CSS.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !data) return;
    const seen = new Set<string>();
    const slotCount = new Map<string, number>();
    for (const r of data.resources) {
      if (r.status === "idle" && r.at === "depot") continue; // counted on the depot label
      const place = r.status === "en_route" && r.target ? r.target : r.at;
      const geo = place === "depot" ? DEPOT : GHAT_GEO[place];
      if (!geo) continue;
      const idx = slotCount.get(place) ?? 0;
      slotCount.set(place, idx + 1);
      const eta = r.eta_min !== null ? `${Math.round(r.eta_min)}′` : "";
      const key = `${place}|${idx}|${r.status}|${eta}`;
      seen.add(r.id);
      const tip = `${r.name[lang]} · ${t.lv.resStatus[r.status]}${r.status === "en_route" && r.eta_min !== null ? ` · ${t.lv.etaCol} ${t.lv.min(Math.round(r.eta_min))}` : ""}`;
      const cur = resMarkers.current.get(r.id);
      if (!cur) {
        // New movers start at the depot and glide to their place (CSS transition on transform).
        const startAt = r.at === "depot" && place !== "depot" ? DEPOT : geo;
        const m = L.marker(ll(startAt), { icon: resIcon(r, idx, eta), keyboard: false, interactive: true, zIndexOffset: 200 });
        m.bindTooltip(tip, { direction: "top", className: "gw-tip" });
        m.addTo(map);
        if (startAt !== geo) requestAnimationFrame(() => requestAnimationFrame(() => m.setLatLng(ll(geo))));
        resMarkers.current.set(r.id, { m, key });
      } else {
        if (cur.key !== key) {
          cur.m.setIcon(resIcon(r, idx, eta));
          cur.m.setLatLng(ll(geo));
          cur.key = key;
        }
        cur.m.setTooltipContent(tip);
      }
    }
    for (const [id, { m }] of resMarkers.current) {
      if (!seen.has(id)) {
        m.remove();
        resMarkers.current.delete(id);
      }
    }
  }, [data, lang, t]);

  return <div ref={box} className="gw-map h-[360px] sm:h-[440px] w-full" role="application" aria-label={t.lv.approx} />;
}
