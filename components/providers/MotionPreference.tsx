'use client';

import { MotionConfig } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/**
 * Framer Motion reads the operating-system preference by default. This lets
 * the learner make the same choice inside the app, for a shared or unfamiliar
 * device where the OS setting is not hers to change.
 */
export function MotionPreference({ children }: { children: React.ReactNode }) {
  const { state } = useAppStore();
  return (
    <MotionConfig reducedMotion={state.settings.reducedMotion ? 'always' : 'user'}>
      {children}
    </MotionConfig>
  );
}
