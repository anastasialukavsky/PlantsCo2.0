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
      },
      display: ['group-hover'],
    },
  },
  plugins: [],
};
