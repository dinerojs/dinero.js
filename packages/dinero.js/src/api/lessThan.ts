import {
  createUnsafeLessThan,
  createSafeLessThan,
  Dinero,
} from '@dinero.js/core';

/**
 * Unsafely check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 */
export function unsafeLessThan<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const lessThan = createUnsafeLessThan(dineroObject.calculator);

  return lessThan(dineroObject, comparator);
}

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 */
export function safeLessThan<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const lessThan = createSafeLessThan(dineroObject.calculator);

  return lessThan(dineroObject, comparator);
}
