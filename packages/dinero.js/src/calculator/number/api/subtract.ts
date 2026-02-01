import type { DineroBinaryOperation } from '../../../core';

/**
 * Returns the difference between two numbers.
 *
 * @param minuend - The number to subtract from.
 * @param subtrahend - The number to subtract.
 *
 * @returns The difference of the two numbers.
 */
export const subtract: DineroBinaryOperation<number> = (
  minuend,
  subtrahend
) => {
  return minuend - subtrahend;
};
