import { haveSameAmount } from './haveSameAmount';
import { haveSameCurrency } from './haveSameCurrency';

import type { Calculator, Dinero } from '../types';

export type EqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export function equal<TAmount>(calculator: Calculator<TAmount>) {
  return function _equal(...[dineroObject, comparator]: EqualParams<TAmount>) {
    return (
      haveSameAmount(calculator)([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
