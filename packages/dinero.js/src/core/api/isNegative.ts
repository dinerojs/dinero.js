import type { DineroCalculator, Dinero } from '../types';
import { lessThan } from '../utils';

export type IsNegativeParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function isNegative<TAmount>(calculator: DineroCalculator<TAmount>) {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(...[dineroObject]: IsNegativeParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return lessThanFn(amount, calculator.zero());
  };
}
