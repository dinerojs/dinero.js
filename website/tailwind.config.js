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
    boxShadow: {
      sm: '0 1px 2px 0 rgba(17, 17, 26, 0.05)',
      DEFAULT: '0px 1px 0px rgba(17, 17, 26, 0.05), 0px 0px 8px rgba(17, 17, 26, 0.1)',
      md: '0px 0px 16px rgba(17, 17, 26, 0.1)',
      lg: '0px 4px 16px rgba(17, 17, 26, 0.05), 0px 8px 32px rgba(17, 17, 26, 0.05)',
      xl: '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 32px rgba(17, 17, 26, 0.05)',
      '2xl': '0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 48px rgba(17, 17, 26, 0.1)',
      '3xl': '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
      '4xl': '0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1), 0px 24px 80px rgba(17, 17, 26, 0.1)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
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
