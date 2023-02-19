import type { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the remainder of two numbers.
 *
 * @param dividend - The number to divide.
 * @param divisor - The number to divide with.
 *
 * @returns The remainder of the two numbers.
 */
export const modulo: BinaryOperation<number> = (dividend, divisor) => {
  return dividend % divisor;
};
