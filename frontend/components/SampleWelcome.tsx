"use client";

// First-visit popup: download the sample report, then the dashboard. After the download a small toast
// points to Upload & OCR. Shown once per browser (localStorage); the sidebar keeps a download link.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { SAMPLE_PDF } from "@/lib/mockSample";

const KEY = "gw-sample-welcome";

export function SampleWelcome() {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const primary = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "done";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (!seen) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    primary.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && close(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 15000);
    return () => clearTimeout(t);
  }, [toast]);

  function close(downloaded: boolean) {
    try {
      localStorage.setItem(KEY, "done");
    } catch {}
    setOpen(false);
    if (downloaded) setToast(true);
  }

  const steps = hi
    ? ["नमूना रिपोर्ट PDF डाउनलोड करें", "अपलोड और OCR पेज पर इसे डालें", "निकाले गए माप, CPCB जांच और सुझाव देखें"]
    : ["Download the sample report PDF", "Drop it on the Upload & OCR page", "See the readings extracted, checked against CPCB limits, and turned into actions"];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[2000] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="gw-welcome-title">
          <div className="w-full max-w-md rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-6 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[9px]" />
              <span className="text-[15px] font-bold tracking-tight text-[var(--d-ink)]">Ghat Watch</span>
            </div>
            <h2 id="gw-welcome-title" className="mt-4 text-[22px] font-bold leading-tight tracking-tight text-[var(--d-ink)]">
              {hi ? "इसे एक रिपोर्ट पर काम करते देखें" : "Test it live on a report"}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-ink2)]">
              {hi
                ? "हमारी नमूना जांच रिपोर्ट डाउनलोड करें (MPPCB प्रारूप में कृत्रिम डेटा) और देखें कि Ghat Watch उसे कैसे पढ़ता है।"
                : "Download our sample test report (synthetic data in the MPPCB format) and watch Ghat Watch read it."}
            </p>
            <ol className="mt-4 space-y-2.5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-[var(--d-ink)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--d-track)] text-[12px] font-bold">{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <a
              ref={primary}
              href={SAMPLE_PDF}
              download
              onClick={() => close(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--d-ink)] px-4 py-3 text-[15px] font-semibold text-[var(--d-on-inv)] no-underline hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
              </svg>
              {hi ? "नमूना PDF डाउनलोड करें" : "Download sample PDF"}
            </a>
            <button type="button" onClick={() => close(false)} className="mt-2 w-full rounded-xl px-4 py-2.5 text-[14px] font-medium text-[var(--d-muted)] hover:bg-[var(--d-page)] hover:text-[var(--d-ink)]">
              {hi ? "छोड़ें, डैशबोर्ड खोलें" : "Skip, open the dashboard"}
            </button>
            <p className="mt-3 text-center text-[11px] text-[var(--d-muted3)]">
              {hi ? "कृत्रिम परीक्षण डेटा, असली MPPCB माप नहीं।" : "Synthetic test data, not real MPPCB measurements."}
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-4 right-4 z-[2000] flex max-w-sm items-start gap-3 rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-4 shadow-xl" role="status">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--d-track)] text-[13px]">✓</span>
          <div className="min-w-0 flex-1 text-[13px] text-[var(--d-ink2)]">
            <p className="font-semibold text-[var(--d-ink)]">{hi ? "नमूना PDF डाउनलोड हुई" : "Sample PDF downloaded"}</p>
            <p className="mt-0.5">{hi ? "अगला कदम: इसे अपलोड करें।" : "Next: upload it and see the results."}</p>
            <Link href="/intake" onClick={() => setToast(false)} className="mt-2 inline-block font-semibold text-[var(--d-ink)] underline underline-offset-2">
              {hi ? "अपलोड और OCR खोलें →" : "Open Upload & OCR →"}
            </Link>
          </div>
          <button type="button" onClick={() => setToast(false)} className="text-[var(--d-muted)] hover:text-[var(--d-ink)]" aria-label={hi ? "बंद करें" : "Close"}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}
