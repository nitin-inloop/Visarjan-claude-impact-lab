"""Generate SYNTHETIC test reports for the intake pipeline (samples/dummy/).

NOT REAL MPPCB DATA. The layout imitates the MPPCB immersion-report tables (2025 report pp. 28-30:
"Location- <site>" then "S. No. Parameter Pre Immersion ..."), with values invented for testing.

Outputs:
  durga-2026-pre-SYNTHETIC.pdf            text-layer PDF (reportlab), 2 pages
  durga-2026-pre-SYNTHETIC-scanned.pdf    image-only PDF of the same pages (no text layer -> OCR path)
  durga-2026-pre-SYNTHETIC-p1.png / -p2.jpg   the page images
  expected.json                           what a correct extraction must produce (cell by cell)

Run from backend/:  python scripts/make_dummy_reports.py
Needs reportlab + Pillow.
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

OUT = Path(__file__).resolve().parents[2] / "samples" / "dummy"
STAMP = "SYNTHETIC TEST DATA - NOT REAL MPPCB DATA"
PARAMS = ["pH", "Total Solids", "Dissolved Solids", "suspended-solids", "D.Oxygen", "BOD", "COD", "Turbidity",
          "Conductivity", "Chromium", "Lead", "Zinc", "Copper"]
STD = {"pH": "pH", "Total Solids": "Total solids", "Dissolved Solids": "Dissolved solids",
       "suspended-solids": "Suspended solids", "D.Oxygen": "Dissolved oxygen", "BOD": "BOD", "COD": "COD",
       "Turbidity": "Turbidity", "Conductivity": "Conductivity", "Chromium": "Chromium", "Lead": "Lead",
       "Zinc": "Zinc", "Copper": "Copper"}

# page -> [(location line, expected slug, {printed param: printed pre-immersion cell})]
# A param missing from the dict is a MISSING ROW (parameter not in the table at all).
TABLES = {
    1: [
        ("Khatlapura  murti visarjan ghat at lower lake, Bhopal.", "khatlapura",
         {"pH": "7.42", "Total Solids": "318", "Dissolved Solids": "282", "suspended-solids": "36",
          "D.Oxygen": "45",  # implausible typo (meant 4.5): must be flagged, never scored
          "BOD": "5.1", "COD": "22.4", "Turbidity": "6.8", "Conductivity": "452.3", "Chromium": "0.03",
          "Lead": "0.031", "Zinc": "0.071", "Copper": "0.122"}),
        ("Prempura  Visarjanghat,  Bhopal.", "prempura",
         {"pH": "7.81", "Total Solids": "402", "Dissolved Solids": "356", "suspended-solids": "46",
          "D.Oxygen": "4.2", "BOD": "6.4", "COD": "31.2",
          "Turbidity": "",  # blank cell -> not sampled
          "Conductivity": "511", "Chromium": "0.03",
          "Lead": "BDL",  # below detection limit
          "Zinc": "0.064", "Copper": "0.097"}),
    ],
    2: [
        ("Sant Hirdaram  Visarjankund, Bairagarh, Bhopal.", "bairagarh",
         {"pH": "*",  # '*' = not sampled
          "Total Solids": "702", "Dissolved Solids": "655", "suspended-solids": "47", "D.Oxygen": "2.1",
          "BOD": "9.5", "COD": "41.6", "Turbidity": "14",
          # Conductivity row deliberately absent (missing parameter)
          "Chromium": "0.03", "Lead": "0.031", "Zinc": "0.08", "Copper": "0.13"}),
        ("Ahmedpur  Visarjan Kund, Bhopal.", None,  # NEW kund, not one of the 7 ghats
         {"pH": "8.12", "Total Solids": "366", "Dissolved Solids": "322", "suspended-solids": "44",
          "D.Oxygen": "5.6", "BOD": "3.8", "COD": "18.4", "Turbidity": "7.2", "Conductivity": "468",
          "Chromium": "0.03", "Lead": "0.031", "Zinc": "0.052", "Copper": "0.088"}),
    ],
}
HEAD = ["Durga Idol Immersion -2026", "Water Quality  Monitoring  Report of Durga Idol Immersion (pre-immersion)",
        "R.O. Bhopal"]
X_SNO, X_PARAM, X_PRE = 50, 95, 300  # points


def page_lines(page: int) -> list[tuple[float, str, bool]]:
    """(x, text, bold) rows of one page, top to bottom; a None x is a blank spacer row."""
    out: list[tuple[float, str, bool]] = [(150, STAMP, True)] + [(170, h, True) for h in HEAD]
    for loc, _slug, cells in TABLES[page]:
        out.append((120, "Location- " + loc, True))
        out.append((-1, "", True))  # header row marker
        for i, p in enumerate(PARAMS, 1):
            if p in cells:
                out.append((-2, f"{i}|{p}|{cells[p]}", False))
    out.append((150, STAMP, True))
    return out


def make_text_pdf(path: Path) -> None:
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle("SYNTHETIC TEST DATA - Durga 2026 pre-immersion (not MPPCB)")
    for page in sorted(TABLES):
        y = 800
        for x, txt, bold in page_lines(page):
            c.setFont("Helvetica-Bold" if bold else "Helvetica", 10)
            if x == -1:
                c.drawString(X_SNO, y, "S. No.")
                c.drawString(X_PARAM, y, "Parameter")
                c.drawString(X_PRE, y, "Pre Immersion")
            elif x == -2:
                sno, p, v = txt.split("|")
                c.drawString(X_SNO + 8, y, sno)
                c.drawString(X_PARAM, y, p)
                c.drawCentredString(X_PRE + 32, y, v)
            else:
                c.drawString(x, y, txt)
            y -= 16
        c.showPage()
    c.save()


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    for f in (["/System/Library/Fonts/Supplemental/Arial Bold.ttf", "DejaVuSans-Bold.ttf"] if bold else
              ["/System/Library/Fonts/Supplemental/Arial.ttf", "DejaVuSans.ttf"]):
        try:
            return ImageFont.truetype(f, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_page_image(page: int, scale: float = 200 / 72) -> Image.Image:
    """200 dpi rendering of the same page (slight rotation + grey noise, like a scan)."""
    w, h = int(A4[0] * scale), int(A4[1] * scale)
    img = Image.new("L", (w, h), 250)
    d = ImageDraw.Draw(img)
    fr, fb = _font(int(10 * scale)), _font(int(10 * scale), True)
    y = 842 - 800
    for x, txt, bold in page_lines(page):
        Y = y * scale
        if x == -1:
            for xx, t in ((X_SNO, "S. No."), (X_PARAM, "Parameter"), (X_PRE, "Pre Immersion")):
                d.text((xx * scale, Y), t, fill=20, font=fb)
        elif x == -2:
            sno, p, v = txt.split("|")
            d.text(((X_SNO + 8) * scale, Y), sno, fill=20, font=fr)
            d.text((X_PARAM * scale, Y), p, fill=20, font=fr)
            if v:
                tw = d.textlength(v, font=fr)
                d.text(((X_PRE + 32) * scale - tw / 2, Y), v, fill=20, font=fr)
        else:
            d.text((x * scale, Y), txt, fill=20, font=fb if bold else fr)
        y += 16
    return img.rotate(0.4, fillcolor=250, resample=Image.BICUBIC).convert("RGB")


def expected() -> dict:
    rows = []
    for page, tabs in TABLES.items():
        for loc, slug, cells in tabs:
            site = " ".join(loc.split()).rstrip(".")
            for p in PARAMS:
                if p not in cells:
                    continue
                v = cells[p]
                try:
                    val, flag = float(v), None
                except ValueError:
                    val, flag = None, {"": "not sampled", "*": "*", "BDL": "BDL"}[v]
                rows.append({"page": page, "site_as_printed": site, "slug": slug, "year": 2026, "festival": "Durga",
                             "phase": "pre", "parameter": STD[p], "value": val, "flag": flag,
                             "value_as_printed": v})
    return {
        "_note": "SYNTHETIC TEST DATA. Invented values in an MPPCB-like layout; not real MPPCB measurements.",
        "context": {"year": 2026, "festival": "Durga", "phase": "pre"},
        "traps": {
            "implausible": {"slug": "khatlapura", "parameter": "Dissolved oxygen", "value": 45.0,
                            "expect": "validation error (outside 0-20), row not accepted/scored"},
            "bdl": {"slug": "prempura", "parameter": "Lead", "flag": "BDL"},
            "blank": {"slug": "prempura", "parameter": "Turbidity", "flag": "not sampled"},
            "not_sampled_star": {"slug": "bairagarh", "parameter": "pH", "flag": "*"},
            "missing_parameter": {"slug": "bairagarh", "parameter": "Conductivity",
                                  "expect": "no row at all (absent from the table)"},
            "new_site": {"site_as_printed": "Ahmedpur Visarjan Kund, Bhopal", "expect": "slug null (unmatched)"},
        },
        "rows": rows,
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    make_text_pdf(OUT / "durga-2026-pre-SYNTHETIC.pdf")
    imgs = [make_page_image(p) for p in sorted(TABLES)]
    imgs[0].save(OUT / "durga-2026-pre-SYNTHETIC-p1.png")
    imgs[1].save(OUT / "durga-2026-pre-SYNTHETIC-p2.jpg", quality=85)
    imgs[0].save(OUT / "durga-2026-pre-SYNTHETIC-scanned.pdf", save_all=True, append_images=imgs[1:],
                 resolution=200.0, title="SYNTHETIC TEST DATA (scanned)")
    (OUT / "expected.json").write_text(json.dumps(expected(), indent=1), encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
