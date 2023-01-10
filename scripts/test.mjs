import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Jest needs to be run from the monorepo root directory.
const rootDir = path.resolve(__dirname, '../');

const jestPath = path.resolve(__dirname, '../node_modules/.bin/jest');

const args = process.argv.slice(2);

// When in CI, Jest should only use 4 workers to avoid out of memory errors.
const maxWorkers = process.env.CI ? ['--maxWorkers=4'] : [];

/**
 * Jest CLI arguments.
 */
const jestArgs = [...args, ...maxWorkers];

console.log(`jest ${jestArgs.join(' ')}`);

exec(jestPath, jestArgs, { cwd: rootDir })
  .then(() => process.exit(0))
  .catch((code) => {
    process.exit(code);
  });
