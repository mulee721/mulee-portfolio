import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { experiences } from '../data/experience';
import type { ExperienceType } from '../types';

// ── Type Styles ──────────────────────────────────────────────────────────────
const TYPE_STYLES: Record<ExperienceType, { color: string; accentBg: string; labelKey: string }> = {
  education: { color: 'var(--color-emerald)', accentBg: '#7F81FF', labelKey: 'experience_education' },
  internship: { color: 'var(--color-teal)', accentBg: '#00C8FA', labelKey: 'experience_internship' },
  research: { color: '#F472B6', accentBg: '#F472B6', labelKey: 'experience_research' },
};

// ── Experience Item Component ────────────────────────────────────────────────
interface ExperienceItemProps {
  exp: (typeof experiences)[0];
  index: number;
  isOngoing: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp, index, isOngoing }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const typeStyle = TYPE_STYLES[exp.type];
  const INITIAL_BULLETS = 3;
  const hasMoreBullets = exp.highlights.length > INITIAL_BULLETS;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="p-5 sm:p-6 rounded-2xl border-2 border-l-4 bg-gradient-to-br h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{
          borderColor: 'var(--color-border)',
          borderLeftColor: typeStyle.accentBg,
          backgroundColor: 'var(--color-bg-card)',
          backgroundImage: `linear-gradient(135deg, var(--color-bg-card) 0%, rgba(${
            typeStyle.accentBg === '#7F81FF' ? '127,129,255' : typeStyle.accentBg === '#00C8FA' ? '0,200,250' : '244,114,182'
          }, 0.03) 100%)`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = typeStyle.color;
          el.style.boxShadow = `0 12px 30px ${typeStyle.accentBg}22`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'var(--color-border)';
          el.style.boxShadow = 'none';
        }}
      >
        {isOngoing && (
          <div className="mb-2 flex items-center gap-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: `${typeStyle.accentBg}22`, color: typeStyle.accentBg }}
            >
              {t.experience_ongoing}
            </span>
          </div>
        )}
        
        <div className="mb-2">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
            style={{ backgroundColor: `${typeStyle.accentBg}18`, color: typeStyle.accentBg }}
          >
            {t[typeStyle.labelKey as keyof typeof t] as string}
          </span>
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
          {exp.role}
        </h3>
        
        <p className="font-medium mb-2 text-sm" style={{ color: typeStyle.color }}>
          {exp.institution}
        </p>
        
        <div className="flex flex-col gap-1 mb-3">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit"
            style={{ backgroundColor: 'rgba(0, 200, 250, 0.08)', color: '#22D3EE', border: '1px solid rgba(0, 200, 250, 0.2)' }}
          >
            📅 {exp.period}
          </div>
          {exp.location && (
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              📍 {exp.location}
            </p>
          )}
        </div>
        
        <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          {exp.description}
        </p>
        
        <ul className="space-y-1.5 mb-4 flex-1">
          {exp.highlights
            .slice(0, expanded ? undefined : INITIAL_BULLETS)
            .map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <span
                  className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: typeStyle.accentBg }}
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
        </ul>
        
        {hasMoreBullets && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold mb-3 transition-colors duration-200"
            style={{ color: typeStyle.accentBg }}
          >
            {expanded ? t.experience_show_less : t.experience_show_more}
          </button>
        )}
        
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(0, 200, 250, 0.08)', color: '#22D3EE', border: '1px solid rgba(0, 200, 250, 0.2)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────
export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="mb-10 text-center"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.6s ease-out 0.1s forwards',
          }}
        >
          {/* Label */}
          <p
            className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-emerald)' }}
          >
            {t.experience_section_label}
          </p>

          {/* Title */}
          <h2
            id="experience-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight"
          >
            <span
              style={{
                background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Experience & Education
            </span>
          </h2>
        </div>

        {/* Grid: 2 per row on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {experiences.map((exp, idx) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={idx}
              isOngoing={exp.period.toLowerCase().includes('present') || exp.period === '2026'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
