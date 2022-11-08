/* eslint-disable functional/no-mixed-type */
import type { Currency } from '@dinero.js/currencies';

/**
 * Currency JSON data object.
 */
export type CurrencyData = Currency<number> & { readonly description: string };

/**
 * Currency generation configuration object.
 */
export type ConfigArgs = {
  // Currency generic `TAmount` type text representation.
  readonly genericType: string;
  // Import statements
  readonly imports?: readonly string[];
  // Map currency data of JS number type to currency source text.
  readonly mapNumber: (n: number) => string;
};

export type CurrencyGenerateFn = (currency: CurrencyData) => string;

export type CurrencyConfig = Pick<ConfigArgs, 'genericType'> & {
  readonly generateFn: CurrencyGenerateFn;
};

export type CreateCurrencyConfig = (config: ConfigArgs) => CurrencyConfig;
