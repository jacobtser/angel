import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pastPapers, subjects, totalPastItems } from '@/content/subjects';

export const metadata: Metadata = {
  title: 'Subjects',
  description:
    'English Language, Management in Living and Core Mathematics — the full topic path for each WASSCE paper.',
};

export default function SubjectsPage() {
  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Three papers</p>
          <h1 className="display-lg mt-2">The whole course, in the order that helps</h1>
          <p className="prose-angel mt-3 max-w-2xl">
            You do not have to revise three subjects evenly. English carries the heaviest reading load and
            appears in more places on your result sheet, so it leads. Management in Living comes next.
            Mathematics gets regular, calm time — not a panic at the end.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip chip-leaf">
              <Icon name="star" size={13} />
              English first
            </span>
            <span className="chip chip-gold">
              <Icon name="heart" size={13} />
              MIL second
            </span>
            <span className="chip">
              <Icon name="brain" size={13} />
              Maths steady
            </span>
          </div>
        </div>
      </section>

      <section className="mt-7" aria-labelledby="subject-list">
        <SectionHeading
          eyebrow="Pick up where you are"
          title="Your subjects"
          description="Each card opens a topic path, the paper's shape, readiness evidence and a download for offline study."
          as="h2"
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="library-heading">
        <SectionHeading
          eyebrow="The wider library"
          title="Beyond the topic pages"
          description="Past questions, set texts and oral practice — all reachable without data once saved."
          as="h2"
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/literature/" className="surface group p-5 transition-transform hover:-translate-y-0.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--rose-soft)] text-rose">
              <Icon name="quote" size={20} />
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold">Literature companion</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Four set texts and ten poems with themes, characters, symbols and essay plans.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">
              Browse the texts
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link href="/papers/" className="surface group p-5 transition-transform hover:-translate-y-0.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--sky-soft)] text-sky">
              <Icon name="layers" size={20} />
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold">Past papers</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {pastPapers.length} papers and {totalPastItems} worked items from the vault, with source notes
              and flagged uncertain scans.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">
              Open the archive
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link href="/orals/" className="surface group p-5 transition-transform hover:-translate-y-0.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--plum-soft)] text-plum">
              <Icon name="headphones" size={20} />
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold">Oral English</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Listen, repeat and answer. Built for the Paper 3 contrasts many private candidates never
              practise aloud.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">
              Start a drill
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <aside className="mt-8 rounded-2xl border border-line bg-[var(--gold-soft)]/50 p-5 text-[0.82rem] leading-relaxed text-soft">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="info" size={16} className="text-gold" />
          About the source material
        </p>
        <p className="mt-1.5">
          Explanations and practice items are written for this app. Where a question comes from a WAEC
          paper in this vault, the source is named. Management in Living currently has no question paper
          here — only a timetable — so its practice is original and never labelled as a past paper.
        </p>
      </aside>
    </div>
  );
}
