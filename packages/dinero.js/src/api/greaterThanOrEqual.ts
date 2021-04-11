import {
  createSafeGreaterThanOrEqual,
  createUnsafeGreaterThanOrEqual,
  Dinero,
} from '@dinero.js/core';

/**
 * Unsafely check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 */
export function unsafeGreaterThanOrEqual<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const greaterThanOrEqual = createUnsafeGreaterThanOrEqual(
    dineroObject.calculator
  );

  return greaterThanOrEqual(dineroObject, comparator);
}

/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 */
export function safeGreaterThanOrEqual<TAmount>(
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
) {
  const greaterThanOrEqual = createSafeGreaterThanOrEqual(
    dineroObject.calculator
  );

  return greaterThanOrEqual(dineroObject, comparator);
}
