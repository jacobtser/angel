'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { GameFinish, GameFrame } from './GameFrame';
import { english } from '@/content/english';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';
import type { QuizQuestion } from '@/lib/types';

const DURATION = 150;

function buildSet(): { passage: string; questions: QuizQuestion[] } {
  const all = english.topics.find((topic) => topic.id === 'english:comprehension')?.quiz ?? [];
  const groups = new Map<string, QuizQuestion[]>();
  for (const question of all) {
    if (!question.passage) continue;
    const key = question.passage;
    groups.set(key, [...(groups.get(key) ?? []), question]);
  }
  const best = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)[0];
  if (best) return { passage: best[0], questions: best[1].slice(0, 3) };
  const fallback = all.slice(0, 3);
  return { passage: fallback[0]?.passage ?? '', questions: fallback };
}

export function ComprehensionDash() {
  const { state, recordGame } = useAppStore();
  const [{ passage, questions }] = useState(buildSet);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [correct, setCorrect] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const recorded = useRef(false);
  const timeout = useRef<number | null>(null);
  const best = state.games['comprehension-dash']?.score ?? 0;
  const current = questions[index];

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  useEffect(() => {
    if (secondsLeft === 0 && !finished) finish(correct);
  }, [secondsLeft, finished, correct]);

  useEffect(() => () => {
    if (timeout.current) window.clearTimeout(timeout.current);
  }, []);

  function finish(finalCorrect: number, remaining = secondsLeft) {
    if (recorded.current) return;
    recorded.current = true;
    const finalScore = finalCorrect * 100 + Math.max(0, remaining) * 2;
    setScore(finalScore);
    setFinished(true);
    recordGame('comprehension-dash', finalScore);
  }

  function choose(option: number) {
    if (selected >= 0 || finished) return;
    setSelected(option);
    const isRight = option === current.answer;
    const nextCorrect = correct + (isRight ? 1 : 0);
    if (isRight) setCorrect(nextCorrect);

    timeout.current = window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        finish(nextCorrect);
      } else {
        setIndex((value) => value + 1);
        setSelected(-1);
      }
    }, 900);
  }

  function restart() {
    setIndex(0);
    setSelected(-1);
    setCorrect(0);
    setSecondsLeft(DURATION);
    setFinished(false);
    setScore(0);
    recorded.current = false;
  }

  if (!questions.length) {
    return (
      <GameFrame slug="comprehension-dash">
        <p className="surface p-6 text-sm text-muted">The comprehension passages could not be loaded.</p>
      </GameFrame>
    );
  }

  return (
    <GameFrame slug="comprehension-dash">
      {finished ? (
        <GameFinish
          score={score}
          best={best}
          label="points"
          headline={correct === questions.length ? 'All three, under the clock' : 'The clock is not the enemy'}
          body="Comprehension rewards locating evidence, not reading faster. Next round, point to the sentence that answers the question before you choose."
          onRestart={restart}
          celebrate={score > best}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="chip chip-rose">
                <Icon name="book" size={12} />
                Passage
              </span>
              <span className={cn('chip tabular', secondsLeft <= 30 && 'chip-rose')}>
                <Icon name="timer" size={12} />
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">{passage}</p>
          </div>

          <div className="surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="chip">
                {index + 1} / {questions.length}
              </span>
              <span className="chip chip-leaf">
                <Icon name="check-circle" size={12} />
                {correct} correct
              </span>
            </div>

            <p className="mt-3 text-[0.95rem] font-semibold leading-relaxed text-ink">{current.prompt}</p>

            <div className="mt-3 space-y-2">
              {current.options.map((option, optionIndex) => {
                const isChosen = selected === optionIndex;
                const isRight = selected >= 0 && optionIndex === current.answer;
                const isWrong = selected >= 0 && isChosen && optionIndex !== current.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(optionIndex)}
                    disabled={selected >= 0}
                    className={cn(
                      'flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[0.84rem] leading-relaxed transition-colors',
                      'border-line bg-elev hover:border-rose',
                      isChosen && selected < 0 && 'border-rose bg-[var(--rose-soft)]',
                      isRight && 'border-leaf bg-[var(--leaf-soft)]',
                      isWrong && 'border-rose bg-[var(--rose-soft)]',
                    )}
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-strong text-[0.6rem] font-bold text-muted">
                      {isRight ? <Icon name="check" size={10} /> : isWrong ? <Icon name="x" size={10} /> : optionIndex + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {selected >= 0 && (
              <p
                className={cn(
                  'mt-3 rounded-xl p-3 text-[0.78rem] leading-relaxed',
                  selected === current.answer
                    ? 'bg-[var(--leaf-soft)] text-soft'
                    : 'bg-[var(--gold-soft)] text-soft',
                )}
              >
                <strong className="text-ink">
                  {selected === current.answer ? 'Correct. ' : 'Look again next time. '}
                </strong>
                {current.explanation}
              </p>
            )}
          </div>
        </div>
      )}
    </GameFrame>
  );
}
