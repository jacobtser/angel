import type { LiteratureText, PastPaper, SubjectId, SubjectMeta, Topic } from '@/lib/types';
import { english } from './english';
import { mathematics } from './mathematics';
import { management } from './management';
import { literatureTexts } from './literature';
import { poetryTexts } from './poetry';
import rawPastPapers from './past-papers.json';

/** Priority order: English (1), MIL (2), Maths (3). */
export const subjects: SubjectMeta[] = [english, management, mathematics].sort(
  (a, b) => a.priority - b.priority,
);

export const subjectById: Record<SubjectId, SubjectMeta> = {
  english,
  mathematics,
  management,
};

export const allTopics: Topic[] = subjects.flatMap((s) => s.topics);

export const allLiterature: LiteratureText[] = [...literatureTexts, ...poetryTexts];

export const pastPapers = rawPastPapers as PastPaper[];

export const totalPastItems = pastPapers.reduce((n, p) => n + p.items.length, 0);

export function topicsForSubject(subjectId: SubjectId): Topic[] {
  return subjectById[subjectId]?.topics ?? [];
}

export function findTopic(topicId: string): Topic | undefined {
  return allTopics.find((t) => t.id === topicId);
}

/** URL segment for a topic: `english:lexis` → `lexis`. */
export function topicSlug(topicId: string): string {
  return topicId.includes(':') ? topicId.split(':').pop()! : topicId;
}

export function findTopicBySlug(subjectId: SubjectId, slug: string): Topic | undefined {
  return topicsForSubject(subjectId).find((t) => topicSlug(t.id) === slug);
}

export function topicPath(topic: Topic): string {
  return `/subjects/${topic.subject}/${topicSlug(topic.id)}/`;
}

export function findLiterature(id: string): LiteratureText | undefined {
  return allLiterature.find((t) => t.id === id);
}

export function papersForSubject(subjectId: SubjectId): PastPaper[] {
  return pastPapers.filter((p) => p.subject === subjectId);
}

export function literatureForSubject(subjectId: SubjectId): LiteratureText[] {
  if (subjectId !== 'english') return [];
  return allLiterature;
}

export function flashcardsForSubject(subjectId: SubjectId) {
  return subjectById[subjectId].topics.flatMap((t) => t.flashcards);
}

export const allFlashcards = allTopics.flatMap((t) => t.flashcards);

export function countQuizQuestions(subjectId: SubjectId): number {
  return subjectById[subjectId].topics.reduce((n, t) => n + t.quiz.length, 0);
}

/**
 * The 2022–2026 Ghana core English set texts were confirmed by the 2020 and
 * 2023 literature sections in this repository. The cycle rolls over, so the
 * app always shows this note beside the library.
 */
export const literatureCycleNote =
  'These notes cover the Ghana English Language (Core) set texts for the 2022–2026 cycle as included in this app. If you are a private candidate or sitting in a later year, confirm the exact current texts for your paper with your school or ghanawaec.org before revising a text in depth.';
