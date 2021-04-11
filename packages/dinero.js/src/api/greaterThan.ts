import {
  createUnsafeGreaterThan,
  createSafeGreaterThan,
  Dinero,
} from '@dinero.js/core';

/**
 * Unsafely check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 */
export function unsafeGreaterThan<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const greaterThan = createUnsafeGreaterThan(dineroObject.calculator);

  return greaterThan(dineroObject, comparator);
}

/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 */
export function safeGreaterThan<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const greaterThan = createSafeGreaterThan(dineroObject.calculator);

  return greaterThan(dineroObject, comparator);
}
