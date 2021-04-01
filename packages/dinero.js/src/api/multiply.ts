import { createMultiply } from '@dinero.js/core';
import {
  multiply as multiplyNumbers,
  halfEven,
  zero,
  power,
  subtract,
  compare,
  add,
} from '@dinero.js/calculator/number';

/**
 * Multiply the passed Dinero object.
 *
 * @param multiplier The Dinero object to multiply.
 * @param multiplicand The number to multiply with.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns A new Dinero object.
 */
export const multiply = createMultiply({
  multiply: multiplyNumbers,
  zero,
  power,
  subtract,
  compare,
  add,
  round: halfEven,
});
