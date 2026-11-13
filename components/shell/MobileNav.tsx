'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Brand } from '@/components/ui/Brand';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/lib/store';
import { usePwa, downloadLabel } from '@/components/providers/PwaProvider';
import { isActive, mobileNav, studyNav, youNav } from './nav';
import { ThemeToggle } from './ThemeToggle';

export function MobileHeader() {
  const { state } = useAppStore();
  const { installed, canInstall, install, online } = usePwa();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="glass sticky top-0 z-40 border-b lg:hidden">
        <div className="flex h-16 items-center justify-between gap-2 px-4">
          <Brand compact />
          <div className="flex items-center gap-0.5">
            <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-[var(--gold-soft)] px-2 py-1 text-[0.7rem] font-bold text-[var(--gold-ink)]">
              <Icon name="flame" size={13} />
              {state.streak.count}
            </span>
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-soft hover:bg-[var(--bg-sunk)] hover:text-ink"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Icon name="menu" size={21} />
            </button>
          </div>
        </div>
        {!online && (
          <p className="flex items-center gap-2 bg-[var(--gold-soft)] px-4 py-1.5 text-[0.72rem] font-semibold text-[var(--gold-ink)]">
            <Icon name="wifi-off" size={13} />
            Offline — your saved lessons and papers still open.
          </p>
        )}
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-[#0b1210]/45 backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col border-l border-line bg-elev shadow-lift"
              initial={reduce ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { x: 0 } : { x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Brand compact />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-[var(--bg-sunk)] hover:text-ink"
                  aria-label="Close menu"
                >
                  <Icon name="x" size={19} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <p className="eyebrow px-3 pb-2">Study</p>
                <nav className="space-y-1" aria-label="Study">
                  {studyNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] font-semibold',
                        isActive(pathname, item.href)
                          ? 'bg-[var(--leaf-soft)] text-leaf'
                          : 'text-soft',
                      )}
                    >
                      <Icon name={item.icon} size={19} />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <p className="eyebrow px-3 pb-2 pt-5">You</p>
                <nav className="space-y-1" aria-label="Your progress">
                  {youNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] font-semibold',
                        isActive(pathname, item.href)
                          ? 'bg-[var(--leaf-soft)] text-leaf'
                          : 'text-soft',
                      )}
                    >
                      <Icon name={item.icon} size={19} />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 space-y-1 border-t border-line pt-3">
                  <Link
                    href="/settings/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] font-semibold text-soft"
                  >
                    <Icon name="settings" size={19} />
                    Settings
                  </Link>
                  {state.downloads.english && (
                    <p className="flex items-center gap-2 px-3 py-1 text-[0.75rem] font-semibold text-leaf">
                      <Icon name="check-circle" size={14} />
                      English is {downloadLabel('english', state, undefined).toLowerCase()}
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t border-line p-4">
                {canInstall && !installed ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void install();
                    }}
                    className="btn btn-primary w-full"
                  >
                    <Icon name="install" size={16} />
                    Install on this device
                  </button>
                ) : (
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-muted">
                    <Icon name="shield" size={14} />
                    Your work stays on this device.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="glass fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Main"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {mobileNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-1 px-1 pb-2.5 pt-2 text-[0.62rem] font-bold tracking-wide transition-colors',
                active ? 'text-leaf' : 'text-muted hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'grid h-8 w-11 place-items-center rounded-full transition-colors',
                  active && 'bg-[var(--leaf-soft)]',
                )}
              >
                <Icon name={item.icon} size={19} strokeWidth={active ? 2.1 : 1.8} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
