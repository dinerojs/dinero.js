import { greaterThan } from '@dinero.js/core';
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
 * Check whether the value of a pure Dinero object is greater than another.
 *
 * @param dineroObject The pure Dinero object to compare.
 * @param comparator The pure Dinero object to compare to.
 *
 * @returns Whether the pure Dinero to compare is greater than the other.
 */
const pureGreaterThan = greaterThan(dinero, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default pureGreaterThan;
