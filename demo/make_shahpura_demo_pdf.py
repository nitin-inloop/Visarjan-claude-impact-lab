"""Build a DEMO test report for Shahpura lake ghat in the MPPCB table layout.

Page 1  : Durga 2026 (synthetic). Each value = mean of this ghat's Durga 2023, 2024, 2025 readings for
          the same phase; metals are BDL where at least two of the three readings were BDL, otherwise
          the mean of the numeric readings.
Pages 2-7: Shahpura's historical tables 2023-2025 reproduced from the data pack exactly as printed,
          so extraction can be checked against the official numbers (they upload as duplicates).

Run with any Python that has pandas-free stdlib + reportlab:
    backend/.ocr-venv/Scripts/python demo/make_shahpura_demo_pdf.py
"""
from __future__ import annotations

import csv
from collections import defaultdict
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
CSV = ROOT / "track-2-visarjan-ghat-watch" / "data" / "bhopal_ghats_2023_2025.csv"
OUT = Path(__file__).resolve().parent / "shahpura_demo_report.pdf"
SITE = "Shahpura lake ghat"
PRINTED = "Murti-visarjan ghat at Shahpura lake, Bhopal."

ORDER = ["pH", "Total solids", "Dissolved solids", "Suspended solids", "Dissolved oxygen", "BOD", "COD",
         "Turbidity", "Conductivity", "Chromium", "Lead", "Zinc", "Copper"]
LABEL = {"pH": "pH", "Total solids": "Total Solids", "Dissolved solids": "Dissolved Solids",
         "Suspended solids": "Suspended Solids", "Dissolved oxygen": "D.Oxygen", "BOD": "BOD", "COD": "COD",
         "Turbidity": "Turbidity", "Conductivity": "Conductivity", "Chromium": "Chromium", "Lead": "Lead",
         "Zinc": "Zinc", "Copper": "Copper"}
DECIMALS = {"pH": 2, "Total solids": 0, "Dissolved solids": 0, "Suspended solids": 0, "Dissolved oxygen": 1,
            "BOD": 1, "COD": 1, "Turbidity": 1, "Conductivity": 1, "Chromium": 3, "Lead": 3, "Zinc": 3,
            "Copper": 3}
METALS = {"Chromium", "Lead", "Zinc", "Copper"}
PHASES = ["pre", "during", "after"]
REPORT_PAGES = {2023: "Idol Immersion Report 2023 (CPCB format)", 2024: "Ganesh and Durga Visarjan Report 2024",
                2025: "Ganesh and Durga Visarjan Report 2025"}

# x centres (points) of the value columns; headers are centred on the same x so the parser's
# nearest-header-centre rule assigns every cell to the right phase.
X_SNO, X_PARAM, X_COL = 48, 78, {"pre": 268, "during": 378, "after": 488}


def load() -> dict[tuple[int, str], dict]:
    tables: dict[tuple[int, str], dict] = defaultdict(lambda: {"cells": {}, "page": None})
    with CSV.open(encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["site"] != SITE:
                continue
            t = tables[(int(r["year"]), r["festival"])]
            t["page"] = int(r["source_page"])
            t["cells"][(r["parameter"], r["phase"])] = r["value_as_printed"] or ""
    return dict(tables)


def synth_durga(tables: dict) -> dict:
    cells = {}
    for p in ORDER:
        if p == "Suspended solids":
            continue  # Durga tables print no suspended solids row (as in Durga 2023 and 2025)
        for ph in PHASES:
            vals = [tables[(y, "Durga")]["cells"].get((p, ph), "") for y in (2023, 2024, 2025)]
            nums = []
            for v in vals:
                try:
                    nums.append(float(v))
                except ValueError:
                    pass
            if p in METALS and len(nums) < 2:
                cells[(p, ph)] = "BDL"
            elif nums:
                d = DECIMALS[p]
                m = sum(nums) / len(nums)
                cells[(p, ph)] = f"{m:.{d}f}" if d else f"{round(m)}"
            else:
                cells[(p, ph)] = ""
    return cells


def draw_table(c: canvas.Canvas, heading: str, cells: dict, footer_lines: list[str], demo: bool) -> None:
    w, h = A4
    y = h - 50
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(w / 2, y, "DEMO TEST FILE FOR GHAT WATCH  -  NOT AN OFFICIAL MPPCB DOCUMENT")
    y -= 28
    c.setFont("Helvetica-Bold", 13)
    c.drawCentredString(w / 2, y, heading)
    y -= 18
    c.setFont("Helvetica", 11)
    c.drawCentredString(w / 2, y, "Water Quality Monitoring Report")
    y -= 16
    c.drawCentredString(w / 2, y, "R.O. Bhopal")
    y -= 26
    c.setFont("Helvetica-Bold", 11)
    c.drawString(X_PARAM, y, f"Location- {PRINTED}")
    y -= 24
    c.setFont("Helvetica-Bold", 10)
    c.drawString(X_SNO - 8, y, "S. No.")
    c.drawString(X_PARAM + 14, y, "Parameter")
    c.drawCentredString(X_COL["pre"], y, "Pre Immersion")
    c.drawCentredString(X_COL["during"], y, "During Immersion")
    c.drawCentredString(X_COL["after"], y, "After one week")
    c.line(X_SNO - 10, y - 5, w - 50, y - 5)
    y -= 20
    c.setFont("Helvetica", 10)
    n = 0
    for p in ORDER:
        if not any((p, ph) in cells for ph in PHASES):
            continue
        n += 1
        c.drawRightString(X_SNO + 8, y, str(n))
        c.drawString(X_PARAM + 14, y, LABEL[p])
        for ph in PHASES:
            v = cells.get((p, ph), "")
            if v:
                c.drawCentredString(X_COL[ph], y, v)
        y -= 18
    c.line(X_SNO - 10, y + 10, w - 50, y + 10)
    y -= 14
    c.setFont("Helvetica-Oblique", 8.5)
    for line in footer_lines:
        c.drawString(X_SNO - 8, y, line)
        y -= 12
    if demo:
        c.saveState()
        c.setFillGray(0.88)
        c.setFont("Helvetica-Bold", 60)
        c.translate(w / 2, h / 2 - 120)
        c.rotate(30)
        c.drawCentredString(0, 0, "DEMO DATA")
        c.restoreState()
    c.setFont("Helvetica", 8)
    c.drawCentredString(w / 2, 30, "Ghat Watch test file. Generated from the public track data pack.")
    c.showPage()


def main() -> None:
    tables = load()
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("DEMO - Shahpura lake ghat water quality (synthetic Durga 2026 + historical 2023-2025)")
    c.setAuthor("Ghat Watch (demo generator)")
    draw_table(c, "Durga Idol Immersion -2026", synth_durga(tables), [
        "Note: the 2026 table is synthetic test data. Each value is the mean of the three earlier Durga readings",
        "at this ghat for the same phase; metals are BDL where two of the three readings were BDL.",
        "Sources: MPPCB reports of 2023 (p. 60), 2024 (p. 26) and 2025 (p. 65). Not a measurement.",
    ], demo=True)
    for year in (2023, 2024, 2025):
        for fest in ("Ganesh", "Durga"):
            t = tables[(year, fest)]
            draw_table(c, f"{fest} Idol Immersion -{year}", t["cells"], [
                f"Reproduced for testing from the MPPCB {REPORT_PAGES[year]}, page {t['page']}, values as printed.",
                "Uploading these pages should show them as already in the official pack (ignored, not double-counted).",
            ], demo=False)
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
