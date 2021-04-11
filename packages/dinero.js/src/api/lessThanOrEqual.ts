import type {
  LessThanOrEqualParams} from '@dinero.js/core';
import {
  safeLessThanOrEqual as coreSafeLessThanOrEqual,
  unsafeLessThanOrEqual as coreUnsafeLessThanOrEqual
} from '@dinero.js/core';

/**
 * Unsafely check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 */
export function unsafeLessThanOrEqual<TAmount>(
  ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
) {
  const lessThanOrEqual = coreUnsafeLessThanOrEqual({
    calculator: dineroObject.calculator,
  });

  return lessThanOrEqual(dineroObject, comparator);
}

/**
 * Check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 */
export function safeLessThanOrEqual<TAmount>(
  ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
) {
  const lessThanOrEqual = coreSafeLessThanOrEqual({
    calculator: dineroObject.calculator,
  });

  return lessThanOrEqual(dineroObject, comparator);
}
