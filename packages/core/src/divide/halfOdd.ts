import type { DivideOperation } from '..';
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
export const halfOdd: DivideOperation = (amount, factor, calculator) => {
  const isEvenFn = isEven(calculator);
  const isHalfFn = isHalf(calculator);

  const rounded = halfUp(amount, factor, calculator);

  if (!isHalfFn(amount, factor)) {
    return rounded;
  }

  return isEvenFn(rounded) ? calculator.decrement(rounded) : rounded;
};
