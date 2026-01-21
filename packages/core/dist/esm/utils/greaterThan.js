import { ComparisonOperator } from '../types';
/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan(calculator) {
  return function (subject, comparator) {
    return calculator.compare(subject, comparator) === ComparisonOperator.GT;
  };
}