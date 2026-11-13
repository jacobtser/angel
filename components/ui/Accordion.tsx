'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  tone?: 'default' | 'ai';
}

export function AccordionItem({
  title,
  children,
  icon,
  defaultOpen = false,
  tone = 'default',
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border',
        tone === 'ai' ? 'border-plum/25 bg-[var(--plum-soft)]' : 'border-line bg-elev',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
      >
        {icon && <span className={tone === 'ai' ? 'text-plum' : 'text-leaf'}>{icon}</span>}
        <span className="flex-1 text-[0.93rem] font-semibold text-ink">{title}</span>
        <Icon
          name="chevron-down"
          size={17}
          className={cn(
            'shrink-0 text-muted transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-4 text-[0.92rem] leading-relaxed text-soft sm:px-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DeeperDive({ notes }: { notes: { title: string; body: string }[] }) {
  if (!notes.length) return null;
  return (
    <div className="space-y-2.5">
      {notes.map((note) => (
        <AccordionItem key={note.title} title={note.title} tone="ai" icon={<Icon name="spark" size={17} />}>
          <p>{note.body}</p>
        </AccordionItem>
      ))}
    </div>
  );
}
