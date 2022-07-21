/** @type {import('tailwindcss/types').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/vue-design-system/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: {
          DEFAULT: '#000000',
          light: '#333333',
          dark: '#373738',
        },
        white: {
          DEFAULT: '#ffffff',
        },
        grey: {
          DEFAULT: '#999999',
          medium: '#1e1e1e',
          dark: '#515271',
        },
        dark: {
          50: '#0d0d0d',
          100: '#1a1a1a',
          150: '#262626',
          200: '#333333',
          250: '#404040',
          300: '#4d4d4d',
          350: '#595959',
          400: '#666666',
          450: '#737373',
          500: '#808080',
          550: '#8c8c8c',
          600: '#999999',
          650: '#a6a6a6',
          700: '#b3b3b3',
          750: '#bfbfbf',
          800: '#cccccc',
          850: '#d9d9d9',
          900: '#e6e6e6',
          950: '#f2f2f2',
        },
      },
    },
  },
  plugins: [],
}
