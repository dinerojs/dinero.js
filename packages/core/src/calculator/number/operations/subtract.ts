import { BinaryOperation } from '../../types';

/**
 * Returns the difference between two numbers.
 *
 * @param minuend The number to subtract from.
 * @param subtrahend The number to subtract.
 *
 * @returns The difference of the two numbers.
 */
const subtract: BinaryOperation<number> = (minuend, subtrahend) => {
  return minuend - subtrahend;
};

export default subtract;
