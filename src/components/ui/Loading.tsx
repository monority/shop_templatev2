import { motion } from 'framer-motion';

type LoadingSize = 'sm' | 'md' | 'lg';

interface LoadingProps {
  size?: LoadingSize;
  fullScreen?: boolean;
}

export const Loading = ({ size = 'md', fullScreen = false }: LoadingProps) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const Spinner = (
    <motion.div
      className={`${sizes[size]} border-4 border-slate-200 dark:border-slate-700 border-t-brand rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50">
        {Spinner}
      </div>
    );
  }

  return Spinner;
};
