import { lessThanOrEqual } from '@dinero.js/core';
import {
  lessThanOrEqual as lessThanOrEqualNumbers,
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
 * Check whether the value of a functional Dinero object is lesser than or equal to another.
 *
 * @param dineroObject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is lesser than or equal to the other.
 */
const functionalLessThanOrEqual = lessThanOrEqual(dinero, {
  lessThanOrEqual: lessThanOrEqualNumbers,
  add,
  maximum,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default functionalLessThanOrEqual;
