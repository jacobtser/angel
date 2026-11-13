import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      colors: {
        paper: 'var(--bg)',
        elev: 'var(--bg-elev)',
        ink: 'var(--ink)',
        soft: 'var(--ink-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        leaf: 'var(--leaf)',
        gold: 'var(--gold)',
        rose: 'var(--rose)',
        plum: 'var(--plum)',
        sky: 'var(--sky)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(24,36,31,.04), 0 12px 32px -18px rgba(24,36,31,.28)',
        lift: '0 2px 4px rgba(24,36,31,.05), 0 24px 48px -24px rgba(24,36,31,.35)',
        glow: '0 0 0 1px var(--line), 0 18px 60px -28px var(--ring)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
};

export default config;
