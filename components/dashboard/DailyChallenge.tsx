'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { Confetti } from '@/components/ui/Confetti';
import { isoDay } from '@/lib/date';
import { dailyTasks } from '@/lib/plan';
import { useAppStore } from '@/lib/store';

export function DailyChallenge() {
  const { state, hydrated, awardXp } = useAppStore();
  const tasks = dailyTasks(state);
  const done = tasks.filter((task) => task.done).length;
  const complete = done === tasks.length;
  const [celebrate, setCelebrate] = useState(false);
  const awarded = useRef(false);

  useEffect(() => {
    if (!hydrated || !complete || awarded.current) return;
    const key = `auntie-angel:challenge:${isoDay()}`;
    try {
      if (window.localStorage.getItem(key)) {
        awarded.current = true;
        return;
      }
      window.localStorage.setItem(key, 'done');
    } catch {
      /* storage can fail; the XP is still awarded this session */
    }
    awarded.current = true;
    awardXp(25);
    setCelebrate(true);
    const timer = window.setTimeout(() => setCelebrate(false), 3200);
    return () => window.clearTimeout(timer);
  }, [complete, hydrated, awardXp]);

  return (
    <>
      {celebrate && <Confetti pieces={30} />}
      <section className="surface p-5 sm:p-6" aria-labelledby="challenge-heading">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Today’s small promise</p>
            <h2 id="challenge-heading" className="mt-1 font-display text-xl font-semibold">
              Three things. That is all.
            </h2>
          </div>
          <span className="chip chip-gold">{done}/3</span>
        </div>

        <ProgressBar value={(done / tasks.length) * 100} label="Daily challenge progress" className="mt-3" height={6} />

        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link
                href={task.href}
                className="flex items-center gap-3 rounded-xl px-1.5 py-2 transition-colors hover:bg-[var(--bg-sunk)]"
              >
                <span
                  className={
                    task.done
                      ? 'tick'
                      : 'grid h-[1.35rem] w-[1.35rem] shrink-0 place-items-center rounded-full border border-line-strong text-muted'
                  }
                >
                  {task.done && <Icon name="check" size={12} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={
                      task.done
                        ? 'block text-[0.86rem] font-semibold text-muted line-through decoration-1'
                        : 'block text-[0.86rem] font-semibold text-ink'
                    }
                  >
                    {task.label}
                  </span>
                  <span className="block text-[0.72rem] text-muted">{task.detail}</span>
                </span>
                <Icon name="chevron-right" size={15} className="shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-3 flex items-center gap-1.5 text-[0.72rem] font-semibold text-leaf">
          <Icon name="zap" size={13} />
          {complete ? 'All three done — +25 XP banked.' : 'Finish all three for +25 XP.'}
        </p>
      </section>
    </>
  );
}
