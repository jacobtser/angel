'use client';

import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const COLORS = ['#1f6b56', '#b97a24', '#a84a45', '#2f6f8f', '#6a4b7c', '#e6b15e', '#7ccdaf'];

/**
 * A small, non-blocking celebration. It never covers a button for long and
 * disappears entirely for reduced-motion users.
 */
export function Confetti({ pieces = 34 }: { pieces?: number }) {
  const reduce = useReducedMotion();
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.2 + Math.random() * 1.6,
        size: 5 + Math.random() * 7,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        radius: Math.random() > 0.5 ? '50%' : '2px',
      })),
    [pieces],
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden" aria-hidden="true">
      {bits.map((bit, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: `${bit.left}%`,
            width: bit.size,
            height: bit.size * 1.6,
            background: bit.color,
            borderRadius: bit.radius,
            transform: `rotate(${bit.rotate}deg)`,
            animation: `confetti-fall ${bit.duration}s cubic-bezier(.2,.6,.4,1) ${bit.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
