"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { LangToggle } from "./LangToggle";

export function Header() {
  const { lang } = useLang();
  const path = usePathname();
  const nav = [
    { href: "/", icon: "🏠", label: lang === "hi" ? "घाट सूची" : "Ghats" },
    { href: "/intake", icon: "⬆", label: lang === "hi" ? "रिपोर्ट डालें" : "Upload report" },
    { href: "/brief", icon: "📄", label: lang === "hi" ? "ब्रीफ" : "Brief" },
  ];
  return (
    <header className="no-print border-b-2 border-rule bg-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
        <Link href="/" className="no-underline text-ink mr-auto">
          <span className="block font-extrabold text-2xl leading-tight">{lang === "hi" ? "घाट वॉच" : "Ghat Watch"}</span>
          <span className="block text-base text-muted leading-tight">
            {lang === "hi" ? "भोपाल नगर निगम · दुर्गा विसर्जन" : "Bhopal Municipal Corporation · Durga visarjan"}
          </span>
        </Link>
        <LangToggle />
      </div>
      <nav className="max-w-3xl mx-auto px-2 sm:px-4 flex gap-0 sm:gap-1 overflow-x-auto text-[1.05rem] sm:text-lg" aria-label="Main">
        {nav.map((n) => {
          const active = n.href === "/" ? path === "/" || path.startsWith("/ghat") : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "min-h-12 inline-flex items-center gap-1.5 px-2 sm:px-3 whitespace-nowrap no-underline border-b-4",
                active ? "border-accent text-ink font-bold" : "border-transparent text-muted hover:text-ink",
              )}
            >
              <span aria-hidden>{n.icon}</span>
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
