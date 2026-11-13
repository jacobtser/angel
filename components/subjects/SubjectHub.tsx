'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar, ProgressRing } from '@/components/ui/ProgressRing';
import { usePwa, downloadLabel } from '@/components/providers/PwaProvider';
import { useTutor } from '@/components/providers/TutorProvider';
import { countQuizQuestions, subjectById, subjects, topicPath } from '@/content/subjects';
import { useTutorContext } from '@/components/providers/TutorProvider';
import { buildSubjectKnowledge, buildTopicKnowledge } from '@/lib/tutorKnowledge';
import { readiness } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import type { SubjectId } from '@/lib/types';

const difficultyLabel = { foundation: 'Foundation', core: 'Core', stretch: 'Stretch' } as const;

export function SubjectHub({ subjectId }: { subjectId: SubjectId }) {
  const { state } = useAppStore();
  const { downloadSubject, downloadState } = usePwa();
  const { openTutor } = useTutor();
  const subject = subjectById[subjectId];
  const report = readiness(state, subjectId, subject.topics);
  const summary = {
    topics: subject.topics.length,
    studied: subject.topics.filter((topic) => state.topics[topic.id]?.studied).length,
    questions: countQuizQuestions(subjectId),
    minutes: subject.topics.reduce((sum, topic) => sum + topic.readMinutes, 0),
  };
  const download = downloadState[subjectId];
  const nextTopic =
    subject.topics.find((topic) => !state.topics[topic.id]?.studied) ?? subject.topics[0];
  const index = subjects.findIndex((item) => item.id === subjectId);
  const previous = subjects[index - 1];
  const next = subjects[index + 1];

  useTutorContext({
    subjectId,
    label: subject.name,
    topicTitle: nextTopic?.title,
    bigIdea: nextTopic?.lesson.bigIdea,
    analogy: nextTopic?.lesson.analogy.body,
    pitfalls: nextTopic?.lesson.pitfalls,
    knowledge: [
      buildSubjectKnowledge(subjectId),
      nextTopic ? '\nNEXT SUGGESTED TOPIC (full module info):\n' + buildTopicKnowledge(nextTopic) : '',
    ].join('\n'),
  });

  return (
    <div className={`subject-${subjectId}`}>
      <Link
        href="/subjects/"
        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
      >
        <Icon name="arrow-left" size={15} />
        All subjects
      </Link>

      <section
        className="relative mt-3 overflow-hidden rounded-[2rem] border border-line p-6 sm:p-8"
        style={{
          background:
            'linear-gradient(135deg, var(--subject-soft), var(--bg-elev) 62%)',
        }}
      >
        <div className="dot-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40" aria-hidden="true" />
        <div className="relative grid min-w-0 gap-6 lg:grid-cols-[1.5fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip" style={{ background: 'var(--bg-elev)', color: 'var(--subject)' }}>
                Priority {subject.priority}
              </span>
              <span className="chip">{subject.priority === 1 ? 'Start here' : 'Steady second'}</span>
            </div>
            <h1 className="display-lg mt-3">{subject.name}</h1>
            <p className="mt-2 max-w-2xl font-display text-lg italic leading-relaxed text-soft">
              {subject.tagline}
            </p>
            <p className="prose-angel mt-3 max-w-2xl text-[0.95rem]">{subject.description}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 text-[0.78rem] sm:max-w-md">
              <div>
                <p className="font-display text-2xl font-semibold leading-none">{summary.studied}/{summary.topics}</p>
                <p className="mt-1 text-muted">topics opened</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold leading-none">{summary.questions}</p>
                <p className="mt-1 text-muted">practice questions</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold leading-none">{summary.minutes}</p>
                <p className="mt-1 text-muted">minutes of reading</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {nextTopic && (
                <Link href={topicPath(nextTopic)} className="btn btn-primary">
                  {summary.studied ? 'Continue' : 'Begin with'} {nextTopic.title}
                  <Icon name="arrow-right" size={16} />
                </Link>
              )}
              <button
                type="button"
                onClick={() =>
                  openTutor({
                    subjectId,
                    label: subject.name,
                    topicTitle: nextTopic?.title,
                    bigIdea: nextTopic?.lesson.bigIdea,
                    pitfalls: nextTopic?.lesson.pitfalls,
                    knowledge: [
                      buildSubjectKnowledge(subjectId),
                      nextTopic ? '\nNEXT SUGGESTED TOPIC (full module info):\n' + buildTopicKnowledge(nextTopic) : '',
                    ].join('\n'),
                  })
                }
                className="btn btn-ai"
              >
                <Icon name="spark" size={16} />
                Ask Jacob
              </button>
              <button
                type="button"
                onClick={() => void downloadSubject(subjectId)}
                disabled={download?.status === 'working'}
                className="btn btn-secondary"
              >
                <Icon name="download" size={16} />
                {downloadLabel(subjectId, state, download)}
              </button>
            </div>
            {download?.status === 'working' && download.total > 0 && (
              <div className="mt-3 max-w-sm">
                <ProgressBar
                  value={(download.done / download.total) * 100}
                  color="var(--subject)"
                  label={`Saving ${subject.name} offline`}
                  height={5}
                />
                <p className="mt-1 text-[0.68rem] text-muted">
                  Saving {download.done} of {download.total} files…
                </p>
              </div>
            )}
            {download?.status === 'error' && download.message && (
              <p className="mt-2 text-[0.72rem] font-semibold text-[var(--gold-ink)]">{download.message}</p>
            )}
            {state.downloads[subjectId] && download?.status !== 'working' && (
              <p className="mt-2 flex items-center gap-1 text-[0.7rem] font-semibold text-leaf">
                <Icon name="check-circle" size={12} />
                Available offline on this device
              </p>
            )}
          </div>

          <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5 lg:flex-col lg:items-end">
            <ProgressRing value={report.score} size={132} color="var(--subject)" label={`${subject.name} readiness`}>
              <span className="text-center">
                <span className="tabular block font-display text-3xl font-semibold leading-none">
                  {report.score}
                </span>
                <span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.13em] text-muted">
                  readiness
                </span>
              </span>
            </ProgressRing>
            <div className="max-w-[11rem] text-[0.72rem] leading-relaxed text-muted lg:text-right">
              <p className="font-semibold text-ink">{report.band}</p>
              <p className="mt-1">{report.nextAction}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_.85fr]">
        <section aria-labelledby="topics-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">The path</p>
              <h2 id="topics-heading" className="display-md mt-1">
                Topics in order
              </h2>
            </div>
            <span className="chip">{summary.topics} topics</span>
          </div>

          <div className="mt-4 space-y-3">
            {subject.topics.map((topic, index) => {
              const progress = state.topics[topic.id];
              const mastery = progress?.mastery ?? 0;
              return (
                <Link
                  key={topic.id}
                  href={topicPath(topic)}
                  className="surface group flex items-start gap-4 p-4 transition-transform duration-200 hover:-translate-y-0.5 sm:p-5"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-base font-semibold"
                    style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg font-semibold leading-tight">{topic.title}</span>
                      {progress?.studied && (
                        <span className="chip chip-leaf !py-0.5 !text-[0.6rem]">
                          <Icon name="check" size={10} />
                          {progress.attempts ? `${mastery}% mastery` : 'Read'}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[0.84rem] leading-relaxed text-muted">{topic.summary}</span>
                    <span className="mt-2.5 flex flex-wrap items-center gap-2 text-[0.66rem] font-semibold text-muted">
                      <span className="chip !py-0.5 !text-[0.6rem]">{difficultyLabel[topic.difficulty]}</span>
                      <span className="inline-flex items-center gap-1">
                        <Icon name="clock" size={11} />
                        {topic.readMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Icon name="target" size={11} />
                        {topic.quiz.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Icon name="layers" size={11} />
                        {topic.flashcards.length} cards
                      </span>
                    </span>
                    {progress?.studied && (
                      <span className="mt-2.5 block max-w-xs">
                        <ProgressBar
                          value={mastery}
                          color="var(--subject)"
                          label={`${topic.title} mastery`}
                          height={4}
                        />
                      </span>
                    )}
                  </span>
                  <Icon
                    name="chevron-right"
                    size={18}
                    className="mt-2 shrink-0 text-muted transition-transform group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>

          {subject.hasLiterature && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/literature/" className="surface group flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--rose-soft)] text-rose">
                  <Icon name="quote" size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold">Literature companion</span>
                  <span className="mt-0.5 block text-[0.76rem] leading-relaxed text-muted">
                    Four set texts and ten poems, with themes, characters and essay plans.
                  </span>
                </span>
                <Icon name="arrow-right" size={16} className="shrink-0 text-muted group-hover:text-leaf" />
              </Link>
              <Link href="/orals/" className="surface group flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--plum-soft)] text-plum">
                  <Icon name="headphones" size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold">Oral English</span>
                  <span className="mt-0.5 block text-[0.76rem] leading-relaxed text-muted">
                    Vowels, consonants, stress and intonation — read aloud, then answer.
                  </span>
                </span>
                <Icon name="arrow-right" size={16} className="shrink-0 text-muted group-hover:text-leaf" />
              </Link>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <section className="surface p-5" aria-labelledby="shape-heading">
            <p className="eyebrow">Know the paper</p>
            <h2 id="shape-heading" className="mt-1 font-display text-xl font-semibold">
              How it is tested
            </h2>
            <ul className="mt-3 space-y-2.5">
              {subject.examShape.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-soft">
                  <span className="tick mt-0.5">
                    <Icon name="check" size={11} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.78rem] leading-relaxed text-muted">
              {subject.passNote}
            </p>
          </section>

          <section className="surface p-5" aria-labelledby="readiness-heading">
            <p className="eyebrow">Why this number</p>
            <h2 id="readiness-heading" className="mt-1 font-display text-xl font-semibold">
              Readiness, broken down
            </h2>
            <div className="mt-3 space-y-3">
              {report.parts.map((part) => (
                <div key={part.id}>
                  <div className="flex items-center justify-between text-[0.78rem]">
                    <span className="font-semibold text-ink">{part.label}</span>
                    <span className="tabular font-semibold text-muted">
                      {part.value === null ? '—' : `${part.value}%`}
                    </span>
                  </div>
                  <ProgressBar
                    value={part.value ?? 0}
                    color="var(--subject)"
                    label={part.label}
                    className="mt-1"
                    height={5}
                  />
                  <p className="mt-1 text-[0.66rem] text-muted">{part.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.68rem] leading-relaxed text-muted">
              Confidence: {report.confidence}. Missing evidence lowers confidence; it is not counted as a
              failure.
            </p>
          </section>

          <section className="surface p-5" aria-labelledby="source-heading">
            <p className="eyebrow">Source material</p>
            <h2 id="source-heading" className="mt-1 font-display text-xl font-semibold">
              From the vault
            </h2>
            {subject.paperUrl ? (
              <>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-soft">{subject.paperLabel}</p>
                <p className="mt-1 text-[0.68rem] break-words text-muted">{subject.paperSource}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={subject.paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Icon name="external" size={14} />
                    Open PDF
                  </a>
                  <Link href="/papers/" className="btn btn-ghost btn-sm">
                    Past papers
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
                {subjectId === 'management' && (
                  <p className="mt-3 rounded-xl bg-[var(--gold-soft)] p-3 text-[0.72rem] leading-relaxed text-[var(--gold-ink)]">
                    This vault contains the WAEC timetable, not a Management in Living question paper.
                    The MIL practice here is original and clearly labelled — it is not presented as a past
                    paper.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-2 text-[0.82rem] text-muted">No source PDF is attached to this subject.</p>
            )}
          </section>
        </aside>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        {previous ? (
          <Link href={`/subjects/${previous.id}/`} className="btn btn-ghost btn-sm">
            <Icon name="arrow-left" size={15} />
            {previous.shortName}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/subjects/${next.id}/`} className="btn btn-ghost btn-sm">
            {next.shortName}
            <Icon name="arrow-right" size={15} />
          </Link>
        ) : (
          <Link href="/practice/" className="btn btn-ghost btn-sm">
            Practice
            <Icon name="arrow-right" size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}

