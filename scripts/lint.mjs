/* eslint-disable no-console, no-process-exit, functional/no-expression-statement */
import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const eslintPath = path.resolve(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '../node_modules/.bin/eslint'
);

const args = process.argv.slice(2);

/**
 * ESLint cli args.
 *
 * ESlint needs to be run in each project for `turbo` to cache the results. Though it doesn't look
 * up the file tree for the .eslintrc or .eslintignore files.
 */
const eslintArgs = [
  '--config=../../.eslintrc.js',
  '--ignore-path=../../.eslintignore',
  ...args,
];

console.log(`eslint ${eslintArgs.join(' ')}`);

exec(eslintPath, eslintArgs)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
