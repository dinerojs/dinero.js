import { isEven, isHalf } from '../utils';

import type { RoundingMode } from '@dinero.js/core';

/**
 * Round a number with half values to nearest even integer.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const halfEven: RoundingMode = (value) => {
  const rounded = Math.round(value);

  if (!isHalf(value)) {
    return rounded;
  }

  return isEven(rounded) ? rounded : rounded - 1;
};
