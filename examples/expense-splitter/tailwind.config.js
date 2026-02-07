/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0c0d0f',
        'bg-soft': '#131416',
        'bg-alt': '#08090a',
        brand: '#4466ff',
        'brand-light': '#5577ff',
        'text-1': '#ededef',
        'text-2': '#a1a1a9',
        'text-3': '#6e6e76',
        border: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
