import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Advanced / experimental · Ghat Watch" };

// Experimental live mode keeps its dark control-room theme, scoped to this route.
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-dark bg-paper text-ink min-h-screen flex flex-col">
      <p className="no-print px-4 py-2 text-sm border-b border-rule text-muted">
        Advanced / experimental: simulated live data.{" "}
        <Link href="/" className="text-link underline underline-offset-2">
          ← Back to the simple view / सरल दृश्य
        </Link>
      </p>
      {children}
    </div>
  );
}
