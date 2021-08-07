import Big from 'big.js';

import type { Currency } from 'dinero.js';

export function castToBigjsCurrency(currency: Currency<number>): Currency<Big> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map((b) => new Big(b))
      : new Big(currency.base as number),
    exponent: new Big(currency.exponent),
  };
}
