import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// ── Service definitions ─────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'fullstack',
    titleKey: 'service_fullstack_title',
    descKey:  'service_fullstack_desc',
    resultKey: 'service_fullstack_result',
    techs: ['React', 'TypeScript', 'Node.js', 'NestJS', 'MongoDB'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <polygon points="12 2 22 8.5 12 15 2 8.5 12 2"/>
        <polyline points="2 15.5 12 22 22 15.5"/>
        <polyline points="2 12 12 18.5 22 12"/>
      </svg>
    ),
  },
  {
    id: 'frontend',
    titleKey: 'service_frontend_title',
    descKey:  'service_frontend_desc',
    resultKey: 'service_frontend_result',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10c0 1.1-.9 2-2 2h-1.5c-.8 0-1.5.7-1.5 1.5 0 .4.2.8.4 1.1.2.3.4.7.4 1.1C17.8 21 15.1 22 12 22z"/>
        <circle cx="7" cy="12" r="1" fill="currentColor"/>
        <circle cx="10" cy="8" r="1" fill="currentColor"/>
        <circle cx="14" cy="8" r="1" fill="currentColor"/>
        <circle cx="17" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'backend',
    titleKey: 'service_backend_title',
    descKey:  'service_backend_desc',
    resultKey: 'service_backend_result',
    techs: ['Node.js', 'Express.js', 'NestJS', 'REST APIs'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="5" rx="1"/>
        <rect x="2" y="11" width="20" height="5" rx="1"/>
        <rect x="2" y="19" width="20" height="2" rx="1"/>
        <line x1="6" y1="5.5" x2="6.01" y2="5.5"/>
        <line x1="6" y1="13.5" x2="6.01" y2="13.5"/>
        <line x1="10" y1="5.5" x2="10.01" y2="5.5"/>
        <line x1="10" y1="13.5" x2="10.01" y2="13.5"/>
      </svg>
    ),
  },
  {
    id: 'database',
    titleKey: 'service_database_title',
    descKey:  'service_database_desc',
    resultKey: 'service_database_result',
    techs: ['MongoDB', 'MySQL', 'PostgreSQL'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        <line x1="8" y1="8.5" x2="16" y2="8.5"/>
        <line x1="9" y1="15.5" x2="15" y2="15.5"/>
      </svg>
    ),
  },
  {
    id: 'responsive',
    titleKey: 'service_responsive_title',
    descKey:  'service_responsive_desc',
    resultKey: 'service_responsive_result',
    techs: ['CSS3', 'Tailwind CSS', 'React', 'Mobile-First'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <rect x="1" y="4" width="14" height="11" rx="1"/>
        <line x1="1" y1="12" x2="15" y2="12"/>
        <rect x="16" y="8" width="7" height="10" rx="1"/>
        <line x1="19" y1="17" x2="19.01" y2="17"/>
        <line x1="4" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'improvement',
    titleKey: 'service_improvement_title',
    descKey:  'service_improvement_desc',
    resultKey: 'service_improvement_result',
    techs: ['Performance', 'Refactoring', 'UX', 'Optimization'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 7.38 16.75"/>
        <path d="M4.62 18.75A10 10 0 0 1 12 2"/>
        <path d="M12 12 8.5 6"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <line x1="5" y1="12" x2="7" y2="12"/>
        <line x1="17" y1="12" x2="19" y2="12"/>
        <line x1="12" y1="5" x2="12" y2="7"/>
      </svg>
    ),
  },
] as const;

// ── Service Card Component ───────────────────────────────────────────────────
const ServiceCard: React.FC<{
  service: typeof SERVICES[number];
  index: number;
}> = ({ service, index }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 sm:p-8 rounded-2xl border-2 flex flex-col h-full transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: hovered ? 'var(--color-teal)' : 'var(--color-border)',
        boxShadow: hovered
          ? '0 20px 50px rgba(0, 200, 250, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: visible
          ? hovered ? 'translateY(-8px)' : 'translateY(0)'
          : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.34, 1.1, 0.64, 1) ${index * 100}ms`,
      }}
    >
      {/* Icon Box */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, var(--color-emerald), var(--color-teal))'
            : 'rgba(0, 200, 250, 0.08)',
          color: hovered ? '#0A0A14' : 'var(--color-teal)',
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-semibold mb-2 leading-snug transition-all duration-300"
        style={{
          color: hovered
            ? 'var(--color-text-primary)'
            : 'var(--color-text-primary)',
          background: hovered
            ? 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))'
            : 'none',
          WebkitBackgroundClip: hovered ? 'text' : undefined,
          WebkitTextFillColor: hovered ? 'transparent' : undefined,
          backgroundClip: hovered ? 'text' : undefined,
        }}
      >
        {t[service.titleKey as keyof typeof t] as string}
      </h3>

      {/* Result Line */}
      <p
        className="text-sm font-semibold mb-3 transition-all duration-300"
        style={{
          color: 'var(--color-teal)',
          opacity: hovered ? 1 : 0.8,
        }}
      >
        {t[service.resultKey as keyof typeof t] as string}
      </p>

      {/* Description */}
      <p
        className="text-sm sm:text-base leading-relaxed mb-6 flex-1"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {t[service.descKey as keyof typeof t] as string}
      </p>

      {/* Tech Tags – Pill Style */}
      <div className="flex flex-wrap gap-2">
        {service.techs.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              backgroundColor: hovered ? 'rgba(0, 200, 250, 0.12)' : 'rgba(0, 200, 250, 0.06)',
              color: '#22D3EE',
              border: '1px solid rgba(0, 200, 250, 0.3)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────
export const Services: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 pb-8"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="mb-16 text-center"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.6s ease-out 0.1s forwards',
          }}
        >
          {/* Label */}
          <p
            className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-emerald)' }}
          >
            {t.services_section_label}
          </p>

          {/* Main Title with Gradient */}
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{
              background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.services_section_title}
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t.services_section_subtitle}
          </p>

          {/* Gradient Underline */}
          <div
            className="h-1 w-20 rounded-full mx-auto"
            style={{
              background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))',
            }}
          />
        </div>

        {/* Service Grid – 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 auto-rows-fr">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToContact}
            className="px-5 sm:px-7 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base"
            style={{
              background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))',
              boxShadow: '0 6px 25px rgba(0, 200, 250, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 35px rgba(0, 200, 250, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 25px rgba(0, 200, 250, 0.3)';
            }}
          >
            {t.services_cta_button}
          </button>
        </div>
      </div>
    </section>
  );
};
