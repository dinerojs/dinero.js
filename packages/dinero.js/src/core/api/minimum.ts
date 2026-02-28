import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { minimum as min } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type MinimumParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObjects: readonly [
    Dinero<TAmount, TCurrency>,
    ...Dinero<TAmount, NoInfer<TCurrency>>[],
  ],
];

function unsafeMinimum<TAmount>(calculator: DineroCalculator<TAmount>) {
  const minFn = min(calculator);

  return function minimum<TCurrency extends string>(
    dineroObjects: ReadonlyArray<Dinero<TAmount, TCurrency>>
  ) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = minFn(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return firstDinero.create({
      amount,
      currency,
      scale,
    });
  };
}

export function safeMinimum<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const minFn = unsafeMinimum(calculator);

  return function minimum<TCurrency extends string>(
    ...[dineroObjects]: MinimumParams<TAmount, TCurrency>
  ) {
    const condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedDineroObjects = normalizeFn([...dineroObjects]);

    return minFn(normalizedDineroObjects);
  };
}
