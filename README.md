# Auntie Angel

Auntie Angel is a calm, offline-first **WASSCE study companion** built as a static **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion** Progressive Web App.

It is designed for a private candidate resitting:

- **English Language** (priority 1)
- **Management in Living** (priority 2)
- **Core Mathematics** (priority 3)

The app keeps progress on the learner’s device, works after installation/offline save where supported, and includes lessons, practice, past-paper viewing, literature/orals support, games, wellbeing/journal tools, and a Socratic tutor (“Jacob”).

> **Not an official WAEC product.** Use it as a study companion alongside your school, syllabus, and official WAEC information.

## What is in this MVP

- **Personalized dashboard:** greeting, affirmation, exam countdown (editable/provisional), streak, today/week study time, XP/level, readiness rings, focus card, daily challenge, mood check-in.
- **Subject hubs and lessons:** English, Core Mathematics, Management in Living topics with lesson flow (analogy/example/worked steps/practice), deeper-dive content, flashcards, quizzes.
- **English support:** lexis/structure/comprehension/essay/orals content, literature library (set texts + poems) with summaries/themes/characters/quotes/essay guidance, oral English trainer, and a local WASSCE oral exam video module with offline save/progress tracking.
- **Practice:** quick practice, timed mocks, past-papers browser/viewer, flashcard review (SM-2 spaced repetition helpers), worked items adapted from project sources.
- **Games:** Word Match, Comprehension Dash, Number Quest, Budget Balance, Flashcard Duel.
- **Progress & wellbeing:** readiness/analytics, mood trail, weekly journal with local insight generation, breathing reset, burnout/long-study reminders (in-app, configurable).
- **Jacob tutor:** floating chat on pages, Socratic-first prompting, context-aware help, optional voice input/output (Web Speech API, feature-detected), offline fallback replies, configurable OpenAI/Anthropic/Gemini provider or proxy.
- **PWA/offline:** install prompt support (`beforeinstallprompt` where available), manifest/icons, service-worker app-shell precache (production build), per-subject “Save offline” download flow, offline page/fallback behavior.
- **Accessibility & UX:** mobile-first layout, dark/light/system theme, reduced-motion support, WCAG-conscious contrast and focus styles, warm empathetic tone.

## Tech stack

- **Next.js 14.2** (App Router, static export) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for UI animation (with reduced-motion handling)
- **IndexedDB + localStorage mirror** for local-first state/progress (no Supabase/backend)
- **Service Worker + Cache Storage** for app-shell precache and explicit subject downloads

## Project structure

```text
app/                  # App Router pages/routes
components/           # UI, dashboard, lesson/practice, tutor, games, providers, shell
content/              # Subjects, topics, quizzes, literature, past-paper data, wellbeing, games metadata
lib/                  # Types, store, progress/readiness, spaced repetition, tutor, offline/PWA, utils
public/               # Manifest, icons, OG image, PDFs copied for serving
  papers/             # URL-safe copies of subject PDFs used by the app
scripts/              # Service worker template, precache generator, icon generator
css/ js/ *.html       # Legacy static site files (kept intact)
English Language/     # Original source PDFs/materials (kept intact)
Core Mathematics/     # Original source PDFs/materials (kept intact)
Management in Living/ # Original source/timetable materials (kept intact)
```

## Local development

### Prerequisites

- **Node.js** 20+ recommended (tested with Node 24.x)
- **npm** 10+ (tested with npm 11.x)
- **Python 3** launcher available as `py -3` (used by the default static preview script on Windows)

### Install

```powershell
npm install
```

### Run the dev server (development mode)

```powershell
npm run dev
```

Open `http://localhost:3000`.

> Service worker registration is enabled for production builds only. Use a production build + preview server to verify offline/install behavior.

### Typecheck

```powershell
npm run typecheck
```

### Production build (static export)

```powershell
npm run build
```

This runs:

1. `next build` → outputs static site to `out/`
2. `node scripts/generate-precache.mjs` → injects build hash/precache list into `out/sw.js`

### Preview the production build

```powershell
npm start
```

This serves `out/` at `http://127.0.0.1:8765` using:

```powershell
py -3 -m http.server 8765 --directory out
```

(If `py -3` is unavailable on your machine, serve `out/` with any static file server.)

## PWA and offline behavior

