import { Dinero } from '../types';
import { greaterThanOrEqual } from '../utils';
import { Dependencies } from './types';

export type IsPositiveDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare' | 'zero'>;

export function isPositive<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: IsPositiveDependencies<TAmount, TDinero>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  return function _isPositive(dineroObject: TDinero) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, calculator.zero());
  };
}
