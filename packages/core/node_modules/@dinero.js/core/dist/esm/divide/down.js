import { equal, greaterThan } from '../utils';

/**
 * Divide and round down.
 *
 * Rounding down happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var down = function down(amount, factor, calculator) {
  var greaterThanFn = greaterThan(calculator);
  var equalFn = equal(calculator);
  var zero = calculator.zero();
  var isPositive = greaterThanFn(amount, zero);
  var quotient = calculator.integerDivide(amount, factor);
  var remainder = calculator.modulo(amount, factor);
  var isInteger = equalFn(remainder, zero);
  if (isPositive || isInteger) {
    return quotient;
  }
  return calculator.decrement(quotient);
};