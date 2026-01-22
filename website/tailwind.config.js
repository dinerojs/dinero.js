const { blueGray } = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

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
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(17, 17, 26, 0.05)',
      DEFAULT:
        '0px 1px 0px rgba(17, 17, 26, 0.05), 0px 0px 8px rgba(17, 17, 26, 0.1)',
      md: '0px 0px 16px rgba(17, 17, 26, 0.1)',
      lg: '0px 4px 16px rgba(17, 17, 26, 0.05), 0px 8px 32px rgba(17, 17, 26, 0.05)',
      xl: '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 32px rgba(17, 17, 26, 0.05)',
      '2xl':
        '0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 48px rgba(17, 17, 26, 0.1)',
      '3xl':
        '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
      '4xl':
        '0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1), 0px 24px 80px rgba(17, 17, 26, 0.1)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    extend: {
      colors: {
        gray: blueGray,
        blue: {
          50: '#e7ecfd',
          100: '#b7c6f9',
          200: '#88a1f6',
          300: '#587cf3',
          400: '#2856ef',
          500: '#1144ee',
          600: '#0f3dd6',
          700: '#0d36be',
          800: '#0b2fa6',
          900: '#0a288e',
        },
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
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities, theme }) => {
      const spacing = Object.entries(theme('spacing'));

      const scrollPaddingUtilities = spacing.reduce((acc, curr) => {
        const [key, value] = curr;

        return {
          ...acc,
          [`.spt-${key}`]: {
            scrollPadding: `${value} 0 0 0`,
          },
        };
      }, {});

      const contentUtilities = {
        '.content': {
          content: 'attr(data-content)',
        },
        '.content-before': {
          content: 'attr(data-before)',
        },
        '.content-after': {
          content: 'attr(data-after)',
        },
      };

      addUtilities(scrollPaddingUtilities);
      addUtilities(contentUtilities, ['before', 'after']);
    }),
  ],
};
