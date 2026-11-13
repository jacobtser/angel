import { isoDay, lastNDays } from './date';
import { subjects, allTopics, subjectById, topicsForSubject } from '@/content/subjects';
import { readiness } from './progress';
import type { AppState, QuizQuestion, SubjectId, Topic } from './types';

export interface Focus {
  topic: Topic;
  subject: SubjectId;
  reason: string;
}

/**
 * Pick one honest next step. English comes first because it is the paper that
 * unlocks the others; within a subject, an unread topic beats re-reading a
 * comfortable one. Once coverage is complete, the weakest mastery wins.
 */
export function todaysFocus(state: AppState): Focus {
  for (const subject of subjects) {
    const unread = topicsForSubject(subject.id).find((topic) => !state.topics[topic.id]?.studied);
    if (unread) {
      return {
        topic: unread,
        subject: subject.id,
        reason: `New topic in ${subject.shortName} — ten minutes is enough to begin.`,
      };
    }
  }

  const attempted = allTopics
    .filter((topic) => (state.topics[topic.id]?.attempts ?? 0) > 0)
    .sort((a, b) => (state.topics[a.id]?.mastery ?? 100) - (state.topics[b.id]?.mastery ?? 100));

  const weakest = attempted[0] ?? topicsForSubject('english')[0];
  return {
    topic: weakest,
    subject: weakest.subject,
    reason: `Your lowest accuracy right now is in ${subjectById[weakest.subject].shortName}. A short revisit will lift it.`,
  };
}

export interface DailyTask {
  id: 'read' | 'questions' | 'cards';
  label: string;
  detail: string;
  done: boolean;
  href: string;
}

export function dailyTasks(state: AppState): DailyTask[] {
  const today = isoDay();
  const readToday = Object.values(state.topics).some((topic) => topic.lastSeen === today && topic.studied);
  const questionsToday = state.quizzes
    .filter((quiz) => quiz.date === today)
    .reduce((total, quiz) => total + quiz.total, 0);
  const cardsToday = Object.values(state.srs).filter((card) => card.last === today).length;

  return [
    {
      id: 'read',
      label: 'Open one lesson',
      detail: readToday ? 'Done for today' : 'Read a topic through, slowly',
      done: readToday,
      href: '/subjects/',
    },
    {
      id: 'questions',
      label: 'Answer ten questions',
      detail: questionsToday >= 10 ? `${questionsToday} answered` : `${questionsToday}/10 answered`,
      done: questionsToday >= 10,
      href: '/practice/',
    },
    {
      id: 'cards',
      label: 'Review five cards',
      detail: cardsToday >= 5 ? `${cardsToday} reviewed` : `${cardsToday}/5 reviewed`,
      done: cardsToday >= 5,
      href: '/practice/',
    },
  ];
}

export function activityWindow(state: AppState, days = 7): { day: string; minutes: number }[] {
  return lastNDays(days).map((day) => ({ day, minutes: state.activity[day] ?? 0 }));
}

export function totalMinutes(state: AppState): number {
  return Object.values(state.activity).reduce((sum, minutes) => sum + minutes, 0);
}

export function subjectScore(state: AppState, subjectId: SubjectId): number {
  return readiness(state, subjectId, topicsForSubject(subjectId)).score;
}

export function subjectProgressSummary(state: AppState, subjectId: SubjectId) {
  const topics = topicsForSubject(subjectId);
  const studied = topics.filter((topic) => state.topics[topic.id]?.studied).length;
  const attempted = topics.reduce((sum, topic) => sum + (state.topics[topic.id]?.attempts ?? 0), 0);
  const correct = topics.reduce((sum, topic) => sum + (state.topics[topic.id]?.correct ?? 0), 0);
  return {
    topics: topics.length,
    studied,
    attempted,
    accuracy: attempted ? Math.round((correct / attempted) * 100) : null,
  };
}

export interface SprintDay {
  day: number;
  title: string;
  detail: string;
  href: string;
  subject: SubjectId;
}

/** A simple exam-sprint plan based on days left and current weak/uncovered topics. */
export function examSprintPlan(state: AppState, daysLeft: number, length = 7): SprintDay[] {
  const days = Math.max(3, Math.min(length, daysLeft > 0 ? Math.min(length, daysLeft) : length));
  const priority: SubjectId[] = ['english', 'management', 'mathematics'];
  const ranked: Topic[] = [];
  for (const sid of priority) {
    const topics = topicsForSubject(sid)
      .slice()
      .sort((a, b) => {
        const pa = state.topics[a.id];
        const pb = state.topics[b.id];
        const sa = !pa?.studied ? -1 : pa.mastery ?? 0;
        const sb = !pb?.studied ? -1 : pb.mastery ?? 0;
        return sa - sb;
      });
    ranked.push(...topics);
  }
  const plan: SprintDay[] = [];
  for (let i = 0; i < days; i++) {
    const topic = ranked[i % ranked.length];
    const subject = topic.subject;
    const isMockDay = (i + 1) % 4 === 0;
    plan.push(
      isMockDay
        ? {
            day: i + 1,
            title: `Timed section — ${subjectById[subject].shortName}`,
            detail: 'Sit a short timed section, then review every explanation.',
            href: `/practice/mock/${subject}/`,
            subject,
          }
        : {
            day: i + 1,
            title: topic.title,
            detail: `Focus on ${subjectById[subject].shortName}: lesson + 10 questions. ${state.topics[topic.id]?.studied ? 'Revise to lift accuracy.' : 'New ground — start gently.'}`,
            href: `/subjects/${subject}/${topic.id}/`,
            subject,
          },
    );
  }
  return plan;
}

export function weaknessQuestions(state: AppState, count = 15) {
  // Pick questions from topics with lowest mastery / least evidence first.
  const topics = allTopics
    .slice()
    .sort((a, b) => {
      const pa = state.topics[a.id];
      const pb = state.topics[b.id];
      const sa = pa ? (pa.attempts ? pa.mastery : 20) : -1;
      const sb = pb ? (pb.attempts ? pb.mastery : 20) : -1;
      return sa - sb;
    });
  const picked: QuizQuestion[] = [];
  let round = 0;
  while (picked.length < count) {
    let added = false;
    for (const topic of topics) {
      const q = topic.quiz[round % Math.max(1, topic.quiz.length)];
      if (q && !picked.find((p) => p.id === q.id)) {
        picked.push(q);
        added = true;
        if (picked.length >= count) break;
      }
    }
    if (!added) break;
    round += 1;
    if (round > 20) break;
  }
  // shuffle lightly
  for (let i = picked.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [picked[i], picked[j]] = [picked[j], picked[i]];
  }
  return picked.slice(0, count);
}
