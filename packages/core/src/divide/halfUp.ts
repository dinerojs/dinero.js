import type { DivideOperation } from '..';
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
export const halfUp: DivideOperation = (amount, factor, calculator) => {
  const greaterThanFn = greaterThan(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  const zero = calculator.zero();
  const remainder = absoluteFn(calculator.modulo(amount, factor));
  const difference = calculator.subtract(factor, remainder);
  const isLessThanHalf = greaterThanFn(difference, remainder);
  const isPositive = greaterThanFn(amount, zero);

  if (
    isHalfFn(amount, factor) ||
    (isPositive && !isLessThanHalf) ||
    (!isPositive && isLessThanHalf)
  ) {
    return up(amount, factor, calculator);
  }

  return down(amount, factor, calculator);
};
