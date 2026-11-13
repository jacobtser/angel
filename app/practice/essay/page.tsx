'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { RichText } from '@/components/tutor/RichText';
import { useAppStore } from '@/lib/store';
import { usePwa } from '@/components/providers/PwaProvider';
import { askTutor, hasIncludedAi, localTutorReply } from '@/lib/tutor';

const prompts = [
  'Narrative: Write a story that ends with the words, "I wished I had listened."',
  'Descriptive: Describe a busy market scene in your community.',
  'Argumentative: "Students should not use mobile phones in school." Do you agree or disagree? Give reasons.',
  'Formal letter: Write a letter to the head of your school suggesting ways to improve discipline.',
  'Informal letter: Write a letter to a friend telling them how you are preparing for your examinations.',
  'Article: Write an article for your school magazine on the importance of reading.',
  'Speech: Write a speech to be delivered on the effects of indiscipline among students.',
];

const checklist = [
  'Clear purpose and audience for the type chosen (letter format, speech opening, story flow, etc.).',
  'A strong opening and a clear ending.',
  'Paragraphs: one main idea per paragraph, linked smoothly.',
  'Relevant examples/evidence (especially for argumentative/article/speech).',
  'Accurate grammar, punctuation and spelling; varied sentence lengths.',
  'Appropriate tone and vocabulary for the task.',
  'Within the expected length and answers the exact question asked.',
];

export default function EssayCoachPage() {
  const { state } = useAppStore();
  const { online } = usePwa();
  const aiReady =
    online &&
    Boolean(
      state.settings.ai.apiKey.trim() || state.settings.ai.proxyUrl.trim() || hasIncludedAi(),
    );
  const [prompt, setPrompt] = useState(prompts[0]);
  const [custom, setCustom] = useState('');
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);
  const [usedOffline, setUsedOffline] = useState(false);

  const activePrompt = custom.trim() ? custom.trim() : prompt;

  async function getFeedback() {
    const text = essay.trim();
    if (!text) {
      setFeedback('Paste or write your essay first, even if it is only a draft. A rough paragraph is enough to begin.');
      return;
    }
    setBusy(true);
    setFeedback('');
    setUsedOffline(false);
    const essayKnowledge = [
      'MODULE: WASSCE English Language Paper 2 — Continuous Writing (essay).',
      'Common types: narrative, descriptive, argumentative, expository, formal/informal letter, article, speech, report/debate as instructed.',
      'WAEC-style rubric focus: (1) Content & relevance to task/audience, (2) Organisation & paragraphing/coherence, (3) Expression & vocabulary/grammar, (4) Mechanical accuracy (spelling, punctuation).',
      'Guidance: keep purpose, audience and format correct; clear opening and ending; one main idea per paragraph with linking; specific examples; varied sentences; answer the exact question.',
      `Active essay question: ${activePrompt}`,
      'Student draft is provided in the question field/context for feedback. Give concise, specific feedback and do not rewrite the whole essay.',
    ].join('\n');
    const context = {
      subjectId: 'english' as const,
      label: 'Essay coach',
      topicTitle: 'Essay writing (Paper 2)',
      question: `Essay question: ${activePrompt}\n\nStudent draft:\n${text.slice(0, 6000)}`,
      learnerName: state.profile.name || 'Angel',
      knowledge: essayKnowledge,
    };
    const userMsg = `Please give WAEC-style feedback on my essay draft for this question: "${activePrompt}". Use a clear rubric: (1) Content/relevance, (2) Organisation, (3) Expression/grammar, (4) Mechanical accuracy. Point out 2 strengths, 2 specific improvements, and suggest one revised paragraph or opening. Do not rewrite the whole essay.`;
    try {
      if (!online) {
        throw new Error('OFFLINE');
      }
      const reply = await askTutor({
        settings: state.settings.ai,
        messages: [
          { role: 'user', content: userMsg },
        ],
        context,
      });
      setFeedback(reply);
    } catch {
      const local = localTutorReply('Give feedback on my essay draft and how to improve it for WAEC.', context);
      setFeedback(
        `**Offline self-check (use this rubric now):**\n\n${checklist.map((c) => `- ${c}`).join('\n')}\n\n**Quick next step:** read your opening and ending aloud. Do they answer the exact question: “${activePrompt}”? Then fix one paragraph at a time.\n\n${local}`
      );
      setUsedOffline(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Link href="/practice/" className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf">
        <Icon name="arrow-left" size={15} />
        Practice hub
      </Link>

      <section className="hero-wash relative mt-3 overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Paper 2 writing</p>
          <h1 className="display-lg mt-2">Essay coach &amp; feedback</h1>
          <p className="prose-angel mt-3">
            Write a draft, then get WAEC-style feedback. When you are online and Jacob’s AI is configured, you’ll get
            targeted feedback on content, organisation, expression and accuracy. When offline, use the built-in rubric
            checklist to review your own work.
          </p>
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <section className="surface p-5 sm:p-6">
          <label className="label" htmlFor="essay-prompt">Choose a prompt</label>
          <select id="essay-prompt" className="select" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
            {prompts.map((p) => <option key={p} value={p}>{p.slice(0, 90)}{p.length > 90 ? '…' : ''}</option>)}
          </select>
          <label className="label mt-3" htmlFor="essay-custom">Or write your own question</label>
          <input id="essay-custom" className="input" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Type the exact essay question here (optional)" />

          <div className="mt-4 rounded-xl border border-line bg-[var(--bg-sunk)] p-3 text-[0.82rem] leading-relaxed text-soft">
            <p className="font-semibold text-ink">Active question</p>
            <p className="mt-1">{activePrompt}</p>
          </div>

          <label className="label mt-4" htmlFor="essay-draft">Your draft</label>
          <textarea
            id="essay-draft"
            className="textarea !min-h-[18rem]"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Write your essay here. Aim for a clear opening, developed paragraphs, and a strong ending."
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => void getFeedback()} disabled={busy} className="btn btn-primary">
              <Icon name={busy ? 'refresh' : 'spark'} size={16} />
              {busy ? 'Getting feedback…' : (aiReady ? 'Get AI feedback' : 'Get rubric feedback')}
            </button>
            <span className="text-[0.72rem] text-muted">
              {aiReady ? 'Online: Jacob can give targeted feedback.' : 'Offline: rubric checklist mode.'}
            </span>
          </div>
        </section>

        <section className="surface p-5 sm:p-6" aria-labelledby="feedback-heading">
          <div className="flex items-center justify-between gap-2">
            <h2 id="feedback-heading" className="font-display text-xl font-semibold">Feedback</h2>
            {usedOffline && <span className="chip">Offline guide</span>}
          </div>
          {feedback ? (
            <div className="prose-angel mt-3 text-[0.9rem] leading-relaxed">
              <RichText text={feedback} />
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-line bg-[var(--bg-sunk)] p-4 text-[0.84rem] leading-relaxed text-muted">
              <p className="font-semibold text-ink">WAEC-style self-check rubric</p>
              <ul className="mt-2 space-y-2">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="tick mt-0.5"><Icon name="check" size={11} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Write a draft on the left, then ask for feedback. Jacob will guide you to improve it — he won’t rewrite the whole essay for you.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
