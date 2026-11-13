'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { GameFinish, GameFrame } from './GameFrame';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

interface QuestQuestion {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
}

interface Stage {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  questions: QuestQuestion[];
}

/**
 * Nine questions in three stages. The maths is deliberately small: the point
 * is to keep the method moving under a little pressure, not to trick anyone.
 */
const stages: Stage[] = [
  {
    id: 'indices',
    eyebrow: 'Stage 1',
    title: 'Indices without panic',
    note: 'Same base? Then the laws do the work for you.',
    questions: [
      {
        prompt: 'Simplify 2⁵ ÷ 2².',
        options: ['8', '4', '16', '32'],
        answer: 0,
        hint: 'When the bases match, dividing means subtracting the indices.',
        explanation: '5 − 2 = 3, so 2³ = 8.',
      },
      {
        prompt: 'If 2ˣ = 64, what is x?',
        options: ['6', '5', '7', '8'],
        answer: 0,
        hint: 'Write 64 as a power of 2. Count: 2, 4, 8, 16, 32, 64.',
        explanation: '64 = 2⁶, so x = 6.',
      },
      {
        prompt: 'Evaluate 5⁰ + 5⁻¹.',
        options: ['6/5', '1/5', '1', '5/6'],
        answer: 0,
        hint: 'Any non-zero number to the power zero is 1. A negative index means reciprocal.',
        explanation: '5⁰ = 1 and 5⁻¹ = 1/5, so 1 + 1/5 = 6/5.',
      },
    ],
  },
  {
    id: 'bases',
    eyebrow: 'Stage 2',
    title: 'Bases and remainders',
    note: 'A base is just a place-value rule. Nothing more mysterious than that.',
    questions: [
      {
        prompt: 'Convert 123₄ to base ten.',
        options: ['27', '39', '23', '31'],
        answer: 0,
        hint: 'Multiply each digit by its place value: 4², 4¹, 4⁰.',
        explanation: '1 × 16 + 2 × 4 + 3 × 1 = 16 + 8 + 3 = 27.',
      },
      {
        prompt: 'Convert 1101₂ to base ten.',
        options: ['13', '11', '14', '9'],
        answer: 0,
        hint: 'In base two the place values are 8, 4, 2 and 1.',
        explanation: '8 + 4 + 0 + 1 = 13.',
      },
      {
        prompt: 'Which value of x satisfies 3x ≡ 4 (mod 5) for 0 ≤ x < 5?',
        options: ['3', '2', '4', '1'],
        answer: 0,
        hint: 'Try each option. You are looking for a multiple of 3 that leaves remainder 4.',
        explanation: '3 × 3 = 9. Nine leaves remainder 4 when divided by 5.',
      },
    ],
  },
  {
    id: 'boss',
    eyebrow: 'Final stage',
    title: 'The two-step boss',
    note: 'No new rules here. Just two familiar moves, one after the other.',
    questions: [
      {
        prompt: 'Simplify (2³ × 2⁴) ÷ 2⁵.',
        options: ['4', '2', '8', '16'],
        answer: 0,
        hint: 'Add the indices in the bracket first, then subtract the index outside.',
        explanation: '2³ × 2⁴ = 2⁷. Then 2⁷ ÷ 2⁵ = 2² = 4.',
      },
      {
        prompt: 'If 2ˣ = 64 and 3ʸ = 81, find x + y.',
        options: ['10', '9', '12', '7'],
        answer: 0,
        hint: 'Find each index separately. 81 is 3 to the power of what?',
        explanation: '64 = 2⁶ so x = 6. 81 = 3⁴ so y = 4. x + y = 10.',
      },
      {
        prompt: 'Write 0.00042 in standard form.',
        options: ['4.2 × 10⁻⁴', '4.2 × 10⁻³', '42 × 10⁻⁵', '4.2 × 10⁴'],
        answer: 0,
        hint: 'Move the decimal point until one non-zero digit sits before it. Count the moves.',
        explanation: 'Moving the point four places right gives 4.2, so the power is 10⁻⁴.',
      },
    ],
  },
];

const BASE_POINTS = 100;
const HINT_COST = 40;

