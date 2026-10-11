"""EXPERIMENTAL. Tabular discrete Conservative Q-Learning, numpy only (PLAN.md §3.8).

Loss per logged (s, a, r, s', done):
    (Q(s,a) - [r + gamma * (1 - done) * max_a' Q(s',a')])^2 / 2
    + alpha * (logsumexp_a Q(s,.) - Q(s,a))
Full-batch gradient steps: TD gradient averaged per (s, a); CQL gradient averaged per s.
"""
from __future__ import annotations

import numpy as np
import pandas as pd

from .simulator import N_ACTIONS, N_STATES


def _softmax(q: np.ndarray) -> np.ndarray:
    z = np.exp(q - q.max(axis=1, keepdims=True))
    return z / z.sum(axis=1, keepdims=True)


def train_cql(log: pd.DataFrame, alpha: float = 1.0, lr: float = 0.1, epochs: int = 300,
              gamma: float = 0.95) -> tuple[np.ndarray, list[float]]:
    s, a = log["s"].to_numpy(int), log["a"].to_numpy(int)
    r, s2, done = log["r"].to_numpy(float), log["s2"].to_numpy(int), log["done"].to_numpy(bool)
    n_sa = np.zeros((N_STATES, N_ACTIONS))
    np.add.at(n_sa, (s, a), 1.0)
    n_s = n_sa.sum(axis=1, keepdims=True)
    freq = np.divide(n_sa, n_s, out=np.zeros_like(n_sa), where=n_s > 0)
    seen = (n_s[:, 0] > 0)
    Q = np.zeros((N_STATES, N_ACTIONS))
    losses = []
    for _ in range(epochs):
        target = r + gamma * (~done) * Q[s2].max(axis=1)
        td = Q[s, a] - target
        g_td = np.zeros_like(Q)
        np.add.at(g_td, (s, a), td)
        g_td = np.divide(g_td, n_sa, out=np.zeros_like(Q), where=n_sa > 0)
        g_cql = alpha * (_softmax(Q) - freq)
        g_cql[~seen] = 0.0
        Q -= lr * (g_td + g_cql)
        lse = np.log(np.exp(Q[s] - Q[s].max(axis=1, keepdims=True)).sum(axis=1)) + Q[s].max(axis=1)
        losses.append(float(np.mean(0.5 * td ** 2 + alpha * (lse - Q[s, a]))))
    return Q, losses
