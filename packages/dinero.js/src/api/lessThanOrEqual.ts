import { safeLessThanOrEqual } from '../core';
import type { LessThanOrEqualParams } from '../core';

/**
 * Check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 *
 * @public
 */
export function lessThanOrEqual<TAmount, TCurrency extends string>(
  ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount, TCurrency>
) {
  const { calculator } = dineroObject;
  const lessThanOrEqualFn = safeLessThanOrEqual(calculator);

  return lessThanOrEqualFn(dineroObject, comparator);
}
