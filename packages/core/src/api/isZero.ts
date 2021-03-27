import { Dinero } from '../types';
import { equal } from '../utils';
import { Dependencies } from './types';

export function isZero<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: Dependencies<TAmount, TDinero, 'compare' | 'zero'>) {
  const equalFn = equal(calculator);

  return function _isZero(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
