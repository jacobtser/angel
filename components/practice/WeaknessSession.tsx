'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { QuizRunner } from '@/components/practice/QuizRunner';
import { useTutorContext } from '@/components/providers/TutorProvider';
import { subjectById, topicsForSubject } from '@/content/subjects';
import { buildSubjectKnowledge, buildTopicKnowledge } from '@/lib/tutorKnowledge';
import { useAppStore } from '@/lib/store';
import type { QuizQuestion, SubjectId } from '@/lib/types';

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WeaknessSession({ subjectId }: { subjectId: SubjectId }) {
  const subject = subjectById[subjectId];
  const { state } = useAppStore();
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

  useTutorContext({
    subjectId,
    label: `${subject.name} review & fix`,
    topicTitle: subject.name,
    bigIdea: 'Target the topics that need the most attention right now.',
    knowledge: [
      buildSubjectKnowledge(subjectId),
      weakTopics.length ? '\nFOCUS TOPICS (needs attention now):\n' + weakTopics.map((t) => buildTopicKnowledge(t)).join('\n\n---\n') : '',
    ].join('\n'),
  });

  const weakTopics = useMemo(() => {
    return topicsForSubject(subjectId)
      .slice()
      .sort((a, b) => {
        const pa = state.topics[a.id];
        const pb = state.topics[b.id];
        const sa = pa ? (pa.attempts ? pa.mastery : 15) : -5;
        const sb = pb ? (pb.attempts ? pb.mastery : 15) : -5;
        if (sa !== sb) return sa - sb;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 4);
  }, [state.topics, subjectId]);

  useEffect(() => {
    const pools = weakTopics.map((t) => shuffle(t.quiz));
    const picked: QuizQuestion[] = [];
    let round = 0;
    while (picked.length < 12) {
      let added = false;
      for (const pool of pools) {
        const q = pool[round];
        if (q && !picked.find((p) => p.id === q.id)) {
          picked.push(q);
          added = true;
          if (picked.length >= 12) break;
        }
      }
      if (!added) break;
      round += 1;
    }
    setQuestions(shuffle(picked));
  }, [weakTopics]);

  return (
    <div>
      <Link
        href="/practice/"
        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
      >
        <Icon name="arrow-left" size={15} />
        Practice hub
      </Link>

      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`subject-${subjectId} chip`} style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
            {subject.shortName}
          </span>
          <span className="chip chip-gold">Review &amp; fix</span>
          <span className="chip">{questions?.length ?? 12} questions</span>
          <span className="chip">Untimed</span>
        </div>
        <h1 className="display-lg mt-3">Work on what needs you most</h1>
        <p className="prose-angel mt-2 max-w-2xl text-[0.95rem]">
          This set focuses on topics in {subject.name} where you have less evidence or lower mastery right now.
          Read each explanation carefully — that is where the fixing happens.
        </p>
        {weakTopics.length > 0 && (
          <div className="mt-3 rounded-xl border border-line bg-[var(--bg-sunk)] p-3">
            <p className="text-[0.72rem] font-semibold text-ink">Focus topics in this set</p>
            <p className="mt-1 text-[0.76rem] leading-relaxed text-muted">
              {weakTopics.map((t) => t.title).join(' · ')}
            </p>
          </div>
        )}
      </header>

      <div className="mt-5">
        {questions ? (
          <QuizRunner
            questions={questions}
            subject={subjectId}
            topicId={`fix:${subjectId}`}
            title={`${subject.name} — review & fix`}
            mode="practice"
            exitHref="/practice/"
          />
        ) : (
          <div className="surface skeleton h-[28rem]" aria-label="Preparing your review set" />
        )}
      </div>
    </div>
  );
}
