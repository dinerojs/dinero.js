import type { BinaryOperation } from '../../types';

/**
 * Returns the quotient of two numbers.
 *
 * @param dividend The number to divide.
 * @param divisor The number to divide with.
 *
 * @returns The quotient of the two numbers.
 */
export const divide: BinaryOperation<number> = (dividend, divisor) => {
  return dividend / divisor;
};
