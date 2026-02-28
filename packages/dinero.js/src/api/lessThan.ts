import { safeLessThan } from '../core';
import type { LessThanParams } from '../core';

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 *
 * @public
 */
export function lessThan<TAmount, TCurrency extends string>(
  ...[dineroObject, comparator]: LessThanParams<TAmount, TCurrency>
) {
  const { calculator } = dineroObject;
  const lessThanFn = safeLessThan(calculator);

  return lessThanFn(dineroObject, comparator);
}
