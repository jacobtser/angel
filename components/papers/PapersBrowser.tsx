'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { pastPapers, subjectById, totalPastItems } from '@/content/subjects';
import { cn } from '@/lib/cn';
import type { SubjectId } from '@/lib/types';

const subjectTabs: { id: 'all' | SubjectId; label: string }[] = [
  { id: 'all', label: 'All papers' },
  { id: 'english', label: 'English' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'management', label: 'Management' },
];

export function PapersBrowser() {
  const [subject, setSubject] = useState<'all' | SubjectId>('all');
  const [query, setQuery] = useState('');

  const papers = useMemo(() => {
    const search = query.trim().toLowerCase();
    return pastPapers.filter((paper) => {
      if (subject !== 'all' && paper.subject !== subject) return false;
      if (!search) return true;
      return (
        paper.label.toLowerCase().includes(search) ||
        paper.year.includes(search) ||
        paper.source.toLowerCase().includes(search)
      );
    });
  }, [subject, query]);

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">The archive</p>
          <h1 className="display-lg mt-2">Past questions, with the reasoning shown</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            {pastPapers.length} papers and {totalPastItems} worked items recovered from the papers in this
            vault. Answers are visible on request, so you can attempt first and check after — not read the
            answer and call it revision.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-rose">
              <Icon name="book" size={13} />
              English · 7 papers
            </span>
            <span className="chip chip-gold">
              <Icon name="layers" size={13} />
              Mathematics · 1 report
            </span>
            <span className="chip">
              <Icon name="info" size={13} />
              No marking scheme in the vault
            </span>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-none flex flex-wrap gap-1.5" role="group" aria-label="Filter by subject">
          {subjectTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubject(tab.id)}
              aria-pressed={subject === tab.id}
              className={cn('chip shrink-0', subject === tab.id && 'chip-leaf border-transparent')}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search papers</span>
          <Icon
            name="search"
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            className="input !min-h-9 !rounded-full !py-1.5 !pl-9 text-[0.82rem]"
            placeholder="Search year or paper…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {papers.map((paper) => {
          const paperSubject = subjectById[paper.subject];
          return (
            <article key={paper.id} className="surface flex flex-col p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`subject-${paper.subject} chip`} style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
                  {paperSubject.shortName}
                </span>
                <span className="chip">{paper.year}</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold leading-tight">{paper.label}</h2>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{paper.note}</p>
              <p className="mt-2 text-[0.68rem] break-words text-muted">
                <span className="font-semibold text-ink">Source:</span> {paper.source}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link href={`/papers/${paper.id}/`} className="btn btn-primary btn-sm">
                  <Icon name="book" size={14} />
                  Open {paper.items.length} items
                </Link>
                {paper.pdf && (
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Icon name="external" size={14} />
                    Original PDF
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {papers.length === 0 && (
        <div className="surface mt-5 p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--bg-sunk)] text-muted">
            <Icon name={subject === 'management' ? 'info' : 'search'} size={22} />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold">
            {subject === 'management' ? 'No Management in Living paper in the vault' : 'Nothing matches that search'}
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted">
            {subject === 'management'
              ? 'The vault contains a WAEC timetable for this subject, not a question paper. The MIL practice in this app is original and clearly labelled, so it is never passed off as a past paper.'
              : 'Try a year, a paper name, or switch back to all subjects.'}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSubject('all');
                setQuery('');
              }}
              className="btn btn-secondary btn-sm"
            >
              Clear filters
            </button>
            {subject === 'management' && (
              <Link href="/subjects/management/" className="btn btn-primary btn-sm">
                Study MIL
                <Icon name="arrow-right" size={14} />
              </Link>
            )}
          </div>
        </div>
      )}

      <aside className="mt-7 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-5 text-[0.82rem] leading-relaxed text-soft">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="info" size={16} className="text-gold" />
          How to use the archive honestly
        </p>
        <ul className="mt-2 space-y-1.5">
          <li>• Attempt the question with the answer covered. The effort is what makes it stick.</li>
          <li>• Items marked “check” come from a damaged scan; treat the printed option as uncertain.</li>
          <li>• Essay items have model plans, not single correct answers. Your examples can differ.</li>
          <li>• None of these PDFs includes a WAEC marking scheme. The reasoning is reconstructed and labelled.</li>
        </ul>
      </aside>
    </div>
  );
}
