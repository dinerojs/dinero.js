import type { UnaryOperation } from '@dinero.js/core';

/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
export const increment: UnaryOperation<bigint> = (value) => {
  return value + 1n;
};
