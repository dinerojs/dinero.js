import { isEven, isHalf } from '../utils';
import { halfUp } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest odd integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var halfOdd = function halfOdd(amount, factor, calculator) {
  var isEvenFn = isEven(calculator);
  var isHalfFn = isHalf(calculator);
  var rounded = halfUp(amount, factor, calculator);
  if (!isHalfFn(amount, factor)) {
    return rounded;
  }
  return isEvenFn(rounded) ? calculator.decrement(rounded) : rounded;
};