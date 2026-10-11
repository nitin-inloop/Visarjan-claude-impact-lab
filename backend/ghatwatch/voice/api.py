"""Voice REST router (full paths under /api/voice).

GET  /api/voice/status          -> {"elevenlabs": bool, "cache": bool}   (booleans only, never the key)
POST /api/voice/tts {text,lang} -> audio/mpeg; 503 JSON {"ok": false, "fallback": "browser", "reason": ...}
                                   when there is no key or ElevenLabs fails; "spoken" is the normalised text
                                   for the browser voice to read
"""
from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel, Field

from . import tts

router = APIRouter(prefix="/api/voice", tags=["voice"])


class TTSIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=tts.MAX_INPUT_CHARS)
    lang: str = Field("hi", pattern="^(hi|en)$")


@router.get("/status")
def voice_status() -> dict:
    return tts.status()


@router.post("/tts")
def voice_tts(body: TTSIn):
    try:
        audio, source, _spoken = tts.synthesize(body.text, body.lang)
    except tts.VoiceUnavailable as e:
        return JSONResponse(status_code=503, content={"ok": False, "fallback": "browser", "reason": e.reason,
                                                      "upstream_status": e.status, "spoken": e.spoken})
    return Response(content=audio, media_type="audio/mpeg",
                    headers={"X-Voice-Source": source, "Cache-Control": "private, max-age=86400"})
