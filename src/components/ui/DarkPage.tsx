/**
 * DarkPage — shared wrapper for all content pages.
 * Provides consistent dark background, page header, and content container.
 */
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DarkPageProps {
  title: string;
  subtitle?: string;
  label?: string;
  children: ReactNode;
  maxWidth?: string;
}

export const DarkPage = ({
  title,
  subtitle,
  label,
  children,
  maxWidth = 'max-w-4xl',
}: DarkPageProps) => (
  <div className="min-h-screen bg-[#0a0a0a]">
    {/* Header */}
    <div className="border-b border-white/[0.06] py-20">
      <div className="container">
        {label && (
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-5 h-px bg-white/30" aria-hidden="true" />
            <span className="text-white/30 text-[11px] tracking-[0.25em] uppercase">{label}</span>
          </motion.div>
        )}
        <motion.h1
          className="text-white leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-white/35 text-sm mt-4 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>

    {/* Content */}
    <div className={`container ${maxWidth} mx-auto py-16 space-y-16`}>
      {children}
    </div>
  </div>
);

/** Dark card block */
export const DarkCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`border border-white/[0.06] p-6 bg-[#0d0d0d] ${className}`}>
    {children}
  </div>
);

/** Section heading */
export const DarkSection = ({ title, id, children }: { title: string; id?: string; children: ReactNode }) => (
  <section aria-labelledby={id}>
    <h2
      id={id}
      className="text-white mb-6 leading-tight"
      style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
    >
      {title}
    </h2>
    {children}
  </section>
);
