import type { DineroBinaryOperation } from '../../../core';

/**
 * Returns the remainder of two bigints.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The remainder of the two bigints.
 */
export const modulo: DineroBinaryOperation<bigint> = (dividend, divisor) => {
  return dividend % divisor;
};
