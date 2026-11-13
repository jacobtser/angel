'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { FlashcardReview } from '@/components/practice/FlashcardReview';
import { useTutorContext } from '@/components/providers/TutorProvider';
import { allFlashcards, subjectById } from '@/content/subjects';
import { buildSiteKnowledgeSummary } from '@/lib/tutorKnowledge';
import { isoDay } from '@/lib/date';
import { useAppStore } from '@/lib/store';

export function DueCards() {
  const { state, hydrated } = useAppStore();
  const [mode, setMode] = useState<'due' | 'all'>('due');

  const due = useMemo(
    () => allFlashcards.filter((card) => (state.srs[card.id]?.due ?? isoDay()) <= isoDay()),
    [state.srs],
  );

  const cards = mode === 'due' ? due : allFlashcards;

  const cardKnowledge = useMemo(() => {
    const sample = cards.slice(0, 20).map((c) => `- [${c.subject}/${c.topicId}] Q: ${c.front} | A: ${c.back}${c.hint ? ` (hint: ${c.hint})` : ''}`).join('\n');
    return [
      buildSiteKnowledgeSummary(),
      'MODULE: Spaced-repetition flashcards (recall before rereading). Rate honestly: Again/Hard/Good/Easy.',
      sample ? `Cards in current set (use to guide recall, do not reveal answer immediately):\n${sample}` : '',
    ].filter(Boolean).join('\n\n');
  }, [cards]);

  useTutorContext({
    label: 'Flashcards',
    bigIdea:
      'Recall before rereading. The struggle to retrieve an answer is what tells your brain the information matters.',
    knowledge: cardKnowledge,
  });
  const bySubject = (['english', 'management', 'mathematics'] as const).map((id) => ({
    id,
    due: due.filter((card) => card.subject === id).length,
  }));

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
        <p className="eyebrow">Spaced repetition</p>
        <h1 className="display-lg mt-1">The cards that are ready</h1>
        <p className="prose-angel mt-2 max-w-2xl text-[0.95rem]">
          {hydrated
            ? due.length > 0
              ? `${due.length} card${due.length === 1 ? '' : 's'} are due. Rate honestly — “Again” is data, not failure.`
              : 'Nothing is due right now. You can still run a voluntary round; it will not break the schedule.'
            : 'Loading your review schedule…'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {bySubject.map((item) => (
            <span key={item.id} className={`subject-${item.id} chip`} style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
              {subjectById[item.id].shortName}: {item.due}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setMode('due')}
            aria-pressed={mode === 'due'}
            className={mode === 'due' ? 'chip chip-leaf border-transparent' : 'chip'}
          >
            Due now ({due.length})
          </button>
          <button
            type="button"
            onClick={() => setMode('all')}
            aria-pressed={mode === 'all'}
            className={mode === 'all' ? 'chip chip-leaf border-transparent' : 'chip'}
          >
            Review anyway ({allFlashcards.length})
          </button>
        </div>
        <p className="text-[0.7rem] text-muted">A round is capped at 20 cards.</p>
      </div>

      <div className="mt-4">
        {cards.length > 0 ? (
          <FlashcardReview
            key={mode}
            cards={cards}
            title={mode === 'due' ? 'Due today' : 'Voluntary review'}
            limit={20}
          />
        ) : (
          <div className="surface p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--leaf-soft)] text-leaf">
              <Icon name="check-circle" size={25} />
            </span>
            <h2 className="mt-3 font-display text-xl font-semibold">Nothing due today</h2>
            <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
              The schedule is doing its job. Come back tomorrow, or run a voluntary round if you want the
              extra repetition.
            </p>
            <button type="button" onClick={() => setMode('all')} className="btn btn-secondary btn-sm mt-4">
              Review all cards
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        )}
      </div>

      <aside className="mt-6 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-5 text-[0.8rem] leading-relaxed text-soft">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="brain" size={15} className="text-gold" />
          How the schedule thinks
        </p>
        <p className="mt-1.5">
          Cards return just before you would forget them. “Easy” stretches the gap; “Again” brings the card
          back tomorrow. The aim is not a perfect streak — it is durable memory with the least wasted time.
        </p>
      </aside>
    </div>
  );
}
