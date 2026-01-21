import { absolute, greaterThan, isHalf } from '../utils';
import { down, up } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round up.
 *
 * Rounding up happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and greater than half (e.g., 1.6).
 * - The quotient is negative and less than half (e.g., -1.4).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var halfUp = function halfUp(amount, factor, calculator) {
  var greaterThanFn = greaterThan(calculator);
  var isHalfFn = isHalf(calculator);
  var absoluteFn = absolute(calculator);
  var zero = calculator.zero();
  var remainder = absoluteFn(calculator.modulo(amount, factor));
  var difference = calculator.subtract(factor, remainder);
  var isLessThanHalf = greaterThanFn(difference, remainder);
  var isPositive = greaterThanFn(amount, zero);
  if (isHalfFn(amount, factor) || isPositive && !isLessThanHalf || !isPositive && isLessThanHalf) {
    return up(amount, factor, calculator);
  }
  return down(amount, factor, calculator);
};