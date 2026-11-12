import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--color-emerald)' }}
        >
          {subtitle}
        </p>
      )}
      <h2
        className="text-3xl sm:text-4xl font-bold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h2>
      {centered && (
        <div className="mt-4 mx-auto h-1 w-16 rounded-full" style={{ background: 'linear-gradient(135deg, var(--color-emerald), var(--color-teal))' }} />
      )}
    </div>
  );
};
