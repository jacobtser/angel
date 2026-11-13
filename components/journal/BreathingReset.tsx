'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

const phases = [
  { label: 'Breathe in', seconds: 4, scale: 1 },
  { label: 'Hold', seconds: 4, scale: 1 },
  { label: 'Breathe out', seconds: 6, scale: 0.62 },
  { label: 'Rest', seconds: 2, scale: 0.62 },
];

/**
 * A small, optional reset. No streaks, no scores, no pressure to continue.
 * The animation is decorative; the phase text and counter carry the meaning.
 */
export function BreathingReset() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(phases[0].seconds);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (remaining > 1) {
        setRemaining((value) => value - 1);
        return;
      }
      const nextIndex = (phaseIndex + 1) % phases.length;
      setPhaseIndex(nextIndex);
      setRemaining(phases[nextIndex].seconds);
      if (nextIndex === 0) setCycles((count) => count + 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [running, phaseIndex, remaining]);

  function toggle() {
    if (running) {
      setRunning(false);
      return;
    }
    setPhaseIndex(0);
    setRemaining(phases[0].seconds);
    setRunning(true);
  }

  const phase = phases[phaseIndex];

  return (
    <section className="surface overflow-hidden" aria-labelledby="breathing-heading">
      <div className="ai-wash border-b border-line px-5 py-4">
        <p className="eyebrow">Ninety seconds, if you want them</p>
        <h2 id="breathing-heading" className="mt-1 font-display text-xl font-semibold">
          A breathing reset
        </h2>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-5">
          <div className="relative grid h-24 w-24 shrink-0 place-items-center">
            <span
              className="absolute inset-0 rounded-full bg-[var(--leaf-soft)] transition-transform duration-1000 ease-gentle"
              style={{ transform: `scale(${phase.scale})` }}
              aria-hidden="true"
            />
            <span className="relative font-display text-2xl font-semibold text-leaf" aria-live="polite">
              {running ? remaining : '•'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl font-semibold">{running ? phase.label : 'Take your time'}</p>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
              {running
                ? 'Let the breath be quiet, not deep. If holding is uncomfortable, breathe normally instead.'
                : 'A box breath to settle the body before the next page. Stop whenever you like — there is no score here.'}
            </p>
            <p className="mt-1 text-[0.68rem] font-semibold text-muted">
              {cycles} round{cycles === 1 ? '' : 's'} completed
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className={cn('btn btn-sm', running ? 'btn-secondary' : 'btn-primary')}
          >
            <Icon name={running ? 'clock' : 'leaf'} size={15} />
            {running ? 'Pause' : cycles > 0 ? 'Go again' : 'Begin'}
          </button>
          {running && (
            <span className="text-[0.7rem] text-muted" aria-live="polite">
              Four in, hold four, six out, rest two.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
