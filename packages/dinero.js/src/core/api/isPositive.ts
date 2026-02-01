import type { DineroCalculator, Dinero } from '../types';
import { greaterThan } from '../utils';

export type IsPositiveParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function isPositive<TAmount>(calculator: DineroCalculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);

  return function _isPositive(...[dineroObject]: IsPositiveParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return greaterThanFn(amount, calculator.zero());
  };
}
