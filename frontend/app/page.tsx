import { ActionSheet } from "@/components/ActionSheet";
import { readSnapshot } from "@/lib/snapshot";
import type { Ranking } from "@/lib/types";

export default async function Home() {
  const initial = await readSnapshot<Ranking>("ranking.json");
  return <ActionSheet initial={initial} />;
}
