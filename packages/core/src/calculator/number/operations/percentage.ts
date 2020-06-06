import { BinaryOperation } from '@dinero.js/core';
import { multiply, divide } from '@dinero.js/core/calculator/number';

/**
 * Returns the percentage of a number.
 *
 * @param value The number to calculate a percentage from.
 * @param share The share to calculate.
 *
 * @returns The percentage of the number.
 */
const percentage: BinaryOperation<number> = (value, share) => {
  return divide(multiply(value, share), 100);
};

export default percentage;
