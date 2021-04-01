import { Dinero } from '../types';
import { haveSameAmount, haveSameCurrency } from '.';
import { Dependencies } from './types';

export type EqualDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function equal<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: EqualDependencies<TAmount, TDinero>) {
  return function _equal(dineroObject: TDinero, comparator: TDinero) {
    return (
      haveSameAmount({ factory, calculator })([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
