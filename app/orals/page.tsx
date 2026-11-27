import { Suspense } from 'react';
import type { Metadata } from 'next';
import { OralTrainer } from '@/components/orals/OralTrainer';
import { OralVideoLibrary } from '@/components/orals/OralVideoLibrary';

export const metadata: Metadata = {
  title: 'Oral English',
  description:
    'Practise vowel contrasts, consonants, word stress and intonation for the WASSCE English oral component, and watch WASSCE oral exam videos.',
};

export default function OralsPage() {
  return (
    <div className="space-y-5">
      <Suspense fallback={<div className="surface p-6 text-sm text-muted">Loading oral videos…</div>}>
        <OralVideoLibrary />
      </Suspense>
      <OralTrainer />
    </div>
  );
}
