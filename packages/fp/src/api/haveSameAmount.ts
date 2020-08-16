import { haveSameAmount } from '@dinero.js/core';
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
 * Check whether a set of functional Dinero objects have the same amount.
 *
 * @param dineroObjects The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same amount.
 */
const functionalHaveSameAmount = haveSameAmount(dinero, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default functionalHaveSameAmount;
