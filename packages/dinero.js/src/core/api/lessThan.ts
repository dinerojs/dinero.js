import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { lessThan as lt } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type LessThanParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

function unsafeLessThan<TAmount>(calculator: DineroCalculator<TAmount>) {
  const lessThanFn = lt(calculator);

  return function lessThan(
    ...[dineroObject, comparator]: LessThanParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}

export function safeLessThan<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanFn = unsafeLessThan(calculator);

  return function lessThan(
    ...[dineroObject, comparator]: LessThanParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}
