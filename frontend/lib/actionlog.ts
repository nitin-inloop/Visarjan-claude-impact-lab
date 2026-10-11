"use client";

import { useSyncExternalStore } from "react";

const KEY = "ghatwatch.actionlog";
export interface LogEntry {
  date: string;
  ghat: string;
  action: string;
}
const listeners = new Set<() => void>();
let cache: string | null = null;
let parsed: LogEntry[] = [];
const EMPTY: LogEntry[] = [];

function snapshot(): LogEntry[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cache) {
    cache = raw;
    try {
      parsed = raw ? (JSON.parse(raw) as LogEntry[]) : [];
    } catch {
      parsed = [];
    }
  }
  return parsed;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function save(entries: LogEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
  listeners.forEach((f) => f());
}

export function useActionLog() {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function toggleDone(ghat: string, action: string) {
  const cur = snapshot();
  const exists = cur.some((e) => e.ghat === ghat && e.action === action);
  save(
    exists
      ? cur.filter((e) => !(e.ghat === ghat && e.action === action))
      : [...cur, { date: new Date().toISOString().slice(0, 10), ghat, action }],
  );
}

export function downloadCsv(entries: LogEntry[]) {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const lines = ["date,ghat,action,done_by", ...entries.map((e) => [e.date, e.ghat, e.action, ""].map(esc).join(","))];
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ghatwatch-action-log-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
