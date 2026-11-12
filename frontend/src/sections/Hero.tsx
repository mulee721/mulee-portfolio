import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

const TECH_LABELS = ['React', 'TypeScript', 'Node.js', 'NestJS', 'MongoDB', 'PostgreSQL'];

const CHIPS = [
  { label: 'React',      angle:  38, r: 185, delay: '0s',   grad: true  },
  { label: 'TypeScript', angle: 165, r: 175, delay: '0.4s', grad: false },
  { label: 'NestJS',     angle: 255, r: 180, delay: '0.8s', grad: false },
];

const polar = (angleDeg: number, r: number) => ({
  x: Math.round(Math.cos((angleDeg - 90) * (Math.PI / 180)) * r),
  y: Math.round(Math.sin((angleDeg - 90) * (Math.PI / 180)) * r),
});

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Theme-aware values
  const glow1 = isDark
    ? 'radial-gradient(ellipse 80% 60% at 15% 85%, rgba(127,129,255,0.18) 0%, rgba(0,200,250,0.08) 50%, transparent 75%)'
    : 'radial-gradient(ellipse 80% 60% at 15% 85%, rgba(127,129,255,0.07) 0%, rgba(0,200,250,0.04) 50%, transparent 75%)';

  const glow2 = isDark
    ? 'radial-gradient(ellipse 55% 45% at 85% 8%, rgba(0,200,250,0.10) 0%, transparent 65%)'
    : 'radial-gradient(ellipse 55% 45% at 85% 8%, rgba(0,200,250,0.05) 0%, transparent 65%)';

  const dotGrid = isDark
    ? 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)'
    : 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)';

  const subtitleColor   = isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-text-secondary)';
  const greetingColor   = isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-text-secondary)';
  const techBg          = isDark ? 'rgba(255,255,255,0.04)' : 'var(--color-bg-elevated)';
  const techBorder      = isDark ? 'rgba(255,255,255,0.08)' : 'var(--color-border)';
  const techColor       = isDark ? 'rgba(255,255,255,0.4)' : 'var(--color-text-secondary)';
  const scrollBorder    = isDark ? 'rgba(255,255,255,0.15)' : 'var(--color-border)';
  const chipDarkBg      = isDark ? 'rgba(13,17,23,0.85)' : 'var(--color-bg-card)';
  const ringOuter       = isDark ? 'rgba(0,200,250,0.3)'    : 'rgba(0,200,250,0.45)';
  const ringInner       = isDark ? 'rgba(127,129,255,0.25)' : 'rgba(127,129,255,0.4)';
  const conicOpacity    = isDark ? 0.45 : 0.3;
  const glowBg          = isDark
    ? 'radial-gradient(circle,rgba(127,129,255,0.25) 0%,rgba(0,200,250,0.15) 45%,transparent 70%)'
    : 'radial-gradient(circle,rgba(127,129,255,0.12) 0%,rgba(0,200,250,0.08) 45%,transparent 70%)';
  const imageBorder     = isDark ? 'rgba(0,200,250,0.5)'   : 'rgba(0,200,250,0.6)';
  const imageShadow     = isDark
    ? '0 0 0 6px rgba(127,129,255,0.1), 0 0 40px rgba(0,200,250,0.28), 0 0 80px rgba(127,129,255,0.15)'
    : '0 0 0 6px rgba(127,129,255,0.06), 0 0 32px rgba(0,200,250,0.2), 0 4px 24px rgba(0,0,0,0.08)';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-label="Hero section"
    >
      {/* ── Large diagonal glow (bottom-left) ───────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow1 }}
        aria-hidden="true"
      />
      {/* Secondary glow top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow2 }}
        aria-hidden="true"
      />

      {/* ── Dot-grid overlay ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: dotGrid, backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Text ──────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">

            {/* Availability badge */}
            <div className="animate-fade-in mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: 'rgba(16,185,129,0.1)',
                  borderColor: 'rgba(16,185,129,0.3)',
                  color: 'var(--color-emerald)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-emerald)',
                    boxShadow: '0 0 6px var(--color-emerald)',
                    animation: 'pulse 2s infinite',
                  }}
                  aria-hidden="true"
                />
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-black leading-tight mb-4">
              <span
                className="block text-2xl sm:text-3xl font-semibold animate-slide-up delay-100"
                style={{ color: greetingColor }}
              >
                {t.hero_greeting}
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl animate-slide-up delay-200"
                style={{
                  background: isDark
                    ? 'linear-gradient(90deg, #7F81FF 0%, #00C8FA 100%)'
                    : 'linear-gradient(90deg, #7F81FF 0%, #00C8FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                {t.hero_name}
              </span>
            </h1>

            {/* Title */}
            <p
              className="text-xl sm:text-2xl font-bold mb-5 animate-slide-up delay-300"
              style={{ color: 'var(--color-teal)' }}
            >
              {t.hero_title}
            </p>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-8 animate-slide-up delay-400"
              style={{ color: subtitleColor }}
            >
              {t.hero_subtitle}
            </p>

            {/* CTA Buttons + Social Icons */}
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-slide-up delay-500">
              {/* Download CV Button */}
              <a
                href="/images/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-teal), var(--color-emerald))',
                  boxShadow: '0 4px 20px rgba(45,212,191,0.3)',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.hero_download_cv}
              </a>

              {/* Hire Me Button */}
              <button
                onClick={() => scrollTo('contact')}
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-1 active:translate-y-0 group overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,200,250,0.2), rgba(127,129,255,0.2))',
                  border: '1.5px solid var(--color-teal)',
                  boxShadow: '0 0 12px rgba(0,200,250,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,200,250,0.4), 0 4px 20px rgba(0,200,250,0.25)';
                  e.currentTarget.style.borderColor = 'rgba(0,200,250,0.8)';
                  e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,200,250,0.3), rgba(127,129,255,0.3))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0,200,250,0.2)';
                  e.currentTarget.style.borderColor = 'var(--color-teal)';
                  e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,200,250,0.2), rgba(127,129,255,0.2))';
                }}
              >
                {/* Animated background shine effect */}
                <span
                  className="absolute inset-0 -left-full group-hover:left-full transition-all duration-500 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                  aria-hidden="true"
                />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Hire Me
                </span>
              </button>
            </div>

            {/* Social Icons - Below buttons */}
            <div className="flex items-center gap-3 animate-slide-up delay-600">
              {/* GitHub */}
              <a
                href="https://github.com/mulee721"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(0,200,250,0.08)',
                  border: '1px solid rgba(0,200,250,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,200,250,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,200,250,0.4), 0 4px 12px rgba(0,200,250,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(0,200,250,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,200,250,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0,200,250,0.2)';
                }}
                aria-label="GitHub profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-teal)' }} aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.448-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mulee127/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(10,102,194,0.08)',
                  border: '1px solid rgba(10,102,194,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(10,102,194,0.4), 0 4px 12px rgba(10,102,194,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(10,102,194,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(10,102,194,0.2)';
                }}
                aria-label="LinkedIn profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#0A66C2' }} aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:mulee@example.com"
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(127,129,255,0.08)',
                  border: '1px solid rgba(127,129,255,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(127,129,255,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(127,129,255,0.4), 0 4px 12px rgba(127,129,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(127,129,255,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(127,129,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(127,129,255,0.2)';
                }}
                aria-label="Send email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: 'var(--color-emerald)' }} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/mulee_19"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(225,48,108,0.08)',
                  border: '1px solid rgba(225,48,108,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(225,48,108,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(225,48,108,0.4), 0 4px 12px rgba(225,48,108,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(225,48,108,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(225,48,108,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(225,48,108,0.2)';
                }}
                aria-label="Instagram profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E1306C' }} aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: Profile image ─────────────────────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-right delay-200">
            <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>

              {/* Outer dashed ring */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 378, height: 378,
                  border: `1.5px dashed ${ringOuter}`,
                  animation: 'spin 28s linear infinite',
                }}
                aria-hidden="true"
              />

              {/* Inner counter-spin ring */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 326, height: 326,
                  border: `1px dashed ${ringInner}`,
                  animation: 'spin 18s linear infinite reverse',
                }}
                aria-hidden="true"
              />

              {/* Conic arc — violet→cyan */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 308, height: 308,
                  background: 'conic-gradient(from 180deg, #7F81FF 0%, #00C8FA 35%, transparent 55%, transparent 100%)',
                  opacity: conicOpacity,
                  filter: 'blur(2px)',
                  animation: 'spin 8s linear infinite',
                }}
                aria-hidden="true"
              />

              {/* Radial glow behind image */}
              <div
                className="absolute rounded-full blur-2xl pointer-events-none animate-glow-pulse"
                style={{ width: 300, height: 300, background: glowBg }}
                aria-hidden="true"
              />

              {/* Profile image frame */}
              <div
                className="relative rounded-full overflow-hidden animate-float"
                style={{
                  width: 280, height: 280,
                  flexShrink: 0,
                  border: `3px solid ${imageBorder}`,
                  boxShadow: imageShadow,
                  zIndex: 2,
                }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Mulugeta Daba (Mulee) — Full-Stack Web Developer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = 'var(--color-bg-elevated)';
                      const d = document.createElement('div');
                      d.style.cssText =
                        'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;font-weight:900;background:linear-gradient(90deg,#7F81FF,#00C8FA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:"JetBrains Mono";';
                      d.textContent = '</>';
                      parent.appendChild(d);
                    }
                  }}
                />
              </div>

              {/* Floating tech chips */}
              {CHIPS.map((chip) => {
                const { x, y } = polar(chip.angle, chip.r);
                return (
                  <div
                    key={chip.label}
                    className="absolute px-3 py-1.5 rounded-xl text-xs font-semibold select-none pointer-events-none"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%,-50%)',
                      zIndex: 3,
                      background: chip.grad
                        ? 'linear-gradient(135deg, var(--color-teal), var(--color-emerald))'
                        : chipDarkBg,
                      border: chip.grad ? 'none' : '1px solid rgba(45,212,191,0.3)',
                      color: chip.grad ? '#fff' : 'var(--color-teal)',
                      boxShadow: chip.grad
                        ? '0 4px 16px rgba(45,212,191,0.4)'
                        : '0 2px 12px rgba(0,0,0,0.25)',
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-out ${chip.delay} forwards`,
                    }}
                    aria-hidden="true"
                  >
                    {chip.label}
                  </div>
                );
              })}

              {/* Sparkle dots */}
              {[0, 72, 144, 216, 288].map((deg) => {
                const { x, y } = polar(deg, 189);
                return (
                  <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%,-50%)',
                      backgroundColor: deg % 144 === 0 ? 'var(--color-teal)' : 'var(--color-emerald)',
                      boxShadow: `0 0 6px ${deg % 144 === 0 ? 'rgba(0,200,250,0.9)' : 'rgba(127,129,255,0.9)'}`,
                      opacity: 0.85,
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Tech stack row ─────────────────────────────────────────────── */}
        <div className="mt-16 animate-fade-in delay-700">
          <p
            className="text-xs uppercase tracking-widest mb-4 text-center"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}
          >
            Built with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH_LABELS.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200"
                style={{
                  backgroundColor: techBg,
                  borderColor: techBorder,
                  color: techColor,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,212,191,0.5)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-teal)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = techBorder;
                  (e.currentTarget as HTMLElement).style.color = techColor;
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: scrollBorder }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-teal)', animation: 'slideDown 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
};
