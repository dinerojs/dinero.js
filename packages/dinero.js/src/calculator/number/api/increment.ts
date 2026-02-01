import type { DineroUnaryOperation } from '../../../core';

/**
 * Returns an incremented number.
 *
 * @param value - The number to increment.
 *
 * @returns The incremented number.
 */
export const increment: DineroUnaryOperation<number> = (value) => {
  return value + 1;
};
