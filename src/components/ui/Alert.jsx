import { motion } from 'framer-motion';

export const Alert = ({
  children,
  variant = 'info',
  title,
  onClose,
  className = '',
}) => {
  const variants = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: '✕',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: '⚠',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: 'ℹ',
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${v.bg} ${v.border} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex gap-3">
        <span className={`flex-shrink-0 font-bold ${v.text}`}>{v.icon}</span>
        <div className="flex-1">
          {title && <h3 className={`font-semibold ${v.text} mb-1`}>{title}</h3>}
          <div className={v.text}>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${v.text} hover:opacity-70 transition-opacity`}
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};
