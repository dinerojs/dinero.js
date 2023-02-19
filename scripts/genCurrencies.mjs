/* eslint-disable functional/no-throw-statement */

/**
 * @typedef {import("./genCurrencies").CurrencyData} CurrencyData
 * @typedef {import("./genCurrencies").CurrencyConfig} CurrencyConfigArgs
 *
 * @callback formatFn
 * @param {CurrencyData} currency - The currency data to transform into a source file.
 * @returns {string} - The generated currency source file.
 */

import { fs } from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import * as url from 'node:url';

// eslint-disable-next-line import/default
import prettier from 'prettier';

// prettier requires this to import into an es module without error.
// eslint-disable-next-line import/no-named-as-default-member
const { format, resolveConfig } = prettier;

const baseOutputDir = path.resolve(
  url.fileURLToPath(new URL('.', import.meta.url)), // __dirname es module style
  '../packages/currencies/src/iso4217/amendments/168'
);

const dirExists = (dirPath) =>
  fs
    .stat(dirPath)
    .then((stats) => stats.isDirectory())
    .catch(() => false);

/**
 * Load the currency data array.
 *
 * @returns {Promise<Array<CurrencyData>>} - Returns a array of currency data objects.
 */
export async function getCurrencyData() {
  const raw = await fs.readFile(
    path.resolve(
      url.fileURLToPath(new URL('.', import.meta.url)), // __dirname es module style
      '../data/iso4217/amendments/168.json'
    )
  );
  return JSON.parse(raw.toString());
}

/** @type {import("./genCurrencies").CreateCurrencyConfig} */
function createCurrencyConfig({ genericType, imports, mapNumber }) {
  return {
    genericType,
    generateFn: ({ base, code, description, exponent }) => `
      import type { Currency } from '../../../../types';
      ${imports ? imports.map((text) => `${text}\n`) : ''}
      /**
       * ${description}.
       *
       * @public
       */
      export const ${code}: Currency<${genericType}> = {
        code: '${code}',
        base: ${mapNumber(base)},
        exponent: ${mapNumber(exponent)},
      };`,
  };
}

const numberCurrencyConfig = createCurrencyConfig({
  genericType: 'number',
  mapNumber: (n) => `${n}`,
});

const bigintCurrencyConfig = createCurrencyConfig({
  genericType: 'bigint',
  mapNumber: (n) => `${n}n`,
});

/**
 * Generate a set of currency source files.
 *
 * @returns {Promise<void>} - Returns a Promise that resolves when all the files are generated.
 */
export async function build() {
  const currencies = await getCurrencyData();

  const prettierOptions = {
    ...(await resolveConfig(process.cwd())),
    parser: 'babel',
  };

  const configs = [numberCurrencyConfig, bigintCurrencyConfig];

  // Generate index ts files
  const indexPromises = configs.map(async ({ genericType }) => {
    const outputDir = path.join(baseOutputDir, genericType);

    if (!(await dirExists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    return fs.writeFile(
      path.join(outputDir, 'index.ts'),
      format(
        currencies
          .sort((a, b) => a.code.localeCompare(b))
          .map((current) => `export * from './${current.code.toLowerCase()}';`)
          .join('\n'),
        prettierOptions
      )
    );
  });

  // Need to insure directories are created before generating currency files.
  await Promise.all(indexPromises);

  // Generate Currency ts files
  const currencyPromises = currencies
    .map((currency) =>
      configs.map((config) => ({
        modulePath: path.join(
          config.genericType,
          `${currency.code.toLowerCase()}.ts`
        ),
        moduleText: config.generateFn(currency),
      }))
    )
    .flat()
    .map(({ modulePath, moduleText }) =>
      fs.writeFile(
        path.join(baseOutputDir, modulePath),
        format(moduleText, prettierOptions)
      )
    );

  await Promise.all(currencyPromises);
}

const start = performance.now();

build()
  // eslint-disable-next-line  promise/always-return
  .then(() => {
    const elapsed = Math.floor((performance.now() - start) / 10) / 100;
    const msg = `Dinero.js currency generation successful\n😸  Done in ${elapsed}s`;
    console.log(msg);
  })
  .catch((error) => {
    console.log(`Dinero.js currency generation failed`);
    throw error;
  });
