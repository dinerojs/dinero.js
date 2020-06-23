import { RoundingMode } from '../../types';
import { isHalf } from '../helpers';

/**
 * Round a number with half values down.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
const halfDown: RoundingMode<number> = (value) => {
  return isHalf(value) ? Math.floor(value) : Math.round(value);
};

export default halfDown;
