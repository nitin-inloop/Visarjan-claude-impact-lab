import type { Metadata } from "next";
import { ModelsView } from "@/components/ModelsView";
import { readSnapshot } from "@/lib/snapshot";
import type { Allocation, Leaderboard, Ranking } from "@/lib/types";

export const metadata: Metadata = { title: "Models · Ghat Watch" };

export default async function ModelsPage() {
  const [lb, alloc, ranking] = await Promise.all([
    readSnapshot<Leaderboard>("leaderboard.json"),
    readSnapshot<Allocation>("allocate.json"),
    readSnapshot<Ranking>("ranking.json"),
  ]);
  return <ModelsView initialLb={lb} initialAlloc={alloc} ranking={ranking} />;
}
