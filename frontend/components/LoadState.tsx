"use client";

import { useLang } from "@/lib/lang";

export function LoadState({ error }: { error: boolean }) {
  const { t } = useLang();
  return <p className={error ? "py-10 text-high font-semibold" : "py-10 text-muted"}>{error ? t.loadError : t.loading}</p>;
}
