"""Job store: in memory + intake_data/jobs/<id>/job.json; uploads; accepted rows CSV (kept apart from the pack)."""
from __future__ import annotations

import csv
import json
import re
import threading
import uuid
from pathlib import Path

from ..data import USER_COLUMNS, SITE_BY_SLUG, accepted_csv, intake_dir
from .schema import now_iso


def safe_name(name: str | None) -> str:
    base = Path(name or "upload").name
    base = re.sub(r"[^A-Za-z0-9._\-]+", "_", base).strip("._") or "upload"
    return base[:120]


class Store:
    def __init__(self, root: Path) -> None:
        self.root = root
        self.lock = threading.RLock()
        self.jobs: dict[str, dict] = {}
        self._load()

    # ------------------------------------------------------------ paths
    def job_dir(self, job_id: str) -> Path:
        return self.root / "jobs" / job_id

    def upload_dir(self, job_id: str) -> Path:
        return self.root / "uploads" / job_id

    def pages_dir(self, job_id: str) -> Path:
        return self.job_dir(job_id) / "pages"

    # ------------------------------------------------------------ jobs
    def _load(self) -> None:
        jd = self.root / "jobs"
        if not jd.exists():
            return
        for p in jd.glob("*/job.json"):
            try:
                job = json.loads(p.read_text(encoding="utf-8"))
                if job.get("status") == "running":  # interrupted by a restart
                    job["status"] = "failed"
                    job["error"] = "server restarted while the job was running"
                self.jobs[job["id"]] = job
            except Exception:
                continue

    @staticmethod
    def new_id() -> str:
        return uuid.uuid4().hex[:12]

    def put(self, job: dict) -> None:
        with self.lock:
            self.jobs[job["id"]] = job
            self.save(job["id"])

    def save(self, job_id: str) -> None:
        with self.lock:
            job = self.jobs.get(job_id)
            if job is None:
                return
            d = self.job_dir(job_id)
            d.mkdir(parents=True, exist_ok=True)
            tmp = d / "job.json.tmp"
            tmp.write_text(json.dumps(job, ensure_ascii=False, indent=1, default=str), encoding="utf-8")
            tmp.replace(d / "job.json")

    def get(self, job_id: str) -> dict | None:
        with self.lock:
            return self.jobs.get(job_id)

    def snapshot(self, job_id: str) -> dict | None:
        with self.lock:
            j = self.jobs.get(job_id)
            return json.loads(json.dumps(j, default=str)) if j is not None else None

    def list(self) -> list[dict]:
        with self.lock:
            return sorted(self.jobs.values(), key=lambda j: j["created"], reverse=True)

    # ------------------------------------------------------------ accepted rows
    def accepted_keys(self, exclude_job: str | None = None) -> set[tuple]:
        out = set()
        for r in self._read_accepted():
            if exclude_job and r.get("job_id") == exclude_job:
                continue
            try:
                out.add((int(r["year"]), r["festival"], r["slug"] or None, r["phase"], r["parameter"]))
            except (TypeError, ValueError):
                continue
        return out

    def _read_accepted(self) -> list[dict]:
        p = accepted_csv()
        if not p.exists():
            return []
        with p.open("r", encoding="utf-8", newline="") as f:
            return list(csv.DictReader(f))

    def _write_accepted(self, rows: list[dict]) -> None:
        p = accepted_csv()
        p.parent.mkdir(parents=True, exist_ok=True)
        tmp = p.with_suffix(".tmp")
        with tmp.open("w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=USER_COLUMNS, extrasaction="ignore")
            w.writeheader()
            for r in rows:
                w.writerow(r)
        tmp.replace(p)

    def accept_rows(self, job: dict, rows: list[dict]) -> int:
        """Replace this job's accepted rows with `rows` (idempotent re-accept)."""
        with self.lock:
            keep = [r for r in self._read_accepted() if r.get("job_id") != job["id"]]
            ts = now_iso()
            fname = job["source"].get("file_name") or "manual entry"
            new = []
            for r in rows:
                slug = r.get("slug")
                new.append({
                    "year": r.get("year"), "festival": r.get("festival"),
                    "site": SITE_BY_SLUG[slug].csv_name if slug in SITE_BY_SLUG else (r.get("site_as_printed") or ""),
                    "slug": slug or "", "phase": r.get("phase"), "parameter": r.get("parameter"),
                    "value": "" if r.get("value") is None else r["value"],
                    "unit_assumed": r.get("unit_assumed") or "", "flag": r.get("flag") or "",
                    "value_as_printed": r.get("value_as_printed") or "",
                    "parameter_as_printed": r.get("parameter_as_printed") or "",
                    "site_as_printed": r.get("site_as_printed") or "",
                    "site_match_confidence": r.get("site_match_confidence"),
                    "source_page": "" if r.get("page") is None else r["page"],
                    "job_id": job["id"], "source_file": fname, "accepted_at": ts, "entered_by": "officer",
                    "already_in_pack": bool(r.get("already_in_pack")), "confidence": r.get("confidence"),
                })
            self._write_accepted(keep + new)
            return len(new)

    def remove_accepted(self, job_id: str) -> int:
        with self.lock:
            rows = self._read_accepted()
            keep = [r for r in rows if r.get("job_id") != job_id]
            if len(keep) != len(rows):
                self._write_accepted(keep)
            return len(rows) - len(keep)

    def accepted_groups(self) -> dict:
        rows = self._read_accepted()
        groups: dict[tuple, dict] = {}
        for r in rows:
            k = (r["job_id"], r["year"], r["festival"], r["slug"] or None, r["site_as_printed"])
            g = groups.get(k)
            if g is None:
                slug = r["slug"] or None
                g = groups[k] = {"job_id": r["job_id"], "source_file": r["source_file"],
                                 "year": int(r["year"]) if str(r["year"]).isdigit() else r["year"],
                                 "festival": r["festival"], "slug": slug,
                                 "site_name": (SITE_BY_SLUG[slug].name_en if slug in SITE_BY_SLUG
                                               else r["site_as_printed"] or r["site"]),
                                 "phases": [], "rows": 0, "accepted_at": r["accepted_at"]}
            if r["phase"] not in g["phases"]:
                g["phases"].append(r["phase"])
            g["rows"] += 1
        return {"rows": len(rows), "groups": list(groups.values())}


_STORE: Store | None = None
_STORE_LOCK = threading.Lock()


def get_store() -> Store:
    """Process-wide store rooted at data.intake_dir() (re-created if the env override changes)."""
    global _STORE
    with _STORE_LOCK:
        root = intake_dir()
        if _STORE is None or _STORE.root != root:
            _STORE = Store(root)
        return _STORE
