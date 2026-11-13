'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useAppStore } from '@/lib/store';

/**
 * A short welcome, not a form wall. Everything can be edited later in
 * Settings, and nothing leaves the device.
 */
export function Onboarding() {
  const { state, hydrated, updateProfile } = useAppStore();
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState(state.profile.name || 'Jacob');
  const [examDate, setExamDate] = useState(state.profile.examDate);
  const [provisional, setProvisional] = useState(state.profile.examDateIsProvisional);
  const [confidence, setConfidence] = useState(state.profile.confidence);

  useEffect(() => {
    if (!state.profile.onboarded) return;
    setName(state.profile.name);
    setExamDate(state.profile.examDate);
  }, [state.profile.onboarded, state.profile.name, state.profile.examDate]);

  const open = hydrated && !state.profile.onboarded && !dismissed;

  function save() {
    updateProfile({
      name: name.trim() || 'Jacob',
      examDate,
      examDateIsProvisional: provisional,
      confidence,
      onboarded: true,
    });
  }

  return (
    <Modal
      open={open}
      onClose={() => setDismissed(true)}
      title="This space is yours"
      description="Auntie Angel keeps your progress on this device. No account, no leaderboard of strangers, no one watching over your shoulder."
      size="md"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className="btn btn-ghost" onClick={() => setDismissed(true)}>
            Iâ€™ll do this later
          </button>
          <button type="button" className="btn btn-primary" onClick={save}>
            Begin
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="onboarding-name" className="label">
            What should Jacob call you?
          </label>
          <input
            id="onboarding-name"
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="given-name"
            placeholder="Your first name"
          />
        </div>

        <div>
          <label htmlFor="onboarding-date" className="label">
            When do you sit the exam?
          </label>
          <input
            id="onboarding-date"
            type="date"
            className="input"
            value={examDate}
            onChange={(event) => setExamDate(event.target.value)}
          />
          <label className="mt-2 flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
            <input
              type="checkbox"
              checked={provisional}
              onChange={(event) => setProvisional(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--leaf)]"
            />
            This date is provisional â€” Iâ€™ll confirm it when WAEC publishes the timetable.
          </label>
        </div>

        <div>
          <span className="label">How confident do you feel today?</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setConfidence(value)}
                aria-label={`Confidence ${value} out of 5`}
                aria-pressed={confidence === value}
                className={
                  confidence >= value
                    ? 'grid h-10 flex-1 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf'
                    : 'grid h-10 flex-1 place-items-center rounded-xl border border-line bg-elev text-muted'
                }
              >
                <Icon name="star" size={17} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-[0.75rem] text-muted">
            There is no right answer. This only helps the app choose a gentle starting point.
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--bg-sunk)] p-4 text-[0.8rem] leading-relaxed text-soft">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Icon name="shield" size={15} className="text-leaf" />
            Private by design
          </p>
          <p className="mt-1">
            Progress is stored in this browser. If you clear site data, it is gone â€” export a backup from
            Settings if this device is shared.
          </p>
        </div>
      </div>
    </Modal>
  );
}

