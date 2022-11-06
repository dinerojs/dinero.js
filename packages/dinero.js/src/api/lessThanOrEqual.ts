import { safeLessThanOrEqual } from '@dinero.js/core';
import type { LessThanOrEqualParams } from '@dinero.js/core';

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
export function lessThanOrEqual<TAmount>(
  ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
) {
  const { calculator } = dineroObject;
  const lessThanOrEqualFn = safeLessThanOrEqual(calculator);

  return lessThanOrEqualFn(dineroObject, comparator);
}
