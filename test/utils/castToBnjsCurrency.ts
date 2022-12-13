import BN from 'bn.js';

import type { Currency } from 'dinero.js';

export function castToBnjsCurrency(currency: Currency<number>): Currency<BN> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map((b) => new BN(b))
      : new BN(currency.base as number),
    exponent: new BN(currency.exponent),
  };
}
