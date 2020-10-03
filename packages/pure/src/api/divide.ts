import { divide as coreDivide } from '@dinero.js/core';
import { divide as divideNumbers, halfEven } from '@dinero.js/core/calculator';
import { buildMethod } from '../buildMethod';

/**
 * Divide the passed pure Dinero object.
 *
 * @param dividend The pure Dinero object to divide.
 * @param divisor The number to divide with.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new pure Dinero object.
 */
export const divide = buildMethod(coreDivide, {
  divide: divideNumbers,
  round: halfEven,
});
