import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  animated = true,
  ...props
}) => {
  const Component = animated ? motion.div : 'div';
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  } : {};

  return (
    <Component
      className={`bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 ${
        hover ? 'hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300' : ''
      } ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};
