import { haveSameAmount as coreHaveSameAmount } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

/**
 * Check whether a set of pure Dinero objects have the same amount.
 *
 * @param dineroObjects The pure Dinero objects to compare.
 *
 * @returns Whether the pure Dinero objects have the same amount.
 */
export const haveSameAmount = createFunction(coreHaveSameAmount, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});
