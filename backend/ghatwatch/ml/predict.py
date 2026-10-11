"""Serve the champion model: per-ghat Durga 2026 outlook, model agreement, top-3 reasons."""
from __future__ import annotations

import os
import warnings
warnings.filterwarnings("ignore", message=".*LightGBM binary classifier.*")
from functools import lru_cache
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from ..data import ARTIFACTS_DIR, SITE_BY_SLUG, normalise_ro
from .dataset import PRE_FEATURES, bhopal_feature_rows, featurise
from .train import MODEL_NAMES

MODELS_DIR = ARTIFACTS_DIR / "models"

FEATURE_LABEL = {
    "pre_ph": ("pre-immersion pH", "विसर्जन-पूर्व पीएच"),
    "pre_do": ("pre-immersion dissolved oxygen", "विसर्जन-पूर्व घुलित ऑक्सीजन"),
    "pre_bod": ("pre-immersion BOD", "विसर्जन-पूर्व बीओडी"),
    "pre_cod": ("pre-immersion COD", "विसर्जन-पूर्व सीओडी"),
    "pre_ts": ("pre-immersion total solids", "विसर्जन-पूर्व कुल ठोस"),
    "pre_tds": ("pre-immersion dissolved solids", "विसर्जन-पूर्व घुलित ठोस"),
    "pre_turbidity": ("pre-immersion turbidity", "विसर्जन-पूर्व गंदलापन"),
    "pre_conductivity": ("pre-immersion conductivity", "विसर्जन-पूर्व चालकता"),
    "site_prior_breach_rate": ("this site's breach record in earlier years", "पिछले वर्षों में इस स्थल का उल्लंघन रिकॉर्ड"),
    "festival_durga": ("Durga festival", "दुर्गा पर्व"),
    "year": ("year", "वर्ष"),
}
WHATIF_KEYS = {"pH": "pre_ph", "DO": "pre_do", "BOD": "pre_bod", "COD": "pre_cod", "TS": "pre_ts",
               "TDS": "pre_tds", "turbidity": "pre_turbidity", "conductivity": "pre_conductivity"}


def _label(f: str) -> tuple[str, str]:
    if f in FEATURE_LABEL:
        return FEATURE_LABEL[f]
    if f.startswith("type_"):
        k = f[5:]
        return (f"site type '{k}'", f"स्थल प्रकार '{k}'")
    if f.startswith("ro_"):
        return (f"regional office {f[3:]}", f"क्षेत्रीय कार्यालय {f[3:]}")
    return (f, f)


# joblib files are produced locally by scripts/build_artifacts.py and committed with the repo;
# never load model files from an untrusted source (joblib/pickle can execute code).
@lru_cache(maxsize=1)
def load_models(models_dir: Path = MODELS_DIR) -> tuple[dict, dict] | None:
    meta_p = models_dir / "meta.joblib"
    if not meta_p.exists():
        return None
    meta = joblib.load(meta_p)
    models = {n: joblib.load(models_dir / f"{n}.joblib") for n in MODEL_NAMES if (models_dir / f"{n}.joblib").exists()}
    if len(models) != len(MODEL_NAMES):
        return None
    return models, meta


def champion_name(meta: dict) -> str:
    override = os.environ.get("GHATWATCH_MODEL")
    return override if override in MODEL_NAMES else meta["champion"]


def _contributions(name: str, model, X: pd.DataFrame) -> np.ndarray:
    """Per-feature contribution to the logit/margin for one row."""
    if name == "logreg":
        imp, sc, clf = model.named_steps["impute"], model.named_steps["scale"], model.named_steps["clf"]
        z = sc.transform(imp.transform(X))[0] * clf.coef_[0]
        names = list(imp.get_feature_names_out(X.columns))
        out = np.zeros(X.shape[1])
        for i, n in enumerate(names):
            base = n.replace("missingindicator_", "")
            if base in X.columns:
                out[list(X.columns).index(base)] += z[i]
        return out
    try:
        import shap
        sv = shap.TreeExplainer(model).shap_values(X)
        if isinstance(sv, list):
            sv = sv[1]
        sv = np.asarray(sv)
        if sv.ndim == 3:
            sv = sv[:, :, 1]
        return sv[0]
    except Exception:
        return np.asarray(model.feature_importances_, dtype=float)


