"""OCR bridge: detects backend/.ocr-venv + paddleocr and runs ocr_worker.py there (subprocess, 300 s timeout).

The API process never imports paddle; any import or runtime failure means OCR is unavailable.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import threading
import time
from pathlib import Path

from ..data import BACKEND_DIR, intake_dir
from .schema import bi

VENV = BACKEND_DIR / ".ocr-venv"
WORKER = Path(__file__).with_name("ocr_worker.py")
TIMEOUT_S = 300
_CACHE: dict = {}
_LOCK = threading.Lock()

HOW_TO_ENABLE = bi(
    "Create an isolated environment and install PaddleOCR there (the main backend is not touched): "
    "python -m venv backend/.ocr-venv && backend/.ocr-venv/Scripts/python -m pip install paddlepaddle paddleocr "
    "pypdfium2 — then restart the API. The first OCR run downloads the PP-OCR models (network needed).",
    "एक अलग वातावरण बनाकर उसमें PaddleOCR इंस्टॉल करें (मुख्य बैकएंड नहीं बदलता): "
    "python -m venv backend/.ocr-venv && backend/.ocr-venv/Scripts/python -m pip install paddlepaddle paddleocr "
    "pypdfium2 — फिर API दोबारा शुरू करें। पहली OCR बार PP-OCR मॉडल डाउनलोड करती है (नेटवर्क चाहिए)।")


def venv_python() -> Path | None:
    for p in (VENV / "Scripts" / "python.exe", VENV / "bin" / "python", VENV / "Scripts" / "python"):
        if p.exists():
            return p
    return None


def _probe(code: str, timeout: int = 90) -> tuple[bool, str]:
    py = venv_python()
    if py is None:
        return False, "venv not found"
    try:
        r = subprocess.run([str(py), "-c", code], capture_output=True, timeout=timeout,
                           creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
        out = r.stdout.decode("utf-8", errors="replace").strip()
        return r.returncode == 0, out or r.stderr.decode("utf-8", errors="replace").strip()[-300:]
    except Exception as e:
        return False, repr(e)


def _site_packages() -> Path | None:
    for sp in (VENV / "Lib" / "site-packages", *sorted((VENV / "lib").glob("python3*/site-packages"))):
        if sp.exists():
            return sp
    return None


def status(refresh: bool = False) -> dict:
    """{available, version, render}: instant filesystem check of the venv (no paddle import in the API).
    A runtime failure of the worker marks OCR unavailable until refresh."""
    with _LOCK:
        if not refresh and _CACHE.get("t") and time.time() - _CACHE["t"] < 600:
            return _CACHE["v"]
        if os.environ.get("GHATWATCH_OCR_DISABLE"):
            v = {"available": False, "version": None, "render": False, "detail": "disabled by GHATWATCH_OCR_DISABLE"}
        else:
            sp = _site_packages()
            py = venv_python()
            has = (lambda name: sp is not None and (sp / name / "__init__.py").exists())
            ok = py is not None and has("paddleocr") and has("paddle")
            render = py is not None and has("pypdfium2")
            ver = None
            if ok:
                di = sorted(sp.glob("paddleocr-*.dist-info"))
                ver = di[-1].name.split("-")[1] if di else "3.x"
            v = {"available": bool(ok), "version": ver, "render": bool(render),
                 "detail": None if ok else ("venv not found" if py is None else "paddleocr not installed in venv")}
        _CACHE.update(t=time.time(), v=v)
        return v


def mark_failed(detail: str) -> None:
    with _LOCK:
        v = dict(_CACHE.get("v") or {})
        if detail and ("ModuleNotFoundError" in detail or "ImportError" in detail):
            v.update(available=False, detail=detail)
            _CACHE.update(t=time.time(), v=v)


def capabilities() -> dict:
    st = status()
    measured = None
    p = intake_dir() / "ocr_measurement.json"
    if p.exists():
        try:
            measured = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            measured = None
    ocr = {"available": st["available"], "engine": "PaddleOCR 3.x" if st["available"] else None,
           "venv": "backend/.ocr-venv", "how_to_enable": HOW_TO_ENABLE}
    if st["available"]:
        ocr["version"] = st["version"]
    if measured:
        ocr["measured"] = measured
    return {"text_pdf": True, "ocr": ocr, "max_upload_mb": 25, "page_images": st["render"]}


def run_worker(src: Path, out_json: Path, pages: str | None = None, render_only: bool = False,
               timeout: int = TIMEOUT_S) -> dict:
    """Run ocr_worker.py in the venv. Returns the worker JSON (with 'error' set on any failure)."""
    py = venv_python()
    if py is None:
        return {"error": "OCR venv not found", "pages": []}
    cmd = [str(py), str(WORKER), str(src), str(out_json)]
    if pages:
        cmd += ["--pages", pages]
    if render_only:
        cmd.append("--render-only")
    t0 = time.perf_counter()
    env = dict(os.environ, PYTHONIOENCODING="utf-8", DISABLE_MODEL_SOURCE_CHECK="True",
               PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK="True")
    env.pop("PYTHONPATH", None)
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=timeout, env=env,
                           creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
    except subprocess.TimeoutExpired:
        return {"error": f"OCR timed out after {timeout} s", "pages": [], "elapsed_s": round(time.perf_counter() - t0, 1)}
    except Exception as e:
        return {"error": f"OCR could not start: {e!r}", "pages": []}
    if not out_json.exists():
        tail = r.stderr.decode("utf-8", errors="replace")[-400:]
        return {"error": f"OCR worker exited {r.returncode} without output: {tail}", "pages": [],
                "elapsed_s": round(time.perf_counter() - t0, 1)}
    try:
        res = json.loads(out_json.read_text(encoding="utf-8"))
    except Exception as e:
        return {"error": f"bad OCR output: {e!r}", "pages": []}
    res.setdefault("elapsed_s", round(time.perf_counter() - t0, 1))
    res["wall_s"] = round(time.perf_counter() - t0, 1)
    return res


if __name__ == "__main__":  # quick manual probe
    print(json.dumps(status(refresh=True)), file=sys.stdout)
