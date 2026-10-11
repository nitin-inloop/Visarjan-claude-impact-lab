"use client";

import { API_URL, pdfHref } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";

interface LinkSource {
  pdf: string | null;
  page: number | null;
  report?: string | null;
  /** intake job id: officer-added reading, links to the uploaded page image */
  upload?: string | null;
}

export function PdfLink({ source }: { source: LinkSource }) {
  const { t, lang } = useLang();
  if (typeof source.page !== "number") return null;
  if (source.upload) {
    return (
      <a
        href={`${API_URL}/api/intake/jobs/${encodeURIComponent(source.upload)}/page/${source.page}.png`}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap font-semibold tabular underline underline-offset-2"
        title={ix[lang].uploadedTitle}
      >
        {ix[lang].uploadedPage(source.page)} ↗
      </a>
    );
  }
  if (!source.pdf) return null;
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
