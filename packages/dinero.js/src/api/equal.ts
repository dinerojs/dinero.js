import { equal as coreEqual } from '@dinero.js/core';
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
 * Check whether the value of a pure Dinero object is equal to another.
 *
 * @param dineroObject The first pure Dinero object to compare.
 * @param comparator The second pure Dinero object to compare.
 *
 * @returns Whether the pure Dinero objects are equal.
 */
export const equal = createFunction(coreEqual, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
