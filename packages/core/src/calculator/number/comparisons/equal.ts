import { BinaryBooleanOperation } from '../../types';

/**
 * Check whether two numbers are equal.
 *
 * @param a The first number to compare.
 * @param b The second number to compare.
 *
 * @returns Whether the two numbers are equal.
 */
const equal: BinaryBooleanOperation<number> = (a, b) => {
  return a === b;
};

export default equal;
