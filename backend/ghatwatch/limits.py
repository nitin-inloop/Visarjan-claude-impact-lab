"""CPCB designated-best-use water quality criteria (classes A-E), read from the pack CSV."""
from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache

import pandas as pd

from .data import CRITERIA_CSV

# criteria CSV parameter name -> name used in the immersion CSVs
_PARAM_MAP = {"BOD (5 days 20C)": "BOD", "Dissolved oxygen": "Dissolved oxygen", "pH": "pH"}


@dataclass(frozen=True)
class Limit:
    parameter: str
    kind: str  # min | max | range
    low: float | None
    high: float | None
    unit: str

    def breached(self, v: float) -> bool:
        if self.kind == "min":
            return v < self.low
        if self.kind == "max":
            return v > self.high
        return v < self.low or v > self.high

    @property
    def text(self) -> str:
        if self.kind == "min":
            return f"≥ {self.low:g}"
        if self.kind == "max":
            return f"≤ {self.high:g}"
        return f"{self.low:g}–{self.high:g}"


@lru_cache(maxsize=1)
def load_limits() -> dict[str, dict[str, Limit]]:
    """{class: {parameter: Limit}} for the pH / DO / BOD limits of every class."""
    df = pd.read_csv(CRITERIA_CSV, encoding="utf-8")
    out: dict[str, dict[str, Limit]] = {}
    for r in df.to_dict("records"):
        param = _PARAM_MAP.get(r["parameter"])
        if param is None:
            continue
        unit = "" if pd.isna(r["unit"]) else str(r["unit"])
        if r["limit_type"] == "range":
            lo, hi = (float(x) for x in str(r["limit"]).split("-"))
            lim = Limit(param, "range", lo, hi, unit)
        elif r["limit_type"] == "min":
            lim = Limit(param, "min", float(r["limit"]), None, unit)
        else:
            lim = Limit(param, "max", None, float(r["limit"]), unit)
        out.setdefault(str(r["class"]), {})[param] = lim
    return out


def class_limits(cls: str = "B") -> dict[str, Limit]:
    """Limits for one class, e.g. class_limits('B')['Dissolved oxygen']."""
    return load_limits()[cls]
