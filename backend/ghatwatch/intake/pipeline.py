"""The processing agents: Extractor -> Normaliser -> Validator -> Analyst -> Reporter (background thread)."""
from __future__ import annotations

import json
import threading
import time
import traceback
from pathlib import Path

from ..data import SITE_BY_SLUG, load_bhopal
from . import ocr as OCR
from .analyze import analyze
from .extract_text import extract_pages, is_text_poor, parse_pages as page_spec
from .normalize import normalize_rows
from .parse_mppcb import detect_context, parse_pages
from .report import build_report
from .schema import STANDARD_PARAMS, bi, empty_quality, new_stages, now_iso, unit_for
from .store import Store, get_store, safe_name
from .validate import validate

MAX_BYTES = 25 * 1024 * 1024


def sniff(data: bytes) -> str | None:
    if data[:5] == b"%PDF-":
        return "application/pdf"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:3] == b"\xff\xd8\xff":
        return "image/jpeg"
    return None


# ---------------------------------------------------------------- stage helpers

def _st(job: dict, key: str) -> dict:
    return next(s for s in job["stages"] if s["key"] == key)


def _log(store: Store, job: dict, key: str, en: str, hi: str) -> None:
    with store.lock:
        _st(job, key)["log"].append({"t": now_iso(), "text": bi(en, hi)})


def _begin(store: Store, job: dict, key: str) -> None:
    with store.lock:
        s = _st(job, key)
        s.update(status="running", started=now_iso(), finished=None, summary=None)
    store.save(job["id"])


def _end(store: Store, job: dict, key: str, status: str, en: str, hi: str) -> None:
    with store.lock:
        s = _st(job, key)
        s.update(status=status, finished=now_iso(), summary=bi(en, hi))
    store.save(job["id"])


def _skip_rest(store: Store, job: dict, after: str) -> None:
    keys = [s["key"] for s in job["stages"]]
    with store.lock:
        for k in keys[keys.index(after) + 1:]:
            s = _st(job, k)
            if s["status"] in ("pending", "running"):
                s.update(status="skipped", summary=bi("Skipped: an earlier stage failed.",
                                                      "छोड़ा गया: पिछला चरण विफल रहा।"))


def new_job(kind: str, context: dict, source: dict) -> dict:
    return {"id": Store.new_id(), "created": now_iso(), "kind": kind,
            "source": {"file_name": None, "mime": None, "pages": [], "bytes": None, "ocr_used": False,
                       "ocr_engine": None} | source,
            "context": {"year": context.get("year"), "festival": context.get("festival")},
            "status": "running", "stages": new_stages(), "rows": [], "issues": [], "quality": empty_quality(),
            "analysis": None, "report_available": False, "ocr": None, "error": None}


# ---------------------------------------------------------------- stages 2-5 (shared by run / rerun)

