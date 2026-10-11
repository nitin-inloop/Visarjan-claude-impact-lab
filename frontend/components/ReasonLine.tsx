"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import type { Reason } from "@/lib/types";
import { PdfLink } from "./PdfLink";

/** The page link replaces the trailing "Source: ... page N." sentence on screen. */
function stripSource(s: string) {
  return s.replace(/\s*(Source|स्रोत):[^]*$/u, "").trim();
}

export function ReasonLine({ reason }: { reason: Reason }) {
  const { lang, t } = useLang();
  const gap = reason.kind === "gap";
  const ctx = reason.kind === "context";
  return (
    <li className={clsx("pl-3 border-l-[3px]", gap ? "border-gap text-gap font-semibold" : ctx ? "border-rule text-muted" : "border-ink/70")}>
      {gap && <span className="sr-only">{t.dataGap}: </span>}
      {ctx && <span className="text-sm font-semibold mr-1">{t.context}:</span>}
      {stripSource(reason.text?.[lang] ?? "")} {reason.source && <PdfLink source={reason.source} />}
    </li>
  );
}
