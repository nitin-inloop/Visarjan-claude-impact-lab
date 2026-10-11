"""Validator: plausibility ranges, soft cross-checks, duplicates of the official pack, completeness, quality."""
from __future__ import annotations

from functools import lru_cache

from ..data import load_bhopal
from .schema import bi

RANGES = {"Dissolved oxygen": (0, 20), "pH": (0, 14), "BOD": (0, 500), "COD": (0, 2000), "Turbidity": (0, 2000),
          "Conductivity": (0, 10000), "Chromium": (0, 50), "Lead": (0, 50), "Zinc": (0, 50), "Copper": (0, 50),
          "Total solids": (0, 50000), "Dissolved solids": (0, 50000), "Suspended solids": (0, 50000)}


def implausible(param: str | None, v: object) -> bool:
    """True when a numeric value cannot be a real reading (negative or outside RANGES): needs review, never scored."""
    if v is None or param is None:
        return False
    try:
        x = float(v)
    except (TypeError, ValueError):
        return True
    if x != x:
        return True
    lo, hi_ = RANGES.get(param, (0, float("inf")))
    return x < 0 or x < lo or x > hi_


@lru_cache(maxsize=1)
def pack_keys() -> set[tuple]:
    df = load_bhopal()
    return {(int(r.year), r.festival, r.slug, r.phase, r.parameter) for r in df.itertuples()}


def row_key(r: dict) -> tuple:
    return (r.get("year"), r.get("festival"), r.get("slug"), r.get("phase"), r.get("parameter"))


def validate(rows: list[dict], user_keys: set[tuple] | None = None) -> tuple[list[dict], dict]:
    """Mutates rows (issues, already_in_pack); returns (issues, quality-part)."""
    issues: list[dict] = []

    def add(row: dict | None, level: str, en: str, hi: str) -> None:
        iid = f"i{len(issues) + 1:04d}"
        issues.append({"id": iid, "row_id": row["row_id"] if row else None, "level": level, "text": bi(en, hi)})
        if row is not None:
            row.setdefault("issues", []).append(iid)

    keys = pack_keys()
    by_cell: dict[tuple, dict] = {}
    for r in rows:
        r["issues"] = []
        p, v = r["parameter"], r["value"]
        r["needs_review"] = implausible(p, v)
        where_en = f"{r['parameter']} {r.get('phase') or '?'} at {r.get('site_as_printed') or r.get('slug') or '?'}"
        if v is not None:
            lo, hi_ = RANGES.get(p, (0, float("inf")))
            if v < 0:
                add(r, "error", f"{where_en}: negative value {v:g} is impossible.",
                    f"{where_en}: ऋणात्मक मान {v:g} संभव नहीं है।")
            elif v < lo or v > hi_:
                add(r, "error", f"{where_en}: {v:g} is outside the plausible range {lo}–{hi_:g}.",
                    f"{where_en}: {v:g} संभावित सीमा {lo}–{hi_:g} से बाहर है।")
        if r.get("confidence", 1.0) < 0.7:
            add(r, "warn", f"{where_en}: low read confidence ({r['confidence']:.2f}); check against the page.",
                f"{where_en}: पढ़ने का भरोसा कम ({r['confidence']:.2f}); पृष्ठ से मिलान करें।")
        if not r.get("slug"):
            pass  # reported once per site below
        if r.get("year") is None or r.get("festival") is None or r.get("phase") not in ("pre", "during", "after"):
            add(r, "error", f"{where_en}: year, festival or phase unknown; set them before accepting.",
                f"{where_en}: वर्ष, त्योहार या चरण अज्ञात; स्वीकार करने से पहले भरें।")
        k = row_key(r)
        r["already_in_pack"] = bool(r.get("slug")) and r.get("year") is not None and (
            (int(r["year"]), r["festival"], r["slug"], r["phase"], p) in keys)
        if r["already_in_pack"]:
            add(r, "info", f"{where_en} {r['festival']} {r['year']}: already in the official pack; the pack value is used.",
                f"{where_en} {r['festival']} {r['year']}: आधिकारिक डेटा में पहले से है; आधिकारिक मान ही उपयोग होगा।")
        elif user_keys and r.get("slug") and k in user_keys:
            add(r, "warn", f"{where_en} {r['festival']} {r['year']}: an officer-added reading for this cell was accepted earlier.",
                f"{where_en} {r['festival']} {r['year']}: इस कोष्ठ की अधिकारी-जोड़ी रीडिंग पहले स्वीकार हो चुकी है।")
        if r.get("slug"):
            by_cell[k] = r
    # soft cross-checks per (site, phase)
    for r in rows:
        if r["parameter"] == "BOD" and r["value"] is not None:
            cod = by_cell.get(row_key(r)[:4] + ("COD",))
            if cod and cod["value"] is not None and r["value"] > cod["value"]:
                add(r, "warn", f"BOD {r['value']:g} exceeds COD {cod['value']:g} ({r['phase']}, {r.get('slug')}); usually BOD ≤ COD.",
                    f"बीओडी {r['value']:g}, सीओडी {cod['value']:g} से अधिक है ({r['phase']}, {r.get('slug')}); सामान्यतः बीओडी ≤ सीओडी।")
        if r["parameter"] == "Dissolved solids" and r["value"] is not None:
            ts = by_cell.get(row_key(r)[:4] + ("Total solids",))
            if ts and ts["value"] is not None and r["value"] > ts["value"]:
                add(r, "warn", f"Dissolved solids {r['value']:g} exceed total solids {ts['value']:g} ({r['phase']}, {r.get('slug')}).",
                    f"घुलित ठोस {r['value']:g}, कुल ठोस {ts['value']:g} से अधिक ({r['phase']}, {r.get('slug')})।")
    # unmatched sites, once each
    for sp in sorted({r["site_as_printed"] for r in rows if not r.get("slug")}):
        add(None, "warn", f"Site '{sp}' does not match any of the 7 Bhopal ghats; it stays unmatched and is not ranked "
                          f"unless you pick a ghat.",
            f"स्थल '{sp}' भोपाल के 7 घाटों में से किसी से मेल नहीं खाता; यह अलग रहेगा और तब तक रैंक नहीं होगा जब तक आप घाट न चुनें।")
    # completeness per table (site x festival x year)
    tables: dict[tuple, list[dict]] = {}
    for r in rows:
        tables.setdefault((r.get("site_as_printed"), r.get("year"), r.get("festival")), []).append(r)
    for (sp, y, f), rs in tables.items():
        numeric = sum(x["value"] is not None for x in rs)
        if rs and numeric / len(rs) < 0.5 and len(rs) >= 6:
            add(None, "info", f"Table '{sp}' {f} {y}: only {numeric} of {len(rs)} cells are numbers.",
                f"तालिका '{sp}' {f} {y}: {len(rs)} में से केवल {numeric} कोष्ठ संख्याएं हैं।")
    n = len(rows)
    quality = {
        "rows": n, "numeric": sum(r["value"] is not None for r in rows),
        "flagged": sum(r["value"] is None for r in rows),
        "mean_confidence": round(sum(r.get("confidence", 0) for r in rows) / n, 3) if n else 0.0,
        "tables_found": len(tables),
    }
    return issues, quality


def quality_score(quality: dict, issues: list[dict]) -> float:
    """0-1 overall: mean confidence x share of rows without error issues."""
    n = quality.get("rows") or 0
    if not n:
        return 0.0
    err_rows = len({i["row_id"] for i in issues if i["level"] == "error" and i["row_id"]})
    return round(quality.get("mean_confidence", 0) * (1 - err_rows / n), 3)
