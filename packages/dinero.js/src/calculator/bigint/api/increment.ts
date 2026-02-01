import type { DineroUnaryOperation } from '../../../core';

/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
export const increment: DineroUnaryOperation<bigint> = (value) => {
  return value + 1n;
};
