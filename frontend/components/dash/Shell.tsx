"use client";

// Dashboard shell: white sidebar (logo, workspace card, grouped menus) + top bar (breadcrumb, ghat search,
// alert bell, officer chip). Sidebar becomes a drawer below lg.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fetchRanking } from "@/lib/api";
import { fetchAiAlerts, type AiAlert } from "@/lib/ai";
import { useLang } from "@/lib/lang";
import type { Bilingual, Lang } from "@/lib/types";

type Item = { href: string; label: Bilingual; icon: ReactNode; match?: (p: string) => boolean };

const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const I = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  ml: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7.5 7.5 11 16M16.5 7.5 13 16M8 6h8" /></>,
  upload: <><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" /><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></>,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  brief: <><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></>,
  ghat: <><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></>,
  whatif: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  live: <><circle cx="12" cy="12" r="3" /><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" /></>,
  lang: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01" /></>,
  bell: <><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};
export function Icon({ d, className = "h-[18px] w-[18px]" }: { d: ReactNode; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} {...sw} aria-hidden>{d}</svg>;
}

const MAIN: Item[] = [
  { href: "/", label: { en: "Dashboard", hi: "डैशबोर्ड" }, icon: I.home, match: (p) => p === "/" },
  { href: "/models", label: { en: "ML Insights", hi: "ML अंतर्दृष्टि" }, icon: I.ml },
  { href: "/intake", label: { en: "Upload & OCR", hi: "अपलोड और OCR" }, icon: I.upload },
  { href: "/map", label: { en: "Ghat map", hi: "घाट नक्शा" }, icon: I.map },
  { href: "/brief", label: { en: "Brief", hi: "ब्रीफ" }, icon: I.brief },
];
const MANAGE: Item[] = [
  { href: "/ghat/bairagarh", label: { en: "Ghat details", hi: "घाट विवरण" }, icon: I.ghat, match: (p) => p.startsWith("/ghat/") },
  { href: "/whatif", label: { en: "What-if", hi: "क्या-अगर" }, icon: I.whatif },
  { href: "/lab", label: { en: "Live simulation", hi: "लाइव सिमुलेशन" }, icon: I.live },
];
const ALL = [...MAIN, ...MANAGE];
const HELP = "https://github.com/nitin-inloop/Visarjan-claude-impact-lab#readme";

function isActive(it: Item, p: string) {
  return it.match ? it.match(p) : p === it.href || p.startsWith(it.href + "/");
}

function NavGroup({ title, items, path, lang, onNav }: { title: string; items: Item[]; path: string; lang: Lang; onNav: () => void }) {
  return (
    <div className="mt-6">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A93]">{title}</p>
      <ul className="mt-2 space-y-0.5">
        {items.map((it) => {
          const on = isActive(it, path);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={onNav}
                aria-current={on ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] no-underline ${on ? "bg-[#F1F1F3] font-semibold text-[#111113]" : "text-[#3A3A40] hover:bg-[#F6F6F7]"}`}
              >
                <Icon d={it.icon} />
                {it.label[lang]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Sidebar({ path, onNav }: { path: string; onNav: () => void }) {
  const { lang, setLang } = useLang();
  return (
    <nav className="flex h-full flex-col overflow-y-auto border-r border-[#E6E6E9] bg-white px-4 py-5" aria-label="Main">
      <Link href="/" onClick={onNav} className="flex items-center gap-2.5 px-2 no-underline">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
          <rect width="32" height="32" rx="9" fill="#111113" />
          <path d="M16 6s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" fill="#fff" />
          <path d="M8 25h16" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="text-[19px] font-bold tracking-tight text-[#111113]">Ghat Watch</span>
      </Link>
      <div className="mt-5 rounded-2xl border border-[#E6E6E9] p-3">
        <p className="text-[11px] text-[#6B6B75]">{lang === "hi" ? "कार्यक्षेत्र" : "Workspace"}</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[#111113]">
          {lang === "hi" ? "भोपाल नगर निगम" : "Bhopal Municipal Corporation"}
        </p>
        <p className="text-[12px] text-[#6B6B75]">{lang === "hi" ? "दुर्गा विसर्जन 2026" : "Durga Visarjan 2026"}</p>
      </div>
      <NavGroup title={lang === "hi" ? "मुख्य मेनू" : "Main menu"} items={MAIN} path={path} lang={lang} onNav={onNav} />
      <div className="mx-3 mt-4 border-t border-[#EFEFF1]" />
      <NavGroup title={lang === "hi" ? "प्रबंधन" : "Manage"} items={MANAGE} path={path} lang={lang} onNav={onNav} />
      <div className="mx-3 mt-4 border-t border-[#EFEFF1]" />
      <div className="mt-6">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A93]">{lang === "hi" ? "सेटिंग्स" : "Settings"}</p>
        <div className="mt-2 flex items-center gap-3 px-3 py-2 text-[14px] text-[#3A3A40]">
          <Icon d={I.lang} />
          <div className="flex rounded-lg border border-[#E6E6E9] p-0.5 text-[13px]" role="group" aria-label="Language">
            {(["hi", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-md px-2.5 py-1 ${lang === l ? "bg-[#111113] font-semibold text-white" : "text-[#3A3A40] hover:bg-[#F6F6F7]"}`}
              >
                {l === "hi" ? "हिंदी" : "English"}
              </button>
            ))}
          </div>
        </div>
        <a href={HELP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-[#3A3A40] no-underline hover:bg-[#F6F6F7]">
          <Icon d={I.help} />
          {lang === "hi" ? "सहायता (README)" : "Help (README)"}
        </a>
      </div>
      <p className="mt-auto px-3 pt-6 text-[11px] leading-snug text-[#8A8A93]">
        {lang === "hi" ? "डेटा: MPPCB रिपोर्ट 2023–2025 · CPCB श्रेणी B" : "Data: MPPCB reports 2023–2025 · CPCB class B"}
      </p>
    </nav>
  );
}

