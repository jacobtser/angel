import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MockSession } from '@/components/practice/MockSession';
import { subjectById, subjects } from '@/content/subjects';
import type { SubjectId } from '@/lib/types';

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) return { title: 'Subject not found' };
  return { title: `${subject.shortName} timed mock`, description: `A timed practice section for ${subject.name}.` };
}

export default function MockPage({ params }: { params: { subject: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  return <MockSession subjectId={subject.id} variant="mock" />;
}
