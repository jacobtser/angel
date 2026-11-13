import type { QuizQuestion, SubjectId } from './types';
import { subjectById } from '@/content/subjects';

export const mockPlan: Record<
  SubjectId,
  { questions: number; seconds: number; note: string }
> = {
  english: {
    questions: 20,
    seconds: 18 * 60,
    note: 'A 20-question slice at Paper 1 pace: about 54 seconds per question.',
  },
  mathematics: {
    questions: 15,
    seconds: 25 * 60,
    note: 'A 15-question slice of Paper 1 style questions. Paper 2 working is practised in the topics.',
  },
  management: {
    questions: 15,
    seconds: 20 * 60,
    note: 'A 15-question mixed slice across the MIL topics. Original practice, not a past paper.',
  },
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Build a mixed set without letting one topic dominate. We take one question
 * from each topic in turn, then shuffle the result so the paper does not feel
 * like a tour of the contents page.
 */
export function sampleQuestions(subjectId: SubjectId, count: number): QuizQuestion[] {
  const topics = subjectById[subjectId].topics;
  const pools = topics.map((topic) => shuffle(topic.quiz));
  const picked: QuizQuestion[] = [];
  let round = 0;

  while (picked.length < count) {
    let added = false;
    for (const pool of pools) {
      if (pool[round]) {
        picked.push(pool[round]);
        added = true;
        if (picked.length >= count) break;
      }
    }
    if (!added) break;
    round += 1;
  }

  return shuffle(picked);
}

export function allSubjectQuestions(subjectId: SubjectId): QuizQuestion[] {
  return subjectById[subjectId].topics.flatMap((topic) => topic.quiz);
}

export function diagnosticQuestions(count = 18): QuizQuestion[] {
  // Balanced baseline across all subjects (English priority) using existing question pools.
  const plan: [SubjectId, number][] = [
    ['english', 8],
    ['management', 5],
    ['mathematics', 5],
  ];
  const picked: QuizQuestion[] = [];
  for (const [subject, n] of plan) {
    picked.push(...sampleQuestions(subject, n));
  }
  return shuffle(picked).slice(0, count);
}
