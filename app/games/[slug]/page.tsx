import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { gameBySlug, games } from '@/content/games';
import { WordMatch } from '@/components/games/WordMatch';
import { ComprehensionDash } from '@/components/games/ComprehensionDash';
import { NumberQuest } from '@/components/games/NumberQuest';
import { BudgetBalance } from '@/components/games/BudgetBalance';
import { FlashcardDuel } from '@/components/games/FlashcardDuel';

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = gameBySlug(params.slug);
  if (!game) return { title: 'Game not found' };
  return {
    title: game.name,
    description: game.description,
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = gameBySlug(params.slug);
  if (!game) notFound();

  switch (game.slug) {
    case 'word-match':
      return <WordMatch />;
    case 'comprehension-dash':
      return <ComprehensionDash />;
    case 'number-quest':
      return <NumberQuest />;
    case 'budget-balance':
      return <BudgetBalance />;
    case 'flashcard-duel':
      return <FlashcardDuel />;
  }
}
