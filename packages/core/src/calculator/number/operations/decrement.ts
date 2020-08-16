import { UnaryOperation } from '../../types';

/**
 * Returns an decremented number.
 *
 * @param value The number to decrement.
 *
 * @returns The decremented number.
 */
const decrement: UnaryOperation<number> = (value) => {
  return value - 1;
};

export default decrement;
