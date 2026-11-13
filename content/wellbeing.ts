import type { Mood } from '@/lib/types';

/** Rotating, dignified affirmations. No “you’re a star!” confetti talk. */
export const affirmations: string[] = [
  'You are not starting over. You are starting from here.',
  'One paper does not decide the size of your life.',
  'You have done hard things before. This is another hard thing — not a verdict.',
  'Slow is still forward.',
  'You do not have to feel confident to begin.',
  'Your worth is not marked in red ink.',
  'Being a private candidate means you chose to try again. That is not a small thing.',
  'You are allowed to be a beginner and still be serious.',
  'The exam tests what you can do on one day. It does not test who you are.',
  'Some days the work is small. Small work still counts.',
  'You are building evidence, not waiting for a feeling.',
  'Rest is part of the plan, not a break from it.',
  'You can be tired and still be committed.',
  'There is no age limit on becoming who you are meant to be.',
  'You do not need to be the best in the room. You need to be prepared for the paper in front of you.',
  'Every past question you understand is a small piece of certainty.',
  'Confidence is often what arrives after the first ten minutes, not before.',
  'If today is heavy, do one page. Then decide about the next page.',
  'You are learning a subject, not proving a point to anyone.',
  'The goal is not perfection. The goal is fewer surprises on the day.',
];

export function affirmationFor(dateKey: string): string {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  return affirmations[hash % affirmations.length];
}

export interface MoodMeta {
  id: Mood;
  label: string;
  face: string;
  response: string;
  suggestion: string;
  tone: 'rose' | 'gold' | 'leaf' | 'plum' | 'sky';
}

export const moods: MoodMeta[] = [
  {
    id: 'hopeful',
    label: 'Hopeful',
    face: '◡',
    response: 'Good. Hope is useful fuel. Let’s give it something to stand on today.',
    suggestion: 'Pick one topic you have been avoiding and open it for ten minutes.',
    tone: 'leaf',
  },
  {
    id: 'steady',
    label: 'Steady',
    face: '•',
    response: 'Steady is underrated. You do not need a dramatic mood to do good work.',
    suggestion: 'Follow the plan for today, then stop at a sensible point.',
    tone: 'sky',
  },
  {
    id: 'tender',
    label: 'Tender',
    face: '◞',
    response: 'Thank you for telling the truth. We can make today gentle and still useful.',
    suggestion: 'Choose a short flashcard round or reread a familiar lesson. Nothing heroic.',
    tone: 'rose',
  },
  {
    id: 'tired',
    label: 'Tired',
    face: '–',
    response: 'Tired is information, not laziness. Let’s lower the target, not abandon it.',
    suggestion: 'Ten minutes of revision, then rest without guilt.',
    tone: 'plum',
  },
  {
    id: 'anxious',
    label: 'Anxious',
    face: '◟',
    response: 'Anxiety usually means this matters to you. Let’s shrink the next step until it feels possible.',
    suggestion: 'Breathe out slowly, then do five easy questions. You can stop after five.',
    tone: 'gold',
  },
];

export function moodMeta(mood: Mood): MoodMeta {
  return moods.find((m) => m.id === mood) ?? moods[1];
}

/** Weekly journal prompts — one per week of the preparation cycle. */
export const journalPrompts: string[] = [
  'What is one thing you understand now that you did not understand last week?',
  'Which topic still feels slippery, and what is the smallest useful step toward it?',
  'When did you feel most like yourself while studying this week?',
  'What took more energy than it should have? What would make it lighter next time?',
  'Write one sentence you would say to a friend who was exactly where you are.',
  'What evidence do you have that you are making progress, even if it is small?',
  'Which promise to yourself are you keeping, and which one needs renegotiating?',
  'What is one thing you can stop doing this week without losing anything important?',
];

export function journalPromptFor(dateKey: string): string {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) hash = (hash * 17 + dateKey.charCodeAt(i)) >>> 0;
  return journalPrompts[hash % journalPrompts.length];
}
