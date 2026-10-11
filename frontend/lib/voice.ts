// Voice out (amendment F). Create inside useEffect; call dispose() in cleanup.
// - "Enable voice" speaks a confirmation (Chrome user-activation requirement).
// - Voice picked on voiceschanged: hi* in Hindi mode, else en-IN, else en-GB/en-US.
//   No Hindi voice in Hindi mode -> English text, flag hindiMissing.
// - Sentences split < 200 chars. Priority queue: critical cancels and interrupts; max 3 queued;
//   items older than 20 s are dropped. Baseline alerts and snapshot content are never announced
//   (the caller only passes alerts that arrived in ticks; announce() also drops baseline).

import type { Alert, Bi, Severity } from "./liveTypes";
import type { Lang } from "./types";

export type AnnounceLevel = "all" | "high" | "critical" | "off";

export interface VoiceState {
  supported: boolean;
  enabled: boolean;
  muted: boolean;
  level: AnnounceLevel;
  voiceName: string | null;
  hindiMissing: boolean;
  speaking: boolean;
}

interface Item {
  chunks: string[];
  lang: string;
  voice: SpeechSynthesisVoice | null;
  critical: boolean;
  at: number;
}

const MUTE_KEY = "ghatwatch.voice.muted";
const LEVEL_KEY = "ghatwatch.voice.level";
const MAX_QUEUE = 3;
const MAX_AGE_MS = 20_000;

export function splitSentences(text: string, max = 200): string[] {
  const parts = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (p.length < max) {
      out.push(p);
      continue;
    }
    let cur = "";
    for (const w of p.split(/(?<=[,;:])\s+|\s+/)) {
      if ((cur + " " + w).trim().length >= max) {
        if (cur) out.push(cur);
        cur = w;
      } else cur = (cur + " " + w).trim();
    }
    if (cur) out.push(cur);
  }
  return out;
}

function levelAllows(level: AnnounceLevel, sev: Severity): boolean {
  if (level === "off") return false;
  if (level === "all") return true;
  if (level === "high") return sev === "high" || sev === "critical";
  return sev === "critical";
}

export class VoiceOut {
  private synth: SpeechSynthesis | null;
  private voices: SpeechSynthesisVoice[] = [];
  private queue: Item[] = [];
  private current: Item | null = null;
  private listeners = new Set<() => void>();
  private lang: Lang = "en";
  private state: VoiceState;
  private onVoices = () => this.loadVoices();

  constructor() {
    this.synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
    let muted = false;
    let level: AnnounceLevel = "high";
    try {
      muted = localStorage.getItem(MUTE_KEY) === "1";
      const l = localStorage.getItem(LEVEL_KEY);
      if (l === "all" || l === "high" || l === "critical" || l === "off") level = l;
    } catch {
      /* ignore */
    }
    this.state = { supported: !!this.synth, enabled: false, muted, level, voiceName: null, hindiMissing: false, speaking: false };
    if (this.synth) {
      this.synth.addEventListener("voiceschanged", this.onVoices);
      this.loadVoices();
    }
  }

