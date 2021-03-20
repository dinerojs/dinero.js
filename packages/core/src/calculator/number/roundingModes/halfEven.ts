import { RoundingMode } from '../../types';
import { isEven, isHalf } from '../helpers';

/**
 * Round a number with half values to nearest even integer.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
export const halfEven: RoundingMode<number> = (value) => {
  const rounded = Math.round(value);

  if (!isHalf(value)) {
    return rounded;
  }

  return isEven(rounded) ? rounded : rounded - 1;
};
