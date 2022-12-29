/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  plugins: ['functional', 'sonarjs', 'promise', 'import'],
  extends: [
    'algolia',
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
    'jsdoc/check-param-names': ['off'],
    'import/extensions': ['off'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**/*',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
  overrides: [
    {
      files: ['test/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['scripts/**/*'],
      rules: {
        'no-void': 'off',
        'no-console': 'off',
        'no-process-exit': 'off',
        'functional/no-expression-statement': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'jsdoc/require-description': 'off',
        'jsdoc/match-description': 'off',
        'valid-jsdoc': 'off',
      },
    },
    {
      files: ['**/__tests__/**'],
      rules: {
        'functional/no-expression-statement': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'sonarjs/no-duplicate-string': ['off'],
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