def _process(store: Store, job: dict, raw: list[dict], tables_found: int, rerun: bool = False) -> None:
    tag_en, tag_hi = (" (re-run with officer corrections)", " (अधिकारी सुधारों के साथ दोबारा)") if rerun else ("", "")
    # Normaliser
    _begin(store, job, "normalize")
    rows, nstats = normalize_rows(raw, job["context"])
    if not job["context"].get("year"):
        ys = [r["year"] for r in rows if r.get("year")]
        job["context"]["year"] = max(set(ys), key=ys.count) if ys else None
    if not job["context"].get("festival"):
        fs = [r["festival"] for r in rows if r.get("festival")]
        job["context"]["festival"] = max(set(fs), key=fs.count) if fs else None
    for r in rows:
        if r.get("slug") and r.get("site_match_confidence", 1.0) < 0.8:
            _log(store, job, "normalize", f"'{r['site_as_printed']}' → {r['slug']} (confidence "
                 f"{r['site_match_confidence']:.2f}): please confirm.",
                 f"'{r['site_as_printed']}' → {r['slug']} (भरोसा {r['site_match_confidence']:.2f}): कृपया पुष्टि करें।")
            break
    sites = sorted({(r["site_as_printed"], r["slug"]) for r in rows}, key=lambda x: str(x))
    for sp, slug in sites[:12]:
        _log(store, job, "normalize", f"Site '{sp}' → {slug or 'unmatched (kept apart)'}",
             f"स्थल '{sp}' → {slug or 'बेमेल (अलग रखा गया)'}")
    with store.lock:
        job["rows"] = rows
        job["quality"].update(nstats)
    _end(store, job, "normalize", "done",
         f"{len(rows)} rows normalised; {nstats['sites_matched']} sites matched, {nstats['sites_unmatched']} unmatched{tag_en}.",
         f"{len(rows)} पंक्तियां मानकीकृत; {nstats['sites_matched']} स्थल मिले, {nstats['sites_unmatched']} बेमेल{tag_hi}।")
    # Validator
    _begin(store, job, "validate")
    issues, q = validate(rows, store.accepted_keys(exclude_job=job["id"]))
    q["tables_found"] = tables_found or q["tables_found"]
    n_err = sum(i["level"] == "error" for i in issues)
    n_warn = sum(i["level"] == "warn" for i in issues)
    n_dup = sum(r["already_in_pack"] for r in rows)
    with store.lock:
        job["issues"] = issues
        job["quality"].update(q)
    _log(store, job, "validate", f"{n_err} errors, {n_warn} warnings, {n_dup} rows already in the official pack.",
         f"{n_err} त्रुटियां, {n_warn} चेतावनियां, {n_dup} पंक्तियां आधिकारिक डेटा में पहले से।")
    _end(store, job, "validate", "done",
         f"Quality: {q['numeric']} numeric / {q['rows']} rows, mean confidence {q['mean_confidence']:.2f}.",
         f"गुणवत्ता: {q['rows']} में से {q['numeric']} संख्यात्मक, औसत भरोसा {q['mean_confidence']:.2f}।")
    # Analyst
    _begin(store, job, "analyze")
    t0 = time.perf_counter()
    an = analyze(rows, job["id"], job["source"].get("file_name"))
    for g in an["ghats"]:
        fc = g.get("forecast")
        fct = (f"; forecast {fc['champion']} p={fc['p_breach']:.2f}" if fc and fc.get("available") else "")
        _log(store, job, "analyze", f"{g['name']['en']}: {g['before']['tier']} → {g['after']['tier']}{fct}",
             f"{g['name']['hi']}: {g['before']['tier']} → {g['after']['tier']}{fct}")
    with store.lock:
        job["analysis"] = an
    _end(store, job, "analyze", "done", an["summary"]["en"][:300] + f" ({time.perf_counter() - t0:.1f} s)",
         an["summary"]["hi"][:300])
    # Reporter
    _begin(store, job, "report")
    final = "needs_review" if job["status"] in ("running", "failed", "rejected") else job["status"]
    md = build_report(job | {"status": final})
    write_report(store, job["id"], md)
    _log(store, job, "report", f"Report written: {md['en'].count(chr(10))} lines (en), {md['hi'].count(chr(10))} lines (hi).",
         f"रिपोर्ट लिखी गई: {md['en'].count(chr(10))} पंक्तियां (अंग्रेज़ी), {md['hi'].count(chr(10))} पंक्तियां (हिंदी)।")
    with store.lock:
        job["report_available"] = True
    _end(store, job, "report", "done", "Bilingual intake report ready (markdown, en + hi).",
         "द्विभाषी इनटेक रिपोर्ट तैयार (मार्कडाउन, अंग्रेज़ी + हिंदी)।")
    with store.lock:  # status flips only after every stage record is final (pollers rely on it)
        job["status"] = final
    store.save(job["id"])


def write_report(store: Store, job_id: str, md: dict) -> None:
    d = store.job_dir(job_id)
    d.mkdir(parents=True, exist_ok=True)
    (d / "report.json").write_text(json.dumps({"markdown": md}, ensure_ascii=False), encoding="utf-8")


