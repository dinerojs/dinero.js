/* eslint-disable import/no-commonjs */
module.exports = {
  plugins: ['functional', 'sonarjs', 'promise', 'import'],
  extends: [
    'algolia',
    'algolia/jest',
    'algolia/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    // Functional rules (v4.x uses singular naming)
    'functional/immutable-data': ['error'],
    'functional/no-let': ['error'],
    'functional/no-this-expression': ['error'],
    'functional/no-throw-statement': ['error'],
    'functional/prefer-readonly-type': ['off'],
    'functional/no-conditional-statement': ['off'],
    'functional/functional-parameters': ['off'],
    'functional/no-loop-statement': ['off'],
    'functional/no-expression-statement': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    // Disable rules that require type information or were renamed
    '@typescript-eslint/prefer-optional-chain': ['off'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['off'],
    '@typescript-eslint/no-floating-promises': ['off'],
    '@typescript-eslint/sort-type-union-intersection-members': ['off'],
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
        'functional/immutable-data': 'off',
        'functional/no-let': 'off',
        'functional/no-throw-statement': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'jsdoc/require-description': 'off',
        'jsdoc/match-description': 'off',
        'valid-jsdoc': 'off',
        'import/no-named-as-default': 'off',
      },
    },
    {
      files: ['**/__tests__/**'],
      rules: {
        'functional/no-expression-statement': ['off'],
        'functional/immutable-data': ['off'],
        'functional/no-let': ['off'],
        'functional/no-throw-statement': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/no-named-as-default': ['off'],
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
