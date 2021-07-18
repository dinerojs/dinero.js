/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { compare as cmp } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type CompareParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeCompareDependencies<TAmount> = Dependencies<TAmount>;

export function unsafeCompare<TAmount>({
  calculator,
}: UnsafeCompareDependencies<TAmount>) {
  const compareFn = cmp(calculator);

  return function compare(
    ...[dineroObject, comparator]: CompareParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return compareFn(subjectAmount, comparatorAmount);
  };
}

export type SafeCompareDependencies<TAmount> = Dependencies<TAmount>;

export function safeCompare<TAmount>({
  calculator,
}: SafeCompareDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const compareFn = unsafeCompare({
    calculator,
  });

  return function compare(
    ...[dineroObject, comparator]: CompareParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return compareFn(subjectAmount, comparatorAmount);
  };
}
