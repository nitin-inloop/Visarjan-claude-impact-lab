import type { Metadata } from "next";
import { BriefView } from "@/components/BriefView";
import { readSnapshot } from "@/lib/snapshot";
import type { Brief } from "@/lib/types";

export const metadata: Metadata = { title: "Brief · Ghat Watch" };

export default async function BriefPage() {
  const initial = await readSnapshot<Brief>("brief.json");
  return <BriefView initial={initial} />;
}
