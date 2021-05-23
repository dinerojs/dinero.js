/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { maximum as max } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type MaximumParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export type UnsafeMaximumDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeMaximum<TAmount>({
  calculator,
}: UnsafeMaximumDependencies<TAmount>) {
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

export type SafeMaximumDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeMaximum<TAmount>({
  calculator,
}: SafeMaximumDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const maxFn = unsafeMaximum({ calculator });

  return function maximum(...[dineroObjects]: MaximumParams<TAmount>) {
    const condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedDineroObjects = normalizeFn(dineroObjects);

    return maxFn(normalizedDineroObjects);
  };
}
