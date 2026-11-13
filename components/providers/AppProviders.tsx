'use client';

import { AppStoreProvider } from '@/lib/store';
import { TutorProvider } from './TutorProvider';
import { PwaProvider } from './PwaProvider';
import { MotionPreference } from './MotionPreference';

/**
 * Provider order matters: both the tutor and the offline layer read the
 * learner's profile, settings and download history from the store.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <MotionPreference>
        <TutorProvider>
          <PwaProvider>{children}</PwaProvider>
        </TutorProvider>
      </MotionPreference>
    </AppStoreProvider>
  );
}