export function NumberQuest() {
  const { state, recordGame } = useAppStore();
  const [stageIndex, setStageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [hintOpen, setHintOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);
  const recorded = useRef(false);
  const reduce = useReducedMotion();
  const best = state.games['number-quest']?.score ?? 0;

  const stage = stages[stageIndex];
  const question = stage.questions[questionIndex];
  const totalQuestions = useMemo(
    () => stages.reduce((sum, item) => sum + item.questions.length, 0),
    [],
  );
  const stageProgress = useMemo(() => {
    const before = stages.slice(0, stageIndex).reduce((sum, item) => sum + item.questions.length, 0);
    return ((before + questionIndex) / totalQuestions) * 100;
  }, [stageIndex, questionIndex, totalQuestions]);

  function choose(option: number) {
    if (selected >= 0 || finished) return;
    setSelected(option);
    const gained = option === question.answer ? BASE_POINTS - (hintOpen ? HINT_COST : 0) : 0;
    if (option === question.answer) {
      setScore((value) => value + gained);
      setCorrect((value) => value + 1);
    }
    setAnswered((value) => value + 1);
  }

  function next() {
    if (selected < 0) return;
    const lastQuestionInStage = questionIndex + 1 >= stage.questions.length;
    const lastStage = stageIndex + 1 >= stages.length;

    if (lastQuestionInStage && lastStage) {
      const bonus = correct === totalQuestions && answered === totalQuestions ? 150 : 0;
      const finalScore = score + bonus;
      recorded.current = true;
      setScore(finalScore);
      setFinished(true);
      recordGame('number-quest', finalScore);
      return;
    }

    if (lastQuestionInStage) {
      setStageIndex((value) => value + 1);
      setQuestionIndex(0);
    } else {
      setQuestionIndex((value) => value + 1);
    }
    setSelected(-1);
    setHintOpen(false);
  }

  function restart() {
    setStageIndex(0);
    setQuestionIndex(0);
    setSelected(-1);
    setHintOpen(false);
    setScore(0);
    setCorrect(0);
    setAnswered(0);
    setFinished(false);
    recorded.current = false;
  }

  return (
    <GameFrame slug="number-quest">
      {finished ? (
        <GameFinish
          score={score}
          best={best}
          label={`points · ${correct}/${totalQuestions} solved`}
          headline={
            correct === totalQuestions
              ? 'Every stage cleared, no hints needed'
              : correct >= 7
                ? 'The method held under pressure'
                : 'The ladder is still standing'
          }
          body={
            correct === totalQuestions
              ? 'That is the pace to carry into Paper 1. Next time, try explaining one of these rules out loud before you answer it.'
              : 'A wrong answer in practice is information, not a verdict. Read the explanation for each one, then run the stage again while the method is fresh.'
          }
          onRestart={restart}
          celebrate={score > best}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[.75fr_1.25fr]">
          <aside className="surface h-fit p-5">
            <p className="eyebrow">{stage.eyebrow}</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{stage.title}</h2>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{stage.note}</p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[0.68rem] font-semibold text-muted">
                <span>Ladder</span>
                <span className="tabular">
                  {answered}/{totalQuestions}
                </span>
              </div>
              <ProgressBar
                value={stageProgress}
                color="var(--sky)"
                label="Number Quest progress"
                className="mt-1.5"
                height={6}
              />
            </div>

            <ol className="mt-4 space-y-1.5">
              {stages.map((item, index) => {
                const done = index < stageIndex || (index === stageIndex && questionIndex > 0);
                const active = index === stageIndex;
                return (
                  <li
                    key={item.id}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-2.5 py-2 text-[0.76rem] font-semibold',
                      active ? 'bg-[var(--sky-soft)] text-sky' : 'text-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 place-items-center rounded-full border text-[0.6rem]',
                        done && 'border-transparent bg-[var(--leaf-soft)] text-leaf',
                        !done && active && 'border-sky text-sky',
                        !done && !active && 'border-line',
                      )}
                    >
                      {done ? <Icon name="check" size={10} /> : index + 1}
                    </span>
                    {item.title}
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.72rem] leading-relaxed text-muted">
              <p className="flex items-center gap-1.5 font-semibold text-ink">
                <Icon name="target" size={13} className="text-sky" />
                {score} points
              </p>
              <p className="mt-1">
                A hint costs {HINT_COST} points. Using one is still better than guessing — the explanation is
                the real prize.
              </p>
            </div>
          </aside>

          <section className="surface p-5 sm:p-6" aria-live="polite">
            <div className="flex items-center justify-between gap-2">
              <span className="chip chip-rose">
                <Icon name="spark" size={12} />
                Question {questionIndex + 1} of {stage.questions.length}
              </span>
              <span className="chip">
                <Icon name="check-circle" size={12} />
                {correct} correct
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${stage.id}-${questionIndex}`}
                initial={reduce ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
              >
                <p className="mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl">
                  {question.prompt}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isRight = selected >= 0 && optionIndex === question.answer;
                    const isWrong = selected >= 0 && optionIndex === selected && optionIndex !== question.answer;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => choose(optionIndex)}
                        disabled={selected >= 0}
                        className={cn(
                          'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[0.9rem] font-semibold transition-colors',
                          'border-line bg-elev hover:border-sky',
                          isRight && 'border-leaf bg-[var(--leaf-soft)]',
                          isWrong && 'border-rose bg-[var(--rose-soft)]',
                        )}
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-[0.65rem] text-muted">
                          {isRight ? (
                            <Icon name="check" size={11} />
                          ) : isWrong ? (
                            <Icon name="x" size={11} />
                          ) : (
                            String.fromCharCode(65 + optionIndex)
                          )}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selected < 0 ? (
                  <div className="mt-4">
                    {!hintOpen ? (
                      <button
                        type="button"
                        onClick={() => setHintOpen(true)}
                        className="btn btn-ghost btn-sm"
                      >
                        <Icon name="info" size={14} />
                        Give me a hint (−{HINT_COST})
                      </button>
                    ) : (
                      <p className="rounded-xl bg-[var(--gold-soft)] p-3 text-[0.8rem] leading-relaxed text-soft">
                        <span className="font-semibold text-ink">Hint: </span>
                        {question.hint}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-4">
                    <p
                      className={cn(
                        'rounded-xl p-3 text-[0.82rem] leading-relaxed',
                        selected === question.answer
                          ? 'bg-[var(--leaf-soft)] text-soft'
                          : 'bg-[var(--rose-soft)] text-soft',
                      )}
                    >
                      <strong className="text-ink">
                        {selected === question.answer ? 'Correct. ' : 'Not this time. '}
                      </strong>
                      {question.explanation}
                    </p>
                    <button type="button" onClick={next} className="btn btn-primary btn-sm mt-3">
                      {stageIndex + 1 >= stages.length && questionIndex + 1 >= stage.questions.length
                        ? 'See the result'
                        : 'Next question'}
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      )}
    </GameFrame>
  );
}
