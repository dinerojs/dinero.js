import type { BinaryOperation, ComparisonOperator } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Compare two BNs.
 *
 * @param a - The first BN to compare.
 * @param b - The second BN to compare.
 *
 * @returns Whether the two BNs are equal, or whether the first one is greater or less than the other.
 */
export const compare: BinaryOperation<BN, ComparisonOperator> = (a, b) => {
  return a.cmp(b);
};
