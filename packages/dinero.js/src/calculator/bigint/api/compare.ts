import { DineroComparisonOperator } from '../../../core';
import type { DineroBinaryOperation } from '../../../core';

/**
 * Compare two bigints.
 *
 * @param a - The first bigint to compare.
 * @param b - The second bigint to compare.
 *
 * @returns Whether the two bigints are equal, or whether the first one is greater or less than the other.
 */
export const compare: DineroBinaryOperation<
  bigint,
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
