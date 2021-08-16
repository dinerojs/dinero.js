import type { RoundingMode } from '../types';
import { isHalf } from '../utils';

/**
 * Round a number with half values to nearest integer farthest from zero.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const halfAwayFromZero: RoundingMode = (value) => {
  return isHalf(value)
    ? Math.sign(value) * Math.ceil(Math.abs(value))
    : Math.round(value);
};
