'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Confetti } from '@/components/ui/Confetti';
import { useAppStore } from '@/lib/store';
import type { Badge } from '@/lib/types';

function Toast({ badge, onClose }: { badge: Badge; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onClose, 6500);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="surface flex items-start gap-3 p-4 shadow-lift"
      role="status"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--gold-soft)] text-[var(--gold-ink)]">
        <Icon name={badge.icon} size={21} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold">Badge unlocked · +25 XP</p>
        <p className="mt-0.5 font-display text-lg font-semibold leading-tight">{badge.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{badge.description}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={`Dismiss ${badge.name} badge`}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted hover:bg-[var(--bg-sunk)] hover:text-ink"
      >
        <Icon name="x" size={15} />
      </button>
    </motion.div>
  );
}

export function BadgeToasts() {
  const { newBadges, dismissBadge } = useAppStore();

  return (
    <>
      {newBadges.length > 0 && <Confetti pieces={26} />}
      <div className="pointer-events-none fixed right-3 top-20 z-[120] flex w-[calc(100%-1.5rem)] max-w-sm flex-col gap-2 sm:right-5 lg:top-5">
        <AnimatePresence initial={false}>
          {newBadges.slice(-3).map((badge) => (
            <div key={badge.id} className="pointer-events-auto">
              <Toast badge={badge} onClose={() => dismissBadge(badge.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
