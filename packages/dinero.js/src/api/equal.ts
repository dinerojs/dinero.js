import { createEqual } from '@dinero.js/core';
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
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject The first Dinero object to compare.
 * @param comparator The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 */
export const equal = createEqual({
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
