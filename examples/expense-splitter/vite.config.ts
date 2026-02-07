import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/examples/expense-splitter/',
  plugins: [react()],
});
