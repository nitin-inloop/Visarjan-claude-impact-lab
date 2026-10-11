"use client";

import { useEffect, useState } from "react";
import type { DataSource, Sourced } from "./types";

/** Start from the server-rendered snapshot, then try the live API (fallback: static file). */
export function useLive<T>(load: () => Promise<Sourced<T>>, initial: T | null, deps: unknown[] = []) {
  const [state, setState] = useState<{ data: T | null; source: DataSource | null; error: boolean }>({
    data: initial,
    source: initial ? "static" : null,
    error: false,
  });
  useEffect(() => {
    let alive = true;
    load()
      .then((r) => alive && setState({ data: r.data, source: r.source, error: false }))
      .catch(() => alive && setState((s) => ({ ...s, error: !s.data })));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
