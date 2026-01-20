/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */

module.exports = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      'coverage/**',
      'dist/**',
      '**/dist/**',
      'node_modules/**',
      'website/**',
      '**/*.json',
      '**/*.md',
      '**/lib/**',
    ],
  },
  // Base configuration for all files
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      functional: require('eslint-plugin-functional').default,
      sonarjs: require('eslint-plugin-sonarjs'),
      promise: require('eslint-plugin-promise'),
      import: require('eslint-plugin-import'),
      jsdoc: require('eslint-plugin-jsdoc'),
    },
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
    rules: {
      // Rules from original config
      'functional/no-conditional-statements': 'off',
      'functional/functional-parameters': 'off',
      // Updated functional rules with correct names (pluralized in v9+)
      'functional/no-expression-statements': 'off',
      'functional/no-throw-statements': 'off',
      'functional/no-mixed-types': 'off',
      'functional/no-return-void': 'off',
      'functional/no-let': 'off',
      'functional/no-loop-statements': 'off',
      'functional/immutable-data': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'jsdoc/check-param-names': 'off',
      'import/extensions': 'off',
      // Temporarily disabled due to minimatch compatibility issues with ESLint 9
      // 'import/order': [
      //   'error',
      //   {
      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true,
      //     },
      //     'newlines-between': 'always',
      //     groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      //     pathGroups: [
      //       {
      //         pattern: '@/**/*',
      //         group: 'parent',
      //         position: 'before',
      //       },
      //     ],
      //     pathGroupsExcludedImportTypes: ['builtin'],
      //   },
      // ],
    },
  },
  // Override for test files
  {
    files: ['test/**/*'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  // Override for scripts
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
    },
  },
  // Override for __tests__ files
  {
    files: ['**/__tests__/**'],
    rules: {
      'functional/no-expression-statement': 'off',
      'import/no-extraneous-dependencies': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
  // Override for TypeScript files
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
];
