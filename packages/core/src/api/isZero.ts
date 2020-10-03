import { BaseDinero } from '../types';
import { equal } from '../calculator/helpers';
import { Dependencies } from './types';

export function isZero<TAmount, TDinero extends BaseDinero<TAmount>>({
  calculator,
}: Dependencies<TAmount, TDinero, 'compare' | 'zero'>) {
  const equalFn = equal(calculator);

  return function _isZero(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}
