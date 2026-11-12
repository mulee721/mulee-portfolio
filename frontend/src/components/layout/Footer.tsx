import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

// ── Nav split into two columns ────────────────────────────────────────────
const NAV_COL_1 = [
  { id: 'home',       href: '/#home',       labelKey: 'nav_home'       },
  { id: 'about',      href: '/#about',      labelKey: 'nav_about'      },
  { id: 'skills',     href: '/#skills',     labelKey: 'nav_skills'     },
  { id: 'projects',   href: '/#projects',   labelKey: 'nav_projects'   },
] as const;

const NAV_COL_2 = [
  { id: 'experience', href: '/#experience', labelKey: 'nav_experience' },
  { id: 'services',   href: '/#services',   labelKey: 'nav_services'   },
  { id: 'contact',    href: '/#contact',    labelKey: 'nav_contact'    },
] as const;

// ── Animated social icon button ───────────────────────────────────────────
interface SocialBtnProps {
  href: string;
  label: string;
  hoverColor: string;
  hoverGlow: string;
  isEmail?: boolean;
  children: React.ReactNode;
}

const SocialBtn: React.FC<SocialBtnProps> = ({
  href, label, hoverColor, hoverGlow, isEmail = false, children,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-11 h-11 rounded-xl flex items-center justify-center"
      style={{
        backgroundColor: hovered ? `${hoverColor}18` : 'var(--color-bg-elevated)',
        border: `1px solid ${hovered ? hoverColor : 'var(--color-border)'}`,
        color: hovered ? hoverColor : 'var(--color-text-secondary)',
        transform: hovered ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 8px 24px ${hoverGlow}` : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.3,0.64,1)',
      }}
    >
      {/* Ripple glow */}
      <span
        className="absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at center, ${hoverColor}22 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
};

// ── Animated nav link ─────────────────────────────────────────────────────
const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 text-sm transition-all duration-200"
      style={{ color: hovered ? 'var(--color-teal)' : 'var(--color-text-secondary)' }}
    >
      <span
        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200"
        style={{
          backgroundColor: hovered ? 'var(--color-teal)' : 'var(--color-border)',
          transform: hovered ? 'scale(1.8)' : 'scale(1)',
          boxShadow: hovered ? '0 0 4px var(--color-teal)' : 'none',
        }}
        aria-hidden="true"
      />
      {label}
    </a>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────
export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t.footer_copyright.replace('{year}', String(year));

  return (
    <footer
      className="pt-16 pb-8 border-t"
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid: brand | nav (2-col) | connect */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* ── Brand col ─────────────────────────────────────────────── */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group" aria-label="Mulee portfolio">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl text-white transition-transform duration-200 group-hover:scale-110"
                style={{ background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))' }}
              >
                M
              </div>
              <span className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
                Mulee
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {t.footer_tagline}
            </p>

            {/* Social icons — GitHub, LinkedIn, Instagram, Email */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* GitHub */}
              <SocialBtn
                href="https://github.com/mulee721"
                label="GitHub profile"
                hoverColor="#c9d1d9"
                hoverGlow="rgba(201,209,217,0.3)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.448-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </SocialBtn>

              {/* LinkedIn */}
              <SocialBtn
                href="https://www.linkedin.com/in/mulee127/"
                label="LinkedIn profile"
                hoverColor="#0A66C2"
                hoverGlow="rgba(10,102,194,0.4)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialBtn>

              {/* Instagram */}
              <SocialBtn
                href="https://instagram.com/mulee_19"
                label="Instagram profile"
                hoverColor="#E1306C"
                hoverGlow="rgba(225,48,108,0.35)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialBtn>

              {/* Email */}
              <SocialBtn
                href="mailto:mulee@example.com"
                label="Send email"
                hoverColor="#00C8FA"
                hoverGlow="rgba(0,200,250,0.35)"
                isEmail
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </SocialBtn>
            </div>
          </div>

          {/* ── Navigation — 2 columns ─────────────────────────────────── */}
          <div className="md:col-span-2">
            <h3
              className="font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-emerald)' }}
            >
              {t.footer_nav_title}
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {/* Column 1 */}
              <ul className="space-y-3">
                {NAV_COL_1.map((item) => (
                  <li key={item.id}>
                    <FooterLink
                      href={item.href}
                      label={t[item.labelKey as keyof typeof t] as string}
                    />
                  </li>
                ))}
              </ul>
              {/* Column 2 */}
              <ul className="space-y-3">
                {NAV_COL_2.map((item) => (
                  <li key={item.id}>
                    <FooterLink
                      href={item.href}
                      label={t[item.labelKey as keyof typeof t] as string}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Connect col ───────────────────────────────────────────── */}
          <div className="md:col-span-1">
            <h3
              className="font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-emerald)' }}
            >
              {t.footer_social_title}
            </h3>

            <ul className="space-y-3 mb-6">
              {[
                { href: 'https://github.com/mulee721',         label: 'GitHub → mulee721' },
                { href: 'https://www.linkedin.com/in/mulee127/', label: 'LinkedIn → mulee127' },
                { href: 'https://instagram.com/mulee_19',               label: 'Instagram → mulee_19' },
                { href: 'mailto:mulee@example.com',             label: 'Email me directly' },
              ].map((item) => {
                const isEmail = item.href.startsWith('mailto:');
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className="text-sm flex items-center gap-2 group transition-colors duration-200"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-teal)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Built with card — REMOVED */}
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>
            {copyright}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-teal)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            aria-label="Back to top"
          >
            {t.footer_back_to_top}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
};
