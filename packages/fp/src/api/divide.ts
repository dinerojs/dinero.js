import { divide } from '@dinero.js/core';
import { divide as divideNumbers, halfEven } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Divide the passed functional Dinero object.
 *
 * @param dividend The functional Dinero object to divide.
 * @param divisor The number to divide with.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new functional Dinero object.
 */
const functionalDivide = divide(dinero, {
  divide: divideNumbers,
  round: halfEven,
});

export default functionalDivide;
