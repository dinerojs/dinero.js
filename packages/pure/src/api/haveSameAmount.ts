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
 * Check whether a set of pure Dinero objects have the same amount.
 *
 * @param dineroObjects The pure Dinero objects to compare.
 *
 * @returns Whether the pure Dinero objects have the same amount.
 */
const pureHaveSameAmount = haveSameAmount(dinero, {
  add,
  compare,
  multiply,
  power,
  subtract,
  round: halfEven,
  zero,
});

export default pureHaveSameAmount;
