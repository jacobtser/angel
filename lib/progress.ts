/**
 * Readiness is a transparent estimate, not a prophecy.
 *
 * Every component is visible to the learner in the UI so she can see exactly
 * why the number moved: practice accuracy, topic coverage, long-term card
 * retention and the latest timed mock. Missing evidence is not treated as a
 * failure — it simply lowers confidence and re-weights what we do know.
 */
import type { AppState, SubjectId, Topic } from './types';

export interface ReadinessPart {
  id: 'accuracy' | 'coverage' | 'retention' | 'mock';
  label: string;
  value: number | null;
  weight: number;
  detail: string;
}

export interface Readiness {
  score: number;
  /** Plain label for quick scanning (inspired by exam-readiness dashboards). */
  statusLabel: 'Not enough evidence' | 'At Risk' | 'Improving' | 'On Track';
  band: 'Not enough evidence yet' | 'Building' | 'Getting steady' | 'Exam-ready' | 'Strong';
  parts: ReadinessPart[];
  confidence: 'low' | 'medium' | 'high';
  nextAction: string;
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function readiness(state: AppState, subjectId: SubjectId, topics: Topic[]): Readiness {
  const relevant = topics.filter((t) => t.subject === subjectId);
  const studied = relevant.filter((t) => state.topics[t.id]?.studied).length;
  const attempted = relevant.filter((t) => (state.topics[t.id]?.attempts ?? 0) > 0);

  const coverage = relevant.length ? (studied / relevant.length) * 100 : null;

  const totalAttempts = attempted.reduce((sum, t) => sum + (state.topics[t.id]?.attempts ?? 0), 0);
  const weightedCorrect = attempted.reduce(
    (sum, t) => sum + (state.topics[t.id]?.mastery ?? 0) * (state.topics[t.id]?.attempts ?? 0),
    0,
  );
  const accuracy = totalAttempts > 0 ? weightedCorrect / totalAttempts : null;

  const cards = Object.values(state.srs).filter((c) => c.id.startsWith(`${subjectId}:`));
  const mature = cards.filter((c) => c.interval >= 6).length;
  const retention = cards.length >= 5 ? (mature / cards.length) * 100 : null;

  const subjectMocks = state.mocks.filter((m) => m.subject === subjectId);
  const latest = subjectMocks.sort((a, b) => b.date.localeCompare(a.date))[0];
  const mock = latest && latest.total > 0 ? (latest.correct / latest.total) * 100 : null;

  const raw: ReadinessPart[] = [
    {
      id: 'accuracy',
      label: 'Practice accuracy',
      value: accuracy === null ? null : clamp(accuracy),
      weight: 0.4,
      detail: totalAttempts ? `${totalAttempts} questions answered` : 'Answer a few practice questions',
    },
    {
      id: 'coverage',
      label: 'Topic coverage',
      value: coverage === null ? null : clamp(coverage),
      weight: 0.3,
      detail: `${studied} of ${relevant.length} topics opened`,
    },
    {
      id: 'retention',
      label: 'Long-term memory',
      value: retention === null ? null : clamp(retention),
      weight: 0.15,
      detail: cards.length ? `${mature} of ${cards.length} cards at 6+ days` : 'Review flashcards to build this',
    },
    {
      id: 'mock',
      label: 'Timed mock',
      value: mock === null ? null : clamp(mock),
      weight: 0.15,
      detail: latest ? `${latest.correct}/${latest.total} on ${latest.date}` : 'No timed mock yet',
    },
  ];

  const available = raw.filter((p) => p.value !== null);
  const totalWeight = available.reduce((s, p) => s + p.weight, 0);
  const score = totalWeight
    ? clamp(available.reduce((s, p) => s + (p.value as number) * p.weight, 0) / totalWeight)
    : 0;

  const confidence = available.length >= 3 ? 'high' : available.length === 2 ? 'medium' : 'low';
  const band: Readiness['band'] =
    available.length < 2
      ? 'Not enough evidence yet'
      : score >= 80
        ? 'Strong'
        : score >= 65
          ? 'Exam-ready'
          : score >= 45
            ? 'Getting steady'
            : 'Building';
  const statusLabel: Readiness['statusLabel'] =
    available.length < 2
      ? 'Not enough evidence'
      : score >= 70
        ? 'On Track'
        : score >= 50
          ? 'Improving'
          : 'At Risk';

  const weakest = attempted
    .slice()
    .sort((a, b) => (state.topics[a.id]?.mastery ?? 0) - (state.topics[b.id]?.mastery ?? 0))[0];
  const unstudied = relevant.find((t) => !state.topics[t.id]?.studied);

  const nextAction =
    !studied && relevant[0]
      ? `Open “${relevant[0].title}” — ten focused minutes is enough.`
      : unstudied
        ? `Try “${unstudied.title}” next; it is the biggest gap in your coverage.`
        : weakest
          ? `Revisit “${weakest.title}” — it has the lowest accuracy right now.`
          : 'Take one timed section to turn knowledge into exam pace.';

  return { score, statusLabel, band, parts: raw, confidence, nextAction };
}

export function overallReadiness(state: AppState, allTopics: Topic[]): number {
  const subjects: SubjectId[] = ['english', 'mathematics', 'management'];
  const scores = subjects.map((s) => readiness(state, s, allTopics).score);
  return clamp(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export const XP_PER_LEVEL = 220;

export function levelInfo(xp: number) {
  // Gentle early levels, then a steadier climb.
  let level = 1;
  let floor = 0;
  let span = 120;
  while (xp >= floor + span) {
    floor += span;
    level += 1;
    span = 120 + (level - 1) * 55;
  }
  return {
    level,
    into: xp - floor,
    span,
    progress: Math.round(((xp - floor) / span) * 100),
  };
}
