import {
  safeGreaterThanOrEqual as coreSafeGreaterThanOrEqual,
  unsafeGreaterThanOrEqual as coreUnsafeGreaterThanOrEqual,
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
import { createFunction } from '../helpers';

/**
 * Unsafely check whether the value of a pure Dinero object is greater than or equal another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is greater than or equal the other.
 */
export const unsafeGreaterThanOrEqual = createFunction(
  coreUnsafeGreaterThanOrEqual,
  {
    compare,
  }
);

/**
 * Check whether the value of a pure Dinero object is greater than or equal another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is greater than or equal the other.
 */
export const safeGreaterThanOrEqual = createFunction(coreSafeGreaterThanOrEqual, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
