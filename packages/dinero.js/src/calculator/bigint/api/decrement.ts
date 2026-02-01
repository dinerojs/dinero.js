import type { DineroUnaryOperation } from '../../../core';

/**
 * Returns an decremented bigint.
 *
 * @param value - The bigint to decrement.
 *
 * @returns The decremented bigint.
 */
export const decrement: DineroUnaryOperation<bigint> = (value) => {
  return value - 1n;
};
