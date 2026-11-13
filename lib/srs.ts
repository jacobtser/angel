/**
 * SM-2 spaced repetition.
 *
 * We keep the original SuperMemo formula (ease factor + expanding interval)
 * but expose four humane buttons instead of asking a learner to rate herself
 * from 0–5. "Again" resets the card; "Easy" stretches it.
 */
import { addDays, isoDay } from './date';
import type { SrsCard } from './types';

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

const QUALITY: Record<ReviewGrade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export function newCard(id: string): SrsCard {
  return {
    id,
    ease: 2.5,
    interval: 0,
    reps: 1,
    lapses: 0,
    due: isoDay(),
    last: null,
  };
}

export function review(card: SrsCard, grade: ReviewGrade): SrsCard {
  const q = QUALITY[grade];
  const today = isoDay();

  if (q < 3) {
    return {
      ...card,
      reps: 1,
      lapses: card.lapses + 1,
      interval: 1,
      ease: Math.max(1.3, card.ease - 0.2),
      due: addDays(today, 1),
      last: today,
    };
  }

  const reps = card.reps + 1;
  let interval: number;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 6;
  else interval = Math.max(1, Math.round(card.interval * card.ease));

  const ease = Math.max(
    1.3,
    Math.min(3.2, card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))),
  );

  return {
    ...card,
    ease,
    interval,
    reps,
    due: addDays(today, interval),
    last: today,
  };
}

export const GRADE_LABEL: Record<ReviewGrade, { label: string; hint: string }> = {
  again: { label: 'Again', hint: 'Not yet — show me tomorrow' },
  hard: { label: 'Hard', hint: 'I had to work for it' },
  good: { label: 'Good', hint: 'I remembered' },
  easy: { label: 'Easy', hint: 'Instant — stretch it out' },
};
