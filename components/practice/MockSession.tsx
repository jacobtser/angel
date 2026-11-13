'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { QuizRunner } from '@/components/practice/QuizRunner';
import { useTutorContext } from '@/components/providers/TutorProvider';
import { subjectById } from '@/content/subjects';
import { buildSubjectKnowledge } from '@/lib/tutorKnowledge';
import { mockPlan, sampleQuestions } from '@/lib/mocks';
import type { QuizQuestion, SubjectId } from '@/lib/types';

export function MockSession({
  subjectId,
  variant,
}: {
  subjectId: SubjectId;
  variant: 'mock' | 'quick';
}) {
  const subject = subjectById[subjectId];
  const plan = mockPlan[subjectId];
  const count = variant === 'mock' ? plan.questions : 10;
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

  useTutorContext({
    subjectId,
    label: variant === 'mock' ? `${subject.name} timed section` : `${subject.name} quick practice`,
    topicTitle: subject.name,
    bigIdea: subject.tagline,
    knowledge: `${buildSubjectKnowledge(subjectId)}\n\n${variant === 'mock' ? `Timed section note: ${plan.note}` : 'Quick untimed practice: focus on accuracy and reasoning.'}`,
  });

  useEffect(() => {
    setQuestions(sampleQuestions(subjectId, count));
  }, [subjectId, count]);

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
          <span className="chip">{count} questions</span>
          {variant === 'mock' ? (
            <span className="chip chip-rose">
              <Icon name="timer" size={12} />
              {Math.round(plan.seconds / 60)} minutes
            </span>
          ) : (
            <span className="chip chip-leaf">Untimed</span>
          )}
        </div>
        <h1 className="display-lg mt-3">
          {variant === 'mock' ? 'A timed slice' : 'Ten quiet questions'}
        </h1>
        <p className="prose-angel mt-2 max-w-2xl text-[0.95rem]">
          {variant === 'mock'
            ? plan.note
            : 'No clock, no pressure. Use this to find out what you actually know before you add speed.'}
        </p>
        {variant === 'mock' && (
          <p className="mt-2 rounded-xl bg-[var(--gold-soft)] px-3 py-2 text-[0.76rem] leading-relaxed text-[var(--gold-ink)]">
            This is a slice, not a full WAEC paper. Stop when the timer ends, even if you have questions left —
            the point is to practise the decision to move on.
          </p>
        )}
      </header>

      <div className="mt-5">
        {questions ? (
          <QuizRunner
            questions={questions}
            subject={subjectId}
            topicId={variant === 'mock' ? `mock:${subjectId}` : `quick:${subjectId}`}
            title={variant === 'mock' ? `${subject.name} — timed section` : `${subject.name} — quick practice`}
            mode={variant === 'mock' ? 'mock' : 'practice'}
            seconds={variant === 'mock' ? plan.seconds : undefined}
            exitHref="/practice/"
          />
        ) : (
          <div className="surface skeleton h-[28rem]" aria-label="Preparing your questions" />
        )}
      </div>
    </div>
  );
}
