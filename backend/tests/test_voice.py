"""Voice layer tests: speech normalisation, ElevenLabs call (mocked), no-key 503, disk cache. No network."""
from __future__ import annotations

import sys
from pathlib import Path

import httpx
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.voice import tts  # noqa: E402
from ghatwatch.voice.normalize import hi_int, hi_number, normalize  # noqa: E402

MP3 = b"ID3\x03\x00fake-mp3-bytes"


@pytest.fixture(autouse=True)
def env(monkeypatch, tmp_path):
    for k in ("ELEVENLABS_API_KEY", "ELEVENLABS_MODEL", "ELEVENLABS_VOICE_ID_HI", "ELEVENLABS_VOICE_ID_EN",
              "GHATWATCH_VOICE"):
        monkeypatch.delenv(k, raising=False)
    monkeypatch.setenv("GHATWATCH_VOICE_CACHE", str(tmp_path / "cache"))
    yield


class FakeResp:
    def __init__(self, status=200, content=MP3, ctype="audio/mpeg"):
        self.status_code, self.content, self.headers = status, content, {"content-type": ctype}


def _mock_post(monkeypatch, resp=None, exc=None):
    calls = []

    def post(url, **kw):
        calls.append((url, kw))
        if exc:
            raise exc
        return resp or FakeResp()

    monkeypatch.setattr(tts.httpx, "post", post)
    return calls


# ---- normalisation -------------------------------------------------------------------------------

def test_hindi_numbers():
    assert hi_int(0) == "शून्य"
    assert hi_int(28) == "अट्ठाईस"
    assert hi_int(100) == "सौ"
    assert hi_int(2026) == "दो हज़ार छब्बीस"
    assert hi_int(150000) == "एक लाख पचास हज़ार"
    assert hi_number("0.6") == "शून्य दशमलव छह"
    assert hi_number("6.25") == "छह दशमलव दो पांच"


def test_units_and_abbreviations_hindi():
    out = normalize("DO 0.6 mg/l, BOD 3 mg/L, pH 7.2", "hi")
    assert "घुलित ऑक्सीजन शून्य दशमलव छह मिलीग्राम प्रति लीटर" in out
    assert "बी.ओ.डी. तीन मिलीग्राम प्रति लीटर" in out
    assert "पी.एच. सात दशमलव दो" in out
    assert "mg" not in out and "DO" not in out


def test_units_and_abbreviations_english():
    out = normalize("DO 0.6 mg/l, BOD 3 mg/l, pH 6.5-8.5", "en")
    assert out == "dissolved oxygen 0.6 milligrams per litre, B.O.D. 3 milligrams per litre, P.H. 6.5 to 8.5"


def test_pages_both_languages():
    assert normalize("Source: report p. 28", "en") == "Source: report page 28"
    assert normalize("स्रोत: रिपोर्ट पृष्ठ 28", "hi") == "स्रोत: रिपोर्ट पृष्ठ अट्ठाईस"
    assert normalize("रिपोर्ट p. 3", "hi") == "रिपोर्ट पृष्ठ तीन"


def test_symbols_and_markdown_stripped():
    out = normalize("⛔ **तुरंत** · शाहपुरा घाट | → [विसर्जन रोकें](http://x.y) ⚠️ ✦ ≡ ⏱", "hi")
    for ch in "⛔⚠✦≡⏱→|·*[]()":
        assert ch not in out
    assert "http" not in out
    assert out == "तुरंत, शाहपुरा घाट, विसर्जन रोकें"


def test_comparisons_dates_percent():
    assert normalize("BOD < 3 mg/l", "en") == "B.O.D. less than 3 milligrams per litre"
    assert normalize("BOD < 3", "hi") == "बी.ओ.डी. तीन से कम"
    assert normalize("20 Oct 2026", "hi") == "बीस अक्टूबर दो हज़ार छब्बीस"
    assert normalize("45%", "en") == "45 percent"


def test_em_dash_is_a_pause_not_a_range():
    assert normalize("ऑक्सीजन 0 — 5 या ज़्यादा चाहिए", "hi") == "ऑक्सीजन शून्य, पांच या ज़्यादा चाहिए"
    assert normalize("pH 6.5–8.5", "hi") == "पी.एच. छह दशमलव पांच से आठ दशमलव पांच"


def test_length_cap_at_sentence():
    text = "यह एक वाक्य है। " * 200
    out = normalize(text, "hi", limit=100)
    assert len(out) <= 100 and out.endswith("।")


