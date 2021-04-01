import {
  createUnsafeGreaterThan,
  createSafeGreaterThan,
} from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/calculator/number';

/**
 * Unsafely check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 */
export const unsafeGreaterThan = createUnsafeGreaterThan({
  compare,
});

/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 */
export const safeGreaterThan = createSafeGreaterThan({
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
