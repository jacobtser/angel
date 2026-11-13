import type { SubjectId } from '@/lib/types';

export type GameSlug =
  | 'word-match'
  | 'comprehension-dash'
  | 'number-quest'
  | 'budget-balance'
  | 'flashcard-duel';

export interface GameMeta {
  slug: GameSlug;
  name: string;
  subject: SubjectId | 'mixed';
  blurb: string;
  description: string;
  minutes: number;
  accent: 'rose' | 'sky' | 'gold' | 'plum' | 'leaf';
  skills: string[];
}

export const games: GameMeta[] = [
  {
    slug: 'word-match',
    name: 'Word Match',
    subject: 'english',
    blurb: 'Pair six words with their meanings before the clock runs out.',
    description:
      'A memory game for lexis. Every match is a word you are likely to meet in Paper 1. The timer is gentle: accuracy first, speed second.',
    minutes: 4,
    accent: 'rose',
    skills: ['Vocabulary', 'Working memory', 'Speed'],
  },
  {
    slug: 'comprehension-dash',
    name: 'Comprehension Dash',
    subject: 'english',
    blurb: 'Read a short passage and answer three questions against the clock.',
    description:
      'Trains the exact skill Paper 2 rewards: locate the evidence, answer the question asked, and move on before the passage swallows your time.',
    minutes: 5,
    accent: 'rose',
    skills: ['Comprehension', 'Inference', 'Time management'],
  },
  {
    slug: 'number-quest',
    name: 'Number Quest',
    subject: 'mathematics',
    blurb: 'A three-stage puzzle ladder — indices, bases and a final boss.',
    description:
      'Each stage gives you a hint if you need it. The score rewards solving without hints, but using a hint is never treated as failure.',
    minutes: 6,
    accent: 'sky',
    skills: ['Indices', 'Number bases', 'Persistence'],
  },
  {
    slug: 'budget-balance',
    name: 'Budget Balance',
    subject: 'management',
    blurb: 'Run a Ghanaian household for one month on GHS 1,500.',
    description:
      'Allocate money across rent, food, transport, school and savings. Every choice has a consequence, and the goal is not to be perfect — it is to keep the household stable.',
    minutes: 7,
    accent: 'gold',
    skills: ['Budgeting', 'Priorities', 'Trade-offs'],
  },
  {
    slug: 'flashcard-duel',
    name: 'Flashcard Duel',
    subject: 'mixed',
    blurb: 'Beat your own best score — not anyone else’s.',
    description:
      'A rapid recall duel against “past you”. The ghost score is your personal best, so the only comparison is with the learner you were yesterday.',
    minutes: 5,
    accent: 'plum',
    skills: ['Recall', 'Spaced repetition', 'Confidence'],
  },
];

export function gameBySlug(slug: string): GameMeta | undefined {
  return games.find((g) => g.slug === slug);
}
