import type { DineroCalculator, Dinero } from '../types';

import { haveSameAmount } from './haveSameAmount';
import { haveSameCurrency } from './haveSameCurrency';

export type EqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

export function equal<TAmount>(calculator: DineroCalculator<TAmount>) {
  return function _equal(...[dineroObject, comparator]: EqualParams<TAmount>) {
    return (
      haveSameAmount(calculator)([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
