import type { Metadata } from "next";
import { MapView } from "@/components/map/MapView";
import { readSnapshot } from "@/lib/snapshot";
import type { Ranking } from "@/lib/types";

export const metadata: Metadata = { title: "Map · Ghat Watch" };

export default async function MapPage() {
  const ranking = await readSnapshot<Ranking>("ranking.json");
  return <MapView initial={ranking} />;
}
