"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/lang";
import { useLiveStore } from "@/lib/liveStore";
import type { CommandRes } from "@/lib/liveTypes";
import { useUi, type TabId } from "./CommandCenter";

const TAB_IDS: TabId[] = ["plan", "dispatch", "sitrep", "models"];

export function CommandBox() {
  const { t, lang } = useLang();
  const { api } = useLiveStore();
  const { select, setTab, voiceApi } = useUi();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState<{ ok: boolean; text: string } | null>(null);
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const recRef = useRef<GwSpeechRecognition | null>(null);
  const runRef = useRef<(s: string) => void>(() => undefined);

  const run = async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setBusy(true);
    try {
      const r: CommandRes = await api.command(q, lang);
      setReply({ ok: r.ok, text: r.speak[lang] });
      voiceApi.say(r.speak);
      const ua = r.ui_action;
      if (ua.type === "select_ghat" && ua.value) select(ua.value);
      else if (ua.type === "open_tab" && ua.value && TAB_IDS.includes(ua.value as TabId)) {
        setTab(ua.value as TabId);
        document.getElementById("cc-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (ua.type === "control" && (ua.value === "start" || ua.value === "pause")) {
        if (api.kind === "http") api.control({ action: ua.value }).catch(() => undefined);
      }
      setText("");
    } catch {
      setReply({ ok: false, text: t.lv.conn.offline });
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    runRef.current = (s: string) => void run(s);
  });

  // Mic push-to-talk (SHOULD): Chrome's webkitSpeechRecognition. Created only in effects/handlers.
  useEffect(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (ev) => {
      let fin = "";
      let mid = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i];
        if (r.isFinal) fin += r[0].transcript;
        else mid += r[0].transcript;
      }
      setInterim(mid);
      if (fin) {
        setText(fin);
        setInterim("");
        runRef.current(fin);
      }
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    const id = setTimeout(() => setMicOk(true), 0);
    return () => {
      clearTimeout(id);
      rec.onresult = null;
      rec.onend = null;
      rec.onerror = null;
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
      recRef.current = null;
    };
  }, []);

  const toggleMic = () => {
    const rec = recRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      return;
    }
    rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
    try {
      rec.start();
      setListening(true);
      setInterim("");
    } catch {
      setListening(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 min-w-0 w-full sm:w-auto">
      <form
        className="flex items-center gap-1.5 min-w-0 flex-1 sm:flex-none"
        onSubmit={(e) => {
          e.preventDefault();
          void run(text);
        }}
      >
        <label htmlFor="cc-cmd" className="sr-only">
          {t.lv.cmdLabel}
        </label>
        <input
          id="cc-cmd"
          value={listening && interim ? interim : text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.lv.cmdPlaceholder}
          className="w-full sm:w-72 min-w-0 rounded border border-rule bg-surface px-2.5 py-1 text-sm text-ink placeholder:text-muted"
          autoComplete="off"
        />
        <button type="submit" disabled={busy} className="rounded bg-accent text-paper px-3 py-1 text-sm font-semibold disabled:opacity-60">
          {t.lv.cmdRun}
        </button>
        {micOk && (
          <button
            type="button"
            onClick={toggleMic}
            aria-pressed={listening}
            title={t.lv.micHint}
            className={clsx("rounded border px-2.5 py-1 text-sm font-semibold", listening ? "border-critical text-critical" : "border-rule bg-surface text-ink hover:border-accent")}
          >
            {listening ? t.lv.micListening : t.lv.micStart}
          </button>
        )}
      </form>
      <p className="text-sm min-w-0 max-w-[28rem] truncate" aria-live="polite" title={reply?.text}>
        {reply && <span className={reply.ok ? "text-ink" : "text-medium"}>{reply.text}</span>}
      </p>
    </div>
  );
}