def read_report(store: Store, job_id: str) -> dict | None:
    p = store.job_dir(job_id) / "report.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else None


def _fail(store: Store, job: dict, key: str, en: str, hi: str) -> None:
    _log(store, job, key, en, hi)
    _end(store, job, key, "failed", en, hi)
    _skip_rest(store, job, key)
    with store.lock:
        job["status"] = "failed"
        job["error"] = en
    store.save(job["id"])


# ---------------------------------------------------------------- OCR measurement

def measure_against_pack(rows: list[dict]) -> dict | None:
    """Share of the pack's values (for the tables found) recovered exactly by this job."""
    tables = {(r["year"], r["festival"], r["slug"]) for r in rows if r.get("slug") and r.get("year")}
    if not tables:
        return None
    df = load_bhopal()
    idx = {(r["year"], r["festival"], r["slug"], r["phase"], r["parameter"]): r for r in rows if r.get("slug")}
    n = ok = 0
    for y, f, s in tables:
        sub = df[(df["year"] == y) & (df["festival"] == f) & (df["slug"] == s)]
        for p in sub.itertuples():
            n += 1
            r = idx.get((y, f, s, p.phase, p.parameter))
            if r is None:
                continue
            if p.is_numeric and r["value"] is not None and abs(float(r["value"]) - float(p.value)) < 1e-6:
                ok += 1
            elif not p.is_numeric and r["value"] is None and r["flag"] == p.flag:
                ok += 1
    return {"pack_values": n, "recovered": ok, "share": round(ok / n, 4) if n else None,
            "tables": [{"year": y, "festival": f, "slug": s} for y, f, s in sorted(tables, key=str)]}


def _apply_ocr_confidence(raw: list[dict], pages: list[dict]) -> None:
    """Per-cell confidence = min(parse confidence, OCR confidence of the box under the cell)."""
    segs = {p["page"]: p.get("lines") or [] for p in pages}
    for r in raw:
        lines = segs.get(r["page"])
        if not lines or r.get("line_no") is None or r.get("col") is None or r["line_no"] >= len(lines):
            continue
        for c0, c1, conf in lines[r["line_no"]]["segs"]:
            if c0 - 1 <= r["col"] <= c1 + 1:
                r["confidence"] = round(min(r["confidence"], float(conf)), 3)
                break


# ---------------------------------------------------------------- upload job

def _try_ai_extract(store: Store, job: dict, path: Path, mime: str, reason_en: str = "", reason_hi: str = "") -> bool:
    """Claude document extractor (ai.extract) as the FALLBACK: called only when the PDF text layer + OCR gave no
    rows, or OCR is needed (scan/photo) but not installed. True when it produced rows and the job was processed;
    False when Claude is unavailable, failed or returned nothing (the caller then fails the stage)."""
    from ..ai import extract as AI
    rows = None
    try:
        if not AI.available():
            _log(store, job, "extract", "Claude extractor fallback not available (no ANTHROPIC_API_KEY).",
                 "Claude निष्कर्षक विकल्प उपलब्ध नहीं (ANTHROPIC_API_KEY नहीं)।")
            return False
        _log(store, job, "extract", f"Falling back to the Claude extractor (ai.extract): {reason_en}".rstrip(": "),
             f"Claude निष्कर्षक (ai.extract) पर लौट रहे हैं: {reason_hi}".rstrip(": "))
        rows = AI.extract_rows(path, mime, job["context"].get("year"), job["context"].get("festival"))
        if not rows:
            _log(store, job, "extract", "Claude extractor returned nothing.", "Claude निष्कर्षक से कुछ नहीं मिला।")
    except Exception as e:  # never let the AI path break intake
        rows = None
        _log(store, job, "extract", f"Claude extractor failed ({e!r}).", f"Claude निष्कर्षक विफल ({e!r})।")
    if not rows:
        return False
    raw = [dict(r) for r in rows]
    for r in raw:
        r["year"] = r.get("year") or job["context"].get("year")
        r["festival"] = r.get("festival") or job["context"].get("festival")
        r.setdefault("confidence", 0.9)
    pages = sorted({int(r["page"]) for r in raw if r.get("page") not in (None, "")})
    tables = len({(r.get("page"), r.get("site_as_printed")) for r in raw})
    with store.lock:
        job["source"]["extractor"] = "claude"
        job["source"]["pages"] = pages or [1]
    _log(store, job, "extract", f"Extractor used: Claude (ai.extract): {len(raw)} cells from {tables} table(s) on "
         f"page(s) {', '.join(map(str, pages)) or '?'}; every cell keeps its page for checking.",
         f"उपयोग किया गया निष्कर्षक: Claude (ai.extract): {tables} तालिका से {len(raw)} कोष्ठ, पृष्ठ "
         f"{', '.join(map(str, pages)) or '?'}; हर कोष्ठ का पृष्ठ जांच के लिए दर्ज है।")
    if mime != "application/pdf":
        _save_image_png(store, job["id"], path)
    _end(store, job, "extract", "done", f"{tables} tables, {len(raw)} cells extracted by Claude.",
         f"Claude द्वारा {tables} तालिकाएं, {len(raw)} कोष्ठ निकाले गए।")
    _process(store, job, raw, tables)
    store.save(job["id"])
    return True


