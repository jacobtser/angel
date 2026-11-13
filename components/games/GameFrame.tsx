'use client';

import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Confetti } from '@/components/ui/Confetti';
import { gameBySlug, type GameSlug } from '@/content/games';
import { useAppStore } from '@/lib/store';

const gameIcon: Record<GameSlug, IconName> = {
  'word-match': 'layers',
  'comprehension-dash': 'book',
  'number-quest': 'target',
  'budget-balance': 'heart',
  'flashcard-duel': 'zap',
};

const accentVar: Record<string, string> = {
  rose: 'var(--rose)',
  sky: 'var(--sky)',
  gold: 'var(--gold-ink)',
  plum: 'var(--plum)',
  leaf: 'var(--leaf)',
};

export function GameFrame({ slug, children }: { slug: GameSlug; children: React.ReactNode }) {
  const meta = gameBySlug(slug);
  const { state } = useAppStore();
  if (!meta) return null;
  const best = state.games[slug]?.score ?? 0;
  const accent = accentVar[meta.accent];

  return (
    <div>
      <Link
        href="/games/"
        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
      >
        <Icon name="arrow-left" size={15} />
        All games
      </Link>

      <header className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="chip"
              style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
            >
              <Icon name={gameIcon[slug]} size={12} />
              {meta.subject === 'mixed' ? 'Mixed' : meta.subject}
            </span>
            <span className="chip">
              <Icon name="clock" size={12} />
              {meta.minutes} min
            </span>
          </div>
          <h1 className="display-lg mt-2">{meta.name}</h1>
          <p className="prose-angel mt-1.5 max-w-2xl text-[0.95rem]">{meta.description}</p>
        </div>
        <div className="rounded-2xl border border-line bg-elev px-4 py-2.5 text-right">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-muted">Your best</p>
          <p className="tabular font-display text-2xl font-semibold leading-none">{best}</p>
        </div>
      </header>

      <div className="mt-5">{children}</div>
    </div>
  );
}

export function GameFinish({
  score,
  best,
  label,
  headline,
  body,
  onRestart,
  celebrate = false,
  extra,
}: {
  score: number;
  best: number;
  label: string;
  headline: string;
  body: string;
  onRestart: () => void;
  celebrate?: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <div>
      {celebrate && <Confetti pieces={28} />}
      <div className="surface overflow-hidden p-6 text-center sm:p-8">
        <p className="eyebrow">Round complete</p>
        <p className="tabular mt-2 font-display text-6xl font-semibold leading-none">{score}</p>
        <p className="mt-1 text-sm font-semibold text-muted">{label}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold">{headline}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-soft">{body}</p>
        {extra}
        <p className="mt-3 text-[0.72rem] text-muted">
          Your best in this game: {Math.max(best, score)}. Scores are stored on this device.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={onRestart} className="btn btn-primary">
            <Icon name="refresh" size={16} />
            Play again
          </button>
          <Link href="/games/" className="btn btn-secondary">
            All games
          </Link>
        </div>
      </div>
    </div>
  );
}