# ---- TTS -----------------------------------------------------------------------------------------

def test_no_key_raises_and_endpoint_503(monkeypatch):
    calls = _mock_post(monkeypatch)
    with pytest.raises(tts.VoiceUnavailable) as e:
        tts.synthesize("घाट सुरक्षित है", "hi")
    assert e.value.reason == "no_key" and not calls

    from fastapi.testclient import TestClient
    from ghatwatch.voice.api import router
    from fastapi import FastAPI
    app = FastAPI()
    app.include_router(router)
    c = TestClient(app)
    r = c.post("/api/voice/tts", json={"text": "घाट सुरक्षित है", "lang": "hi"})
    assert r.status_code == 503
    assert r.json()["fallback"] == "browser" and r.json()["reason"] == "no_key"
    assert r.json()["spoken"] == "घाट सुरक्षित है"
    s = c.get("/api/voice/status").json()
    assert s["elevenlabs"] is False and all(isinstance(v, bool) for v in s.values())
    assert c.post("/api/voice/tts", json={"text": "x", "lang": "fr"}).status_code == 422


def test_mocked_call_then_cache_hit(monkeypatch):
    monkeypatch.setenv("ELEVENLABS_API_KEY", "test-key-not-real")
    calls = _mock_post(monkeypatch)
    audio, src, spoken = tts.synthesize("DO 0.6 mg/l", "hi")
    assert audio == MP3 and src == "elevenlabs"
    assert spoken == "घुलित ऑक्सीजन शून्य दशमलव छह मिलीग्राम प्रति लीटर"
    url, kw = calls[0]
    assert url == f"https://api.elevenlabs.io/v1/text-to-speech/{tts.DEFAULT_VOICE_HI}"
    assert kw["headers"]["xi-api-key"] == "test-key-not-real"
    assert kw["json"]["model_id"] == tts.DEFAULT_MODEL and kw["json"]["text"] == spoken
    assert "language_code" not in kw["json"]  # multilingual_v2 rejects it
    assert kw["timeout"] <= 10.0

    audio2, src2, _ = tts.synthesize("DO 0.6 mg/l", "hi")
    assert audio2 == MP3 and src2 == "cache" and len(calls) == 1

    # cache hit still works with the key removed (repeat taps offline)
    monkeypatch.delenv("ELEVENLABS_API_KEY")
    assert tts.synthesize("DO 0.6 mg/l", "hi")[1] == "cache"


def test_flash_model_sends_language_code_and_endpoint_audio(monkeypatch):
    monkeypatch.setenv("ELEVENLABS_API_KEY", "k")
    monkeypatch.setenv("ELEVENLABS_MODEL", "eleven_flash_v2_5")
    calls = _mock_post(monkeypatch)
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    from ghatwatch.voice.api import router
    app = FastAPI()
    app.include_router(router)
    r = TestClient(app).post("/api/voice/tts", json={"text": "Ghat is safe", "lang": "en"})
    assert r.status_code == 200 and r.headers["content-type"] == "audio/mpeg" and r.content == MP3
    assert r.headers["x-voice-source"] == "elevenlabs"
    assert calls[0][1]["json"]["language_code"] == "en"
    assert tts.DEFAULT_VOICE_EN in calls[0][0]


@pytest.mark.parametrize("resp,exc,reason", [
    (FakeResp(status=401, content=b'{"detail":"bad key"}', ctype="application/json"), None, "upstream_error"),
    (FakeResp(status=200, content=b"", ctype="audio/mpeg"), None, "bad_audio"),
    (None, httpx.ReadTimeout("slow"), "timeout"),
    (None, httpx.ConnectError("down"), "network"),
])
def test_upstream_failures_give_503(monkeypatch, resp, exc, reason):
    monkeypatch.setenv("ELEVENLABS_API_KEY", "secret-123")
    _mock_post(monkeypatch, resp=resp, exc=exc)
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    from ghatwatch.voice.api import router
    app = FastAPI()
    app.include_router(router)
    r = TestClient(app).post("/api/voice/tts", json={"text": "घाट", "lang": "hi"})
    assert r.status_code == 503 and r.json()["reason"] == reason
    assert "secret-123" not in r.text


def test_main_app_mounts_voice_router():
    from ghatwatch.api import app
    paths = {getattr(r, "path", "") for r in app.routes}
    assert "/api/voice/tts" in paths and "/api/voice/status" in paths
