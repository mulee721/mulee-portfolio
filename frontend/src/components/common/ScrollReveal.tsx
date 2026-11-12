import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const directionStyles: Record<string, React.CSSProperties> = {
    up: { transform: isVisible ? 'translateY(0)' : 'translateY(28px)' },
    left: { transform: isVisible ? 'translateX(0)' : 'translateX(-28px)' },
    right: { transform: isVisible ? 'translateX(0)' : 'translateX(28px)' },
    none: {},
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        ...directionStyles[direction],
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
