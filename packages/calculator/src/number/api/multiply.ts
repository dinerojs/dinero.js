import { BinaryOperation } from '../../types';

/**
 * Returns the product of two numbers.
 *
 * @param multiplier The number to multiply.
 * @param multiplicand The number to multiply with.
 *
 * @returns The product of the two numbers.
 */
export const multiply: BinaryOperation<number> = (multiplier, multiplicand) => {
  return multiplier * multiplicand;
};
