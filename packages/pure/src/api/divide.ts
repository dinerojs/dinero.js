import { divide } from '@dinero.js/core';
import { divide as divideNumbers, halfEven } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Divide the passed pure Dinero object.
 *
 * @param dividend The pure Dinero object to divide.
 * @param divisor The number to divide with.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new pure Dinero object.
 */
const pureDivide = divide(dinero, {
  divide: divideNumbers,
  round: halfEven,
});

export default pureDivide;
