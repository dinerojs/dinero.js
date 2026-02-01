import type { DineroCurrency } from 'dinero.js';

export function castToBigintCurrency(
  currency: DineroCurrency<number>
): DineroCurrency<bigint> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map(BigInt)
      : BigInt(currency.base as number),
    exponent: BigInt(currency.exponent),
  };
}
