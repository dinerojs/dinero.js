/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { lessThan as lt } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type LessThanParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeLessThanDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeLessThan<TAmount>({
  calculator,
}: UnsafeLessThanDependencies<TAmount>) {
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

export type SafeLessThanDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeLessThan<TAmount>({
  calculator,
}: SafeLessThanDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const lessThanFn = unsafeLessThan({ calculator });

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
