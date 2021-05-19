/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  purge: ['./**/*.html', './src/**/*.{js,vue}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
