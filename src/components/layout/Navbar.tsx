import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { MobileMenu } from './MobileMenu';
import { LanguageSelector } from './LanguageSelector';

// ── Animated nav link ─────────────────────────────────────────────────────
const NavLink: React.FC<{
  href: string;
  isActive: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ href, isActive, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={isActive ? 'page' : undefined}
      className="relative px-3 py-2 text-sm font-medium rounded-lg outline-none focus-visible:ring-2"
      style={{
        color: active ? 'transparent' : 'var(--color-text-secondary)',
        background: active
          ? 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))'
          : 'none',
        WebkitBackgroundClip: active ? 'text' : undefined,
        WebkitTextFillColor: active ? 'transparent' : undefined,
        backgroundClip: active ? 'text' : undefined,
        transition: 'color 0.2s ease',
      }}
    >
      {/* Hover pill glow */}
      <span
        className="absolute inset-0 rounded-lg transition-all duration-200"
        style={{
          background: active
            ? 'linear-gradient(90deg, rgba(127,129,255,0.10), rgba(0,200,250,0.10))'
            : 'transparent',
          opacity: active ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <span className="relative z-10">{label}</span>

      {/* Animated underline — scaleX on GPU for smooth movement */}
      <span
        className="absolute bottom-0.5 left-1/2 h-0.5 rounded-full"
        style={{
          width: '60%',
          transform: `translateX(-50%) scaleX(${isActive ? 1 : hovered ? 0.85 : 0})`,
          transformOrigin: 'center',
          transition: 'transform 0.25s cubic-bezier(0.34,1.2,0.64,1)',
          background: 'linear-gradient(90deg, var(--color-emerald), var(--color-teal))',
          boxShadow: active ? '0 0 8px rgba(0,200,250,0.65)' : 'none',
        }}
        aria-hidden="true"
      />
    </a>
  );
};

const NAV_ITEMS = [
  { id: 'home', href: '/#home' },
  { id: 'about', href: '/#about' },
  { id: 'skills', href: '/#skills' },
  { id: 'projects', href: '/#projects' },
  { id: 'experience', href: '/#experience' },
  { id: 'services', href: '/#services' },
  { id: 'contact', href: '/#contact' },
] as const;

type NavKey = (typeof NAV_ITEMS)[number]['id'];

const NAV_LABEL_MAP: Record<NavKey, string> = {
  home: 'nav_home',
  about: 'nav_about',
  skills: 'nav_skills',
  projects: 'nav_projects',
  experience: 'nav_experience',
  services: 'nav_services',
  contact: 'nav_contact',
};

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Collect all currently intersecting sections and pick the
        // one whose top is closest to (but still below) the navbar
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ id: e.target.id, top: e.boundingClientRect.top }));

        if (visible.length === 0) return;

        // Prefer the section whose top is nearest to 0 from below
        const best = visible.reduce((a, b) =>
          Math.abs(a.top) < Math.abs(b.top) ? a : b
        );
        setActiveSection(best.id);
      },
      { threshold: 0.15, rootMargin: '-64px 0px -45% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.replace('/#', '');
        if (location.pathname !== '/') {
          window.location.href = href;
          return;
        }
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileOpen(false);
      }
    },
    [location.pathname]
  );

  const navBg = scrolled
    ? 'backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  const navBgStyle = scrolled
    ? { backgroundColor: 'var(--color-nav-bg)', borderBottom: '1px solid var(--color-border)' }
    : {};

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={navBgStyle}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Mulee portfolio home"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg text-white transition-transform duration-200 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, var(--color-emerald), var(--color-teal))' }}
              >
                M
              </div>
              <span
                className="font-bold text-lg hidden sm:block"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Mulee
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const labelKey = NAV_LABEL_MAP[item.id] as keyof typeof t;
                return (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    isActive={isActive}
                    label={t[labelKey] as string}
                    onClick={(e) => handleNavClick(e, item.href)}
                  />
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language selector */}
              <LanguageSelector />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-emerald)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text-secondary)')
                }
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  // Sun icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M3 12H1m4.22-6.364L3.808 4.222M19.778 4.222 18.364 5.636M21 12h-2m-1.636 6.364 1.414 1.414M5.636 18.364 4.222 19.778M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                  </svg>
                )}
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{ color: 'var(--color-text-secondary)' }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={NAV_ITEMS}
        navLabelMap={NAV_LABEL_MAP}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
};
