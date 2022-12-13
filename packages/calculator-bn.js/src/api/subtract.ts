import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns the difference between two BNs.
 *
 * @param minuend - The BN to subtract from.
 * @param subtrahend - The BN to subtract.
 *
 * @returns The difference of the two BNs.
 */
export const subtract: BinaryOperation<BN> = (minuend, subtrahend) => {
  return minuend.sub(subtrahend);
};
