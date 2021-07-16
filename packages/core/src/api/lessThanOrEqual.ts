/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { lessThanOrEqual as lte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type LessThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeLessThanOrEqualDependencies<TAmount> = Dependencies<TAmount>;

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

export type SafeLessThanOrEqualDependencies<TAmount> = Dependencies<TAmount>;

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
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
