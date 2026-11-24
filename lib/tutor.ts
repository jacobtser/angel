import type { AiProvider, AiSettings, SubjectId } from './types';
import { matchFaq } from '@/content/tutorFaq';

export interface TutorContext {
  subjectId?: SubjectId;
  label?: string;
  topicId?: string;
  topicTitle?: string;
  bigIdea?: string;
  analogy?: string;
  pitfalls?: string[];
  question?: string;
  textTitle?: string;
  learnerName?: string;
  /** Rich, pre-formatted foreknowledge for the current screen/module (lesson, paper, literature, etc.). */
  knowledge?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  offline?: boolean;
}

export const PROVIDER_DEFAULT_MODELS: Record<AiProvider, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-sonnet-latest',
  gemini: 'gemini-2.0-flash',
  groq: 'openai/gpt-oss-120b',
  deepseek: 'deepseek-chat',
  openrouter: 'openai/gpt-4o-mini',
};

/** Server-side connection (see `api/ai.mjs`): the key never reaches the browser. */
const HOSTED_AI_ENDPOINT = '/api/ai';

export function hostedAiAvailable(): boolean {
  return process.env.NEXT_PUBLIC_HOSTED_AI === '1';
}

export function defaultAiSettings(): AiSettings {
  if (hostedAiAvailable()) {
    return { provider: 'groq', apiKey: '', model: PROVIDER_DEFAULT_MODELS.groq, proxyUrl: '' };
  }
  return { provider: 'openai', apiKey: '', model: PROVIDER_DEFAULT_MODELS.openai, proxyUrl: '' };
}

/** True when this build ships with an included connection, so Jacob can go online with no setup. */
export function hasIncludedAi(): boolean {
  return hostedAiAvailable();
}

async function askHosted(
  model: string,
  system: string,
  history: { role: 'user' | 'assistant'; content: string }[],
): Promise<string> {
  const res = await fetch(HOSTED_AI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'chat', model, system, messages: history }),
  });
  if (!res.ok) throw new Error(await friendlyError(res));
  const data = await res.json();
  const text = data?.text;
  if (typeof text !== 'string' || !text.trim()) throw new Error('The AI service returned an unexpected response.');
  return text.trim();
}

export function contextLabel(context: TutorContext): string | null {
  if (context.label) return context.label;
  if (context.topicTitle) return context.topicTitle;
  if (context.textTitle) return context.textTitle;
  return null;
}

export function buildSystemPrompt(context: TutorContext): string {
  const subjectNames: Record<SubjectId, string> = {
    english: 'English Language',
    mathematics: 'Core Mathematics',
    management: 'Management in Living',
  };

  const EN_ONLY_NOTICE = 'Always reply in English only. Never switch to French, Dangme, Twi, or any other language, even if the learner asks in another language. Respond to the learner’s message using this context naturally (do not dump the context back).';
  const learner = context.learnerName?.trim() || 'the learner';

  const contextLines = [
    `Learner's name: ${learner}. Use the name naturally when helpful (do not overuse it).`,
    context.subjectId ? `Subject: ${subjectNames[context.subjectId]}.` : '',
    context.topicTitle ? `Topic/module on screen: ${context.topicTitle}.` : '',
    context.bigIdea ? `Big idea: ${context.bigIdea}` : '',
    context.analogy ? `Analogy shown: ${context.analogy}` : '',
    context.pitfalls?.length ? `Known pitfalls: ${context.pitfalls.join(' | ')}` : '',
    context.question ? `Exact question on screen: ${context.question}` : '',
    context.textTitle ? `Literature text on screen: ${context.textTitle}.` : '',
    context.label ? `Current screen: ${context.label}.` : '',
  ].filter(Boolean);

  const knowledgeBlock = context.knowledge?.trim()
    ? `\n\nINBUILT FOREKNOWLEDGE FOR THIS SCREEN/MODULE (authoritative for what is being taught/asked here; use it to answer accurately; do not invent details beyond it):\n${context.knowledge.trim().slice(0, 12000)}`
    : '';

  return `You are Jacob, the study companion inside "Auntie Angel", a WASSCE revision app in Ghana.

WHO YOU ARE
- Warm, calm, dignified. You treat the learner as an intelligent adult (including private candidates/resitters). Never shame or infantilise.

HOW YOU TEACH — SOCRATIC FIRST
- NEVER hand over the final answer immediately.
- Start with one focused question, one small hint, or ask for the learner’s first step/thinking.
- If stuck, break it into the smallest next step. If the learner has genuinely attempted or explicitly asks for the model answer after reflecting, scaffold the full method step by step, then state the answer and why it works.
- Essays/literature: do not write the full essay. Help plan point/thesis, paragraph jobs, and evidence/quotation use.
- Maths: ask what is known and what is asked, then guide substitution/working (do not jump straight to the formula/answer).
- Comprehension/summary: point back to evidence in the passage and ask for the point in the learner’s own words before refining.
- Management in Living: move from definition to application (e.g. a Ghanaian household).

ACCURACY & USE OF FOREKNOWLEDGE
- Use the CONTEXT and INBUILT FOREKNOWLEDGE below to respond accurately and specifically to the current module/topic/question/text on screen.
- If the foreknowledge contains answers, worked steps, or explanations, use them to guide and check understanding; reveal/model them only after Socratic guidance or when the learner asks after attempting.
- Never invent WAEC facts, quotations, dates, statistics, or set-text details. If not in the provided knowledge, say so briefly and point to the paper/syllabus/text on screen.

RESPONSE LENGTH & TONE
- Be concise by default (a few focused sentences or short steps). Give a fuller, detailed explanation only when the learner asks for detail or clearly needs step-by-step scaffolding.
- Short paragraphs, plain English (~Grade 7 reading level) but never childish. Use **bold** sparingly for key terms.
- If anxious, acknowledge briefly and shrink the next task. Never claim to be human.

CONTEXT AVAILABLE
${contextLines.length ? contextLines.join('\n') : 'No specific topic is open; this may be a general study question.'}${knowledgeBlock}

Respond to the learner’s message using this context naturally (do not dump the context back).
${EN_ONLY_NOTICE}`;
}

