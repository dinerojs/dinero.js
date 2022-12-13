/* eslint-disable no-console, no-process-exit, functional/no-expression-statement */
import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const apiExtractorPath = path.resolve(
  url.fileURLToPath(new URL('.', import.meta.url)), // __dirname es module style
  '../node_modules/.bin/api-extractor'
);

// Strip `--local` out. It will be configured only by this script.
const args = process.argv.slice(2).filter((arg) => arg !== '--local');

// When in CI, `api-extractor` shouldn't apply the local flag, this script will error if an api
// change has occurred without being committed in an `api.md` file.
// const localFlag = process.env.CI ? [] : ['--local'];

/**
 * ApiExtractor cli args.
 */
const apiExtractorArgs = ['run', '--local', ...args /* , ...localFlag */];

console.log(`api-extractor ${apiExtractorArgs.join(' ')}`);

exec(apiExtractorPath, [...apiExtractorArgs])
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
