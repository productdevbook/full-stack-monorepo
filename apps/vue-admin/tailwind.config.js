/** @type {import('tailwindcss/types').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/vue-design-system/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#222',
          200: '#333',
          300: '#444',
          400: '#555',
          500: '#666',
          600: '#777',
          700: '#888',
          800: '#999',
          900: '#aaa',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
