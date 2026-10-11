"""STANDALONE OCR worker. Run with the isolated venv, never imported by the API process:

    backend/.ocr-venv/Scripts/python ocr_worker.py <file.pdf|png|jpg> <out.json> [--pages 28-30] [--dpi 200] [--render-only]

Renders PDF pages with pypdfium2 (150 dpi; GHATWATCH_OCR_DPI) or loads the image, runs PaddleOCR 3.x
(lang="en", enable_mkldnn=False, textline orientation off; models GHATWATCH_OCR_DET / GHATWATCH_OCR_REC,
default PP-OCRv5_mobile_det / PP-OCRv5_mobile_rec), writes page PNGs next to out.json (page-<n>.png) and out.json:
{engine, version, elapsed_s, pages: [{page, png, width, height, text, lines: [{text, segs: [[c0, c1, conf]]}],
words: [{text, box: [x0, y0, x1, y1], conf}]}], error|null}.
`text` is a line rebuild (cluster word boxes on y with tolerance 0.6 x median box height, sort by x, place each
box at its character column x / median char width, >= 2 spaces between boxes) that parse_mppcb consumes.
"""
from __future__ import annotations

import json
import os
import re
import statistics
import sys
import time
from pathlib import Path


def parse_pages(spec: str | None, n: int) -> list[int]:
    if not spec:
        return list(range(1, n + 1))
    out: list[int] = []
    for part in re.split(r"[,\s]+", spec.strip()):
        m = re.fullmatch(r"(\d+)-(\d+)", part)
        if m:
            out.extend(range(int(m.group(1)), int(m.group(2)) + 1))
        elif part.isdigit():
            out.append(int(part))
    return [p for p in dict.fromkeys(out) if 1 <= p <= n]


def render(src: Path, out_dir: Path, pages: str | None, dpi: int) -> list[tuple[int, Path]]:
    out_dir.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() == ".pdf":
        import pypdfium2 as pdfium
        pdf = pdfium.PdfDocument(str(src))
        res = []
        for p in parse_pages(pages, len(pdf)):
            img = pdf[p - 1].render(scale=dpi / 72.0).to_pil()
            dest = out_dir / f"page-{p}.png"
            img.save(dest)
            res.append((p, dest))
        return res
    dest = out_dir / "page-1.png"
    try:
        from PIL import Image, ImageOps
        im = ImageOps.exif_transpose(Image.open(src))
        im.convert("RGB").save(dest)
    except Exception:
        import cv2
        cv2.imwrite(str(dest), cv2.imread(str(src)))
    return [(1, dest)]


def _get(r, key):
    try:
        return r[key]
    except Exception:
        return getattr(r, key, None)


def _box(poly) -> list[float]:
    try:
        pts = [(float(p[0]), float(p[1])) for p in poly]
    except Exception:
        x0, y0, x1, y1 = [float(v) for v in poly][:4]
        return [x0, y0, x1, y1]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return [min(xs), min(ys), max(xs), max(ys)]


def rebuild_lines(words: list[dict]) -> list[dict]:
    """Word boxes -> text lines with each box at its character column; segs carry per-box confidence."""
    if not words:
        return []
    hs = [w["box"][3] - w["box"][1] for w in words]
    h = statistics.median(hs) or 10.0
    cw = [(w["box"][2] - w["box"][0]) / len(w["text"]) for w in words if len(w["text"]) >= 2]
    char_w = statistics.median(cw) if cw else h * 0.5
    char_w = max(char_w, 1.0)
    tol = 0.6 * h
    lines: list[dict] = []
    for w in sorted(words, key=lambda w: (w["box"][1] + w["box"][3]) / 2):
        yc = (w["box"][1] + w["box"][3]) / 2
        if lines and abs(yc - lines[-1]["yc"]) <= tol:
            ln = lines[-1]
            ln["words"].append(w)
            ln["yc"] = sum((x["box"][1] + x["box"][3]) / 2 for x in ln["words"]) / len(ln["words"])
        else:
            lines.append({"yc": yc, "words": [w]})
    out = []
    for ln in lines:
        s, segs, prev_x1 = "", [], None
        for w in sorted(ln["words"], key=lambda w: w["box"][0]):
            col = int(round(w["box"][0] / char_w))
            if s:
                gap_chars = (w["box"][0] - prev_x1) / char_w if prev_x1 is not None else 99
                if gap_chars < 1.5:
                    col = len(s) + 1  # same phrase split into boxes: one space
                else:
                    col = max(col, len(s) + 2)
            s = s.ljust(col)
            c0 = len(s)
            s += w["text"]
            segs.append([c0, len(s), round(float(w["conf"]), 4)])
            prev_x1 = w["box"][2]
        out.append({"text": s, "segs": segs})
    return out


