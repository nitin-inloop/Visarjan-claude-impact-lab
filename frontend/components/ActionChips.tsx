"use client";

import clsx from "clsx";
import { toggleDone, useActionLog } from "@/lib/actionlog";
import { useLang } from "@/lib/lang";
import type { Action } from "@/lib/types";

export function ActionChips({ slug, actions, trackable = true }: { slug: string; actions: Action[]; trackable?: boolean }) {
  const { lang, t } = useLang();
  const log = useActionLog();
  return (
    <ul className="flex flex-col gap-2">
      {actions.map((a) => {
        const done = log.some((e) => e.ghat === slug && e.action === a.code);
        const [head, ...rest] = a.text[lang].split(/:\s*/);
        return (
          <li key={a.code} className={clsx("flex items-start gap-2 rounded border px-3 py-2", a.code === "lake_ban" ? "border-rule bg-surface" : "border-accent/40")}>
            <span className="flex-1 min-w-0">
              <span className={clsx("font-semibold", a.code === "lake_ban" ? "text-ink" : "text-accent", done && "line-through")}>
                {t.action[a.code] ?? head}
              </span>
              {rest.length > 0 && <span className="text-[0.95rem]">: {rest.join(": ")}</span>}
            </span>
            {trackable && a.code !== "lake_ban" && (
              <button
                type="button"
                onClick={() => toggleDone(slug, a.code)}
                aria-pressed={done}
                className={clsx(
                  "no-print shrink-0 rounded px-2 py-0.5 text-sm border",
                  done ? "bg-low text-white border-low" : "border-rule text-muted hover:border-ink hover:text-ink",
                )}
              >
                {done ? `✓ ${t.done}` : t.markDone}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
