import { BinaryOperation } from '../../types';

/**
 * Returns an bigint to the power of an exponent.
 *
 * @param base The base bigint.
 * @param exponent The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
const power: BinaryOperation<bigint> = (base, exponent) => {
  return base ** exponent;
};

export default power;
