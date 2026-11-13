/**
 * Voice helpers.
 *
 * The Web Speech API is optional: some browsers ship only half of it, and
 * many phones have no speech-recognition service at all. Every entry point
 * reports whether it is available so the interface can hide the button rather
 * than fail silently.
 */

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
 * Read a reply aloud. Long replies are split at sentence boundaries because
 * some Android voices stop abruptly after a few hundred characters.
 */
function pickPreferredVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const score = (v: SpeechSynthesisVoice) => {
    const name = `${v.name} ${v.voiceURI}`.toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    let s = 0;
    if (/en-gh|en_ng|en-gb|en-us|en-za|en-au|en/.test(lang)) s += 2;
    if (/female|woman|girl|zira|susan|samantha|victoria|karen|serena|libby|sonia|aria|jenny|michelle|hazel|google uk english female/.test(name)) s += 5;
    if (/natural|neural|premium|enhanced/.test(name)) s += 2;
    if (/male|david|mark|george|james|daniel/.test(name)) s -= 4;
    return s;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0] || null;
}

export function speak(text: string, options: { rate?: number; onEnd?: () => void } = {}): void {
  if (!speechSupported()) return;
  const clean = cleanForSpeech(text);
  if (!clean) return;

  const doSpeak = () => {
    window.speechSynthesis.cancel();
    const voice = pickPreferredVoice();
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
      utterance.rate = options.rate ?? 0.95;
      utterance.pitch = 1.05;
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
      window.speechSynthesis.removeEventListener?.('voiceschanged', handler as any);
      doSpeak();
    };
    window.speechSynthesis.addEventListener?.('voiceschanged', handler as any);
    window.setTimeout(() => { if (!done) { done = true; doSpeak(); } }, 400);
  }
}

export function stopSpeaking(): void {
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
