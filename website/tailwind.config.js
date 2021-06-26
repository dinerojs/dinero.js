const { blueGray } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      colors: {
        gray: blueGray,
      },
      minHeight: (theme) => {
        const spacing = Object.entries(theme('spacing'));

        return spacing.reduce((acc, curr) => {
          const [key, value] = curr;

          return {
            ...acc,
            ...{
              [`screen-${key}`]: `calc(100vh - ${value})`,
            },
          };
        }, {});
      },
      maxHeight: (theme) => {
        const spacing = Object.entries(theme('spacing'));

        return spacing.reduce((acc, curr) => {
          const [key, value] = curr;

          return {
            ...acc,
            ...{
              [`screen-${key}`]: `calc(100vh - ${value})`,
            },
          };
        }, {});
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
