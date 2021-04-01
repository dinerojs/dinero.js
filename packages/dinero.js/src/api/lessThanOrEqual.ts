import {
  createSafeLessThanOrEqual,
  createUnsafeLessThanOrEqual,
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
 * Unsafely check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 */
export const unsafeLessThanOrEqual = createUnsafeLessThanOrEqual({
  compare,
});

/**
 * Check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 */
export const safeLessThanOrEqual = createSafeLessThanOrEqual({
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