def main(argv: list[str]) -> int:
    import argparse
    os.environ.setdefault("FLAGS_use_mkldnn", "0")
    os.environ.setdefault("PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK", "True")
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("out")
    ap.add_argument("--pages", default=None)
    ap.add_argument("--dpi", type=int, default=int(os.environ.get("GHATWATCH_OCR_DPI", "150")))
    ap.add_argument("--render-only", action="store_true")
    a = ap.parse_args(argv)
    t0 = time.perf_counter()
    out_path = Path(a.out)
    result: dict = {"engine": None, "version": None, "pages": [], "error": None}
    try:
        rendered = render(Path(a.file), out_path.parent, a.pages, a.dpi)
        if a.render_only:
            result["pages"] = [{"page": p, "png": str(png)} for p, png in rendered]
        else:
            import paddleocr
            from paddleocr import PaddleOCR
            result["engine"] = "PaddleOCR"
            result["version"] = getattr(paddleocr, "__version__", "3.x")
            # enable_mkldnn=False: paddle 3.3 oneDNN + PIR on Windows CPU raises NotImplementedError at predict().
            # Textline orientation off (MPPCB pages are upright). Models configurable; defaults: PP-OCRv5 mobile.
            kw = dict(use_doc_orientation_classify=False, use_doc_unwarping=False,
                      use_textline_orientation=os.environ.get("GHATWATCH_OCR_TEXTLINE_ORI", "0") == "1",
                      lang="en", enable_mkldnn=False,
                      text_detection_model_name=os.environ.get("GHATWATCH_OCR_DET", "PP-OCRv5_mobile_det"),
                      text_recognition_model_name=os.environ.get("GHATWATCH_OCR_REC", "PP-OCRv5_mobile_rec"))
            side = int(os.environ.get("GHATWATCH_OCR_DET_SIDE", "0"))
            if side > 0:  # optional cap on the detector input size
                kw.update(text_det_limit_side_len=side, text_det_limit_type="max")
            try:
                ocr = PaddleOCR(**kw)
            except TypeError:  # older 3.x without some keyword
                for k in ("text_detection_model_name", "text_recognition_model_name", "enable_mkldnn"):
                    kw.pop(k, None)
                ocr = PaddleOCR(**kw)
            result["models"] = {"det": kw.get("text_detection_model_name"), "rec": kw.get("text_recognition_model_name")}
            for p, png in rendered:
                tp = time.perf_counter()
                res = ocr.predict(input=str(png))
                words = []
                for r in res or []:
                    texts = _get(r, "rec_texts") or []
                    scores = _get(r, "rec_scores")
                    polys = _get(r, "rec_polys")
                    if polys is None:
                        polys = _get(r, "dt_polys")
                    scores = list(scores) if scores is not None else [1.0] * len(texts)
                    polys = list(polys) if polys is not None else []
                    for i, t in enumerate(texts):
                        if not str(t).strip() or i >= len(polys):
                            continue
                        words.append({"text": str(t).strip(), "box": _box(polys[i]),
                                      "conf": float(scores[i]) if i < len(scores) else 1.0})
                lines = rebuild_lines(words)
                try:
                    from PIL import Image
                    wd, ht = Image.open(png).size
                except Exception:
                    wd = ht = None
                result["pages"].append({"page": p, "png": str(png), "width": wd, "height": ht,
                                        "elapsed_s": round(time.perf_counter() - tp, 2),
                                        "text": "\n".join(ln["text"] for ln in lines), "lines": lines,
                                        "words": words})
    except Exception as e:  # report, never crash silently
        result["error"] = f"{type(e).__name__}: {e}"
    result["elapsed_s"] = round(time.perf_counter() - t0, 2)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result, ensure_ascii=False), encoding="utf-8")
    return 0 if result["error"] is None else 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
