const rollup = require('rollup')

const defaultSetup = require('./setup/default')
const polyfillSetup = require('./setup/polyfill')
const minifySetup = require('./setup/minify')

const components = [
  {
    path: 'src/dinero.js',
    plugins: defaultSetup,
    name: ''
  },
  {
    path: 'src/dinero-polyfilled.js',
    plugins: [...defaultSetup, ...polyfillSetup],
    name: '.polyfilled'
  }
]

const processes = [
  {
    plugins: [],
    suffix: ''
  },
  {
    plugins: minifySetup,
    suffix: '.min'
  }
]

const outputs = [
  {
    format: 'cjs',
    folder: 'cjs'
  },
  {
    format: 'umd',
    folder: 'umd'
  },
  {
    format: 'amd',
    folder: 'amd'
  },
  {
    format: 'es',
    folder: 'esm'
  }
]

components.forEach(({ path, plugins: componentPlugins, name }) => {
  processes.forEach(({ plugins: processPlugins, suffix }) => {
    rollup
      .rollup({
        input: path,
        plugins: [...componentPlugins, ...processPlugins]
      })
      .then(bundle => {
        buildOutputs(bundle, `${name}${suffix}`)
      })
      .catch(err => {
        console.error(err)
      })
  })
})

const buildOutputs = (bundle, suffix = '') => {
  outputs.forEach(({ folder, format }) => {
    bundle
      .write({
        file: `build/${folder}/dinero${suffix}.js`,
        format: format,
        name: 'Dinero'
      })
      .then(({ output }) => {
        const { fileName } = output[0]

        console.log(
          'Build complete for: %s',
          fileName,
          `(${format.toUpperCase()})`
        )
      })
  })
}
