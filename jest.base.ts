export default {
  rootDir: './',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  coveragePathIgnorePatterns: ['node_modules/', 'dist/', 'test/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    __DEV__: true,
    __TEST__: true,
  },
  // This module mapper is for the Jest configurations in the `packages` folders
  // It is overridden by the top-level Jest configuration
  moduleNameMapper: {
    '^test-utils$': '<rootDir>/../../test/utils/',
    '^@dinero.js/(.*)$': '<rootDir>/../$1/src/',
    '^dinero.js$': '<rootDir>/../dinero.js/src/',
  },
  transform: {
    '\\.ts': ['babel-jest', { rootMode: 'upward' }],
  },
};
