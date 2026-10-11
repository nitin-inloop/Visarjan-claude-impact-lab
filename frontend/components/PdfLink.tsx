"use client";

import { pdfHref } from "@/lib/api";
import { useLang } from "@/lib/lang";
import type { Source } from "@/lib/types";

export function PdfLink({ source }: { source: Pick<Source, "pdf" | "page"> & { report?: string } }) {
  const { t } = useLang();
  if (typeof source.page !== "number") return null;
  const report = source.report ?? `MPPCB ${source.pdf}`;
  return (
    <a
      href={pdfHref(source.pdf, source.page)}
      target="_blank"
      rel="noopener noreferrer"
      className="whitespace-nowrap font-semibold tabular underline underline-offset-2"
      title={t.pdfTitle(report, source.page)}
    >
      {t.page(source.page)} ↗
    </a>
  );
}
