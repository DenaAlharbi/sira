/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sira-purple': '#4C1D95',
        'sira-lavender': '#EDE9FE',
        'sira-orange': '#FB923C',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}