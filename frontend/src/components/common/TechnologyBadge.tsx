import React from 'react';

interface TechnologyBadgeProps {
  name: string;
  className?: string;
  variant?: 'default' | 'outlined' | 'emerald';
}

export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
  name,
  className = '',
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    outlined: 'border text-sm font-medium',
    emerald: 'bg-emerald-500 text-white',
  };

  const outlinedStyle =
    variant === 'outlined'
      ? {
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-bg-elevated)',
        }
      : {};

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${variants[variant]} ${className}`}
      style={outlinedStyle}
    >
      {name}
    </span>
  );
};
