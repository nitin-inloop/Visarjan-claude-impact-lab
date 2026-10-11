import type { Metadata } from "next";
import { ModelsView } from "@/components/ModelsView";
import { readSnapshot } from "@/lib/snapshot";
import type { Leaderboard, Ranking } from "@/lib/types";

export const metadata: Metadata = { title: "ML Insights · Ghat Watch" };

export default async function ModelsPage() {
  const [lb, ranking] = await Promise.all([readSnapshot<Leaderboard>("leaderboard.json"), readSnapshot<Ranking>("ranking.json")]);
  return <ModelsView initialLb={lb} ranking={ranking} />;
}
