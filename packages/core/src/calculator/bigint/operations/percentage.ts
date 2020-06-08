import { BinaryOperation } from '@dinero.js/core';
import { multiply, divide } from '@dinero.js/core/calculator/bigint';

/**
 * Returns the percentage of a bigint.
 *
 * @param value The bigint to calculate a percentage from.
 * @param share The share to calculate.
 *
 * @returns The percentage of the bigint.
 */
const percentage: BinaryOperation<bigint> = (value, share) => {
  return divide(multiply(value, share), 100n);
};

export default percentage;
