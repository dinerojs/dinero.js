import { Dinero } from '../types';
import { lessThan } from '../utils';
import { Dependencies } from './types';

export type IsNegativeDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare' | 'zero'>;

export function isNegative<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: IsNegativeDependencies<TAmount, TDinero>) {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return lessThanFn(amount, calculator.zero());
  };
}
