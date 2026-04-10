/**
 * Reveal — scroll-triggered fade-in using Framer Motion whileInView.
 * Optimized: once=true, larger margin to trigger early, reduced offset.
 */
import { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
}

const makeVariants = (direction: RevealProps['direction'], duration: number): Variants => {
  const d = 20; // smaller offset = less layout work
  const from =
    direction === 'up'    ? { opacity: 0, y: d } :
    direction === 'left'  ? { opacity: 0, x: -d } :
    direction === 'right' ? { opacity: 0, x: d } :
                            { opacity: 0 };
  return {
    hidden:  from,
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
};

export const Reveal = memo(({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.55,
}: RevealProps) => (
  <motion.div
    className={className}
    variants={makeVariants(direction, duration)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}  // trigger 40px before visible
    transition={{ delay }}
  >
    {children}
  </motion.div>
));
Reveal.displayName = 'Reveal';

/** Stagger group */
export const RevealGroup = memo(({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{ visible: { transition: { staggerChildren: stagger } } }}
  >
    {children}
  </motion.div>
));
RevealGroup.displayName = 'RevealGroup';

export const RevealItem = memo(({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealProps['direction'];
}) => {
  const d = 18;
  const from =
    direction === 'up'    ? { opacity: 0, y: d } :
    direction === 'left'  ? { opacity: 0, x: -d } :
    direction === 'right' ? { opacity: 0, x: d } :
                            { opacity: 0 };
  return (
    <motion.div
      className={className}
      variants={{
        hidden:  from,
        visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
});
RevealItem.displayName = 'RevealItem';
