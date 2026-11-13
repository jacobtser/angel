import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopicLesson } from '@/components/subjects/TopicLesson';
import {
  findTopicBySlug,
  subjectById,
  subjects,
  topicSlug,
  topicsForSubject,
} from '@/content/subjects';
import type { SubjectId } from '@/lib/types';

export function generateStaticParams() {
  return subjects.flatMap((subject) =>
    topicsForSubject(subject.id).map((topic) => ({
      subject: subject.id,
      topic: topicSlug(topic.id),
    })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { subject: string; topic: string };
}): Metadata {
  const topic = findTopicBySlug(params.subject as SubjectId, params.topic);
  if (!topic) return { title: 'Topic not found' };
  return {
    title: topic.title,
    description: topic.summary,
  };
}

export default function TopicPage({ params }: { params: { subject: string; topic: string } }) {
  const subject = subjectById[params.subject as SubjectId];
  if (!subject) notFound();
  const topic = findTopicBySlug(subject.id, params.topic);
  if (!topic) notFound();
  return <TopicLesson topicId={topic.id} />;
}
