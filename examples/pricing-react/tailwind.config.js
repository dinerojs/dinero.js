const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./**/*.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
};
