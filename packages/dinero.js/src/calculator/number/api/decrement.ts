import type { DineroUnaryOperation } from '../../../core';

/**
 * Returns an decremented number.
 *
 * @param value - The number to decrement.
 *
 * @returns The decremented number.
 */
export const decrement: DineroUnaryOperation<number> = (value) => {
  return value - 1;
};
