import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';

import { getBundleBanner } from '../utils/getBundleBanner.mjs';

const BUILD_MODES = ['development', 'production'];
const extensions = ['.js', '.ts', '.json'];

function createRollupConfig({ mode, input, pkg, config }) {
  if (!BUILD_MODES.includes(mode)) {
    throw new Error(
      `The Rollup configuration ${JSON.stringify(mode)} mode is not supported.`
    );
  }

  return {
    ...config,
    input: `src/${input}.ts`,
    output: {
      file: `dist/umd/${input}.${mode}.js`,
      format: 'umd',
      sourcemap: true,
      name: pkg.name === 'dinero.js' ? pkg.name : pkg.name.replace('.', ''),
      banner: getBundleBanner(pkg),
      ...config.output,
    },
    plugins: [
      replace({
        preventAssignment: false,
        delimiters: ['', ''],
        values: {
          'process.env.NODE_ENV': JSON.stringify(mode),
          '@dinerojs': '@dinero.js',
        },
      }),
      json(),
      resolve({
        extensions,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        rootMode: 'upward',
        babelHelpers: 'bundled',
      }),
      mode === 'production' && terser(),
      filesize({
        showMinifiedSize: false,
        showGzippedSize: true,
      }),
      ...(config.plugins || []),
    ].filter(Boolean),
  };
}

export function createRollupConfigs({ pkg, inputs = ['index'], config = {} }) {
  return inputs.flatMap((input) => [
    createRollupConfig({ mode: 'development', input, pkg, config }),
    createRollupConfig({ mode: 'production', input, pkg, config }),
  ]);
}
