import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WeaknessSession } from '@/components/practice/WeaknessSession';
import { subjectById, subjects } from '@/content/subjects';
import type { SubjectId } from '@/lib/types';

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) return { title: 'Subject not found' };
  return {
    title: `${subject.shortName} review & fix`,
    description: `Targeted practice for weaker topics in ${subject.name}.`,
  };
}

export default function FixPage({ params }: { params: { subject: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  return <WeaknessSession subjectId={subject.id} />;
}
