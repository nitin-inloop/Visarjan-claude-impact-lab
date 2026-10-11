import type { Metadata } from "next";
import { SimpleIntake } from "@/components/intake/SimpleIntake";

export const metadata: Metadata = { title: "Upload test report · Ghat Watch" };

export default async function IntakePage({ searchParams }: PageProps<"/intake">) {
  const { ghat } = await searchParams;
  const slug = typeof ghat === "string" && /^[a-z-]+$/.test(ghat) ? ghat : undefined;
  return <SimpleIntake ghat={slug} />;
}
