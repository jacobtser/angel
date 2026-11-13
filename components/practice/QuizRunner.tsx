'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { Confetti } from '@/components/ui/Confetti';
import { AccordionItem } from '@/components/ui/Accordion';
import { useTutor } from '@/components/providers/TutorProvider';
import { cn } from '@/lib/cn';
import { formatClock } from '@/lib/date';
import { useAppStore } from '@/lib/store';
import type { QuizQuestion, SubjectId } from '@/lib/types';

interface QuizRunnerProps {
  questions: QuizQuestion[];
  subject: SubjectId;
  topicId: string;
  title: string;
  mode?: 'practice' | 'mock';
  seconds?: number;
  exitHref?: string;
}

const letters = ['A', 'B', 'C', 'D', 'E'];

function bandFor(percent: number) {
  if (percent >= 90) return { title: 'Quietly excellent', body: 'You are answering with control. Keep this topic warm with a short review later this week.' };
  if (percent >= 75) return { title: 'Strong ground', body: 'The method is there. Read the explanations for the ones you missed, then move on without redoing everything.' };
  if (percent >= 55) return { title: 'Getting steady', body: 'This is useful evidence. Pick the two missed questions and ask why the right answer is right — not just what it was.' };
  if (percent >= 35) return { title: 'The shape is forming', body: 'You know more than the score suggests, but the details are still loose. Reread the lesson section, then try five again.' };
  return { title: 'Start smaller', body: 'This set was heavy. Go back to the big idea and the first worked example, then try three questions only. That still counts.' };
}

