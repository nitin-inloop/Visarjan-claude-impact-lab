"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useLang } from "@/lib/lang";
import { LiveProvider, useLiveStore } from "@/lib/liveStore";
import { VoiceOut, type AnnounceLevel, type VoiceState } from "@/lib/voice";
import type { Bi } from "@/lib/liveTypes";
import type { Allocation, Leaderboard, Ranking } from "@/lib/types";
import { TopBar } from "./TopBar";
import { AlertBanner } from "./AlertBanner";
import { AlertFeed } from "./AlertFeed";
import { GhatStrip } from "./GhatTile";
import { MapPanel } from "./MapPanel";
import { Tabs } from "./Tabs";
import { Drawer } from "./Drawer";

export type TabId = "plan" | "dispatch" | "sitrep" | "models";
const TABS: TabId[] = ["plan", "dispatch", "sitrep", "models"];

interface VoiceApi {
  enable(): void;
  say(text: Bi, critical?: boolean): void;
  stop(): void;
  setMuted(m: boolean): void;
  setLevel(l: AnnounceLevel): void;
}

interface UiCtx {
  selected: string | null;
  select(slug: string | null): void;
  tab: TabId;
  setTab(t: TabId): void;
  voice: VoiceState;
  voiceApi: VoiceApi;
  ranking: Ranking | null;
}

const Ui = createContext<UiCtx | null>(null);
export function useUi(): UiCtx {
  const c = useContext(Ui);
  if (!c) throw new Error("useUi outside CommandCenter");
  return c;
}

// Tab state lives in the URL hash so tabs are linkable.
const hashListeners = new Set<() => void>();
function subHash(cb: () => void) {
  hashListeners.add(cb);
  window.addEventListener("hashchange", cb);
  return () => {
    hashListeners.delete(cb);
    window.removeEventListener("hashchange", cb);
  };
}
function readHash(): TabId {
  const h = window.location.hash.replace("#", "") as TabId;
  return TABS.includes(h) ? h : "plan";
}
function writeHash(t: TabId) {
  history.replaceState(null, "", `#${t}`);
  hashListeners.forEach((f) => f());
}

const VOICE_INIT: VoiceState = { supported: false, enabled: false, muted: false, level: "high", voiceName: null, hindiMissing: false, speaking: false };

interface Props {
  initialRanking: Ranking | null;
  initialLb?: Leaderboard | null;
  initialAlloc?: Allocation | null;
}

export function CommandCenter(props: Props) {
  return (
    <LiveProvider ranking={props.initialRanking}>
      <Shell {...props} />
    </LiveProvider>
  );
}

function Shell({ initialRanking, initialLb = null, initialAlloc = null }: Props) {
  const { lang, t } = useLang();
  const { subscribeAlerts } = useLiveStore();
  const [selected, setSelected] = useState<string | null>(null);
  const tab = useSyncExternalStore(subHash, readHash, () => "plan" as TabId);
  const [voice, setVoice] = useState<VoiceState>(VOICE_INIT);
  const voiceRef = useRef<VoiceOut | null>(null);

  useEffect(() => {
    const v = new VoiceOut();
    voiceRef.current = v;
    const unsub = v.subscribe(() => setVoice(v.getState()));
    v.setLang(lang);
    const unAlerts = subscribeAlerts((as) => as.forEach((a) => v.announce(a)));
    return () => {
      unAlerts();
      unsub();
      v.dispose();
      voiceRef.current = null;
    };
    // lang is synced by the next effect; do not recreate the voice on language change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeAlerts]);

  useEffect(() => {
    voiceRef.current?.setLang(lang);
  }, [lang]);

  const confirm = t.lv.voiceConfirm;
  const voiceApi = useMemo<VoiceApi>(
    () => ({
      enable: () => voiceRef.current?.enable(confirm),
      say: (text, critical) => voiceRef.current?.say(text, { critical, force: true }),
      stop: () => voiceRef.current?.stop(),
      setMuted: (m) => voiceRef.current?.setMuted(m),
      setLevel: (l) => voiceRef.current?.setLevel(l),
    }),
    [confirm],
  );

  const select = useCallback((s: string | null) => setSelected(s), []);
  const setTab = useCallback((x: TabId) => writeHash(x), []);

  // Esc closes the drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ctx = useMemo<UiCtx>(() => ({ selected, select, tab, setTab, voice, voiceApi, ranking: initialRanking }), [selected, select, tab, setTab, voice, voiceApi, initialRanking]);

  return (
    <Ui.Provider value={ctx}>
      <div className="cc-grid-bg min-h-screen flex flex-col text-[15px] leading-normal">
        <TopBar />
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-5 pb-10 space-y-4 pt-3">
          <AlertBanner />
          <div className="grid gap-4 lg:grid-cols-12">
            <section className="lg:col-span-7 min-w-0" aria-label={t.lv.map}>
              <MapPanel />
            </section>
            <section className="lg:col-span-5 min-w-0" aria-label={t.lv.alerts}>
              <AlertFeed />
            </section>
          </div>
          <GhatStrip />
          <Tabs initialRanking={initialRanking} initialLb={initialLb} initialAlloc={initialAlloc} />
        </main>
        <footer className="border-t border-rule text-xs text-muted px-5 py-3">
          {t.lv.simNote} {t.footer}
        </footer>
        <Drawer />
      </div>
    </Ui.Provider>
  );
}
