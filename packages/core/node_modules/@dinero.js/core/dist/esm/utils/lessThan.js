import { ComparisonOperator } from '../types';
/**
 * Returns a lessThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThan function.
 */
export function lessThan(calculator) {
  return function (subject, comparator) {
    return calculator.compare(subject, comparator) === ComparisonOperator.LT;
  };
}