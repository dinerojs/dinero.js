import { sign, isHalf, absolute } from '../utils';
import { halfUp, down } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round towards zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var halfTowardsZero = function halfTowardsZero(amount, factor, calculator) {
  var signFn = sign(calculator);
  var isHalfFn = isHalf(calculator);
  var absoluteFn = absolute(calculator);
  if (!isHalfFn(amount, factor)) {
    return halfUp(amount, factor, calculator);
  }
  return calculator.multiply(signFn(amount), down(absoluteFn(amount), factor, calculator));
};