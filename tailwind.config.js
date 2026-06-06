/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          black:  '#080c12',
          deep:   '#0d1520',
          mid:    '#0f2a3a',
        },
        teal: {
          bio:    '#00d4b8',
          glow:   '#00e5cc',
        },
        cyan: {
          electric: '#00b8d9',
          bright:   '#33ccee',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wave-pulse': 'wavePulse 3s ease-in-out infinite',
        'fade-up':    'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        wavePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%':      { opacity: '1',   transform: 'scaleY(1.3)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
