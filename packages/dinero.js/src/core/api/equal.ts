import type { DineroCalculator, Dinero } from '../types';

import { haveSameAmount } from './haveSameAmount';
import { haveSameCurrency } from './haveSameCurrency';

export type EqualParams<TAmount, TCurrency extends string = string> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  comparator: Dinero<TAmount, NoInfer<TCurrency>>,
];

export function equal<TAmount>(calculator: DineroCalculator<TAmount>) {
  return function _equal<TCurrency extends string>(
    ...[dineroObject, comparator]: EqualParams<TAmount, TCurrency>
  ) {
    return (
      haveSameAmount(calculator)([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
