import { unsafeMultiply as coreUnsafeMultiply, safeMultiply as coreMultiply } from '@dinero.js/core';
import {
  multiply as multiplyNumbers,
  halfEven,
  zero,
  power,
  subtract,
  compare,
  add,
} from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

/**
 * Unsafely multiply the passed pure Dinero object.
 *
 * @param multiplier The pure Dinero object to multiply.
 * @param multiplicand The number to multiply with.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns A new pure Dinero object.
 */
 export const unsafeMultiply = createFunction(coreUnsafeMultiply, {
  multiply: multiplyNumbers,
  zero,
  power,
  subtract,
  compare,
  add,
  round: halfEven,
});

/**
 * Multiply the passed pure Dinero object.
 *
 * @param multiplier The pure Dinero object to multiply.
 * @param multiplicand The number to multiply with.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns A new pure Dinero object.
 */
export const multiply = createFunction(coreMultiply, {
  multiply: multiplyNumbers,
  zero,
  power,
  subtract,
  compare,
  add,
  round: halfEven,
});
