import { DineroComparisonOperator } from '../../../core';
import type { DineroBinaryOperation } from '../../../core';

/**
 * Compare two numbers.
 *
 * @param a - The first number to compare.
 * @param b - The second number to compare.
 *
 * @returns Whether the two numbers are equal, or whether the first one is greater or less than the other.
 */
export const compare: DineroBinaryOperation<
  number,
  DineroComparisonOperator
> = (a, b) => {
  if (a < b) {
    return DineroComparisonOperator.LT;
  }
  if (a > b) {
    return DineroComparisonOperator.GT;
  }
  return DineroComparisonOperator.EQ;
};
