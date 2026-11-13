'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { askTutor, localTutorReply, type ChatMessage, type TutorContext } from '@/lib/tutor';
import { speakSmart, stopSpeaking, availableTtsKeys } from '@/lib/speech';
import { useAppStore } from '@/lib/store';

interface TutorValue {
  open: boolean;
  openTutor: (context?: TutorContext) => void;
  closeTutor: () => void;
  toggleTutor: () => void;
  context: TutorContext;
  setContext: (context: TutorContext) => void;
  messages: ChatMessage[];
  busy: boolean;
  error: string | null;
  usedOffline: boolean;
  ask: (text: string) => Promise<void>;
  reset: () => void;
  voiceReplies: boolean;
  toggleVoiceReplies: () => void;
}

const TutorContextStore = createContext<TutorValue | null>(null);

function welcomeMessage(name: string): ChatMessage {
  return {
    role: 'assistant',
    content: `Good to see you, ${name}. I’m **Jacob**, your study companion.\n\nTell me what you are working on, or open a lesson and ask me about the part that feels slippery. I will not hand you an answer to copy — I will help you find the next step yourself.\n\nWhen you are online, I can give fuller guidance. When you are offline, I use the guide saved on this device.`,
  };
}

export function TutorProvider({ children }: { children: React.ReactNode }) {
  const { state, updateSettings } = useAppStore();
  const [open, setOpen] = useState(false);
  const [context, setContextState] = useState<TutorContext>({});
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    welcomeMessage(state.profile.name || 'Angel'),
  ]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextRef = useRef(context);
  contextRef.current = context;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const settingsRef = useRef(state.settings.ai);
  settingsRef.current = state.settings.ai;
  const voiceRef = useRef(state.settings.voiceReplies);
  voiceRef.current = state.settings.voiceReplies;
  const voiceStyleRef = useRef(state.settings.voiceStyle);
  voiceStyleRef.current = state.settings.voiceStyle;

  const speakReply = useCallback((text: string) => {
    if (!voiceRef.current) return;
    const ai = settingsRef.current;
    speakSmart(text, {
      style: voiceStyleRef.current,
      keys: availableTtsKeys({ provider: ai.provider, apiKey: ai.apiKey }),
    });
  }, []);

  const setContext = useCallback((next: TutorContext) => {
    setContextState(next);
  }, []);

  const openTutor = useCallback((next?: TutorContext) => {
    if (next) setContextState(next);
    setOpen(true);
  }, []);

  const closeTutor = useCallback(() => {
    setOpen(false);
    stopSpeaking();
  }, []);

  const toggleTutor = useCallback(() => {
    setOpen((value) => {
      if (value) stopSpeaking();
      return !value;
    });
  }, []);

  const reset = useCallback(() => {
    stopSpeaking();
    setError(null);
    setMessages([welcomeMessage(state.profile.name || 'Angel')]);
  }, [state.profile.name]);

  const ask = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      const userMessage: ChatMessage = { role: 'user', content: text };
      const history = [...messagesRef.current, userMessage];
      setMessages(history);
      setBusy(true);
      setError(null);

      const ai = settingsRef.current;
      const learnerName = state.profile.name || 'Angel';
      const fullContext = { ...contextRef.current, learnerName };
      try {
        // Use live AI when online; rely on the offline guide otherwise.
        if (typeof navigator !== 'undefined' && !navigator.onLine) throw new Error('OFFLINE');

        const reply = await askTutor({
          settings: ai,
          messages: history,
          context: fullContext,
        });
        const message: ChatMessage = { role: 'assistant', content: reply };
        setMessages((current) => [...current, message]);
        speakReply(reply);
      } catch (caught) {
        const reason = caught instanceof Error ? caught.message : '';
        const fallback = localTutorReply(text, fullContext);
        setMessages((current) => [
          ...current,
          { role: 'assistant', content: fallback, offline: true },
        ]);
        speakReply(fallback);
        if (reason !== 'NO_KEY' && reason !== 'OFFLINE') {
          setError('The online tutor could not be reached right now, so I used the guide saved on this device.');
        }
      } finally {
        setBusy(false);
      }
    },
    [busy, state.profile.name],
  );

  const toggleVoiceReplies = useCallback(() => {
    const next = !voiceRef.current;
    updateSettings({ voiceReplies: next });
    if (!next) stopSpeaking();
  }, [updateSettings]);

  useEffect(() => () => stopSpeaking(), []);

  const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
  const usedOffline = Boolean(lastAssistant?.offline || error);

  const value = useMemo<TutorValue>(
    () => ({
      open,
      openTutor,
      closeTutor,
      toggleTutor,
      context,
      setContext,
      messages,
      busy,
      error,
      usedOffline,
      ask,
      reset,
      voiceReplies: state.settings.voiceReplies,
      toggleVoiceReplies,
    }),
    [
      open,
      openTutor,
      closeTutor,
      toggleTutor,
      context,
      setContext,
      messages,
      busy,
      error,
      usedOffline,
      ask,
      reset,
      state.settings.voiceReplies,
      toggleVoiceReplies,
    ],
  );

  return <TutorContextStore.Provider value={value}>{children}</TutorContextStore.Provider>;
}

export function useTutor(): TutorValue {
  const value = useContext(TutorContextStore);
  if (!value) throw new Error('useTutor must be used inside <TutorProvider>');
  return value;
}

/**
 * Declare the context of the page the learner is on. The floating panel keeps
 * the most recent context, so asking a follow-up after scrolling still works.
 */
export function useTutorContext(context: TutorContext): void {
  const { setContext } = useTutor();
  const serialized = JSON.stringify(context);

  useEffect(() => {
    setContext(JSON.parse(serialized) as TutorContext);
  }, [serialized, setContext]);
}

