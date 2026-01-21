'use strict';

/* eslint-disable functional/no-expression-statement, functional/immutable-data, import/no-commonjs */
if (process.env.NODE_ENV === 'production') {
  module.exports = require("./168.production.js");
} else {
  module.exports = require("./168.development.js");
}
