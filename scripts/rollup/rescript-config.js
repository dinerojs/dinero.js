import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export function createRollupConfigs({ pkg }) {
  const configs = [];
  
  // External function - only externalize workspace packages, bundle everything else
  const isExternal = (id) => {
    // Externalize workspace packages (@dinero.js/*)
    if (id.startsWith('@dinero.js/')) return true;
    // Bundle everything else including ReScript runtime
    return false;
  };
  
  // Development build
  configs.push({
    input: 'lib/es6/src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.development.js`,
      format: 'umd',
      name: pkg.name === 'dinero.js' ? pkg.name : pkg.name.replace('@dinero.js/', '').replace('-', ''),
      sourcemap: true,
    },
    external: isExternal,
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
      }),
      resolve({ 
        preferBuiltins: false,
        // Bundle all dependencies including ReScript runtime for self-contained UMDs
      }),
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
    external: isExternal,
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      resolve({ 
        preferBuiltins: false,
        // Bundle all dependencies including ReScript runtime for self-contained UMDs
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_methods: true,
          passes: 3,
          drop_console: true,
          drop_debugger: true,
          dead_code: true,
          global_defs: {
            'process.env.NODE_ENV': '"production"'
          }
        },
        mangle: {
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false
        }
      }),
    ],
  });

  return configs;
}