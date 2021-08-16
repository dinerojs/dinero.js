/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero } from '../types';
import { greaterThan as gt } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type GreaterThanParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

function unsafeGreaterThan<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

export function safeGreaterThan<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanFn = unsafeGreaterThan(calculator);

  return function greaterThan(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}
