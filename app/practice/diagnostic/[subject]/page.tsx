import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DiagnosticSession } from '@/components/practice/DiagnosticSession';
import { subjectById, subjects } from '@/content/subjects';
import type { SubjectId } from '@/lib/types';

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) return { title: 'Subject not found' };
  return {
    title: `${subject.shortName} diagnostic`,
    description: `A short diagnostic to find your starting point in ${subject.name}.`,
  };
}

export default function DiagnosticPage({ params }: { params: { subject: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  return <DiagnosticSession subjectId={subject.id} />;
}
