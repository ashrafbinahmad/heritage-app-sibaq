/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manjari: '"Manjari", sans-serif'
      },
      colors: {
        'accent-dark': '#1a5d4d',
        'accent-light': '#b6ffee',
      }
    },
  },
  plugins: [],
}