const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

const polyfillSetup = [
  resolve({
    mainFields: ['jsnext', 'main']
  }),
  commonjs({
    include: 'node_modules/**'
  })
]

module.exports = polyfillSetup
