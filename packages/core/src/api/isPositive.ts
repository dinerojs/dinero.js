import { Dinero } from '../types';
import { greaterThanOrEqual } from '../utils';
import { Dependencies } from './types';

export type IsPositiveDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'zero'
>;

export function isPositive<TAmount>({
  calculator,
}: IsPositiveDependencies<TAmount>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  return function _isPositive(dineroObject: Dinero<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, calculator.zero());
  };
}
