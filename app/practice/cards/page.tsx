import type { Metadata } from 'next';
import { DueCards } from '@/components/practice/DueCards';

export const metadata: Metadata = {
  title: 'Due flashcards',
  description: 'Review the flashcards that are due today, using spaced repetition.',
};

export default function CardsPage() {
  return <DueCards />;
}
