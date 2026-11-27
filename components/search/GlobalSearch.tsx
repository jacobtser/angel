'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { searchContent } from '@/lib/search';
import { cn } from '@/lib/cn';

export function GlobalSearch({
  className,
  compact = false,
  autoFocus = false,
}: {
  className?: string;
  compact?: boolean;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQ = pathname === '/search' ? (searchParams.get('q') ?? '') : '';
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    if (pathname === '/search') setQ(searchParams.get('q') ?? '');
  }, [pathname, searchParams]);

  const results = useMemo(() => (q.trim().length > 1 ? searchContent(q, 6) : []), [q]);
  const [open, setOpen] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search/?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={submit} role="search" aria-label="Search the app">
        <label className={cn('flex items-center gap-2 rounded-xl border border-line bg-elev px-3 text-sm text-muted', compact ? 'py-1.5' : 'py-2.5')}>
          <Icon name="search" size={15} />
          <span className="sr-only">Search</span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            placeholder="Search topics, papers, videos..."
            className="w-full bg-transparent text-ink outline-none placeholder:text-muted"
            autoFocus={autoFocus}
          />
        </label>
      </form>
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-elev shadow-lift">
          <div className="p-1.5">
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 hover:bg-[var(--bg-sunk)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.82rem] font-semibold text-ink">{r.title}</p>
                  <span className="text-[0.66rem] text-muted">{r.meta}</span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[0.72rem] text-muted">{r.description}</p>
              </Link>
            ))}
          </div>
          <div className="border-t border-line px-3 py-2">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { const query = q.trim(); if (query) { setOpen(false); router.push(`/search/?q=${encodeURIComponent(query)}`); } }}
              className="text-[0.74rem] font-semibold text-leaf hover:underline"
            >
              See all results for “{q.trim()}”
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
