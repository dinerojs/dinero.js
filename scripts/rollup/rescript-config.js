import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export function createRollupConfigs({ pkg }) {
  const configs = [];
  
  // Development build
  configs.push({
    input: 'lib/es6/src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.development.js`,
      format: 'umd',
      name: pkg.name === 'dinero.js' ? pkg.name : pkg.name.replace('@dinero.js/', '').replace('-', ''),
      sourcemap: true,
    },
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
      }),
      resolve({ preferBuiltins: false }),
    ],
  });

  // Production build
  configs.push({
    input: 'lib/es6/src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.production.min.js`,
      format: 'umd',
      name: pkg.name === 'dinero.js' ? pkg.name : pkg.name.replace('@dinero.js/', '').replace('-', ''),
      sourcemap: true,
    },
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      resolve({ preferBuiltins: false }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
        mangle: {
          properties: {
            regex: /^_/
          }
        }
      }),
    ],
  });

  return configs;
}