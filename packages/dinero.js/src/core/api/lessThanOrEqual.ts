import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { lessThanOrEqual as lte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type LessThanOrEqualParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  comparator: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeLessThanOrEqual<TAmount>(calculator: DineroCalculator<TAmount>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual<TCurrency extends string>(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount, TCurrency>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export function safeLessThanOrEqual<TAmount>(
  calculator: DineroCalculator<TAmount>
) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanOrEqualFn = unsafeLessThanOrEqual(calculator);

  return function lessThanOrEqual<TCurrency extends string>(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount, TCurrency>
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
