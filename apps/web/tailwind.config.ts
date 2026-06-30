import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#05070f',
          850: '#080b16',
          800: '#0b0f1d',
          700: '#111726',
        },
        glass: 'rgba(255,255,255,0.04)',
        brand: {
          DEFAULT: '#6366f1',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          teal: '#2dd4bf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 60px -28px rgba(8,12,28,0.9)',
        glow: '0 0 0 1px rgba(99,102,241,0.35), 0 18px 50px -20px rgba(99,102,241,0.55)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg,#22d3ee 0%,#6366f1 45%,#8b5cf6 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
