import { multiply as coreMultiply } from '@dinero.js/core';
import {
  multiply as multiplyNumbers,
  halfEven,
} from '@dinero.js/core/calculator';
import { createFunction } from '../helpers';

/**
 * Multiply the passed pure Dinero object.
 *
 * @param multiplier The pure Dinero object to multiply.
 * @param multiplicand The number to multiply with.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new pure Dinero object.
 */
export const multiply = createFunction(coreMultiply, {
  multiply: multiplyNumbers,
  round: halfEven,
});
