// Approximate ghat coordinates (docs/PLAN-LIVE.md §6). Orientation only; label as approximate.
export interface GeoPoint {
  lat: number;
  lon: number;
}

export const GHAT_GEO: Record<string, GeoPoint> = {
  bairagarh: { lat: 23.271, lon: 77.337 },
  prempura: { lat: 23.236, lon: 77.36 },
  "rani-kamlapati": { lat: 23.254, lon: 77.395 },
  khatlapura: { lat: 23.258, lon: 77.408 },
  hathaikheda: { lat: 23.268, lon: 77.487 },
  shahpura: { lat: 23.198, lon: 77.439 },
  malikhedi: { lat: 23.186, lon: 77.497 },
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
