import { UnaryOperation } from '../../types';

/**
 * Returns an incremented number.
 *
 * @param value The number to increment.
 *
 * @returns The incremented number.
 */
const increment: UnaryOperation<number> = (value) => {
  return value + 1;
};

export default increment;
