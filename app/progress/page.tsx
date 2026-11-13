'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar, ProgressRing } from '@/components/ui/ProgressRing';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BADGES } from '@/lib/badges';
import { addDays, daysUntil, formatMinutes, isoDay, prettyDate } from '@/lib/date';
import { activityWindow, examSprintPlan, totalMinutes } from '@/lib/plan';
import { overallReadiness, readiness } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { allTopics, findTopic, subjects, subjectById } from '@/content/subjects';
import type { Mood } from '@/lib/types';
import { cn } from '@/lib/cn';

const moodFace: Record<Mood, string> = {
  hopeful: '◡',
  steady: '•',
  tender: '◞',
  tired: '–',
  anxious: '◟',
};

function sumRange(
  state: ReturnType<typeof useAppStore>['state'],
  days: string[],
  kind: 'minutes' | 'questions' | 'correct' | 'cards',
): number {
  const set = new Set(days);
  if (kind === 'minutes') return days.reduce((sum, day) => sum + (state.activity[day] ?? 0), 0);
  if (kind === 'cards') {
    return Object.values(state.srs).filter((card) => card.last && set.has(card.last)).length;
  }
  const quizzes = state.quizzes.filter((quiz) => set.has(quiz.date));
  if (kind === 'questions') return quizzes.reduce((sum, quiz) => sum + quiz.total, 0);
  return quizzes.reduce((sum, quiz) => sum + quiz.correct, 0);
}

function Delta({ value, suffix = '', baseline }: { value: number; suffix?: string; baseline: boolean }) {
  if (!baseline) {
    return <span className="text-[0.68rem] font-semibold text-muted">First week with a record</span>;
  }
  if (value === 0) {
    return <span className="text-[0.68rem] font-semibold text-muted">Holding steady</span>;
  }
  const positive = value > 0;
  return (
    <span
      className={
        positive
          ? 'inline-flex items-center gap-0.5 text-[0.68rem] font-semibold text-leaf'
          : 'inline-flex items-center gap-0.5 text-[0.68rem] font-semibold text-muted'
      }
    >
      {positive ? '+' : '−'}
      {Math.abs(value)}
      {suffix} vs last week
    </span>
  );
}

