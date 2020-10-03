import { BaseDinero } from '../types';
import { haveSameAmount, haveSameCurrency } from '.';
import { Dependencies } from './types';

export function equal<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
  return function _equal(dineroObject: TDinero, comparator: TDinero) {
    return (
      haveSameAmount({ factory, calculator })([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}