def run_upload(job_id: str, path: Path, pages_spec: str | None, force_ocr: bool) -> None:
    store = get_store()
    job = store.get(job_id)
    try:
        _begin(store, job, "extract")
        mime = job["source"]["mime"]
        pages: list[dict] = []
        tables = 0
        raw: list[dict] = []
        ocr_needed = force_ocr
        if mime is None:
            _fail(store, job, "extract", "Not a PDF, PNG or JPEG file; nothing could be read.",
                  "यह PDF, PNG या JPEG फ़ाइल नहीं है; कुछ भी पढ़ा नहीं जा सका।")
            return
        if mime == "application/pdf":
            try:
                from .extract_text import page_count
                n = page_count(path)
                sel = page_spec(pages_spec, n) if pages_spec else list(range(1, n + 1))
            except ValueError as e:
                _fail(store, job, "extract", f"Could not read the PDF: {e}", f"PDF पढ़ी नहीं जा सकी: {e}")
                return
            if not sel:
                _fail(store, job, "extract", f"No valid pages in '{pages_spec}' (document has {n}).",
                      f"'{pages_spec}' में कोई मान्य पृष्ठ नहीं (दस्तावेज़ में {n})।")
                return
            with store.lock:
                job["source"]["pages"] = sel
            if not force_ocr:
                pages, info = extract_pages(path, sel)
                _log(store, job, "extract", f"Text layer read with {info['method']}: {len(sel)} pages, {info['chars']} characters.",
                     f"टेक्स्ट परत {info['method']} से पढ़ी: {len(sel)} पृष्ठ, {info['chars']} अक्षर।")
                if is_text_poor(pages):
                    ocr_needed = True
                    _log(store, job, "extract", "Little or no text layer: the pages look scanned; trying OCR.",
                         "टेक्स्ट परत बहुत कम: पृष्ठ स्कैन किए लगते हैं; OCR आज़मा रहे हैं।")
                else:
                    threading.Thread(target=_render_pages, args=(job_id, path, pages_spec), daemon=True).start()
        else:
            ocr_needed = True
            with store.lock:
                job["source"]["pages"] = [1]
            _save_image_png(store, job_id, path)
        if ocr_needed:
            st = OCR.status()
            if not st["available"]:
                if _try_ai_extract(store, job, path, mime, "OCR is needed (scan/photo) but PaddleOCR is not installed.",
                                   "OCR चाहिए (स्कैन/फ़ोटो) पर PaddleOCR इंस्टॉल नहीं है।"):
                    return
                _fail(store, job, "extract", "OCR is needed for this file but PaddleOCR is not installed. "
                      + OCR.HOW_TO_ENABLE["en"], "इस फ़ाइल के लिए OCR चाहिए पर PaddleOCR इंस्टॉल नहीं है। "
                      + OCR.HOW_TO_ENABLE["hi"])
                return
            sel_pages = job["source"]["pages"] if mime == "application/pdf" else [None]
            _log(store, job, "extract", f"Running PaddleOCR {st.get('version') or '3.x'} in backend/.ocr-venv on "
                 f"{len(sel_pages)} page(s); CPU OCR takes minutes per page (timeout {OCR.TIMEOUT_S} s per page)…",
                 f"backend/.ocr-venv में PaddleOCR {st.get('version') or '3.x'} {len(sel_pages)} पृष्ठ पर चल रहा है; "
                 f"CPU पर प्रति पृष्ठ कुछ मिनट लगते हैं (प्रति पृष्ठ सीमा {OCR.TIMEOUT_S} सेकंड)…")
            out_dir = store.pages_dir(job_id)
            res = {"pages": [], "elapsed_s": 0.0, "wall_s": 0.0}
            for i, pno in enumerate(sel_pages, 1):
                one = OCR.run_worker(path, out_dir / f"ocr-{pno or 1}.json", str(pno) if pno else None)
                if one.get("error"):
                    OCR.mark_failed(one["error"])
                    _fail(store, job, "extract", f"OCR failed on page {pno or 1}: {one['error']}",
                          f"पृष्ठ {pno or 1} पर OCR विफल: {one['error']}")
                    return
                res["pages"] += one.get("pages") or []
                res["engine"], res["version"] = one.get("engine"), one.get("version")
                res["elapsed_s"] = round(res["elapsed_s"] + float(one.get("elapsed_s") or 0), 1)
                res["wall_s"] = round(res["wall_s"] + float(one.get("wall_s") or 0), 1)
                nw = sum(len(p.get("words") or []) for p in one.get("pages") or [])
                _log(store, job, "extract", f"OCR page {pno or 1} ({i}/{len(sel_pages)}): {nw} text boxes in "
                     f"{one.get('elapsed_s')} s.", f"OCR पृष्ठ {pno or 1} ({i}/{len(sel_pages)}): {nw} टेक्स्ट बॉक्स, "
                     f"{one.get('elapsed_s')} सेकंड।")
            pages = [{"page": p["page"], "text": p.get("text", ""), "lines": p.get("lines")} for p in res["pages"]]
            words = sum(len(p.get("words") or []) for p in res["pages"])
            confs = [w["conf"] for p in res["pages"] for w in (p.get("words") or [])]
            with store.lock:
                job["source"]["ocr_used"] = True
                job["source"]["ocr_engine"] = f"{res.get('engine') or 'PaddleOCR'} {res.get('version') or '3.x'}"
                job["ocr"] = {"engine": job["source"]["ocr_engine"], "elapsed_s": res.get("elapsed_s"),
                              "wall_s": res.get("wall_s"), "words": words,
                              "mean_conf": round(sum(confs) / len(confs), 4) if confs else None,
                              "measured_recovery": None}
            _log(store, job, "extract", f"OCR read {words} text boxes on {len(pages)} page(s) in {res.get('elapsed_s')} s "
                 f"(mean box confidence {job['ocr']['mean_conf']}).",
                 f"OCR ने {len(pages)} पृष्ठ पर {words} टेक्स्ट बॉक्स {res.get('elapsed_s')} सेकंड में पढ़े "
                 f"(औसत भरोसा {job['ocr']['mean_conf']})।")
        ctx = dict(job["context"])
        if not ctx.get("year") or not ctx.get("festival"):
            for p in pages:
                y, f = detect_context(p["text"])
                ctx["year"] = ctx.get("year") or y
                ctx["festival"] = ctx.get("festival") or f
        raw, pinfo = parse_pages(pages, {})
        # form context fills only what the page did not print
        for r in raw:
            r["year"] = r.get("year") or job["context"].get("year")
            r["festival"] = r.get("festival") or job["context"].get("festival")
        if job["source"]["ocr_used"]:
            _apply_ocr_confidence(raw, pages)
        tables = pinfo["tables"]
        for line in pinfo["log"][:20]:
            _log(store, job, "extract", f"Table {line}", f"तालिका {line}")
        if not raw:
            if _try_ai_extract(store, job, path, mime, "the text layer / OCR found no MPPCB table rows.",
                               "टेक्स्ट परत / OCR को MPPCB तालिका की कोई पंक्ति नहीं मिली।"):
                return
            _fail(store, job, "extract", "No MPPCB water-quality table (Parameter / Pre / During / After) was found "
                  "on these pages.", "इन पृष्ठों पर MPPCB जल-गुणवत्ता तालिका (पैरामीटर / पूर्व / दौरान / बाद) नहीं मिली।")
            return
        ext = "ocr" if job["source"]["ocr_used"] else "text"
        with store.lock:
            job["source"]["extractor"] = ext
        if ext == "ocr":
            _log(store, job, "extract", "Extractor used: OCR (PaddleOCR) + built-in MPPCB table parser.",
                 "उपयोग किया गया निष्कर्षक: OCR (PaddleOCR) + अंतर्निहित MPPCB तालिका पार्सर।")
        else:
            _log(store, job, "extract", "Extractor used: PDF text layer (pypdf) + built-in MPPCB table parser.",
                 "उपयोग किया गया निष्कर्षक: PDF टेक्स्ट परत (pypdf) + अंतर्निहित MPPCB तालिका पार्सर।")
        _end(store, job, "extract", "done", f"{tables} tables, {len(raw)} cells extracted ({ext}).",
             f"{tables} तालिकाएं, {len(raw)} कोष्ठ निकाले गए ({ext})।")
        _process(store, job, raw, tables)
        if job["source"]["ocr_used"]:
            m = measure_against_pack(job["rows"])
            with store.lock:
                job["ocr"]["measured_recovery"] = m["share"] if m else None
                job["ocr"]["measurement"] = m
            if m and m["share"] is not None:
                _record_measurement(job, m)
                _log(store, job, "report", f"OCR check against the data pack: {m['recovered']} of {m['pack_values']} "
                     f"values recovered ({m['share'] * 100:.1f}%).",
                     f"डेटा पैक से OCR जांच: {m['pack_values']} में से {m['recovered']} मान सही ({m['share'] * 100:.1f}%)।")
                write_report(store, job_id, build_report(job))
        store.save(job_id)
    except Exception as e:  # never leave a job running
        key = next((s["key"] for s in job["stages"] if s["status"] == "running"), "extract")
        _fail(store, job, key, f"Internal error: {e!r}", f"आंतरिक त्रुटि: {e!r}")
        traceback.print_exc()


