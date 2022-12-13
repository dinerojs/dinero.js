import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns the remainder of two BNs.
 *
 * @param dividend - The BN to divide.
 * @param divisor - The BN to divide with.
 *
 * @returns The remainder of the two BNs.
 */
export const modulo: BinaryOperation<BN> = (dividend, divisor) => {
  return dividend.mod(divisor);
};
