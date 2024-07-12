import type { Calculator, Dinero } from '../types';
import { lessThan } from '../utils';

export type IsNegativeParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>
];

export function isNegative<TAmount>(
  calculator: Calculator<TAmount>
): (dineroObject: Dinero<TAmount>) => boolean {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(
    ...[dineroObject]: IsNegativeParams<TAmount>
  ): boolean {
    const { amount } = dineroObject.toJSON();

    return lessThanFn(amount, calculator.zero());
  };
}
