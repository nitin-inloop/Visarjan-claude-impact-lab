"""Resources, dispatch orders, arrivals and CQL-based suggestions (PLAN-LIVE v2 amendment I)."""
from __future__ import annotations

import json
import logging
import math
from pathlib import Path

import numpy as np

from ..data import ARTIFACTS_DIR, SITE_BY_SLUG
from ..rl.simulator import ACTIONS, COSTS, bod_tier, do_tier, encode
from .processor import SHORT_NAME
from .schema import bi
from .simulator import GHAT_TYPE, MIN_MS, Simulator, travel_min

log = logging.getLogger("ghatwatch.live")

KIND_ACTION = {"aerator": 3, "crew": 2, "test_team": 1}
KIND_NAME = {"aerator": bi("Aerator", "एरेटर"), "crew": bi("Cleaning crew", "सफ़ाई दल"),
             "test_team": bi("Test team", "जाँच दल"), "diversion": bi("Diversion squad", "डायवर्जन दल")}
POOL = {"aerator": 3, "crew": 3, "test_team": 2, "diversion": 1}
WORK_MIN = {"crew": 120, "test_team": 120}  # aerator / diversion stay until moved
EXP = bi("experimental (CQL, simulator-trained)", "प्रायोगिक (CQL, सिम्युलेटर-प्रशिक्षित)")
EXP_RULE = bi("experimental (rule-based)", "प्रायोगिक (नियम-आधारित)")


def load_q() -> tuple[np.ndarray | None, str]:
    p = ARTIFACTS_DIR / "rl" / "cql_report.json"
    try:
        rep = json.loads(p.read_text(encoding="utf-8"))
        if rep.get("check_cql_ge_do_nothing"):
            return np.asarray(rep["Q"], float), "cql"
        return None, "heuristic (CQL do-nothing check failed)"
    except Exception as e:  # noqa: BLE001
        return None, f"heuristic (no CQL report: {e!r})"


def heuristic_q(s_do: int, s_bod: int, known: int, a: int) -> float:
    if a == 1:
        return 3.0 if not known else 0.0
    if a == 3:
        return 1.5 * s_do
    if a == 2:
        return 1.0 * s_bod
    return 0.0


