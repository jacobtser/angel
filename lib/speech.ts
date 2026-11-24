/**
 * Voice helpers.
 *
 * The Web Speech API is optional: some browsers ship only half of it, and
 * many phones have no speech-recognition service at all. Every entry point
 * reports whether it is available so the interface can hide the button rather
 * than fail silently.
 */

import type { VoiceStyle } from './types';

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function recognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

function cleanForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Guard: only read English aloud. A reply that drifts into another script
 * (Dangme, Twi, French with marks, non-Latin script) is skipped rather than
 * spoken with an English voice.
 */
function isEnglishSpeechText(text: string): boolean {
  const chars = Array.from(text.replace(/\s/g, ''));
  if (!chars.length) return true;
  const nonAscii = chars.filter((ch) => /[^\x00-\x7f]/.test(ch)).length;
  return nonAscii / chars.length < 0.15;
}

/**
 * Read a reply aloud. Long replies are split at sentence boundaries because
 * some Android voices stop abruptly after a few hundred characters.
 */
function pickPreferredVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Only English voices are ever used. A phone configured with a French,
  // Hausa, Twi or anything else default voice must not hijack the "English"
  // reply, otherwise the tutor sounds like he is speaking another language.
  const en = voices.filter((v) => /^en([-_]|$)/i.test((v.lang || '').toLowerCase()));
  const pool = en.length ? en : voices.filter((v) => !/^xx/i.test((v.lang || '').toLowerCase()));
  if (!pool.length) return null;
  const score = (v: SpeechSynthesisVoice) => {
    const name = `${v.name} ${v.voiceURI}`.toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    let s = 0;
    if (/en-gh|en-gb|en-uk|en-us|en-za|en-au|en-gh|en/.test(lang)) s += 2;
    if (/female|woman|girl|zira|samantha|victoria|karen|serena|libby|sonia|aria|jenny|michelle|hazel|google uk english female|google us english female|neural2-zira|samantha neural|google uk en female|microsoft zira|google uk en female/.test(name)) s += 5;
    if (/natural|neural|premium|enhanced|google us english female|google uk english female/.test(name)) s += 2;
    if (/male|david|mark|george|james|daniel|andrew|bradley|brian|eric/.test(name)) s -= 4;
    return s;
  };
  const pick = [...pool].sort((a, b) => score(b) - score(a))[0];
  // English voices only, whatever the pool came from.
  const voice = pick ?? pool[0];
  if ((voice.lang || '').toLowerCase().startsWith('en')) return voice;
  return null;
}

export function speak(text: string, options: { rate?: number; onEnd?: () => void } = {}): void {
  if (!speechSupported()) return;
  const clean = cleanForSpeech(text);
  if (!clean) return;

  const doSpeak = () => {
    window.speechSynthesis.cancel();
    const voice = pickPreferredVoice();
    if (!isEnglishSpeechText(clean)) {
      console.warn('Skipping non-English text for speech');
      return;
    }
    const sentences = clean.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let current = '';
    for (const sentence of sentences) {
      if ((current + ' ' + sentence).trim().length > 220 && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current = `${current} ${sentence}`;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || 'en-GB';
      } else {
        utterance.lang = 'en-GB';
      }
      utterance.rate = options.rate ?? 0.98;
      utterance.pitch = 1.0;
      if (index === chunks.length - 1) utterance.onend = () => options.onEnd?.();
      window.speechSynthesis.speak(utterance);
    });
  };

  // Voices may load asynchronously on some browsers/devices.
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    doSpeak();
  } else {
    let done = false;
    const handler = () => {
      if (done) return;
      done = true;
      window.speechSynthesis.removeEventListener?.('voiceschanged', handler as unknown as EventListener);
      doSpeak();
    };
    window.speechSynthesis.addEventListener?.('voiceschanged', handler as unknown as EventListener);
    window.setTimeout(() => {
      if (!done) {
        done = true;
        doSpeak();
      }
    }, 400);
  }
}

/* ------------------------------------------------------------------ *
 * Provider-backed speech
 *
 * Device voices vary wildly between phones. When the learner is online and
 * a speech-capable provider key is present, Jacob tries the AI providers
 * first (Groq → OpenAI → Gemini), then falls back to the device voice. If a
 * provider is out of quota, unreachable, or too slow, the next one is tried
 * automatically, so a spoken reply is never lost to one failing service.
 * ------------------------------------------------------------------ */

export const VOICE_STYLES: Array<{ id: VoiceStyle; label: string; hint: string }> = [
  { id: 'sweet', label: 'Sweet female', hint: 'Soft, kind and encouraging — the default.' },
  { id: 'warm', label: 'Warm female', hint: 'A little fuller and more sisterly.' },
  { id: 'bright', label: 'Bright female', hint: 'Lighter and more energetic.' },
  { id: 'device', label: 'Device voice', hint: 'Use the phone or browser voice only (works offline).' },
];

