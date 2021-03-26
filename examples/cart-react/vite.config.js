import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

const [root] = process.cwd().split('examples');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'dinero.js': path.join(root, 'packages/dinero.js'),
      '@dinero.js/currencies': path.join(root, 'packages/currencies'),
      '@dinero.js/core/calculator': path.join(
        root,
        'packages/core/src/calculator/number'
      ),
    },
  },
});
