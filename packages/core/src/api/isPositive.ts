import { Dinero } from '../types';
import { greaterThanOrEqual } from '../calculator/helpers';
import { Dependencies } from './types';

export function isPositive<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: Dependencies<TAmount, TDinero, 'compare' | 'zero'>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  return function _isPositive(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, calculator.zero());
  };
}
