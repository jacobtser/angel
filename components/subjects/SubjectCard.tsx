'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { cn } from '@/lib/cn';
import { readiness } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import type { SubjectMeta } from '@/lib/types';
import { subjectProgressSummary } from '@/lib/plan';

export function SubjectCard({
  subject,
  featured = false,
  className,
}: {
  subject: SubjectMeta;
  featured?: boolean;
  className?: string;
}) {
  const { state } = useAppStore();
  const score = readiness(state, subject.id, subject.topics).score;
  const summary = subjectProgressSummary(state, subject.id);

  return (
    <Link
      href={`/subjects/${subject.id}/`}
      className={cn(
        `subject-${subject.id}`,
        'surface group relative flex flex-col overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6',
        featured && 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-8',
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: 'var(--subject)' }}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
            Priority {subject.priority}
          </span>
          {featured && (
            <span className="chip chip-leaf">
              <Icon name="star" size={12} />
              Start here
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] sm:text-2xl">
          {subject.name}
        </h3>
        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{subject.tagline}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-[0.78rem]">
          <div>
            <p className="font-semibold text-ink">
              {summary.studied}/{summary.topics} topics
            </p>
            <p className="text-muted">opened</p>
          </div>
          <div>
            <p className="font-semibold text-ink">
              {summary.accuracy === null ? '—' : `${summary.accuracy}%`}
            </p>
            <p className="text-muted">practice accuracy</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar
            value={summary.topics ? (summary.studied / summary.topics) * 100 : 0}
            color="var(--subject)"
            label={`${subject.name} topic coverage`}
            height={6}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 sm:mt-0 sm:w-[132px] sm:flex-col sm:items-end">
        <ProgressRing
          value={score}
          size={featured ? 108 : 92}
          color="var(--subject)"
          label={`${subject.name} readiness`}
        >
          <span className="text-center">
            <span className="tabular block font-display text-xl font-semibold leading-none text-ink">
              {score}
            </span>
            <span className="mt-0.5 block text-[0.58rem] font-bold uppercase tracking-[0.12em] text-muted">
              readiness
            </span>
          </span>
        </ProgressRing>
        <span className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">
          Open
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
