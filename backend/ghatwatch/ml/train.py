"""Train 4 classifiers, validate (GroupKFold by site + temporal 2025 holdout), pick a champion.

Fixed, modest hyperparameters; seed 42. No tuning.
"""
from __future__ import annotations

import warnings
warnings.filterwarnings("ignore", message=".*LightGBM binary classifier.*")
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, brier_score_loss, f1_score, log_loss, roc_auc_score
from sklearn.model_selection import GroupKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .dataset import build_training

SEED = 42
MODEL_NAMES = ["logreg", "random_forest", "xgboost", "lightgbm"]
SELECTION_RULE = "Champion = highest mean GroupKFold(5, grouped by site) ROC-AUC; tie-break lower Brier score."


def make_model(name: str):
    if name == "logreg":
        return Pipeline([("impute", SimpleImputer(strategy="median", add_indicator=True)),
                         ("scale", StandardScaler()),
                         ("clf", LogisticRegression(C=1.0, max_iter=2000, random_state=SEED))])
    if name == "random_forest":
        return RandomForestClassifier(n_estimators=400, min_samples_leaf=3, n_jobs=-1, random_state=SEED)
    if name == "xgboost":
        from xgboost import XGBClassifier
        return XGBClassifier(n_estimators=300, max_depth=4, learning_rate=0.05, subsample=0.9,
                             colsample_bytree=0.9, eval_metric="logloss", random_state=SEED,
                             verbosity=0, n_jobs=4)
    if name == "lightgbm":
        from lightgbm import LGBMClassifier
        return LGBMClassifier(n_estimators=300, max_depth=4, num_leaves=15, learning_rate=0.05,
                              subsample=0.9, subsample_freq=1, colsample_bytree=0.9,
                              min_child_samples=10, random_state=SEED, verbose=-1, n_jobs=4)
    raise ValueError(name)


def _metrics(y: np.ndarray, p: np.ndarray) -> dict[str, float]:
    p = np.clip(p, 1e-6, 1 - 1e-6)
    return {"auc": float(roc_auc_score(y, p)), "pr_auc": float(average_precision_score(y, p)),
            "brier": float(brier_score_loss(y, p)), "logloss": float(log_loss(y, p)),
            "f1": float(f1_score(y, (p >= 0.5).astype(int)))}


def _fit(name: str, X: pd.DataFrame, y: pd.Series):
    m = make_model(name)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        m.fit(X, y)
    return m


def evaluate(X: pd.DataFrame, y: pd.Series, groups: pd.Series, years: pd.Series) -> list[dict]:
    rows = []
    gkf = GroupKFold(n_splits=5)
    tr_t, te_t = (years <= 2024).values, (years == 2025).values
    for name in MODEL_NAMES:
        oof = np.zeros(len(y))
        fold_auc = []
        for tr, te in gkf.split(X, y, groups):
            m = _fit(name, X.iloc[tr], y.iloc[tr])
            oof[te] = m.predict_proba(X.iloc[te])[:, 1]
            fold_auc.append(roc_auc_score(y.iloc[te], oof[te]))
        cv = _metrics(y.values, oof)
        mt = _fit(name, X[tr_t], y[tr_t])
        pt = mt.predict_proba(X[te_t])[:, 1]
        temporal = _metrics(y[te_t].values, pt)
        rows.append({"model": name, "auc_groupkfold": round(float(np.mean(fold_auc)), 4),
                     "auc_groupkfold_std": round(float(np.std(fold_auc)), 4),
                     "auc_temporal_2025": round(temporal["auc"], 4),
                     "pr_auc": round(cv["pr_auc"], 4), "brier": round(cv["brier"], 4),
                     "logloss": round(cv["logloss"], 4), "f1": round(cv["f1"], 4),
                     "temporal": {k: round(v, 4) for k, v in temporal.items()},
                     "n_test_temporal": int(te_t.sum())})
    return rows


def pick_champion(rows: list[dict]) -> str:
    best = sorted(rows, key=lambda r: (-r["auc_groupkfold"], r["brier"]))[0]
    return best["model"]


def importances(name: str, model, X: pd.DataFrame) -> list[dict]:
    """Mean |SHAP| for tree models (fallback: built-in importances); |coef| for logreg."""
    if name == "logreg":
        clf = model.named_steps["clf"]
        names = model.named_steps["impute"].get_feature_names_out(X.columns)
        vals = np.abs(clf.coef_[0])
        method = "abs_coefficient_standardised"
    else:
        try:
            import shap
            sv = shap.TreeExplainer(model).shap_values(X)
            if isinstance(sv, list):
                sv = sv[1]
            sv = np.asarray(sv)
            if sv.ndim == 3:
                sv = sv[:, :, 1]
            vals, names, method = np.abs(sv).mean(axis=0), list(X.columns), "mean_abs_shap"
        except Exception:
            vals, names, method = model.feature_importances_, list(X.columns), "builtin_importance"
    order = np.argsort(vals)[::-1]
    return [{"feature": str(names[i]), "importance": round(float(vals[i]), 5), "method": method}
            for i in order[:15]]


def train_all(models_dir: Path) -> dict:
    """Validate, refit all four on every row, save joblibs; return the leaderboard dict."""
    X, y, groups, meta, ros = build_training()
    rows = evaluate(X, y, groups, meta["year"])
    champ = pick_champion(rows)
    models_dir.mkdir(parents=True, exist_ok=True)
    imps = {}
    for name in MODEL_NAMES:
        m = _fit(name, X, y)
        joblib.dump(m, models_dir / f"{name}.joblib")
        imps[name] = importances(name, m, X)
        if name == champ:
            joblib.dump(m, models_dir / "champion.joblib")
    meta_out = {"features": list(X.columns), "top_ros": ros, "champion": champ}
    joblib.dump(meta_out, models_dir / "meta.joblib")
    return {"champion": champ, "selection_rule": SELECTION_RULE, "rows": rows, "n_train": int(len(X)),
            "positive_rate": round(float(y.mean()), 4), "n_sites": int(groups.nunique()),
            "features": list(X.columns), "importances": imps,
            "label": "P(breach) = any DO < 5 mg/l or BOD > 3 mg/l during or one week after immersion",
            "caveat": {"en": "Model estimate from 544 MP site-festival records (2023–25). Not a measurement.",
                       "hi": "मध्य प्रदेश के 544 स्थल-त्योहार रिकॉर्ड (2023–25) पर आधारित मॉडल अनुमान। यह मापन नहीं है।"}}