- **Manifest:** `public/manifest.webmanifest` (copied to `out/` on build)
- **Service worker:** generated as `out/sw.js` after build from `scripts/sw-template.js`
  - Precaches the **app shell** (HTML/JS/CSS/fonts/icons/manifest) for the built version
  - Uses network-first for navigations with cache/offline fallback
  - Uses cache-first for static assets
  - PDFs/downloads can be served from cache when saved; otherwise unavailable offline
- **Per-subject “Save offline”:** stores subject routes/pages and available paper assets in a named Cache Storage bucket (see `lib/offline.ts`, cache name `auntie-angel-downloads-v1`)
- **Important:** static export means no server runtime. Installability/offline support depends on HTTPS (or localhost) and browser support.

## Jacob (AI tutor) configuration

Jacob is **Socratic-first**: it asks/hints/scaffolds before giving full answers.

### Modes

- **Online when connected (if configured):** when the device is online and a provider key/proxy is set, Jacob uses the live AI for fuller, context-aware help.
- **Offline fallback (always available):** when offline, or if the live service cannot be reached, Jacob uses the on-device guide so study can continue.
- **Direct provider call (optional):** learner can add/select a provider and key in **Settings → Jacob’s AI**. Supported providers include Groq, OpenRouter, DeepSeek, OpenAI, Anthropic, and Google Gemini. Keys/settings are stored in that browser’s local storage.
- **Proxy mode (recommended for shared/public use):** set a proxy URL in Settings; if provided, the app sends requests to the proxy instead of calling providers directly.
- **Personal build convenience:** for this local/personal app, keys present in `.env`/`.env.local` (e.g. `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `DEEPSEEK_API_KEY` or `NEXT_PUBLIC_*` equivalents) can be embedded at build time via `next.config.mjs` to preconfigure the tutor. Do not use embedded keys in a public/shared deployment.

### Security note (important)

This app is a **static, client-side** PWA. A provider API key entered in Settings can be read by anyone with access to that browser profile/device. **Do not use direct provider keys on shared/public devices or deployments.** For public use, implement a server-side proxy that holds secrets and enforces limits.

### Proxy contract

The app sends:

```json
{
  "provider": "openai | anthropic | gemini",
  "model": "<model name>",
  "system": "<system prompt>",
  "messages": [{ "role": "user|assistant", "content": "..." }]
}
```

The proxy should return:

```json
{ "text": "reply text" }
```

(If you include an `Authorization: Bearer <token>` flow, the app can forward the configured key/token to your proxy; keep secrets server-side in production.)

## Content, sources, and academic integrity

- Past-paper/practice content in this project is derived from WAEC materials and examiner-report sources present in this repository, or clearly presented as original practice where applicable.
- Explanations are paraphrased/simplified for learning; **do not treat the app as an answer key authority**. When a source scan is unclear/damaged, uncertain items should be flagged for checking rather than stated as certain.
- **Management in Living:** this repo currently contains a timetable in `Management in Living/WASSCE/`, not a WASSCE past question paper. MIL practice in the app is presented accordingly (original/practice content), not as a past paper.
- **Literature cycle caveat:** literature notes are aligned to the **Ghana core English 2022–2026** set-text cycle as represented in project content. **Private candidates and anyone sitting in a later/new exam year must confirm the current/active WAEC set-text list for their paper with their school or [ghanawaec.org](https://ghanawaec.org/)** before relying on it for exam preparation. Use the in-app filters to focus on the texts confirmed for your exam.

## Deployment

Because this is a static export (`out/`), you can deploy to any static host (Vercel static, Netlify, GitHub Pages, Cloudflare Pages, S3+CDN, etc.).

1. Set `NEXT_PUBLIC_SITE_URL` appropriately for build-time metadata if needed.
2. Run `npm run build`.
3. Deploy the contents of `out/`.
4. Serve over **HTTPS** for PWA install/service-worker features.
5. Ensure SPA-style fallback is **not** required for known routes (all routes are pre-rendered), but your host should serve static files normally.

## Known limitations / notes

- No backend, accounts, or cloud sync; clearing browser/site data removes local progress unless exported/backed up in-app.
- `out/sw.js` is generated after build (not stored in `public/`).
- Voice input/output depends on browser Web Speech API support.
- Direct AI provider calls from the browser may be affected by provider CORS/policy changes; proxy mode is the robust option.
- Legacy static files and original source documents/PDFs in the repository are preserved; the Next.js app is the primary experience.

## Legacy site

The repository also contains the earlier static website (`index.html`, `papers.html`, etc.) and original source materials. These have been left in place and are not replaced by the Next.js app.

