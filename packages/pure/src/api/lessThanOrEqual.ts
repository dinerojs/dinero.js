import {
  safeLessThanOrEqual as coreSafeLessThanOrEqual,
  unsafeLessThanOrEqual as coreUnsafeLessThanOrEqual,
} from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Unsafely check whether the value of a pure Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is lesser than or equal to the other.
 */
export const unsafeLessThanOrEqual = buildMethod(coreUnsafeLessThanOrEqual, {
  compare,
});

/**
 * Check whether the value of a pure Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is lesser than or equal to the other.
 */
export const safeLessThanOrEqual = buildMethod(coreSafeLessThanOrEqual, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
