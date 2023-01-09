import path from 'path';
import * as url from 'url';

import { exec } from './utils/exec.mjs';

const apiExtractorPath = path.resolve(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '../node_modules/.bin/api-extractor'
);

// Strip `--local` out. It will be configured only by this script.
const args = process.argv.slice(2).filter((arg) => arg !== '--local');

// When in CI, `api-extractor` shouldn't apply the local flag. This script will
// error if an API change occurs without being committed in an `api.md` file.
// @todo Uncomment once we're ready to enforce the API
// const localFlag = process.env.CI ? [] : ['--local'];

/**
 * ApiExtractor CLI arguments.
 */
const apiExtractorArgs = ['run', '--local', ...args /* , ...localFlag */];

console.log(`api-extractor ${apiExtractorArgs.join(' ')}`);

exec(apiExtractorPath, apiExtractorArgs)
  .then(() => process.exit(0))
  .catch((code) => {
    process.exit(code);
  });
