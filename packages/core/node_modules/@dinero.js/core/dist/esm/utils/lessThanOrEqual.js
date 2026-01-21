import { equal } from './equal';
import { lessThan } from './lessThan';
/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export function lessThanOrEqual(calculator) {
  return function (subject, comparator) {
    return lessThan(calculator)(subject, comparator) || equal(calculator)(subject, comparator);
  };
}