interface TtsKeys {
  groq: string;
  openai: string;
  gemini: string;
}

/** The included Groq voice runs through the server function (`api/ai.mjs`). */
const HOSTED_AI = process.env.NEXT_PUBLIC_HOSTED_AI === '1';

/** Speech request to Groq: direct with the learner's own key, otherwise via the server. */
function groqSpeechRequest(body: Record<string, unknown>, key: string): Promise<Response> {
  if (key) {
    return fetchWithTimeout('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
  }
  return fetchWithTimeout('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'speech', ...body }),
  });
}

/** The learner's saved provider key (build-time keys are no longer shipped). */
export function availableTtsKeys(primary?: { provider: string; apiKey: string }): TtsKeys {
  const keys: TtsKeys = { groq: '', openai: '', gemini: '' };
  const key = primary?.apiKey?.trim();
  if (key) {
    if (primary?.provider === 'groq' && !keys.groq) keys.groq = key;
    if (primary?.provider === 'openai' && !keys.openai) keys.openai = key;
    if (primary?.provider === 'gemini' && !keys.gemini) keys.gemini = key;
  }
  return keys;
}

const GROQ_VOICES: Record<Exclude<VoiceStyle, 'device'>, string> = {
  sweet: 'autumn',
  warm: 'hannah',
  bright: 'diana',
};

const OPENAI_VOICES: Record<Exclude<VoiceStyle, 'device'>, string> = {
  sweet: 'coral',
  warm: 'nova',
  bright: 'shimmer',
};

const GEMINI_VOICES: Record<Exclude<VoiceStyle, 'device'>, string> = {
  sweet: 'Aoede',
  warm: 'Sulafat',
  bright: 'Leda',
};

/* Groq's PlayAI voices are English-only and sound notably less synthetic
 * than device voices. `Celeste-PlayAI` leads; the rest are fallbacks. */
const GROQ_PLAYAI_VOICES: Record<Exclude<VoiceStyle, 'device'>, string> = {
  sweet: 'Celeste-PlayAI',
  warm: 'Cheyenne-PlayAI',
  bright: 'Deedee-PlayAI',
};

const VOICE_DIRECTION =
  'You are Jacob, a warm, human study companion for a WASSCE candidate. Speak naturally, with a smooth, conversational tone — like a caring older sister talking to a younger sibling over tea. Be gentle and unhurried, but lively and expressive: vary your pace and pitch as a real person does. Never sound robotic, flat, or rushed. Pronounce words clearly. Speak only English.';

let currentAudio: HTMLAudioElement | null = null;
let currentUrl: string | null = null;
let playToken = 0;

function releaseAudio(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch {
      /* ignore */
    }
    currentAudio = null;
  }
  if (currentUrl) {
    URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  }
}

async function fetchWithTimeout(url: string, init: RequestInit, ms = 12000): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

async function playBlob(blob: Blob, token: number, onEnd?: () => void): Promise<boolean> {
  if (!blob.size || token !== playToken) return false;
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  currentAudio = audio;
  currentUrl = url;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (started: boolean) => {
      if (settled) return;
      settled = true;
      resolve(started);
    };
    const cleanup = () => {
      URL.revokeObjectURL(url);
      if (currentUrl === url) {
        currentUrl = null;
        currentAudio = null;
      }
    };
    audio.onended = () => {
      cleanup();
      onEnd?.();
      finish(true);
    };
    audio.onerror = () => {
      cleanup();
      finish(false);
    };
    audio.play().catch(() => {
      cleanup();
      // A pause triggered by stopSpeaking() is not a failure: do not fall back.
      finish(token !== playToken);
    });
  });
}

function pcmBase64ToWav(base64: string, sampleRate: number): Blob | null {
  try {
    const binary = atob(base64);
    const pcm = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) pcm[i] = binary.charCodeAt(i);
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const write = (offset: number, text: string) => {
      for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i));
    };
    write(0, 'RIFF');
    view.setUint32(4, 36 + pcm.length, true);
    write(8, 'WAVE');
    write(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    write(36, 'data');
    view.setUint32(40, pcm.length, true);
    return new Blob([header, pcm], { type: 'audio/wav' });
  } catch {
    return null;
  }
}

async function tryGroqSpeech(
  clean: string,
  voice: Exclude<VoiceStyle, 'device'>,
  key: string,
  token: number,
  onEnd?: () => void,
): Promise<boolean> {
  try {
    const res = await groqSpeechRequest(
      {
        model: 'canopylabs/orpheus-v1-english',
        voice: GROQ_VOICES[voice],
        input: `[warmly] ${clean.slice(0, 4000)}`,
        response_format: 'wav',
      },
      key,
    );
    if (!res.ok || token !== playToken) return false;
    return await playBlob(await res.blob(), token, onEnd);
  } catch {
    return false;
  }
}

