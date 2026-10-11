import { CommandCenter } from "@/components/live/CommandCenter";
import { readSnapshot } from "@/lib/snapshot";
import type { Allocation, Leaderboard, Ranking } from "@/lib/types";

export default async function LabPage() {
  const [initialRanking, initialLb, initialAlloc] = await Promise.all([
    readSnapshot<Ranking>("ranking.json"),
    readSnapshot<Leaderboard>("leaderboard.json"),
    readSnapshot<Allocation>("allocate.json"),
  ]);
  return <CommandCenter initialRanking={initialRanking} initialLb={initialLb} initialAlloc={initialAlloc} />;
}
