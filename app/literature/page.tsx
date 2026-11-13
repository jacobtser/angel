import type { Metadata } from 'next';
import { LiteratureBrowser } from '@/components/literature/LiteratureBrowser';

export const metadata: Metadata = {
  title: 'Literature',
  description:
    'Study companions for Ghana English literature texts included in this app: summaries, themes, characters, quotations and essay plans. Always confirm the current set texts for your exam year.',
};

export default function LiteraturePage() {
  return <LiteratureBrowser />;
}
