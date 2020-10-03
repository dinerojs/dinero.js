import { equal as coreEqual } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator';
import { buildMethod } from '../buildMethod';

/**
 * Check whether the value of a pure Dinero object is equal to another.
 *
 * @param dineroObject The first pure Dinero object to compare.
 * @param comparator The second pure Dinero object to compare.
 *
 * @returns Whether the pure Dinero objects are equal.
 */
export const equal = buildMethod(coreEqual, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
