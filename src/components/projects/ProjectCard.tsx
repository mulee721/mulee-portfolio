import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { TechnologyBadge } from '../common/TechnologyBadge';
import { ImageViewer } from '../common/ImageViewer';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  completed: {
    bg: 'rgba(16, 185, 129, 0.1)',
    text: '#10B981',
    label: 'projects_status_completed',
  },
  'in-progress': {
    bg: 'rgba(245, 158, 11, 0.1)',
    text: '#F59E0B',
    label: 'projects_status_in_progress',
  },
  research: {
    bg: 'rgba(139, 92, 246, 0.1)',
    text: '#8B5CF6',
    label: 'projects_status_research',
  },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.completed;

  return (
    <article
      className="rounded-2xl border overflow-hidden transition-all duration-300 group flex flex-col h-full"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(16,185,129,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Screenshot */}
      <div
        className="relative overflow-hidden h-48 flex-shrink-0 cursor-pointer"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
        onClick={() => setIsImageViewerOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsImageViewerOpen(true);
          }
        }}
        aria-label="Click to view full size image"
      >
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.style.display = 'flex';
              parent.style.alignItems = 'center';
              parent.style.justifyContent = 'center';
              const placeholder = document.createElement('div');
              placeholder.style.cssText =
                'text-align:center;padding:1.5rem;';
              placeholder.innerHTML = `
                <div style="font-size:2.5rem;margin-bottom:0.5rem;">💻</div>
                <div style="font-size:0.875rem;color:var(--color-text-secondary);font-weight:500;">${project.title}</div>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(7, 17, 27, 0.85)',
              color: 'var(--color-teal)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: statusStyle.bg,
              color: statusStyle.text,
              backdropFilter: 'blur(4px)',
            }}
          >
            {t[statusStyle.label as keyof typeof t] as string}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-base mb-2 leading-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechnologyBadge key={tech} name={tech} />
          ))}
          {project.technologies.length > 4 && (
            <span
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-bg-elevated)' }}
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Live Demo — shows full size image */}
          <button
            onClick={() => setIsImageViewerOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))' }}
            aria-label="View demo image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {t.projects_live_demo}
          </button>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))' }}
              aria-label={`${project.title} source code on GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.448-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
          ) : null}
        </div>
      </div>

      {/* Image Viewer Modal */}
      <ImageViewer
        isOpen={isImageViewerOpen}
        imageSrc={project.screenshot}
        imageAlt={`${project.title} screenshot`}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </article>
  );
};
