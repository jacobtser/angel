import { allLiterature, pastPapers, subjects, topicPath } from '@/content/subjects';
import { oralVideos } from '@/content/oral-videos';
import type { SubjectId } from './types';

export interface SearchResult {
  id: string;
  kind: 'subject' | 'topic' | 'literature' | 'paper' | 'oral-video' | 'page';
  title: string;
  description: string;
  href: string;
  meta?: string;
  subject?: SubjectId;
}

const staticPages: SearchResult[] = [
  { id: 'page-orals', kind: 'page', title: 'Oral English', description: 'Practice oral English questions and watch WASSCE oral exam videos.', href: '/orals/', meta: 'Page' },
  { id: 'page-practice', kind: 'page', title: 'Practice & mocks', description: 'Quick practice, mocks, cards, and exam drills.', href: '/practice/', meta: 'Page' },
  { id: 'page-papers', kind: 'page', title: 'Past papers', description: 'Browse and study past paper questions and explanations.', href: '/papers/', meta: 'Page' },
  { id: 'page-literature', kind: 'page', title: 'Literature', description: 'Set texts, poems, themes, characters, and essay guidance.', href: '/literature/', meta: 'Page' },
  { id: 'page-games', kind: 'page', title: 'Games', description: 'Learning games for revision and recall.', href: '/games/', meta: 'Page' },
  { id: 'page-progress', kind: 'page', title: 'Progress', description: 'Track readiness, streaks, and study progress.', href: '/progress/', meta: 'Page' },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function searchContent(query: string, limit = 30): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(' ').filter(Boolean);

  const results: SearchResult[] = [];

  for (const s of subjects) {
    results.push({
      id: `subject-${s.id}`,
      kind: 'subject',
      title: s.name,
      description: s.description,
      href: `/subjects/${s.id}/`,
      meta: 'Subject',
      subject: s.id,
    });
    for (const t of s.topics) {
      results.push({
        id: `topic-${t.id}`,
        kind: 'topic',
        title: t.title,
        description: t.summary,
        href: topicPath(t),
        meta: `${s.shortName} topic`,
        subject: s.id,
      });
    }
  }

  for (const text of allLiterature) {
    results.push({
      id: `lit-${text.id}`,
      kind: 'literature',
      title: `${text.title} — ${text.author}`,
      description: text.blurb,
      href: `/literature/${text.id}/`,
      meta: `Literature • ${text.genre}`,
      subject: 'english',
    });
  }

  for (const paper of pastPapers) {
    results.push({
      id: `paper-${paper.id}`,
      kind: 'paper',
      title: paper.label,
      description: paper.note,
      href: `/papers/${paper.id}/`,
      meta: `Past paper • ${paper.year}`,
      subject: paper.subject,
    });
  }

  for (const video of oralVideos) {
    results.push({
      id: `video-${video.id}`,
      kind: 'oral-video',
      title: video.title,
      description: video.description,
      href: `/orals/?video=${encodeURIComponent(video.id)}`,
      meta: `Oral video${video.year ? ` • ${video.year}` : ''}`,
      subject: 'english',
    });
  }

  results.push(...staticPages);

  const scored = results
    .map((r) => {
      const hay = normalize([r.title, r.description, r.meta ?? '', r.kind].join(' '));
      let score = 0;
      for (const term of terms) {
        if (hay.includes(term)) score += 1;
        if (normalize(r.title).includes(term)) score += 2;
      }
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.r.title.localeCompare(b.r.title));

  return scored.slice(0, limit).map((x) => x.r);
}
