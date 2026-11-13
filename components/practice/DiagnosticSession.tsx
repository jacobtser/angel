'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { QuizRunner } from '@/components/practice/QuizRunner';
import { useTutorContext } from '@/components/providers/TutorProvider';
import { subjectById } from '@/content/subjects';
import { buildSubjectKnowledge } from '@/lib/tutorKnowledge';
import { sampleQuestions } from '@/lib/mocks';
import type { QuizQuestion, SubjectId } from '@/lib/types';

export function DiagnosticSession({ subjectId }: { subjectId: SubjectId }) {
  const subject = subjectById[subjectId];
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

  useTutorContext({
    subjectId,
    label: `${subject.name} diagnostic`,
    topicTitle: subject.name,
    bigIdea: 'A short diagnostic to find what is already strong and what needs attention.',
    knowledge: buildSubjectKnowledge(subjectId),
  });

  useEffect(() => {
    setQuestions(sampleQuestions(subjectId, 12));
  }, [subjectId]);

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
          <span className="chip chip-leaf">Diagnostic</span>
          <span className="chip">12 questions</span>
          <span className="chip">Untimed</span>
        </div>
        <h1 className="display-lg mt-3">Find your starting point</h1>
        <p className="prose-angel mt-2 max-w-2xl text-[0.95rem]">
          This short check samples topics across {subject.name}. It is not a grade. The goal is to spot what is
          already on track and which topics need practice next.
        </p>
        <p className="mt-2 rounded-xl bg-[var(--leaf-soft)] px-3 py-2 text-[0.76rem] leading-relaxed text-soft">
          After you finish, your readiness and next-step guidance for this subject will update from what you show here.
        </p>
      </header>

      <div className="mt-5">
        {questions ? (
          <QuizRunner
            questions={questions}
            subject={subjectId}
            topicId={`diagnostic:${subjectId}`}
            title={`${subject.name} — diagnostic`}
            mode="practice"
            exitHref="/practice/"
          />
        ) : (
          <div className="surface skeleton h-[28rem]" aria-label="Preparing your diagnostic" />
        )}
      </div>
    </div>
  );
}