export default function ProgressPage() {
  const { state, level, hydrated, dueCards } = useAppStore();
  const today = isoDay();
  const thisWeek = Array.from({ length: 7 }, (_, index) => addDays(today, index - 6));
  const lastWeek = Array.from({ length: 7 }, (_, index) => addDays(today, index - 13));

  const overall = overallReadiness(state, allTopics);
  const activity14 = activityWindow(state, 14);
  const maxMinutes = Math.max(1, ...activity14.map((day) => day.minutes));
  const answered = state.quizzes.reduce((sum, quiz) => sum + quiz.total, 0);
  const correct = state.quizzes.reduce((sum, quiz) => sum + quiz.correct, 0);
  const accuracy = answered ? Math.round((correct / answered) * 100) : null;
  const earnedBadges = BADGES.filter((badge) => state.badges.includes(badge.id));
  const recentMocks = [...state.mocks].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const recentQuizzes = state.quizzes.slice(0, 6);
  const latestMood = state.moods[0];

  const minutesThis = sumRange(state, thisWeek, 'minutes');
  const minutesLast = sumRange(state, lastWeek, 'minutes');
  const questionsThis = sumRange(state, thisWeek, 'questions');
  const questionsLast = sumRange(state, lastWeek, 'questions');
  const correctThis = sumRange(state, thisWeek, 'correct');
  const correctLast = sumRange(state, lastWeek, 'correct');
  const cardsThis = sumRange(state, thisWeek, 'cards');
  const cardsLast = sumRange(state, lastWeek, 'cards');

  const accuracyThis = questionsThis ? Math.round((correctThis / questionsThis) * 100) : null;
  const accuracyLast = questionsLast ? Math.round((correctLast / questionsLast) * 100) : null;

  const baseline = minutesLast > 0 || questionsLast > 0 || cardsLast > 0;
  const daysLeft = Math.max(0, daysUntil(state.profile.examDate));
  const examWindowEnd = state.profile.examEndDate || state.profile.examDate;
  const examWindow = `${prettyDate(state.profile.examDate, { day: 'numeric', month: 'short' })} – ${prettyDate(examWindowEnd)}`;
  const sprint = examSprintPlan(state, daysLeft, 7);
  const overallStatus =
    overall >= 70 ? 'On Track' : overall >= 50 ? 'Improving' : answered > 0 ? 'At Risk' : 'Not enough evidence';

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-5 sm:p-8 lg:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative grid gap-7 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div>
            <p className="eyebrow">Evidence, not a verdict</p>
            <h1 className="display-lg mt-2">Your progress, in plain sight</h1>
            <p className="prose-angel mt-3 max-w-2xl">
              These numbers come only from work you have done on this device. A quiet week is not a failed
              week. The point of looking is to choose the next small move — not to grade yourself twice.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/practice/diagnostic/" className="btn btn-primary btn-sm">
                <Icon name="compass" size={15} />
                Start diagnostic
              </Link>
              <Link href="/practice/fix/" className="btn btn-secondary btn-sm">
                <Icon name="target" size={15} />
                Fix weak spots
              </Link>
              <button type="button" onClick={() => window.print()} className="btn btn-ghost btn-sm print:hidden">
                <Icon name="download" size={15} />
                Print report
              </button>
            </div>
            <p className="mt-2 text-[0.72rem] text-muted print:hidden">Overall: <strong className="text-ink">{overallStatus}</strong> · {daysLeft} day{daysLeft === 1 ? '' : 's'} to your first paper · {examWindow}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="glass rounded-2xl p-3.5">
              <p className="eyebrow !text-[0.55rem]">Overall readiness</p>
              <div className="mt-1.5 flex items-center gap-2.5">
                <ProgressRing value={overall} size={58} stroke={6} label="Overall readiness">
                  <span className="tabular font-display text-base font-semibold">{overall}</span>
                </ProgressRing>
                <p className="text-[0.66rem] leading-snug text-muted">A weighted estimate, not a prediction.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-3.5">
              <p className="eyebrow !text-[0.55rem]">Level {level.level}</p>
              <p className="tabular mt-1 font-display text-2xl font-semibold leading-none">
                {state.xp.toLocaleString()}
              </p>
              <p className="mt-1 text-[0.66rem] text-muted">XP earned</p>
              <ProgressBar value={level.progress} label="Level progress" className="mt-1.5" height={5} />
            </div>
            <div className="glass rounded-2xl p-3.5">
              <p className="eyebrow !text-[0.55rem]">Study time</p>
              <p className="tabular mt-1 font-display text-2xl font-semibold leading-none">
                {formatMinutes(totalMinutes(state))}
              </p>
              <p className="mt-1 text-[0.66rem] text-muted">all time on this device</p>
            </div>
            <div className="glass rounded-2xl p-3.5">
              <p className="eyebrow !text-[0.55rem]">Accuracy</p>
              <p className="tabular mt-1 font-display text-2xl font-semibold leading-none">
                {accuracy === null ? '—' : `${accuracy}%`}
              </p>
              <p className="mt-1 text-[0.66rem] text-muted">
                {answered ? `${answered} questions answered` : 'No questions yet'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="mt-7" aria-labelledby="readiness-heading">
          <SectionHeading
            eyebrow="What is shaping the number"
            title="Readiness, unboxed"
            description="Each subject is scored from practice accuracy, topic coverage, long-term card retention and the latest timed mock. Missing evidence lowers confidence; it does not count as a failure."
            as="h2"
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {subjects.map((subject) => {
              const result = readiness(state, subject.id, subject.topics);
              return (
                <article key={subject.id} className={`subject-${subject.id} surface min-w-0 p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span
                        className="chip"
                        style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}
                      >
                        {subject.shortName}
                      </span>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={cn(
                          'chip !py-0.5 !text-[0.62rem] font-bold',
                          result.statusLabel === 'On Track' ? 'chip-leaf' : result.statusLabel === 'Improving' ? 'chip-gold' : result.statusLabel === 'At Risk' ? 'chip-rose' : ''
                        )}>{result.statusLabel}</span>
                      </div>
                      <h3 className="mt-1 font-display text-lg font-semibold">{result.band}</h3>
                      <p className="mt-0.5 text-[0.68rem] font-semibold capitalize text-muted">
                        {result.confidence} confidence
                      </p>
                    </div>
                    <ProgressRing
                      value={result.score}
                      size={64}
                      stroke={6}
                      color="var(--subject)"
                      label={`${subject.shortName} readiness`}
                    >
                      <span className="tabular font-display text-base font-semibold">{result.score}</span>
                    </ProgressRing>
                  </div>

                  <ul className="mt-4 space-y-3">
                    {result.parts.map((part) => (
                      <li key={part.id}>
                        <div className="flex items-center justify-between gap-2 text-[0.72rem]">
                          <span className="min-w-0 font-semibold text-soft">{part.label}</span>
                          <span className="shrink-0 tabular text-muted">
                            {part.value === null ? 'No evidence' : `${part.value}%`}
                            <span className="ml-1 opacity-70">· {Math.round(part.weight * 100)}%</span>
                          </span>
                        </div>
                        <ProgressBar
                          value={part.value ?? 0}
                          color={part.value === null ? 'var(--line-strong)' : 'var(--subject)'}
                          label={`${subject.shortName} ${part.label}`}
                          className="mt-1"
                          height={4}
                        />
                        <p className="mt-1 text-[0.64rem] text-muted">{part.detail}</p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.76rem] leading-relaxed text-soft">
                    <span className="flex items-center gap-1.5 font-semibold text-ink">
                      <Icon name="compass" size={13} className="text-leaf" />
                      Next move
                    </span>
                    <span className="mt-1 block">{result.nextAction}</span>
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal delay={0.04}>
          <section className="surface p-5 sm:p-6" aria-labelledby="activity-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">The last fourteen days</p>
                <h2 id="activity-heading" className="mt-1 font-display text-xl font-semibold">
                  Your study rhythm
                </h2>
              </div>
              <span className="chip">{formatMinutes(activity14.reduce((sum, day) => sum + day.minutes, 0))}</span>
            </div>

            <div
              className="mt-5 flex h-36 items-end gap-1.5"
              role="img"
              aria-label={`Daily study minutes for the last fourteen days: ${activity14
                .map((day) => `${prettyDate(day.day, { day: 'numeric', month: 'short' })} ${day.minutes} minutes`)
                .join(', ')}`}
            >
              {activity14.map((day, index) => {
                const height = day.minutes ? Math.max(8, (day.minutes / maxMinutes) * 100) : 2;
                const isToday = day.day === today;
                return (
                  <div key={day.day} className="group flex h-full flex-1 flex-col justify-end gap-1">
                    <div
                      className="relative w-full rounded-t-md transition-colors"
                      style={{
                        height: `${height}%`,
                        background: day.minutes
                          ? isToday
                            ? 'var(--gold)'
                            : 'var(--leaf)'
                          : 'var(--line)',
                        opacity: day.minutes ? (index < 7 ? 0.55 : 1) : 1,
                      }}
                    >
                      {day.minutes > 0 && (
                        <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--bg-deep)] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#fbf7f0] opacity-0 transition-opacity group-hover:opacity-100">
                          {day.minutes}m
                        </span>
                      )}
                    </div>
                    <span
                      className={
                        isToday
                          ? 'text-center text-[0.55rem] font-bold uppercase tracking-wide text-[var(--gold-ink)]'
                          : 'text-center text-[0.55rem] font-semibold uppercase tracking-wide text-muted'
                      }
                    >
                      {new Intl.DateTimeFormat('en-GB', { weekday: 'narrow' }).format(
                        new Date(`${day.day}T12:00:00`),
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[0.74rem] leading-relaxed text-muted">
              {activity14.every((day) => day.minutes === 0)
                ? 'No minutes recorded yet. The chart is waiting for its first small bar.'
                : 'Minutes are logged automatically when you study, take a mock or play a game. Rest days are part of the pattern, not holes in it.'}
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="surface p-5 sm:p-6" aria-labelledby="past-heading">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="eyebrow">The only fair comparison</p>
                <h2 id="past-heading" className="mt-1 font-display text-xl font-semibold">
                  You, one week ago
                </h2>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--plum-soft)] text-plum">
                <Icon name="user" size={17} />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-line p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.74rem] font-semibold text-muted">Study minutes</span>
                  <span className="tabular font-display text-lg font-semibold">{formatMinutes(minutesThis)}</span>
                </div>
                <Delta value={minutesThis - minutesLast} suffix=" min" baseline={baseline} />
              </div>
              <div className="rounded-xl border border-line p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.74rem] font-semibold text-muted">Questions answered</span>
                  <span className="tabular font-display text-lg font-semibold">{questionsThis}</span>
                </div>
                <Delta value={questionsThis - questionsLast} baseline={baseline} />
              </div>
              <div className="rounded-xl border border-line p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.74rem] font-semibold text-muted">Accuracy this week</span>
                  <span className="tabular font-display text-lg font-semibold">
                    {accuracyThis === null ? '—' : `${accuracyThis}%`}
                  </span>
                </div>
                <Delta
                  value={accuracyThis !== null && accuracyLast !== null ? accuracyThis - accuracyLast : 0}
                  suffix=" pts"
                  baseline={accuracyLast !== null}
                />
              </div>
              <div className="rounded-xl border border-line p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.74rem] font-semibold text-muted">Cards reviewed</span>
                  <span className="tabular font-display text-lg font-semibold">{cardsThis}</span>
                </div>
                <Delta value={cardsThis - cardsLast} baseline={baseline} />
              </div>
            </div>

            <p className="mt-3 text-[0.72rem] leading-relaxed text-muted">
              {baseline
                ? 'A smaller week can still be a wiser week. Look at what changed before deciding what it means.'
                : 'Once there are two weeks of records, this card will show the direction of travel.'}
            </p>

            {latestMood && (
              <Link
                href="/journal/"
                className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--bg-sunk)] px-3 py-2 text-[0.72rem] font-semibold text-soft hover:text-ink"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--leaf-soft)] text-leaf" aria-hidden="true">
                  {moodFace[latestMood.mood]}
                </span>
                Last check-in felt {latestMood.mood}
                <Icon name="chevron-right" size={13} className="ml-auto" />
              </Link>
            )}
          </section>
        </Reveal>
      </div>

      <Reveal delay={0.065}>
        <section className="mt-7" aria-labelledby="syllabus-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Topic-by-topic view</p>
              <h2 id="syllabus-heading" className="mt-1 display-md">Syllabus tracker</h2>
              <p className="mt-1 max-w-2xl text-[0.84rem] leading-relaxed text-muted">See every topic across your subjects, what you’ve opened, and where mastery is growing.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {subjects.map((subject) => (
              <article key={subject.id} className={`subject-${subject.id} surface min-w-0 p-4`}>
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{subject.shortName}</h3>
                  <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
                    {subject.topics.filter((t) => state.topics[t.id]?.studied).length}/{subject.topics.length}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {subject.topics.map((topic) => {
                    const p = state.topics[topic.id];
                    const status = !p?.studied ? 'Not started' : p.attempts ? `${p.mastery}% mastery` : 'Opened';
                    return (
                      <li key={topic.id} className="flex items-center gap-2 rounded-lg border border-line bg-elev px-2.5 py-2">
                        <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', p?.studied ? 'bg-[var(--leaf-soft)] text-leaf' : 'bg-[var(--bg-sunk)] text-muted')}>
                          <Icon name={p?.studied ? 'check' : 'book'} size={11} />
                        </span>
                        <Link href={`/subjects/${subject.id}/${topic.id}/`} className="min-w-0 flex-1 truncate text-[0.78rem] font-semibold hover:underline">{topic.title}</Link>
                        <span className="shrink-0 text-[0.62rem] font-semibold text-muted">{status}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.07}>
        <section className="mt-7" aria-labelledby="sprint-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">A focused daily plan</p>
              <h2 id="sprint-heading" className="mt-1 display-md">Exam sprint plan</h2>
              <p className="mt-1 max-w-2xl text-[0.84rem] leading-relaxed text-muted">
                A simple {sprint.length}-day plan based on your {examWindow} exam window and current gaps. When you are online, use live AI/tutor help as needed; when offline, use saved lessons and downloaded papers.
              </p>
            </div>
            <span className="chip">{daysLeft} days to first paper</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sprint.map((item) => (
              <Link key={`${item.day}-${item.title}`} href={item.href} className={`subject-${item.subject} surface block p-4 transition-transform hover:-translate-y-0.5`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>Day {item.day}</span>
                  <span className="text-[0.68rem] font-semibold text-muted">{subjectById[item.subject].shortName}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-tight">{item.title}</h3>
                <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">{item.detail}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[0.74rem] font-semibold text-leaf">Open <Icon name="arrow-right" size={13} /></span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="mt-7" aria-labelledby="badges-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Quiet work, counted</p>
              <h2 id="badges-heading" className="mt-1 display-md">
                Badges
              </h2>
            </div>
            <span className="chip">
              <Icon name="trophy" size={12} />
              {earnedBadges.length} of {BADGES.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {BADGES.map((badge) => {
              const earned = state.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={
                    earned
                      ? 'surface flex items-start gap-3 p-4'
                      : 'rounded-2xl border border-dashed border-line bg-[var(--bg-sunk)]/50 p-4 opacity-70'
                  }
                >
                  <span
                    className={
                      earned
                        ? 'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold-soft)] text-[var(--gold-ink)]'
                        : 'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bg-sunk)] text-muted'
                    }
                  >
                    <Icon name={earned ? badge.icon : 'lock'} size={16} />
                  </span>
                  <div>
                    <p className="text-[0.8rem] font-semibold leading-tight">{badge.name}</p>
                    <p className="mt-1 text-[0.65rem] leading-snug text-muted">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <section className="surface p-5 sm:p-6" aria-labelledby="mocks-heading">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="eyebrow">Under the clock</p>
                <h2 id="mocks-heading" className="mt-1 font-display text-xl font-semibold">
                  Timed mocks
                </h2>
              </div>
              <Link href="/practice/" className="text-[0.74rem] font-semibold text-leaf hover:underline">
                Sit one
              </Link>
            </div>
            {recentMocks.length ? (
              <ul className="mt-4 space-y-2.5">
                {recentMocks.map((mock) => {
                  const percent = mock.total ? Math.round((mock.correct / mock.total) * 100) : 0;
                  return (
                    <li key={mock.id} className="rounded-xl border border-line p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="chip !py-0.5 !text-[0.64rem]">
                          {subjectById[mock.subject].shortName}
                        </span>
                        <span className="tabular text-[0.74rem] font-semibold">
                          {mock.correct}/{mock.total} · {percent}%
                        </span>
                      </div>
                      <ProgressBar
                        value={percent}
                        color={`var(--${mock.subject === 'management' ? 'gold-ink' : mock.subject === 'english' ? 'rose' : 'sky'})`}
                        label={`${subjectById[mock.subject].shortName} mock score`}
                        className="mt-2"
                        height={4}
                      />
                      <p className="mt-1 text-[0.64rem] text-muted">
                        {prettyDate(mock.date)} · {formatMinutes(Math.round(mock.seconds / 60))}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl bg-[var(--bg-sunk)] p-4 text-[0.8rem] leading-relaxed text-muted">
                No timed mock yet. A mock is not a test of your worth — it is the only way to practise
                choosing what to leave when the clock is real.
              </p>
            )}
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="surface p-5 sm:p-6" aria-labelledby="recent-heading">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="eyebrow">The last few steps</p>
                <h2 id="recent-heading" className="mt-1 font-display text-xl font-semibold">
                  Recent practice
                </h2>
              </div>
              <span className="chip">Due cards {dueCards}</span>
            </div>
            {recentQuizzes.length ? (
              <ul className="mt-4 divide-y divide-line">
                {recentQuizzes.map((quiz) => {
                  const topic = findTopic(quiz.topicId);
                  const percent = quiz.total ? Math.round((quiz.correct / quiz.total) * 100) : 0;
                  return (
                    <li key={quiz.id} className="flex items-center gap-3 py-2.5">
                      <span
                        className={
                          percent >= 70
                            ? 'tabular grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--leaf-soft)] text-[0.64rem] font-bold text-leaf'
                            : 'tabular grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bg-sunk)] text-[0.64rem] font-bold text-soft'
                        }
                      >
                        {percent}%
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.8rem] font-semibold">{topic?.title ?? 'Mixed practice'}</p>
                        <p className="text-[0.64rem] text-muted">
                          {subjectById[quiz.subject].shortName} · {quiz.mode} · {prettyDate(quiz.date)}
                        </p>
                      </div>
                      <span className="tabular text-[0.7rem] text-muted">
                        {quiz.correct}/{quiz.total}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl bg-[var(--bg-sunk)] p-4 text-[0.8rem] leading-relaxed text-muted">
                Nothing here yet. Answer ten quiet questions and this list will start to fill.
              </p>
            )}
            {!hydrated && <p className="mt-3 text-[0.7rem] text-muted">Loading your saved record…</p>}
          </section>
        </Reveal>
      </div>

      <aside className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-[var(--gold-soft)]/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--gold-soft)] text-[var(--gold-ink)]">
            <Icon name="compass" size={19} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold">Numbers are a map, not a mirror</p>
            <p className="mt-0.5 max-w-xl text-[0.8rem] leading-relaxed text-soft">
              If a score is lower than you hoped, look for the smallest next action. If it is higher, enjoy it
              for a moment, then protect the habit that produced it.
            </p>
          </div>
        </div>
        <Link href="/practice/" className="btn btn-primary btn-sm shrink-0">
          Practise now
          <Icon name="arrow-right" size={15} />
        </Link>
      </aside>
    </div>
  );
}

