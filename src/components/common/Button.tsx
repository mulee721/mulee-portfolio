import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'font-semibold transition-all duration-200 border hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'font-medium transition-all duration-200 hover:bg-white/5',
  outline:
    'font-medium transition-all duration-200 border-2 hover:-translate-y-0.5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-lg gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  as = 'button',
  href,
  target,
  rel,
  fullWidth = false,
  disabled,
  ...rest
}) => {
  const base = `inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${fullWidth ? 'w-full' : ''}`;

  const primaryStyle =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, var(--color-emerald), var(--color-teal))' }
      : {};

  const secondaryStyle =
    variant === 'secondary'
      ? {
          color: 'var(--color-text-primary)',
          borderColor: 'var(--color-border)',
          background: 'transparent',
        }
      : {};

  const computedStyle = { ...primaryStyle, ...secondaryStyle };

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {children}
    </>
  ) : (
    children
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={computedStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={classes}
      style={computedStyle}
      {...rest}
    >
      {content}
    </button>
  );
};
