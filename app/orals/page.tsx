import type { Metadata } from 'next';
import { OralTrainer } from '@/components/orals/OralTrainer';

export const metadata: Metadata = {
  title: 'Oral English',
  description:
    'Practise vowel contrasts, consonants, word stress and intonation for the WASSCE English oral component.',
};

export default function OralsPage() {
  return <OralTrainer />;
}
