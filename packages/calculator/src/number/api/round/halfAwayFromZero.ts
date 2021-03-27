import { RoundingMode } from '../../../types';
import { multiply } from '..';
import { isHalf } from '../../utils';

/**
 * Round a number with half values to nearest integer farthest from zero.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
export const halfAwayFromZero: RoundingMode<number> = (value) => {
  return isHalf(value)
    ? multiply(Math.sign(value), Math.ceil(Math.abs(value)))
    : Math.round(value);
};
