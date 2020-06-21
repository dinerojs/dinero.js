import { equal } from '@dinero.js/core';
import {
  add,
  equal as equalNumbers,
  maximum,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Check whether the value of a functional Dinero object is equal to another.
 *
 * @param dineroObject The first functional Dinero object to compare.
 * @param comparator The second functional Dinero object to compare.
 *
 * @returns Whether the functional Dinero objects are equal.
 */
const functionalEqual = equal(dinero, {
  add,
  equal: equalNumbers,
  maximum,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default functionalEqual;
