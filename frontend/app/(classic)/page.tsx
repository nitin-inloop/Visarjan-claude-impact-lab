import { HomeView } from "@/components/home/HomeView";
import { readSnapshot } from "@/lib/snapshot";
import type { Ranking } from "@/lib/types";

export default async function Home() {
  const initial = await readSnapshot<Ranking>("ranking.json");
  return <HomeView initial={initial} />;
}
