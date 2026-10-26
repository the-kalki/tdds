import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tdds: {
          ivory: '#FAF9F6',
          secondary: '#F4F2EC',
          obsidian: '#0D0D0D',
          dark: '#141414',
          card: '#161616',
          'border-light': '#E5E2DB',
          'border-dark': 'rgba(255, 255, 255, 0.1)',
          lime: '#C8F169',
          'coral-start': '#FF5722',
          'coral-end': '#E02B20',
          text: '#171717',
          muted: '#66645E',
        }
      },
      fontFamily: {
        display: ['Syne', 'Clash Display', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      maxWidth: {
        'site': '1360px',
      }
    },
  },
  plugins: [],
} satisfies Config;
