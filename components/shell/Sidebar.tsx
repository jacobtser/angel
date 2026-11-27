'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Brand } from '@/components/ui/Brand';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { cn } from '@/lib/cn';
import { formatMinutes } from '@/lib/date';
import { levelInfo } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { usePwa } from '@/components/providers/PwaProvider';
import { isActive, studyNav, youNav, type NavItem } from './nav';
import { ThemeToggle } from './ThemeToggle';

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-semibold transition-colors',
        active
          ? 'bg-[var(--leaf-soft)] text-leaf'
          : 'text-soft hover:bg-[var(--bg-sunk)] hover:text-ink',
      )}
    >
      <Icon
        name={item.icon}
        size={19}
        className={cn(
          'shrink-0 transition-transform duration-200',
          !active && 'group-hover:-translate-y-0.5',
        )}
      />
      <span className="flex-1">{item.label}</span>
      {active && <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />}
    </Link>
  );
}

export function Sidebar() {
  const { state, level, todayMinutes, dueCards } = useAppStore();
  const { canInstall, installed, install, online } = usePwa();
  const pathname = usePathname();

  const settingsActive = pathname.startsWith('/settings');

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[268px] flex-col border-r border-line bg-elev lg:flex">
      <div className="px-5 pb-5 pt-6">
        <Brand />
        <div className="mt-4">
          <Suspense fallback={<div className="h-10 rounded-xl border border-line bg-elev" />}>
            <GlobalSearch />
          </Suspense>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="eyebrow px-3 pb-2 pt-1">Study</p>
        <nav className="space-y-1" aria-label="Study">
          {studyNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <p className="eyebrow px-3 pb-2 pt-6">You</p>
        <nav className="space-y-1" aria-label="Your progress">
          {youNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {dueCards > 0 && (
          <Link
            href="/practice/"
            className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold-soft)] p-3.5 text-[var(--gold-ink)]"
          >
            <Icon name="layers" size={18} className="mt-0.5 shrink-0" />
            <span className="text-xs leading-relaxed">
              <strong className="block text-[0.82rem]">{dueCards} cards are due</strong>
              A short review now is worth more than an hour on Friday.
            </span>
          </Link>
        )}
      </div>

      <div className="border-t border-line p-3">
        <div className="rounded-2xl bg-[var(--bg-sunk)] p-3.5">
          <div className="flex items-center justify-between text-xs font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="flame" size={14} className="text-gold" />
              {state.streak.count} day{state.streak.count === 1 ? '' : 's'}
            </span>
            <span>{formatMinutes(todayMinutes)} today</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[0.78rem] font-semibold text-soft">
            <span>Level {level.level}</span>
            <span className="tabular text-muted">
              {level.into}/{level.span} XP
            </span>
          </div>
          <ProgressBar value={level.progress} label="Level progress" className="mt-1.5" height={6} />
        </div>

        <div className="mt-2.5 space-y-0.5">
          <ThemeToggle />
          <Link
            href="/settings/"
            aria-current={settingsActive ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
              settingsActive
                ? 'bg-[var(--leaf-soft)] text-leaf'
                : 'text-soft hover:bg-[var(--bg-sunk)] hover:text-ink',
            )}
          >
            <Icon name="settings" size={18} />
            Settings
          </Link>
        </div>

        {!online && (
          <p className="mt-2 flex items-center gap-2 rounded-xl bg-[var(--gold-soft)] px-3 py-2 text-[0.72rem] font-semibold text-[var(--gold-ink)]">
            <Icon name="wifi-off" size={14} />
            Offline — saved work still opens
          </p>
        )}

        {canInstall && !installed && (
          <button
            type="button"
            onClick={() => void install()}
            className="btn btn-secondary btn-sm mt-2 w-full"
          >
            <Icon name="install" size={15} />
            Install app
          </button>
        )}
      </div>
    </aside>
  );
}
