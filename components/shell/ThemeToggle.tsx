'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/store';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { state, updateSettings } = useAppStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const systemDark =
    mounted && typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  const dark = state.settings.theme === 'dark' || (state.settings.theme === 'system' && systemDark);

  return (
    <button
      type="button"
      onClick={() => updateSettings({ theme: dark ? 'light' : 'dark' })}
      className={
        compact
          ? 'grid h-9 w-9 place-items-center rounded-full text-soft transition-colors hover:bg-[var(--bg-sunk)] hover:text-ink'
          : 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-soft transition-colors hover:bg-[var(--bg-sunk)] hover:text-ink'
      }
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={18} />
      {!compact && <span>{dark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  );
}
