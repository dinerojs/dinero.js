import { greaterThan } from './greaterThan';
/**
 * Returns a minimum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The minimum function.
 */
export function minimum(calculator) {
  var greaterThanFn = greaterThan(calculator);
  return function (values) {
    return values.reduce(function (acc, curr) {
      return greaterThanFn(acc, curr) ? curr : acc;
    });
  };
}