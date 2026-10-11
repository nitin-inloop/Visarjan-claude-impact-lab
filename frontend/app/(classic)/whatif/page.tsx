import type { Metadata } from "next";
import { WhatIf } from "@/components/WhatIf";
import { readSnapshot } from "@/lib/snapshot";
import type { Ranking } from "@/lib/types";

export const metadata: Metadata = { title: "2026 readings · Ghat Watch" };

export default async function WhatIfPage() {
  const initial = await readSnapshot<Ranking>("ranking.json");
  return <WhatIf initial={initial} />;
}
