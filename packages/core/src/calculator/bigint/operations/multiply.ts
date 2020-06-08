import { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the product of two bigints.
 *
 * @param multiplier The bigint to multiply.
 * @param multiplicand The bigint to multiply with.
 *
 * @returns The product of the two bigints.
 */
const multiply: BinaryOperation<bigint> = (multiplier, multiplicand) => {
  return multiplier * multiplicand;
};

export default multiply;
