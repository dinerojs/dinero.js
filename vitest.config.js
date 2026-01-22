import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Test file patterns
    include: [
      '**/*.test.js',
      '**/*.spec.js',
    ],

    // Ignore patterns  
    exclude: [
      '**/node_modules/**',
      '**/lib/**',
      '**/temp/**',
      '**/bs/**',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.js',
      ],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.test.*',
        'src/**/*.spec.*',
      ],
      reporter: ['text', 'lcov', 'html'],
    },

    // Clear mocks automatically between tests
    clearMocks: true,
    restoreMocks: true,

    // Global test setup
    globals: true, // Enable globals like describe, it, expect
  },
})