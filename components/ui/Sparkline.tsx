'use client';

import { useId } from 'react';

interface SparklineProps {
  values: number[];
  labels?: string[];
  height?: number;
  color?: string;
  label: string;
}

/** Seven-day study rhythm, drawn as a quiet area chart. */
export function Sparkline({ values, labels, height = 56, color = 'var(--leaf)', label }: SparklineProps) {
  const gradientId = useId().replace(/:/g, '');
  const width = 220;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const points = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 8) - 4;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${label}: ${values.join(', ')} minutes across ${values.length} days`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 3.2 : 2} fill={color} />
        ))}
      </svg>
      {labels && (
        <div className="mt-1.5 flex justify-between text-[0.62rem] font-semibold uppercase tracking-wide text-muted">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}
