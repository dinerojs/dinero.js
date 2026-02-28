import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';
import { greaterThan as gt } from '../utils';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type GreaterThanParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  comparator: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeGreaterThan<TAmount>(calculator: DineroCalculator<TAmount>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan<TCurrency extends string>(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount, TCurrency>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

export function safeGreaterThan<TAmount>(
  calculator: DineroCalculator<TAmount>
) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanFn = unsafeGreaterThan(calculator);

  return function greaterThan<TCurrency extends string>(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount, TCurrency>
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
