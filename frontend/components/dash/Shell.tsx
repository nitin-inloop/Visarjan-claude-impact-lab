"use client";

// Dashboard shell: white sidebar (logo, workspace card, grouped menus) + top bar (breadcrumb, ghat search,
// alert bell, officer chip). Sidebar becomes a drawer below md. Dark by default; light is opt-in.

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fetchRanking } from "@/lib/api";
import { fetchAiAlerts, type AiAlert } from "@/lib/ai";
import { SAMPLE_PDF } from "@/lib/mockSample";
import { SampleWelcome } from "@/components/SampleWelcome";
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
  lang: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
  download: <><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" /><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
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
];
const ALL = [...MAIN, ...MANAGE];
const HELP = "https://github.com/nitin-inloop/Visarjan-claude-impact-lab#readme";

function isActive(it: Item, p: string) {
  return it.match ? it.match(p) : p === it.href || p.startsWith(it.href + "/");
}

function NavGroup({ title, items, path, lang, onNav }: { title: string; items: Item[]; path: string; lang: Lang; onNav: () => void }) {
  return (
    <div className="mt-6">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--d-bar-mid)]">{title}</p>
      <ul className="mt-2 space-y-0.5">
        {items.map((it) => {
          const on = isActive(it, path);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={onNav}
                aria-current={on ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] no-underline ${on ? "bg-[var(--d-track)] font-semibold text-[var(--d-ink)]" : "text-[var(--d-ink2)] hover:bg-[var(--d-page)]"}`}
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
    <nav className="flex h-full flex-col overflow-y-auto border-r border-[var(--d-border)] bg-[var(--d-card)] px-4 py-5" aria-label="Main">
      <Link href="/" onClick={onNav} className="flex items-center gap-2.5 px-2 no-underline">
        <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[9px]" priority />
        <span className="text-[19px] font-bold tracking-tight text-[var(--d-ink)]">Ghat Watch</span>
      </Link>
      <div className="mt-5 rounded-2xl border border-[var(--d-border)] p-3">
        <p className="text-[11px] text-[var(--d-muted)]">{lang === "hi" ? "कार्यक्षेत्र" : "Workspace"}</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[var(--d-ink)]">
          {lang === "hi" ? "भोपाल नगर निगम" : "Bhopal Municipal Corporation"}
        </p>
        <p className="text-[12px] text-[var(--d-muted)]">{lang === "hi" ? "दुर्गा विसर्जन 2026" : "Durga Visarjan 2026"}</p>
      </div>
      <NavGroup title={lang === "hi" ? "मुख्य मेनू" : "Main menu"} items={MAIN} path={path} lang={lang} onNav={onNav} />
      <div className="mx-3 mt-4 border-t border-[var(--d-hover)]" />
      <NavGroup title={lang === "hi" ? "प्रबंधन" : "Manage"} items={MANAGE} path={path} lang={lang} onNav={onNav} />
      <div className="mx-3 mt-4 border-t border-[var(--d-hover)]" />
      <div className="mt-6">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--d-bar-mid)]">{lang === "hi" ? "सेटिंग्स" : "Settings"}</p>
        <div className="mt-2 flex items-center gap-3 px-3 py-2 text-[14px] text-[var(--d-ink2)]">
          <Icon d={I.lang} />
          <div className="flex rounded-lg border border-[var(--d-border)] p-0.5 text-[13px]" role="group" aria-label="Language">
            {(["hi", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-md px-2.5 py-1 ${lang === l ? "bg-[var(--d-ink)] font-semibold text-[var(--d-on-inv)]" : "text-[var(--d-ink2)] hover:bg-[var(--d-page)]"}`}
              >
                {l === "hi" ? "हिंदी" : "English"}
              </button>
            ))}
          </div>
        </div>
        <ThemeRow lang={lang} />
        <a href={SAMPLE_PDF} download className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-[var(--d-ink2)] no-underline hover:bg-[var(--d-page)]">
          <Icon d={I.download} />
          {lang === "hi" ? "नमूना रिपोर्ट (PDF)" : "Sample report (PDF)"}
        </a>
        <a href={HELP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-[var(--d-ink2)] no-underline hover:bg-[var(--d-page)]">
          <Icon d={I.help} />
          {lang === "hi" ? "सहायता (README)" : "Help (README)"}
        </a>
      </div>
      <p className="mt-auto px-3 pt-6 text-[11px] leading-snug text-[var(--d-bar-mid)]">
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
      <label className="flex items-center gap-2 rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] px-3 py-2 text-[14px] text-[var(--d-muted)]">
        <Icon d={I.search} className="h-4 w-4" />
        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && hits[0] && go(hits[0].slug)}
          placeholder={lang === "hi" ? "घाट खोजें…" : "Search a ghat…"}
          className="min-w-0 flex-1 bg-transparent text-[var(--d-ink)] outline-none placeholder:text-[var(--d-muted3)]"
          aria-label={lang === "hi" ? "घाट खोजें" : "Search a ghat"}
        />
        <kbd className="hidden rounded-md border border-[var(--d-border)] px-1.5 text-[11px] text-[var(--d-muted)] sm:inline">⌘ K</kbd>
      </label>
      {open && hits.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-[var(--d-border)] bg-[var(--d-card)] py-1 shadow-lg">
          {hits.map((h) => (
            <li key={h.slug}>
              <button type="button" onMouseDown={() => go(h.slug)} className="block w-full px-3 py-2 text-left text-[14px] text-[var(--d-ink)] hover:bg-[var(--d-page)]">
                {h.name[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Theme = "light" | "dark";
const THEME_EVT = "gw-theme";
function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setT] = useState<Theme>("dark");
  useEffect(() => {
    const read = () => setT(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    read();
    window.addEventListener(THEME_EVT, read);
    return () => window.removeEventListener(THEME_EVT, read);
  }, []);
  const set = (t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
    window.dispatchEvent(new Event(THEME_EVT));
  };
  return [theme, set];
}

function ThemeButton({ lang }: { lang: Lang }) {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-xl text-[var(--d-ink2)] hover:bg-[var(--d-track)]"
      aria-label={dark ? (lang === "hi" ? "हल्की थीम" : "Switch to light theme") : lang === "hi" ? "गहरी थीम" : "Switch to dark theme"}
      title={dark ? "Light" : "Dark"}
    >
      <Icon d={dark ? I.sun : I.moon} className="h-5 w-5" />
    </button>
  );
}

function ThemeRow({ lang }: { lang: Lang }) {
  const [theme, setTheme] = useTheme();
  return (
    <div className="flex items-center gap-3 px-3 py-2 text-[14px] text-[var(--d-ink2)]">
      <Icon d={theme === "dark" ? I.moon : I.sun} />
      <span className="sr-only">{lang === "hi" ? "थीम" : "Theme"}</span>
      <div className="flex rounded-lg border border-[var(--d-border)] p-0.5 text-[13px]" role="group" aria-label="Theme">
        {(["light", "dark"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            aria-pressed={theme === t}
            className={`rounded-md px-2.5 py-1 ${theme === t ? "bg-[var(--d-ink)] font-semibold text-[var(--d-on-inv)]" : "text-[var(--d-ink2)] hover:bg-[var(--d-page)]"}`}
          >
            {t === "light" ? (lang === "hi" ? "हल्की" : "Light") : lang === "hi" ? "गहरी" : "Dark"}
          </button>
        ))}
      </div>
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
        className="relative grid h-9 w-9 place-items-center rounded-xl text-[var(--d-ink2)] hover:bg-[var(--d-track)]"
        aria-label={lang === "hi" ? `${n} अलर्ट` : `${n} alerts`}
        aria-expanded={open}
      >
        <Icon d={I.bell} className="h-5 w-5" />
        {n > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--d-danger)] px-1 text-[10px] font-bold text-white">{n}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,90vw)] rounded-2xl border border-[var(--d-border)] bg-[var(--d-card)] p-2 shadow-lg">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--d-bar-mid)]">{lang === "hi" ? "अलर्ट" : "Alerts"}</p>
          {alerts === null ? (
            <p className="px-2 py-2 text-[13px] text-[var(--d-muted)]">{lang === "hi" ? "सर्वर से अलर्ट नहीं मिले।" : "Alerts unavailable (server off)."}</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {alerts.map((a) => (
                <li key={a.id}>
                  <Link href={`/ghat/${a.ghat.slug}`} onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 text-[13px] no-underline hover:bg-[var(--d-page)]">
                    <span className="font-semibold text-[var(--d-ink)]">{a.ghat.name[lang]}</span>
                    <span className={`ml-2 text-[11px] font-semibold uppercase ${a.severity === "critical" || a.severity === "high" ? "text-[var(--d-danger)]" : "text-[var(--d-warn-ink)]"}`}>{a.severity}</span>
                    <span className="block text-[var(--d-ink2)]">{a.message[lang]}</span>
                    <span className="block text-[var(--d-muted)]">→ {a.action.text[lang]} · {a.deadline.text[lang]}</span>
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
    <div className="flex min-h-screen w-full bg-[var(--d-page)] text-[var(--d-ink)]">
      <SampleWelcome />
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 md:block lg:w-64">
        <Sidebar path={path} onNav={() => undefined} />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <Sidebar path={path} onNav={() => setDrawer(false)} />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--d-border)] bg-[var(--d-card)]/95 px-4 py-3 backdrop-blur sm:px-6">
          <button type="button" className="grid h-9 w-9 place-items-center rounded-xl hover:bg-[var(--d-track)] md:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Icon d={I.menu} className="h-5 w-5" />
          </button>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-[14px] lg:flex">
            <Link href="/" className="text-[var(--d-muted)] no-underline hover:text-[var(--d-ink)]">Ghat Watch</Link>
            <span className="text-[var(--d-muted3)]">›</span>
            <span className="font-semibold capitalize text-[var(--d-ink)]">{cur?.label[lang] ?? (lang === "hi" ? "पेज" : "Page")}</span>
            {crumb && (
              <>
                <span className="text-[var(--d-muted3)]">›</span>
                <span className="font-semibold capitalize text-[var(--d-ink)]">{crumb}</span>
              </>
            )}
          </nav>
          <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <Search lang={lang} />
            <ThemeButton lang={lang} />
            <Bell lang={lang} />
            <span className="hidden items-center gap-2 rounded-xl border border-[var(--d-border)] px-2.5 py-1.5 text-[13px] font-semibold lg:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--d-ink)] text-[10px] font-bold text-[var(--d-on-inv)]">BMC</span>
              {lang === "hi" ? "BMC अधिकारी" : "BMC Officer"}
            </span>
          </div>
        </header>
        <main className="w-full flex-1 px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
