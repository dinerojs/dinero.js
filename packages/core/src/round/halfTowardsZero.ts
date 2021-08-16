import type { RoundingMode } from '../types';
import { isHalf } from '../utils';

/**
 * Round a number with half values to nearest integer closest to zero.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const halfTowardsZero: RoundingMode = (value) => {
  return isHalf(value)
    ? Math.sign(value) * Math.floor(Math.abs(value))
    : Math.round(value);
};
