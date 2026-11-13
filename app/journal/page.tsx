'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { MoodCheckIn } from '@/components/dashboard/MoodCheckIn';
import { BreathingReset } from '@/components/journal/BreathingReset';
import { useTutor } from '@/components/providers/TutorProvider';
import { affirmationFor, journalPromptFor, moods } from '@/content/wellbeing';
import { formatMinutes, isoDay, lastNDays, prettyDate } from '@/lib/date';
import { useAppStore } from '@/lib/store';
import type { AppState } from '@/lib/types';

function buildInsight(state: AppState): string {
  const week = lastNDays(7);
  const weekSet = new Set(week);
  const minutes = week.reduce((sum, day) => sum + (state.activity[day] ?? 0), 0);
  const quizzes = state.quizzes.filter((quiz) => weekSet.has(quiz.date));
  const answered = quizzes.reduce((sum, quiz) => sum + quiz.total, 0);
  const correct = quizzes.reduce((sum, quiz) => sum + quiz.correct, 0);
  const topics = Object.entries(state.topics).filter(
    ([, topic]) => topic.lastSeen && weekSet.has(topic.lastSeen),
  ).length;
  const moodEntries = state.moods.filter((entry) => weekSet.has(entry.date));
  const heavy = moodEntries.filter((entry) => entry.mood === 'tired' || entry.mood === 'anxious').length;

  const parts: string[] = [];
  parts.push(
    minutes > 0
      ? `You gave this week ${formatMinutes(minutes)} of focused time.`
      : 'This week has no logged study minutes yet. That is a fact, not a judgement — the week is not over.',
  );
  if (answered > 0) {
    const accuracy = Math.round((correct / answered) * 100);
    parts.push(`${answered} questions went past you, with ${accuracy}% landing correctly.`);
  } else {
    parts.push('No questions were answered this week. One small set would give the week a shape.');
  }
  if (topics > 0) parts.push(`${topics} topic${topics === 1 ? '' : 's'} were revisited.`);
  if (heavy >= 2) {
    parts.push(
      'You also checked in tired or anxious more than once. That deserves attention, not a productivity lecture.',
    );
  } else if (moodEntries.length >= 3) {
    parts.push('Your check-ins suggest a fairly steady week.');
  }
  parts.push(
    minutes >= 120
      ? 'The next move is not to do more. It is to protect what is already working and leave one evening genuinely free.'
      : 'The next move is small: one lesson, or five cards, on a day that still has some room in it.',
  );
  return parts.join(' ');
}

