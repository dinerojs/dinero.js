import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/examples/portfolio-tracker/',
  plugins: [react()],
  define: {
    __DEV__: JSON.stringify(true),
    __TEST__: JSON.stringify(false),
  },
  resolve: {
    alias: {
      '@dinerojs/react': path.resolve(
        __dirname,
        '../../packages/react/src/index.ts'
      ),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
