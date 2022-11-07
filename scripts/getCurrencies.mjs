/**
 * @typedef Currency
 * @type {object}
 * @property {number} base
 * @property {string} code
 * @property {string} description
 * @property {number} exponent
 */

import fs from 'fs';
import path from 'path';
import * as url from 'url';

const raw = fs.readFileSync(
  path.resolve(
    url.fileURLToPath(new URL('.', import.meta.url)), // __dirname es module style
    '../data/iso4217/amendments/168.json'
  )
);

/** @type {Array<Currency>} */
const currencies = JSON.parse(raw);

export default currencies;
