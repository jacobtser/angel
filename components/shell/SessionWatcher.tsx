'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { isoDay, formatMinutes } from '@/lib/date';
import { useAppStore } from '@/lib/store';

const BREAK_AFTER_MINUTES = 50;
const LONG_DAY_MINUTES = 180;

/**
 * Gentle guardrails, not productivity policing.
 *
 * Two things trigger a pause: a single long sitting, and a very long study
 * day. Both are dismissible. Neither blocks the app or uses shame language.
 */
export function SessionWatcher() {
  const { hydrated, todayMinutes, state } = useAppStore();
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [breakOpen, setBreakOpen] = useState(false);
  const [longDayOpen, setLongDayOpen] = useState(false);

  const longDayKey = `auntie-angel:longday:${isoDay()}`;

  useEffect(() => {
    if (!hydrated || !state.settings.reminders) return;
    try {
      if (state.activity[isoDay()] >= LONG_DAY_MINUTES && !window.localStorage.getItem(longDayKey)) {
        setLongDayOpen(true);
      }
    } catch {
      /* ignore */
    }
  }, [hydrated, state.activity, state.settings.reminders, longDayKey, todayMinutes]);

  useEffect(() => {
    if (!hydrated || !state.settings.reminders) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setSessionMinutes((minutes) => {
        const next = minutes + 1;
        if (next >= BREAK_AFTER_MINUTES) setBreakOpen(true);
        return next;
      });
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [hydrated, state.settings.reminders]);

  const closeBreak = useCallback(() => {
    setBreakOpen(false);
    setSessionMinutes(0);
  }, []);

  const closeLongDay = useCallback(() => {
    setLongDayOpen(false);
    try {
      window.localStorage.setItem(longDayKey, 'seen');
    } catch {
      /* ignore */
    }
  }, [longDayKey]);

  return (
    <>
      <Modal
        open={breakOpen && !longDayOpen}
        onClose={closeBreak}
        title="A real pause, before the next page"
        description="You have been with the work for a while. Ten honest minutes away will make the next ten minutes sharper."
        size="sm"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={closeBreak}>
              Not now
            </button>
            <button type="button" className="btn btn-primary" onClick={closeBreak}>
              <Icon name="coffee" size={16} />
              I have taken a break
            </button>
          </div>
        }
      >
        <ul className="space-y-3 text-sm leading-relaxed text-soft">
          <li className="flex gap-2.5">
            <span className="tick mt-0.5">
              <Icon name="check" size={12} />
            </span>
            Stand up and let your shoulders drop.
          </li>
          <li className="flex gap-2.5">
            <span className="tick mt-0.5">
              <Icon name="check" size={12} />
            </span>
            Drink water. Look at something far away for twenty seconds.
          </li>
          <li className="flex gap-2.5">
            <span className="tick mt-0.5">
              <Icon name="check" size={12} />
            </span>
            No scrolling — scrolling is not rest.
          </li>
        </ul>
      </Modal>

      <Modal
        open={longDayOpen}
        onClose={closeLongDay}
        title="That is more than three hours today"
        description="This is not a scolding. It is a pattern worth noticing."
        size="sm"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={closeLongDay}>
              I understand
            </button>
            <Link href="/journal/" className="btn btn-primary" onClick={closeLongDay}>
              <Icon name="heart" size={16} />
              Open the wellbeing page
            </Link>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-soft">
          You have logged <strong className="text-ink">{formatMinutes(todayMinutes)}</strong> of focused work
          today. Tired brains read more slowly, make more careless errors and remember less of what they
          revise. The best next move may be to stop while it is still going well.
        </p>
        <div className="mt-4 rounded-2xl bg-[var(--leaf-soft)] p-4 text-sm leading-relaxed text-soft">
          <p className="font-semibold text-ink">A smaller evening plan</p>
          <p className="mt-1">
            Put the books away, eat something, and sleep. Tomorrow, begin with five flashcards — not the
            whole syllabus.
          </p>
        </div>
      </Modal>
    </>
  );
}
