import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'bigint/index': 'src/bigint/index.ts',
    'server/index': 'src/server/index.ts',
  },
  format: 'esm',
  outDir: 'dist/esm',
  dts: true,
  clean: true,
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  define: {
    __DEV__: "process.env.NODE_ENV !== 'production'",
    __TEST__: "process.env.NODE_ENV === 'test'",
  },
});
