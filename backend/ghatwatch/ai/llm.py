"""Provider clients for the AI layer. No key -> no call; every call is timed and may fail to None.

Text chain: Cerebras (fast, OpenAI-compatible) -> Claude -> caller's template.
Documents: Claude only (PDF document block / image block).

Env (all optional; nothing here is required for the app to work):
  CEREBRAS_API_KEY, CEREBRAS_MODEL (default gpt-oss-120b)
  ANTHROPIC_API_KEY, GHATWATCH_CLAUDE_MODEL (default claude-opus-5-5)
  GHATWATCH_AI=0 switches every AI call off (template text only).
"""
from __future__ import annotations

import os
import time
from typing import Any, Callable

import httpx

_ENV_KEYS = ("CEREBRAS_API_KEY", "CEREBRAS_MODEL", "ANTHROPIC_API_KEY", "GHATWATCH_CLAUDE_MODEL", "GHATWATCH_AI",
             "GHATWATCH_LLM_POLISH")


def _load_dotenv() -> None:
    """Read the AI keys from backend/.env (gitignored) if they are not already in the environment."""
    from pathlib import Path
    p = Path(__file__).resolve().parents[2] / ".env"
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

CEREBRAS_URL = "https://api.cerebras.ai/v1/chat/completions"
CEREBRAS_DEFAULT_MODEL = "gpt-oss-120b"
CLAUDE_DEFAULT_MODEL = "claude-opus-5-5"
TEXT_TIMEOUT_S = 8.0
DOC_TIMEOUT_S = 30.0


def _off() -> bool:
    return os.environ.get("GHATWATCH_AI", "1") == "0"


def cerebras_configured() -> bool:
    return bool(os.environ.get("CEREBRAS_API_KEY")) and not _off()


def claude_configured() -> bool:
    if _off() or not os.environ.get("ANTHROPIC_API_KEY"):
        return False
    try:
        import anthropic  # noqa: F401
    except ImportError:
        return False
    return True


def cerebras_model() -> str:
    return os.environ.get("CEREBRAS_MODEL") or CEREBRAS_DEFAULT_MODEL


def claude_model() -> str:
    return os.environ.get("GHATWATCH_CLAUDE_MODEL") or CLAUDE_DEFAULT_MODEL


def status() -> dict:
    """Booleans only: never echo keys or models' secrets."""
    return {"cerebras": cerebras_configured(), "claude": claude_configured(),
            "documents": claude_configured(), "text": cerebras_configured() or claude_configured()}


def _ms(t0: float) -> int:
    return int(round((time.perf_counter() - t0) * 1000))


# --------------------------------------------------------------------------- Cerebras
def cerebras_chat(system: str, user: str, max_tokens: int = 700, timeout: float = TEXT_TIMEOUT_S) -> dict | None:
    """One chat completion. Returns {text, provider, model, latency_ms} or None."""
    if not cerebras_configured():
        return None
    t0 = time.perf_counter()
    try:
        r = httpx.post(CEREBRAS_URL, timeout=timeout,
                       headers={"Authorization": f"Bearer {os.environ['CEREBRAS_API_KEY']}",
                                "Content-Type": "application/json"},
                       json={"model": cerebras_model(), "max_tokens": max_tokens, "temperature": 0.2,
                             "messages": [{"role": "system", "content": system},
                                          {"role": "user", "content": user}]})
        r.raise_for_status()
        text = (r.json()["choices"][0]["message"].get("content") or "").strip()
    except Exception:
        return None
    if not text:
        return None
    return {"text": text, "provider": "cerebras", "model": cerebras_model(), "latency_ms": _ms(t0)}


# --------------------------------------------------------------------------- Claude
def _claude_client(timeout: float):
    import anthropic
    return anthropic.Anthropic(timeout=timeout, max_retries=1)


def _claude_text(msg: Any) -> str:
    return "".join(getattr(b, "text", "") or "" for b in msg.content if getattr(b, "type", "") == "text").strip()


def claude_chat(system: str, user: str, max_tokens: int = 2000, timeout: float = TEXT_TIMEOUT_S * 2) -> dict | None:
    if not claude_configured():
        return None
    t0 = time.perf_counter()
    try:
        msg = _claude_client(timeout).messages.create(
            model=claude_model(), max_tokens=max_tokens, system=system,
            output_config={"effort": "low"},
            messages=[{"role": "user", "content": user}])
        if getattr(msg, "stop_reason", None) == "refusal":
            return None
        text = _claude_text(msg)
    except Exception:
        return None
    if not text:
        return None
    return {"text": text, "provider": "claude", "model": claude_model(), "latency_ms": _ms(t0)}


def claude_json(content: list[dict], schema: dict, system: str, max_tokens: int = 16000,
                timeout: float = DOC_TIMEOUT_S) -> dict | None:
    """Document/image + instruction -> JSON matching `schema` (structured outputs). Returns
    {data, provider, model, latency_ms} or None."""
    if not claude_configured():
        return None
    import json
    t0 = time.perf_counter()
    try:
        msg = _claude_client(timeout).messages.create(
            model=claude_model(), max_tokens=max_tokens, system=system,
            output_config={"effort": "medium", "format": {"type": "json_schema", "schema": schema}},
            messages=[{"role": "user", "content": content}])
        if getattr(msg, "stop_reason", None) in ("refusal", "max_tokens"):
            return None
        data = json.loads(_claude_text(msg))
    except Exception:
        return None
    return {"data": data, "provider": "claude", "model": claude_model(), "latency_ms": _ms(t0)}


# --------------------------------------------------------------------------- text chain
def write_text(system: str, user: str, accept: Callable[[str], bool], max_tokens: int = 700) -> dict | None:
    """Cerebras -> Claude. The first output that passes `accept` (the caller's guards) wins.
    Returns {text, provider, model, latency_ms, tried: [..]} or None (caller uses its template)."""
    tried = []
    for fn in (cerebras_chat, claude_chat):
        res = fn(system, user, max_tokens=max_tokens)
        if res is None:
            continue
        ok = False
        try:
            ok = bool(accept(res["text"]))
        except Exception:
            ok = False
        tried.append({"provider": res["provider"], "latency_ms": res["latency_ms"], "passed_guards": ok})
        if ok:
            return res | {"tried": tried}
    return None
