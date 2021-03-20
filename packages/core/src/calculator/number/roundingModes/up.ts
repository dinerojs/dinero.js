import { RoundingMode } from '../../types';

/**
 * Round a number up.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
export const up: RoundingMode<number> = (value) => {
  return Math.ceil(value);
};
