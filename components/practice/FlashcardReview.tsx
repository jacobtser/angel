'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { GRADE_LABEL } from '@/lib/srs';
import { isoDay } from '@/lib/date';
import { useAppStore } from '@/lib/store';
import type { Flashcard, SubjectId } from '@/lib/types';
import { cn } from '@/lib/cn';

const accent: Record<SubjectId, string> = {
  english: 'var(--rose)',
  mathematics: 'var(--sky)',
  management: 'var(--gold-ink)',
};

export function FlashcardReview({
  cards,
  title = 'Flashcards',
  limit = 10,
}: {
  cards: Flashcard[];
  title?: string;
  limit?: number;
}) {
  const { state, hydrated, ensureCards, reviewCard } = useAppStore();
  const [queue, setQueue] = useState<Flashcard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!hydrated || queue) return;
    ensureCards(cards);
    const today = isoDay();
    const due = cards.filter((card) => (state.srs[card.id]?.due ?? today) <= today);
    const rest = cards.filter((card) => !due.includes(card));
    setQueue([...due, ...rest].slice(0, limit));
  }, [hydrated, queue, cards, ensureCards, state.srs, limit]);

  const current = queue?.[index];

  const progress = useMemo(
    () => (queue?.length ? ((index + (revealed ? 0.4 : 0)) / queue.length) * 100 : 0),
    [queue?.length, index, revealed],
  );

  if (!cards.length) {
    return <p className="text-sm text-muted">No cards are attached to this topic yet.</p>;
  }

  if (!hydrated || !queue) {
    return (
      <div className="surface skeleton h-56" aria-label="Loading flashcards" />
    );
  }

  if (done || !current) {
    return (
      <div className="surface p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--leaf-soft)] text-leaf">
          <Icon name="layers" size={25} />
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold">Cards reviewed</h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
          {reviewed} card{reviewed === 1 ? '' : 's'} went back into the schedule. The ones you found hard
          will return sooner — that is the system working, not a punishment.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setDone(false);
              setReviewed(0);
              setRevealed(false);
              setQueue(cards.slice(0, limit));
            }}
            className="btn btn-primary btn-sm"
          >
            <Icon name="refresh" size={15} />
            Go again
          </button>
          <Link href="/practice/" className="btn btn-secondary btn-sm">
            Practice questions
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    );
  }

  function grade(value: 'again' | 'hard' | 'good' | 'easy') {
    if (!current) return;
    reviewCard(current, value);
    setReviewed((count) => count + 1);
    setRevealed(false);
    if (index + 1 >= (queue?.length ?? 0)) {
      setDone(true);
    } else {
      setIndex((value) => value + 1);
    }
  }

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div>
          <p className="eyebrow">Spaced repetition</p>
          <p className="mt-0.5 font-display text-lg font-semibold">{title}</p>
        </div>
        <span className="chip">
          {index + 1} / {queue.length}
        </span>
      </div>
      <div className="px-5 pt-3">
        <ProgressBar value={progress} color={accent[current.subject]} label="Flashcard progress" height={5} />
      </div>

      <div className="px-5 py-6 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${current.id}-${revealed ? 'back' : 'front'}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mx-auto flex min-h-[11rem] max-w-xl flex-col items-center justify-center rounded-[1.5rem] border border-line bg-[var(--bg-sunk)] px-5 py-8 text-center">
              <p className="eyebrow !text-[0.58rem]">{revealed ? 'Answer' : 'Prompt'}</p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
                {revealed ? current.back : current.front}
              </p>
              {!revealed && current.hint && (
                <p className="mt-3 text-[0.78rem] italic text-muted">Hint: {current.hint}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {!revealed ? (
          <div className="mt-4 flex justify-center">
            <button type="button" onClick={() => setRevealed(true)} className="btn btn-primary">
              Show the answer
              <Icon name="eye" size={16} />
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-center text-[0.74rem] font-semibold text-muted">
              How did that feel? Be honest — the schedule depends on it.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(['again', 'hard', 'good', 'easy'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => grade(value)}
                  className={cn(
                    'rounded-xl border border-line bg-elev px-2 py-2.5 text-center transition-colors hover:border-leaf',
                    value === 'good' && 'border-leaf/40 bg-[var(--leaf-soft)]/50',
                  )}
                  title={GRADE_LABEL[value].hint}
                >
                  <span className="block text-[0.82rem] font-semibold">{GRADE_LABEL[value].label}</span>
                  <span className="mt-0.5 block text-[0.62rem] leading-tight text-muted">
                    {GRADE_LABEL[value].hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
