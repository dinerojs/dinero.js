import { isHalf } from '../utils';
import { down, halfUp } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round down.
 *
 * Rounding down happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and less than half (e.g., 1.4).
 * - The quotient is negative and greater than half (e.g., -1.6).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export var halfDown = function halfDown(amount, factor, calculator) {
  var isHalfFn = isHalf(calculator);
  if (isHalfFn(amount, factor)) {
    return down(amount, factor, calculator);
  }
  return halfUp(amount, factor, calculator);
};