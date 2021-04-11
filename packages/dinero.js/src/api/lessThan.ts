import type {
  LessThanParams} from '@dinero.js/core';
import {
  unsafeLessThan as coreUnsafeLessThan,
  safeLessThan as coreSafeLessThan
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
  ...[dineroObject, comparator]: LessThanParams<TAmount>
) {
  const lessThan = coreUnsafeLessThan({ calculator: dineroObject.calculator });

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
  ...[dineroObject, comparator]: LessThanParams<TAmount>
) {
  const lessThan = coreSafeLessThan({ calculator: dineroObject.calculator });

  return lessThan(dineroObject, comparator);
}
