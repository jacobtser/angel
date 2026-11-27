'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { GlobalSearch } from './GlobalSearch';
import { searchContent } from '@/lib/search';

const kindLabel: Record<string, string> = {
  subject: 'Subject',
  topic: 'Topic',
  literature: 'Literature',
  paper: 'Past paper',
  'oral-video': 'Oral video',
  page: 'Page',
};

export function SearchResults() {
  const params = useSearchParams();
  const q = (params.get('q') ?? '').trim();
  const results = useMemo(() => searchContent(q, 50), [q]);

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-8">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Search</p>
          <h1 className="display-lg mt-2">Find what you need</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            Search subjects, topics, literature, past papers, oral exam videos, and study pages.
          </p>
          <div className="mt-4 max-w-xl">
            <GlobalSearch autoFocus />
          </div>
        </div>
      </section>

      <section className="surface mt-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-xl font-semibold">
            {q ? `Results for “${q}”` : 'Start typing to search'}
          </h2>
          {q && <span className="chip">{results.length} result{results.length === 1 ? '' : 's'}</span>}
        </div>

        {!q ? (
          <p className="mt-3 text-[0.88rem] text-muted">Try “orals”, “comprehension”, “poetry”, “2023 paper”, or “stress”.</p>
        ) : results.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-line bg-elev p-5 text-sm text-muted">
            No results found. Try a different keyword, subject name, year, or test number.
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {results.map((r) => (
              <Link key={r.id} href={r.href} className="block rounded-2xl border border-line bg-elev p-4 transition-colors hover:border-rose">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">{r.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{r.description}</p>
                  </div>
                  <span className="chip shrink-0"><Icon name="search" size={12} />{r.meta ?? kindLabel[r.kind] ?? r.kind}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
