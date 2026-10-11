"""Ghat Watch Live tests (PLAN-LIVE v2 amendment K). Synchronous, fixed seed."""
from __future__ import annotations

import math
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ghatwatch.live import commands as C  # noqa: E402
from ghatwatch.live.alerts import AlertManager  # noqa: E402
from ghatwatch.live.engine import LiveEngine  # noqa: E402
from ghatwatch.live.processor import Processor  # noqa: E402
from ghatwatch.live.simulator import (BOD_U_RATIO, HORIZON_MIN, MIN_MS, T_START_MS, Simulator,  # noqa: E402
                                      do_sat, k1, initial_conditions)


def test_zero_arrival_steady_state_and_bounds():
    sim = Simulator(seed=7)
    start = {s: g.DO for s, g in sim.g.items()}
    for _ in range(HORIZON_MIN):
        sim.step(arrivals=False)
        for g in sim.g.values():
            assert not math.isnan(g.DO) and not math.isnan(g.BOD)
            assert 0.0 <= g.DO <= 15.0
    for s, g in sim.g.items():
        assert abs(g.DO - start[s]) <= 0.3, s


def test_kund_sags_deeper_than_dam_with_equal_inflow():
    sim = Simulator(seed=7)
    sat, kk1 = do_sat(), k1()
    for s in ("malikhedi", "hathaikheda"):  # same start DO so the comparison is fair
        g = sim.g[s]
        g.DO = g.DO0 = 6.0
        g.B_DO = -(g.k2 * (sat - 6.0) - kk1 * g.BOD / BOD_U_RATIO - g.SOD / g.depth)
    for _ in range(180):
        sim.step(inflow={"malikhedi": 1.0, "hathaikheda": 1.0})
    assert 6.0 - sim.g["malikhedi"].DO > 6.0 - sim.g["hathaikheda"].DO + 0.5


def test_calibration_beats_no_change_baseline():
    from ghatwatch.live.calibration import run_calibration
    cal = run_calibration()
    assert cal["mae"]["BOD_fitted"] < cal["mae"]["BOD_no_change_baseline"]
    assert cal["do_sign_matches"] >= 3


def test_hysteresis_one_alert():
    proc, am = Processor(["prempura"]), AlertManager()
    src = initial_conditions()["prempura"]["source"]
    opened = []
    for i in range(60):
        t = T_START_MS + i * MIN_MS
        proc.ingest("prempura", "DO", t, 4.9 if i % 2 else 5.1)
        d = proc.derive("prempura", t)
        ups, _ = am.evaluate("prempura", d, {"idols_per_h": 0, "surge": False}, t, src)
        opened += [a for a in ups if a["t_open"] == t]
    assert len(opened) == 1, [a["code"] for a in opened]
    assert opened[0]["code"] == "DO_LOW"


def test_bairagarh_no_data_and_no_leak():
    e = LiveEngine(log_dir=None)
    g = e.snapshot()["ghats"]["bairagarh"]
    assert g["sensor"] == "none" and g["live_tier"] == "no_data" and g["values"]["DO"] is None
    e.step(120)
    m = e.tick()
    assert m["ghats"]["bairagarh"]["values"]["DO"] is None
    assert not any(m["points"]["bairagarh"].values())
    assert all(v is None for v in e.snapshot()["ghats"]["bairagarh"]["values"].values())
    assert e.snapshot()["ghats"]["bairagarh"]["series"] == {"DO": [], "BOD": [], "turbidity": []}


def test_aerator_raises_do():
    a, b = Simulator(seed=3), Simulator(seed=3)
    for _ in range(240):
        a.step()
        b.step()
    a.apply("shahpura", "aerator")
    for _ in range(30):
        a.step()
        b.step()
    assert a.truth("shahpura")["DO"] > b.truth("shahpura")["DO"]


def test_commands_en_hi():
    cases = {
        "status shahpura": ("status_ghat", "shahpura"),
        "शाहपुरा की स्थिति": ("status_ghat", "shahpura"),
        "status all": ("status_all", None),
        "read sitrep": ("read_sitrep", None),
        "send test team to bairagarh": ("send", "bairagarh"),
        "बैरागढ़ जाँच दल भेजो": ("send", "bairagarh"),
        "pause": ("control", None),
        "मदद": ("help", None),
    }
    for text, (intent, ghat) in cases.items():
        got, args = C.parse(text)
        assert got == intent, text
        if ghat:
            assert args.get("ghat") == ghat, text
    assert C.parse("send test team to bairagarh")[1]["kind"] == "test_team"
    assert C.parse("शाहपुरा एरेटर भेजो")[1] == {"kind": "aerator", "ghat": "shahpura"}


def test_dispatch_test_team_reveals_bairagarh():
    e = LiveEngine(log_dir=None)
    sug = [s for s in e.suggestions if s["kind"] == "test_team"]
    assert sug and sug[0]["ghat"] in ("bairagarh", "malikhedi")
    r = e.dispatch.dispatch("test_team", "bairagarh")
    assert r["ok"] and r["order"]["eta_min"] > 10
    e.step(int(r["order"]["eta_min"]) + 3)
    g = e.ghat_live("bairagarh")
    assert g["sensor"] == "live" and g["values"]["DO"] is not None and g["values"]["DO"] < 2


def test_ws_snapshot_then_tick():
    os.environ["GHATWATCH_LIVE_TICK_S"] = "0.1"
    from fastapi.testclient import TestClient

    from ghatwatch.api import app
    from ghatwatch.live.engine import get_engine
    get_engine().tick_s = 0.1
    with TestClient(app) as c:
        with c.websocket_connect("/ws/live") as ws:
            snap = ws.receive_json()
            assert snap["type"] == "snapshot" and len(snap["state"]["ghats"]) == 7
            t0 = time.time()
            tick = ws.receive_json()
            assert tick["type"] == "tick" and time.time() - t0 < 2.0
            assert tick["ghats"]["bairagarh"]["values"]["DO"] is None
        assert c.get("/api/live/sitrep").json()["markdown"]["hi"]
        assert c.get("/api/ranking").status_code == 200
