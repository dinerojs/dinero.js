import type { BinaryOperation } from '@dinero.js/core';

/**
 * Returns an number to the power of an exponent.
 *
 * @param base - The base number.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
export const power: BinaryOperation<number> = (base, exponent) => {
  return base ** exponent;
};
