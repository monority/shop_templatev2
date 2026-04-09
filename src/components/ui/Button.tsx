import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'black';
type ButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:     'btn btn-primary',
  secondary:   'btn btn-secondary',
  outline:     'btn btn-outline',
  ghost:       'btn btn-ghost',
  destructive: 'btn btn-destructive',
  black:       'btn btn-primary',
};

const SIZES: Record<ButtonSize, string> = {
  sm:      'btn-sm',
  default: '',
  lg:      'btn-lg',
  xl:      'btn-xl',
  icon:    'btn-icon',
};

/**
 * Bouton réutilisable avec variantes, tailles, état loading et icônes.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant   = 'primary',
  size      = 'default',
  className = '',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      className={`btn ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? ''} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="30" />
        </svg>
      ) : (
        <>
          {leftIcon  && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;
