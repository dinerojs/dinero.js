import type {
  GreaterThanOrEqualParams} from '@dinero.js/core';
import {
  safeGreaterThanOrEqual as coreSafeGreaterThanOrEqual,
  unsafeGreaterThanOrEqual as coreUnsafeGreaterThanOrEqual
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
  ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
) {
  const greaterThanOrEqual = coreUnsafeGreaterThanOrEqual({
    calculator: dineroObject.calculator,
  });

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
  ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
) {
  const greaterThanOrEqual = coreSafeGreaterThanOrEqual({
    calculator: dineroObject.calculator,
  });

  return greaterThanOrEqual(dineroObject, comparator);
}
