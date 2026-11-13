import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';
import { subjects } from '@/content/subjects';

export const metadata: Metadata = {
  title: 'Diagnostic',
  description: 'Short diagnostics to find your starting point in each subject.',
};

export default function DiagnosticIndexPage() {
  return (
    <div>
      <Link href="/practice/" className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-muted hover:text-leaf">
        <Icon name="arrow-left" size={15} />
        Practice hub
      </Link>
      <section className="hero-wash relative mt-3 overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="eyebrow">Know where you stand</p>
          <h1 className="display-lg mt-2">Start with a short diagnostic</h1>
          <p className="prose-angel mt-3">
            A diagnostic is a quick check, not an exam. It samples topics to show what is on track and what needs attention.
            Choose a subject below — about 12 untimed questions.
          </p>
        </div>
      </section>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/practice/diagnostic/${subject.id}/`} className={`subject-${subject.id} surface group p-5`}>
            <span className="chip" style={{ background: 'var(--subject-soft)', color: 'var(--subject)' }}>Priority {subject.priority}</span>
            <h2 className="mt-3 font-display text-xl font-semibold">{subject.name}</h2>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">12 untimed questions · updates readiness for this subject.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-leaf">Begin diagnostic <Icon name="arrow-right" size={14} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
