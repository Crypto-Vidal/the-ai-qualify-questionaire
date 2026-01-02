/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          DEFAULT: '#f59e0b', // amber-500
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        success: {
          DEFAULT: '#10b981', // emerald-500
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          DEFAULT: '#4f46e5', // indigo-600
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        warning: {
          DEFAULT: '#f43f5e', // rose-500
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'flip-out': {
          '0%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
          '50%': { transform: 'rotateY(90deg) scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'rotateY(90deg) scale(0.95)', opacity: '0' },
        },
        'flip-in': {
          '0%': { transform: 'rotateY(-90deg) scale(0.95)', opacity: '0' },
          '50%': { transform: 'rotateY(-90deg) scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        'flip-continuous': {
          '0%': { transform: 'rotateY(0deg) scale(1)' },
          '50%': { transform: 'rotateY(180deg) scale(0.95)' },
          '100%': { transform: 'rotateY(360deg) scale(1)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'pulse-subtle': 'pulse-subtle 2s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'flip-out': 'flip-out 0.4s ease-in forwards',
        'flip-in': 'flip-in 0.4s ease-out forwards',
        'flip-continuous': 'flip-continuous 0.8s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale': 'scale 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
