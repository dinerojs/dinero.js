import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  esbuild: {
    tsconfigRaw: '{}',
  },
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
      'dinero.js/currencies': path.resolve(
        __dirname,
        'packages/dinero.js/src/currencies/'
      ),
      'dinero.js/bigint': path.resolve(
        __dirname,
        'packages/dinero.js/src/bigint/'
      ),
      'dinero.js': path.resolve(__dirname, 'packages/dinero.js/src/'),
    },
  },
  define: {
    __DEV__: true,
    __TEST__: true,
  },
});
