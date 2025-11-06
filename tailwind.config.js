/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        anchor: {
          background: '#EAF1F8',
          surface: '#F8FBFF',
          primary: '#0047AB',
          accent: '#3C6FD8',
          deep: '#002D72',
          muted: '#5A7094',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 28px 60px -32px rgba(0, 71, 171, 0.45)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.32, 0.94, 0.6, 1)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 500ms ease-out both',
      },
    },
  },
  plugins: [],
}
