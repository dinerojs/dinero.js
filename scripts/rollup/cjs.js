/* eslint-disable functional/no-expression-statement, functional/immutable-data, import/no-commonjs */
if (process.env.NODE_ENV === 'production') {
  module.exports = require(`./__BUNDLE__.production.js`);
} else {
  module.exports = require(`./__BUNDLE__.development.js`);
}
