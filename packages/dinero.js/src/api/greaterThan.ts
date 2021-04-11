import type {
  GreaterThanParams} from '@dinero.js/core';
import {
  unsafeGreaterThan as coreUnsafeGreaterThan,
  safeGreaterThan as coreSafeGreaterThan
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
  ...[dineroObject, comparator]: GreaterThanParams<TAmount>
) {
  const greaterThan = coreUnsafeGreaterThan({
    calculator: dineroObject.calculator,
  });

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
  ...[dineroObject, comparator]: GreaterThanParams<TAmount>
) {
  const greaterThan = coreSafeGreaterThan({
    calculator: dineroObject.calculator,
  });

  return greaterThan(dineroObject, comparator);
}
