import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { greaterThanOrEqual as gte } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type GreaterThanOrEqualParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  comparator: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeGreaterThanOrEqual<TAmount>(
  calculator: DineroCalculator<TAmount>
) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual<TCurrency extends string>(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount, TCurrency>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export function safeGreaterThanOrEqual<TAmount>(
  calculator: DineroCalculator<TAmount>
) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator);

  return function greaterThanOrEqual<TCurrency extends string>(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount, TCurrency>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
