# Ghat Watch AI layer: what it does, what it does not, and how it is checked

Code: `backend/ghatwatch/ai/` (llm.py, extract.py, analyze.py, alerts.py, guards.py, api.py).
Tests: `backend/tests/test_ai.py`.

## The rule

The flow: **the officer uploads a PDF → the text layer / OCR pulls out the values → rules + ML analyse them →
Claude answers quickly, grounded on what was extracted.**

```
upload ─► PDF text layer (pypdf) ──poor text (scan/photo)──► PaddleOCR (backend/.ocr-venv)
             │                                                   │
             └──── rows ◄────────────────────────────────────────┘
                    │  no rows, or OCR needed but not installed ─► Claude reads the document (fallback)
                    ▼
          normalise → validate → analyse (scoring rules + ML forecast) → report      source.extractor = text | ocr | claude
                    ▼
          POST /api/ai/jobs/{id}/analysis: fast Claude (claude-haiku-5-5) → Cerebras → template, all guarded
```

AI never decides a score, a tier or a rank. Those come only from `ghatwatch.scoring` (CPCB class B
rules) and the forecast models in `ghatwatch/ml`. AI has two jobs:

1. **Read documents** (Claude, as the fallback). The PDF text layer is read first, then OCR for scans and
   photos. Claude reads the document only when text + OCR produced no rows, or when OCR is needed but not
   installed. Its rows then go through the same normalise → validate → analyse → review → accept pipeline as the
   PDF-text and OCR paths (docs/METHOD-INTAKE.md). The officer still reviews every row before it counts.
2. **Write short officer text.** The officer answer for an uploaded report uses fast Claude first
   (Cerebras as fallback); alert rephrasing and the brief polish use Cerebras first (Claude as fallback).
   It writes from the extracted rows and the template answer, in English and Hindi.

Every AI output is checked. If a check fails, or no key is set, or the provider is slow or down, the
officer sees the **template text** (marked "Standard text"). The app works fully with no keys.

## Providers and fallback

| Job | Order | Timeout |
|---|---|---|
| Officer answer for one job | Order from `GHATWATCH_ANSWER_PROVIDERS` (default `claude,cerebras`): Claude fast (`GHATWATCH_CLAUDE_FAST_MODEL`, default `claude-haiku-5-5`, thinking off, effort low, max_tokens 1200) → Cerebras → template | ~10 s Claude, ~8 s Cerebras |
| Alert rephrasing, brief polish | Cerebras (`CEREBRAS_MODEL`, default `gpt-oss-120b`) → Claude (`GHATWATCH_CLAUDE_MODEL`, default `claude-opus-5-5`, effort low) → template | ~8 s Cerebras, ~16 s Claude |
| Reading a PDF / photo | PDF text layer → PaddleOCR (if text is poor and OCR is installed) → Claude fallback (document or image block, structured JSON output) | OCR: measured 43-96 s for the 2-page scanned dummy on CPU (51/51 values exact); Claude ~30 s |

Every AI result records `provider`, `model` and `latency_ms`. Responses carry `ai_written: true|false`
and `numbers_checked: true`; the job answer also carries `extractor` (`text` | `ocr` | `claude`), so the UI can
show e.g. "OCR → Claude · 1.2 s". The extract stage log names the extractor used, in English and Hindi.

## Document reading (extract.py)

- Claude gets the file as a PDF `document` block or an `image` block and must return rows that match a
  strict JSON schema: page, table, site as printed, year, festival, phase, parameter as printed, value as
  printed, legible.
- `value_as_printed` is the cell exactly as printed. A blank cell is `""`; codes stay codes (`BDL`, `ND`,
  `*`, `**`, `_`, `-`). The intake normaliser then turns blanks into **not sampled** and codes into flags.
  **A blank is never turned into 0.**
- **Text-layer cross-check.** If the PDF has a text layer, every extracted number is looked up in that
  page's text. A number that isn't on its page is marked `text_check: "mismatch"` and its confidence drops
  to 0.4, so the validator flags it for officer review ("check against the page"). Unreadable cells are
  given confidence 0.5.
- Called only as the fallback (text + OCR gave no rows, or a scan/photo with OCR not installed). Returns
  `None` when there is no key, the file is too large, or the call fails; the stage then fails with the
  original reason (e.g. "PaddleOCR is not installed").

## Officer answer for one job (analyze.py)