const OFFLINE_END = '\n\n_This reply came from the offline guide stored on your device. Go online for a deeper back-and-forth._';

export function localTutorReply(text: string, context: TutorContext): string {
  const faq = matchFaq(text);
  if (faq) return `${faq.answer}${OFFLINE_END}`;

  // Make light use of inbuilt knowledge when present (kept brief for offline).
  const knowledgeHint = context.knowledge ? `\n\n(Guide note: I have this module’s key info on this device and can help you work through it step by step.)` : '';

  if (context.question) {
    return `Let’s slow this one down. You are looking at:\n\n> ${context.question}\n\nBefore we choose an answer, tell me **what the question is actually asking** — a definition, a calculation, or a judgement? Underline the command word and predict your own answer first.\n\nIf you’ve tried, share your first step and I’ll check where it holds or slips.${knowledgeHint}${OFFLINE_END}`;
  }

  if (context.topicTitle) {
    const parts = [
      `We are in **${context.topicTitle}**.`,
      context.bigIdea ? `Big idea: ${context.bigIdea}` : '',
      context.analogy ? `Picture to hold: ${context.analogy}` : '',
      context.pitfalls?.length ? `Watch out for: ${context.pitfalls[0]}` : '',
      'Which part feels unclear — the idea, the method, or the exam wording? I’ll take that one piece first.',
    ].filter(Boolean);
    return `${parts.join('\n\n')}${knowledgeHint}${OFFLINE_END}`;
  }

  if (context.textTitle) {
    return `We are looking at **${context.textTitle}**. A good literature answer: make a point, give short evidence, then explain the effect.\n\nWhich character, theme or question are you working on? Tell me and I’ll help you shape one paragraph.${knowledgeHint}${OFFLINE_END}`;
  }

  return `I’m here. I can help with an essay plan, a maths step, comprehension, or a literature question.\n\nWhat are you working on right now, and what is your first thought about it?${knowledgeHint}${OFFLINE_END}`;
}

interface AskInput {
  settings: AiSettings;
  messages: ChatMessage[];
  context: TutorContext;
}

async function askOpenAICompatible(
  endpoint: string,
  apiKey: string,
  model: string,
  system: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  extraHeaders: Record<string, string> = {},
): Promise<string> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 900,
      messages: [{ role: 'system', content: system }, ...history],
    }),
  });
  if (!res.ok) throw new Error(await friendlyError(res));
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) throw new Error('The AI service returned an unexpected response.');
  return text.trim();
}

