import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubjectHub } from '@/components/subjects/SubjectHub';
import { subjectById, subjects } from '@/content/subjects';
import type { SubjectId } from '@/lib/types';

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) return { title: 'Subject not found' };
  return {
    title: subject.name,
    description: subject.description,
  };
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  return <SubjectHub subjectId={subject.id} />;
}
