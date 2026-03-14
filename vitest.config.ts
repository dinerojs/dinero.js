import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  esbuild: {
    tsconfigRaw: '{}',
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/*/src/**/__tests__/**/*.test.{ts,tsx}'],
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
      '@dinerojs/react/bigint': path.resolve(
        __dirname,
        'packages/react/src/bigint/'
      ),
      '@dinerojs/react/server': path.resolve(
        __dirname,
        'packages/react/src/server/'
      ),
      '@dinerojs/react': path.resolve(__dirname, 'packages/react/src/'),
      'dinero.js': path.resolve(__dirname, 'packages/dinero.js/src/'),
    },
  },
  define: {
    __DEV__: true,
    __TEST__: true,
  },
});
