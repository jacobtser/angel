'use client';

import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/Icon';
import { games, type GameSlug } from '@/content/games';
import { useAppStore } from '@/lib/store';

const gameIcon: Record<GameSlug, IconName> = {
  'word-match': 'layers',
  'comprehension-dash': 'book',
  'number-quest': 'target',
  'budget-balance': 'heart',
  'flashcard-duel': 'zap',
};

const accent: Record<string, string> = {
  rose: 'var(--rose)',
  sky: 'var(--sky)',
  gold: 'var(--gold-ink)',
  plum: 'var(--plum)',
  leaf: 'var(--leaf)',
};

export default function GamesPage() {
  const { state } = useAppStore();

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Revision, but with a pulse</p>
          <h1 className="display-lg mt-2">Five ways to make it stick</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            Games are not a break from studying. They are retrieval practice with a score attached. There is
            no leaderboard of strangers here — the only person you play against is the learner you were
            yesterday.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-leaf">
              <Icon name="zap" size={13} />
              XP for every round
            </span>
            <span className="chip">
              <Icon name="shield" size={13} />
              Best scores stay on this device
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game, index) => {
          const best = state.games[game.slug]?.score ?? 0;
          const color = accent[game.accent];
          return (
            <Link
              key={game.slug}
              href={`/games/${game.slug}/`}
              className={
                index === 0
                  ? 'surface group flex flex-col p-5 transition-transform hover:-translate-y-1 md:col-span-2 xl:col-span-1'
                  : 'surface group flex flex-col p-5 transition-transform hover:-translate-y-1'
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `color-mix(in srgb, ${color} 13%, transparent)`, color }}
                >
                  <Icon name={gameIcon[game.slug]} size={21} />
                </span>
                <span className="chip capitalize">{game.subject}</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold">{game.name}</h2>
              <p className="mt-1 flex-1 text-[0.85rem] leading-relaxed text-muted">{game.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {game.skills.map((skill) => (
                  <span key={skill} className="chip !py-0.5 !text-[0.6rem]">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[0.7rem] text-muted">
                  <Icon name="clock" size={11} className="mr-1 inline" />
                  {game.minutes} min · best {best}
                </span>
                <span className="inline-flex items-center gap-1 text-[0.76rem] font-semibold" style={{ color }}>
                  Play
                  <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: 'brain' as const,
            title: 'Retrieval beats rereading',
            body: 'Every game asks you to pull something out of memory. That effort is what makes the memory stronger.',
          },
          {
            icon: 'flame' as const,
            title: 'Short rounds, often',
            body: 'Five minutes daily will do more than an hour on Sunday. Stop while it is still a little fun.',
          },
          {
            icon: 'trophy' as const,
            title: 'Compare with past you',
            body: 'A personal best is evidence of progress. A stranger’s score tells you nothing about your paper.',
          },
        ].map((item) => (
          <div key={item.title} className="surface p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf">
              <Icon name={item.icon} size={19} />
            </span>
            <h2 className="mt-3 font-display text-lg font-semibold">{item.title}</h2>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
