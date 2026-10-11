import { CommandCenter } from "@/components/live/CommandCenter";
import { readSnapshot } from "@/lib/snapshot";
import type { Ranking } from "@/lib/types";

export default async function Home() {
  const initialRanking = await readSnapshot<Ranking>("ranking.json");
  return <CommandCenter initialRanking={initialRanking} />;
}
