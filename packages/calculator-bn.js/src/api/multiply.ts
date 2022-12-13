import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns the product of two BNs.
 *
 * @param multiplicand - The BN to multiply.
 * @param multiplier - The BN to multiply with.
 *
 * @returns The product of the two BNs.
 */
export const multiply: BinaryOperation<BN> = (multiplicand, multiplier) => {
  return multiplicand.mul(multiplier);
};
