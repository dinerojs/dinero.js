import { lessThan } from '@dinero.js/core';
import {
  lessThan as lessThanNumbers,
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
 * Check whether the value of a functional Dinero object is lesser than another.
 *
 * @param dineroObject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is lesser than the other.
 */
const functionalLessThan = lessThan(dinero, {
  lessThan: lessThanNumbers,
  add,
  maximum,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default functionalLessThan;
