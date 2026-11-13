import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';
import { subjects } from '@/content/subjects';

export const metadata: Metadata = {
  title: 'Review & fix',
  description: 'Targeted practice focused on your weaker topics.',
};

export default function FixIndexPage() {
  return (
    <div>
      <Link href="/practice/" className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf">
        <Icon name="arrow-left" size={15} />
        Practice hub
      </Link>
      <section className="hero-wash relative mt-3 overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="eyebrow">Targeted practice</p>
          <h1 className="display-lg mt-2">Review &amp; fix weak spots</h1>
          <p className="prose-angel mt-3">
            These sets focus on topics where you have less evidence or lower accuracy. Untimed, with explanations for every question.
            Choose a subject to start.
          </p>
        </div>
      </section>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/practice/fix/${subject.id}/`} className={`subject-${subject.id} surface group p-5`}>
            <span className="chip chip-gold">Review &amp; fix</span>
            <h2 className="mt-3 font-display text-xl font-semibold">{subject.name}</h2>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">Practice drawn from your current weak spots in {subject.shortName}.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">Start fixing <Icon name="arrow-right" size={14} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
