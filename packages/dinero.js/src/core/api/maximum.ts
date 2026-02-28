import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { maximum as max } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type MaximumParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObjects: readonly [
    Dinero<TAmount, TCurrency>,
    ...Dinero<TAmount, NoInfer<TCurrency>>[],
  ],
];

function unsafeMaximum<TAmount>(calculator: DineroCalculator<TAmount>) {
  const maxFn = max(calculator);

  return function maximum<TCurrency extends string>(
    dineroObjects: ReadonlyArray<Dinero<TAmount, TCurrency>>
  ) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = maxFn(
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

export function safeMaximum<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const maxFn = unsafeMaximum(calculator);

  return function maximum<TCurrency extends string>(
    ...[dineroObjects]: MaximumParams<TAmount, TCurrency>
  ) {
    const condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedDineroObjects = normalizeFn([...dineroObjects]);

    return maxFn(normalizedDineroObjects);
  };
}
