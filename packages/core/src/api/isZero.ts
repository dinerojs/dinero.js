import type { Calculator, Dinero } from '../types';
import { equal } from '../utils';

export type IsZeroParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export function isZero<TAmount>(
  calculator: Calculator<TAmount>
): (dineroObject: Dinero<TAmount>) => boolean {
  const equalFn = equal(calculator);

  return function _isZero(...[dineroObject]: IsZeroParams<TAmount>): boolean {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
