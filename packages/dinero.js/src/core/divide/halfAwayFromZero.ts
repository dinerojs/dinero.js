import type { DivideOperation } from '..';
import { sign, isHalf, absolute } from '../utils';

import { halfUp, up } from '.';

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round away from zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export const halfAwayFromZero: DivideOperation = (
  amount,
  factor,
  calculator
) => {
  const signFn = sign(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  if (!isHalfFn(amount, factor)) {
    return halfUp(amount, factor, calculator);
  }

  return calculator.multiply(
    signFn(amount),
    up(absoluteFn(amount), factor, calculator)
  );
};
