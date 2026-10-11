"""LiveEngine: owns simulator, processor, alerts, dispatch, sitrep; tick loop; snapshot (PLAN-LIVE v2 L)."""
from __future__ import annotations

import asyncio
import json
import logging
import os
from collections import deque
from pathlib import Path

from ..data import ARTIFACTS_DIR, BACKEND_DIR, SITE_BY_SLUG, SITES
from . import commands as C
from . import sitrep as S
from .alerts import AlertManager
from .dispatch import KIND_NAME, Dispatcher
from .processor import SHORT_NAME, Processor
from .schema import SERIES_KEYS, SPEEDS, bi
from .simulator import (HORIZON_MIN, MIN_MS, SCENARIOS, T_START_MS, Simulator, initial_conditions)

log = logging.getLogger("ghatwatch.live")
LOG_DIR = BACKEND_DIR / "live_logs"
SERIES_MIN = 120
SURGE_RATIO, SURGE_MIN = 1.5, 30
SITREP_MIN_S, SITREP_MAX_MIN = 60, 5


def _static_outlook() -> dict[str, float | None]:
    p = ARTIFACTS_DIR / "ranking.json"
    try:
        rk = json.loads(p.read_text(encoding="utf-8"))
        return {g["slug"]: (g.get("forecast") or {}).get("p_breach") for g in rk["ghats"]}
    except Exception:  # noqa: BLE001
        return {}


