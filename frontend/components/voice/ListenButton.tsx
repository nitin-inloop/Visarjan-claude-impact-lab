"use client";

// ListenButton: big "सुनें / Listen" pill. Tap -> hear the text (ElevenLabs via the API, else browser voice).
// Tap again -> stop. Only one clip plays in the whole app. Pass a list of texts to read them in order
// (e.g. "पूरा सुनें / Read all"). A tiny label shows which voice spoke.

import { useId, useSyncExternalStore } from "react";
import { getServerState, getState, play, stop, subscribe } from "@/lib/tts";
import type { Lang } from "@/lib/types";
import "./voice.css";

const s = Object.fromEntries(
  ["btn", "lg", "sm", "icon", "on", "wave", "spin", "wrap", "src", "dot", "dotBrowser", "note"].map((k) => [k, `gwv-${k}`]),
) as Record<string, string>;

type Size = "sm" | "md" | "lg";

const WORD = {
  listen: { hi: "सुनें", en: "Listen" },
  all: { hi: "पूरा सुनें", en: "Read all" },
  stop: { hi: "रोकें", en: "Stop" },
  loading: { hi: "आवाज़ आ रही है…", en: "Getting voice…" },
  eleven: { hi: "ElevenLabs आवाज़", en: "ElevenLabs voice" },
  browser: { hi: "फ़ोन/ब्राउज़र की आवाज़", en: "Browser voice" },
  noHindi: {
    hi: "इस फ़ोन में हिंदी आवाज़ नहीं है। आवाज़ साफ़ न हो तो लिखा हुआ पढ़ें।",
    en: "This device has no Hindi voice. If it sounds wrong, read the text.",
  },
} as const;

function Speaker() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor" />
    </svg>
  );
}

export function ListenButton({
  text,
  lang,
  size = "md",
  label,
  showSource = true,
  className,
}: {
  text: string | string[];
  lang: Lang;
  size?: Size;
  /** "all" shows "पूरा सुनें / Read all"; or pass your own words */
  label?: "all" | string;
  showSource?: boolean;
  className?: string;
}) {
  const id = useId();
  const st = useSyncExternalStore(subscribe, getState, getServerState);
  const mine = st.activeId === id;
  const busy = mine && st.phase !== "idle";
  const loading = mine && st.phase === "loading";
  const word = label === "all" ? WORD.all[lang] : label ?? WORD.listen[lang];
  const empty = (Array.isArray(text) ? text.join("") : text).trim() === "";
  if (empty) return null;

  const onClick = () => (busy ? stop() : void play(id, text, lang));
  const progress = busy && st.total > 1 ? ` ${st.index + 1}/${st.total}` : "";

  return (
    <span className={`${s.wrap} no-print ${className ?? ""}`}>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={busy}
        aria-label={busy ? `${WORD.stop[lang]} (${word})` : `${word}${lang === "hi" ? " / Listen" : " / सुनें"}`}
        title={busy ? WORD.stop[lang] : word}
        className={`${s.btn} ${size === "lg" ? s.lg : size === "sm" ? s.sm : ""} ${busy ? s.on : ""}`}
      >
        <span className={s.icon}>{loading ? <span className={s.spin} style={{ borderColor: "rgba(11,79,138,.25)", borderTopColor: "#0b4f8a" }} /> : busy ? <StopIcon /> : <Speaker />}</span>
        {busy && !loading ? (
          <>
            <span className={s.wave} aria-hidden>
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              {WORD.stop[lang]}
              {progress}
            </span>
          </>
        ) : (
          <span>{loading ? WORD.loading[lang] : word}</span>
        )}
      </button>
      {showSource && st.lastId === id && st.source && (
        <span className={s.src} aria-live="polite">
          <span className={`${s.dot} ${st.source === "browser" ? s.dotBrowser : ""}`} aria-hidden />
          {st.source === "elevenlabs" ? WORD.eleven[lang] : WORD.browser[lang]}
        </span>
      )}
      {st.lastId === id && st.hindiMissing && lang === "hi" && (
        <span className={s.note} role="status">
          {WORD.noHindi.hi}
        </span>
      )}
    </span>
  );
}
