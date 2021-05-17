import type { RoundingMode } from '../types';

/**
 * Round a number down.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const down: RoundingMode = (value) => {
  return Math.floor(value);
};
