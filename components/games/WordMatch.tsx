'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { GameFinish, GameFrame } from './GameFrame';
import { english } from '@/content/english';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

interface Pair {
  id: number;
  word: string;
  meaning: string;
}

interface Tile {
  key: string;
  pairId: number;
  side: 'word' | 'meaning';
  text: string;
}

function buildTiles(): Tile[] {
  const cards = english.topics.find((topic) => topic.id === 'english:lexis')?.flashcards ?? [];
  const pairs: Pair[] = cards.slice(0, 6).map((card, index) => ({
    id: index,
    word: card.front,
    meaning: card.back,
  }));
  const words = pairs.map((pair) => ({ key: `w${pair.id}`, pairId: pair.id, side: 'word' as const, text: pair.word }));
  const meanings = pairs.map((pair) => ({ key: `m${pair.id}`, pairId: pair.id, side: 'meaning' as const, text: pair.meaning }));
  const order = [0, 7, 2, 9, 4, 11, 1, 6, 3, 8, 5, 10];
  const all = [...words, ...meanings];
  return order.map((index) => all[index]).filter(Boolean);
}

export function WordMatch() {
  const { state, recordGame } = useAppStore();
  const [tiles] = useState<Tile[]>(buildTiles);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const recorded = useRef(false);
  const best = state.games['word-match']?.score ?? 0;

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  function finish(finalScore: number) {
    if (recorded.current) return;
    recorded.current = true;
    setScore(finalScore);
    setFinished(true);
    recordGame('word-match', finalScore);
  }

  function clickTile(tile: Tile) {
    if (finished || open.length >= 2 || matched.includes(tile.pairId) || open.includes(tile.key)) return;
    const nextOpen = [...open, tile.key];
    setOpen(nextOpen);

    if (nextOpen.length === 2) {
      const first = tiles.find((item) => item.key === nextOpen[0]);
      const second = tiles.find((item) => item.key === nextOpen[1]);
      if (first && second && first.pairId === second.pairId) {
        const nextMatched = [...matched, tile.pairId];
        window.setTimeout(() => {
          setMatched(nextMatched);
          setOpen([]);
          if (nextMatched.length === 6) {
            finish(Math.max(20, 1000 - seconds * 5 - mistakes * 20));
          }
        }, 380);
      } else {
        setMistakes((value) => value + 1);
        window.setTimeout(() => setOpen([]), 850);
      }
    }
  }

  function restart() {
    setOpen([]);
    setMatched([]);
    setMistakes(0);
    setSeconds(0);
    setFinished(false);
    setScore(0);
    recorded.current = false;
  }

  return (
    <GameFrame slug="word-match">
      {finished ? (
        <GameFinish
          score={score}
          best={best}
          label="points"
          headline={score >= 760 ? 'Your memory showed up' : 'A good first circuit'}
          body="Every pair you matched is a word ready to be recognised in Paper 1. Play again later — the same words will feel faster."
          onRestart={restart}
          celebrate={score > best}
        />
      ) : (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="chip chip-rose">
                <Icon name="layers" size={12} />
                {matched.length}/6 pairs
              </span>
              <span className="chip">
                <Icon name="x" size={12} />
                {mistakes} misses
              </span>
            </div>
            <span className="chip tabular">
              <Icon name="timer" size={12} />
              {seconds}s
            </span>
          </div>

          <p className="mb-4 text-[0.8rem] text-muted">
            Tap a card, then tap the meaning that belongs with it. Matched pairs stay face up.
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {tiles.map((tile) => {
              const isMatched = matched.includes(tile.pairId);
              const isOpen = open.includes(tile.key);
              const showText = isMatched || isOpen;
              return (
                <button
                  key={tile.key}
                  type="button"
                  onClick={() => clickTile(tile)}
                  disabled={isMatched || open.length >= 2}
                  aria-label={showText ? tile.text : 'Hidden card'}
                  className={cn(
                    'min-h-[7rem] rounded-2xl border p-3 text-left transition-all duration-200',
                    'border-line bg-elev hover:-translate-y-0.5 hover:border-rose',
                    isOpen && !isMatched && 'border-rose bg-[var(--rose-soft)]',
                    isMatched && 'border-leaf bg-[var(--leaf-soft)]',
                    !showText && 'grid place-items-center bg-[var(--bg-sunk)]',
                  )}
                >
                  {showText ? (
                    <span className="block">
                      <span className="block text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted">
                        {tile.side}
                      </span>
                      <span
                        className={cn(
                          'mt-1 block leading-snug',
                          tile.side === 'word' ? 'font-display text-[1.02rem] font-semibold' : 'text-[0.76rem] text-soft',
                        )}
                      >
                        {tile.text}
                      </span>
                    </span>
                  ) : (
                    <span className="font-display text-2xl text-muted" aria-hidden="true">
                      ?
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-center text-[0.7rem] text-muted">
            Accuracy first. The timer affects your points, not your worth.
          </p>
        </div>
      )}
    </GameFrame>
  );
}
