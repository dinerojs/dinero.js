import { lessThan } from './lessThan';
/**
 * Returns a maximum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The maximum function.
 */
export function maximum(calculator) {
  var lessThanFn = lessThan(calculator);
  return function (values) {
    return values.reduce(function (acc, curr) {
      return lessThanFn(acc, curr) ? curr : acc;
    });
  };
}