async function callProviderDirect(
  provider: AiProvider,
  apiKey: string,
  model: string,
  system: string,
  history: { role: 'user' | 'assistant'; content: string }[],
): Promise<string> {
  if (provider === 'openai') {
    return askOpenAICompatible('https://api.openai.com/v1/chat/completions', apiKey, model, system, history);
  }
  if (provider === 'groq') {
    return askOpenAICompatible('https://api.groq.com/openai/v1/chat/completions', apiKey, model, system, history);
  }
  if (provider === 'deepseek') {
    return askOpenAICompatible('https://api.deepseek.com/chat/completions', apiKey, model, system, history);
  }
  if (provider === 'openrouter') {
    return askOpenAICompatible(
      'https://openrouter.ai/api/v1/chat/completions',
      apiKey,
      model,
      system,
      history,
      { 'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '', 'X-Title': 'Auntie Angel' },
    );
  }
  if (provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: 900,
        temperature: 0.4,
        system,
        messages: history,
      }),
    });
    if (!res.ok) throw new Error(await friendlyError(res));
    const data = await res.json();
    const text = data?.content?.find?.((part: { type: string }) => part.type === 'text')?.text;
    if (typeof text !== 'string') throw new Error('Claude returned an unexpected response.');
    return text.trim();
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: history.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 900 },
      }),
    },
  );
  if (!res.ok) throw new Error(await friendlyError(res));
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('');
  if (typeof text !== 'string' || !text.trim()) throw new Error('Gemini returned an empty reply.');
  return text.trim();
}

/**
 * Calls the chosen provider directly from the browser when online and configured.
 * For a personal, single-learner offline app this can be acceptable, but a public
 * deployment should use the proxy option so keys never ship to the client.
 * If a direct provider call fails, other configured provider keys (from settings/env)
 * are tried as fallbacks before returning an error (caller may then use offline guide).
 */
export async function askTutor({ settings, messages, context }: AskInput): Promise<string> {
  const system = buildSystemPrompt(context);
  const history = messages
    .filter((m) => m.content.trim())
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content }));
  const requestedModel = (() => {
    const saved = settings.model?.trim();
    if (!saved) return PROVIDER_DEFAULT_MODELS[settings.provider];
    // Retire model ids from earlier builds that the provider has since removed.
    if (settings.provider === 'groq' && saved.includes('llama-3.3-70b')) return PROVIDER_DEFAULT_MODELS.groq;
    return saved;
  })();

  if (settings.proxyUrl.trim()) {
    const res = await fetch(settings.proxyUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(settings.apiKey ? { Authorization: `Bearer ${settings.apiKey}` } : {}),
      },
      body: JSON.stringify({
        provider: settings.provider,
        model: requestedModel,
        system,
        messages: history,
      }),
    });
    if (!res.ok) throw new Error(await friendlyError(res));
    const data = await res.json();
    const text = data.text ?? data.content ?? data.message ?? data?.choices?.[0]?.message?.content;
    if (typeof text !== 'string' || !text.trim()) throw new Error('The proxy returned an empty reply.');
    return text.trim();
  }

  const candidates: Array<() => Promise<string>> = [];

  // Primary: the learner's own key from Settings, called directly.
  const ownKey = settings.apiKey.trim();
  if (ownKey) {
    candidates.push(() => callProviderDirect(settings.provider, ownKey, requestedModel, system, history));
  }
  // Fallback: the included server-side connection for this build.
  if (hostedAiAvailable()) {
    const hostedModel = settings.provider === 'groq' ? requestedModel : PROVIDER_DEFAULT_MODELS.groq;
    candidates.push(() => askHosted(hostedModel, system, history));
  }

  if (!candidates.length) throw new Error('NO_KEY');

  let lastError: unknown = null;
  for (const run of candidates) {
    try {
      return await run();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('The AI service could not be reached.');
}

async function friendlyError(res: Response): Promise<string> {
  let detail = '';
  try {
    const body = await res.json();
    detail = body?.error?.message ?? body?.message ?? '';
  } catch {
    /* ignore */
  }
  if (res.status === 401 || res.status === 403) {
    return `The AI connection was rejected (${res.status}). If you added your own key, check it in Settings. ${detail}`.trim();
  }
  if (res.status === 429) {
    return 'The AI service is rate-limiting requests. Wait a moment, or keep using the offline guide.';
  }
  return `The AI service returned ${res.status}. ${detail}`.trim();
}

