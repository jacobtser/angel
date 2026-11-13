import Link from 'next/link';
import { Icon, type IconName } from './Icon';

export function EmptyState({
  icon = 'seed',
  title,
  body,
  action,
}: {
  icon?: IconName;
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="surface flex flex-col items-center px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--leaf-soft)] text-leaf">
        <Icon name={icon} size={26} />
      </span>
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
      {action && (
        <Link href={action.href} className="btn btn-primary mt-5">
          {action.label}
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </div>
  );
}
