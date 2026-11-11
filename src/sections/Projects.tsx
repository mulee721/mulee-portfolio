import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import type { ProjectCategory } from '../types';

type FilterCategory = 'All' | ProjectCategory;

const FILTER_CATEGORIES: FilterCategory[] = [
  'All',
  'Full-Stack',
  'PHP/MySQL',
  'AI/NLP Research',
];

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            title={t.projects_section_title}
            subtitle={t.projects_section_subtitle}
          />
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--color-emerald)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text-secondary)',
                    borderColor: isActive ? 'var(--color-emerald)' : 'var(--color-border)',
                  }}
                >
                  {cat === 'All' ? t.projects_category_all : cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 80}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
