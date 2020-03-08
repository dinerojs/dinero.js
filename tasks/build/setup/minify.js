const minify = require('rollup-plugin-babel-minify')

const minifySetup = [
  minify({
    comments: false
  })
]

module.exports = minifySetup
