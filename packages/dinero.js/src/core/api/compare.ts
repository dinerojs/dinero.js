import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { compare as cmp } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type CompareParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  comparator: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeCompare<TAmount>(calculator: DineroCalculator<TAmount>) {
  const compareFn = cmp(calculator);

  return function compare<TCurrency extends string>(
    ...[dineroObject, comparator]: CompareParams<TAmount, TCurrency>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return compareFn(subjectAmount, comparatorAmount);
  };
}

export function safeCompare<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const compareFn = unsafeCompare(calculator);

  return function compare<TCurrency extends string>(
    ...[dineroObject, comparator]: CompareParams<TAmount, TCurrency>
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
