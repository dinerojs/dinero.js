import type { Currency } from 'dinero.js';

export function castToBigintCurrency(
  currency: Currency<number>
): Currency<bigint> {
  return {
    ...currency,
    base: BigInt(currency.base),
    exponent: BigInt(currency.exponent),
  };
}
