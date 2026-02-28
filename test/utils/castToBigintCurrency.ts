import type { DineroCurrency } from 'dinero.js';

export function castToBigintCurrency<TCurrency extends string>(
  currency: DineroCurrency<number, TCurrency>
): DineroCurrency<bigint, TCurrency> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map(BigInt)
      : BigInt(currency.base as number),
    exponent: BigInt(currency.exponent),
  };
}
