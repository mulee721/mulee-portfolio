import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';


export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            title={t.about_section_title}
            subtitle={t.about_section_subtitle}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text content */}
          <div className="space-y-5">
            <ScrollReveal delay={100}>
              <p
                className="text-lg font-medium leading-relaxed"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {t.about_intro}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t.about_paragraph_1}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t.about_paragraph_2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t.about_paragraph_3}
              </p>
            </ScrollReveal>

            {/* Interests */}
            <ScrollReveal delay={500}>
              <div className="pt-2">
                <h3
                  className="text-sm font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-emerald)' }}
                >
                
                </h3>
                <div className="flex flex-wrap gap-2">
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            <ScrollReveal delay={150} direction="right">
              {/* Education card */}
              <div
                className="p-6 rounded-2xl border transition-all duration-300 group hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/images/JU.jpg"
                    alt="Jimma University logo"
                    className="w-12 h-12 rounded-xl flex-shrink-0 object-cover transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      boxShadow: 'var(--color-emerald-muted)',
                    }}
                  />
                  <div>
                    <h3
                      className="font-bold text-base"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {t.about_university}
                    </h3>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: 'var(--color-emerald)' }}
                    >
                      {t.about_degree}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {t.about_year}
                    </p>
                    <p
                      className="text-xs mt-1 flex items-center gap-1"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t.about_location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250} direction="right">
              {/* Internship card */}
              <div
                className="p-6 rounded-2xl border transition-all duration-300 group hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/20"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/images/AI.png"
                    alt="Ethiopian Artificial Intelligence Institute logo"
                    className="w-12 h-12 rounded-xl flex-shrink-0 object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                  <div>
                    <h3
                      className="font-bold text-base"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Ethiopian Artificial Intelligence Institute
                    </h3>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      AI Research Intern
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      July 10, 2026 – September 15, 2026
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
                    >
                      Amharic → Afaan Oromo NMT Research
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350} direction="right">
              {/* Focus card */}
              <div
                className="p-6 rounded-2xl border transition-all duration-300 group hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/images/logo.jpg"
                    alt="Full-Stack Web Development logo"
                    className="w-12 h-12 rounded-xl flex-shrink-0 object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <div>
                    <h3
                      className="font-bold text-base"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {t.about_focus}
                    </h3>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      React · Node.js · NestJS · TypeScript
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
