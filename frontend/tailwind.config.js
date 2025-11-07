/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B0C10',
        'navy': '#1D3557',
        'gold': '#FACC15',
        'purple': '#9B5DE5',
        'parchment': '#E6D5A7',
      },
      fontFamily: {
        'heading': ['Cinzel Decorative', 'serif'],
        'body': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}