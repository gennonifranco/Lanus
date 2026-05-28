import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        granate: {
          DEFAULT: '#6B1219',
          50: '#fbeaec',
          100: '#f3c4ca',
          200: '#e89097',
          300: '#d75d68',
          400: '#b8323f',
          500: '#6B1219',
          600: '#5a0f15',
          700: '#480c11',
          800: '#34090d',
          900: '#220608',
        },
        win: '#1f7a3a',
        loss: '#8a2a2a',
        draw: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
