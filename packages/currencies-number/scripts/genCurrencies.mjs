/* eslint-disable no-console, functional/no-expression-statement */

/**
 * @typedef {import('../../../scripts/getCurrencies.mjs').Currency} Currency
 */

import fs from 'fs';
import path from 'path';
import * as url from 'url';

// eslint-disable-next-line import/no-extraneous-dependencies, import/default
import prettier from 'prettier';

import currencies from '../../../scripts/getCurrencies.mjs';

// eslint-disable-next-line import/no-named-as-default-member
const { format, resolveConfig } = prettier;

const dirname = url.fileURLToPath(new URL('.', import.meta.url)); // __dirname es module style

const outputPath = path.resolve(dirname, '../src/iso4217/amendments/168');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

async function genCurrencies() {
  const options = await resolveConfig(process.cwd());

  // Generate Currency ts files
  const promises = currencies
    .map((currency) => ({
      moduleName: currency.code.toLowerCase(),
      moduleText: tmpl(currency),
    }))
    .map(({ moduleName, moduleText }) =>
      fs.promises.writeFile(
        path.join(outputPath, `${moduleName}.ts`),
        format(moduleText, { ...options, parser: 'babel' })
      )
    );

  // Generate index ts file
  const indexModuleText = currencies
    .sort((a, b) => a.code.localeCompare(b))
    .reduce(
      (acc, current) =>
        `${acc}export * from './${current.code.toLowerCase()}';\n`,
      ''
    );

  fs.promises.writeFile(
    path.join(outputPath, 'index.ts'),
    format(indexModuleText, { ...options, parser: 'babel' })
  );

  await Promise.all(promises);

  console.log('@dinero.js/currencies-number source files generated');
}

genCurrencies();

/**
 * Currency<number> code generation template.
 *
 * @param {Currency} currency - Currency<number>.
 * @returns - Module text.
 */
function tmpl({ base, code, description, exponent }) {
  return `
import type { Currency } from '@dinero.js/core';

/**
 * ${description}.
 *
 * @public
 */
export const ${code}: Currency<number> = {
  code: '${code}',
  base: ${base},
  exponent: ${exponent},
};
`;
}
