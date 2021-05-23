import type { RoundingMode } from '@dinero.js/core';

/**
 * Round a number up.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const up: RoundingMode = (value) => {
  return Math.ceil(value);
};
