import { BinaryOperation } from '../../types';

/**
 * Returns the quotient of two numbers.
 *
 * @param dividend The bigint to divide.
 * @param divisor The bigint to divide with.
 *
 * @returns The quotient of the two numbers.
 */
const divide: BinaryOperation<bigint> = (dividend, divisor) => {
  return dividend / divisor;
};

export default divide;
