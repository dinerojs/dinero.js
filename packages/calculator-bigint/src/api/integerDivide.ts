import type { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the quotient of two bigints with no fractional part.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The quotient of the two bigints.
 */
export const integerDivide: BinaryOperation<bigint> = (dividend, divisor) => {
  return dividend / divisor;
};