async function tryGroqPlayaiSpeech(
  clean: string,
  voice: Exclude<VoiceStyle, 'device'>,
  key: string,
  token: number,
  onEnd?: () => void,
): Promise<boolean> {
  try {
    const res = await groqSpeechRequest(
      {
        model: 'playai-tts',
        voice: GROQ_PLAYAI_VOICES[voice],
        input: clean.slice(0, 4000),
        response_format: 'wav',
      },
      key,
    );
    if (!res.ok || token !== playToken) return false;
    return await playBlob(await res.blob(), token, onEnd);
  } catch {
    return false;
  }
}

async function tryOpenAiSpeech(
  clean: string,
  voice: Exclude<VoiceStyle, 'device'>,
  key: string,
  token: number,
  onEnd?: () => void,
): Promise<boolean> {
  try {
    const res = await fetchWithTimeout('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice: OPENAI_VOICES[voice],
        input: clean.slice(0, 4000),
        response_format: 'mp3',
        instructions: VOICE_DIRECTION,
      }),
    });
    if (!res.ok || token !== playToken) return false;
    return await playBlob(await res.blob(), token, onEnd);
  } catch {
    return false;
  }
}

async function tryGeminiSpeech(
  clean: string,
  voice: Exclude<VoiceStyle, 'device'>,
  key: string,
  token: number,
  onEnd?: () => void,
): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${VOICE_DIRECTION}\n\nSay this:\n${clean.slice(0, 3500)}` }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: GEMINI_VOICES[voice] } } },
          },
        }),
      },
    );
    if (!res.ok || token !== playToken) return false;
    const data = await res.json();
    const parts: Array<{ inlineData?: { data?: string; mimeType?: string } }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    const inline = parts.find((part) => part.inlineData?.data)?.inlineData;
    if (!inline?.data || token !== playToken) return false;
    const rate = Number(/rate=(\d+)/.exec(inline.mimeType || '')?.[1] || 24000);
    const wav = pcmBase64ToWav(inline.data, rate);
    if (!wav) return false;
    return await playBlob(wav, token, onEnd);
  } catch {
    return false;
  }
}

/**
 * Speak a reply with the best available female voice. Providers are tried in
 * order and fall through on any failure; the device voice is the final
 * fallback, so this works offline too.
 */
export function speakSmart(
  text: string,
  options: {
    style?: VoiceStyle;
    rate?: number;
    keys?: TtsKeys;
    onEnd?: () => void;
    forceDevice?: boolean;
  } = {},
): void {
  const clean = cleanForSpeech(text);
  if (!clean) return;
  if (!isEnglishSpeechText(clean)) {
    console.warn('Skipping non-English text for speech');
    return;
  }

  stopSpeaking();
  const token = playToken;
  const style = options.style ?? 'sweet';

  if (options.forceDevice || style === 'device' || (typeof navigator !== 'undefined' && !navigator.onLine)) {
    speak(clean, { rate: options.rate, onEnd: options.onEnd });
    return;
  }

  const keys = options.keys ?? availableTtsKeys();

  void (async () => {
    const useGroq = Boolean(keys.groq) || HOSTED_AI;
    if (useGroq && (await tryGroqPlayaiSpeech(clean, style, keys.groq, token, options.onEnd))) return;
    if (token !== playToken) return;
    if (useGroq && (await tryGroqSpeech(clean, style, keys.groq, token, options.onEnd))) return;
    if (token !== playToken) return;
    if (keys.openai && (await tryOpenAiSpeech(clean, style, keys.openai, token, options.onEnd))) return;
    if (token !== playToken) return;
    if (keys.gemini && (await tryGeminiSpeech(clean, style, keys.gemini, token, options.onEnd))) return;
    if (token !== playToken) return;
    speak(clean, { rate: options.rate, onEnd: options.onEnd });
  })();
}

export function stopSpeaking(): void {
  playToken += 1;
  releaseAudio();
  if (speechSupported()) window.speechSynthesis.cancel();
}

interface RecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
}

interface RecognitionErrorEvent {
  error: string;
}

interface RecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type RecognitionCtor = new () => RecognitionLike;

/**
 * Start dictation. Returns a stop function, or null when unsupported.
 * The caller receives text only when the engine has a final transcript.
 */
export function listen(
  onResult: (text: string) => void,
  onStateChange?: (listening: boolean) => void,
): (() => void) | null {
  if (!recognitionSupported()) return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;

  const recognition = new Ctor();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-GB';

  let finalText = '';
  recognition.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (result.isFinal) finalText += `${result[0].transcript} `;
      else interim += result[0].transcript;
    }
    if (finalText.trim() || interim.trim()) onResult((finalText + interim).trim());
  };
  recognition.onerror = () => onStateChange?.(false);
  recognition.onend = () => onStateChange?.(false);

  try {
    recognition.start();
    onStateChange?.(true);
  } catch {
    onStateChange?.(false);
    return null;
  }

  return () => {
    try {
      recognition.stop();
    } catch {
      /* already stopped */
    }
    onStateChange?.(false);
  };
}