def _reason_text(f: str, val: float, direction: str) -> dict:
    en, hi = _label(f)
    binary = f.startswith(("type_", "ro_")) or f == "festival_durga"
    if binary and val == 0:
        en, hi = f"not {en}", f"{hi} नहीं"
    en = en[0].upper() + en[1:]
    v = "" if (binary or val is None or np.isnan(val)) else f" ({val:.3g})"
    missing = val is None or np.isnan(val)
    if missing:
        return {"en": f"{en} is not available; the model treats this as a gap.",
                "hi": f"{hi} उपलब्ध नहीं है; मॉडल इसे डेटा की कमी मानता है।"}
    if direction == "up":
        return {"en": f"{en}{v} pushes the breach estimate up.",
                "hi": f"{hi}{v} उल्लंघन की संभावना बढ़ाता है।"}
    return {"en": f"{en}{v} pulls the breach estimate down.",
            "hi": f"{hi}{v} उल्लंघन की संभावना घटाता है।"}


def forecast_row(X: pd.DataFrame, basis: dict | None = None) -> dict:
    """All-model probabilities + champion reasons for a single-row feature frame."""
    loaded = load_models()
    if loaded is None:
        return {"available": False, "reason": "ML models not built (run scripts/build_artifacts.py)"}
    models, meta = loaded
    X = X[meta["features"]]
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        probs = {n: round(float(m.predict_proba(X)[0, 1]), 4) for n, m in models.items()}
    champ = champion_name(meta)
    contrib = _contributions(champ, models[champ], X)
    order = np.argsort(np.abs(contrib))[::-1][:3]
    reasons = []
    for i in order:
        f = X.columns[i]
        d = "up" if contrib[i] > 0 else "down"
        val = float(X.iloc[0, i]) if pd.notna(X.iloc[0, i]) else float("nan")
        reasons.append({"feature": f, "direction": d, "contribution": round(float(contrib[i]), 4),
                        "text": _reason_text(f, val, d)})
    return {"available": True, "champion": champ, "p_breach": probs[champ], "models": probs,
            "basis": basis, "top_reasons": reasons,
            "label": {"en": "Model estimate from 544 MP site-festival records (2023–25). Not a measurement.",
                      "hi": "मध्य प्रदेश के 544 स्थल-त्योहार रिकॉर्ड (2023–25) पर आधारित मॉडल अनुमान। यह मापन नहीं है।"}}


def bhopal_forecasts() -> dict[str, dict]:
    """Durga 2026 outlook per ghat from the latest available pre-immersion readings."""
    loaded = load_models()
    if loaded is None:
        return {}
    _, meta = loaded
    t = bhopal_feature_rows(meta["top_ros"])
    X = featurise(t, meta["top_ros"])
    out = {}
    for i, r in t.iterrows():
        basis = {"year": int(r["basis_year"]), "festival": r["basis_festival"], "phase": "pre"}
        out[r["slug"]] = forecast_row(X.loc[[i]], basis)
    return out


def whatif_forecast(slug: str | None, pre: dict, new_site: dict | None = None) -> dict:
    """Forecast with officer-entered 2026 Durga pre values (others from latest basis for a known ghat)."""
    loaded = load_models()
    if loaded is None:
        return {"available": False, "reason": "ML models not built"}
    _, meta = loaded
    if slug in SITE_BY_SLUG and new_site is None:
        t = bhopal_feature_rows(meta["top_ros"])
        row = t[t["slug"] == slug].copy()
        for c in PRE_FEATURES:  # entered values replace the old pre readings entirely
            row[c] = np.nan
    else:
        name = (new_site or {}).get("name", "new kund")
        wb = (new_site or {}).get("water_body", "")
        row = pd.DataFrame([{"site_as_printed": f"{name} {wb}", "ro": normalise_ro("R.O. Bhopal"),
                             "festival": "Durga", "prior_breach_rate": np.nan}])
    row["year"], row["festival"] = 2026, "Durga"
    for k, f in WHATIF_KEYS.items():
        if pre.get(k) is not None:
            row[f] = float(pre[k])
    X = featurise(row.reset_index(drop=True), meta["top_ros"])
    return forecast_row(X, {"year": 2026, "festival": "Durga", "phase": "pre", "entered": True})
