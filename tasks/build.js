const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const inputPath = 'src/dinero.js'
const inputPolyfilledPath = 'src/dinero-polyfilled'

const defaultPlugins = [
  babel({
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: ['last 2 versions']
          }
        }
      ]
    ],
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
    babelrc: false
  })
]

const polyfilledPlugins = [
  nodeResolve({
    jsnext: true,
    main: true
  }),
  commonjs({
    include: 'node_modules/**'
  })
]

const buildOutputs = (bundle, suffix = '') => {
  bundle.write({
    file: `build/cjs/dinero${suffix}.js`,
    format: 'cjs'
  })
  bundle.write({
    file: `build/umd/dinero${suffix}.js`,
    format: 'umd',
    name: 'Dinero'
  })
  bundle.write({
    file: `build/amd/dinero${suffix}.js`,
    format: 'amd'
  })
  bundle.write({
    file: `build/esm/dinero${suffix}.js`,
    format: 'es'
  })
}

rollup
  .rollup({
    input: inputPath,
    plugins: defaultPlugins
  })
  .then(bundle => buildOutputs(bundle))

rollup
  .rollup({
    input: inputPolyfilledPath,
    plugins: [
      ...defaultPlugins,
      ...polyfilledPlugins
    ]
  })
  .then(bundle => buildOutputs(bundle, '.polyfilled'))

rollup
  .rollup({
    input: inputPath,
    plugins: [
      ...defaultPlugins,
      minify({
        comments: false
      })
    ]
  })
  .then(bundle => buildOutputs(bundle, '.min'))

rollup
  .rollup({
    input: inputPolyfilledPath,
    plugins: [
      ...defaultPlugins,
      ...polyfilledPlugins,
      minify({
        comments: false
      })
    ]
  })
  .then(bundle => buildOutputs(bundle, '.polyfilled.min'))
