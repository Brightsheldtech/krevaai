/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07090f',
        surface: '#0f1220',
        'surface-raised': '#161928',
        border: '#1e2138',
        primary: {
          DEFAULT: '#5b6ef5',
          hover: '#4a5de0',
        },
        cyan: '#22d3ee',
        foreground: '#e8eaf0',
        muted: '#5a5a72',
        success: '#4ade80',
        warning: '#f59e0b',
        danger: '#f87171',
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        card: '6px',
        btn: '4px',
        badge: '3px',
      },
      letterSpacing: {
        heading: '-0.03em',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px #5b6ef5, 0 0 16px 0 rgba(91,110,245,0.12)',
      },
    },
  },
  plugins: [],
}
