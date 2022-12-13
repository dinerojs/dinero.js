import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns the quotient of two BNs with no fractional part.
 *
 * @param dividend - The BN to divide.
 * @param divisor - The BN to divide with.
 *
 * @returns The quotient of the two BNs.
 */
export const integerDivide: BinaryOperation<BN> = (dividend, divisor) => {
  return dividend.sub(dividend.mod(divisor)).div(divisor);
};
