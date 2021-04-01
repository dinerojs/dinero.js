import { createHaveSameAmount } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/calculator/number';

/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 */
export const haveSameAmount = createHaveSameAmount({
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
