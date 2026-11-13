import type { Metadata } from 'next';
import { PapersBrowser } from '@/components/papers/PapersBrowser';

export const metadata: Metadata = {
  title: 'Past papers',
  description:
    'WASSCE past questions recovered from the source PDFs, with worked answers, source notes and honest flags for damaged scans.',
};

export default function PapersPage() {
  return <PapersBrowser />;
}
