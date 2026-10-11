// Listen (text-to-speech) player: one audio at a time across the whole app.
// 1. POST /api/voice/tts {text, lang} -> audio/mpeg from ElevenLabs (the key stays on the server).
// 2. On 503 (no key / ElevenLabs error) or API down -> browser speechSynthesis.
// Starting any new playback stops the old one. Use with useSyncExternalStore(subscribe, getState).

import { API_URL } from "./api";
import { splitSentences } from "./voice";
import type { Lang } from "./types";

export type Phase = "idle" | "loading" | "playing";
export type VoiceSource = "elevenlabs" | "browser";

export interface TtsState {
  /** which ListenButton owns the current playback */
  activeId: string | null;
  /** last button that played (keeps its source label after playback ends) */
  lastId: string | null;
  phase: Phase;
  /** source of the clip playing now (or the last one) */
  source: VoiceSource | null;
  /** browser fallback in Hindi mode, but this device has no Hindi voice */
  hindiMissing: boolean;
  /** "segment i of n" for read-all */
  index: number;
  total: number;
}

const IDLE: TtsState = { activeId: null, lastId: null, phase: "idle", source: null, hindiMissing: false, index: 0, total: 0 };
let state: TtsState = IDLE;
const listeners = new Set<() => void>();

let run = 0; // increments on every play/stop: older runs see a stale token and quit
let audio: HTMLAudioElement | null = null;
let abort: AbortController | null = null;
let pending: (() => void) | null = null; // resolves the clip promise when stopped mid-play
let apiDownUntil = 0; // after a network failure, skip the API for a short while
const urlCache = new Map<string, string>(); // `${lang}|${text}` -> object URL (instant repeat taps)

function set(p: Partial<TtsState>) {
  state = { ...state, ...p };
  listeners.forEach((f) => f());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export const getState = (): TtsState => state;
export const getServerState = (): TtsState => IDLE;

function hardStop() {
  abort?.abort();
  abort = null;
  pending?.();
  pending = null;
  if (audio) {
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function stop() {
  run++;
  hardStop();
  set({ activeId: null, phase: "idle", index: 0, total: 0 });
}

/** Play one text or a list of texts in order. Calling again with the same id while active stops it. */
export async function play(id: string, texts: string | string[], lang: Lang): Promise<void> {
  const list = (Array.isArray(texts) ? texts : [texts]).map((t) => t.trim()).filter(Boolean);
  if (!list.length) return;
  run++;
  const my = run;
  hardStop();
  set({ activeId: id, lastId: id, phase: "loading", source: null, index: 0, total: list.length, hindiMissing: false });
  for (let i = 0; i < list.length; i++) {
    if (my !== run) return;
    set({ index: i, phase: "loading" });
    const ok = await playElevenLabs(list[i], lang, my);
    if (my !== run) return;
    if (!ok) await playBrowser(list[i], lang, my);
  }
  if (my === run) set({ activeId: null, phase: "idle", index: 0, total: 0 });
}

const spokenCache = new Map<string, string>(); // server-normalised text for the browser fallback

async function fetchClip(text: string, lang: Lang, my: number): Promise<string | null> {
  const key = `${lang}|${text}`;
  const hit = urlCache.get(key);
  if (hit) return hit;
  if (Date.now() < apiDownUntil) return null;
  abort = new AbortController();
  const timer = setTimeout(() => abort?.abort(), 15_000);
  try {
    const res = await fetch(`${API_URL}/api/voice/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
      signal: abort.signal,
    });
    if (!res.ok || !(res.headers.get("content-type") ?? "").startsWith("audio")) {
      // 503 -> browser voice; the server still sends the normalised text ("mg/l" -> "मिलीग्राम प्रति लीटर")
      const j = (await res.json().catch(() => null)) as { spoken?: string } | null;
      if (j?.spoken) spokenCache.set(key, j.spoken);
      return null;
    }
    const blob = await res.blob();
    if (my !== run || blob.size === 0) return null;
    const url = URL.createObjectURL(blob);
    urlCache.set(key, url);
    return url;
  } catch {
    if (my === run) apiDownUntil = Date.now() + 30_000; // API unreachable (not a user stop)
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function playElevenLabs(text: string, lang: Lang, my: number): Promise<boolean> {
  return fetchClip(text, lang, my).then(
    (url) =>
      new Promise<boolean>((resolve) => {
        if (!url || my !== run) return resolve(false);
        const a = new Audio(url);
        audio = a;
        pending = () => resolve(true);
        a.onended = () => resolve(true);
        a.onerror = () => resolve(false);
        a.play()
          .then(() => {
            if (my === run) set({ phase: "playing", source: "elevenlabs" });
          })
          .catch(() => resolve(false));
      }),
  );
}

function pickVoice(lang: Lang): { voice: SpeechSynthesisVoice | null; missing: boolean } {
  const voices = window.speechSynthesis.getVoices();
  if (lang === "hi") {
    const hi = voices.find((v) => v.lang.toLowerCase().startsWith("hi"));
    return { voice: hi ?? null, missing: !hi && voices.length > 0 };
  }
  const en =
    voices.find((v) => v.lang.toLowerCase().replace("_", "-") === "en-in") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
    null;
  return { voice: en, missing: false };
}

function playBrowser(text: string, lang: Lang, my: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      set({ source: "browser", hindiMissing: lang === "hi" });
      return resolve();
    }
    const synth = window.speechSynthesis;
    const { voice, missing } = pickVoice(lang);
    // Browser voices stumble on symbols too: strip the obvious ones.
    const clean = (spokenCache.get(`${lang}|${text}`) ?? text).replace(/[⛔⚠▲▽✎ℹ✦≡⏱→|·●•]/g, " ").replace(/\*\*/g, "");
    const chunks = splitSentences(clean);
    set({ phase: "playing", source: "browser", hindiMissing: missing });
    let i = 0;
    const next = () => {
      if (my !== run || i >= chunks.length) return resolve();
      const u = new SpeechSynthesisUtterance(chunks[i++]);
      u.lang = voice?.lang ?? (lang === "hi" ? "hi-IN" : "en-IN");
      if (voice) u.voice = voice;
      u.rate = lang === "hi" ? 0.9 : 0.95;
      u.onend = next;
      u.onerror = next;
      synth.speak(u);
    };
    // Chrome can swallow speak() right after cancel(); defer a tick.
    setTimeout(next, 60);
  });
}
