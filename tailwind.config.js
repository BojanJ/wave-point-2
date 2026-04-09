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
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7ec8e3',
          400: '#4aa5c8',
          500: '#2d8ab0',
          600: '#1d6e8f',
          700: '#175670',
          800: '#154559',
          900: '#0d2e3e',
          950: '#071a24',
        },
        azure: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fd',
          300: '#93d0fb',
          400: '#60b5f6',
          500: '#3b96f0',
          600: '#2578e4',
          700: '#1d61cf',
          800: '#1e4fa8',
          900: '#1e4485',
          950: '#162a51',
        },
        sand: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4ddb2',
          300: '#ecc581',
          400: '#e2a74e',
          500: '#d98f2a',
          600: '#c0731e',
          700: '#9f581b',
          800: '#81471d',
          900: '#6a3c1a',
          950: '#3a1e0c',
        },
        terracotta: {
          50: '#fff4f0',
          100: '#ffe5db',
          200: '#ffcbb8',
          300: '#ffa688',
          400: '#ff7555',
          500: '#f84f2d',
          600: '#e53413',
          700: '#c0280d',
          800: '#9d2410',
          900: '#822414',
          950: '#470e05',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
