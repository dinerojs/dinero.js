import { createUnsafeLessThan, createSafeLessThan } from '@dinero.js/core';
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
 * Unsafely check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 */
export const unsafeLessThan = createUnsafeLessThan({
  compare,
});

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject The Dinero object to compare.
 * @param comparator The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 */
export const safeLessThan = createSafeLessThan({
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
