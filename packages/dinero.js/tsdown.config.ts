import { execSync } from 'child_process';
import { readFileSync } from 'fs';

import { defineConfig } from 'tsdown';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

function getBanner() {
  const lastCommitHash = execSync('git rev-parse --short HEAD')
    .toString()
    .trim();
  const version = process.env.SHIPJS
    ? pkg.version
    : `${pkg.version} (UNRELEASED ${lastCommitHash})`;
  const authors = `© ${pkg.author.name} and contributors`;

  return `/*! ${pkg.name} ${version} | MIT License | ${authors} | ${pkg.homepage} */`;
}

const banner = getBanner();

export default defineConfig([
  // ESM build
  {
    entry: {
      index: 'src/index.ts',
      'currencies/index': 'src/currencies/index.ts',
      'bigint/index': 'src/bigint/index.ts',
      'bigint/currencies/index': 'src/bigint/currencies/index.ts',
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
  },
  // UMD main bundle (production)
  {
    entry: { 'index.production': 'src/index.ts' },
    format: 'umd',
    outDir: 'dist/umd',
    globalName: 'dinerojs',
    minify: true,
    sourcemap: true,
    clean: false,
    outputOptions: {
      banner,
      entryFileNames: '[name].js',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      __DEV__: 'false',
      __TEST__: 'false',
    },
  },
  // UMD main bundle (development)
  {
    entry: { 'index.development': 'src/index.ts' },
    format: 'umd',
    outDir: 'dist/umd',
    globalName: 'dinerojs',
    minify: false,
    sourcemap: true,
    clean: false,
    outputOptions: {
      banner,
      entryFileNames: '[name].js',
    },
    define: {
      'process.env.NODE_ENV': '"development"',
      __DEV__: 'true',
      __TEST__: 'false',
    },
  },
  // UMD bigint bundle (production)
  {
    entry: { 'bigint/index.production': 'src/bigint/index.ts' },
    format: 'umd',
    outDir: 'dist/umd',
    globalName: 'dinerojs',
    minify: true,
    sourcemap: true,
    clean: false,
    outputOptions: {
      banner,
      entryFileNames: '[name].js',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      __DEV__: 'false',
      __TEST__: 'false',
    },
  },
  // UMD bigint bundle (development)
  {
    entry: { 'bigint/index.development': 'src/bigint/index.ts' },
    format: 'umd',
    outDir: 'dist/umd',
    globalName: 'dinerojs',
    minify: false,
    sourcemap: true,
    clean: false,
    outputOptions: {
      banner,
      entryFileNames: '[name].js',
    },
    define: {
      'process.env.NODE_ENV': '"development"',
      __DEV__: 'true',
      __TEST__: 'false',
    },
  },
]);