export function QuizRunner({
  questions,
  subject,
  topicId,
  title,
  mode = 'practice',
  seconds,
  exitHref = '/subjects/',
}: QuizRunnerProps) {
  const { saveQuiz, completeMock } = useAppStore();
  const { openTutor } = useTutor();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number>(-1);
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [finished, setFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(seconds ?? 0);
  const startedAt = useRef(Date.now());
  const saved = useRef(false);

  const question = questions[index];
  const isMock = mode === 'mock';
  const revealed = !isMock && selected >= 0;
  const total = questions.length;

  const finish = useCallback(() => setFinished(true), []);

  useEffect(() => {
    if (!isMock || !seconds || finished) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isMock, seconds, finished]);

  useEffect(() => {
    if (isMock && seconds && secondsLeft === 0 && !finished) finish();
  }, [isMock, seconds, secondsLeft, finished, finish]);

  const correct = questions.reduce(
    (count, item, position) => count + (answers[position] === item.answer ? 1 : 0),
    0,
  );
  const percent = total ? Math.round((correct / total) * 100) : 0;

  useEffect(() => {
    if (!finished || saved.current) return;
    saved.current = true;
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));
    if (isMock) {
      completeMock({ subject, correct, total, seconds: elapsed });
    } else {
      saveQuiz({ subject, topicId, correct, total, mode: 'practice' });
    }
  }, [finished, isMock, completeMock, saveQuiz, subject, topicId, correct, total]);

  function choose(option: number) {
    if (revealed) return;
    setSelected(option);
    setAnswers((current) => {
      const next = [...current];
      next[index] = option;
      return next;
    });
  }

  function next() {
    if (index + 1 >= total) {
      finish();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(-1);
  }

  function reset() {
    setIndex(0);
    setSelected(-1);
    setAnswers(questions.map(() => -1));
    setFinished(false);
    setSecondsLeft(seconds ?? 0);
    startedAt.current = Date.now();
    saved.current = false;
  }

  if (!total) {
    return (
      <div className="surface p-6 text-sm text-muted">
        No questions are available for this set yet.
      </div>
    );
  }

  if (finished) {
    const band = bandFor(percent);
    return (
      <div>
        {percent >= 80 && <Confetti pieces={30} />}
        <div className="surface overflow-hidden">
          <div className="hero-wash px-5 py-7 text-center sm:px-8">
            <p className="eyebrow">{isMock ? 'Timed section complete' : 'Practice complete'}</p>
            <p className="tabular mt-2 font-display text-6xl font-semibold leading-none">{percent}%</p>
            <p className="mt-2 text-sm font-semibold text-muted">
              {correct} of {total} correct
              {isMock && seconds ? ` · ${formatClock(Math.max(0, seconds - secondsLeft))} used` : ''}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold">{band.title}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-soft">{band.body}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={reset} className="btn btn-primary">
                <Icon name="refresh" size={16} />
                Try this set again
              </button>
              <Link href={exitHref} className="btn btn-secondary">
                Back to the lesson
              </Link>
              <button
                type="button"
                onClick={() => {
                  const missedIndex = answers.findIndex((value, i) => value !== questions[i].answer);
                  const item = missedIndex >= 0 ? questions[missedIndex] : questions[0];
                  const chosen = missedIndex >= 0 ? answers[missedIndex] : -1;
                  const opts = item.options.map((o, j) => `${letters[j]}. ${o}`).join('\n');
                  openTutor({
                    subjectId: subject,
                    label: title,
                    question: item.prompt,
                    knowledge: [
                      `QUIZ SET: ${title}`,
                      item.passage ? `Passage: ${item.passage}` : '',
                      `Question: ${item.prompt}`,
                      `Options:\n${opts}`,
                      `Correct answer: ${letters[item.answer]}. ${item.options[item.answer]}`,
                      chosen >= 0 ? `Learner chose: ${letters[chosen]}. ${item.options[chosen]}` : 'Learner did not answer.',
                      `Explanation: ${item.explanation}`,
                      item.source ? `Source: ${item.source}` : '',
                      'Help the learner understand the reasoning; do not just give the letter immediately.',
                    ]
                      .filter(Boolean)
                      .join('\n'),
                  });
                }}
                className="btn btn-ai"
              >
                <Icon name="spark" size={16} />
                Talk it through
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <h4 className="font-display text-lg font-semibold">Review the evidence</h4>
            <p className="mt-1 text-[0.78rem] text-muted">
              Read the explanation for every missed question. The point is the reason, not the letter.
            </p>
            <div className="mt-3 space-y-2">
              {questions.map((item, position) => {
                const chosen = answers[position];
                const right = chosen === item.answer;
                return (
                  <AccordionItem
                    key={item.id}
                    title={`${right ? '✓' : '×'} ${position + 1}. ${item.prompt.slice(0, 88)}${item.prompt.length > 88 ? '…' : ''}`}
                    icon={
                      <span className={right ? 'text-leaf' : 'text-rose'}>
                        <Icon name={right ? 'check-circle' : 'x'} size={18} />
                      </span>
                    }
                    defaultOpen={!right && position === answers.findIndex((value, i) => value !== questions[i].answer)}
                  >
                    <div className="space-y-2">
                      {item.passage && (
                        <p className="rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.8rem] leading-relaxed">
                          {item.passage}
                        </p>
                      )}
                      <p className="font-medium text-ink">{item.prompt}</p>
                      <p className="text-[0.82rem]">
                        <span className="font-semibold text-ink">Your answer:</span>{' '}
                        {chosen >= 0 ? item.options[chosen] : 'Not answered'}
                      </p>
                      <p className="text-[0.82rem] text-leaf">
                        <span className="font-semibold">Correct answer:</span> {item.options[item.answer]}
                      </p>
                      <p className="text-[0.82rem] leading-relaxed text-muted">{item.explanation}</p>
                      {item.source && <p className="text-[0.68rem] text-muted">Source: {item.source}</p>}
                    </div>
                  </AccordionItem>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const timerTight = isMock && secondsLeft > 0 && secondsLeft <= 60;

  return (
    <div className="surface overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="eyebrow">{isMock ? 'Exam conditions' : 'Practice set'}</p>
          <p className="mt-0.5 font-display text-lg font-semibold leading-tight">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          {isMock && seconds ? (
            <span
              className={cn(
                'chip tabular !px-2.5 !py-1',
                timerTight ? 'chip-rose' : 'chip-leaf',
              )}
              aria-live="polite"
            >
              <Icon name="timer" size={13} />
              {formatClock(secondsLeft)}
            </span>
          ) : null}
          <span className="chip">
            {index + 1} / {total}
          </span>
        </div>
      </div>

      <div className="px-5 pt-3">
        <ProgressBar
          value={((index + (selected >= 0 ? 1 : 0)) / total) * 100}
          label="Quiz progress"
          height={5}
        />
      </div>

      <div className="px-5 py-5 sm:px-6">
        {question.passage && (
          <div className="mb-4 rounded-2xl border border-line bg-[var(--bg-sunk)] p-4 text-[0.88rem] leading-relaxed text-soft">
            <p className="eyebrow mb-2">Passage</p>
            {question.passage.split('\n').map((line, i) => (
              <p key={i} className={i ? 'mt-2' : undefined}>
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {question.difficulty && (
            <span className="chip !py-0.5 !text-[0.6rem] capitalize">{question.difficulty}</span>
          )}
          {question.source && <span className="chip !py-0.5 !text-[0.6rem]">{question.source}</span>}
        </div>

        <h3 className="mt-2 text-[1.02rem] font-semibold leading-relaxed text-ink sm:text-[1.08rem]">
          {question.prompt}
        </h3>

        <div className="mt-4 space-y-2" role="group" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const isChosen = selected === optionIndex;
            const isCorrect = revealed && optionIndex === question.answer;
            const isWrongChoice = revealed && isChosen && optionIndex !== question.answer;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(optionIndex)}
                disabled={revealed}
                aria-pressed={isChosen}
                className={cn(
                  'flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left text-[0.9rem] leading-relaxed transition-colors',
                  'border-line bg-elev hover:border-leaf',
                  isChosen && !revealed && 'border-leaf bg-[var(--leaf-soft)]',
                  isCorrect && 'border-leaf bg-[var(--leaf-soft)] text-ink',
                  isWrongChoice && 'border-rose bg-[var(--rose-soft)] text-ink',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.68rem] font-bold',
                    isCorrect
                      ? 'border-leaf bg-leaf text-[#fffdf9]'
                      : isWrongChoice
                        ? 'border-rose bg-rose text-[#fffdf9]'
                        : isChosen
                          ? 'border-leaf text-leaf'
                          : 'border-line-strong text-muted',
                  )}
                >
                  {isCorrect ? (
                    <Icon name="check" size={12} />
                  ) : isWrongChoice ? (
                    <Icon name="x" size={12} />
                  ) : (
                    letters[optionIndex] ?? optionIndex + 1
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {revealed && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  'mt-4 rounded-2xl p-4 text-[0.86rem] leading-relaxed',
                  selected === question.answer
                    ? 'bg-[var(--leaf-soft)] text-soft'
                    : 'bg-[var(--gold-soft)] text-soft',
                )}
              >
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Icon
                    name={selected === question.answer ? 'check-circle' : 'info'}
                    size={16}
                    className={selected === question.answer ? 'text-leaf' : 'text-gold'}
                  />
                  {selected === question.answer ? 'That is right.' : 'Not quite — here is the reason.'}
                </p>
                <p className="mt-1.5">{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.72rem] text-muted">
            {isMock
              ? 'Choose your answer, then move on. Explanations come at the end.'
              : selected < 0
                ? 'Choose the answer that fits the whole sentence or argument.'
                : 'Read the reason before moving on.'}
          </p>
          <button
            type="button"
            onClick={next}
            disabled={selected < 0}
            className="btn btn-primary"
          >
            {index + 1 >= total ? (isMock ? 'Finish section' : 'See result') : 'Next question'}
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
