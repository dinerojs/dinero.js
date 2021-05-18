import { equal } from '../utils';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type HasSubUnitsParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>
];

export type HasSubUnitsDependencies<TAmount> = Dependencies<
  TAmount,
  'compare' | 'modulo' | 'power' | 'zero'
>;

export function hasSubUnits<TAmount>({
  calculator,
}: HasSubUnitsDependencies<TAmount>) {
  const equalFn = equal(calculator);

  return function _hasSubUnits(...[dineroObject]: HasSubUnitsParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !equalFn(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero()
    );
  };
}
