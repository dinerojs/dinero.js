import Big from 'big.js';

import type { DineroCurrency } from 'dinero.js';

export function castToBigjsCurrency<TCurrency extends string>(
  currency: DineroCurrency<number, TCurrency>
): DineroCurrency<Big, TCurrency> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map((b) => new Big(b))
      : new Big(currency.base as number),
    exponent: new Big(currency.exponent),
  };
}
