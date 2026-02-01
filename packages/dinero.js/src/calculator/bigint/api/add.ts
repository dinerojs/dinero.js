import type { DineroBinaryOperation } from '../../../core';

/**
 * Returns the sum of two bigints.
 *
 * @param augend - The bigint to add to.
 * @param addend - The bigint to add.
 *
 * @returns The sum of the two bigints.
 */
export const add: DineroBinaryOperation<bigint> = (augend, addend) => {
  return augend + addend;
};
