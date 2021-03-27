import {
  unsafeLessThan as coreUnsafeLessThan,
  safeLessThan as coreSafeLessThan,
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
import { createFunction } from '../helpers';

/**
 * Unsafely check whether the value of a pure Dinero object is lesser than another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is lesser than the other.
 */
export const unsafeLessThan = createFunction(coreUnsafeLessThan, {
  compare,
});

/**
 * Check whether the value of a pure Dinero object is lesser than another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is lesser than the other.
 */
export const safeLessThan = createFunction(coreSafeLessThan, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
