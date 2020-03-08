const babel = require('rollup-plugin-babel')

const defaultSetup = [
  babel({
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: {
            browsers: ['last 2 versions']
          }
        }
      ]
    ],
    exclude: 'node_modules/**',
    babelrc: false
  })
]

module.exports = defaultSetup
