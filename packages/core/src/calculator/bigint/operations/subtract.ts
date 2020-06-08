import { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the difference between two bigints.
 *
 * @param minuend The bigint to subtract from.
 * @param subtrahend The bigint to subtract.
 *
 * @returns The difference of the two bigints.
 */
const subtract: BinaryOperation<bigint> = (minuend, subtrahend) => {
  return minuend - subtrahend;
};

export default subtract;
