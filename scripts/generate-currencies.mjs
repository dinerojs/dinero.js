#!/usr/bin/env node

/**
 * Generate currency TypeScript files from manifest.json.
 *
 * Structure:
 * - definitions/          - Current version of each currency (one file per currency)
 * - historical/           - Previous versions of currencies whose properties changed
 * - iso4217/amendments/X/ - Re-export barrels for each amendment
 * - iso4217/latest/       - Re-exports pointing to latest amendment (for granular UMD)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const currenciesDir = join(__dirname, '../packages/dinero.js/src/currencies');
const manifestPath = join(currenciesDir, 'manifest.json');

// Generated directories
const definitionsDir = join(currenciesDir, 'definitions');
const historicalDir = join(currenciesDir, 'historical');
const amendmentsDir = join(currenciesDir, 'iso4217/amendments');
const latestDir = join(currenciesDir, 'iso4217/latest');

// Clean and recreate directories
function cleanDir(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true });
  }
  mkdirSync(dir, { recursive: true });
}

// Generate a currency definition file
function generateCurrencyFile(currency, relativePath = '../types') {
  const { code, name, base, exponent } = currency;
  const baseValue = Array.isArray(base) ? JSON.stringify(base) : base;

  return `import type { Currency } from '${relativePath}';

/**
 * ${name}.
 */
export const ${code}: Currency<number> = {
  code: '${code}',
  base: ${baseValue},
  exponent: ${exponent},
};
`;
}

// Main
function main() {
  // Read manifest
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const { latestAmendment, currencies } = manifest;

  console.log(
    `Generating currencies from manifest (${Object.keys(currencies).length} currencies, latest amendment: ${latestAmendment})`
  );

  // Clean generated directories
  cleanDir(definitionsDir);
  cleanDir(historicalDir);
  cleanDir(amendmentsDir);
  cleanDir(latestDir);

  // Track which amendments need to be generated
  const amendments = new Set();
  amendments.add(latestAmendment);

  // Process each currency
  for (const [code, currency] of Object.entries(currencies)) {
    const lowerCode = code.toLowerCase();

    // Generate definition file (current version)
    const defContent = generateCurrencyFile(currency, '../types');
    writeFileSync(join(definitionsDir, `${lowerCode}.ts`), defContent);

    // If currency has history, generate historical versions
    if (currency.history) {
      for (const hist of currency.history) {
        const historicalCurrency = { ...currency, ...hist };
        delete historicalCurrency.history;
        delete historicalCurrency.until;

        const histContent = generateCurrencyFile(
          historicalCurrency,
          '../types'
        );
        const histFileName = `${lowerCode}-pre${hist.until + 1}.ts`;
        writeFileSync(join(historicalDir, histFileName), histContent);

        // Track amendments where this historical version applies
        // (all amendments from 'since' up to 'until')
        for (let a = currency.since || 1; a <= hist.until; a++) {
          amendments.add(a);
        }
      }
    }

    // Track amendment where currency was added
    if (currency.since && currency.since > 1) {
      amendments.add(currency.since);
      amendments.add(currency.since - 1); // Last amendment without this currency
    }

    // Track amendment where currency was removed
    if (currency.until) {
      amendments.add(currency.until);
      amendments.add(currency.until + 1);
    }
  }

  // Generate definitions index
  const defIndexExports = Object.keys(currencies)
    .sort()
    .map((code) => `export * from './${code.toLowerCase()}';`)
    .join('\n');
  writeFileSync(join(definitionsDir, 'index.ts'), defIndexExports + '\n');

  // Generate historical index (if any)
  // For now, empty since we don't have historical data yet
  writeFileSync(
    join(historicalDir, 'index.ts'),
    '// Historical currency versions will be exported here\n'
  );

  // Generate amendment directories
  for (const amendmentNum of [...amendments].sort((a, b) => a - b)) {
    const amendmentDir = join(amendmentsDir, String(amendmentNum));
    if (!existsSync(amendmentDir)) {
      mkdirSync(amendmentDir, { recursive: true });
    }

    // Determine which currencies are valid for this amendment
    const validCurrencies = Object.entries(currencies)
      .filter(([, c]) => {
        const since = c.since || 1;
        const until = c.until || Infinity;
        return amendmentNum >= since && amendmentNum <= until;
      })
      .map(([code, currency]) => {
        // Check if there's a historical version for this amendment
        if (currency.history) {
          for (const hist of currency.history) {
            if (amendmentNum <= hist.until) {
              return {
                code,
                useHistorical: true,
                histFileName: `${code.toLowerCase()}-pre${hist.until + 1}`,
              };
            }
          }
        }
        return { code, useHistorical: false };
      });

    // Generate individual currency files in amendment directory
    for (const { code, useHistorical, histFileName } of validCurrencies) {
      const lowerCode = code.toLowerCase();
      let content;

      if (useHistorical) {
        content = `export { ${code} } from '../../../historical/${histFileName}';\n`;
      } else {
        content = `export { ${code} } from '../../../definitions/${lowerCode}';\n`;
      }

      writeFileSync(join(amendmentDir, `${lowerCode}.ts`), content);
    }

    // Generate amendment index
    const indexExports = validCurrencies
      .map(({ code }) => `export * from './${code.toLowerCase()}';`)
      .sort()
      .join('\n');
    writeFileSync(join(amendmentDir, 'index.ts'), indexExports + '\n');

    console.log(
      `  Generated amendment ${amendmentNum} (${validCurrencies.length} currencies)`
    );
  }

  // Generate granular re-export files for UMD bundles (latest amendment only)
  // These go in iso4217/latest/ (e.g., iso4217/latest/usd.ts)
  const latestCurrencies = Object.keys(currencies).filter((code) => {
    const c = currencies[code];
    const until = c.until || Infinity;
    return latestAmendment <= until;
  });

  for (const code of latestCurrencies) {
    const content = `export { ${code} } from '../amendments/${latestAmendment}/${code.toLowerCase()}';\n`;
    writeFileSync(join(latestDir, `${code.toLowerCase()}.ts`), content);
  }

  // Generate index for latest
  const latestIndexExports = latestCurrencies
    .sort()
    .map((code) => `export * from './${code.toLowerCase()}';`)
    .join('\n');
  writeFileSync(join(latestDir, 'index.ts'), latestIndexExports + '\n');

  console.log(
    `  Generated ${latestCurrencies.length} granular re-export files in iso4217/latest/`
  );

  console.log('Done!');
}

main();
