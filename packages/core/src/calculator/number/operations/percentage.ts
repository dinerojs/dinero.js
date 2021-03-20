import { multiply, divide } from '../../number';
import { BinaryOperation } from '../../types';

/**
 * Returns the percentage of a number.
 *
 * @param value The number to calculate a percentage from.
 * @param share The share to calculate.
 *
 * @returns The percentage of the number.
 */
export const percentage: BinaryOperation<number> = (value, share) => {
  return divide(multiply(value, share), 100);
};
