/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  plugins: ['functional', 'sonarjs', 'simple-import-sort', 'promise', 'import'],
  extends: [
    'algolia/jest',
    'algolia/typescript',
    'plugin:functional/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    'functional/no-conditional-statement': ['off'],
    'functional/functional-parameters': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'valid-jsdoc': [
      'error',
      {
        requireReturnType: false,
        requireParamType: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'functional/no-expression-statement': ['off'],
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
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
