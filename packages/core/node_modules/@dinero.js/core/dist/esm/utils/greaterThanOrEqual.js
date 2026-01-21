import { equal } from './equal';
import { greaterThan } from './greaterThan';
/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
export function greaterThanOrEqual(calculator) {
  return function (subject, comparator) {
    return greaterThan(calculator)(subject, comparator) || equal(calculator)(subject, comparator);
  };
}