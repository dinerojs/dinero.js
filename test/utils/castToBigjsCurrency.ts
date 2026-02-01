import Big from 'big.js';

import type { DineroCurrency } from 'dinero.js';

export function castToBigjsCurrency(
  currency: DineroCurrency<number>
): DineroCurrency<Big> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map((b) => new Big(b))
      : new Big(currency.base as number),
    exponent: new Big(currency.exponent),
  };
}
