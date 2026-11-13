import { cn } from '@/lib/cn';

interface ProgressRingProps {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  label: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * A progress ring with the number in the middle. The SVG is decorative;
 * the accessible name carries the meaning.
 */
export function ProgressRing({
  value,
  size = 96,
  stroke = 7,
  color = 'var(--leaf)',
  track = 'var(--line)',
  label,
  children,
  className,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn('relative inline-grid place-items-center', className)}
      role="img"
      aria-label={`${label}: ${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {children ?? (
          <span className="tabular font-display text-xl font-semibold text-ink">{clamped}%</span>
        )}
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  color = 'var(--leaf)',
  label,
  className,
  height = 8,
}: {
  value: number;
  color?: string;
  label?: string;
  className?: string;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-[var(--bg-sunk)]', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-gentle"
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  );
}
