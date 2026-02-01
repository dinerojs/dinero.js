import type { DineroCalculator, Dinero } from '../types';
import { equal } from '../utils';

export type IsZeroParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export function isZero<TAmount>(calculator: DineroCalculator<TAmount>) {
  const equalFn = equal(calculator);

  return function _isZero(...[dineroObject]: IsZeroParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