def _record_measurement(job: dict, m: dict) -> None:
    from ..data import intake_dir
    p = intake_dir() / "ocr_measurement.json"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps({"job_id": job["id"], "file": job["source"].get("file_name"),
                             "pages": job["source"].get("pages"), "share": m["share"], "recovered": m["recovered"],
                             "pack_values": m["pack_values"], "elapsed_s": (job.get("ocr") or {}).get("elapsed_s"),
                             "measured_at": now_iso()}, ensure_ascii=False), encoding="utf-8")


def _save_image_png(store: Store, job_id: str, path: Path) -> None:
    try:
        from PIL import Image, ImageOps
        d = store.pages_dir(job_id)
        d.mkdir(parents=True, exist_ok=True)
        ImageOps.exif_transpose(Image.open(path)).convert("RGB").save(d / "page-1.png")
    except Exception:
        pass


def _render_pages(job_id: str, path: Path, pages_spec: str | None) -> None:
    """Page PNGs for the review UI (pypdfium2 in the OCR venv); silently absent if unavailable."""
    if not OCR.status().get("render"):
        return
    store = get_store()
    job = store.get(job_id)
    spec = ",".join(str(p) for p in job["source"]["pages"]) if job else pages_spec
    OCR.run_worker(path, store.pages_dir(job_id) / "render.json", spec, render_only=True, timeout=120)


