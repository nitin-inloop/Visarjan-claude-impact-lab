"""ElevenLabs text-to-speech with an on-disk cache. No key -> no call (the frontend uses browser speech).

Env (all optional; read from the environment or backend/.env, which is gitignored):
  ELEVENLABS_API_KEY       secret; stays on the server, never sent to the browser
  ELEVENLABS_MODEL         default eleven_multilingual_v2 (most natural, stable Hindi; cache hides its latency)
                           eleven_flash_v2_5 is the low-latency / half-price alternative
  ELEVENLABS_VOICE_ID_HI   default H6QPv2pQZDcGqLwDTIJQ ("Kanika", Hindi voice-library voice)
  ELEVENLABS_VOICE_ID_EN   default JBFqnCBsd6RMkjVDRZzb ("George", premade, calm)
  GHATWATCH_VOICE=0        switches the ElevenLabs call off
  GHATWATCH_VOICE_CACHE    cache directory (default backend/voice_cache/, gitignored)
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
from typing import Optional

import httpx

from .normalize import normalize

_ENV_KEYS = ("ELEVENLABS_API_KEY", "ELEVENLABS_MODEL", "ELEVENLABS_VOICE_ID_HI", "ELEVENLABS_VOICE_ID_EN",
             "GHATWATCH_VOICE", "GHATWATCH_VOICE_CACHE")
_BACKEND = Path(__file__).resolve().parents[2]


def _load_dotenv() -> None:
    """Same rule as ai/llm.py: backend/.env fills only keys not already in the environment."""
    p = _BACKEND / ".env"
    if not p.exists():
        return
    try:
        for line in p.read_text(encoding="utf-8").splitlines():
            k, sep, v = line.strip().partition("=")
            k, v = k.strip().removeprefix("export ").strip(), v.strip().strip('"').strip("'")
            if sep and k in _ENV_KEYS and v and not os.environ.get(k):
                os.environ[k] = v
    except OSError:
        pass


_load_dotenv()

API_URL = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
DEFAULT_MODEL = "eleven_multilingual_v2"
DEFAULT_VOICE_HI = "H6QPv2pQZDcGqLwDTIJQ"
DEFAULT_VOICE_EN = "JBFqnCBsd6RMkjVDRZzb"
OUTPUT_FORMAT = "mp3_44100_64"  # small files, allowed on every tier
TIMEOUT_S = 10.0
MAX_INPUT_CHARS = 4000  # request body cap; spoken text is capped again after normalisation


class VoiceUnavailable(Exception):
    """Raised when ElevenLabs cannot be used; .reason is a short machine word (no secrets)."""

    def __init__(self, reason: str, status: Optional[int] = None, spoken: Optional[str] = None):
        super().__init__(reason)
        self.reason = reason
        self.status = status
        self.spoken = spoken  # normalised text, so the browser fallback reads it naturally too


def _key() -> str:
    return os.environ.get("ELEVENLABS_API_KEY", "").strip()


def configured() -> bool:
    return bool(_key()) and os.environ.get("GHATWATCH_VOICE", "1") != "0"


def model() -> str:
    return os.environ.get("ELEVENLABS_MODEL") or DEFAULT_MODEL


def voice_id(lang: str) -> str:
    if lang == "hi":
        return os.environ.get("ELEVENLABS_VOICE_ID_HI") or DEFAULT_VOICE_HI
    return os.environ.get("ELEVENLABS_VOICE_ID_EN") or DEFAULT_VOICE_EN


def cache_dir() -> Path:
    return Path(os.environ.get("GHATWATCH_VOICE_CACHE") or (_BACKEND / "voice_cache"))


def status() -> dict:
    """Booleans only."""
    return {"elevenlabs": configured(), "cache": cache_dir().exists()}


def cache_key(text: str, lang: str, voice: str, mdl: str) -> str:
    raw = json.dumps([text, lang, voice, mdl, OUTPUT_FORMAT], ensure_ascii=False)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _voice_settings(lang: str) -> dict:
    # Slightly slower and steadier for Hindi listeners with reading difficulty.
    return {"stability": 0.6, "similarity_boost": 0.75, "style": 0.0, "use_speaker_boost": True,
            "speed": 0.92 if lang == "hi" else 0.97}


def _call(text: str, lang: str, voice: str, mdl: str) -> bytes:
    body: dict = {"text": text, "model_id": mdl, "voice_settings": _voice_settings(lang)}
    if not mdl.startswith("eleven_multilingual"):  # multilingual_v2 rejects language_code; flash/v3 accept it
        body["language_code"] = "hi" if lang == "hi" else "en"
    try:
        r = httpx.post(API_URL.format(voice_id=voice), params={"output_format": OUTPUT_FORMAT},
                       headers={"xi-api-key": _key(), "Content-Type": "application/json", "Accept": "audio/mpeg"},
                       json=body, timeout=TIMEOUT_S)
    except httpx.TimeoutException as e:
        raise VoiceUnavailable("timeout") from e
    except httpx.HTTPError as e:
        raise VoiceUnavailable("network") from e
    if r.status_code != 200:
        raise VoiceUnavailable("upstream_error", r.status_code)
    if not r.content or not r.headers.get("content-type", "audio").startswith("audio"):
        raise VoiceUnavailable("bad_audio", r.status_code)
    return r.content


def synthesize(text: str, lang: str = "hi") -> tuple[bytes, str, str]:
    """-> (mp3 bytes, source 'cache'|'elevenlabs', spoken text). Raises VoiceUnavailable."""
    lang = "hi" if lang == "hi" else "en"
    spoken = normalize(text[:MAX_INPUT_CHARS], lang)
    if not spoken:
        raise VoiceUnavailable("empty")
    voice, mdl = voice_id(lang), model()
    path = cache_dir() / f"{cache_key(spoken, lang, voice, mdl)}.mp3"
    if path.exists() and path.stat().st_size > 0:
        return path.read_bytes(), "cache", spoken
    if not configured():
        raise VoiceUnavailable("no_key", spoken=spoken)
    try:
        audio = _call(spoken, lang, voice, mdl)
    except VoiceUnavailable as e:
        e.spoken = spoken
        raise
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        tmp = path.with_suffix(".tmp")
        tmp.write_bytes(audio)
        tmp.replace(path)
    except OSError:
        pass  # cache is best-effort
    return audio, "elevenlabs", spoken
