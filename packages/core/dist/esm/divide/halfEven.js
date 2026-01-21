import { isEven, isHalf } from '../utils';
import { halfUp } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest even integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var halfEven = function halfEven(amount, factor, calculator) {
  var isEvenFn = isEven(calculator);
  var isHalfFn = isHalf(calculator);
  var rounded = halfUp(amount, factor, calculator);
  if (!isHalfFn(amount, factor)) {
    return rounded;
  }
  return isEvenFn(rounded) ? rounded : calculator.decrement(rounded);
};