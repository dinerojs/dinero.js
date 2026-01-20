import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const eslintPath = path.resolve(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '../node_modules/.bin/eslint'
);

const args = process.argv.slice(2);

/**
 * ESLint CLI arguments.
 *
 * ESLint v9 uses flat config by default and finds eslint.config.js automatically.
 * Ignores are configured in the flat config file.
 */
const eslintArgs = [
  '--ignore-pattern',
  'dist/',
  '--ignore-pattern',
  'lib/',
  ...args,
];

console.log(`eslint ${eslintArgs.join(' ')}`);

exec(eslintPath, eslintArgs)
  .then(() => process.exit(0))
  .catch((code) => {
    process.exit(code);
  });
