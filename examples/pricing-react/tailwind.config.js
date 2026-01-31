const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
};
