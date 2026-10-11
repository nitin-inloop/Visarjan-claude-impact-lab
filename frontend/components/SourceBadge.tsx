"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { pingApi } from "@/lib/api";
import { useLang } from "@/lib/lang";

export function SourceBadge() {
  const { t } = useLang();
  const [live, setLive] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    pingApi().then((ok) => alive && setLive(ok));
    return () => {
      alive = false;
    };
  }, []);
  if (live === null) return null;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-sm rounded px-2 py-1 border",
        live ? "border-low text-low" : "border-rule text-muted",
      )}
      title={live ? t.liveHint : t.staticHint}
      role="status"
    >
      <span aria-hidden className={clsx("inline-block w-2 h-2 rounded-full", live ? "bg-low" : "bg-muted")} />
      {live ? t.live : t.static}
    </span>
  );
}
