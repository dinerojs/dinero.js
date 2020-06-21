import { greaterThan } from '@dinero.js/core';
import {
  greaterThan as greaterThanNumbers,
  add,
  maximum,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Check whether the value of a functional Dinero object is greater than another.
 *
 * @param dineroObject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is greater than the other.
 */
const functionalGreaterThan = greaterThan(dinero, {
  greaterThan: greaterThanNumbers,
  add,
  maximum,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default functionalGreaterThan;
