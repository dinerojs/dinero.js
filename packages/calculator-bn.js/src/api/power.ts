import type { BinaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

/**
 * Returns an BN to the power of an exponent.
 *
 * @param base - The base BN.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
export const power: BinaryOperation<BN> = (base, exponent) => {
  return base.pow(exponent);
};
