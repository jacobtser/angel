'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { GameFinish, GameFrame } from './GameFrame';
import { allFlashcards } from '@/content/subjects';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';
import type { Flashcard, SubjectId } from '@/lib/types';

const DURATION = 75;
const POINTS_PER_CARD = 10;

const subjectColor: Record<SubjectId, string> = {
  english: 'var(--rose)',
  mathematics: 'var(--sky)',
  management: 'var(--gold-ink)',
};

const subjectLabel: Record<SubjectId, string> = {
  english: 'English',
  mathematics: 'Maths',
  management: 'MIL',
};

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * A duel against your own best, not against a stranger.
 *
 * Self-grading is intentional: the learner is the only person who knows
 * whether the answer was truly retrieved or merely recognised after seeing it.
 */
export function FlashcardDuel() {
  const { state, recordGame } = useAppStore();
  const [deck, setDeck] = useState<Flashcard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const recorded = useRef(false);
  const reduce = useReducedMotion();
  const best = state.games['flashcard-duel']?.score ?? 0;

  useEffect(() => {
    setDeck(shuffled(allFlashcards));
  }, []);

  useEffect(() => {
    if (finished || !deck) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished, deck]);

  useEffect(() => {
    if (secondsLeft === 0 && !finished && deck) finish(correct);
    // `finish` is stable enough for this one-shot end-of-clock check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, finished, deck, correct]);

  const card = deck?.[index];

  function finish(finalCorrect: number) {
    if (recorded.current) return;
    recorded.current = true;
    const finalScore = finalCorrect * POINTS_PER_CARD;
    setScore(finalScore);
    setFinished(true);
    recordGame('flashcard-duel', finalScore);
  }

  function grade(known: boolean) {
    if (!deck || !card || finished) return;
    const nextCorrect = correct + (known ? 1 : 0);
    if (known) setCorrect(nextCorrect);

    if (index + 1 >= deck.length) {
      finish(nextCorrect);
      return;
    }
    setIndex((value) => value + 1);
    setRevealed(false);
  }

  function restart() {
    setDeck(shuffled(allFlashcards));
    setIndex(0);
    setRevealed(false);
    setCorrect(0);
    setSecondsLeft(DURATION);
    setFinished(false);
    setScore(0);
    recorded.current = false;
  }

  if (!deck) {
    return (
      <GameFrame slug="flashcard-duel">
        <div className="surface skeleton h-72" aria-label="Shuffling the deck" />
      </GameFrame>
    );
  }

  return (
    <GameFrame slug="flashcard-duel">
      {finished ? (
        <GameFinish
          score={score}
          best={best}
          label={`points · ${correct} cards recalled`}
          headline={
            best > 0 && score > best
              ? 'You beat the ghost'
              : correct >= 10
                ? 'A strong recall circuit'
                : 'The deck is warm now'
          }
          body={
            best > 0 && score > best
              ? 'That is the comparison that matters: you against the learner you were last time. The new mark is yours to defend.'
              : 'Recall is built by the attempt, not by the score. The cards you hesitated on are the ones to meet again tomorrow.'
          }
          onRestart={restart}
          celebrate={score > best && score > 0}
        />
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="chip chip-plum">
                <Icon name="zap" size={12} />
                {correct * POINTS_PER_CARD} points
              </span>
              <span className="chip">
                <Icon name="layers" size={12} />
                {correct} recalled
              </span>
            </div>
            <span className={cn('chip tabular', secondsLeft <= 15 && 'chip-rose')}>
              <Icon name="timer" size={12} />
              {secondsLeft}s
            </span>
          </div>

          <div className="surface p-5 sm:p-7">
            {best > 0 ? (
              <div className="mb-4">
                <div className="flex items-center justify-between text-[0.68rem] font-semibold text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Icon name="trophy" size={12} className="text-gold" />
                    Ghost of past you: {best}
                  </span>
                  <span className="tabular">
                    {correct * POINTS_PER_CARD} / {best}
                  </span>
                </div>
                <ProgressBar
                  value={(correct * POINTS_PER_CARD * 100) / Math.max(1, best)}
                  color="var(--plum)"
                  label="Progress against your personal best"
                  className="mt-1.5"
                  height={5}
                />
              </div>
            ) : (
              <p className="mb-4 flex items-center gap-1.5 text-[0.72rem] font-semibold text-muted">
                <Icon name="seed" size={13} className="text-leaf" />
                No ghost yet. This round sets the mark for next time.
              </p>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${card?.id}-${revealed ? 'back' : 'front'}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex min-h-[13rem] flex-col items-center justify-center rounded-[1.4rem] border border-line bg-[var(--bg-sunk)] px-5 py-8 text-center">
                  <span
                    className="chip"
                    style={{
                      background: `color-mix(in srgb, ${subjectColor[card?.subject ?? 'english']} 13%, transparent)`,
                      color: subjectColor[card?.subject ?? 'english'],
                    }}
                  >
                    {subjectLabel[card?.subject ?? 'english']}
                  </span>
                  <p className="eyebrow mt-4 !text-[0.56rem]">{revealed ? 'Answer' : 'Prompt'}</p>
                  <p className="mt-2 font-display text-xl font-semibold leading-snug sm:text-2xl">
                    {revealed ? card?.back : card?.front}
                  </p>
                  {!revealed && card?.hint && (
                    <p className="mt-3 text-[0.76rem] italic text-muted">Hint: {card.hint}</p>
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
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => grade(false)}
                  className="rounded-xl border border-line bg-elev px-3 py-3 text-center transition-colors hover:border-rose"
                >
                  <span className="flex items-center justify-center gap-1.5 text-[0.84rem] font-semibold text-rose">
                    <Icon name="x" size={14} />
                    Not yet
                  </span>
                  <span className="mt-0.5 block text-[0.62rem] text-muted">Show it again sooner</span>
                </button>
                <button
                  type="button"
                  onClick={() => grade(true)}
                  className="rounded-xl border border-leaf/40 bg-[var(--leaf-soft)]/60 px-3 py-3 text-center transition-colors hover:border-leaf"
                >
                  <span className="flex items-center justify-center gap-1.5 text-[0.84rem] font-semibold text-leaf">
                    <Icon name="check" size={14} />
                    I knew it
                  </span>
                  <span className="mt-0.5 block text-[0.62rem] text-muted">+{POINTS_PER_CARD} points</span>
                </button>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-muted">
            Be honest with yourself. A card you merely recognised is a card to meet again, not a loss.
          </p>
        </div>
      )}
    </GameFrame>
  );
}
