'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar, ProgressRing } from '@/components/ui/ProgressRing';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Sparkline } from '@/components/ui/Sparkline';
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { DailyChallenge } from '@/components/dashboard/DailyChallenge';
import { MoodCheckIn } from '@/components/dashboard/MoodCheckIn';
import { Onboarding } from '@/components/dashboard/Onboarding';
import { usePwa, downloadLabel } from '@/components/providers/PwaProvider';
import { useTutor } from '@/components/providers/TutorProvider';
import { allTopics, pastPapers, subjects, subjectById, topicPath } from '@/content/subjects';
import { affirmationFor } from '@/content/wellbeing';
import {
  daysUntil,
  formatMinutes,
  greeting,
  isoDay,
  prettyDate,
  todayLong,
} from '@/lib/date';
import { activityWindow, todaysFocus } from '@/lib/plan';
import { buildTopicKnowledge } from '@/lib/tutorKnowledge';
import { overallReadiness, readiness } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

const difficultyLabel = { foundation: 'Foundation', core: 'Core', stretch: 'Stretch' } as const;

export default function DashboardPage() {
  const { state, hydrated, level, todayMinutes } = useAppStore();
  const { openTutor } = useTutor();
  const { installed, canInstall, install, downloadSubject, downloadState } = usePwa();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const focus = todaysFocus(state);
  const focusSubject = subjectById[focus.subject];
  const overall = overallReadiness(state, allTopics);
  const week = activityWindow(state, 7);
  const weekMinutes = week.reduce((sum, day) => sum + day.minutes, 0);
  const daysLeft = Math.max(0, daysUntil(state.profile.examDate));
  const weekLabels = week.map((day) =>
    new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date(`${day.day}T12:00:00`)),
  );
  const englishReadiness = readiness(state, 'english', subjectById.english.topics);
  const focusPath = topicPath(focus.topic);

  function askAboutFocus() {
    openTutor({
      subjectId: focus.subject,
      label: focus.topic.title,
      topicId: focus.topic.id,
      topicTitle: focus.topic.title,
      bigIdea: focus.topic.lesson.bigIdea,
      analogy: focus.topic.lesson.analogy.body,
      pitfalls: focus.topic.lesson.pitfalls,
      knowledge: buildTopicKnowledge(focus.topic),
    });
  }

  return (
    <div>
      <Onboarding />

      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-5 sm:p-8 lg:p-10">
        <div className="aurora" aria-hidden="true" />
        <div className="relative grid gap-8 xl:grid-cols-[1.35fr_.85fr] xl:items-center">
          <div>
            <p className="eyebrow" suppressHydrationWarning>
              {mounted ? todayLong() : 'Your study day'}
            </p>
            <h1 className="display-lg mt-2" suppressHydrationWarning>
              {mounted ? `${greeting()}, ${state.profile.name}.` : `Hello, ${state.profile.name}.`}
            </h1>
            <p
              className="mt-3 max-w-xl font-display text-[1.12rem] italic leading-relaxed text-soft sm:text-[1.3rem]"
              suppressHydrationWarning
            >
              “{affirmationFor(isoDay())}”
            </p>

            <div className="mt-5 max-w-2xl rounded-2xl border border-line bg-[var(--bg-elev)]/80 p-4 sm:p-5">
              <p className="eyebrow">A word for your journey</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">Study with hope, purpose, and possibility</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-soft">
                Your effort matters, {state.profile.name}. Every page you read, every question you attempt, and every small step you take is building your future. Keep going with faith and steady work — progress is possible.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <blockquote className="rounded-xl bg-[var(--leaf-soft)] p-3.5 text-[0.86rem] leading-relaxed text-ink">
                  <p className="font-semibold">Jeremiah 29:11–13</p>
                  <p className="mt-1.5">“For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end. Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you. And ye shall seek me, and find me, when ye shall search for me with all your heart.”</p>
                </blockquote>
                <blockquote
                  className="rounded-xl bg-[var(--gold-soft)] p-3.5 text-[0.86rem] leading-relaxed text-ink"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <p className="font-semibold">Yeremia 29:11–13 (Dangme)</p>
                  <p className="mt-1.5">“Yi mi nɛ i to ngɛ nyɛ he ɔ, imi nɔ kake too pɛ lɛ i le; i to nɛ ma ha nɛ nyɛ he mi nɛ jɔ nyɛ, se pi kaa ma hao nyɛ. Ní kpakpahi nɛ nyɛ ngɛ blɔ hyɛe ɔ, i to nɛ ma ha nyɛ. Jamɛ a be ɔ, ke nyɛ tsɛ mi nɛ nyɛ fa kue ha mi ɔ, ma bu nyɛ tue. Nyɛ ma hla ye se blɔ, nɛ nyɛ maa na mi. Ke nyɛ ngɔ nyɛ tsui tsuo kɛ hla ye se blɔ ɔ,”</p>
                </blockquote>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Link href={focusPath} className="btn btn-primary btn-lg">
                {focus.topic.title}
                <Icon name="arrow-right" size={17} />
              </Link>
              <button type="button" onClick={askAboutFocus} className="btn btn-ai btn-lg">
                <Icon name="spark" size={17} />
                Ask Jacob
              </button>
            </div>
            <p className="mt-3 max-w-xl text-[0.78rem] leading-relaxed text-muted">{focus.reason}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="chip chip-leaf">
                <Icon name="flame" size={13} />
                {state.streak.count} day streak
              </span>
              <span className="chip">
                <Icon name="clock" size={13} />
                {formatMinutes(todayMinutes)} today
              </span>
              <span className="chip">
                <Icon name="trophy" size={13} />
                Level {level.level}
              </span>
              {state.profile.examDateIsProvisional && (
                <span className="chip chip-gold">
                  <Icon name="info" size={13} />
                  Exam date provisional
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="glass rounded-2xl p-4">
              <p className="eyebrow !text-[0.58rem]">Exam countdown</p>
              <p className="tabular mt-1 font-display text-4xl font-semibold leading-none text-ink">
                {mounted ? daysLeft : '—'}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold text-muted">days to your paper</p>
              <p className="mt-2 truncate text-[0.68rem] text-muted">{prettyDate(state.profile.examDate)}</p>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="eyebrow !text-[0.58rem]">Readiness</p>
              <div className="mt-1 flex items-center gap-3">
                <ProgressRing value={overall} size={62} stroke={6} label="Overall readiness">
                  <span className="tabular font-display text-base font-semibold">{overall}</span>
                </ProgressRing>
                <p className="text-[0.7rem] leading-snug text-muted">
                  A transparent estimate, built from your own work.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="eyebrow !text-[0.58rem]">Level {level.level}</p>
              <ProgressBar value={level.progress} label="Level progress" className="mt-2" height={6} />
              <p className="mt-1.5 text-[0.68rem] text-muted">
                {level.into} / {level.span} XP to level {level.level + 1}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[0.68rem] font-semibold text-leaf">
                <Icon name="seed" size={12} />
                {state.xp.toLocaleString()} XP earned
              </p>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="eyebrow !text-[0.58rem]">This week</p>
              <p className="tabular mt-1 font-display text-2xl font-semibold leading-none">
                {formatMinutes(weekMinutes)}
              </p>
              <p className="mt-1 text-[0.68rem] text-muted">
                across {week.filter((day) => day.minutes > 0).length} day
                {week.filter((day) => day.minutes > 0).length === 1 ? '' : 's'}
              </p>
              <Link
                href="/progress/"
                className="mt-2 inline-flex items-center gap-1 text-[0.68rem] font-semibold text-leaf hover:underline"
              >
                See the pattern
                <Icon name="arrow-right" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-6">
          <Reveal>
            <section aria-labelledby="subjects-heading">
              <SectionHeading
                eyebrow="Your papers"
                title="Three subjects, in order"
                description="English first because it carries the most reading and the most doors. Management in Living second. Mathematics gets steady, unhurried time."
                action={{ label: 'All subjects', href: '/subjects/' }}
                as="h2"
              />
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                {subjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} featured={index === 0} />
                ))}
              </div>
            </section>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal delay={0.04}>
              <DailyChallenge />
            </Reveal>
            <Reveal delay={0.08}>
              <MoodCheckIn />
            </Reveal>
          </div>
        </div>

        <aside className="space-y-4">
          <Reveal>
            <section className="surface overflow-hidden" aria-labelledby="focus-heading">
              <div className="ai-wash border-b border-line px-5 py-4">
                <p className="eyebrow">A sensible next step</p>
                <h2 id="focus-heading" className="mt-1 font-display text-xl font-semibold">
                  Today’s focus
                </h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span
                    className={`subject-${focus.subject} chip`}
                    style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}
                  >
                    {focusSubject.shortName}
                  </span>
                  <span className="chip">{difficultyLabel[focus.topic.difficulty]}</span>
                  <span className="chip">
                    <Icon name="clock" size={12} />
                    {focus.topic.readMinutes} min
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
                  {focus.topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">{focus.topic.summary}</p>
                <div className="mt-4 rounded-2xl bg-[var(--bg-sunk)] p-3.5 text-[0.8rem] leading-relaxed text-soft">
                  <span className="flex items-center gap-1.5 font-semibold text-ink">
                    <Icon name="compass" size={14} className="text-leaf" />
                    Why this one
                  </span>
                  <p className="mt-1">{focus.reason}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={focusPath} className="btn btn-primary btn-sm flex-1">
                    Open lesson
                    <Icon name="arrow-right" size={15} />
                  </Link>
                  <button type="button" onClick={askAboutFocus} className="btn btn-secondary btn-sm">
                    <Icon name="spark" size={15} />
                    Ask first
                  </button>
                </div>
                <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
                  English coverage is {englishReadiness.parts.find((part) => part.id === 'coverage')?.value ?? 0}%.
                  Small, repeated visits beat one long rescue session.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.04}>
            <section className="surface p-5" aria-labelledby="rhythm-heading">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">Your rhythm</p>
                  <h2 id="rhythm-heading" className="mt-1 font-display text-xl font-semibold">
                    Last seven days
                  </h2>
                </div>
                <span className="chip">{formatMinutes(weekMinutes)}</span>
              </div>
              <div className="mt-4">
                <Sparkline
                  values={week.map((day) => day.minutes)}
                  labels={weekLabels}
                  label="Study minutes over the last seven days"
                />
              </div>
              <p className="mt-3 text-[0.76rem] leading-relaxed text-muted">
                {weekMinutes === 0
                  ? 'No minutes logged yet. The first ten are the ones that count.'
                  : weekMinutes < 90
                    ? 'A gentle week. Consistency is doing more work here than volume.'
                    : 'A steady week. Protect the rest days as carefully as the study days.'}
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="surface p-5" aria-labelledby="paths-heading">
              <h2 id="paths-heading" className="font-display text-xl font-semibold">
                Go straight there
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { href: '/literature/', icon: 'quote' as const, label: 'Literature', detail: 'Set texts & poems' },
                  { href: '/papers/', icon: 'layers' as const, label: 'Past papers', detail: `${pastPapers.length} papers` },
                  { href: '/orals/', icon: 'headphones' as const, label: 'Oral English', detail: 'Listen & answer' },
                  { href: '/practice/', icon: 'target' as const, label: 'Timed mock', detail: 'Exam pace' },
                  { href: '/games/', icon: 'play' as const, label: 'Games', detail: 'Five ways to revise' },
                  { href: '/journal/', icon: 'heart' as const, label: 'Journal', detail: 'How it is going' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-line bg-elev p-3 transition-colors hover:border-leaf"
                  >
                    <Icon name={item.icon} size={18} className="text-leaf" />
                    <p className="mt-2 text-[0.82rem] font-semibold leading-tight text-ink">{item.label}</p>
                    <p className="mt-0.5 text-[0.66rem] text-muted">{item.detail}</p>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section
              className={cn(
                'surface p-5',
                !installed && 'bg-[var(--leaf-soft)]/40',
              )}
              aria-labelledby="offline-heading"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf">
                  <Icon name={installed ? 'check-circle' : 'install'} size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id="offline-heading" className="font-display text-lg font-semibold leading-tight">
                    {installed ? 'Installed — ready for offline study' : 'Take it with you on your phone'}
                  </h2>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
                    {installed
                      ? 'The app shell is saved. Download each subject while you have data so lessons, practice and saved papers open without a connection.'
                      : 'Install Auntie Angel, then download subjects while connected. When you are offline, the saved lessons and papers will still open on this device.'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {!installed && canInstall && (
                      <button type="button" onClick={() => void install()} className="btn btn-primary btn-sm">
                        <Icon name="install" size={15} />
                        Install
                      </button>
                    )}
                    {subjects.map((subject) => {
                      const ds = downloadState[subject.id];
                      return (
                        <button
                          key={subject.id}
                          type="button"
                          onClick={() => void downloadSubject(subject.id)}
                          disabled={ds?.status === 'working'}
                          className="btn btn-secondary btn-sm"
                          aria-label={`Save ${subject.name} offline`}
                        >
                          <Icon name="download" size={15} />
                          {subject.shortName}: {downloadLabel(subject.id, state, ds)}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[0.68rem] leading-relaxed text-muted">
                    Tip: on mobile data, save one subject at a time. You can manage downloads in{' '}
                    <Link href="/settings/" className="font-semibold text-leaf hover:underline">Settings</Link>.
                  </p>
                  {state.downloads.english && (
                    <p className="mt-1 flex items-center gap-1 text-[0.68rem] font-semibold text-leaf">
                      <Icon name="check-circle" size={12} />
                      English saved {prettyDate(state.downloads.english)}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </Reveal>
        </aside>
      </div>

      <p className="mt-8 text-center text-[0.7rem] text-muted">
        {hydrated ? 'Your progress is stored on this device.' : 'Loading your saved progress…'} ·{' '}
        <Link href="/settings/" className="font-semibold text-leaf hover:underline">
          Settings
        </Link>
      </p>
    </div>
  );
}

