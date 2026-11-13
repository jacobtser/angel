'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
// BrandMark no longer used; Angel profile/logo image used for avatar
import { cn } from '@/lib/cn';
import { contextLabel } from '@/lib/tutor';
import { listen, recognitionSupported } from '@/lib/speech';
import { useTutor } from '@/components/providers/TutorProvider';
import { RichText } from './RichText';

function AmaAvatar({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src="/angel-logo.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-full object-cover ring-2 ring-[var(--bg-elev)]"
        style={{ width: size, height: size }}
        decoding="async"
      />
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-elev)] bg-leaf" />
    </span>
  );
}

export function AuntieAma() {
  const {
    open,
    openTutor,
    closeTutor,
    context,
    messages,
    busy,
    error,
    usedOffline,
    ask,
    reset,
    voiceReplies,
    toggleVoiceReplies,
  } = useTutor();
  const [draft, setDraft] = useState('');
  const [listening, setListening] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stopListening = useRef<(() => void) | null>(null);
  const reduce = useReducedMotion();

  const label = contextLabel(context);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTutor();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, closeTutor]);

  useEffect(() => {
    if (!open) return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (messages.length > 1) setShowPrompts(false);
  }, [messages.length]);

  useEffect(() => () => stopListening.current?.(), []);

  const prompts = context.textTitle
    ? [
        `Help me plan a paragraph on ${context.textTitle}`,
        'What is the strongest theme here?',
        'Give me a short quotation to use',
      ]
    : context.topicTitle
      ? [
          `Explain ${context.topicTitle} more simply`,
          'Give me a hint, not the answer',
          'What mistake should I avoid?',
        ]
      : context.question
        ? [
            'Help me understand what this question asks',
            'Give me a hint, not the answer',
            'Check my first step',
          ]
        : ['Help me plan an essay', 'I feel stuck â€” where do I start?', 'How do I revise without cramming?'];

  async function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setDraft('');
    setShowPrompts(false);
    await ask(value);
  }

  function startListening() {
    if (listening) {
      stopListening.current?.();
      setListening(false);
      return;
    }
    const stop = listen(
      (text) => setDraft(text),
      (state) => {
        setListening(state);
        if (!state) stopListening.current = null;
      },
    );
    stopListening.current = stop;
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => openTutor()}
            initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group fixed bottom-[5.6rem] right-4 z-[60] flex items-center gap-2.5 rounded-full border border-[var(--plum)]/25 bg-elev py-1.5 pl-1.5 pr-4 shadow-lift lg:bottom-6 lg:right-6"
            aria-label="Open Jacob, your study companion"
          >
            <span className="relative">
              <AmaAvatar size={42} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-elev bg-leaf" />
            </span>
            <span className="text-left">
              <span className="block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-plum">
                Ask
              </span>
              <span className="block text-[0.86rem] font-bold leading-none text-ink">Jacob</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-end sm:justify-end sm:p-5">
            <motion.button
              type="button"
              aria-label="Close Jacob"
              className="absolute inset-0 cursor-default bg-[#0b1210]/35 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTutor}
            />
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Jacob, your study companion"
              className="relative z-10 flex h-[88dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-line bg-elev shadow-lift sm:h-[min(660px,calc(100dvh-2.5rem))] sm:w-[410px] sm:rounded-[1.75rem]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ai-wash border-b border-line px-4 pb-3.5 pt-4">
                <div className="flex items-start gap-3">
                  <AmaAvatar size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-lg font-semibold leading-none">Jacob</h2>
                      {usedOffline ? (
                        <span className="chip chip-gold !py-0.5 !text-[0.6rem]">Offline guide</span>
                      ) : (
                        <span className="chip chip-plum !py-0.5 !text-[0.6rem]">Socratic</span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-[0.72rem] text-muted">
                      {label ? `Looking at: ${label}` : 'A guide, not an answer machine'}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={toggleVoiceReplies}
                      className={cn(
                        'grid h-8 w-8 place-items-center rounded-full transition-colors',
                        voiceReplies
                          ? 'bg-[var(--plum-soft)] text-plum'
                          : 'text-muted hover:bg-[var(--bg-sunk)] hover:text-ink',
                      )}
                      aria-label={voiceReplies ? 'Turn spoken replies off' : 'Turn spoken replies on'}
                      title={voiceReplies ? 'Spoken replies on' : 'Spoken replies off'}
                    >
                      <Icon name={voiceReplies ? 'volume' : 'volume-off'} size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-[var(--bg-sunk)] hover:text-ink"
                      aria-label="Start a new conversation"
                      title="New conversation"
                    >
                      <Icon name="refresh" size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={closeTutor}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-[var(--bg-sunk)] hover:text-ink"
                      aria-label="Close Jacob"
                    >
                      <Icon name="x" size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-2',
                      message.role === 'user' && 'flex-row-reverse',
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <AmaAvatar size={24} />
                    ) : (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--bg-sunk)] text-muted">
                        <Icon name="user" size={13} />
                      </span>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.86rem] leading-relaxed',
                        message.role === 'assistant'
                          ? 'rounded-bl-md border border-line bg-[var(--bg-elev)] text-soft'
                          : 'rounded-br-md bg-[var(--leaf)] text-[#fffdf9]',
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <RichText text={message.content} />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {busy && (
                  <div className="flex items-end gap-2">
                    <AmaAvatar size={24} />
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-[var(--bg-elev)] px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum"
                          style={{ animationDelay: `${dot * 120}ms`, animationDuration: '900ms' }}
                        />
                      ))}
                      <span className="sr-only">Jacob is thinking</span>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="rounded-xl bg-[var(--gold-soft)] px-3 py-2 text-[0.74rem] leading-relaxed text-[var(--gold-ink)]">
                    {error}{' '}
                    <Link href="/settings/" className="font-semibold underline" onClick={closeTutor}>
                      Check Settings
                    </Link>
                    .
                  </p>
                )}
              </div>

              {showPrompts && !busy && (
                <div className="scrollbar-none flex gap-2 overflow-x-auto border-t border-line px-4 py-2.5">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void send(prompt)}
                      className="chip shrink-0 whitespace-nowrap hover:border-leaf hover:text-leaf"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form
                className="border-t border-line p-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  void send(draft);
                }}
              >
                <div className="flex items-end gap-2 rounded-2xl border border-line-strong bg-[var(--bg-elev)] p-1.5 focus-within:border-leaf focus-within:ring-4 focus-within:ring-[var(--ring)]">
                  <textarea
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void send(draft);
                      }
                    }}
                    rows={1}
                    placeholder={listening ? 'Listening…' : 'Ask about this page…'}
                    className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-[0.9rem] text-ink outline-none placeholder:text-muted"
                    aria-label="Message Jacob"
                  />
                  {recognitionSupported() && (
                    <button
                      type="button"
                      onClick={startListening}
                      className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors',
                        listening
                          ? 'bg-[var(--rose-soft)] text-rose'
                          : 'text-muted hover:bg-[var(--bg-sunk)] hover:text-ink',
                      )}
                      aria-label={listening ? 'Stop dictation' : 'Dictate a message'}
                      title="Voice input"
                    >
                      <Icon name="mic" size={18} />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!draft.trim() || busy}
                    className="btn btn-ai h-10 w-10 shrink-0 !min-h-0 !p-0"
                    aria-label="Send message"
                  >
                    <Icon name="send" size={17} />
                  </button>
                </div>
                <p className="mt-1.5 px-1 text-[0.64rem] text-muted">
                  Jacob guides with questions. Verify facts against your paper or syllabus.
                </p>
              </form>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