class LiveEngine:
    def __init__(self, seed: int = 42, scenario: str = "ban_enforced", log_dir: Path | None = LOG_DIR,
                 tick_s: float | None = None, speed: int = 180, running: bool = True):
        self.seed = seed
        self.log_dir = log_dir
        self.tick_s = float(tick_s if tick_s is not None else os.environ.get("GHATWATCH_LIVE_TICK_S", "1.0"))
        self.speed = speed
        self.running = running
        self.seq = 0
        self.p_breach = _static_outlook()
        self.slugs = [s.slug for s in SITES]
        self._task: asyncio.Task | None = None
        self.subscribers: set[asyncio.Queue] = set()
        self.reset(scenario)

    # ------------------------------------------------------------ lifecycle
    def reset(self, scenario: str | None = None) -> None:
        scenario = scenario or getattr(self, "scenario", "ban_enforced")
        if scenario not in SCENARIOS:
            raise ValueError(f"unknown scenario '{scenario}'")
        self.scenario = scenario
        self.sim = Simulator(scenario, seed=self.seed)
        self.proc = Processor(self.slugs)
        self.alerts = AlertManager()
        self.n_events = 0
        self.events: deque = deque(maxlen=200)
        self.pending_events: list[dict] = []
        self.pending_upserts: dict[str, dict] = {}
        self.pending_resolved: list[str] = []
        self.acc_s = 0.0
        self.dispatch = Dispatcher(self.sim, self._emit, self.log_dir)
        for kind, ghat in SCENARIOS[scenario]["params"].get("preposition", []):
            self.dispatch.dispatch(kind, ghat, instant=True)
        for slug, p, t, v in self.sim.warmup(30):
            self.proc.ingest(slug, p, t, v)
        self.proc.drain_points()
        self.derived = {s: self.proc.derive(s, self.sim.t_ms) for s in self.slugs}
        for s in self.slugs:
            ups, _ = self.alerts.evaluate(s, self.derived[s], self._extra(s), self.sim.t_ms,
                                          initial_conditions()[s]["source"], baseline=True)
        self.pending_upserts.clear()
        self.suggestions = self.dispatch.suggestions(self.derived, {s: self.idols_per_h(s) for s in self.slugs})
        self.suggestions_version = 1
        self.sitrep_version = 0
        self._sitrep: dict | None = None
        self._sitrep_t = -10**15
        self._sitrep_sig = None
        self._update_sitrep(force=True)
        self.seq += 2  # a seq gap tells connected clients to refetch the snapshot
        self._emit("control", None, bi(f"Simulation reset: {SCENARIOS[scenario]['label']['en']}.",
                                       f"सिमुलेशन रीसेट: {SCENARIOS[scenario]['label']['hi']}।"))

    def ensure_started(self) -> None:
        """Start the tick loop if an event loop is running and the loop is not yet started."""
        try:
            loop = asyncio.get_running_loop()
        except RuntimeError:
            return
        if self._task is None or self._task.done():
            self._task = loop.create_task(self._loop())

    async def stop(self) -> None:
        if self._task is not None:
            self._task.cancel()
            try:
                await self._task
            except (asyncio.CancelledError, Exception):  # noqa: BLE001
                pass
            self._task = None
        self.subscribers.clear()

    async def _loop(self) -> None:
        while True:
            await asyncio.sleep(self.tick_s)
            try:
                msg = self.tick()
                self._broadcast(msg)
            except Exception:  # noqa: BLE001
                log.exception("live tick failed")

    def _broadcast(self, msg: dict) -> None:
        for q in list(self.subscribers):
            if q.full():
                try:
                    q.get_nowait()  # drop oldest; the client sees a seq gap and refetches
                except asyncio.QueueEmpty:
                    pass
            q.put_nowait(msg)

    def subscribe(self) -> asyncio.Queue:
        q: asyncio.Queue = asyncio.Queue(maxsize=20)
        self.subscribers.add(q)
        return q

    def unsubscribe(self, q: asyncio.Queue) -> None:
        self.subscribers.discard(q)

    # ------------------------------------------------------------ events
    def _emit(self, kind: str, ghat: str | None, text: dict) -> dict:
        self.n_events += 1
        ev = {"id": f"E{self.n_events:05d}", "t": self.sim.t_ms, "kind": kind, "ghat": ghat, "text": text}
        self.events.append(ev)
        self.pending_events.append(ev)
        return ev

    # ------------------------------------------------------------ simulation
    def idols_per_h(self, slug: str) -> float:
        m = self.sim.minute
        return float(sum(n for mm, n in self.sim.g[slug].arrivals if mm >= m - 60))

    def _extra(self, slug: str) -> dict:
        k = self.idols_per_h(slug)
        p = self.sim.params
        mean_h = p["idols_total"] * p["shares"].get(slug, 0) / (HORIZON_MIN / 60)
        return {"idols_per_h": k, "surge": k >= SURGE_MIN and k >= SURGE_RATIO * mean_h,
                "lake_ban": SITE_BY_SLUG[slug].ngt_lake_ban and slug != "bairagarh"}

    def step(self, n_substeps: int) -> None:
        """Advance n 60-s sub-steps synchronously (tests call this directly)."""
        for _ in range(int(n_substeps)):
            if self.sim.done():
                if self.running:
                    self.running = False
                    self._emit("info", None, bi("End of the simulated night (06:00). Paused.",
                                                "सिम्युलेटेड रात समाप्त (06:00)। रोका गया।"))
                break
            for slug, p, t, v in self.sim.step():
                self.proc.ingest(slug, p, t, v)
            self.dispatch.tick()
            t = self.sim.t_ms
            for s in self.slugs:
                d = self.proc.derive(s, t)
                self.derived[s] = d
                ups, res = self.alerts.evaluate(s, d, self._extra(s), t, initial_conditions()[s]["source"])
                for a in ups:
                    self.pending_upserts[a["id"]] = a
                for rid in res:
                    self.pending_upserts.pop(rid, None)
                    self.pending_resolved.append(rid)
        new = self.dispatch.suggestions(self.derived, {s: self.idols_per_h(s) for s in self.slugs})
        if [x["id"] for x in new] != [x["id"] for x in self.suggestions]:
            self.suggestions_version += 1
        self.suggestions = new
        self._update_sitrep()

    def tick(self) -> dict:
        """One real-time tick: advance by speed x tick_s sim seconds, then build the WS message."""
        if self.running:
            self.acc_s += self.speed * self.tick_s
            n = int(self.acc_s // 60)
            self.acc_s -= n * 60
            if n:
                self.step(n)
        self.seq += 1
        msg = {"type": "tick", "seq": self.seq, "t": self.sim.t_ms, "speed": self.speed, "running": self.running,
               "scenario": self.scenario_block(),
               "ghats": {s: self.ghat_live(s, series=False) for s in self.slugs},
               "points": self.proc.drain_points(), "resources": self.dispatch.public(),
               "alerts_upsert": list(self.pending_upserts.values()), "alerts_resolved": self.pending_resolved,
               "events": self.pending_events, "suggestions_version": self.suggestions_version,
               "sitrep_version": self.sitrep_version}
        self.pending_upserts, self.pending_resolved, self.pending_events = {}, [], []
        return msg

    # ------------------------------------------------------------ views
    def scenario_block(self) -> dict:
        sc = SCENARIOS[self.scenario]
        return {"name": self.scenario, "label": sc["label"], "params": sc["params"]}

    def ghat_live(self, slug: str, series: bool = False) -> dict:
        site, d = SITE_BY_SLUG[slug], self.derived[slug]
        out = {"slug": slug, "name": {"en": site.name_en, "hi": site.name_hi}, "water_body": site.water_body,
               "ngt_lake_ban": site.ngt_lake_ban, "sensor": d["sensor"], "last_seen": d["last_seen"],
               "live_tier": d["live_tier"], "live_score": d["live_score"], "partial": d["partial"],
               "tier_note": d["tier_note"], "breach": d["breach"], "values": d["values"], "as_of": d["as_of"],
               "windows": d["windows"], "eta": d["eta"], "p_breach": self.p_breach.get(slug),
               "anomaly": d["anomaly"], "idols_per_h": self.idols_per_h(slug),
               "idols_total": self.sim.g[slug].idols_total, "resources_on_site": self.dispatch.on_site(slug),
               "open_alerts": self.alerts.ids_for(slug), "initial_source": initial_conditions()[slug]["source"],
               "simulated": True}
        if series:
            out["series"] = {k: self.proc.series(slug, k, self.sim.t_ms, SERIES_MIN) for k in SERIES_KEYS}
        return out

    def snapshot(self) -> dict:
        return {"seq": self.seq, "t": self.sim.t_ms, "t_start": T_START_MS, "speed": self.speed,
                "running": self.running, "scenario": self.scenario_block(), "source": "sim",
                "ghats": {s: self.ghat_live(s, series=True) for s in self.slugs},
                "resources": self.dispatch.public(), "alerts_open": self.alerts.open_list(),
                "events_recent": list(self.events)[-50:], "suggestions": self.suggestions,
                "suggestions_version": self.suggestions_version, "sitrep_version": self.sitrep_version,
                "stats": {"idols_total": sum(g.idols_total for g in self.sim.g.values()),
                          "idols_by_ghat": {s: g.idols_total for s, g in self.sim.g.items()},
                          "readings_total": self.proc.readings_total, "rejected_total": self.proc.rejected_total}}

    def lite(self) -> dict:
        return {"seq": self.seq, "t": self.sim.t_ms, "speed": self.speed, "running": self.running,
                "scenario": self.scenario_block()}

    def _state_for_sitrep(self) -> dict:
        return {"t": self.sim.t_ms, "speed": self.speed, "scenario": self.scenario_block(),
                "ghats": {s: self.ghat_live(s) for s in self.slugs}, "alerts_open": self.alerts.open_list(),
                "resources": self.dispatch.public(),
                "stats": {"idols_total": sum(g.idols_total for g in self.sim.g.values())}}

    def _update_sitrep(self, force: bool = False) -> None:
        t = self.sim.t_ms
        sig = (tuple(sorted((a["id"], a["severity"]) for a in self.alerts.open.values())),
               tuple(self.derived[s]["live_tier"] for s in self.slugs),
               tuple((r["id"], r["status"]) for r in self.dispatch.resources))
        elapsed = t - self._sitrep_t
        if force or (elapsed >= SITREP_MIN_S * 1000 and (sig != self._sitrep_sig or elapsed >= SITREP_MAX_MIN * MIN_MS)):
            self._sitrep = S.build(self._state_for_sitrep())
            self._sitrep_t, self._sitrep_sig = t, sig
            self.sitrep_version += 1

    def sitrep(self) -> dict:
        return {"version": self.sitrep_version, "t": self._sitrep_t, **self._sitrep}

    # ------------------------------------------------------------ control / commands
    def control(self, action: str, value=None) -> dict:
        if action == "start":
            if self.sim.done():
                raise ValueError("simulation finished; reset first")
            self.running = True
        elif action == "pause":
            self.running = False
        elif action == "reset":
            self.reset(value if isinstance(value, str) and value in SCENARIOS else None)
            return self.lite()
        elif action == "speed":
            v = int(value)
            if v not in SPEEDS:
                raise ValueError(f"speed must be one of {list(SPEEDS)}")
            self.speed = v
        elif action == "scenario":
            if value not in SCENARIOS:
                raise ValueError(f"unknown scenario '{value}'")
            self.reset(value)
            return self.lite()
        else:
            raise ValueError(f"unknown action '{action}'")
        self._emit("control", None, bi(f"Control: {action}{'' if value is None else ' ' + str(value)}.",
                                       f"नियंत्रण: {action}{'' if value is None else ' ' + str(value)}।"))
        return self.lite()

    def ack(self, alert_id: str) -> bool:
        a = self.alerts.ack(alert_id)
        if a:
            self.pending_upserts[a["id"]] = a
        return a is not None

    def history(self, slug: str, param: str, minutes: int) -> list:
        return self.proc.series(slug, param, self.sim.t_ms, minutes)

    def command(self, text: str, lang: str = "en") -> dict:
        intent, args = C.parse(text)
        none = {"type": "none"}
        if intent == "status_ghat":
            g, n = self.ghat_live(args["ghat"]), SHORT_NAME[args["ghat"]]
            do = g["windows"]["DO"]["mean_5"] if g["windows"]["DO"] else None
            if g["live_tier"] == "no_data":
                sp = bi(f"{n['en']}: no live data. {g['tier_note']['en']}", f"{n['hi']}: लाइव डेटा नहीं। {g['tier_note']['hi']}")
            else:
                bod = g["values"]["BOD"]
                sp = bi(f"{n['en']}: {S.TIER_EN[g['live_tier']].lower()}. Dissolved oxygen {do:.1f}. "
                        + (f"BOD {bod:.1f}." if bod is not None else "BOD awaiting lab."),
                        f"{n['hi']}: {S.TIER_HI[g['live_tier']]}। घुलित ऑक्सीजन {do:.1f}। "
                        + (f"बीओडी {bod:.1f}।" if bod is not None else "बीओडी लैब परिणाम की प्रतीक्षा।"))
            return {"intent": intent, "args": args, "ok": True, "speak": sp,
                    "ui_action": {"type": "select_ghat", "value": args["ghat"]}}
        if intent == "status_all":
            worst = sorted(self.slugs, key=lambda s: S.TIER_ORDER[self.derived[s]["live_tier"]])
            en = "; ".join(f"{SHORT_NAME[s]['en']} {S.TIER_EN[self.derived[s]['live_tier']].lower()}" for s in worst)
            hi = "; ".join(f"{SHORT_NAME[s]['hi']} {S.TIER_HI[self.derived[s]['live_tier']]}" for s in worst)
            return {"intent": intent, "args": args, "ok": True, "speak": bi(en + ".", hi + "।"), "ui_action": none}
        if intent == "read_sitrep":
            return {"intent": intent, "args": args, "ok": True, "speak": self.sitrep()["speak"],
                    "ui_action": {"type": "open_tab", "value": "sitrep"}}
        if intent == "send":
            if not args.get("ghat"):
                return {"intent": intent, "args": args, "ok": False, "speak": bi("Which ghat?", "कौन सा घाट?"), "ui_action": none}
            r = self.dispatch.dispatch(args["kind"], args["ghat"])
            if r["ok"]:
                o, nm, n = r["order"], KIND_NAME[args["kind"]], SHORT_NAME[args["ghat"]]
                sp = bi(f"{nm['en']} sent to {n['en']}, about {o['eta_min']:.0f} minutes.",
                        f"{nm['hi']} {n['hi']} भेजा गया, लगभग {o['eta_min']:.0f} मिनट।")
            else:
                sp = r["error"]
            return {"intent": intent, "args": args, "ok": r["ok"], "speak": sp,
                    "ui_action": {"type": "open_tab", "value": "dispatch"}}
        if intent == "control":
            self.control(args["action"])
            sp = bi("Paused.", "रोका गया।") if args["action"] == "pause" else bi("Running.", "चालू।")
            return {"intent": intent, "args": args, "ok": True, "speak": sp,
                    "ui_action": {"type": "control", "value": args["action"]}}
        if intent == "help":
            return {"intent": intent, "args": args, "ok": True,
                    "speak": bi("Say: status Shahpura, status all, read sitrep, send test team to Bairagarh, pause, or start.",
                                "बोलें: शाहपुरा की स्थिति, सभी की स्थिति, रिपोर्ट पढ़ो, बैरागढ़ जाँच दल भेजो, रोको या शुरू करो।"),
                    "ui_action": none}
        return {"intent": "unknown", "args": {}, "ok": False,
                "speak": bi("Sorry, I did not understand. Say help.", "माफ़ कीजिए, समझ नहीं आया। मदद बोलें।"),
                "ui_action": none}


_ENGINE: LiveEngine | None = None


def get_engine() -> LiveEngine:
    global _ENGINE
    if _ENGINE is None:
        _ENGINE = LiveEngine()
    return _ENGINE
