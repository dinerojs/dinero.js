import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';

const [root] = process.cwd().split('examples');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'dinero.js': path.join(root, 'packages/dinero.js'),
      '@dinero.js/core': path.join(root, 'packages/core'),
      '@dinero.js/currencies': path.join(root, 'packages/currencies'),
      '@dinero.js/calculator/number': path.join(
        root,
        'packages/calculator/src/number'
      ),
    },
  },
});
