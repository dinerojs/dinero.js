import { createEqual, Dinero } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject The first Dinero object to compare.
 * @param comparator The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 */
export function equal<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const _equal = createEqual(dineroObject.calculator);

  return _equal(dineroObject, comparator);
}
