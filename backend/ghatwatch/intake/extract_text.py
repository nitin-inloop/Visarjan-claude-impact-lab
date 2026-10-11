"""Text-PDF extraction: pypdf layout mode per page (optional fallback: pdftotext -layout when on PATH)."""
from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path


def parse_pages(spec: str | None, n_pages: int | None = None) -> list[int]:
    """'28-30' / '28,29,64-65' / '' -> 1-based page list (clipped to n_pages when known)."""
    if not spec or not str(spec).strip():
        return list(range(1, (n_pages or 0) + 1))
    out: list[int] = []
    for part in re.split(r"[,\s]+", str(spec).strip()):
        if not part:
            continue
        m = re.fullmatch(r"(\d+)\s*[-–]\s*(\d+)", part)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            out.extend(range(min(a, b), max(a, b) + 1))
        elif part.isdigit():
            out.append(int(part))
        else:
            raise ValueError(f"Bad page spec '{spec}'")
    out = [p for p in dict.fromkeys(out) if p >= 1 and (n_pages is None or p <= n_pages)]
    return out


def page_count(path: Path) -> int:
    from pypdf import PdfReader
    return len(PdfReader(str(path)).pages)


def _pdftotext(path: Path, page: int) -> str | None:
    exe = shutil.which("pdftotext")
    if not exe:
        return None
    try:
        r = subprocess.run([exe, "-layout", "-f", str(page), "-l", str(page), str(path), "-"],
                           capture_output=True, timeout=60)
        return r.stdout.decode("utf-8", errors="replace") if r.returncode == 0 else None
    except Exception:
        return None


def extract_pages(path: Path, pages: list[int] | None = None) -> tuple[list[dict], dict]:
    """[{page, text, method}] for the requested 1-based pages + info {n_pages, method, chars}.

    Raises ValueError when the file is not a readable PDF.
    """
    from pypdf import PdfReader
    try:
        reader = PdfReader(str(path))
        n = len(reader.pages)
    except Exception as e:
        raise ValueError(f"not a readable PDF: {e}") from e
    sel = [p for p in (pages or range(1, n + 1)) if 1 <= p <= n]
    out = []
    for p in sel:
        method = "pypdf-layout"
        try:
            text = reader.pages[p - 1].extract_text(extraction_mode="layout") or ""
        except Exception:
            text = ""
        if len(text.strip()) < 20:
            alt = _pdftotext(path, p)
            if alt and len(alt.strip()) >= 20:
                text, method = alt, "pdftotext-layout"
        out.append({"page": p, "text": text, "method": method})
    info = {"n_pages": n, "chars": sum(len(x["text"].strip()) for x in out),
            "method": ", ".join(sorted({x["method"] for x in out})) or "pypdf-layout"}
    return out, info


def is_text_poor(pages: list[dict], min_chars_per_page: int = 80) -> bool:
    """True when the PDF looks scanned (little extractable text) and OCR should be tried."""
    if not pages:
        return True
    return sum(len(p["text"].strip()) for p in pages) < min_chars_per_page * len(pages)