  dispose() {
    if (this.synth) {
      this.synth.removeEventListener("voiceschanged", this.onVoices);
      this.synth.cancel();
    }
    this.queue = [];
    this.current = null;
    this.listeners.clear();
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  getState(): VoiceState {
    return this.state;
  }

  private set(p: Partial<VoiceState>) {
    this.state = { ...this.state, ...p };
    this.listeners.forEach((f) => f());
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.refreshChoice();
  }

  private pick(lang: Lang): { voice: SpeechSynthesisVoice | null; tag: string; hindiMissing: boolean } {
    const v = this.voices;
    if (lang === "hi") {
      const hi = v.find((x) => x.lang.toLowerCase().startsWith("hi"));
      if (hi) return { voice: hi, tag: hi.lang, hindiMissing: false };
    }
    const en =
      v.find((x) => x.lang.toLowerCase().replace("_", "-") === "en-in") ??
      v.find((x) => x.lang.toLowerCase().replace("_", "-") === "en-gb") ??
      v.find((x) => x.lang.toLowerCase().replace("_", "-") === "en-us") ??
      v.find((x) => x.lang.toLowerCase().startsWith("en")) ??
      null;
    return { voice: en, tag: en?.lang ?? "en-IN", hindiMissing: lang === "hi" && v.length > 0 };
  }

  private refreshChoice() {
    const p = this.pick(this.lang);
    this.set({ voiceName: p.voice ? `${p.voice.name} (${p.voice.lang})` : null, hindiMissing: p.hindiMissing });
  }

  setLang(l: Lang) {
    this.lang = l;
    this.refreshChoice();
  }

  setMuted(m: boolean) {
    try {
      localStorage.setItem(MUTE_KEY, m ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (m && this.synth) {
      this.synth.cancel();
      this.queue = [];
      this.current = null;
    }
    this.set({ muted: m, speaking: false });
  }

  setLevel(l: AnnounceLevel) {
    try {
      localStorage.setItem(LEVEL_KEY, l);
    } catch {
      /* ignore */
    }
    this.set({ level: l });
  }

  /** Must be called from a click handler: unlocks speech in Chrome. */
  enable(confirm: Bi) {
    this.set({ enabled: true });
    this.say(confirm, { critical: true, force: true });
  }

  /** Auto-announce an alert that arrived live. */
  announce(a: Alert) {
    if (a.baseline || a.state !== "open") return;
    if (!this.state.enabled || this.state.muted) return;
    if (!levelAllows(this.state.level, a.severity)) return;
    this.say(a.speak, { critical: a.severity === "critical" });
  }

  /** Speak on user request (Speak buttons, command replies). Ignores level; respects mute unless forced. */
  say(text: Bi, opts: { critical?: boolean; force?: boolean } = {}) {
    if (!this.synth) return;
    if (this.state.muted && !opts.force) return;
    if (opts.force && !this.state.enabled) this.set({ enabled: true });
    const p = this.pick(this.lang);
    const useHi = this.lang === "hi" && !p.hindiMissing && p.voice?.lang.toLowerCase().startsWith("hi");
    const str = useHi ? text.hi : text.en;
    const item: Item = { chunks: splitSentences(str), lang: p.voice?.lang ?? (useHi ? "hi-IN" : "en-IN"), voice: p.voice, critical: !!opts.critical, at: Date.now() };
    if (!item.chunks.length) return;
    if (item.critical) {
      this.queue = [item, ...this.queue.filter((q) => q.critical)].slice(0, MAX_QUEUE);
      this.current = null;
      this.synth.cancel();
      // Chrome: speaking immediately after cancel() can be swallowed; defer a tick.
      setTimeout(() => this.next(), 60);
      return;
    }
    this.queue.push(item);
    while (this.queue.length > MAX_QUEUE) {
      const i = this.queue.findIndex((q) => !q.critical);
      this.queue.splice(i >= 0 ? i : 0, 1);
    }
    if (!this.current) this.next();
  }

  stop() {
    this.queue = [];
    this.current = null;
    this.synth?.cancel();
    this.set({ speaking: false });
  }

  private next() {
    if (!this.synth || this.current) return;
    const now = Date.now();
    this.queue = this.queue.filter((q) => now - q.at <= MAX_AGE_MS);
    const item = this.queue.shift();
    if (!item) {
      this.set({ speaking: false });
      return;
    }
    this.current = item;
    this.set({ speaking: true });
    this.speakChunk(item, 0);
  }

  private speakChunk(item: Item, i: number) {
    if (!this.synth || this.current !== item) return;
    if (i >= item.chunks.length) {
      this.current = null;
      this.next();
      return;
    }
    const u = new SpeechSynthesisUtterance(item.chunks[i]);
    u.lang = item.lang;
    if (item.voice) u.voice = item.voice;
    u.rate = 1;
    const done = () => this.speakChunk(item, i + 1);
    u.onend = done;
    u.onerror = done;
    this.synth.speak(u);
  }
}
