'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { AccordionItem } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/ui/EmptyState';
import { useTutor, useTutorContext } from '@/components/providers/TutorProvider';
import { allLiterature, findLiterature, literatureCycleNote } from '@/content/subjects';
import { buildLiteratureKnowledge } from '@/lib/tutorKnowledge';
import { cn } from '@/lib/cn';

function QuoteCard({
  quote,
  onAsk,
}: {
  quote: { text: string; who: string; context: string; use: string };
  onAsk: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`“${quote.text}” — ${quote.who}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <blockquote className="surface p-5">
      <p className="font-display text-[1.15rem] font-medium italic leading-relaxed">“{quote.text}”</p>
      <p className="mt-2 text-[0.76rem] font-semibold text-ink">{quote.who}</p>
      <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">{quote.context}</p>
      <p className="mt-2 rounded-lg bg-[var(--plum-soft)] px-2.5 py-1.5 text-[0.72rem] leading-relaxed text-plum">
        Use it for: {quote.use}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => void copy()} className="btn btn-ghost btn-sm">
          <Icon name={copied ? 'check' : 'quote'} size={13} />
          {copied ? 'Copied' : 'Copy quotation'}
        </button>
        <button type="button" onClick={onAsk} className="btn btn-ghost btn-sm">
          <Icon name="spark" size={13} />
          Ask how to use it
        </button>
      </div>
    </blockquote>
  );
}

export function LiteratureDetail({ id }: { id: string }) {
  const text = findLiterature(id);
  const { openTutor } = useTutor();

  useTutorContext(
    text
      ? {
          subjectId: 'english',
          label: `${text.title} — ${text.author}`,
          textTitle: text.title,
          bigIdea: text.whyItMatters,
          knowledge: buildLiteratureKnowledge(text, literatureCycleNote),
        }
      : {},
  );

  if (!text) {
    return (
      <EmptyState
        icon="quote"
        title="That text is not in the library"
        body="The set-text list may have changed, or the link is old. Browse the current library to find what you need."
        action={{ label: 'Open the literature library', href: '/literature/' }}
      />
    );
  }

  const index = allLiterature.findIndex((item) => item.id === text.id);
  const previous = allLiterature[index - 1];
  const next = allLiterature[index + 1];
  const currentText = text;

  function askAbout(question?: string) {
    openTutor({
      subjectId: 'english',
      label: `${currentText.title} — ${currentText.author}`,
      textTitle: currentText.title,
      bigIdea: currentText.whyItMatters,
      question,
      knowledge: buildLiteratureKnowledge(currentText, literatureCycleNote),
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/literature/"
          className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf"
        >
          <Icon name="arrow-left" size={15} />
          Literature library
        </Link>
        <button type="button" onClick={() => window.print()} className="no-print btn btn-ghost btn-sm">
          <Icon name="pencil" size={14} />
          Print
        </button>
      </div>

      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-plum capitalize">{text.genre}</span>
          <span className="chip">{text.origin}</span>
          <span className="chip">{text.year}</span>
          <span className="chip chip-gold">{text.cycle}</span>
        </div>
        <h1 className="display-lg mt-3">{text.title}</h1>
        <p className="mt-1 font-display text-lg italic text-muted">{text.author}</p>
        <p className="prose-angel mt-3 max-w-3xl text-[1rem]">{text.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => askAbout()} className="btn btn-ai">
            <Icon name="spark" size={16} />
            Talk it through with Jacob
          </button>
          <button
            type="button"
            onClick={() => askAbout(text.essayPrompts[0])}
            className="btn btn-secondary"
          >
            <Icon name="pencil" size={16} />
            Plan an essay
          </button>
        </div>
      </header>

      <aside className="mt-5 rounded-2xl border border-line bg-[var(--gold-soft)]/55 p-4 text-[0.8rem] leading-relaxed text-soft">
        <p className="flex items-start gap-2">
          <Icon name="info" size={15} className="mt-0.5 shrink-0 text-gold" />
          <span>
            <strong className="text-ink">Why this one matters.</strong> {text.whyItMatters}
          </span>
        </p>
      </aside>

      <section className="mt-7" aria-labelledby="structure-heading">
        <p className="eyebrow">Find your way around</p>
        <h2 id="structure-heading" className="display-md mt-1">
          {text.structureLabel}
        </h2>
        <p className="mt-1.5 text-[0.85rem] text-muted">{text.setting}</p>
        <div className="mt-3 space-y-2">
          {text.structure.map((part, partIndex) => (
            <AccordionItem
              key={`${part.label}-${partIndex}`}
              title={`${part.label} · ${part.title}`}
              defaultOpen={partIndex === 0}
              icon={<Icon name="book" size={17} />}
            >
              <p>{part.summary}</p>
            </AccordionItem>
          ))}
        </div>
      </section>

      {text.characters.length > 0 && (
        <section className="mt-8" aria-labelledby="characters-heading">
          <p className="eyebrow">Who carries the story</p>
          <h2 id="characters-heading" className="display-md mt-1">
            Characters
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {text.characters.map((character) => (
              <article key={character.name} className="surface p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold leading-tight">{character.name}</h3>
                  <span className="chip !py-0.5 !text-[0.6rem]">{character.role}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {character.traits.map((trait) => (
                    <span key={trait} className="chip !py-0.5 !text-[0.6rem]">
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-soft">{character.arc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8" aria-labelledby="themes-heading">
        <p className="eyebrow">What the examiner asks about</p>
        <h2 id="themes-heading" className="display-md mt-1">
          Themes
        </h2>
        <div className="mt-3 space-y-3">
          {text.themes.map((theme, themeIndex) => (
            <article key={theme.title} className="surface flex gap-4 p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--plum-soft)] font-display text-sm font-semibold text-plum">
                {themeIndex + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{theme.title}</h3>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-soft">{theme.body}</p>
                <p className="mt-2 border-l-2 border-[var(--gold)] pl-2.5 text-[0.78rem] italic leading-relaxed text-muted">
                  Evidence: {theme.evidence}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {text.symbols.length > 0 && (
        <section className="mt-8" aria-labelledby="symbols-heading">
          <p className="eyebrow">Objects that carry meaning</p>
          <h2 id="symbols-heading" className="display-md mt-1">
            Symbols
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {text.symbols.map((symbol) => (
              <div key={symbol.name} className="surface p-4">
                <p className="font-semibold text-ink">{symbol.name}</p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{symbol.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8" aria-labelledby="quotes-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Short, attributed, usable</p>
            <h2 id="quotes-heading" className="display-md mt-1">
              Quotation bank
            </h2>
          </div>
          <span className="chip">{text.quotes.length} quotations</span>
        </div>
        <p className="mt-1.5 text-[0.78rem] text-muted">
          Quotations are kept short for study. Check the wording against your own edition before quoting it
          in an exam.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {text.quotes.map((quote) => (
            <QuoteCard
              key={quote.text}
              quote={quote}
              onAsk={() => askAbout(`How can I use “${quote.text}” in an essay?`)}
            />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="prompts-heading">
        <p className="eyebrow">Practice the real task</p>
        <h2 id="prompts-heading" className="display-md mt-1">
          Essay questions
        </h2>
        <div className="mt-3 space-y-2.5">
          {text.essayPrompts.map((prompt) => (
            <div key={prompt} className="surface flex flex-wrap items-center gap-3 p-4">
              <p className="min-w-[14rem] flex-1 text-[0.9rem] leading-relaxed text-soft">{prompt}</p>
              <button type="button" onClick={() => askAbout(prompt)} className="btn btn-secondary btn-sm">
                <Icon name="spark" size={14} />
                Plan it with Jacob
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="surface bg-[var(--leaf-soft)]/45 p-5">
          <p className="eyebrow text-leaf">Keep in mind</p>
          <ul className="mt-2 space-y-2">
            {text.examFocus.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-soft">
                <span className="tick mt-0.5">
                  <Icon name="check" size={11} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface p-5">
          <p className="eyebrow">Source note</p>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-soft">{text.sourceNote}</p>
          <p className="mt-3 text-[0.72rem] leading-relaxed text-muted">{literatureCycleNote}</p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        {previous ? (
          <Link href={`/literature/${previous.id}/`} className="btn btn-ghost btn-sm">
            <Icon name="arrow-left" size={15} />
            {previous.title}
          </Link>
        ) : (
          <Link href="/literature/" className="btn btn-ghost btn-sm">
            <Icon name="arrow-left" size={15} />
            Library
          </Link>
        )}
        {next ? (
          <Link href={`/literature/${next.id}/`} className="btn btn-primary btn-sm">
            {next.title}
            <Icon name="arrow-right" size={15} />
          </Link>
        ) : (
          <Link href="/orals/" className="btn btn-primary btn-sm">
            Oral English
            <Icon name="arrow-right" size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
