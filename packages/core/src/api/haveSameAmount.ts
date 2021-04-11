import { Dinero } from '../types';
import { normalizeScale } from '.';
import { equal } from '../utils';
import { Dependencies } from './types';

export type HaveSameAmountDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function haveSameAmount<TAmount>({
  calculator,
}: HaveSameAmountDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const equalFn = equal(calculator);

  return function _haveSameAmount(
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
  ) {
    const [firstDinero, ...otherDineros] = normalizeFn(dineroObjects);
    const { amount: comparatorAmount } = firstDinero.toJSON();

    return otherDineros.every((d) => {
      const { amount: subjectAmount } = d.toJSON();

      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}
