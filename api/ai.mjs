/**
 * POST /api/ai — server-side proxy for the included Groq connection.
 *
 * The Groq key lives only in the Vercel environment (GROQ_API_KEY, or the
 * older NEXT_PUBLIC_GROQ_API_KEY name) and is never shipped to the browser.
 * Learners who add their own key in Settings still call providers directly.
 *
 * Body:
 *   { kind: "chat",   model, system, messages: [{ role, content }] }
 *   { kind: "speech", model, voice, input, response_format }
 */

const CHAT_MODELS = new Set([
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
]);
const SPEECH_MODELS = new Set(['playai-tts', 'canopylabs/orpheus-v1-english']);
const MAX_SYSTEM = 16000;
const MAX_MESSAGE = 6000;
const MAX_MESSAGES = 10;
const MAX_SPEECH_INPUT = 4000;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 30;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    if (hits.size > 2000) {
      for (const [key, value] of hits) if (value.resetAt <= now) hits.delete(key);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function sameOrigin(req) {
  const fetchSite = req.headers['sec-fetch-site'];
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') return false;
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function groqKey() {
  return (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || '').trim();
}

function fail(res, status, error) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json({ error });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'Method not allowed.');
  }
  if (!sameOrigin(req)) return fail(res, 403, 'Forbidden.');

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return fail(res, 429, 'Too many requests. Please wait a moment.');

  const key = groqKey();
  if (!key) return fail(res, 503, 'The included AI connection is not configured.');

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  try {
    if (body.kind === 'chat') {
      const model = CHAT_MODELS.has(body.model) ? body.model : 'openai/gpt-oss-120b';
      const system = typeof body.system === 'string' ? body.system.slice(0, MAX_SYSTEM) : '';
      const messages = (Array.isArray(body.messages) ? body.messages : [])
        .slice(-MAX_MESSAGES)
        .filter(
          (m) =>
            m &&
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' &&
            m.content.trim(),
        )
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }));
      if (!messages.length) return fail(res, 400, 'No message to send.');

      const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          max_tokens: 900,
          messages: [{ role: 'system', content: system }, ...messages],
        }),
        signal: AbortSignal.timeout(25_000),
      });
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        console.error('[api/ai] chat upstream', upstream.status, data?.error?.message);
        return fail(res, upstream.status === 429 ? 429 : 502, 'The AI service could not answer right now.');
      }
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text !== 'string' || !text.trim()) return fail(res, 502, 'The AI service returned an empty reply.');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ text: text.trim() });
    }

    if (body.kind === 'speech') {
      const model = SPEECH_MODELS.has(body.model) ? body.model : 'playai-tts';
      const input = typeof body.input === 'string' ? body.input.slice(0, MAX_SPEECH_INPUT) : '';
      const voice = typeof body.voice === 'string' ? body.voice.slice(0, 64) : '';
      if (!input.trim() || !voice) return fail(res, 400, 'Nothing to say.');

      const upstream = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model, voice, input, response_format: 'wav' }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!upstream.ok) {
        const detail = await upstream.text().catch(() => '');
        console.error('[api/ai] speech upstream', upstream.status, model, detail.slice(0, 300));
        return fail(res, 502, 'Speech is unavailable right now.');
      }
      const audio = Buffer.from(await upstream.arrayBuffer());
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'audio/wav');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(audio);
    }

    return fail(res, 400, 'Unknown request.');
  } catch (error) {
    console.error('[api/ai]', error instanceof Error ? error.message : error);
    return fail(res, 502, 'The AI service could not be reached.');
  }
}
