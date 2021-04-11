import type { RoundingMode } from '../../../types';
import { multiply } from '..';
import { isHalf } from '../../utils';

/**
 * Round a number with half values to nearest integer closest to zero.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
export const halfTowardsZero: RoundingMode<number> = (value) => {
  return isHalf(value)
    ? multiply(Math.sign(value), Math.floor(Math.abs(value)))
    : Math.round(value);
};
