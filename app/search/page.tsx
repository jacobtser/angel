import { Suspense } from 'react';
import { SearchResults } from '@/components/search/SearchResults';

export const metadata = {
  title: 'Search',
  description: 'Search topics, literature, past papers, oral videos, and study pages in Auntie Angel.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="surface p-6 text-sm text-muted">Loading search…</div>}>
      <SearchResults />
    </Suspense>
  );
}
