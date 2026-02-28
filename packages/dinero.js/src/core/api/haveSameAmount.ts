import type { DineroCalculator, Dinero } from '../types';
import { equal } from '../utils';

import { normalizeScale } from './normalizeScale';

export type HaveSameAmountParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObjects: readonly [
    Dinero<TAmount, TCurrency>,
    ...Dinero<TAmount, NoInfer<TCurrency>>[],
  ],
];

export function haveSameAmount<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const equalFn = equal(calculator);

  return function _haveSameAmount<TCurrency extends string>(
    ...[dineroObjects]: HaveSameAmountParams<TAmount, TCurrency>
  ) {
    const [firstDinero, ...otherDineros] = normalizeFn(dineroObjects);
    const { amount: comparatorAmount } = firstDinero.toJSON();

    return otherDineros.every((d) => {
      const { amount: subjectAmount } = d.toJSON();

      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}