def start_upload(data: bytes, file_name: str | None, year: int | None, festival: str | None,
                 pages: str | None, force_ocr: bool) -> dict:
    store = get_store()
    mime = sniff(data)
    job = new_job("upload", {"year": year, "festival": festival},
                  {"file_name": safe_name(file_name), "mime": mime, "bytes": len(data)})
    up = store.upload_dir(job["id"])
    up.mkdir(parents=True, exist_ok=True)
    path = up / safe_name(file_name)
    path.write_bytes(data)
    store.put(job)
    threading.Thread(target=run_upload, args=(job["id"], path, pages, force_ocr), daemon=True).start()
    return job


# ---------------------------------------------------------------- manual job

def manual_raw(body: dict) -> list[dict]:
    site = body.get("site") or {}
    slug = site.get("slug") if site.get("slug") in SITE_BY_SLUG else None
    name = site.get("name") or (SITE_BY_SLUG[slug].name_en if slug else "new site")
    raw = []
    for param, cell in (body.get("readings") or {}).items():
        cell = cell or {}
        v, f = cell.get("value"), cell.get("flag") or None
        if v is None and f is None:
            continue  # untouched field
        raw.append({"page": None, "site_as_printed": name, "slug": slug, "slug_locked": slug is None,
                    "site_match_confidence": 1.0 if slug else 0.0, "year": body.get("year"),
                    "festival": body.get("festival"), "phase": body.get("phase"), "parameter": param,
                    "parameter_as_printed": param, "value": v, "flag": f,
                    "value_as_printed": "" if v is None else f"{float(v):g}", "confidence": 1.0})
    return raw


