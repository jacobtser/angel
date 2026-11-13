/**
 * Shared domain types for Auntie Angel.
 *
 * Content lives in /content and is deliberately plain data: no JSX, no
 * fetching. That keeps every lesson downloadable and lets the same object
 * feed a lesson page, a flashcard, a game and the AI tutor's context.
 */

export type SubjectId = 'english' | 'mathematics' | 'management';

export type Accent = 'rose' | 'sky' | 'gold';

export type Difficulty = 'foundation' | 'core' | 'stretch';

export interface Step {
  label: string;
  detail: string;
}

export interface WorkedExample {
  question: string;
  steps: Step[];
  answer: string;
  why: string;
}

export interface DeeperNote {
  title: string;
  body: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explanation: string;
  difficulty?: Difficulty;
  /** Optional reading passage shown above the question. */
  passage?: string;
  /** Optional citation, e.g. "WASSCE 2023 · Part A". */
  source?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  subject: SubjectId;
  topicId: string;
}

export interface Lesson {
  bigIdea: string;
  analogy: { title: string; body: string };
  example: { title: string; body: string };
  worked: WorkedExample[];
  deeper: DeeperNote[];
  pitfalls: string[];
  examTip: string;
}

export interface Topic {
  id: string;
  subject: SubjectId;
  title: string;
  summary: string;
  readMinutes: number;
  difficulty: Difficulty;
  examWeight: string;
  lesson: Lesson;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
}

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  priority: 1 | 2 | 3;
  accent: Accent;
  tagline: string;
  description: string;
  /** What the paper actually asks her to do. */
  examShape: string[];
  passNote: string;
  topics: Topic[];
  paperUrl?: string;
  paperLabel?: string;
  paperSource?: string;
  hasLiterature?: boolean;
  hasOrals?: boolean;
}

export type LiteratureGenre = 'prose' | 'drama' | 'poetry';

export interface LiteratureCharacter {
  name: string;
  role: string;
  traits: string[];
  arc: string;
}

export interface LiteratureTheme {
  title: string;
  body: string;
  evidence: string;
}

export interface LiteratureText {
  id: string;
  title: string;
  author: string;
  genre: LiteratureGenre;
  origin: 'African' | 'Non-African';
  year: string;
  cycle: string;
  setting: string;
  blurb: string;
  whyItMatters: string;
  structureLabel: string;
  structure: { label: string; title: string; summary: string }[];
  characters: LiteratureCharacter[];
  themes: LiteratureTheme[];
  symbols: { name: string; meaning: string }[];
  quotes: { text: string; who: string; context: string; use: string }[];
  essayPrompts: string[];
  examFocus: string[];
  sourceNote: string;
}

export interface OralQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  category: 'vowels' | 'consonants' | 'stress' | 'intonation';
}

export interface PastQuestion {
  n: string;
  q: string;
  a: string;
  why?: string;
  steps?: string[];
  tip?: string;
  flag?: boolean;
}

export interface PastPaper {
  id: string;
  subject: SubjectId;
  year: string;
  label: string;
  source: string;
  note: string;
  pdf?: string;
  items: PastQuestion[];
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

export interface TopicProgress {
  studied: boolean;
  attempts: number;
  correct: number;
  /** 0–100, exponential moving average of quiz accuracy. */
  mastery: number;
  lastSeen: string | null;
}

export interface SrsCard {
  id: string;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
  due: string;
  last: string | null;
}

export interface QuizAttempt {
  id: string;
  date: string;
  subject: SubjectId;
  topicId: string;
  correct: number;
  total: number;
  mode: 'practice' | 'mock' | 'game';
}

export type Mood = 'hopeful' | 'steady' | 'tender' | 'tired' | 'anxious';

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  wins: string;
  challenge: string;
  next: string;
  insight?: string;
}

export interface MockResult {
  id: string;
  date: string;
  subject: SubjectId;
  correct: number;
  total: number;
  seconds: number;
}

export type AiProvider = 'openai' | 'anthropic' | 'gemini' | 'groq' | 'deepseek' | 'openrouter';

/** Preferred speaking voice. `device` uses the browser's built-in voice. */
export type VoiceStyle = 'sweet' | 'warm' | 'bright' | 'device';

export interface AiSettings {
  provider: AiProvider;
  apiKey: string;
  model: string;
  proxyUrl: string;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  voiceReplies: boolean;
  voiceStyle: VoiceStyle;
  reducedMotion: boolean;
  reminders: boolean;
  ai: AiSettings;
}

export interface Profile {
  name: string;
  /** First paper — the number the countdown counts to. */
  examDate: string;
  /** Last paper — the end of the exam window. */
  examEndDate: string;
  examDateIsProvisional: boolean;
  onboarded: boolean;
  confidence: number;
}

export interface GameBest {
  score: number;
  at: string;
}

export interface AppState {
  version: 1;
  profile: Profile;
  xp: number;
  streak: { count: number; lastDay: string | null; best: number };
  /** Minutes of focused study per ISO day. */
  activity: Record<string, number>;
  topics: Record<string, TopicProgress>;
  srs: Record<string, SrsCard>;
  quizzes: QuizAttempt[];
  mocks: MockResult[];
  moods: MoodEntry[];
  journal: JournalEntry[];
  badges: string[];
  games: Record<string, GameBest>;
  downloads: Record<SubjectId, string | null>;
  settings: Settings;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'seed' | 'flame' | 'compass' | 'star' | 'shield' | 'book' | 'clock' | 'heart';
  /** Returns true when the badge should be unlocked. */
  earned: (state: AppState) => boolean;
}
