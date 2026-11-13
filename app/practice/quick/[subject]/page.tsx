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
  return { title: `${subject.shortName} quick practice`, description: `Ten untimed questions for ${subject.name}.` };
}

export default function QuickPracticePage({ params }: { params: { subject: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  return <MockSession subjectId={subject.id} variant="quick" />;
}
