"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import type { UploadOpts } from "@/lib/intakeApi";
import type { Capabilities, ManualReq } from "@/lib/intakeTypes";
import { ManualForm } from "./ManualForm";
import { btn, btnPrimary, input } from "./shared";

const OK_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const OK_EXT = /\.(pdf|jpe?g|png)$/i;

interface Props {
  caps: Capabilities | null;
  busy: boolean;
  progress: number | null;
  onUpload(file: File, opts: UploadOpts): void;
  onManual(req: ManualReq): void;
}

export function SourceChooser({ caps, busy, progress, onUpload, onManual }: Props) {
  const { lang, t } = useLang();
  const x = ix[lang];
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [year, setYear] = useState("");
  const [festival, setFestival] = useState("");
  const [pages, setPages] = useState("");
  const [forceOcr, setForceOcr] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const maxMb = caps?.max_upload_mb ?? 25;

  const pick = (f: File | null | undefined) => {
    if (!f) return;
    if (!OK_TYPES.includes(f.type) && !OK_EXT.test(f.name)) {
      setErr(x.badType);
      return;
    }
    if (f.size > maxMb * 1024 * 1024) {
      setErr(x.tooBig(maxMb));
      return;
    }
    setErr(null);
    setFile(f);
  };

  return (
    <div>
      <div role="tablist" aria-label={x.title} className="inline-flex rounded border border-rule overflow-hidden mb-3">
        {(["upload", "manual"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={clsx("px-3 py-1.5 text-sm", mode === m ? "bg-raised text-ink font-semibold" : "bg-surface text-muted hover:text-ink")}
          >
            {m === "upload" ? x.upload : x.manual}
          </button>
        ))}
      </div>
      {mode === "manual" ? (
        <ManualForm onSubmit={onManual} busy={busy} />
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (file) onUpload(file, { year: year ? Number(year) : undefined, festival: festival || undefined, pages: pages.trim() || undefined, force_ocr: forceOcr });
          }}
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(false);
              pick(e.dataTransfer.files?.[0]);
            }}
            className={clsx("rounded-md border-2 border-dashed px-4 py-6 text-center", over ? "border-accent bg-raised" : "border-rule bg-surface/60")}
          >
            <p className="text-ink font-semibold">{x.dropHere}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={btn} onClick={() => fileRef.current?.click()}>
                {x.orPick}
              </button>
              <button type="button" className={btn} onClick={() => camRef.current?.click()}>
                {x.camera}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" className="sr-only" tabIndex={-1} onChange={(e) => pick(e.target.files?.[0])} />
            <input ref={camRef} type="file" accept="image/*,application/pdf" capture="environment" className="sr-only" tabIndex={-1} onChange={(e) => pick(e.target.files?.[0])} />
            {file && (
              <p className="mt-2 text-sm text-ink tabular">
                {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <label className="text-sm">
              <span className="block text-xs text-muted mb-0.5">{x.year}</span>
              <input type="number" min={2020} max={2030} placeholder="auto" className={`${input} w-full tabular`} value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label className="text-sm">
              <span className="block text-xs text-muted mb-0.5">{x.festival}</span>
              <select className={`${input} w-full`} value={festival} onChange={(e) => setFestival(e.target.value)}>
                <option value="">auto</option>
                <option value="Durga">{t.festival.Durga}</option>
                <option value="Ganesh">{t.festival.Ganesh}</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="block text-xs text-muted mb-0.5">{x.pages}</span>
              <input className={`${input} w-full tabular`} placeholder="28-30" value={pages} onChange={(e) => setPages(e.target.value)} />
            </label>
            <label className="text-sm flex items-end gap-2 pb-1">
              <input type="checkbox" checked={forceOcr} onChange={(e) => setForceOcr(e.target.checked)} disabled={caps ? !caps.ocr.available : false} />
              <span className={caps && !caps.ocr.available ? "text-muted" : "text-ink"}>{x.forceOcr}</span>
            </label>
          </div>
          {err && (
            <p className="text-sm text-medium" role="alert">
              {err}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button type="submit" className={btnPrimary} disabled={!file || busy}>
              {x.start}
            </button>
            {progress !== null && (
              <span className="text-sm text-muted tabular" role="status">
                {x.uploading(progress)}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
