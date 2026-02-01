import type { DineroBinaryOperation } from '../../../core';

/**
 * Returns the sum of two numbers.
 *
 * @param augend - The number to add to.
 * @param addend - The number to add.
 *
 * @returns The sum of the two numbers.
 */
export const add: DineroBinaryOperation<number> = (augend, addend) => {
  return augend + addend;
};
