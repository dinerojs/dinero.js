import { isHalf } from '../utils';

import type { RoundingMode } from '@dinero.js/core';

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
