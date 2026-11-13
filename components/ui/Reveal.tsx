'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
}

/**
 * A quiet entrance. Content is never hidden permanently: if reduced motion
 * is on, it appears immediately. We animate on mount (not on scroll) so
 * statically exported pages and non-scrolling containers always reveal.
 */
export function Reveal({ children, delay = 0, className, y = 14 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
