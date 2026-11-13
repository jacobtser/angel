'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { allLiterature, literatureCycleNote } from '@/content/subjects';
import { cn } from '@/lib/cn';
import type { LiteratureGenre } from '@/lib/types';

const genres: { id: 'all' | LiteratureGenre; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'prose', label: 'Prose' },
  { id: 'drama', label: 'Drama' },
  { id: 'poetry', label: 'Poetry' },
];

const genreIcon = { prose: 'book' as const, drama: 'layers' as const, poetry: 'quote' as const };

export function LiteratureBrowser() {
  const [genre, setGenre] = useState<'all' | LiteratureGenre>('all');
  const [origin, setOrigin] = useState<'all' | 'African' | 'Non-African'>('all');

  const texts = useMemo(
    () =>
      allLiterature.filter(
        (text) =>
          (genre === 'all' || text.genre === genre) && (origin === 'all' || text.origin === origin),
      ),
    [genre, origin],
  );

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">The reading list</p>
          <h1 className="display-lg mt-2">The set texts, made less lonely</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            Four core texts and ten poems, each with a plain-language map of the story, the characters who
            carry it, the themes examiners ask about, and a small bank of short, attributed quotations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-rose">
              <Icon name="book" size={13} />
              {allLiterature.filter((text) => text.genre === 'prose').length} prose
            </span>
            <span className="chip chip-plum">
              <Icon name="layers" size={13} />
              {allLiterature.filter((text) => text.genre === 'drama').length} drama
            </span>
            <span className="chip chip-gold">
              <Icon name="quote" size={13} />
              {allLiterature.filter((text) => text.genre === 'poetry').length} poems
            </span>
          </div>
        </div>
      </section>

      <aside className="mt-4 space-y-3 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-4 text-[0.78rem] leading-relaxed text-soft">
        <p className="flex items-start gap-2">
          <Icon name="info" size={15} className="mt-0.5 shrink-0 text-gold" />
          <span>
            <strong className="text-ink">Private candidate / next exam?</strong> {literatureCycleNote}
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Icon name="compass" size={15} className="mt-0.5 shrink-0 text-leaf" />
          <span>
            <strong className="text-ink">Feeling overwhelmed?</strong> Do not try to study every text at once.
            Start with the ones you are sure appear on your paper, then add one poem at a time. Use the filters
            below to focus.
          </span>
        </p>
      </aside>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-none flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter by genre">
          {genres.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setGenre(item.id)}
              aria-pressed={genre === item.id}
              className={cn('chip shrink-0', genre === item.id && 'chip-leaf border-transparent')}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="scrollbar-none flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter by origin">
          {(['all', 'African', 'Non-African'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setOrigin(item)}
              aria-pressed={origin === item}
              className={cn('chip shrink-0', origin === item && 'chip-gold border-transparent')}
            >
              {item === 'all' ? 'All origins' : item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {texts.map((text) => (
          <Link
            key={text.id}
            href={`/literature/${text.id}/`}
            className="surface group flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="chip chip-plum !py-0.5 !text-[0.6rem] capitalize">
                <Icon name={genreIcon[text.genre]} size={11} />
                {text.genre}
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted">
                {text.origin}
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold leading-tight">{text.title}</h2>
            <p className="mt-0.5 text-[0.76rem] font-semibold text-muted">{text.author}</p>
            <p className="mt-2 flex-1 text-[0.84rem] leading-relaxed text-soft">{text.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[0.76rem] font-semibold text-leaf">
              Open the companion
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {texts.length === 0 && (
        <p className="surface mt-5 p-6 text-center text-sm text-muted">
          No texts match those two filters. Try “Everything” or “All origins”.
        </p>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: 'book' as const,
            title: 'Know the shape',
            body: 'Read the structure first. Knowing where a scene sits keeps plot questions from swallowing your time.',
          },
          {
            icon: 'quote' as const,
            title: 'Learn few quotes well',
            body: 'Three short quotations you can explain beat ten you half-remember. Every quote here has a use.',
          },
          {
            icon: 'pencil' as const,
            title: 'Plan, do not retell',
            body: 'Point, evidence, effect. The essay plans here give you a skeleton; the thinking stays yours.',
          },
        ].map((item) => (
          <div key={item.title} className="surface p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--plum-soft)] text-plum">
              <Icon name={item.icon} size={19} />
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