export default function JournalPage() {
  const { state, hydrated, saveJournal, todayMinutes } = useAppStore();
  const { openTutor } = useTutor();
  const [wins, setWins] = useState('');
  const [challenge, setChallenge] = useState('');
  const [next, setNext] = useState('');
  const [saved, setSaved] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const today = isoDay();
  const prompt = journalPromptFor(today);
  const affirmation = affirmationFor(today);
  const trail = lastNDays(14);
  const canSave = wins.trim().length > 0 || challenge.trim().length > 0 || next.trim().length > 0;

  function submit() {
    if (!canSave) return;
    const generated = buildInsight(state);
    saveJournal({
      wins: wins.trim(),
      challenge: challenge.trim(),
      next: next.trim(),
      insight: generated,
    });
    setInsight(generated);
    setWins('');
    setChallenge('');
    setNext('');
    setSaved(true);
  }

  function reflectWithJacob() {
    const text = [wins && `A win: ${wins}`, challenge && `A challenge: ${challenge}`, next && `Next: ${next}`]
      .filter(Boolean)
      .join('\n');
    openTutor({
      label: 'Weekly reflection',
      bigIdea:
        text ||
        'The learner is reflecting on their week. Help them notice one honest next step without turning it into a lecture.',
      knowledge: [
        'MODULE: Journal/wellbeing reflection. Be brief, kind, and practical. Help the learner notice one honest next step; do not lecture.',
        text ? `Learner notes:\n${text}` : '',
      ].filter(Boolean).join('\n'),
    });
  }

  const entries = state.journal.slice(0, 12);
  const moodMap = new Map(state.moods.map((entry) => [entry.date, entry.mood]));

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-5 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">The page behind the scores</p>
          <h1 className="display-lg mt-2">How is this really going?</h1>
          <p className="prose-angel mt-3">
            The exam is one part of your life; you are the whole person sitting it. This page keeps a record of
            the weather, not just the work. Nothing here is shared, and no entry can break a streak.
          </p>
          <p className="mt-5 max-w-xl font-display text-[1.1rem] italic leading-relaxed text-soft">
            “{affirmation}”
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip chip-leaf">
              <Icon name="lock" size={13} />
              Stored on this device
            </span>
            <span className="chip">
              <Icon name="pencil" size={13} />
              {state.journal.length} reflection{state.journal.length === 1 ? '' : 's'}
            </span>
            <span className="chip">
              <Icon name="flame" size={13} />
              {state.streak.count} day streak
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <MoodCheckIn />
        </Reveal>
        <Reveal delay={0.05}>
          <BreathingReset />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <section className="surface mt-4 p-5 sm:p-6" aria-labelledby="mood-trail-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">The last two weeks</p>
              <h2 id="mood-trail-heading" className="mt-1 font-display text-xl font-semibold">
                Your weather
              </h2>
            </div>
            <span className="text-[0.68rem] text-muted">A blank day is not a bad day.</span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
            {trail.map((day) => {
              const moodId = moodMap.get(day);
              const mood = moodId ? moods.find((item) => item.id === moodId) : null;
              return (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1 rounded-xl border border-line bg-elev px-1 py-2"
                  title={`${prettyDate(day)}${mood ? ` · ${mood.label}` : ' · no check-in'}`}
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full text-sm"
                    style={
                      mood
                        ? { background: `var(--${mood.tone}-soft)`, color: `var(--${mood.tone})` }
                        : { background: 'var(--bg-sunk)', color: 'var(--muted)' }
                    }
                    aria-label={mood ? mood.label : 'No check-in'}
                  >
                    {mood ? mood.face : '·'}
                  </span>
                  <span className="text-[0.52rem] font-semibold uppercase tracking-wide text-muted">
                    {new Intl.DateTimeFormat('en-GB', { weekday: 'narrow' }).format(
                      new Date(`${day}T12:00:00`),
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <Reveal delay={0.1}>
          <section className="surface p-5 sm:p-6" aria-labelledby="reflection-heading">
            <p className="eyebrow">One honest page</p>
            <h2 id="reflection-heading" className="mt-1 font-display text-2xl font-semibold">
              This week’s reflection
            </h2>
            <p className="mt-1 font-display text-[1rem] italic leading-relaxed text-soft">“{prompt}”</p>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="journal-wins" className="label">
                  What went right, even slightly?
                </label>
                <textarea
                  id="journal-wins"
                  className="textarea !min-h-[5.5rem]"
                  value={wins}
                  onChange={(event) => {
                    setWins(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="One sentence is enough."
                  maxLength={1000}
                />
              </div>
              <div>
                <label htmlFor="journal-challenge" className="label">
                  What was hard?
                </label>
                <textarea
                  id="journal-challenge"
                  className="textarea !min-h-[5.5rem]"
                  value={challenge}
                  onChange={(event) => {
                    setChallenge(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="Name it plainly. You do not have to solve it here."
                  maxLength={1000}
                />
              </div>
              <div>
                <label htmlFor="journal-next" className="label">
                  What is the next small move?
                </label>
                <textarea
                  id="journal-next"
                  className="textarea !min-h-[4.5rem]"
                  value={next}
                  onChange={(event) => {
                    setNext(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="Small enough to do on a tired day."
                  maxLength={1000}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={submit} disabled={!canSave} className="btn btn-primary">
                <Icon name="pencil" size={16} />
                Save this page
              </button>
              <button type="button" onClick={reflectWithJacob} className="btn btn-secondary btn-sm">
                <Icon name="spark" size={15} />
                Talk it through with Jacob
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-muted">
              Saving earns 12 XP. The local note below is generated from this week’s activity, not sent to an
              AI. “Talk it through” opens the tutor; nothing is shared unless you send a message there.
            </p>

            {saved && insight && (
              <div className="mt-4 rounded-2xl bg-[var(--leaf-soft)] p-4 text-[0.82rem] leading-relaxed text-soft">
                <p className="flex items-center gap-1.5 font-semibold text-ink">
                  <Icon name="check-circle" size={15} className="text-leaf" />
                  Saved. One small note from your week:
                </p>
                <p className="mt-1">{insight}</p>
              </div>
            )}
          </section>
        </Reveal>

        <aside className="space-y-4">
          <Reveal delay={0.12}>
            <section className="surface p-5">
              <p className="eyebrow">Notice the pattern</p>
              <h2 className="mt-1 font-display text-lg font-semibold">Today’s load</h2>
              <p className="tabular mt-1 font-display text-3xl font-semibold leading-none">
                {formatMinutes(todayMinutes)}
              </p>
              <p className="mt-1 text-[0.72rem] text-muted">of focused work logged today</p>
              <div
                className={
                  todayMinutes >= 180
                    ? 'mt-3 rounded-xl bg-[var(--gold-soft)] p-3 text-[0.76rem] leading-relaxed text-soft'
                    : 'mt-3 rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.76rem] leading-relaxed text-soft'
                }
              >
                <p className="flex items-center gap-1.5 font-semibold text-ink">
                  <Icon name={todayMinutes >= 180 ? 'alert' : 'leaf'} size={14} className="text-gold" />
                  {todayMinutes >= 180 ? 'More than three hours' : 'A day, not a competition'}
                </p>
                <p className="mt-1">
                  {todayMinutes >= 180
                    ? 'Tired brains read more slowly and remember less. The strongest next move may be to stop, eat something and sleep. The work will still be here.'
                    : 'The plan works better when rest is scheduled with the same seriousness as revision. You do not have to earn rest.'}
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.14}>
            <section className="surface p-5">
              <p className="eyebrow">If today is heavy</p>
              <h2 className="mt-1 font-display text-lg font-semibold">You are allowed to ask for help</h2>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-soft">
                Exam stress is real, but it is not the whole of you. Tell one person you trust how you are
                actually doing. If you feel unsafe or unable to cope, contact a health professional or local
                emergency service — this app is a study tool, not a crisis service.
              </p>
              <Link href="/settings/" className="mt-3 inline-flex items-center gap-1 text-[0.74rem] font-semibold text-leaf hover:underline">
                Adjust your exam date or profile
                <Icon name="arrow-right" size={13} />
              </Link>
            </section>
          </Reveal>
        </aside>
      </div>

      <Reveal delay={0.16}>
        <section className="mt-7" aria-labelledby="entries-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">A record, not a report card</p>
              <h2 id="entries-heading" className="mt-1 display-md">
                Past pages
              </h2>
            </div>
            <span className="chip">{state.journal.length} entr{state.journal.length === 1 ? 'y' : 'ies'}</span>
          </div>

          {entries.length ? (
            <div className="mt-4 space-y-3">
              {entries.map((entry, index) => (
                <details
                  key={entry.id}
                  className="surface group overflow-hidden p-0"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--plum-soft)] text-plum">
                      <Icon name="book" size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.86rem] font-semibold">{prettyDate(entry.date)}</p>
                      <p className="truncate text-[0.7rem] text-muted">
                        {entry.wins || entry.challenge || entry.next || 'A saved reflection'}
                      </p>
                    </div>
                    <Icon
                      name="chevron-down"
                      size={16}
                      className="shrink-0 text-muted transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="space-y-3 border-t border-line px-5 py-4 text-[0.84rem] leading-relaxed text-soft">
                    {entry.wins && (
                      <p>
                        <strong className="text-ink">What went right: </strong>
                        {entry.wins}
                      </p>
                    )}
                    {entry.challenge && (
                      <p>
                        <strong className="text-ink">What was hard: </strong>
                        {entry.challenge}
                      </p>
                    )}
                    {entry.next && (
                      <p>
                        <strong className="text-ink">Next small move: </strong>
                        {entry.next}
                      </p>
                    )}
                    {entry.insight && (
                      <p className="rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.78rem]">
                        <strong className="text-ink">Note from that week: </strong>
                        {entry.insight}
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p className="surface mt-4 p-6 text-center text-sm leading-relaxed text-muted">
              {hydrated
                ? 'No pages yet. The first one can be three short sentences. It does not have to be wise.'
                : 'Loading your saved pages…'}
            </p>
          )}
        </section>
      </Reveal>
    </div>
  );
}
