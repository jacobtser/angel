'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { EmptyState } from '@/components/ui/EmptyState';
import { useTutor, useTutorContext } from '@/components/providers/TutorProvider';
import { pastPapers, subjectById } from '@/content/subjects';
import { buildPaperOverviewKnowledge, buildPaperQuestionKnowledge } from '@/lib/tutorKnowledge';
import { useAppStore } from '@/lib/store';
import type { PastQuestion } from '@/lib/types';

function AnswerBlock({ item }: { item: PastQuestion }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-[var(--leaf-soft)] p-3.5">
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-leaf">
          {item.steps?.length ? 'Model working' : 'Model answer'}
        </p>
        <p className="mt-1 whitespace-pre-line text-[0.88rem] leading-relaxed text-ink">{item.a}</p>
      </div>
      {item.steps?.length ? (
        <ol className="space-y-1.5">
          {item.steps.map((step, index) => (
            <li key={index} className="flex gap-2 text-[0.84rem] leading-relaxed text-soft">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-strong text-[0.6rem] font-bold text-muted">
                {index + 1}
              </span>
              <span className="whitespace-pre-line">{step}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {item.why && (
        <p className="rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.82rem] leading-relaxed text-soft">
          <strong className="text-ink">Why: </strong>
          {item.why}
        </p>
      )}
      {item.tip && (
        <p className="rounded-xl bg-[var(--gold-soft)] p-3 text-[0.8rem] leading-relaxed text-[var(--gold-ink)]">
          <strong>Exam tip: </strong>
          {item.tip}
        </p>
      )}
    </div>
  );
}

function PaperItem({
  item,
  index,
  onAsk,
}: {
  item: PastQuestion;
  index: number;
  onAsk: (question: string, item?: PastQuestion) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="surface p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--bg-sunk)] font-display text-sm font-semibold text-soft">
          {item.n || index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.flag && (
              <span className="chip chip-rose !py-0.5 !text-[0.58rem]">
                <Icon name="alert" size={10} />
                Check the scan
              </span>
            )}
            {item.steps?.length ? (
              <span className="chip chip-plum !py-0.5 !text-[0.58rem]">Worked solution</span>
            ) : null}
          </div>
          <p className="mt-1 whitespace-pre-line text-[0.9rem] leading-relaxed text-ink">{item.q}</p>

          {revealed ? (
            <div className="mt-3">
              <AnswerBlock item={item} />
              <button
                type="button"
                onClick={() => onAsk(item.q, item)}
                className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-plum hover:underline"
              >
                <Icon name="spark" size={13} />
                I don't understand this answer - ask Jacob
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="btn btn-secondary btn-sm mt-2.5"
            >
              <Icon name="eye" size={14} />
              Show answer
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function PaperViewer({ paperId }: { paperId: string }) {
  const paper = pastPapers.find((item) => item.id === paperId);
  const { openTutor } = useTutor();
  const { awardXp } = useAppStore();
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(20);
  const [drill, setDrill] = useState(0);
  const [drillRevealed, setDrillRevealed] = useState(false);
  const [drillScore, setDrillScore] = useState(0);
  const [drillSeen, setDrillSeen] = useState(0);

  useTutorContext(
    paper
      ? {
          subjectId: paper.subject,
          label: paper.label,
          bigIdea: paper.note,
          knowledge: buildPaperOverviewKnowledge(paper),
        }
      : {},
  );

  useEffect(() => {
    setVisible(20);
  }, [query]);

  const filtered = useMemo(() => {
    if (!paper) return [];
    const search = query.trim().toLowerCase();
    if (!search) return paper.items;
    return paper.items.filter(
      (item) => item.q.toLowerCase().includes(search) || item.a.toLowerCase().includes(search),
    );
  }, [paper, query]);

  if (!paper) {
    return (
      <EmptyState
        icon="layers"
        title="That paper is not in the archive"
        body="The link may be old, or the paper has been moved. The archive lists every paper currently available."
        action={{ label: 'Open the archive', href: '/papers/' }}
      />
    );
  }

  const subject = subjectById[paper.subject];
  const flagged = paper.items.filter((item) => item.flag).length;
  const drillItem = paper.items[drill % paper.items.length];
  const currentPaper = paper;

  function ask(question: string, item?: PastQuestion) {
    openTutor({
      subjectId: currentPaper.subject,
      label: currentPaper.label,
      question,
      bigIdea: currentPaper.note,
      knowledge: item
        ? buildPaperQuestionKnowledge(currentPaper, item)
        : buildPaperOverviewKnowledge(currentPaper),
    });
  }

  function nextDrill(knew: boolean) {
    if (knew) {
      setDrillScore((score) => score + 1);
      awardXp(4);
    }
    setDrillSeen((seen) => seen + 1);
    setDrill(
      (index) =>
        (index + 1 + Math.floor(Math.random() * (currentPaper.items.length - 1))) %
        currentPaper.items.length,
    );
    setDrillRevealed(false);
  }

  return (
    <div>
      <Link
        href="/papers/"
        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
      >
        <Icon name="arrow-left" size={15} />
        Past papers
      </Link>

      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`subject-${paper.subject} chip`} style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>
            {subject.shortName}
          </span>
          <span className="chip">{paper.year}</span>
          <span className="chip">{paper.items.length} items</span>
          {flagged > 0 && (
            <span className="chip chip-rose">
              <Icon name="alert" size={11} />
              {flagged} flagged
            </span>
          )}
        </div>
        <h1 className="display-lg mt-3">{paper.label}</h1>
        <p className="prose-angel mt-2 max-w-3xl text-[0.95rem]">{paper.note}</p>
        <p className="mt-2 text-[0.7rem] break-words text-muted">
          <span className="font-semibold text-ink">Source:</span> {paper.source}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#drill" className="btn btn-primary">
            <Icon name="target" size={16} />
            Quick drill
          </a>
          {paper.pdf && (
            <a href={paper.pdf} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Icon name="external" size={16} />
              Original PDF
            </a>
          )}
          <button type="button" onClick={() => window.print()} className="btn btn-ghost">
            <Icon name="pencil" size={16} />
            Print
          </button>
        </div>
      </header>

      <section
        id="drill"
        className="ai-wash mt-6 scroll-mt-24 overflow-hidden rounded-[1.5rem] border border-line"
        aria-labelledby="drill-heading"
      >
        <div className="border-b border-line px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="eyebrow">One question at a time</p>
              <h2 id="drill-heading" className="mt-0.5 font-display text-xl font-semibold">
                Quick drill
              </h2>
            </div>
            <span className="chip">
              {drillScore} known · {drillSeen} seen
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-muted">
            Question {drillItem.n || (drill % paper.items.length) + 1}
          </p>
          <p className="mt-1.5 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink">{drillItem.q}</p>

          {drillRevealed ? (
            <div className="mt-4">
              <AnswerBlock item={drillItem} />
              <p className="mt-4 text-[0.78rem] font-semibold text-muted">
                Be honest: did you know it before you looked?
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" onClick={() => nextDrill(true)} className="btn btn-primary btn-sm">
                  <Icon name="check" size={14} />
                  I knew it
                </button>
                <button type="button" onClick={() => nextDrill(false)} className="btn btn-secondary btn-sm">
                  Not yet
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDrillRevealed(true)}
                className="btn btn-secondary btn-sm"
              >
                Show answer
                <Icon name="eye" size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrill((index) => (index + 1) % paper.items.length);
                  setDrillRevealed(false);
                }}
                className="btn btn-ghost btn-sm"
              >
                Skip
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">The full set</p>
          <h2 className="display-md mt-1">Questions and answers</h2>
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search this paper</span>
          <Icon
            name="search"
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            className="input !min-h-9 !rounded-full !py-1.5 !pl-9 text-[0.82rem]"
            placeholder="Search this paper…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-4 space-y-2.5">
        {filtered.slice(0, visible).map((item, index) => (
          <PaperItem key={`${item.n}-${index}`} item={item} index={index} onAsk={ask} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="surface mt-4 p-6 text-center text-sm text-muted">
          No items match “{query}”. Try a shorter phrase.
        </p>
      )}

      {filtered.length > visible && (
        <div className="mt-4 text-center">
          <button type="button" onClick={() => setVisible((value) => value + 30)} className="btn btn-secondary btn-sm">
            Show more ({filtered.length - visible} left)
            <Icon name="chevron-down" size={14} />
          </button>
        </div>
      )}

      <aside className="mt-7 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-5 text-[0.8rem] leading-relaxed text-soft">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="info" size={15} className="text-gold" />
          A note on certainty
        </p>
        <p className="mt-1.5">
          {flagged > 0
            ? 'Some items are flagged because the original scan is damaged. The answer shown is the most likely reading, not a guarantee. Check the PDF if a mark depends on it.'
            : 'These answers were reconstructed from the paper and, where available, an examiner report. They are study aids, not an official marking scheme.'}
        </p>
      </aside>
    </div>
  );
}
