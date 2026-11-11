import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { TechnologyBadge } from '../components/common/TechnologyBadge';
import { projects, getProjectBySlug } from '../data/projects';

/* ── Gallery modal ────────────────────────────────────────────────────── */
const GalleryModal: React.FC<{
  images: { src: string; caption: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
          aria-label={t.close}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={img.src} alt={img.alt} className="w-full max-h-[75vh] object-contain rounded-xl" />
        <div className="flex items-center justify-between mt-4">
          <button onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)} className="px-4 py-2 text-sm text-white/70 hover:text-white" aria-label={t.previous}>← {t.previous}</button>
          <p className="text-white/60 text-sm text-center">{img.caption} · {t.image_of.replace('{current}', String(current + 1)).replace('{total}', String(images.length))}</p>
          <button onClick={() => setCurrent((c) => (c + 1) % images.length)} className="px-4 py-2 text-sm text-white/70 hover:text-white" aria-label={t.next}>{t.next} →</button>
        </div>
      </div>
    </div>
  );
};

/* ── Main page ────────────────────────────────────────────────────────── */
export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Mulee Portfolio`;
    return () => { document.title = 'Mulee | Full-Stack Web Developer'; };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="text-center">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text-secondary)' }}>Project not found.</p>
          <Link to="/" className="text-sm font-medium" style={{ color: 'var(--color-emerald)' }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);
  const openGallery = (idx: number) => { setGalleryIndex(idx); setGalleryOpen(true); };

  return (
    <>
      {galleryOpen && project.gallery.length > 0 && (
        <GalleryModal images={project.gallery} startIndex={galleryIndex} onClose={() => setGalleryOpen(false)} />
      )}

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        {/* Hero banner */}
        <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-emerald) 1px,transparent 1px),linear-gradient(90deg,var(--color-emerald) 1px,transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
          <div className="max-w-5xl mx-auto">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-emerald)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              {t.project_back}
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-emerald)' }}>{project.category}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(16,185,129,0.05)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{t[`projects_status_${project.status}` as keyof typeof t] as string}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>{project.title}</h1>
            <p className="text-lg max-w-3xl leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>{project.shortDescription}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => <TechnologyBadge key={tech} name={tech} />)}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-200" style={{ background: 'linear-gradient(135deg,var(--color-emerald),var(--color-teal))' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.448-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  {t.project_view_github}
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border hover:-translate-y-0.5 transition-all duration-200" style={{ color: 'var(--color-teal)', borderColor: 'rgba(45,212,191,0.4)', backgroundColor: 'rgba(45,212,191,0.06)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {t.project_view_demo}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Main screenshot */}
          {project.screenshot && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_overview}</h2>
              <div className="rounded-2xl overflow-hidden border cursor-pointer" style={{ borderColor: 'var(--color-border)' }} onClick={() => project.gallery.length > 0 && openGallery(0)}>
                <img src={project.screenshot} alt={`${project.title} screenshot`} className="w-full object-cover max-h-96" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </section>
          )}

          {/* Problem & Solution */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>!</span>
                  {t.project_problem}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{project.problem}</p>
              </div>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'rgba(16,185,129,0.2)' }}>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: 'var(--color-emerald)' }}>✓</span>
                  {t.project_solution}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{project.solution}</p>
              </div>
            </div>
          </section>

          {/* Target users */}
          {project.targetUsers.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t.project_target_users}</h2>
              <div className="flex flex-wrap gap-3">
                {project.targetUsers.map((u) => (
                  <span key={u} className="px-4 py-2 rounded-xl text-sm font-medium border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>{u}</span>
                ))}
              </div>
            </section>
          )}

          {/* Features */}
          {project.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_features}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((f, i) => (
                  <div key={i} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                    <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center font-bold text-sm" style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(45,212,191,0.15))', color: 'var(--color-emerald)' }}>{i + 1}</div>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Workflow */}
          {project.workflow.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_workflow}</h2>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                  {project.workflow.map((step, i) => (
                    <button key={i} onClick={() => setActiveStep(i)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0" style={{ backgroundColor: activeStep === i ? 'var(--color-emerald)' : 'var(--color-bg-elevated)', color: activeStep === i ? '#fff' : 'var(--color-text-secondary)', border: `1px solid ${activeStep === i ? 'var(--color-emerald)' : 'var(--color-border)'}` }} aria-pressed={activeStep === i}>
                      <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">{step.step}</span>
                      <span className="hidden sm:block">{step.title}</span>
                    </button>
                  ))}
                </div>
                <div className="animate-fade-in">
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>Step {project.workflow[activeStep].step}: {project.workflow[activeStep].title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{project.workflow[activeStep].description}</p>
                </div>
                <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <button onClick={() => setActiveStep((s) => Math.max(0, s - 1))} disabled={activeStep === 0} className="text-sm font-medium transition-colors disabled:opacity-30" style={{ color: 'var(--color-text-secondary)' }}>← {t.project_prev_step}</button>
                  <button onClick={() => setActiveStep((s) => Math.min(project.workflow.length - 1, s + 1))} disabled={activeStep === project.workflow.length - 1} className="text-sm font-medium transition-colors disabled:opacity-30" style={{ color: 'var(--color-text-secondary)' }}>{t.project_next_step} →</button>
                </div>
              </div>
            </section>
          )}

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_gallery}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <button key={i} onClick={() => openGallery(i)} className="rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02]" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-elevated)' }} aria-label={`View ${img.caption}`}>
                    <img src={img.src} alt={img.alt} className="w-full h-44 object-cover" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    <p className="px-3 py-2 text-xs font-medium text-left" style={{ color: 'var(--color-text-secondary)' }}>{img.caption}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Architecture */}
          {project.architecture && (
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t.project_architecture}</h2>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{project.architecture}</p>
              </div>
            </section>
          )}

          {/* Challenges */}
          {project.challenges.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_challenges}</h2>
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <div key={i} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                    <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text-primary)' }}><span style={{ color: 'var(--color-emerald)' }}>Challenge: </span>{c.challenge}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}><span className="font-medium" style={{ color: 'var(--color-teal)' }}>Solution: </span>{c.solution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          {project.results && (
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t.project_results}</h2>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'rgba(16,185,129,0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{project.results}</p>
              </div>
            </section>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.project_related}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link key={rel.id} to={`/projects/${rel.slug}`} className="p-5 rounded-xl border transition-all duration-200 hover:-translate-y-1 block" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.3)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}>
                    <span className="text-xs font-semibold mb-2 block" style={{ color: 'var(--color-emerald)' }}>{rel.category}</span>
                    <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--color-text-primary)' }}>{rel.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{rel.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
