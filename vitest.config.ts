import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/*/src/**/__tests__/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      exclude: ['node_modules/', 'dist/', 'test/'],
    },
    clearMocks: true,
    alias: {
      'test-utils': path.resolve(__dirname, 'test/utils/'),
      '@dinero.js/core': path.resolve(__dirname, 'packages/core/src/'),
      '@dinero.js/currencies': path.resolve(
        __dirname,
        'packages/currencies/src/'
      ),
      '@dinero.js/calculator-number': path.resolve(
        __dirname,
        'packages/calculator-number/src/'
      ),
      '@dinero.js/calculator-bigint': path.resolve(
        __dirname,
        'packages/calculator-bigint/src/'
      ),
      'dinero.js': path.resolve(__dirname, 'packages/dinero.js/src/'),
    },
  },
  define: {
    __DEV__: true,
    __TEST__: true,
  },
});
