import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PaperViewer } from '@/components/papers/PaperViewer';
import { pastPapers } from '@/content/subjects';

export function generateStaticParams() {
  return pastPapers.map((paper) => ({ id: paper.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const paper = pastPapers.find((item) => item.id === params.id);
  if (!paper) return { title: 'Paper not found' };
  return {
    title: paper.label,
    description: paper.note,
  };
}

export default function PaperPage({ params }: { params: { id: string } }) {
  const paper = pastPapers.find((item) => item.id === params.id);
  if (!paper) notFound();
  return <PaperViewer paperId={paper.id} />;
}
