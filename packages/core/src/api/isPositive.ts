import { greaterThanOrEqual } from '../utils';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type IsPositiveParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>
];

export type IsPositiveDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'zero'
>;

export function isPositive<TAmount>({
  calculator,
}: IsPositiveDependencies<TAmount>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  return function _isPositive(...[dineroObject]: IsPositiveParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, calculator.zero());
  };
}
