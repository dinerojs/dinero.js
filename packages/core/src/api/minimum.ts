/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { minimum as min } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type MinimumParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export type UnsafeMinimumDependencies<TAmount> = Dependencies<TAmount>;

export function unsafeMinimum<TAmount>({
  calculator,
}: UnsafeMinimumDependencies<TAmount>) {
  const minFn = min(calculator);

  return function minimum(...[dineroObjects]: MinimumParams<TAmount>) {
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

export type SafeMinimumDependencies<TAmount> = Dependencies<TAmount>;

export function safeMinimum<TAmount>({
  calculator,
}: SafeMinimumDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const minFn = unsafeMinimum({ calculator });

  return function maximum(...[dineroObjects]: MinimumParams<TAmount>) {
    const condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedDineroObjects = normalizeFn(dineroObjects);

    return minFn(normalizedDineroObjects);
  };
}
