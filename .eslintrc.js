module.exports = {
  plugins: ['functional', 'sonarjs', 'simple-import-sort', 'promise', 'import'],
  extends: [
    'algolia/jest',
    'algolia/typescript',
    'plugin:functional/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
