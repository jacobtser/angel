'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { Confetti } from '@/components/ui/Confetti';
import { useTutor, useTutorContext } from '@/components/providers/TutorProvider';
import { oralQuestions } from '@/content/orals';
import { buildSubjectKnowledge } from '@/lib/tutorKnowledge';
import { speak, speechSupported, stopSpeaking } from '@/lib/speech';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

const categoryLabel = {
  vowels: 'Vowel sounds',
  consonants: 'Consonant sounds',
  stress: 'Word stress',
  intonation: 'Intonation',
} as const;

export function OralTrainer() {
  const { openTutor } = useTutor();
  const { awardXp } = useAppStore();
  const [order, setOrder] = useState(() => oralQuestions.map((_, index) => index));
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);
  const [voice, setVoice] = useState(false);

  useEffect(() => {
    setVoice(speechSupported());
    return () => stopSpeaking();
  }, []);

  const oralKnowledge = useMemo(() => {
    const sample = oralQuestions.slice(0, 15).map((q, i) => {
      const opts = q.options.map((o, j) => `${String.fromCharCode(65 + j)}. ${o}`).join(' | ');
      return `${i + 1}. [${q.category}] ${q.prompt} Options: ${opts} | Answer: ${q.options[q.answer]} | Why: ${q.explanation}`;
    }).join('\n');
    return [
      buildSubjectKnowledge('english'),
      'MODULE: Oral English (Paper 3 where applicable) — vowels, consonants, word stress, intonation tested through sound contrasts.',
      'Key tips: say options aloud; focus on the contrast tested (length/tension/place/stress/rise-fall), not spelling or accent.',
      sample ? `Sample oral items (guide reasoning, do not give away immediately):\n${sample}` : '',
    ].filter(Boolean).join('\n\n');
  }, []);

  useTutorContext({
    subjectId: 'english',
    label: 'Oral English',
    topicTitle: 'Oral English — sounds, stress and intonation',
    bigIdea:
      'Oral English is tested through contrasts: which word has the same sound, which syllable carries the stress, and whether the voice rises or falls.',
    pitfalls: [
      'Choosing the word that looks similar instead of the one that sounds similar.',
      'Forgetting that noun and verb forms can shift stress.',
    ],
    knowledge: oralKnowledge,
  });

  const current = oralQuestions[order[position]];
  const progress = useMemo(
    () => (answered / oralQuestions.length) * 100,
    [answered],
  );

  function choose(option: number) {
    if (selected >= 0) return;
    setSelected(option);
    setAnswered((count) => count + 1);
    if (option === current.answer) {
      setScore((value) => value + 1);
      awardXp(2);
    }
  }

  function next() {
    if (position + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setPosition((value) => value + 1);
    setSelected(-1);
    stopSpeaking();
  }

  function restart(shuffle = false) {
    const base = oralQuestions.map((_, index) => index);
    if (shuffle) {
      for (let i = base.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [base[i], base[j]] = [base[j], base[i]];
      }
    }
    setOrder(base);
    setPosition(0);
    setSelected(-1);
    setScore(0);
    setAnswered(0);
    setFinished(false);
    stopSpeaking();
  }

  if (finished) {
    const percent = Math.round((score / oralQuestions.length) * 100);
    return (
      <div>
        {percent >= 70 && <Confetti pieces={26} />}
        <div className="surface overflow-hidden p-6 text-center sm:p-8">
          <p className="eyebrow">Oral drill complete</p>
          <p className="tabular mt-2 font-display text-6xl font-semibold leading-none">{percent}%</p>
          <p className="mt-2 text-sm text-muted">
            {score} of {oralQuestions.length} correct
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold">
            {percent >= 80 ? 'Your ear is getting sharp' : percent >= 55 ? 'A useful base' : 'Worth another listen'}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-soft">
            {percent >= 80
              ? 'Keep the contrasts warm: read five questions aloud once a week rather than cramming them the night before.'
              : 'Listen to the options again, especially the vowels. Say each pair aloud and feel where the sound sits in your mouth.'}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => restart(false)} className="btn btn-primary">
              <Icon name="refresh" size={16} />
              Run it again
            </button>
            <button type="button" onClick={() => restart(true)} className="btn btn-secondary">
              Shuffle the questions
            </button>
            <button
              type="button"
              onClick={() =>
                openTutor({
                  subjectId: 'english',
                  label: 'Oral English',
                  topicTitle: 'Oral English',
                  bigIdea: 'Vowel length, consonant place and word stress are tested through contrasts.',
                  knowledge: oralKnowledge,
                })
              }
              className="btn btn-ai"
            >
              <Icon name="spark" size={16} />
              Ask Jacob about a sound
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Paper 3, where available</p>
          <h1 className="display-lg mt-2">Say it out loud</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            Oral English rewards the ear, not the eye. These {oralQuestions.length} items train vowel length,
            consonant place, word stress and intonation — the contrasts WAEC keeps returning to.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-rose">
              <Icon name="headphones" size={13} />
              Read aloud
            </span>
            <span className="chip">
              <Icon name="target" size={13} />
              {oralQuestions.length} questions
            </span>
            <span className="chip chip-gold">
              <Icon name="info" size={13} />
              Check your entry for Paper 3
            </span>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.5fr_.8fr]">
        <div className="surface overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="chip chip-rose">{categoryLabel[current.category]}</span>
              <span className="chip">
                {position + 1} / {order.length}
              </span>
            </div>
            <span className="chip chip-leaf">
              <Icon name="check-circle" size={12} />
              {score} correct
            </span>
          </div>

          <div className="px-5 pt-3">
            <ProgressBar value={progress} color="var(--rose)" label="Oral drill progress" height={5} />
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-[1.02rem] font-semibold leading-relaxed text-ink">{current.prompt}</p>

            {voice && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => speak(current.prompt)}
                  className="btn btn-ghost btn-sm"
                >
                  <Icon name="volume" size={14} />
                  Read the question
                </button>
                <button
                  type="button"
                  onClick={() => speak(current.options.join('. '), { rate: 0.82 })}
                  className="btn btn-ghost btn-sm"
                >
                  <Icon name="headphones" size={14} />
                  Hear the options slowly
                </button>
              </div>
            )}

            <div className="mt-4 space-y-2" role="group" aria-label="Oral answer options">
              {current.options.map((option, index) => {
                const isChosen = selected === index;
                const isCorrect = selected >= 0 && index === current.answer;
                const isWrong = selected >= 0 && isChosen && index !== current.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(index)}
                    disabled={selected >= 0}
                    aria-pressed={isChosen}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.92rem] transition-colors',
                      'border-line bg-elev hover:border-rose',
                      isChosen && selected < 0 && 'border-rose bg-[var(--rose-soft)]',
                      isCorrect && 'border-leaf bg-[var(--leaf-soft)]',
                      isWrong && 'border-rose bg-[var(--rose-soft)]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.64rem] font-bold',
                        isCorrect
                          ? 'border-leaf bg-leaf text-white'
                          : isWrong
                            ? 'border-rose bg-rose text-white'
                            : 'border-line-strong text-muted',
                      )}
                    >
                      {isCorrect ? <Icon name="check" size={11} /> : isWrong ? <Icon name="x" size={11} /> : index + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {selected >= 0 && (
              <div
                className={cn(
                  'mt-4 rounded-2xl p-4 text-[0.86rem] leading-relaxed',
                  selected === current.answer
                    ? 'bg-[var(--leaf-soft)] text-soft'
                    : 'bg-[var(--gold-soft)] text-soft',
                )}
              >
                <p className="font-semibold text-ink">
                  {selected === current.answer ? 'That is the contrast.' : 'Not this one — listen once more.'}
                </p>
                <p className="mt-1">{current.explanation}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={next}
                disabled={selected < 0}
                className="btn btn-primary"
              >
                {position + 1 >= order.length ? 'Finish drill' : 'Next question'}
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <section className="surface p-5">
            <p className="eyebrow">How to practise</p>
            <h2 className="mt-1 font-display text-xl font-semibold">The mouth remembers</h2>
            <ul className="mt-3 space-y-2">
              {[
                'Say each option aloud before choosing. Silent reading hides the difference.',
                'For vowels, notice length and tension: seat is longer and tenser than sit.',
                'For stress, clap once on the strong syllable. Noun RE-cord, verb re-CORD.',
                'For intonation, hum the shape: rise for a yes/no question, fall for a statement.',
              ].map((tip) => (
                <li key={tip} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-soft">
                  <span className="tick mt-0.5">
                    <Icon name="check" size={11} />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
            {!voice && (
              <p className="mt-3 rounded-xl bg-[var(--gold-soft)] p-3 text-[0.74rem] leading-relaxed text-[var(--gold-ink)]">
                This browser has no speech voice available, so the read-aloud buttons are hidden. Read the
                options aloud yourself — the drill still works.
              </p>
            )}
          </section>

          <section className="surface p-5">
            <p className="eyebrow">A caution</p>
            <h2 className="mt-1 font-display text-xl font-semibold">One accent is not “correct”</h2>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
              The voice on your phone may sound British, American or Ghanaian. WAEC tests the contrasts in
              standard English, not the accent you speak at home. Focus on the difference the question is
              asking about.
            </p>
            <button
              type="button"
              onClick={() =>
                openTutor({
                  subjectId: 'english',
                  label: 'Oral English',
                  topicTitle: 'Oral English',
                  bigIdea: 'Vowel length, consonant place, word stress and intonation are tested through contrasts.',
                  knowledge: oralKnowledge,
                })
              }
              className="btn btn-ai btn-sm mt-3"
            >
              <Icon name="spark" size={14} />
              Ask Jacob about a sound
            </button>
          </section>

          <button type="button" onClick={() => restart(true)} className="btn btn-secondary w-full">
            <Icon name="refresh" size={15} />
            Shuffle and restart
          </button>
        </aside>
      </div>
    </div>
  );
}
