/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero } from '../types';
import { lessThanOrEqual as lte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type LessThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

function unsafeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
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

export function safeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanOrEqualFn = unsafeLessThanOrEqual(calculator);

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
