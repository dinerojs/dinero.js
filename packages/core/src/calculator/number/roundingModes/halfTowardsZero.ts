import { RoundingMode } from '../../types';
import { multiply } from '../../number';
import { isHalf } from '../helpers';

/**
 * Round a number with half values to nearest integer closest to zero.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
const halfTowardsZero: RoundingMode<number> = (value) => {
  return isHalf(value)
    ? multiply(Math.sign(value), Math.floor(Math.abs(value)))
    : Math.round(value);
};

export default halfTowardsZero;
