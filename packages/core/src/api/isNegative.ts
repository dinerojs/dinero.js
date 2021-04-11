import { Dinero } from '../types';
import { lessThan } from '../utils';
import { Dependencies } from './types';

export type IsNegativeDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'zero'
>;

export function isNegative<TAmount>({
  calculator,
}: IsNegativeDependencies<TAmount>) {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(dineroObject: Dinero<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return lessThanFn(amount, calculator.zero());
  };
}