class Dispatcher:
    def __init__(self, sim: Simulator, emit, log_dir: Path | None):
        self.sim = sim
        self.emit = emit  # emit(kind, ghat, text) -> event
        self.log_dir = log_dir
        self.Q, self.q_source = load_q()
        self.n_orders = 0
        self.resources: list[dict] = []
        for kind, n in POOL.items():
            for i in range(1, n + 1):
                nm = KIND_NAME[kind]
                label = bi(f"{nm['en']} {i}", f"{nm['hi']} {i}") if n > 1 else nm
                self.resources.append({"id": f"{kind}-{i}", "kind": kind, "name": label, "at": "depot",
                                       "status": "idle", "target": None, "eta_min": None, "since": sim.t_ms,
                                       "_arrive": None, "_until": None, "_order": None})

    # ------------------------------------------------------------ helpers
    def public(self) -> list[dict]:
        return [{k: v for k, v in r.items() if not k.startswith("_")} for r in self.resources]

    def on_site(self, slug: str) -> list[str]:
        return [r["id"] for r in self.resources if r["at"] == slug and r["status"] == "working"]

    def assigned(self, slug: str, kind: str) -> int:
        return sum(1 for r in self.resources if r["kind"] == kind and r["status"] != "idle"
                   and (r["target"] == slug or (r["at"] == slug and r["status"] == "working")))

    def nearest_idle(self, kind: str, ghat: str) -> tuple[dict | None, float | None]:
        idle = [r for r in self.resources if r["kind"] == kind and r["status"] == "idle"]
        if not idle:
            return None, None
        r = min(idle, key=lambda r: travel_min(r["at"], ghat))
        return r, travel_min(r["at"], ghat)

    def _log(self, row: dict) -> None:
        if self.log_dir is None:
            return
        try:
            self.log_dir.mkdir(parents=True, exist_ok=True)
            with (self.log_dir / "actions.jsonl").open("a", encoding="utf-8") as f:
                f.write(json.dumps(row, ensure_ascii=False) + "\n")
        except Exception as e:  # noqa: BLE001
            log.warning("action log failed: %r", e)

    # ------------------------------------------------------------ dispatch
    def dispatch(self, kind: str, ghat: str, instant: bool = False) -> dict:
        if kind not in POOL:
            return {"ok": False, "error": bi(f"Unknown resource kind '{kind}'.", f"अज्ञात संसाधन '{kind}'।")}
        if ghat not in SITE_BY_SLUG:
            return {"ok": False, "error": bi(f"Unknown ghat '{ghat}'.", f"अज्ञात घाट '{ghat}'।")}
        r, tm = self.nearest_idle(kind, ghat)
        nm, gn = KIND_NAME[kind], SHORT_NAME[ghat]
        if r is None:
            return {"ok": False, "error": bi(f"No idle {nm['en'].lower()} available.", f"कोई खाली {nm['hi']} उपलब्ध नहीं।")}
        self.n_orders += 1
        oid = f"O{self.n_orders:03d}"
        if instant:
            tm = 0.0
        t = self.sim.t_ms
        r.update(status="en_route", target=ghat, eta_min=tm, since=t,
                 _arrive=self.sim.minute + int(math.ceil(tm)), _order=oid)
        order = {"id": oid, "resource_id": r["id"], "kind": kind, "ghat": ghat, "eta_min": tm}
        self.emit("dispatch", ghat, bi(f"{r['name']['en']} dispatched to {gn['en']}, ETA {tm:.0f} min.",
                                       f"{r['name']['hi']} {gn['hi']} भेजा गया, अनुमानित {tm:.0f} मिनट।"))
        self._log({"t": t, "type": "dispatch", **order})
        if instant:
            self.tick()
        return {"ok": True, "order": order}

    def tick(self) -> None:
        """Advance resource states at the current sim minute; apply arrivals to the simulator."""
        m, t = self.sim.minute, self.sim.t_ms
        for r in self.resources:
            if r["status"] == "en_route":
                left = r["_arrive"] - m
                r["eta_min"] = max(0, left)
                if left <= 0:
                    g = r["target"]
                    r.update(status="working", at=g, target=None, eta_min=None, since=t,
                             _until=(m + WORK_MIN[r["kind"]]) if r["kind"] in WORK_MIN else None)
                    self.sim.apply(g, r["kind"])
                    gn = SHORT_NAME[g]
                    self.emit("arrival", g, bi(f"{r['name']['en']} arrived at {gn['en']}.",
                                               f"{r['name']['hi']} {gn['hi']} पहुँचा।"))
                    eff = {"aerator": bi("aeration started (reaeration +3 per day)", "वातन शुरू (पुनर्वातन +3 प्रति दिन)"),
                           "crew": bi("cleaning: organic input halved for 2 h, suspended solids cut 40%",
                                      "सफ़ाई: 2 घंटे तक जैविक भार आधा, निलंबित ठोस 40% कम"),
                           "test_team": bi("field readings for 2 h; lab BOD in 30 min",
                                           "2 घंटे तक फ़ील्ड रीडिंग; लैब बीओडी 30 मिनट में"),
                           "diversion": bi("70% of arrivals diverted to the nearest kund",
                                           "70% मूर्तियाँ निकटतम कुंड की ओर मोड़ी गईं")}[r["kind"]]
                    self.emit("effect", g, bi(f"{gn['en']}: {eff['en']}.", f"{gn['hi']}: {eff['hi']}।"))
                    self._log({"t": t, "type": "arrival", "order": r["_order"], "resource_id": r["id"],
                               "kind": r["kind"], "ghat": g})
            elif r["status"] == "working" and r["_until"] is not None and m >= r["_until"]:
                r.update(status="idle", since=t, _until=None)

    # ------------------------------------------------------------ suggestions
    def state_of(self, d: dict) -> tuple[int, tuple[int, int, int, int]]:
        w = d["windows"]["DO"]
        known = 1 if d["sensor"] == "live" else 0
        sd = do_tier(w["mean_5"]) if (w and known) else 1
        bod = d["values"]["BOD"]
        sb = bod_tier(bod) if bod is not None else 1
        sl = w["slope_per_h"] if w else None
        trend = 1 if sl is None else (2 if sl <= -0.5 else 0 if sl >= 0.5 else 1)
        return encode(sd, sb, known, trend), (sd, sb, known, trend)

    def suggestions(self, derived: dict[str, dict], idols_per_h: dict[str, float]) -> list[dict]:
        items = []
        for slug, d in derived.items():
            s, (sd, sb, known, trend) = self.state_of(d)
            gn = SHORT_NAME[slug]
            for kind, a in KIND_ACTION.items():
                if kind == "test_team" and known == 1:
                    continue
                cap = 2 if kind == "aerator" else 1
                if self.assigned(slug, kind) >= cap:
                    continue
                if self.Q is not None:
                    gain = float(self.Q[s, a] - self.Q[s, 0])
                else:
                    gain = heuristic_q(sd, sb, known, a)
                if gain <= 0:
                    continue
                r, tm = self.nearest_idle(kind, slug)
                if r is None:
                    continue
                score = gain / COSTS[a] - 0.02 * tm
                do = d["values"]["DO"] if known else None
                state_en = (f"DO {do:.1f}" if do is not None else "DO unknown") + \
                           (f", BOD {d['values']['BOD']:.1f}" if d["values"]["BOD"] is not None else ", BOD not measured")
                state_hi = (f"घुलित ऑक्सीजन {do:.1f}" if do is not None else "घुलित ऑक्सीजन अज्ञात") + \
                           (f", बीओडी {d['values']['BOD']:.1f}" if d["values"]["BOD"] is not None else ", बीओडी मापा नहीं गया")
                nm = KIND_NAME[kind]
                exp = EXP if self.Q is not None else EXP_RULE
                reason = bi(f"{gn['en']}: {state_en}. Send {nm['en'].lower()} ({r['id']}, {tm:.0f} min away); "
                            f"Q gain {gain:.2f} per cost {COSTS[a]:.0f}. {exp['en']}",
                            f"{gn['hi']}: {state_hi}। {nm['hi']} भेजें ({r['id']}, {tm:.0f} मिनट दूर); "
                            f"Q लाभ {gain:.2f}, लागत {COSTS[a]:.0f}। {exp['hi']}")
                items.append({"id": f"S-{kind}-{slug}", "kind": kind, "ghat": slug, "q_gain": round(gain, 3),
                              "travel_min": tm, "rank_score": round(float(score), 3), "reason": reason, "experimental": True})
            # diversion: rule-based, NGT-ban lake ghats with arrivals
            if (SITE_BY_SLUG[slug].ngt_lake_ban and GHAT_TYPE[slug] == "lake_ghat"
                    and idols_per_h.get(slug, 0) > 0 and self.assigned(slug, "diversion") == 0):
                r, tm = self.nearest_idle("diversion", slug)
                if r is not None:
                    k = idols_per_h[slug]
                    items.append({"id": f"S-diversion-{slug}", "kind": "diversion", "ghat": slug, "q_gain": 0.0,
                                  "travel_min": tm, "rank_score": round(k / 100.0 - 0.02 * tm, 3),
                                  "reason": bi(f"{gn['en']}: {k:.0f} idols in the last hour at a lake ghat under the NGT ban; "
                                               f"divert arrivals to the nearest kund ({tm:.0f} min away). {EXP_RULE['en']}",
                                               f"{gn['hi']}: एनजीटी प्रतिबंध वाली झील पर पिछले घंटे {k:.0f} मूर्तियाँ; "
                                               f"निकटतम कुंड की ओर मोड़ें ({tm:.0f} मिनट दूर)। {EXP_RULE['hi']}"),
                                  "experimental": True})
        items.sort(key=lambda x: -x["rank_score"])
        return items[:5]
