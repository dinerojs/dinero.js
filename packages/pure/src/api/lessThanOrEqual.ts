import { lessThanOrEqual } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator';
import dinero from '../dinero';
/**
 * Check whether the value of a pure Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is lesser than or equal to the other.
 */
const pureLessThanOrEqual = lessThanOrEqual(dinero, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default pureLessThanOrEqual;
