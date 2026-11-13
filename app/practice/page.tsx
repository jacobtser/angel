'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { useTutor } from '@/components/providers/TutorProvider';
import { subjects, pastPapers } from '@/content/subjects';
import { mockPlan } from '@/lib/mocks';
import { useAppStore } from '@/lib/store';
import type { SubjectId } from '@/lib/types';

export default function PracticePage() {
  const { state, dueCards } = useAppStore();
  const { openTutor } = useTutor();

  const answered = state.quizzes.reduce((sum, quiz) => sum + quiz.total, 0);
  const correct = state.quizzes.reduce((sum, quiz) => sum + quiz.correct, 0);
  const accuracy = answered ? Math.round((correct / answered) * 100) : null;
  const lastMock = (subjectId: SubjectId) =>
    state.mocks.filter((mock) => mock.subject === subjectId).sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative grid gap-7 lg:grid-cols-[1.4fr_.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Turn knowing into doing</p>
            <h1 className="display-lg mt-2">Practice, then exam pace</h1>
            <p className="prose-angel mt-3 max-w-2xl">
              Start untimed until the method is stable. Then add a clock and practise the hardest exam skill
              of all: leaving a question when it has had its share of your time.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/practice/mock/english/" className="btn btn-primary">
                <Icon name="timer" size={16} />
                Sit an English mock
              </Link>
              <Link href="/practice/cards/" className="btn btn-secondary">
                <Icon name="layers" size={16} />
                Review due cards {dueCards > 0 ? `(${dueCards})` : ''}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="glass rounded-2xl p-3 text-center">
              <p className="tabular font-display text-2xl font-semibold leading-none">{answered}</p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wide text-muted">answered</p>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <p className="tabular font-display text-2xl font-semibold leading-none">
                {accuracy === null ? '—' : `${accuracy}%`}
              </p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wide text-muted">accuracy</p>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <p className="tabular font-display text-2xl font-semibold leading-none">{state.mocks.length}</p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wide text-muted">mocks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-7" aria-labelledby="diagnostic-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Know where you stand</p>
            <h2 id="diagnostic-heading" className="display-md mt-1">
              Diagnostic &amp; targeted fix
            </h2>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link href="/practice/diagnostic/" className="surface group p-5 transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf"><Icon name="compass" size={18} /></span>
              <span className="chip chip-leaf">Start here</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Take a short diagnostic</h3>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">A quick, untimed check per subject to set your baseline and highlight topics that need attention.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">Choose subject <Icon name="arrow-right" size={14} /></span>
          </Link>
          <Link href="/practice/fix/" className="surface group p-5 transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gold-soft)] text-[var(--gold-ink)]"><Icon name="target" size={18} /></span>
              <span className="chip chip-gold">Review &amp; fix</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Work on weak spots</h3>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">Practice questions drawn from topics with lower mastery or less evidence, with explanations for every answer.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">Choose subject <Icon name="arrow-right" size={14} /></span>
          </Link>
        </div>
      </section>

      <section className="mt-7" aria-labelledby="mocks-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Exam conditions, in small doses</p>
            <h2 id="mocks-heading" className="display-md mt-1">
              Timed sections
            </h2>
          </div>
          <span className="chip">No feedback until the end</span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {subjects.map((subject) => {
            const plan = mockPlan[subject.id];
            const last = lastMock(subject.id);
            const score = last && last.total ? Math.round((last.correct / last.total) * 100) : null;
            return (
              <article key={subject.id} className={`subject-${subject.id} surface flex flex-col p-5`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
                    {subject.shortName}
                  </span>
                  <span className="chip !py-0.5 !text-[0.6rem]">
                    <Icon name="timer" size={10} />
                    {Math.round(plan.seconds / 60)} min
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight">
                  {plan.questions} questions
                </h3>
                <p className="mt-1.5 flex-1 text-[0.82rem] leading-relaxed text-muted">{plan.note}</p>
                {score !== null ? (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[0.7rem] font-semibold">
                      <span className="text-muted">Last section</span>
                      <span className="tabular text-ink">{score}%</span>
                    </div>
                    <ProgressBar value={score} color="var(--subject)" label="Last mock score" className="mt-1" height={5} />
                  </div>
                ) : (
                  <p className="mt-3 text-[0.7rem] italic text-muted">No timed section yet.</p>
                )}
                <Link href={`/practice/mock/${subject.id}/`} className="btn btn-primary btn-sm mt-4 w-full">
                  Start the clock
                  <Icon name="arrow-right" size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <section className="surface p-5 sm:p-6" aria-labelledby="quick-heading">
          <p className="eyebrow">No clock</p>
          <h2 id="quick-heading" className="mt-1 font-display text-xl font-semibold">
            Ten quiet questions
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            A small set mixed across topics. Read every explanation, even the ones you get right.
          </p>
          <div className="mt-3 space-y-2">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/practice/quick/${subject.id}/`}
                className="flex items-center gap-3 rounded-xl border border-line bg-elev px-3 py-2.5 transition-colors hover:border-leaf"
              >
                <span className={`subject-${subject.id} grid h-8 w-8 place-items-center rounded-lg`} style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
                  <Icon name="target" size={15} />
                </span>
                <span className="flex-1 text-[0.86rem] font-semibold">{subject.shortName}</span>
                <span className="text-[0.68rem] text-muted">10 questions</span>
                <Icon name="chevron-right" size={14} className="text-muted" />
              </Link>
            ))}
          </div>
        </section>

        <section className="surface p-5 sm:p-6" aria-labelledby="other-heading">
          <p className="eyebrow">Other ways in</p>
          <h2 id="other-heading" className="mt-1 font-display text-xl font-semibold">
            Drill, listen, or review
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/practice/cards/" className="rounded-xl border border-line bg-elev p-3.5 hover:border-leaf">
              <Icon name="layers" size={18} className="text-leaf" />
              <p className="mt-2 text-[0.84rem] font-semibold">Due cards</p>
              <p className="text-[0.68rem] text-muted">{dueCards} waiting</p>
            </Link>
            <Link href="/papers/" className="rounded-xl border border-line bg-elev p-3.5 hover:border-leaf">
              <Icon name="book" size={18} className="text-leaf" />
              <p className="mt-2 text-[0.84rem] font-semibold">Past papers</p>
              <p className="text-[0.68rem] text-muted">{pastPapers.length} papers</p>
            </Link>
            <Link href="/orals/" className="rounded-xl border border-line bg-elev p-3.5 hover:border-leaf">
              <Icon name="headphones" size={18} className="text-leaf" />
              <p className="mt-2 text-[0.84rem] font-semibold">Oral English</p>
              <p className="text-[0.68rem] text-muted">Listen and answer</p>
            </Link>
            <Link href="/practice/essay/" className="rounded-xl border border-line bg-elev p-3.5 hover:border-leaf">
              <Icon name="pencil" size={18} className="text-leaf" />
              <p className="mt-2 text-[0.84rem] font-semibold">Essay coach</p>
              <p className="text-[0.68rem] text-muted">Write &amp; get feedback</p>
            </Link>
            <button
              type="button"
              onClick={() =>
                openTutor({
                  label: 'Practice planning',
                  bigIdea: 'Use practice to gather evidence, not to prove you are bad at the subject.',
                  knowledge:
                    'PRACTICE HUB: choose diagnostics to set a baseline, review & fix for weak topics, quick untimed sets to build method, timed mocks for exam pace, flashcards for spaced recall, past papers/orals/essay coach as needed. Prioritise English, then Management in Living, then Mathematics; work in small focused sessions.',
                })
              }
              className="col-span-2 rounded-xl border border-line bg-elev p-3.5 text-left hover:border-leaf sm:col-span-1"
            >
              <Icon name="spark" size={18} className="text-plum" />
              <p className="mt-2 text-[0.84rem] font-semibold">Ask Jacob</p>
              <p className="text-[0.68rem] text-muted">Plan a session</p>
            </button>
          </div>
        </section>
      </div>

      <aside className="mt-6 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-5 text-[0.82rem] leading-relaxed text-soft">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="timer" size={16} className="text-gold" />
          If you run out of time
        </p>
        <p className="mt-1.5">
          Do not chase the clock. At the end of a section, count what you completed and read the explanations
          for the questions you never reached. Speed is built by recognising question types, not by rushing
          the ones you already know.
        </p>
      </aside>
    </div>
  );
}
