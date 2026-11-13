'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { DeeperDive } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { QuizRunner } from '@/components/practice/QuizRunner';
import { FlashcardReview } from '@/components/practice/FlashcardReview';
import { useTutor, useTutorContext } from '@/components/providers/TutorProvider';
import { buildTopicKnowledge } from '@/lib/tutorKnowledge';
import {
  findTopic,
  subjectById,
  topicPath,
  topicsForSubject,
  topicSlug,
} from '@/content/subjects';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

const difficultyLabel = { foundation: 'Foundation', core: 'Core', stretch: 'Stretch' } as const;

export function TopicLesson({ topicId }: { topicId: string }) {
  const topic = findTopic(topicId);
  const { state, markStudied } = useAppStore();
  const { openTutor } = useTutor();

  useTutorContext(
    topic
      ? {
          subjectId: topic.subject,
          label: topic.title,
          topicId: topic.id,
          topicTitle: topic.title,
          bigIdea: topic.lesson.bigIdea,
          analogy: topic.lesson.analogy.body,
          pitfalls: topic.lesson.pitfalls,
          knowledge: buildTopicKnowledge(topic),
        }
      : {},
  );

  if (!topic) {
    return (
      <EmptyState
        icon="compass"
        title="That topic is not in the vault"
        body="The link may be old. Your subject pages have every topic that is currently available."
        action={{ label: 'Browse subjects', href: '/subjects/' }}
      />
    );
  }

  const subject = subjectById[topic.subject];
  const progress = state.topics[topic.id];
  const topics = topicsForSubject(topic.subject);
  const index = topics.findIndex((item) => item.id === topic.id);
  const previous = topics[index - 1];
  const next = topics[index + 1];
  const studied = progress?.studied;

  return (
    <div className={`subject-${topic.subject}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/subjects/${topic.subject}/`}
          className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
        >
          <Icon name="arrow-left" size={15} />
          {subject.name}
        </Link>
        <div className="no-print flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-ghost btn-sm"
            title="Print this lesson"
          >
            <Icon name="pencil" size={14} />
            Print
          </button>
        </div>
      </div>

      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
            {subject.shortName}
          </span>
          <span className="chip">{difficultyLabel[topic.difficulty]}</span>
          <span className="chip">
            <Icon name="clock" size={12} />
            {topic.readMinutes} min read
          </span>
          <span className="chip">
            <Icon name="target" size={12} />
            {topic.quiz.length} questions
          </span>
          {studied && (
            <span className="chip chip-leaf">
              <Icon name="check" size={12} />
              Opened
            </span>
          )}
        </div>
        <h1 className="display-lg mt-3">{topic.title}</h1>
        <p className="prose-angel mt-2 max-w-3xl text-[1rem]">{topic.summary}</p>
        <p className="mt-2 text-[0.72rem] font-semibold text-muted">{topic.examWeight}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => markStudied(topic.subject, topic.id, topic.readMinutes)}
            className={cn('btn', studied ? 'btn-secondary' : 'btn-primary')}
          >
            <Icon name={studied ? 'check-circle' : 'book'} size={16} />
            {studied ? 'Read — log a few more minutes' : 'I have read this'}
          </button>
          <a href="#practice" className="btn btn-secondary">
            <Icon name="target" size={16} />
            Go to practice
          </a>
          <button
            type="button"
            onClick={() =>
              openTutor({
                subjectId: topic.subject,
                label: topic.title,
                topicId: topic.id,
                topicTitle: topic.title,
                bigIdea: topic.lesson.bigIdea,
                analogy: topic.lesson.analogy.body,
                pitfalls: topic.lesson.pitfalls,
                knowledge: buildTopicKnowledge(topic),
              })
            }
            className="btn btn-ai"
          >
            <Icon name="spark" size={16} />
            Ask about this
          </button>
        </div>
        {progress && progress.attempts > 0 && (
          <div className="mt-3 flex max-w-sm items-center gap-3 text-[0.72rem] font-semibold text-muted">
            <span>Mastery</span>
            <ProgressBar
              value={progress.mastery}
              color="var(--subject)"
              label={`${topic.title} mastery`}
              height={5}
            />
            <span className="tabular">{progress.mastery}%</span>
          </div>
        )}
      </header>

      <nav className="no-print mt-5 flex flex-wrap gap-1.5 pb-1" aria-label="Lesson sections">
        {[
          { href: '#idea', label: 'Big idea' },
          { href: '#worked', label: 'Worked examples' },
          { href: '#deeper', label: 'Deeper dive' },
          { href: '#practice', label: 'Practice' },
          { href: '#cards', label: 'Flashcards' },
        ].map((item) => (
          <a key={item.href} href={item.href} className="chip shrink-0 hover:border-leaf hover:text-leaf">
            {item.label}
          </a>
        ))}
      </nav>

      <section id="idea" className="mt-6 scroll-mt-24">
        <div className="surface relative overflow-hidden p-6 sm:p-8">
          <span
            className="absolute inset-y-0 left-0 w-1.5"
            style={{ background: 'var(--subject)' }}
            aria-hidden="true"
          />
          <p className="eyebrow">The one idea to hold</p>
          <p className="mt-2 font-display text-[1.35rem] font-medium leading-relaxed sm:text-[1.55rem]">
            {topic.lesson.bigIdea}
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="surface bg-[var(--gold-soft)]/55 p-5 sm:p-6">
            <p className="eyebrow text-[var(--gold-ink)]">The picture</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{topic.lesson.analogy.title}</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">{topic.lesson.analogy.body}</p>
          </div>
          <div className="surface p-5 sm:p-6">
            <p className="eyebrow">A small example</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{topic.lesson.example.title}</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">{topic.lesson.example.body}</p>
          </div>
        </div>
      </section>

      <section id="worked" className="mt-8 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Watch the method</p>
            <h2 className="display-md mt-1">Worked examples</h2>
          </div>
          <span className="chip">{topic.lesson.worked.length} walkthroughs</span>
        </div>

        <div className="mt-4 space-y-4">
          {topic.lesson.worked.map((worked, workedIndex) => (
            <article key={workedIndex} className="surface p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm font-semibold"
                  style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}
                >
                  {workedIndex + 1}
                </span>
                <div>
                  <p className="font-semibold leading-relaxed text-ink">{worked.question}</p>
                </div>
              </div>

              <ol className="mt-4 space-y-3">
                {worked.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong text-[0.65rem] font-bold text-muted">
                      {stepIndex + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-muted">
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-[0.9rem] leading-relaxed text-soft">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[var(--leaf-soft)] p-3.5">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-leaf">Answer</p>
                  <p className="mt-1 text-[0.9rem] font-semibold leading-relaxed text-ink">{worked.answer}</p>
                </div>
                <div className="rounded-xl bg-[var(--bg-sunk)] p-3.5">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-muted">Why it works</p>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-soft">{worked.why}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openTutor({
                    subjectId: topic.subject,
                    label: `${topic.title} — worked example`,
                    topicTitle: topic.title,
                    question: worked.question,
                    bigIdea: topic.lesson.bigIdea,
                    pitfalls: topic.lesson.pitfalls,
                    knowledge: [
                      buildTopicKnowledge(topic),
                      '',
                      'FOCUS: WORKED EXAMPLE ON SCREEN',
                      `Question: ${worked.question}`,
                      ...worked.steps.map((s, i) => `Step ${i + 1} (${s.label}): ${s.detail}`),
                      `Answer: ${worked.answer}`,
                      `Why: ${worked.why}`,
                    ].join('\n'),
                  })
                }
                className="mt-3 inline-flex items-center gap-1.5 text-[0.74rem] font-semibold text-plum hover:underline"
              >
                <Icon name="spark" size={13} />
                I don't follow this step - ask Jacob
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="deeper" className="mt-8 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">If you want the longer story</p>
            <h2 className="display-md mt-1">Deeper dive</h2>
          </div>
        </div>
        <div className="mt-4">
          <DeeperDive notes={topic.lesson.deeper} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="surface border-[var(--rose)]/20 bg-[var(--rose-soft)]/40 p-5">
            <p className="eyebrow text-rose">Where marks slip</p>
            <ul className="mt-2 space-y-2">
              {topic.lesson.pitfalls.map((pitfall) => (
                <li key={pitfall} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-soft">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--rose-soft)] text-rose">
                    <Icon name="x" size={11} />
                  </span>
                  {pitfall}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface bg-[var(--gold-soft)]/55 p-5">
            <p className="eyebrow text-[var(--gold-ink)]">In the exam hall</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">{topic.lesson.examTip}</p>
            <p className="mt-3 text-[0.7rem] font-semibold text-muted">{topic.examWeight}</p>
          </div>
        </div>
      </section>

      <section id="practice" className="mt-8 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Turn reading into evidence</p>
            <h2 className="display-md mt-1">Practice</h2>
          </div>
          <span className="chip">{topic.quiz.length} questions</span>
        </div>
        <div className="mt-4">
          <QuizRunner
            questions={topic.quiz}
            subject={topic.subject}
            topicId={topic.id}
            title={topic.title}
            exitHref={topicPath(topic)}
            mode="practice"
          />
        </div>
      </section>

      <section id="cards" className="mt-8 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">For the days after</p>
            <h2 className="display-md mt-1">Flashcards</h2>
          </div>
          <span className="chip">{topic.flashcards.length} cards</span>
        </div>
        <div className="mt-4">
          <FlashcardReview cards={topic.flashcards} title={topic.title} />
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        {previous ? (
          <Link href={topicPath(previous)} className="btn btn-ghost btn-sm">
            <Icon name="arrow-left" size={15} />
            {previous.title}
          </Link>
        ) : (
          <Link href={`/subjects/${topic.subject}/`} className="btn btn-ghost btn-sm">
            <Icon name="arrow-left" size={15} />
            {subject.shortName}
          </Link>
        )}
        {next ? (
          <Link href={topicPath(next)} className="btn btn-primary btn-sm">
            {next.title}
            <Icon name="arrow-right" size={15} />
          </Link>
        ) : (
          <Link href={`/subjects/${topic.subject}/`} className="btn btn-primary btn-sm">
            Back to all topics
            <Icon name="arrow-right" size={15} />
          </Link>
        )}
      </div>

      <p className="mt-6 text-[0.68rem] text-muted">
        Topic {index + 1} of {topics.length} · {subject.name} · {topicSlug(topic.id)}
      </p>
    </div>
  );
}
