import type { RoundingMode } from '../types';
import { isHalf } from '../utils';

/**
 * Round a number with half values down.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const halfDown: RoundingMode = (value) => {
  return isHalf(value) ? Math.floor(value) : Math.round(value);
};
