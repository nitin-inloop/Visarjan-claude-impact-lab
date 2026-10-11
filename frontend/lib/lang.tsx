"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { dict, type Dict } from "./i18n";
import type { Lang } from "./types";

const KEY = "ghatwatch.lang";
const listeners = new Set<() => void>();

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setLang(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* private mode: keep in memory only */
  }
  listeners.forEach((f) => f());
}

export function useLang(): { lang: Lang; t: Dict; setLang: (l: Lang) => void } {
  const lang = useSyncExternalStore(subscribe, read, () => "en" as Lang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const set = useCallback((l: Lang) => setLang(l), []);
  return { lang, t: dict[lang], setLang: set };
}
