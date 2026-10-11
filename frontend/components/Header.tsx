"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { ix } from "@/lib/intakeI18n";
import { LangToggle } from "./LangToggle";
import { SourceBadge } from "./SourceBadge";

export function Header() {
  const { t, lang } = useLang();
  const path = usePathname();
  const nav = [
    { href: "/", label: t.lv.nav },
    { href: "/brief", label: t.openBrief },
    { href: "/whatif", label: t.enterReadings },
    { href: "/models", label: t.models },
    { href: "/intake", label: ix[lang].nav },
  ];
  return (
    <header className="no-print border-b border-rule bg-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/" className="no-underline text-ink mr-auto">
          <span className="block font-bold text-lg leading-tight">{t.appName}</span>
          <span className="block text-sm text-muted leading-tight">{t.appSub}</span>
        </Link>
        <SourceBadge />
        <LangToggle />
      </div>
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto text-[0.95rem]" aria-label="Main">
        {nav.map((n) => {
          const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "px-3 py-2 whitespace-nowrap no-underline border-b-[3px]",
                active ? "border-accent text-ink font-semibold" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
