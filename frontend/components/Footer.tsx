"use client";

import { useLang } from "@/lib/lang";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="no-print border-t border-rule text-sm text-muted">
      <p className="max-w-3xl mx-auto px-4 sm:px-6 py-4">{t.footer}</p>
    </footer>
  );
}
