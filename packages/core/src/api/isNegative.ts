import { Dinero } from '../types';
import { lessThan } from '../calculator/helpers';
import { Dependencies } from './types';

export function isNegative<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: Dependencies<TAmount, TDinero, 'compare' | 'zero'>) {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return lessThanFn(amount, calculator.zero());
  };
}
