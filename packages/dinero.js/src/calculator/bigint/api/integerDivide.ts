import type { DineroBinaryOperation } from '../../../core';

/**
 * Returns the quotient of two bigints with no fractional part.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The quotient of the two bigints.
 */
export const integerDivide: DineroBinaryOperation<bigint> = (
  dividend,
  divisor
) => {
  return dividend / divisor;
};
