import type { AppState, Badge } from './types';

export const BADGES: Badge[] = [
  {
    id: 'first-light',
    name: 'First Light',
    description: 'Open your first topic and read it through.',
    icon: 'seed',
    earned: (s) => Object.values(s.topics).some((t) => t.studied),
  },
  {
    id: 'first-answer',
    name: 'The First Answer',
    description: 'Complete your first practice set.',
    icon: 'compass',
    earned: (s) => s.quizzes.length >= 1,
  },
  {
    id: 'clean-sheet',
    name: 'Clean Sheet',
    description: 'Score every question in a practice set.',
    icon: 'star',
    earned: (s) => s.quizzes.some((q) => q.total >= 5 && q.correct === q.total),
  },
  {
    id: 'seven-days',
    name: 'Seven Mornings',
    description: 'Study on seven different days in a row.',
    icon: 'flame',
    earned: (s) => s.streak.best >= 7,
  },
  {
    id: 'deep-diver',
    name: 'Deep Diver',
    description: 'Open ten topics across your subjects.',
    icon: 'book',
    earned: (s) => Object.values(s.topics).filter((t) => t.studied).length >= 10,
  },
  {
    id: 'memory-keeper',
    name: 'Memory Keeper',
    description: 'Review 40 flashcards — repetition is the quiet superpower.',
    icon: 'shield',
    earned: (s) => Object.values(s.srs).reduce((n, c) => n + c.reps, 0) >= 40,
  },
  {
    id: 'mock-courage',
    name: 'Mock Courage',
    description: 'Sit one full timed mock paper.',
    icon: 'clock',
    earned: (s) => s.mocks.length >= 1,
  },
  {
    id: 'honest-page',
    name: 'An Honest Page',
    description: 'Write three weekly reflections.',
    icon: 'heart',
    earned: (s) => s.journal.length >= 3,
  },
  {
    id: 'english-steady',
    name: 'English, Steady',
    description: 'Reach 60% mastery in two English topics.',
    icon: 'star',
    earned: (s) =>
      Object.entries(s.topics).filter(([id, t]) => id.startsWith('english:') && t.mastery >= 60).length >= 2,
  },
  {
    id: 'mil-strong',
    name: 'Home Wisdom',
    description: 'Reach 60% mastery in two Management in Living topics.',
    icon: 'heart',
    earned: (s) =>
      Object.entries(s.topics).filter(([id, t]) => id.startsWith('management:') && t.mastery >= 60).length >= 2,
  },
  {
    id: 'maths-brave',
    name: 'Maths, Bravely',
    description: 'Reach 60% mastery in two Core Mathematics topics.',
    icon: 'shield',
    earned: (s) =>
      Object.entries(s.topics).filter(([id, t]) => id.startsWith('mathematics:') && t.mastery >= 60).length >= 2,
  },
  {
    id: 'hundred-club',
    name: 'The Hundred Club',
    description: 'Earn 1,000 XP. Quiet work, counted.',
    icon: 'flame',
    earned: (s) => s.xp >= 1000,
  },
];

export function evaluateBadges(state: AppState): Badge[] {
  return BADGES.filter((b) => !state.badges.includes(b.id) && b.earned(state));
}

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
