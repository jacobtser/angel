import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LiteratureDetail } from '@/components/literature/LiteratureDetail';
import { findLiterature, allLiterature } from '@/content/subjects';

export function generateStaticParams() {
  return allLiterature.map((text) => ({ id: text.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const text = findLiterature(params.id);
  if (!text) return { title: 'Text not found' };
  return {
    title: `${text.title} — ${text.author}`,
    description: text.blurb,
  };
}

export default function LiteratureTextPage({ params }: { params: { id: string } }) {
  const text = findLiterature(params.id);
  if (!text) notFound();
  return <LiteratureDetail id={text.id} />;
}
