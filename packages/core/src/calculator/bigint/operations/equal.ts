import { BinaryBooleanOperation } from '@dinero.js/core';

/**
 * Check whether two bigints are equal.
 *
 * @param a The first bigint to compare.
 * @param b The second bigint to compare.
 *
 * @returns Whether the two bigints are equal.
 */
const equal: BinaryBooleanOperation<bigint> = (a, b) => {
  return a === b;
};

export default equal;
