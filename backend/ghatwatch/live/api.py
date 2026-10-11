"""Live router: REST + WebSocket (PLAN-LIVE v2 B, L). No prefix; full paths."""
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

from fastapi import APIRouter, HTTPException, Query, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..data import ARTIFACTS_DIR, SITE_BY_SLUG
from .engine import get_engine
from .schema import VALUE_KEYS
from .simulator import SCENARIOS

log = logging.getLogger("ghatwatch.live")
router = APIRouter()


class UJSON(JSONResponse):
    media_type = "application/json; charset=utf-8"

    def render(self, content: Any) -> bytes:
        return json.dumps(content, ensure_ascii=False, separators=(",", ":")).encode("utf-8")


def _eng():
    e = get_engine()
    e.ensure_started()
    return e


class ControlBody(BaseModel):
    action: str
    value: Any = None


class DispatchBody(BaseModel):
    kind: str
    ghat: str


class AckBody(BaseModel):
    alert_id: str


class CommandBody(BaseModel):
    text: str
    lang: str = "en"


@router.get("/api/live/snapshot", response_class=UJSON)
async def live_snapshot():
    return UJSON(_eng().snapshot())


@router.post("/api/live/control", response_class=UJSON)
async def live_control(body: ControlBody):
    try:
        return UJSON(_eng().control(body.action, body.value))
    except (ValueError, TypeError) as e:
        raise HTTPException(422, str(e)) from e


@router.get("/api/live/scenarios", response_class=UJSON)
async def live_scenarios():
    return UJSON([{"name": k, "label": v["label"], "params": v["params"]} for k, v in SCENARIOS.items()])


@router.post("/api/live/dispatch", response_class=UJSON)
async def live_dispatch(body: DispatchBody):
    return UJSON(_eng().dispatch.dispatch(body.kind, body.ghat))


@router.post("/api/live/ack", response_class=UJSON)
async def live_ack(body: AckBody):
    return UJSON({"ok": _eng().ack(body.alert_id)})


@router.get("/api/live/suggestions", response_class=UJSON)
async def live_suggestions():
    e = _eng()
    return UJSON({"version": e.suggestions_version, "items": e.suggestions})


@router.get("/api/live/sitrep", response_class=UJSON)
async def live_sitrep():
    return UJSON(_eng().sitrep())


@router.post("/api/live/command", response_class=UJSON)
async def live_command(body: CommandBody):
    return UJSON(_eng().command(body.text, body.lang))


@router.get("/api/live/history", response_class=UJSON)
async def live_history(slug: str = Query(...), param: str = Query("DO"), minutes: int = Query(360, ge=1, le=360)):
    if slug not in SITE_BY_SLUG or param not in VALUE_KEYS:
        raise HTTPException(404, "unknown slug or param")
    return UJSON(_eng().history(slug, param, minutes))


@router.get("/api/live/calibration", response_class=UJSON)
async def live_calibration():
    p = ARTIFACTS_DIR / "live" / "calibration.json"
    if not p.exists():
        return UJSON({"available": False})
    return UJSON(json.loads(p.read_text(encoding="utf-8")))


def _dumps(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


@router.websocket("/ws/live")
async def ws_live(ws: WebSocket):
    await ws.accept()
    e = _eng()
    q = e.subscribe()
    try:
        await ws.send_text(_dumps({"type": "snapshot", "seq": e.seq, "state": e.snapshot()}))
        while True:
            msg = await q.get()
            await ws.send_text(_dumps(msg))
    except (WebSocketDisconnect, asyncio.CancelledError):
        pass
    except Exception:  # noqa: BLE001
        log.exception("ws error")
    finally:
        e.unsubscribe(q)
