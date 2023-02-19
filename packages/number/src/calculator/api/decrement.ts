import type { UnaryOperation } from '@dinero.js/core';

/**
 * Returns an decremented number.
 *
 * @param value - The number to decrement.
 *
 * @returns The decremented number.
 */
export const decrement: UnaryOperation<number> = (value) => {
  return value - 1;
};
