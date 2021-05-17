/* eslint-disable functional/no-expression-statement */
import { assertSameCurrency } from '../guards';
import type { Dinero } from '../types';
import { greaterThanOrEqual as gte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';
import type { Dependencies } from './types';

export type GreaterThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeGreaterThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeGreaterThanOrEqual<TAmount>({
  calculator,
}: UnsafeGreaterThanOrEqualDependencies<TAmount>) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export type SafeGreaterThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeGreaterThanOrEqual<TAmount>({
  calculator,
}: SafeGreaterThanOrEqualDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual({
    calculator,
  });

  return function greaterThanOrEqual(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
