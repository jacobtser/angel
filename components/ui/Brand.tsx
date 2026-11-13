import Link from 'next/link';

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/angel-logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="shrink-0 rounded-[28%] object-cover ring-1 ring-[rgba(0,0,0,0.06)]"
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-2xl focus-visible:outline-offset-4"
      aria-label="Auntie Angel — go to today"
    >
      <BrandMark size={compact ? 32 : 38} />
      <span className="leading-none">
        <span className="block font-display text-[1.28rem] font-semibold tracking-[-0.03em] text-ink">
          Auntie Angel
        </span>
        {!compact && (
          <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Your study companion
          </span>
        )}
      </span>
    </Link>
  );
}
