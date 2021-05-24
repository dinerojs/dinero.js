import type { BinaryOperation } from '@dinero.js/core';

/**
 * Returns an bigint to the power of an exponent.
 *
 * @param base - The base bigint.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
export const power: BinaryOperation<bigint> = (base, exponent) => {
  return base ** exponent;
};
