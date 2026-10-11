"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { WORDS } from "@/lib/plain";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="no-print border-t-2 border-rule text-base text-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 space-y-2">
        <p>{WORDS.noHealth[lang]}</p>
        <p>{t.footer}</p>
        <p className="text-sm">
          <Link href="/lab" className="text-muted underline underline-offset-2">
            {lang === "hi" ? "उन्नत / प्रयोगात्मक (लाइव मोड, मॉडल, क्या-अगर)" : "Advanced / experimental (live mode, models, what-if)"}
          </Link>
          {" · "}
          <Link href="/whatif" className="text-muted underline underline-offset-2">
            {lang === "hi" ? "क्या-अगर" : "What-if"}
          </Link>
          {" · "}
          <Link href="/models" className="text-muted underline underline-offset-2">
            {lang === "hi" ? "मॉडल" : "Models"}
          </Link>
        </p>
      </div>
    </footer>
  );
}
