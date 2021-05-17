/* eslint-disable functional/no-expression-statement */
import { assertSameCurrency } from '../guards';
import type { Dinero } from '../types';
import { lessThanOrEqual as lte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';
import type { Dependencies } from './types';

export type LessThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeLessThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeLessThanOrEqual<TAmount>({
  calculator,
}: UnsafeLessThanOrEqualDependencies<TAmount>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export type SafeLessThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeLessThanOrEqual<TAmount>({
  calculator,
}: SafeLessThanOrEqualDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const lessThanOrEqualFn = unsafeLessThanOrEqual({
    calculator,
  });

  return function lessThanOrEqual(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
