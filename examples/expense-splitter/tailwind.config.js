/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
