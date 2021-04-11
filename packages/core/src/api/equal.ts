import { Dinero } from '../types';
import { haveSameAmount, haveSameCurrency } from '.';
import { Dependencies } from './types';

export type EqualDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function equal<TAmount>({ calculator }: EqualDependencies<TAmount>) {
  return function _equal(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    return (
      haveSameAmount({ calculator })([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
