/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{js,jsx,css}'],
  theme: {
    fontFamily: {
      fraunces: ['Fraunces', 'serif'],
      raleway: ['Raleway', 'sans-serif'],
      gloock: ['Gloock', 'serif'],
      outfit: ['Outfit', 'sans-serif'],
      montserrat: ['Montserrat', 'monospace'],
      hubbali: ['Hubballi', 'sans-serif'],
      tabac: 'Tabac Big Glam Black'
    },
    fontWeight: {
      thin: 100,
      xtralight: 200,
      light: 300,
      semibold: 600,
    },
    extend: {
      colors: {
        'primary-deep-green': '#365314',
        'primary-promo-banner': '#a7bfb4',
        'primary-button-green': '#283F3B',
        'primary-offwhite': '#f4f4f4',
        'primary-bright-white': '#FFFFFF',
        'primary-button-hover': '#4d783c',
        'green-gray': '#354f52'
      },
      display: ['group-hover'],
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
