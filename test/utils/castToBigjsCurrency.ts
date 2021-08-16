import Big from 'big.js';
import type { Currency } from 'dinero.js';

export function castToBigjsCurrency(currency: Currency<number>): Currency<Big> {
  return {
    ...currency,
    base: new Big(currency.base),
    exponent: new Big(currency.exponent),
  };
}
