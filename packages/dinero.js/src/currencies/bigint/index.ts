import type { Currency } from '../types';

/**
 * Convert a number-based currency to a bigint-based currency.
 *
 * @param currency - The number-based currency to convert.
 * @returns A bigint-based currency with the same properties.
 *
 * @example
 * ```ts
 * import { USD } from 'dinero.js/currencies';
 * import { castToBigintCurrency } from 'dinero.js/currencies/bigint';
 *
 * const USDbi = castToBigintCurrency(USD);
 * ```
 */
export function castToBigintCurrency(
  currency: Currency<number>
): Currency<bigint> {
  const { base } = currency;
  return {
    code: currency.code,
    base: Array.isArray(base)
      ? (base.map((b) => BigInt(b)) as readonly bigint[])
      : BigInt(base as number),
    exponent: BigInt(currency.exponent),
  };
}

export type { Currency };
