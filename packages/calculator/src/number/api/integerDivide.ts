import type { BinaryOperation } from '../../types';
import { divide } from './divide';

/**
 * Returns the quotient of two numbers with no fractional part.
 *
 * @param dividend The number to divide.
 * @param divisor The number to divide with.
 *
 * @returns The quotient of the two numbers.
 */
export const integerDivide: BinaryOperation<number> = (dividend, divisor) => {
  return ~~divide(dividend, divisor);
};
