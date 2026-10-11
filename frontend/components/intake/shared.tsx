"use client";

import { useEffect } from "react";
import type { Bilingual } from "@/lib/types";

export const GHATS: { slug: string; name: Bilingual }[] = [
  { slug: "bairagarh", name: { en: "Bairagarh (Sant Hirdaram) kund", hi: "बैरागढ़ (संत हिरदाराम) कुंड" } },
  { slug: "malikhedi", name: { en: "Malikhedi kund", hi: "मालीखेड़ी कुंड" } },
  { slug: "shahpura", name: { en: "Shahpura lake ghat", hi: "शाहपुरा झील घाट" } },
  { slug: "rani-kamlapati", name: { en: "Rani Kamlapati ghat / Kamla Park kund", hi: "रानी कमलापति घाट / कमला पार्क कुंड" } },
  { slug: "hathaikheda", name: { en: "Hathaikheda dam / kund", hi: "हथाईखेड़ा डैम / कुंड" } },
  { slug: "khatlapura", name: { en: "Khatlapura ghat", hi: "खटलापुरा घाट" } },
  { slug: "prempura", name: { en: "Prempura ghat", hi: "प्रेमपुरा घाट" } },
];
export const ghatName = (slug: string | null, lang: "en" | "hi") => GHATS.find((g) => g.slug === slug)?.name[lang] ?? null;

export const btn = "rounded border border-rule bg-surface px-3 py-1.5 text-sm font-semibold text-ink hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed";
export const btnPrimary = "rounded bg-accent text-paper px-4 py-1.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";
export const input = "rounded border border-rule bg-paper px-2 py-1 text-sm text-ink focus:border-accent";

/** colour class for an extraction confidence (≥ 0.9 plain, 0.7–0.9 amber, < 0.7 red) */
export function confClass(c: number): string {
  if (c >= 0.9) return "border-rule";
  if (c >= 0.7) return "border-medium bg-medium-bg";
  return "border-critical bg-high-bg";
}
export function confText(c: number): string {
  if (c >= 0.9) return "text-muted";
  if (c >= 0.7) return "text-medium";
  return "text-critical";
}

export function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[2000] bg-black/80 p-4 overflow-auto" onClick={onClose}>
      <button type="button" className="fixed top-3 right-4 rounded bg-surface border border-rule px-3 py-1 text-ink text-sm" onClick={onClose}>
        ✕
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mx-auto max-w-full h-auto bg-white" />
    </div>
  );
}
