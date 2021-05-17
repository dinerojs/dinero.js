/* eslint-disable functional/no-expression-statement */
import { assertSameCurrency } from '../guards';
import type { Dinero } from '../types';
import { minimum as min } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';
import type { Dependencies } from './types';

export type MinimumParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export type UnsafeMinimumDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

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

export type SafeMinimumDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeMinimum<TAmount>({
  calculator,
}: SafeMinimumDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const minFn = unsafeMinimum({ calculator });

  return function maximum(...[dineroObjects]: MinimumParams<TAmount>) {
    assertSameCurrency(haveSameCurrency(dineroObjects));

    const normalizedDineroObjects = normalizeFn(dineroObjects);

    return minFn(normalizedDineroObjects);
  };
}
