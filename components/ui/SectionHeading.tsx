import Link from 'next/link';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Tag className={Tag === 'h1' ? 'display-lg' : 'display-md'}>{title}</Tag>
        {description && <p className="prose-angel mt-2 max-w-xl text-[0.95rem]">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-leaf hover:underline"
        >
          {action.label}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
