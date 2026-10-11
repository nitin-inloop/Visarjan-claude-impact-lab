"use client";

import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { Capabilities } from "@/lib/intakeTypes";

export function CapabilitiesBanner({ caps, kind }: { caps: Capabilities | null; kind: "http" | "mock" | null }) {
  const { lang } = useLang();
  const x = ix[lang];
  if (!caps) return <p className="text-sm text-muted">…</p>;
  return (
    <div className="rounded border border-rule bg-surface px-3 py-2 text-sm space-y-1">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>
          {x.capText}: <b className="text-low">{x.ready}</b>
        </span>
        <span aria-hidden className="text-muted">·</span>
        <span>
          {x.capOcr}
          {caps.ocr.engine ? ` (${caps.ocr.engine})` : ""}: <b className={caps.ocr.available ? "text-low" : "text-medium"}>{caps.ocr.available ? x.ready : x.notInstalled}</b>
        </span>
        {!caps.ocr.available && (
          <details className="inline">
            <summary className="cursor-pointer text-link">{x.howEnable}</summary>
            <span className="block text-muted text-xs mt-1">
              {caps.ocr.how_to_enable[lang]} <code className="text-ink">{caps.ocr.venv}</code>
            </span>
          </details>
        )}
        <span aria-hidden className="text-muted">·</span>
        <span className="text-muted tabular">≤ {caps.max_upload_mb} MB</span>
      </div>
      <p className={clsx("text-xs", kind === "mock" ? "text-medium" : "text-muted")}>{kind === "mock" ? x.mockMode : x.realMode}</p>
    </div>
  );
}
