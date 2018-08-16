const fs = require('fs')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const pluginSetups = {
  default: [
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
  ],
  polyfill: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  minify: [
    minify({
      comments: false
    })
  ]
}
const components = [
  {
    path: 'src/dinero.js',
    plugins: [...pluginSetups.default],
    name: ''
  },
  {
    path: 'src/dinero-polyfilled.js',
    plugins: [...pluginSetups.default, ...pluginSetups.polyfill],
    name: '.polyfilled'
  }
]
const processes = [
  {
    plugins: [],
    suffix: ''
  },
  {
    plugins: pluginSetups.minify,
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

components.forEach(component => {
  processes.forEach(process => {
    rollup
      .rollup({
        input: component.path,
        plugins: [...component.plugins, ...process.plugins]
      })
      .then(bundle => buildOutputs(bundle, component.name + process.suffix))
  })
})

const buildOutputs = (bundle, suffix = '') => {
  outputs.forEach(output => {
    bundle.write({
      file: `build/${output.folder}/dinero${suffix}.js`,
      format: output.format,
      name: 'Dinero'
    })
  })
}

fs.mkdirSync('build')
fs.mkdirSync('build/esm')
fs.copyFileSync('src/dinero.d.ts', 'build/esm/dinero.d.ts')
