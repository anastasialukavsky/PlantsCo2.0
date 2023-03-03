/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{js,jsx,css}'],
  theme: {
    fontFamily: {
      fraunces: ['Fraunces', 'serif'],
      raleway: ['Raleway', 'sans-serif'],
      gloock: ['Gloock', 'serif'],
      outfit: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        primary_deep_green: '#365314',
        'primary-promo-banner': '#a7bfb4',
        'primary-button-green': '#283F3B',
        'primary-offwhite': '#f4f4f4',
        'primary-bright-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
