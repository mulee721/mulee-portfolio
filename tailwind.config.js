/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New palette tokens
        'brand-violet':  '#7F81FF',
        'brand-cyan':    '#00C8FA',
        'brand-label':   '#22D3EE',
        'surface-dark':  '#0B1A24',
        'surface-nav':   '#1E1A2D',
        'bg-dark':       '#0A0A14',
        'glow-purple':   '#231A38',
        'glow-teal':     '#002225',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans Ethiopic',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'glow-pulse':    'glowPulse 4s ease-in-out infinite',
        'fade-in':       'fadeIn 0.6s ease-out forwards',
        'slide-up':      'slideUp 0.6s ease-out forwards',
        'slide-in-right':'slideInRight 0.5s ease-out forwards',
        'scale-in':      'scaleIn 0.4s ease-out forwards',
        'spin-slow':     'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.05)' },
        },
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:      { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(30px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { from: { opacity: '0', transform: 'scale(0.9)' },       to: { opacity: '1', transform: 'scale(1)' } },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(90deg, #7F81FF, #00C8FA)',
      },
      boxShadow: {
        'brand':      '0 0 20px rgba(0, 200, 250, 0.25)',
        'brand-lg':   '0 0 40px rgba(0, 200, 250, 0.35)',
        'card':       '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
