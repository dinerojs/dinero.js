const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')

const inputPath = 'src/dinero.js'

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
    input: inputPath,
    plugins: [
      ...defaultPlugins,
      minify({
        comments: false
      })
    ]
  })
  .then(bundle => buildOutputs(bundle, '.min'))
