'use client';

import { AuntieAma } from '@/components/tutor/AuntieAma';
import { BadgeToasts } from './BadgeToasts';
import { MobileBottomNav, MobileHeader } from './MobileNav';
import { SessionWatcher } from './SessionWatcher';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-elev focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lift"
      >
        Skip to content
      </a>

      <Sidebar />
      <MobileHeader />

      <main id="main" className="relative z-[1] min-w-0 lg:pl-[268px]">
        <div className="mx-auto w-full max-w-shell min-w-0 px-4 pb-[calc(8rem+env(safe-area-inset-bottom,0px))] pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-9">
          {children}
        </div>
      </main>

      <MobileBottomNav />
      <AuntieAma />
      <BadgeToasts />
      <SessionWatcher />
    </div>
  );
}
