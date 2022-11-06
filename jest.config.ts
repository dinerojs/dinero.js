import base from './jest.base';

export default {
  ...base,
  moduleNameMapper: {
    '^test-utils$': '<rootDir>/test/utils/',
    '^@dinero.js/(.*)$': '<rootDir>/packages/$1/src/',
    '^dinero.js$': '<rootDir>/packages/dinero.js/src/',
  },
  projects: [
    '<rootDir>/packages/calculator-bigint/jest.config.ts',
    '<rootDir>/packages/calculator-number/jest.config.ts',
    '<rootDir>/packages/core/jest.config.ts',
    '<rootDir>/packages/currencies/jest.config.ts',
    '<rootDir>/packages/dinero.js/jest.config.ts',
  ],
};