def run_manual(job_id: str, body: dict) -> None:
    store = get_store()
    job = store.get(job_id)
    try:
        _begin(store, job, "extract")
        raw = manual_raw(body)
        note = body.get("source_note") or ""
        _log(store, job, "extract", f"Manual form: {len(raw)} cells entered by the officer. {note}".strip(),
             f"मैनुअल फ़ॉर्म: अधिकारी द्वारा {len(raw)} कोष्ठ दर्ज। {note}".strip())
        if not raw:
            _fail(store, job, "extract", "No readings were entered.", "कोई रीडिंग दर्ज नहीं की गई।")
            return
        _end(store, job, "extract", "done", f"{len(raw)} readings from the manual form.",
             f"मैनुअल फ़ॉर्म से {len(raw)} रीडिंग।")
        _process(store, job, raw, 1)
        store.save(job_id)
    except Exception as e:
        key = next((s["key"] for s in job["stages"] if s["status"] == "running"), "extract")
        _fail(store, job, key, f"Internal error: {e!r}", f"आंतरिक त्रुटि: {e!r}")
        traceback.print_exc()


def start_manual(body: dict) -> dict:
    store = get_store()
    src = {"file_name": None, "mime": None, "bytes": None,
           "note": body.get("source_note") or None}
    job = new_job("manual", {"year": body.get("year"), "festival": body.get("festival")}, src)
    store.put(job)
    threading.Thread(target=run_manual, args=(job["id"], body), daemon=True).start()
    return job


# ---------------------------------------------------------------- review: rerun / accept

def corrected_raw(job: dict, rows: list[dict]) -> list[dict]:
    """Officer-corrected rows -> raw rows; a changed value or site becomes confidence 1.0."""
    prev = {r["row_id"]: r for r in job.get("rows") or []}
    raw = []
    for r in rows:
        p = prev.get(r.get("row_id"))
        conf = r.get("confidence", 1.0)
        site_conf = r.get("site_match_confidence", 1.0)
        if p is not None:
            if (r.get("value"), r.get("flag")) != (p.get("value"), p.get("flag")):
                conf = 1.0
            if r.get("slug") != p.get("slug"):
                site_conf = 1.0
        raw.append({"row_id": r.get("row_id"), "page": r.get("page"), "site_as_printed": r.get("site_as_printed") or "",
                    "slug": r.get("slug"), "slug_locked": not r.get("slug"), "site_match_confidence": site_conf,
                    "year": r.get("year"), "festival": r.get("festival"), "phase": r.get("phase"),
                    "parameter": r.get("parameter"), "parameter_as_printed": r.get("parameter_as_printed"),
                    "value": r.get("value"), "flag": r.get("flag"), "value_as_printed": r.get("value_as_printed"),
                    "confidence": conf})
    return raw


