import { Dinero } from '../types';
import { equal } from '../utils';
import { Dependencies } from './types';

export type IsZeroDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'zero'
>;

export function isZero<TAmount>({ calculator }: IsZeroDependencies<TAmount>) {
  const equalFn = equal(calculator);

  return function _isZero(dineroObject: Dinero<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
