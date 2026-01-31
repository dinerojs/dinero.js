import { equal as coreEqual } from '../core';
import type { EqualParams } from '../core';

/**
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject - The first Dinero object to compare.
 * @param comparator - The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 *
 * @public
 */
export function equal<TAmount>(
  ...[dineroObject, comparator]: EqualParams<TAmount>
) {
  const { calculator } = dineroObject;
  const equalFn = coreEqual(calculator);

  return equalFn(dineroObject, comparator);
}
