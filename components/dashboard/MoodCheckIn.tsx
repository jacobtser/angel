'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { isoDay } from '@/lib/date';
import { moods } from '@/content/wellbeing';
import { useAppStore } from '@/lib/store';

export function MoodCheckIn() {
  const { state, setMood } = useAppStore();
  const [editing, setEditing] = useState(false);
  const today = isoDay();
  const current = state.moods.find((entry) => entry.date === today);
  const meta = current ? moods.find((mood) => mood.id === current.mood) : null;

  return (
    <section className="surface p-5 sm:p-6" aria-labelledby="mood-heading">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">A quiet check-in</p>
          <h2 id="mood-heading" className="mt-1 font-display text-xl font-semibold">
            How are you arriving today?
          </h2>
        </div>
        {current && (
          <button type="button" onClick={() => setEditing((value) => !value)} className="btn btn-ghost btn-sm">
            Change
          </button>
        )}
      </div>

      {!current || editing ? (
        <>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => {
                  setMood(mood.id);
                  setEditing(false);
                }}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-elev px-1 py-3 text-[0.72rem] font-semibold text-soft transition-all hover:-translate-y-0.5 hover:border-leaf hover:text-ink',
                  current?.mood === mood.id && 'border-leaf bg-[var(--leaf-soft)] text-leaf',
                )}
                aria-pressed={current?.mood === mood.id}
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-xl"
                  style={{ background: `var(--${mood.tone}-soft)`, color: `var(--${mood.tone})` }}
                  aria-hidden="true"
                >
                  {mood.face}
                </span>
                {mood.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.72rem] leading-relaxed text-muted">
            No streak is lost for an honest answer. This is information, not a performance.
          </p>
        </>
      ) : (
        meta && (
          <div className="mt-4 flex items-start gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-2xl"
              style={{ background: `var(--${meta.tone}-soft)`, color: `var(--${meta.tone})` }}
              aria-hidden="true"
            >
              {meta.face}
            </span>
            <div>
              <p className="font-display text-lg font-semibold">{meta.response}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-soft">{meta.suggestion}</p>
            </div>
          </div>
        )
      )}

      {current && !editing && (
        <p className="mt-4 flex items-center gap-1.5 text-[0.72rem] font-semibold text-muted">
          <Icon name="check-circle" size={13} className="text-leaf" />
          Checked in today
        </p>
      )}
    </section>
  );
}
