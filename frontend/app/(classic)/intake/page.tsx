import type { Metadata } from "next";
import { SimpleIntake } from "@/components/intake/SimpleIntake";

export const metadata: Metadata = { title: "Upload test report · Ghat Watch" };

export default function IntakePage() {
  return <SimpleIntake />;
}