function useGhatNames() {
  const [names, setNames] = useState<{ slug: string; name: Bilingual }[]>([]);
  useEffect(() => {
    fetchRanking().then((r) => setNames(r.data.ghats.map((g) => ({ slug: g.slug, name: g.name })))).catch(() => undefined);
  }, []);
  return names;
}

function Search({ lang }: { lang: Lang }) {
  const names = useGhatNames();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    return names.filter((n) => !s || n.name.en.toLowerCase().includes(s) || n.name.hi.includes(s) || n.slug.includes(s));
  }, [q, names]);
  const go = (slug: string) => {
    setQ("");
    setOpen(false);
    router.push(`/ghat/${slug}`);
  };
  return (
    <div className="relative w-full max-w-sm">
      <label className="flex items-center gap-2 rounded-xl border border-[#E6E6E9] bg-white px-3 py-2 text-[14px] text-[#6B6B75]">
        <Icon d={I.search} className="h-4 w-4" />
        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && hits[0] && go(hits[0].slug)}
          placeholder={lang === "hi" ? "घाट खोजें…" : "Search a ghat…"}
          className="min-w-0 flex-1 bg-transparent text-[#111113] outline-none placeholder:text-[#9A9AA3]"
          aria-label={lang === "hi" ? "घाट खोजें" : "Search a ghat"}
        />
        <kbd className="hidden rounded-md border border-[#E6E6E9] px-1.5 text-[11px] text-[#6B6B75] sm:inline">⌘ K</kbd>
      </label>
      {open && hits.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-[#E6E6E9] bg-white py-1 shadow-lg">
          {hits.map((h) => (
            <li key={h.slug}>
              <button type="button" onMouseDown={() => go(h.slug)} className="block w-full px-3 py-2 text-left text-[14px] text-[#111113] hover:bg-[#F6F6F7]">
                {h.name[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Bell({ lang }: { lang: Lang }) {
  const [alerts, setAlerts] = useState<AiAlert[] | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let live = true;
    fetchAiAlerts(lang).then((d) => live && setAlerts(d?.alerts ?? null));
    return () => {
      live = false;
    };
  }, [lang]);
  const n = alerts?.length ?? 0;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative grid h-9 w-9 place-items-center rounded-xl text-[#3A3A40] hover:bg-[#F1F1F3]"
        aria-label={lang === "hi" ? `${n} अलर्ट` : `${n} alerts`}
        aria-expanded={open}
      >
        <Icon d={I.bell} className="h-5 w-5" />
        {n > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white">{n}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,90vw)] rounded-2xl border border-[#E6E6E9] bg-white p-2 shadow-lg">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A93]">{lang === "hi" ? "अलर्ट" : "Alerts"}</p>
          {alerts === null ? (
            <p className="px-2 py-2 text-[13px] text-[#6B6B75]">{lang === "hi" ? "सर्वर से अलर्ट नहीं मिले।" : "Alerts unavailable (server off)."}</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {alerts.map((a) => (
                <li key={a.id}>
                  <Link href={`/ghat/${a.ghat.slug}`} onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 text-[13px] no-underline hover:bg-[#F6F6F7]">
                    <span className="font-semibold text-[#111113]">{a.ghat.name[lang]}</span>
                    <span className={`ml-2 text-[11px] font-semibold uppercase ${a.severity === "critical" || a.severity === "high" ? "text-[#DC2626]" : "text-[#B45309]"}`}>{a.severity}</span>
                    <span className="block text-[#3A3A40]">{a.message[lang]}</span>
                    <span className="block text-[#6B6B75]">→ {a.action.text[lang]} · {a.deadline.text[lang]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "/";
  const { lang } = useLang();
  const [drawer, setDrawer] = useState(false);
  const cur = ALL.find((it) => isActive(it, path));
  const crumb = path.startsWith("/ghat/") ? path.split("/")[2]?.replace(/-/g, " ") : null;
  return (
    <div className="flex min-h-screen w-full bg-[#F6F6F7] text-[#111113]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
        <Sidebar path={path} onNav={() => undefined} />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <Sidebar path={path} onNav={() => setDrawer(false)} />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[#E6E6E9] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <button type="button" className="grid h-9 w-9 place-items-center rounded-xl hover:bg-[#F1F1F3] lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Icon d={I.menu} className="h-5 w-5" />
          </button>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-[14px] md:flex">
            <Link href="/" className="text-[#6B6B75] no-underline hover:text-[#111113]">Ghat Watch</Link>
            <span className="text-[#9A9AA3]">›</span>
            <span className="font-semibold capitalize text-[#111113]">{cur?.label[lang] ?? (lang === "hi" ? "पेज" : "Page")}</span>
            {crumb && (
              <>
                <span className="text-[#9A9AA3]">›</span>
                <span className="font-semibold capitalize text-[#111113]">{crumb}</span>
              </>
            )}
          </nav>
          <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <Search lang={lang} />
            <Bell lang={lang} />
            <span className="hidden items-center gap-2 rounded-xl border border-[#E6E6E9] px-2.5 py-1.5 text-[13px] font-semibold sm:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#111113] text-[10px] font-bold text-white">BMC</span>
              {lang === "hi" ? "BMC अधिकारी" : "BMC Officer"}
            </span>
          </div>
        </header>
        <main className="w-full flex-1 px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
