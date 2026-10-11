// Approximate ghat coordinates. Orientation only; always label as "positions approximate".
// Started from docs/PLAN-LIVE.md §6; refined 11 Oct 2026 (≈ 10 min web search, OSM Nominatim/Overpass).
// Per point: source and confidence. None of these is a surveyed ghat position.
export interface GeoPoint {
  lat: number;
  lon: number;
}

export const GHAT_GEO: Record<string, GeoPoint> = {
  // kept (PLAN-LIVE §6). No kund mapped in OSM; point lies inside Bairagarh near Sant Hirdaram Nagar
  // station (OSM 23.2737, 77.3358). Confidence: medium.
  bairagarh: { lat: 23.271, lon: 77.337 },
  // OSM way 922790998 "prempura ghat" (Upper Lake south shore); was ~2 km north. Confidence: high.
  prempura: { lat: 23.2176, lon: 77.3753 },
  // Kamla Park / Rani Kamlapati ghat is listed on the Lower Lake (ranking.json water_body). The old point
  // (23.2517, 77.3969) sat on the Upper Lake side of the dividing embankment, just west of the OSM
  // Lower Lake bbox (lat 23.2425-23.2545, lon 77.3975-77.4138; Nominatim, 11 Oct 2026). Moved ~250 m east
  // to the Lower Lake's west shore by Kamla Park. Ghat spot itself unsurveyed. Confidence: medium.
  "rani-kamlapati": { lat: 23.2512, lon: 77.3992 },
  // Khatlapura Mandir, Lower Lake bank (wanderlog.com/place/details/4400503, Google-derived);
  // was ~1 km north and inland. Confidence: medium-high.
  khatlapura: { lat: 23.25, lon: 77.4109 },
  // OSM way 28826931 "Hataikheda Dam", shoreline point nearest the old value; ghat spot unconfirmed.
  // Confidence: medium-low.
  hathaikheda: { lat: 23.2677, lon: 77.4892 },
  // OSM way 28672561 "Shahpura Lake", east shore; old value was 1.5 km east of the lake.
  // Exact ghat unknown. Confidence: medium-low.
  shahpura: { lat: 23.2034, lon: 77.4251 },
  // OSM place=village node 11358718540 "Mali Khedi" (west Bhopal, Huzur); BMC lists Malikhedi with
  // Bairagarh as a west-side site (Hitavada 26 Feb 2026). Old value (east, 77.497) was likely wrong.
  // Village point is a proxy only. Confidence: low.
  malikhedi: { lat: 23.2063, lon: 77.3039 },
};
export const DEPOT: GeoPoint = { lat: 23.252, lon: 77.402 };

export const GHAT_ORDER = ["bairagarh", "malikhedi", "shahpura", "rani-kamlapati", "hathaikheda", "khatlapura", "prempura"];

export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Travel minutes at 25 km/h plus 10 min setup. */
export function travelMin(from: string, to: string): number {
  const a = from === "depot" ? DEPOT : GHAT_GEO[from] ?? DEPOT;
  const b = to === "depot" ? DEPOT : GHAT_GEO[to] ?? DEPOT;
  return Math.round((haversineKm(a, b) / 25) * 60 + 10);
}
