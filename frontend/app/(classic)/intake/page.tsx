import type { Metadata } from "next";
import { IntakePanel } from "@/components/intake/IntakePanel";

export const metadata: Metadata = { title: "Report intake · Ghat Watch" };

export default function IntakePage() {
  return (
    <div className="pt-6">
      <IntakePanel />
    </div>
  );
}
