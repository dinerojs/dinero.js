import { Dinero } from '../types';
import { equal } from '../utils';
import { Dependencies } from './types';

export type IsZeroDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare' | 'zero'>;

export function isZero<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: IsZeroDependencies<TAmount, TDinero>) {
  const equalFn = equal(calculator);

  return function _isZero(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
