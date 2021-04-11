import type { Dinero } from '../types';
import { haveSameAmount, haveSameCurrency } from '.';
import type { Dependencies } from './types';

export type EqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type EqualDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function equal<TAmount>({ calculator }: EqualDependencies<TAmount>) {
  return function _equal(...[dineroObject, comparator]: EqualParams<TAmount>) {
    return (
      haveSameAmount({ calculator })([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
