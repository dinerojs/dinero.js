import { Dinero } from '../types';
import { normalizeScale } from '.';
import { equal } from '../utils';
import { Dependencies } from './types';

export function haveSameAmount<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const equalFn = equal(calculator);

  return function _haveSameAmount(dineroObjects: readonly TDinero[]) {
    const [firstDinero, ...otherDineros] = normalizeFn(dineroObjects);
    const { amount: comparatorAmount } = firstDinero.toJSON();

    return otherDineros.every((d) => {
      const { amount: subjectAmount } = d.toJSON();

      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}