The template answer is written first and is complete on its own: 3 to 5 short sentences covering what the
report shows (rows, breaches, the worst reading with its page), which ghat changed level, what to do
and where (test team / aerators / cleaning crew), by when (17 Oct for tests, 19 Oct for work, before visarjan on
20 Oct 2026), the forecast as a **model estimate, not a measurement**, and what is still missing
(blank / not-sampled cells, flagged values). The facts come only from the job's analysis (scoring + models).

The LLM prompt (`EXTRACTED`) holds the extracted rows (ghat, parameter, `value_as_printed`, page, flag,
phase, status, needs_review; up to 120 rows), the deterministic analysis (before/after tier per ghat,
breaches vs limits, the forecast as an estimate, gaps) and the template. It must say what the report
shows, which ghat needs what action by when (before 20 Oct 2026), and what is missing, without changing
any tier, action or deadline. Its output goes through the guards; numbers may come only from `EXTRACTED`
or the template, and every template number must stay.

## Alerts (alerts.py)

The triggers are deterministic rules over the ranking (official data plus accepted officer rows) and
accepted intake jobs:

| Rule | Severity | Action | Deadline |
|---|---|---|---|
| DO = 0 mg/l | critical | aerate | 19 Oct |
| DO < 3 mg/l | high | aerate | 19 Oct |
| BOD > 6 mg/l | high | clean | 19 Oct |
| No recent test (tier = insufficient data) | medium | test (pre-immersion sample) | 17 Oct |
| Flagged implausible value in accepted officer data | review | check against the page | 15 Oct |
| An accepted upload changed a ghat's tier | high (up) / info (down) | plan crews for the new level | 18 Oct |

Each alert has severity, ghat, message (en/hi), action, deadline and source (report, page, upload).
The message text is the reason text from scoring (with its page). The LLM may only rephrase the
message, under the same guards. Rule, severity, action and deadline never come from the LLM.

## Guards (guards.py); any failure means the template is used

1. **Numbers, both ways.** Every number in the AI text must be present in the input facts (no invented
   numbers), and every number in the template must still be in the AI text (no dropped numbers). Dates
   such as "20 Oct" and "19 अक्टूबर" are allowed. Devanagari digits are normalised first.
2. **No health claims.** English and Hindi word lists (health, disease, unsafe, toxic, skin, स्वास्थ्य,
   बीमारी, हानिकारक, ...). Readings are compared with limits; health effects are never claimed.
3. **Forecast is an estimate.** If a forecast is in the facts, the text must say "estimate" / "अनुमान";
   certainty words ("will breach", "definitely", "निश्चित रूप से") are rejected.
4. **Length cap.** At most 900 characters (English), 1100 (Hindi), 7 sentences; alerts 400 characters.

The brief polish (`brief.py`, `GHATWATCH_LLM_POLISH=1`) uses the same chain with a two-way number check
and the health-word check.

## Endpoints

- `GET /api/ai/status` → `{cerebras, claude, documents, text}` (booleans only, never keys).
- `GET /api/ai/alerts?lang=en|hi[&ai=0]` → `{lang, visarjan_date, count, alerts[], ai_written, provider, model, latency_ms, numbers_checked, rephrased}`.
- `POST /api/ai/jobs/{job_id}/analysis[?ai=0]` → `{job_id, text{en,hi}, ai_written, provider, model, latency_ms, numbers_checked, guards_failed[], facts}`.
  POST because it may call an LLM; results are cached by content, so the same job is not re-sent. 404 for an unknown job, 409 if the job has no analysis yet.

## Switching it on

Put the keys in `backend/.env` (gitignored; read by `ai/llm.py` on start) or export them before starting
the API:

```
CEREBRAS_API_KEY=...
ANTHROPIC_API_KEY=...
# optional: CEREBRAS_MODEL=gpt-oss-120b  GHATWATCH_CLAUDE_MODEL=claude-opus-5-5  GHATWATCH_AI=0 (force template)
# optional: GHATWATCH_CLAUDE_FAST_MODEL=claude-haiku-5-5  GHATWATCH_ANSWER_PROVIDERS=claude,cerebras
```

`ANTHROPIC_API_KEY` alone is enough for the main flow (fast Claude answers + Claude extraction fallback).
OCR for scans: `python3 -m venv backend/.ocr-venv && backend/.ocr-venv/bin/pip install paddlepaddle paddleocr pypdfium2`.

## Tests (backend/tests/test_ai.py)

