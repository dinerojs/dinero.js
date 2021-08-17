/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero } from '../types';
import { maximum as max } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type MaximumParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

function unsafeMaximum<TAmount>(calculator: Calculator<TAmount>) {
  const maxFn = max(calculator);

  return function maximum(...[dineroObjects]: MaximumParams<TAmount>) {
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

export function safeMaximum<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const maxFn = unsafeMaximum(calculator);

  return function maximum(...[dineroObjects]: MaximumParams<TAmount>) {
    const condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedDineroObjects = normalizeFn(dineroObjects);

    return maxFn(normalizedDineroObjects);
  };
}
