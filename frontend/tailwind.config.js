/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        hide: '::-webkit-scrollbar { display: none; }', // For Safari and Chrome
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animated')

  ],
}