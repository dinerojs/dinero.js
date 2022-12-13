import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns the sum of two BNs.
 *
 * @param augend - The BN to add to.
 * @param addend - The BN to add.
 *
 * @returns The sum of the two BNs.
 */
export const add: BinaryOperation<BN> = (augend, addend) => {
  return augend.add(addend);
};
