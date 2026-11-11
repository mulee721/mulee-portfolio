import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../types';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === language);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200"
        style={{
          color: open ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          borderColor: open ? 'var(--color-teal)' : 'var(--color-border)',
          backgroundColor: open ? 'rgba(0,200,250,0.08)' : 'transparent',
          boxShadow: open ? '0 0 12px rgba(0,200,250,0.15)' : 'none',
        }}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{current?.code.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-40 rounded-2xl overflow-hidden z-50 animate-scale-in"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 12px 40px rgba(0,200,250,0.15), 0 4px 20px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
          }}
          role="listbox"
          aria-label="Language options"
        >
          {/* Top border glow */}
          <div
            className="h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-teal), transparent)',
              opacity: 0.6,
            }}
            aria-hidden="true"
          />

          {languages.map((lang) => {
            const isSelected = language === lang.code;
            const isHoveredItem = hovered === lang.code;

            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                onMouseEnter={() => setHovered(lang.code)}
                onMouseLeave={() => setHovered(null)}
                className="w-full px-4 py-3 text-sm font-medium transition-all duration-200 relative group"
                style={{
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)',
                  backgroundColor: isSelected
                    ? 'linear-gradient(135deg, rgba(0,200,250,0.2), rgba(127,129,255,0.15))'
                    : isHoveredItem
                      ? 'rgba(0,200,250,0.08)'
                      : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--color-teal)' : '3px solid transparent',
                  paddingLeft: isSelected ? 'calc(1rem - 3px)' : '1rem',
                }}
              >
                {/* Hover glow background */}
                {isHoveredItem && !isSelected && (
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0,200,250,0.1), transparent)',
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Selected background */}
                {isSelected && (
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0,200,250,0.15) 0%, rgba(127,129,255,0.08) 100%)',
                    }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center justify-between gap-2">
                  <span className="flex-1 text-left">{lang.nativeLabel}</span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
