export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  rootDir: process.cwd(),
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
  moduleNameMapper: {
    '^@dinero.js/(.*)$': '<rootDir>/packages/$1/src/',
    '^dinero.js$': '<rootDir>/packages/dinero.js/src/',
  },
};
