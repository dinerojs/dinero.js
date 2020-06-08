import { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the remainder of two bigints.
 *
 * @param dividend The bigint to divide.
 * @param divisor The bigint to divide with.
 *
 * @returns The remainder of the two bigints.
 */
const modulo: BinaryOperation<bigint> = (dividend, divisor) => {
  return dividend % divisor;
};

export default modulo;
