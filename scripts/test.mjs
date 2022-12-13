/* eslint-disable no-console, no-process-exit, functional/no-expression-statement, @typescript-eslint/naming-convention */
import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Jest needs to be run from the monorepo root directory.
const rootDir = path.resolve(__dirname, '../');

const jestPath = path.resolve(__dirname, '../node_modules/.bin/jest');

const args = process.argv.slice(2);

// When in CI, `jest` should only use 4 workers.
const maxWorkers = process.env.CI ? ['--maxWorkers=4'] : [];

/**
 * Jest cli args.
 */
const jestArgs = [...args, ...maxWorkers];

console.log(`jest ${jestArgs.join(' ')}`);

exec(jestPath, jestArgs, { cwd: rootDir })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
