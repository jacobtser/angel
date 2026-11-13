# AGENTS.md — Kabete YC Smart Exam Hub

Static, multi-page website (no build step) in this folder. It hosts WASSCE past-paper PDFs and step-by-step AI-style explanations for English Language, Mathematics, and Management in Living.

## Run it

`python` in `C:\Windows\System32` is a Windows Store stub that silently does nothing. Use the launcher:

```powershell
py -3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`. Opening `index.html` via `file://` also works, but relative PDF links behave differently — prefer the server when testing downloads.

There is no `package.json`, no build, no tests, no linter, no CI. Do not invent `npm` commands.

## Layout

| File | Role |
| --- | --- |
| `index.html` | Landing page: hero, 3 subject cards, how-it-works |
| `papers.html` | Paper browser; filters to one subject via `?subject=` |
| `explanations.html` | Explanation viewer for one subject via `?subject=` |
| `guides.html` | Study guide: topic map + worked paper walkthrough via `?subject=` |
| `css/styles.css` | All styles; design tokens live in `:root` |
| `js/papers.js` | `SUBJECT_META` — canonical list of every PDF |
| `js/explanations.js` | `PAPERS` — sample question/answer/step data per subject |
| `js/guides/*.js` | Study-guide content: `window.GUIDES[subject]` = format, topics, papers |
| `js/guides.js` | Renders a study guide from `window.GUIDES` |

`papers.html` and `explanations.html` are shells filled in by their JS at load time — editing the HTML alone will not change their content.

## Adding or changing a paper

1. Put the PDF in the matching subject folder (`English Language/WASSCE/`, `Core Mathematics/WASSCE/`, `Management in Living/WASSCE/`).
2. Add an entry to `SUBJECT_META` in `js/papers.js`.
3. If it should be the card's default download, update the matching `href` in `index.html` **and** `pdf:` in `js/explanations.js`.

Folder names contain spaces, so hrefs must be percent-encoded (`English%20Language/WASSCE/wassce%202023%20english.pdf`). Keep that convention; unencoded paths break on the dev server.

## Naming traps

- The UI says **Mathematics**, but the folder is `Core Mathematics` and the query key is `mathematics`.
- Query keys are `english`, `mathematics`, `management` — not the folder names.
- `Management in Living/WASSCE/` has **no past paper**, only `Home_Economics_WAEC_2026_Timetable.pdf` (a timetable). Do not present it as a question paper; its card routes to the paper browser's empty state on purpose.
- `NovDec/` folders are empty (see their `README.txt`).

## Study-guide content

`js/guides/english.js`, `mathematics.js`, `management.js` register `window.GUIDES[subject]`. A guide has `format` (exam scheme), `topics` (concept map) and either `questions` or `papers[]` (each with its own `questions`). The renderer in `js/guides.js` supports both shapes.

Each question object: `{ n, q, a, why?, steps?[], tip?, flag? }`. Set `flag: true` when the source scan is damaged and the answer is uncertain — the UI shows a "check" badge.

Each guide may hold either a single `questions` array or a `papers[]` array (one entry per paper, each with its own `questions`). Essay questions get a model plan (`steps`) rather than a fake answer, since no single answer is correct. A guide may set `closingNote` to explain coverage limits.

Do not invent answers. Everything in the guides must be traceable to a paper or examiner report in this folder.

## What the PDFs actually contain

Only some are question papers, and **none contains an answer key**:

- `English Language/WASSCE/waec-2012-english.pdf` — Paper 1 + 2, text layer present but badly OCR'd (words garbled).
- `English Language/WASSCE/WASSCE_WAEC_MAY_JUNE_2016_...pdf` — Paper 1 + 2, scanned images; OCR works well.
- `English Language/WASSCE/wassce 2020 english.pdf`, `wassce 2023 english.pdf` — scanned, no text layer, but `rapidocr_onnxruntime` recovers Part A (Lexis & Structure) reliably.
- `English Language/WASSCE/LIFEMAG_waec-_-english.pdf`, `waec-_-english.pdf` — corrupt streams; pypdf cannot open them.
- `English Language/WASSCE/ENGLISH-LANGUAGE.pdf` — **syllabus only**, not a paper.
- `Core Mathematics/WASSCE/GENERAL-MATHEMATICS-...pdf` — **syllabus only**.
- `Core Mathematics/WASSCE/KUULCHAT_2021 Mathematics.pdf` — Chief Examiner's report; prints Paper 2 questions with worked solutions. Best maths source.
- `Management in Living/WASSCE/Home_Economics_WAEC_2026_Timetable.pdf` — a 2-page timetable, not a paper.

To extract text, `py -3 -m pip install pypdf pymupdf rapidocr-onnxruntime` is already installed. `pymupdf` opens the files pypdf rejects; `rapidocr_onnxruntime` OCRs the scanned pages (roughly 10–20 s per page — run it in the background).

## Do not touch

The repo root also holds personal documents that are **not** part of the site: `Results.txt`, `2025 Results.pdf`, `2026 Results.pdf`, `Angel's WACCE INVOICE.pdf`, `Auntie Angel UEW Forms.pdf`, `COLLECTION_SUMMARY.txt`, `DOWNLOAD_SUMMARY.txt`. Never delete, edit, or publish these.

## Git caveat

`git rev-parse --show-toplevel` returns `C:/Users/jacob` — the whole home directory is one repo, this folder is not its own. Running `git status`/`git add -A` here scans every project under the home dir and emits permission warnings. Scope git commands to explicit paths, and never run repo-wide destructive git commands.

## Design rules

- Trust = navy/indigo (`--navy-900`, `--indigo-600`); AI features = the violet→cyan gradient (`--violet-500` → `--cyber-500`).
- Reserve the gradient and `.btn-ai` for explanation features only; primary actions use `.btn-primary`.
- Fonts: Plus Jakarta Sans for headings, Inter for body. Mobile-first breakpoints at 960px and 620px.
