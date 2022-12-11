import type { Calculator, Dinero } from '../types';
import { greaterThanOrEqual } from '../utils';

export type IsPositiveParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>
];

export function isPositive<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const zero = calculator.zero();

  return function _isPositive(...[dineroObject]: IsPositiveParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, zero);
  };
}