No network, no keys. Mocked Cerebras and Claude. Covered: the invented-number guard, the two-way guard
and dates, health / estimate / length guards, the no-key template path (which itself passes every guard),
a good Cerebras output being used, invented-number and health-claim outputs falling back to the template,
the job answer using fast Claude first (Haiku, thinking off, effort low, ≤10 s, prompt holds the extracted rows),
Claude failure / guard failure falling through to Cerebras then the template, the `GHATWATCH_ANSWER_PROVIDERS`
and `GHATWATCH_CLAUDE_FAST_MODEL` overrides, Claude extraction keeping the parser row shape (blank stays "", text-layer
mismatch lowers confidence), every alert rule, unaccepted jobs not raising alerts, guarded alert
rephrasing, and the endpoints with no keys.

## Voice: "सुनें / Listen" (backend/ghatwatch/voice/, frontend/components/voice/)

Many field staff read with difficulty, so every ghat card, every alert, the report analysis and the brief's short
summary has a big **सुनें / Listen** button. Tap it to hear the text; tap again to stop. Only one clip plays at a
time across the app. "पूरा सुनें / Read all" on the alert list reads the top five alerts in order.

- **What is spoken.** Only text already on screen, which is the checked template or guarded AI text. Voice never
  creates a number or a tier. Ghat card: ghat name, status word, hint, main reason, first action. Alert: status word,
  ghat, message, action, deadline. Brief: the short summary (the same text WhatsApp sends).
- **Speech text** (`voice/normalize.py`, unit-tested). Before speaking, the backend rewrites screen text:
  `mg/l` becomes "मिलीग्राम प्रति लीटर" / "milligrams per litre", `DO` becomes "घुलित ऑक्सीजन" / "dissolved oxygen",
  `BOD` becomes "बी.ओ.डी.", `pH` becomes "पी.एच.", and `p. 28` / `पृष्ठ 28` become "पृष्ठ अट्ठाईस" / "page 28".
  In Hindi, numbers are spoken as Hindi words (`0.6` is "शून्य दशमलव छह", `2026` is "दो हज़ार छब्बीस"). Ranges,
  `<` `>` `%` and month names are spelled out. Icons (⛔ ⚠ → | ·), links and markdown are removed. The spoken text
  is capped at 1,200 characters and cut at a sentence end.
- **Engine.** `POST /api/voice/tts {text, lang}` calls ElevenLabs (`/v1/text-to-speech/{voice_id}`, 10 s timeout)
  and returns `audio/mpeg`. The default model is `eleven_multilingual_v2`, chosen for the most natural and stable
  Hindi. Its extra latency is hidden by the cache. Set `ELEVENLABS_MODEL=eleven_flash_v2_5` for about 75 ms latency
  at half the price per character. The default voices are Hindi "Kanika" (`H6QPv2pQZDcGqLwDTIJQ`, from the voice
  library) and English "George" (`JBFqnCBsd6RMkjVDRZzb`, premade). If your plan cannot use library voices through
  the API, set `ELEVENLABS_VOICE_ID_HI` to a premade or own voice.
- **Cache.** Audio is stored in `backend/voice_cache/` (gitignored), keyed by a hash of (spoken text, language,
  voice, model, format). A repeat tap costs no credits, and cached clips play even with no key or network to
  ElevenLabs. The browser also keeps clips in memory for the session.
- **Fallback.** With no key, or on any ElevenLabs error or timeout, the endpoint returns `503`
  `{"ok": false, "fallback": "browser", "reason": ...}`. The browser then speaks with its own voice
  (`speechSynthesis`, a Hindi voice if the device has one). If the device has no Hindi voice, a short note tells
  the user to read the text. A small label under the button shows "ElevenLabs" or "Browser voice".
  `GET /api/voice/status` returns booleans only.
- **Where the key goes.** Put it in `backend/.env` (gitignored): `ELEVENLABS_API_KEY=...`, plus the optional
  `ELEVENLABS_MODEL`, `ELEVENLABS_VOICE_ID_HI` and `ELEVENLABS_VOICE_ID_EN`. The key is read only on the server;
  the browser never sees it. `GHATWATCH_VOICE=0` turns ElevenLabs off.
- **Tests** (`backend/tests/test_voice.py`, no network): normalisation in Hindi and English, the no-key 503,
  mocked ElevenLabs request shape, cache hit (one upstream call for two taps), and timeout, network and 4xx giving
  503 without leaking the key.
