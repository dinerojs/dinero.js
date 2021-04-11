import { Dinero } from '../types';
import { equal } from '../utils';
import { Dependencies } from './types';

export type HasSubUnitsDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'modulo' | 'power' | 'zero'
>;

export function hasSubUnits<TAmount>({
  calculator,
}: HasSubUnitsDependencies<TAmount>) {
  const equalFn = equal(calculator);

  return function _hasSubUnits(dineroObject: Dinero<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !equalFn(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero()
    );
  };
}