def rerun(job_id: str, rows: list[dict]) -> dict:
    store = get_store()
    job = store.get(job_id)
    raw = corrected_raw(job, rows)
    with store.lock:
        for k in ("normalize", "validate", "analyze", "report"):
            s = _st(job, k)
            s.update(status="pending", started=None, finished=None, summary=None)
        if job["status"] == "failed":
            job["status"] = "running"
    try:
        _process(store, job, raw, job["quality"].get("tables_found") or 0, rerun=True)
    except Exception as e:
        key = next((s["key"] for s in job["stages"] if s["status"] == "running"), "analyze")
        _fail(store, job, key, f"Internal error: {e!r}", f"आंतरिक त्रुटि: {e!r}")
    store.save(job_id)
    return job


def acceptable(rows: list[dict]) -> list[dict]:
    """Rows that can be stored; implausible values (DO 45, DO -5) stay out until the officer corrects them."""
    from .validate import implausible
    return [r for r in rows if r.get("year") and r.get("festival") in ("Ganesh", "Durga")
            and r.get("phase") in ("pre", "during", "after") and r.get("parameter") in STANDARD_PARAMS
            and not implausible(r.get("parameter"), r.get("value"))]


def accept(job_id: str, rows: list[dict] | None) -> dict:
    from ..scoring import rank_all
    from .analyze import user_extra
    store = get_store()
    job = store.get(job_id)
    if rows:
        normalized, _ = normalize_rows(corrected_raw(job, rows), job["context"])
        validate(normalized, store.accepted_keys(exclude_job=job_id))
    else:
        normalized = job["rows"]
    good = acceptable(normalized)
    from .validate import implausible
    held = [r for r in normalized if implausible(r.get("parameter"), r.get("value"))]
    df = load_bhopal()
    before = {g["slug"]: (g["tier"], g["score"], g["rank"]) for g in rank_all(df, extra_by_slug=user_extra()[0])}
    n = store.accept_rows(job, good)
    after = {g["slug"]: (g["tier"], g["score"], g["rank"]) for g in rank_all(df, extra_by_slug=user_extra()[0])}
    changed = [s for s in after if after[s] != before.get(s)]
    with store.lock:
        job["rows"] = normalized
        job["status"] = "accepted"
        job["accepted_at"] = now_iso()
        _st(job, "report")["log"].append({"t": now_iso(), "text": bi(
            f"Accepted by the officer: {n} rows stored apart from the official pack (not yet verified by MPPCB).",
            f"अधिकारी ने स्वीकार किया: {n} पंक्तियां आधिकारिक डेटा से अलग सहेजी गईं (MPPCB द्वारा अभी सत्यापित नहीं)।")})
        if held:
            _st(job, "report")["log"].append({"t": now_iso(), "text": bi(
                f"{len(held)} implausible value(s) held back, not stored or scored: "
                + ", ".join(f"{r['parameter']} {r['value']:g} at {r.get('site_as_printed')}" for r in held[:5]),
                f"{len(held)} असंभाव्य मान रोके गए, न सहेजे न स्कोर किए: "
                + ", ".join(f"{r['parameter']} {r['value']:g} ({r.get('site_as_printed')})" for r in held[:5]))})
    write_report(store, job_id, build_report(job))
    store.save(job_id)
    from . import api as _api
    _api.invalidate_ranking_cache()
    return {"ok": True, "accepted_rows": n, "ranking_changed": changed, "held_back": len(held)}


def manual_template() -> dict:
    return {p: {"value": None, "flag": None, "unit": unit_for(p)} for p in STANDARD_PARAMS}
