'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { addDays, isoDay, isYesterday } from './date';
import { idbClear, idbGet, idbSet } from './idb';
import { evaluateBadges, type BADGES } from './badges';
import { levelInfo } from './progress';
import { newCard, review, type ReviewGrade } from './srs';
import { defaultAiSettings } from './tutor';
import type {
  AiSettings,
  AppState,
  Flashcard,
  JournalEntry,
  MockResult,
  Mood,
  Profile,
  QuizAttempt,
  Settings,
  SubjectId,
} from './types';

const STORAGE_KEY = 'auntie-angel:v1';

export function createDefaultState(): AppState {
  return {
    version: 1,
    profile: {
      name: 'Angel',
      examDate: '2027-05-03',
      examDateIsProvisional: true,
      onboarded: false,
      confidence: 3,
    },
    xp: 0,
    streak: { count: 0, lastDay: null, best: 0 },
    activity: {},
    topics: {},
    srs: {},
    quizzes: [],
    mocks: [],
    moods: [],
    journal: [],
    badges: [],
    games: {},
    downloads: { english: null, mathematics: null, management: null },
    settings: {
      theme: 'system',
      voiceReplies: false,
      reducedMotion: false,
      reminders: true,
      ai: defaultAiSettings(),
    },
    createdAt: isoDay(),
  };
}

function mergeWithDefaults(raw: unknown): AppState {
  const base = createDefaultState();
  if (!raw || typeof raw !== 'object') return base;
  const value = raw as Partial<AppState>;
  return {
    ...base,
    ...value,
    profile: { ...base.profile, ...(value.profile ?? {}) },
    settings: {
      ...base.settings,
      ...(value.settings ?? {}),
      ai: { ...base.settings.ai, ...(value.settings?.ai ?? {}) },
    },
    streak: { ...base.streak, ...(value.streak ?? {}) },
    downloads: { ...base.downloads, ...(value.downloads ?? {}) },
    topics: value.topics ?? {},
    srs: value.srs ?? {},
    quizzes: value.quizzes ?? [],
    mocks: value.mocks ?? [],
    moods: value.moods ?? [],
    journal: value.journal ?? [],
    badges: value.badges ?? [],
    games: value.games ?? {},
    activity: value.activity ?? {},
  };
}

interface QuizInput {
  subject: SubjectId;
  topicId: string;
  correct: number;
  total: number;
  mode: 'practice' | 'mock' | 'game';
  seconds?: number;
  minutes?: number;
}

