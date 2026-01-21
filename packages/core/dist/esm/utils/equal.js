import { ComparisonOperator } from '../types';
/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
export function equal(calculator) {
  return function (subject, comparator) {
    return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
  };
}