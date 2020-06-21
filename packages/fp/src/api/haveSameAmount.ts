import { haveSameAmount } from '@dinero.js/core';
import {
  add,
  maximum,
  multiply,
  power,
  subtract,
  equal,
  halfEven,
  zero,
} from '@dinero.js/core/calculator/number';
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
  maximum,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
  equal,
});

export default functionalHaveSameAmount;