interface StoreValue {
  state: AppState;
  hydrated: boolean;
  level: ReturnType<typeof levelInfo>;
  todayMinutes: number;
  dueCards: number;
  newBadges: (typeof BADGES)[number][];
  dismissBadge: (id: string) => void;
  markStudied: (subject: SubjectId, topicId: string, minutes?: number) => void;
  saveQuiz: (input: QuizInput) => void;
  completeMock: (result: Omit<MockResult, 'id' | 'date'>) => void;
  reviewCard: (card: Flashcard, grade: ReviewGrade) => void;
  ensureCards: (cards: Flashcard[]) => void;
  setMood: (mood: Mood, note?: string) => void;
  saveJournal: (entry: Omit<JournalEntry, 'id' | 'date'> & { date?: string }) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updateSettings: (patch: Partial<Omit<Settings, 'ai'>> & { ai?: Partial<AiSettings> }) => void;
  markDownloaded: (subject: SubjectId) => void;
  clearDownloaded: () => void;
  recordGame: (gameId: string, score: number) => void;
  awardXp: (amount: number) => void;
  resetAll: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function touchStreak(state: AppState): AppState['streak'] {
  const today = isoDay();
  if (state.streak.lastDay === today) return state.streak;
  const count = state.streak.lastDay && isYesterday(state.streak.lastDay) ? state.streak.count + 1 : 1;
  return { count, lastDay: today, best: Math.max(state.streak.best, count) };
}

function bumpActivity(state: AppState, minutes: number): Record<string, number> {
  if (minutes <= 0) return state.activity;
  const day = isoDay();
  return { ...state.activity, [day]: (state.activity[day] ?? 0) + Math.round(minutes) };
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(createDefaultState);
  const [hydrated, setHydrated] = useState(false);
  const [newBadges, setNewBadges] = useState<(typeof BADGES)[number][]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  /* Load: localStorage gives an instant paint, IndexedDB is the durable copy. */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      let loaded: AppState | null = null;
      try {
        const cached = window.localStorage.getItem(STORAGE_KEY);
        if (cached) loaded = mergeWithDefaults(JSON.parse(cached));
      } catch {
        loaded = null;
      }
      if (!loaded) {
        const fromDb = await idbGet<AppState>();
        if (fromDb) loaded = mergeWithDefaults(fromDb);
      }
      if (!cancelled && loaded) {
        stateRef.current = loaded;
        setState(loaded);
      }
      if (!cancelled) setHydrated(true);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Persist: one debounced write, mirrored to both stores. */
  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      const snapshot = stateRef.current;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        /* storage may be full; IndexedDB still has a copy */
      }
      void idbSet(snapshot);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [state, hydrated]);

  /* Theme lives on <html> so the background covers the whole viewport. */
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const theme = state.settings.theme;
      const dark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.classList.toggle('dark', dark);
      root.dataset.theme = dark ? 'dark' : 'light';
      root.classList.toggle('reduce-motion', state.settings.reducedMotion);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#0f1714' : '#fbf7f0');
    };
    apply();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => state.settings.theme === 'system' && apply();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [state.settings.theme, state.settings.reducedMotion]);

  const commit = useCallback((updater: (prev: AppState) => AppState) => {
    let next = updater(stateRef.current);
    const earned = evaluateBadges(next);
    if (earned.length) {
      next = {
        ...next,
        badges: [...next.badges, ...earned.map((b) => b.id)],
        xp: next.xp + earned.length * 25,
      };
      setNewBadges((current) => [...current, ...earned]);
    }
    stateRef.current = next;
    setState(next);
  }, []);

  const markStudied = useCallback(
    (subject: SubjectId, topicId: string, minutes = 8) => {
      commit((prev) => {
        const existing = prev.topics[topicId];
        const first = !existing?.studied;
        return {
          ...prev,
          streak: touchStreak(prev),
          xp: prev.xp + (first ? 15 : 3),
          activity: bumpActivity(prev, minutes),
          topics: {
            ...prev.topics,
            [topicId]: {
              studied: true,
              attempts: existing?.attempts ?? 0,
              correct: existing?.correct ?? 0,
              mastery: existing?.mastery ?? 0,
              lastSeen: isoDay(),
            },
          },
        };
      });
    },
    [commit],
  );

  const saveQuiz = useCallback(
    ({ subject, topicId, correct, total, mode, seconds, minutes }: QuizInput) => {
      if (total <= 0) return;
      commit((prev) => {
        const previous = prev.topics[topicId];
        const pct = (correct / total) * 100;
        const mastery = previous?.attempts
          ? Math.round(previous.mastery * 0.3 + pct * 0.7)
          : Math.round(pct);
        const attempt: QuizAttempt = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          date: isoDay(),
          subject,
          topicId,
          correct,
          total,
          mode,
        };
        const xp = correct * 5 + (correct === total && total >= 5 ? 20 : 0);
        return {
          ...prev,
          streak: touchStreak(prev),
          xp: prev.xp + xp,
          activity: bumpActivity(prev, minutes ?? Math.max(2, Math.round(total * 0.75))),
          topics: {
            ...prev.topics,
            [topicId]: {
              studied: true,
              attempts: (previous?.attempts ?? 0) + 1,
              correct: (previous?.correct ?? 0) + correct,
              mastery,
              lastSeen: isoDay(),
            },
          },
          quizzes: [attempt, ...prev.quizzes].slice(0, 400),
          mocks:
            mode === 'mock'
              ? [
                  {
                    id: attempt.id,
                    date: attempt.date,
                    subject,
                    correct,
                    total,
                    seconds: seconds ?? 0,
                  },
                  ...prev.mocks,
                ].slice(0, 60)
              : prev.mocks,
        };
      });
    },
    [commit],
  );

  const completeMock = useCallback(
    (result: Omit<MockResult, 'id' | 'date'>) => {
      const date = isoDay();
      const id = `${Date.now()}-mock`;
      commit((prev) => ({
        ...prev,
        streak: touchStreak(prev),
        xp: prev.xp + result.correct * 5 + 30,
        activity: bumpActivity(prev, Math.max(10, Math.round(result.seconds / 60))),
        mocks: [{ ...result, id, date }, ...prev.mocks].slice(0, 60),
        quizzes: [
          {
            id,
            date,
            subject: result.subject,
            topicId: 'mock',
            correct: result.correct,
            total: result.total,
            mode: 'mock' as const,
          },
          ...prev.quizzes,
        ].slice(0, 400),
      }));
    },
    [commit],
  );

  const ensureCards = useCallback(
    (cards: Flashcard[]) => {
      if (!cards.length) return;
      const missing = cards.filter((c) => !stateRef.current.srs[c.id]);
      if (!missing.length) return;
      commit((prev) => {
        const srs = { ...prev.srs };
        for (const card of missing) if (!srs[card.id]) srs[card.id] = newCard(card.id);
        return { ...prev, srs };
      });
    },
    [commit],
  );

  const reviewCard = useCallback(
    (card: Flashcard, grade: ReviewGrade) => {
      commit((prev) => {
        const base = prev.srs[card.id] ?? newCard(card.id);
        return {
          ...prev,
          streak: touchStreak(prev),
          xp: prev.xp + (grade === 'again' ? 1 : 3),
          srs: { ...prev.srs, [card.id]: review(base, grade) },
        };
      });
    },
    [commit],
  );

  const setMood = useCallback(
    (mood: Mood, note?: string) => {
      commit((prev) => {
        const today = isoDay();
        const rest = prev.moods.filter((m) => m.date !== today);
        return { ...prev, moods: [{ date: today, mood, note }, ...rest].slice(0, 180) };
      });
    },
    [commit],
  );

  const saveJournal = useCallback(
    (entry: Omit<JournalEntry, 'id' | 'date'> & { date?: string }) => {
      commit((prev) => ({
        ...prev,
        xp: prev.xp + 12,
        streak: touchStreak(prev),
        journal: [
          {
            ...entry,
            id: `${Date.now()}-journal`,
            date: entry.date ?? isoDay(),
          },
          ...prev.journal,
        ].slice(0, 120),
      }));
    },
    [commit],
  );

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => {
      commit((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
    },
    [commit],
  );

  const updateSettings = useCallback(
    (patch: Partial<Omit<Settings, 'ai'>> & { ai?: Partial<AiSettings> }) => {
      commit((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          ...patch,
          ai: { ...prev.settings.ai, ...(patch.ai ?? {}) },
        },
      }));
    },
    [commit],
  );

  const markDownloaded = useCallback(
    (subject: SubjectId) => {
      commit((prev) => ({
        ...prev,
        downloads: { ...prev.downloads, [subject]: isoDay() },
      }));
    },
    [commit],
  );

  const clearDownloaded = useCallback(() => {
    commit((prev) => ({
      ...prev,
      downloads: { english: null, mathematics: null, management: null },
    }));
  }, [commit]);

  const recordGame = useCallback(
    (gameId: string, score: number) => {
      commit((prev) => ({
        ...prev,
        streak: touchStreak(prev),
        xp: prev.xp + Math.max(5, Math.round(score / 4)),
        activity: bumpActivity(prev, 4),
        games: {
          ...prev.games,
          [gameId]: {
            score: Math.max(score, prev.games[gameId]?.score ?? 0),
            at: isoDay(),
          },
        },
      }));
    },
    [commit],
  );

  const awardXp = useCallback(
    (amount: number) => {
      commit((prev) => ({ ...prev, xp: prev.xp + amount }));
    },
    [commit],
  );

  const resetAll = useCallback(() => {
    const fresh = createDefaultState();
    stateRef.current = fresh;
    setState(fresh);
    setNewBadges([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    void idbClear();
  }, []);

  const value = useMemo<StoreValue>(() => {
    const today = isoDay();
    const dueCards = Object.values(state.srs).filter((c) => c.due <= today).length;
    return {
      state,
      hydrated,
      level: levelInfo(state.xp),
      todayMinutes: state.activity[today] ?? 0,
      dueCards,
      newBadges,
      dismissBadge: (id) => setNewBadges((list) => list.filter((b) => b.id !== id)),
      markStudied,
      saveQuiz,
      completeMock,
      reviewCard,
      ensureCards,
      setMood,
      saveJournal,
      updateProfile,
      updateSettings,
      markDownloaded,
      clearDownloaded,
      recordGame,
      awardXp,
      resetAll,
    };
  }, [
    state,
    hydrated,
    newBadges,
    markStudied,
    saveQuiz,
    completeMock,
    reviewCard,
    ensureCards,
    setMood,
    saveJournal,
    updateProfile,
    updateSettings,
    markDownloaded,
    clearDownloaded,
    recordGame,
    awardXp,
    resetAll,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useAppStore must be used inside <AppStoreProvider>');
  return ctx;
}

/** Convenience: has anything been recorded for today? */
export function studiedToday(state: AppState): boolean {
  return state.streak.lastDay === isoDay();
}

export function nextSevenDays(): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(isoDay(), i));
}
